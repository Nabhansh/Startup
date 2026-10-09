// Per-request Content-Security-Policy. Scripts and styles must carry the request's
// nonce, so injected markup without it is blocked.
//
// The server entry (src/server.ts) runs each request inside a nonce store. The store
// is registered on globalThis so client code can read it without importing any
// server-only module.

const STORAGE_KEY = Symbol.for("campustutor.csp-nonce-storage");

export type NonceStorage = {
  getStore(): string | undefined;
  run<T>(nonce: string, callback: () => T): T;
};

export function registerNonceStorage(storage: NonceStorage): void {
  (globalThis as unknown as Record<symbol, unknown>)[STORAGE_KEY] = storage;
}

// The nonce for the request being rendered. Always undefined in the browser.
export function currentNonce(): string | undefined {
  const storage = (globalThis as unknown as Record<symbol, unknown>)[STORAGE_KEY] as
    NonceStorage | undefined;
  return storage?.getStore();
}

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}
