import { describe, expect, it } from "vitest";
import { renderErrorPage } from "./error-page";

describe("renderErrorPage", () => {
  it("contains no script and no inline event handler", () => {
    const html = renderErrorPage("nonce1");
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son[a-z]+=/i);
  });

  it("authorises its one style block with the request nonce", () => {
    expect(renderErrorPage("nonce1")).toContain('<style nonce="nonce1">');
  });

  it("offers a way back without JavaScript", () => {
    expect(renderErrorPage()).toContain('href="/"');
  });
});
