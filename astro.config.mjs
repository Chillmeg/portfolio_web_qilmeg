import { defineConfig } from 'astro/config';

/*
 * Old Cargo URLs → new pages, so links already out in the world (CVs,
 * applications, search results) keep working after the DNS cutover. Each
 * Cargo project had a set URL plus one per sub-page; all of them are listed.
 * With static output these build as small meta-refresh pages — no host config.
 */
const cargo = {
  '/': ['landinganim'],
  '/work/': ['work-nav', 'archive'],
  '/about/': ['bio'],
  '/research/': ['blogs-and-writing', 'blogs_and_writing'],
  '/work/nasa-suits-gain-ai/': ['nasa-suits', 'gain-ai', 'gain-ai-2'],
  '/work/gaussian-splatting-selection/': ['gaussian-splatting-selection', 'gaussian-splatting'],
  '/work/re-membering/': ['re-membering', 're-membering-1'],
  '/work/playback-xr/': ['playbackxr', 'playbackxr-1'],
  '/work/yertonts/': ['the-vertical-world-1', 'the-vertical-world', 'the-vertical-world-ii'],
  '/work/carespace-xr/': ['carespace-xr', 'carespace-xr-1', 'carespace-xr-iii'],
  '/work/empathy-in-point-clouds/': ['empathy-in-point-clouds', 'eipc', 'eipc-ii'],
  '/work/stool-series/': ['stool-series', 'stool-series-1', 'stool-series-ii'],
  '/work/more-room-at-the-table/': ['more-room-at-the-table', 'mrat', 'mrat-ii'],
  '/work/simulated-assemblies/': ['simulated-assemblies', 'simulated-assemblies-1', 'simulated-assemblies-ii'],
  '/work/graphic-statics/': ['the-compression-only-slab', 'compression-only-slab', 'compression-only-slab-ii'],
  '/work/multi-stable-metamaterial/': ['metamaterial', 'metamaterial-1'],
  '/work/rural-bridge-house/': ['the-rural-bridge-house', 'the-rural-bridge-house-1'],
  '/work/us-embassy-london/': ['facade-study', 'facade-study-1', 'facade-study-ii'],
  '/work/robotic-arm-3d-printing/': ['kuka-vases', 'kuka-vases-1', 'kuka-vases-ii'],
  '/work/glass-pavilion/': ['the-glass-pavillion', 'glass-pavillion', 'glass-pavillion-ii'],
  '/work/micro-sheep/': ['micro-sheep-on-kitchen-floor', 'micro-sheep', 'micro-sheep-ii'],
  '/work/ordos-reverie/': ['photograph'],
};

const redirects = Object.fromEntries(
  Object.entries(cargo).flatMap(([to, from]) => from.map((f) => [`/${f}`, to])),
);

export default defineConfig({
  site: 'https://qilmegd.com',
  redirects,

  // Static output, no adapter — on purpose.
  //
  // `dist/` comes out as plain HTML/CSS/JS that any host can serve: Vercel
  // today, a rented box later. See CONTEXT.md, "Guiding constraint: portability".
  // If a running server is ever genuinely needed, adding @astrojs/vercel or
  // @astrojs/node is a one-line change here rather than a rewrite.
  output: 'static',
});
