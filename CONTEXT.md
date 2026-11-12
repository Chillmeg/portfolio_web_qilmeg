# Project context — qilmegd.com

Personal portfolio site. Read this before making architectural suggestions.

## Where things stand

- **Repo:** this one. An Astro site with static output (`output: 'static'`, no adapter).
  Pages: `/` (landing map), `/work/` and `/work/<slug>/`, `/research/`, `/about/` (the CV).
  Old Cargo URLs redirect via `astro.config.mjs`.
- **Domain:** qilmegd.com. Mid-transfer from Cargo to Porkbun, completes ~24 Aug 2026.
  DNS is not yet pointed anywhere new — that's the last step, deliberately.
- **Hosting:** Vercel, deploying from this repo. Not yet connected to the custom domain;
  currently reachable only at the `.vercel.app` URL.
- **Migrating off:** Cargo (hosted site builder). Content is being rebuilt from scratch —
  there was no export path, so nothing is being ported.

## Decisions already made

**Astro** is the framework (adopted). Chosen
specifically for its adapter model: `@astrojs/node` and `@astrojs/vercel` mean the
deploy target can change without a rewrite. Don't suggest Next.js — it was considered
and passed over for being more Vercel-shaped.

**Vercel** over GitHub Pages, because Pages can't run a Node server and the option
needs to stay open.

**Porkbun** over Cloudflare Registrar, because it keeps registration and DNS separable —
nameservers can be delegated elsewhere later without moving the registration.

**MongoDB** if a database is ever needed. May not be needed at all.

## Guiding constraint: portability

The long-term goal is the option to **self-host on a personal VPS** rather than stay on
managed platforms indefinitely. Vercel is a convenience, not a commitment. Concretely:

- Keep platform-specific primitives (Vercel KV, edge middleware, etc.) out of the code.
  If one is genuinely needed, isolate it behind a single module so it's one file to replace.
- All database access goes in one module. Plain driver + connection string, no
  Atlas-specific features.
- Add a `Dockerfile` once there's a real Node app, even while deploying to Vercel.
  If it runs in a container locally, it runs on any rented box.
- Node is wanted as a **build tool** (bundling, static generation). A running backend
  server is a maybe, not a plan.

## Design system (Nov 2026 redesign)

- **Look:** warm paper `#F9F8F5`, soft ink `#232120`, no texture. Content clusters toward
  the centre; header and corner furniture stay at the edges.
- **Type:** Poppins (name, titles, nav) · IBM Plex Mono (data: labels, dates, coordinates)
  · EB Garamond italic (margin notes). All self-hosted via `@fontsource`.
- **Lines:** every hand-drawn line comes from `src/scripts/ink.ts` (seeded wobble, drawn
  twice). Don't hand-write SVG paths in pages. `[data-marks]`, `[data-underline]` and
  `[data-ring]` are drawn automatically by `Base.astro`.
- **Landing map:** x = engineering ↔ designing, y = system ↔ experience. Each project's
  position, short label and type live in `projects.ts` (`map`, `short`, `type`).
  Optional `video` (in `public/video/`) plays on hover; otherwise the thumbnail shows.
- **Images are never cropped** on work figures and project pages.
- **Data, not markup:** projects in `src/data/projects.ts`, papers/writing and research
  topics in `src/data/research.ts`, CV in `src/data/cv.ts`.

## Next

1. Pair a short silent loop with each featured project (`video` in `projects.ts`).
2. Blog: posts will live in `src/content/blog/`, reached from Obsidian through a junction
   from the vault's `07_Blog` folder. Never read the rest of the vault.
3. Connect the custom domain (see below).

## DNS — do not guess values

When the time comes to point qilmegd.com at Vercel:

- Add **both** `qilmegd.com` and `www.qilmegd.com` in Vercel's Project Settings → Domains,
  and set one to redirect to the other.
- Vercel issues **per-project** DNS values now (e.g. `abc123.vercel-dns-017.com`), not the
  old universal `cname.vercel-dns.com` / `76.76.21.21`. Read the exact records off the
  project's own Domains page. Any value from a tutorial or from memory is likely stale.
- In Porkbun there are currently five leftover GitHub Pages records (four A on the apex,
  one `www` CNAME). **Delete these** when adding Vercel's — one destination per name, or
  visitors get split between hosts.
- Keep TTL at 600 during any cutover.

## Out of scope

Anything involving the domain transfer itself, the Porkbun account, or Cargo. That's
handled outside this repo.
