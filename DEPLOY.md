# Deploying CampusTutor to Netlify

## 1. Before the first deploy (locally)
- [ ] Run `bun install` and commit the updated `bun.lock` (new packages: `@netlify/blobs`, `@fontsource/outfit`, `@fontsource/dm-sans`, `axe-core`, `@testing-library/dom`).
- [ ] Run `npm test`, `npm run lint` and `npx tsc --noEmit`. All should pass.
- [ ] Optional: `NITRO_PRESET=netlify npm run build` should succeed.

## 2. Create the site
- [ ] Push the repo to GitHub.
- [ ] In Netlify: Add new site → Import an existing project → pick the repo.
- [ ] Build settings come from `netlify.toml` (`npm run build`, publish `dist`). Confirm they are shown.

## 3. Environment variables (Site configuration → Environment variables)
- [ ] `SITE_URL` = your real `https://` domain, with no trailing slash.
- [ ] `LOVABLE_API_KEY` = key for the AI plan helper. Without it the plan helper shows "isn't configured yet"; the rest of the site still works.
- [ ] `PLAN_DAILY_LIMIT` (optional, default 300).
- [ ] `PLAN_HELPER_ENABLED` (optional). Set to `false` to disable the plan helper instantly.

## 4. Check the deploy preview before going live
- [ ] Open the deploy preview on a phone. Check the layout and fonts.
- [ ] Choose a subject card. The subject field should fill in.
- [ ] Submit an enquiry with no name. You should see "Please add your name."
- [ ] Submit a valid enquiry. WhatsApp should open with the message filled in.
- [ ] Fill in goals and click "Suggest my plan". You should get a plan, or a clear message if the key isn't set.
- [ ] Check the browser console. There should be no Content-Security-Policy errors.
- [ ] Check the response headers. `Content-Security-Policy` (with a nonce), `Strict-Transport-Security` and `X-Frame-Options` should all be present.
- [ ] Open `/sitemap.xml` and `/robots.txt`. They should show your `SITE_URL`.

## 5. Go live
- [ ] Promote the deploy, or set the production branch.
- [ ] Attach your custom domain under Domain management, and set `SITE_URL` to match it.
- [ ] Watch the function logs for the first few hours. Look for `plan error` and `shared rate limit unavailable`.

## Known limits
- The rate limiter's shared counters (Netlify Blobs) are only verified locally with the in-memory fallback. Confirm on the first deploy.
- The project is still connected to Lovable. Decide which one publishes, to avoid conflicting pushes.
- Bot protection (e.g. Turnstile) is not installed. The rate limit and daily cap are the only abuse controls.
