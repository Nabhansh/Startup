<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep CampusTutor's landing page in the index route and its visual system in global semantic CSS tokens, so the uploaded site stays native to TanStack Start.
- Enquiries are a client-side WhatsApp handoff to the configured contact; sending completes only when the student presses send in WhatsApp, so never claim delivery beyond opening that chat.
- Netlify hosting is configured in netlify.toml (build target set through NITRO_PRESET there); keep vite.config.ts on the default target so Lovable publishing keeps working.
- AI plan helper runs in a server function (src/lib/plan.*) so the AI key never reaches the browser.
- sitemap.xml and robots.txt use SITE_URL when set (see netlify.toml), falling back to the request origin.
