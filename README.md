# CF Forge

An all-in-one Codeforces training site: contest types decoded, the 36 problem tags, and problems explained in 11 parts with real C++ solutions. English and Bangla.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion. Hosting on Cloudflare Pages (+ Workers), data on Neon Postgres with Neon Auth, AI tutor on Gemini.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Project layout

```
src/
  components/        shared UI (header, code block, rank ladder…)
  pages/             one file per route
  i18n/              EN/BN strings and the language provider
  data/
    contests.ts      contest types, scoring systems, slot ratings
    tags/tags.ts     the 36 Codeforces tags (bilingual)
    problems/
      types.ts       ProblemEntry schema (the 11-part problem page)
      p4A.ts …       one file per problem
      index.ts       the problem pool
```

### Adding a problem

1. Create `src/data/problems/p<ID>.ts` exporting a `ProblemEntry`.
2. Add it to `PROBLEMS` in `src/data/problems/index.ts`.
3. Featured problems (`featuredFor`) carry 5 solutions: up to 5 genuinely different methods, remaining slots filled with the ladder brute → better → optimal → STL → alternative style.

## Build phases

| Phase | What ships | You set up before it |
| --- | --- | --- |
| 1 | Design system, EN/BN, contest guide, 36 tag pages, ProblemEntry schema, first problems | — |
| 2 | Deploy on Cloudflare Pages | Connect this repo in Cloudflare Pages |
| 3 | Login (email + password, Continue with Google), login required | Neon project + Neon Auth |
| 4 | Live Codeforces profile (user's own handle) and real verdicts | — |
| 5 | In-browser C++ compiler (WebAssembly) for Run | — |
| 6 | C++ from zero course + STL toolkit | — |
| 7 | Gemini AI tutor on every page, per-user daily limit | Gemini API key from Google AI Studio |
| 8+ | Problem waves toward ~1000 explained problems | — |

## Deploying to Cloudflare Pages

- Framework preset: **Vite** (or none)
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 22 (from `.node-version`)

`public/_redirects` sends every route to `index.html` so deep links work.

Secrets (Neon, Gemini) go into **Cloudflare → Pages → Settings → Variables and Secrets**, never into the repo.

---

CF Forge is an independent training site and is not affiliated with Codeforces. Problem statements are retold in our own words; the full originals live on Codeforces.
