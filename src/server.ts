import "./lib/error-capture";

import { AsyncLocalStorage } from "node:async_hooks";
import { renderErrorPage } from "./lib/error-page";
import { buildCsp, createNonce, registerNonceStorage } from "./lib/csp";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

// Carries each request's CSP nonce through the render, so router and error pages
// can stamp it on their inline scripts and styles.
const nonceStorage = new AsyncLocalStorage<string>();
registerNonceStorage(nonceStorage);

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function htmlErrorResponse(nonce: string): Response {
  const headers = new Headers({ "content-type": "text/html; charset=utf-8" });
  headers.set("Content-Security-Policy", buildCsp(nonce));
  return new Response(renderErrorPage(nonce), { status: 500, headers });
}

// Adds the CSP header to a response, keeping its streamed body intact.
function withCsp(response: Response, nonce: string): Response {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", buildCsp(nonce));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function normalizeCatastrophicSsrResponse(
  request: Request,
  response: Response,
  nonce: string,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  // h3 has already logged the original error with its stack via the patched console.error.
  console.error(`SSR request failed for ${new URL(request.url).pathname}: ${body}`);
  return htmlErrorResponse(nonce);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const nonce = createNonce();
    try {
      const handler = await getServerEntry();
      const response = await nonceStorage.run(nonce, () => handler.fetch(request, env, ctx));
      return withCsp(await normalizeCatastrophicSsrResponse(request, response, nonce), nonce);
    } catch (error) {
      console.error(error);
      return htmlErrorResponse(nonce);
    }
  },
};
