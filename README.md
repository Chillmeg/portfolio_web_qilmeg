# qilmegd.com

Personal portfolio. Astro, static output, deployed on Vercel from `main`.

Almost everything you'll change is **data**, not layout. Edit a file in
`src/data/`, drop images in `src/assets/`, check it locally, push.

---

## 1. Everyday loop

```bash
npm install          # first time only, or after package.json changes
npm run dev          # live preview at http://localhost:4321 — reloads on save
npm run build        # the real check: must end with "Complete!"
git add -A
git commit -m "what changed"
git push             # Vercel deploys main automatically (~1 min)
```

Always run `npm run build` before pushing. It fails loudly on a missing image
or a typo'd filename. A failed build means Vercel keeps serving the old site.

---

## 2. Where things live

| What | File / folder |
|---|---|
| Projects (map, work list, project pages) | `src/data/projects.ts` |
| Project gallery images | `src/assets/projects/<slug>/` |
| Project cover image | `src/assets/thumbnail/` |
| Hover videos for the map | `public/video/` |
| Papers, writing, research topics | `src/data/research.ts` |
| About page (CV) | `src/data/cv.ts` |
| Headshot | `src/assets/about/headshot.jpg` |
| CV download | `public/cv.pdf` |
| Old Cargo URL redirects | `astro.config.mjs` |
| Colours, fonts, spacing | `src/styles/theme.css` |
| Hand-drawn lines (shared pen) | `src/scripts/ink.ts` |

---

## 3. Projects

### Add a project

1. Pick a **slug**: lowercase, hyphens, e.g. `light-field-study`.
   It becomes the URL `/work/light-field-study/`.
2. Make the folder `src/assets/projects/light-field-study/` and put the
   gallery images in it (jpg, png, webp, avif or svg).
3. Optional: put a cover image in `src/assets/thumbnail/`.
4. Add an entry to the `all` array in `src/data/projects.ts`.
   **Position in the array = order on the work page** (top = first).

```ts
{
  slug: 'light-field-study',
  title: 'Light Field Study',
  lens: ['developer', 'designer'],     // filter tags: Engineering / Designing
  type: 'Computational imaging',       // small mono label above the title
  short: 'Light Field',                // label on the landing map (keep short)
  map: { x: -0.4, y: 0.2 },            // landing-map position, see below
  thumb: 'lightfield.png',             // file in src/assets/thumbnail/ (optional)
  meta: [                              // credit lines under the title
    { text: 'MIT 6.8300' },
    { text: 'With Jane Doe', href: 'https://…' },
    { text: 'Spring 2027' },
  ],
  body: [                              // one string per paragraph
    'First paragraph.',
    'Second paragraph.',
  ],
  links: [{ label: 'GitHub', href: 'https://github.com/…' }],
  media: [],                           // videos / embeds, see below
  images: [                            // gallery order + captions (optional)
    { file: 'hero.png', caption: 'Final rig' },
    'process-1.jpg',
  ],
},
```

Only `slug`, `title`, `lens`, `type`, `short` and `map` are required.

### Landing-map position (`map`)

```
            y = +1  Experience
                 ▲
 x = −1 ◄────────┼────────► x = +1
 Engineering     │        Designing
                 ▼
            y = −1  System
```

- Values run −1 to +1. `{ x: 0, y: 0 }` is under your name, so avoid it.
- Keep at least ~0.15 away from other dots, or labels collide.
- The same numbers drive the minimap on the work page and the
  `x +0.40 · y −0.20` caption.

### Images

- **Gallery:** every image in `src/assets/projects/<slug>/` shows on the
  project page. Files listed in `images` come first, in that order, with their
  captions. Unlisted files follow, alphabetically. So you can just drop a file
  in.
- **Hide an image without deleting it:** add its filename to `hide`:
  ```ts
  hide: ['old-draft.png', 'unused-diagram.png'],
  ```
- **Cover** (work page + map hover): `thumb` if set, otherwise the first
  gallery image. With neither, the page shows "clip to come".
- Images are never cropped. Any aspect ratio is fine.
- Resize huge originals to ~2500px on the long side before adding them. The
  site makes web versions automatically, but large files slow the build and
  bloat the repo.
- A filename in `images`, `hide` or `thumb` that doesn't exist **fails the
  build**, on purpose. Check spelling and extension (`.PNG` ≠ `.png`).

### Video and embeds (`media`)

Shown above the gallery on the project page.

```ts
media: [
  // YouTube: the id is the part after v= in the URL
  { kind: 'youtube', id: 's842ibIC3Ds', title: 'Demo', start: 1, autoplay: true },

  // Any other site in a frame (splat viewers, live apps, class pages)
  { kind: 'embed', src: 'https://…', title: 'Viewer', aspect: '16 / 11' },

  // Your own video file, put in public/video/
  { kind: 'video', src: '/video/demo.mp4', poster: '/video/demo.jpg' },
],
```

`caption` works on all three. Autoplaying YouTube is muted (browsers block
sound on autoplay).

### Hover video on the landing map

1. Export a short silent loop: 5–10 s, ~1280px wide, H.264 `.mp4`,
   ideally under 3 MB.
2. Put it in `public/video/`, e.g. `public/video/light-field.mp4`.
3. Add to the project: `video: '/video/light-field.mp4'`.

Without `video`, the cover image shows on hover instead.

### Archive, hide, reorder

| Want | Do |
|---|---|
| Move to "older work" at the bottom of the work list | `archived: true` |
| Take off the site completely, keep everything | `hidden: true` |
| Reorder the work list | move the entry within the array |
| Delete for good | remove the entry **and** its image folder |

`hidden: true` removes the map dot, the work row and the page itself. If the
project had an old Cargo URL in `astro.config.mjs`, point it somewhere else
(as done for `photograph` → `/work/`), or that link breaks.

---

## 4. Research page (papers, writing, concept map)

Everything is in `src/data/research.ts`. The map draws itself: each entry
settles between the topics it lists, and points push apart so they don't
overlap. **You never position a paper by hand.**

### Add a paper

Add an object to `entries`. **Order = numbering** (01, 02, …), so put new
papers at the top if you want newest first.

```ts
{
  kind: 'p',                                   // 'p' paper, 'w' writing
  title: 'Paper title in sentence case',
  by: 'Doudatcz, Q., Smith, A., & Nagakura, T.',  // your name is bolded automatically
  venue: 'CHI 2027 · ACM',
  href: 'https://doi.org/…',                   // the "read paper →" link
  topics: ['ai', 'xr'],                        // ids from the topics list
},
```

Optional fields:

- `status: 'accepted'`: shown instead of the link when there's nothing to read
  yet (use `'in preparation'`, `'under review'`, etc.). Remove it and add `href`
  once it's out.
- `award: 'best paper award'`: shown next to the venue.

Bolding matches `me = 'Doudatcz, Q.'` exactly, so write your name that way in
`by`.

### Add writing (blog post, notes, project blog)

Same as a paper, with `kind: 'w'` and `href` pointing to the post. Writing
appears as dashed dots on the map and in its own list.

### Topics (the italic words on the map)

```ts
export const topics = [
  { id: 'ai', name: 'spatial AI', x: 0.3, y: 0.2 },
  …
];
```

- `id`: short key used in entries' `topics`. Don't rename one without updating
  every entry that uses it.
- `name`: the word shown on the map. Safe to reword anytime.
- `x`, `y`: position from 0 to 1. x: 0 = left, 1 = right. **y: 0 = top,
  1 = bottom** (the opposite of the landing map).
- **Add a topic:** new line with a fresh `id`, placed in an empty part of the
  map, then tag entries with it.
- **Remove a topic:** delete the line and remove its `id` from every entry.
- If points crowd, move nearby topics apart. Papers follow automatically.

---

## 5. About page (CV)

All in `src/data/cv.ts`.

| Change | Edit |
|---|---|
| Opening line | `statement` |
| Short paragraph | `bio` |
| Email / social links | `links` (`ring: true` circles one) |
| Degrees | `education.items` |
| Skills | `skills`: `['Group name', ['skill', 'skill']]` |
| Research, industry, awards, teaching | `roadmap` sections |
| Downloadable CV | replace `public/cv.pdf` (same name, so the link keeps working) |
| Photo | replace `src/assets/about/headshot.jpg` (same name) |

A CV entry:

```ts
{ when: 'Jun – Sep 2027', title: ['Research Intern'], where: 'Company or Lab' },
```

- `title` is a list: two items show as two lines (like the MIT degrees).
- Newest first within each section.
- `compact: true` on a section makes it one-liners (awards, teaching).
- **New section:** add `{ heading: 'Exhibitions', items: [ … ] }` to `roadmap`
  where you want it to appear.
- Publications aren't listed here. The page points to `/research/`, so add
  papers there only.

---

## 6. Blog

**Status: not wired up yet.** `src/content/blog/` exists and is where posts
will live, but no page reads from it yet, so a Markdown file there won't
appear on the site.

The plan:

1. **Junction (one-time, you run it).** Make the vault's `07_Blog` folder point
   at this repo's `src/content/blog`. Run in Command Prompt as administrator:
   ```bat
   rmdir D:\Obsidian_Notes\Obsidian_Init\07_Blog
   mklink /J D:\Obsidian_Notes\Obsidian_Init\07_Blog D:\01_Atlas\portfolio\portfolio_web_qilmeg\src\content\blog
   ```
   Move any existing posts out of `07_Blog` first; `rmdir` only removes an
   empty folder. Notes written there in Obsidian then live in the repo.
2. **Site side (still to build):** a blog collection, a page per post at
   `/writing/<slug>/`, and posts added automatically to the research list and
   map, with topics from frontmatter.

**Until then:** publish the post elsewhere and add it to the research page as
a `kind: 'w'` entry with its `href` (section 4).

---

## 7. Redirects (old Cargo links)

`astro.config.mjs` maps old URLs to new pages so links on old CVs and
applications keep working:

```js
'/work/light-field-study/': ['old-cargo-name', 'old-cargo-name-1'],
```

Add a line when you rename a slug, so the old URL still lands somewhere.

---

## 8. Look and feel

- **Colours, fonts, spacing:** tokens at the top of `src/styles/theme.css`
  (`--paper`, `--ink`, `--sans`, …). Change them there, never per page.
- **Hand-drawn lines** come from `src/scripts/ink.ts`. In markup:
  - `<svg class="ink" data-underline></svg>` inside an element: pencil
    underline.
  - `<svg class="ink" data-ring></svg>`: hand-drawn loop around it.
  - `data-marks` on an image wrapper: crop marks at its corners.

  Lines are seeded, so they look the same on every visit. Don't hand-write SVG
  paths in pages.
- **Fonts:** Poppins (names, titles, nav), IBM Plex Mono (labels, dates,
  coordinates), EB Garamond italic (margin notes).
- **Layout changes** (landing map, work tree, research map) are in
  `src/pages/*.astro`. They're the only files with real logic, so edit them
  with care and check desktop and phone width.

---

## 9. When something breaks

| Symptom | Likely cause |
|---|---|
| Build says `images lists "x.png", not found` | filename typo or wrong folder (`src/assets/projects/<slug>/`) |
| Build says `thumb "x" not found` | file not in `src/assets/thumbnail/` |
| Red squiggles / build error in a `.ts` file | missing comma, quote or `}`; check the line it names |
| New project missing from the map | `hidden: true` set, or the build failed (Vercel keeps the old site) |
| Two labels overlap on the map | nudge `map` x/y apart |
| Research dots crowded | move topic `x`/`y` apart |
| Change not live after pushing | check the Vercel dashboard for a failed deploy |
| Dev server shows stale styles | stop it (Ctrl+C) and run `npm run dev` again |

See `CONTEXT.md` for hosting, domain and architecture decisions.
