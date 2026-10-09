// Canonical origin for absolute URLs (sitemap, robots). Prefer the configured
// SITE_URL so a spoofed Host header can never change what gets served; fall back
// to the request origin only when it is not configured.
export function siteOrigin(request: Request): string {
  const configured = process.env["SITE_URL"]?.trim().replace(/\/+$/, "");
  if (configured && /^https:\/\//.test(configured)) return configured;
  return new URL(request.url).origin;
}
