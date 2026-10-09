import { describe, expect, it } from "vitest";
import { buildCsp, createNonce } from "./csp";

describe("content security policy", () => {
  it("authorises scripts and styles only with the request nonce", () => {
    const csp = buildCsp("abc123");
    expect(csp).toContain("script-src 'self' 'nonce-abc123'");
    expect(csp).toContain("style-src 'self' 'nonce-abc123'");
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/);
    expect(csp).not.toMatch(/(^|;)\s*style-src 'self' 'unsafe-inline'/);
  });

  it("blocks plugins, framing from other sites and base-tag hijacking", () => {
    const csp = buildCsp("n");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("creates a fresh, base64-looking nonce on each call", () => {
    const first = createNonce();
    const second = createNonce();
    expect(first).not.toBe(second);
    expect(first).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
