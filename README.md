# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deploying to Netlify

1. Push this project to GitHub (Lovable: Connectors → GitHub).
2. In Netlify choose **Add new site → Import an existing project** and pick the repository.
3. Leave the detected settings: build command `npm run build`, publish directory `dist` (both are also set in `netlify.toml`).
4. Click **Deploy**. Pages are served through a Netlify function, so no extra setup is needed.

## Configuration

| Variable | Purpose |
| --- | --- |
| `LOVABLE_API_KEY` | Key for the AI plan helper. Never sent to the browser. |
| `PLAN_HELPER_ENABLED` | Set to `false` to switch the plan helper off instantly. |
| `PLAN_DAILY_LIMIT` | Global daily cap on plan requests (default 300). |
| `SITE_URL` | Canonical `https://` origin for `sitemap.xml` and `robots.txt`. |

Set these in Netlify under **Site configuration → Environment variables**.

## Security notes

- Every HTML response gets a per-request Content-Security-Policy with a nonce (`src/server.ts`). Scripts and styles without the nonce are blocked.
- Plan requests are limited per client (5 per 10 minutes) and per day. Counters live in Netlify Blobs, so they are shared across instances. Outside Netlify, limits fall back to per-instance memory.
- Upstream AI errors are logged on the server only.

## Testing

```sh
npm test          # unit and component tests (vitest)
npm run lint
npx tsc --noEmit
```
