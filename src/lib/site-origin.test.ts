import { afterEach, describe, expect, it } from "vitest";
import { siteOrigin } from "./site-origin";

const request = new Request("https://attacker.example/sitemap.xml");

afterEach(() => {
  delete process.env["SITE_URL"];
});

describe("siteOrigin", () => {
  it("uses the configured SITE_URL, ignoring the request host", () => {
    process.env["SITE_URL"] = "https://campus.example.com/";
    expect(siteOrigin(request)).toBe("https://campus.example.com");
  });

  it("refuses a non-https SITE_URL and falls back to the request origin", () => {
    process.env["SITE_URL"] = "http://campus.example.com";
    expect(siteOrigin(request)).toBe("https://attacker.example");
  });

  it("falls back to the request origin when unset", () => {
    expect(siteOrigin(request)).toBe("https://attacker.example");
  });
});
