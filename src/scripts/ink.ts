/*
 * The site's one pen. Every hand-drawn line on every page comes through here,
 * so they all wobble the same way. Lines are seeded, so a given line is drawn
 * identically on every visit and every resize.
 */

const NS = 'http://www.w3.org/2000/svg';
type Pt = [number, number];

export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Catmull-Rom through the points, as cubic Béziers. */
export function smooth(pts: Pt[]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

/** A straight line as a hand would draw it: a slight bow and a little tremor. */
export function wobble(x1: number, y1: number, x2: number, y2: number, seed: number, amp = 1.2) {
  const r = rng(seed), len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const n = Math.max(3, Math.round(len / 22)), nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
  const f1 = 2 + r() * 3, f2 = 7 + r() * 6, p1 = r() * 6.28, p2 = r() * 6.28, bow = (r() - 0.5) * amp * 2;
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const o = amp * (0.6 * Math.sin(t * f1 + p1) + 0.3 * Math.sin(t * f2 + p2)) + bow * Math.sin(Math.PI * t) + (r() - 0.5) * 0.4;
    pts.push([x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o]);
  }
  return smooth(pts);
}

export function stroke(svg: SVGElement, d: string, w = 1.1, op = 0.85) {
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d);
  p.setAttribute('stroke-width', String(w));
  p.setAttribute('opacity', String(op));
  svg.appendChild(p);
  return p;
}

/** A ruled line, gone over twice — never exactly on itself. */
export function rule(svg: SVGElement, x1: number, y1: number, x2: number, y2: number, seed: number, w = 1.1, op = 0.85) {
  return [
    stroke(svg, wobble(x1, y1, x2, y2, seed), w, op),
    stroke(svg, wobble(x1 + 0.5, y1 + 0.4, x2 - 0.3, y2 + 0.4, seed + 99, 1.6), 0.55, op * 0.4),
  ];
}

/** Two short strokes at (x, y) for an arrow pointing along `ang`. */
export function arrow(svg: SVGElement, x: number, y: number, ang: number, seed: number) {
  const r = rng(seed), L = 11;
  for (const s of [-1, 1]) {
    const a = ang + Math.PI + s * (0.42 + (r() - 0.5) * 0.1);
    stroke(svg, wobble(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, seed + s, 0.5), 1.1, 0.85);
  }
}

/** A loop drawn round once and a little past, the way a hand does. */
export function loop(svg: SVGElement, cx: number, cy: number, rx: number, ry: number, seed: number, w = 1.1, op = 0.85) {
  const r = rng(seed), pts: Pt[] = [], start = r() * 6.28, n = 36;
  for (let i = 0; i <= n + 4; i++) {
    const a = start + (i / n) * Math.PI * 2, k = 1 + (r() - 0.5) * 0.03 + (i / n) * 0.035;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return stroke(svg, smooth(pts), w, op);
}

/** A loop fitted round an element's own svg layer. */
export function ring(svg: SVGElement, seed: number, pad = 2) {
  const { width: w, height: h } = svg.getBoundingClientRect();
  svg.innerHTML = '';
  loop(svg, w / 2, h / 2, w / 2 + pad, h / 2 + pad / 2, seed, 0.9, 0.8);
}

/** A box drawn as four ruled sides that overshoot at the corners. */
export function box(svg: SVGElement, l: number, t: number, rt: number, bt: number, seed: number) {
  const r = rng(seed), j = () => (r() - 0.5) * 3, o = 3;
  rule(svg, l - o + j(), t + j(), rt + o + j(), t + j(), seed + 1);
  rule(svg, rt + j(), t - o + j(), rt + j(), bt + o + j(), seed + 2);
  rule(svg, rt + o + j(), bt + j(), l - o + j(), bt + j(), seed + 3);
  rule(svg, l + j(), bt + o + j(), l + j(), t - o + j(), seed + 4);
}

/** Corner marks just outside a w × h rectangle, like a print proof. */
export function cropMarks(svg: SVGElement, w: number, h: number, seed: number, o = 9, L = 14) {
  svg.innerHTML = '';
  ([[0, 0, 1, 1], [w, 0, -1, 1], [0, h, 1, -1], [w, h, -1, -1]] as const).forEach(([x, y, sx, sy], k) => {
    rule(svg, x - sx * o, y, x - sx * (o + L), y, seed + k, 0.9, 0.8);
    rule(svg, x, y - sy * o, x, y - sy * (o + L), seed + 10 + k, 0.9, 0.8);
  });
}

/** A pencil underline across an svg layer's own width. */
export function underline(svg: SVGElement, seed: number) {
  const w = svg.getBoundingClientRect().width;
  svg.innerHTML = '';
  stroke(svg, wobble(0, 4, w, 3, seed, 0.8), 1, 0.8);
}

/** Make an <svg class="ink"> to draw into, appended to `parent`. */
export function layer(parent: Element, cls = '') {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('class', `ink ${cls}`.trim());
  s.setAttribute('aria-hidden', 'true');
  parent.appendChild(s);
  return s;
}

/**
 * Page-wide marks every page shares: underlines on [data-underline] layers,
 * loops on [data-ring], and crop marks round every [data-marks] figure.
 * Re-runs on resize and once fonts and images have settled.
 */
function marks(el: HTMLElement, seed: number) {
  let s = el.querySelector<SVGElement>(':scope > svg.marks');
  if (!s) s = layer(el, 'marks bleed');
  const target = el.querySelector<HTMLElement>(':scope > img, :scope > picture') ?? el;
  const { width, height } = target.getBoundingClientRect();
  Object.assign(s.style, { width: `${width}px`, height: `${height}px`, bottom: 'auto', right: 'auto' });
  if (width && height) cropMarks(s, width, height, seed);
  else s.innerHTML = '';
}

// Lazy images change size when they arrive; redraw their marks when they do.
const watched = new WeakSet<Element>();
const resized = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver((list) => {
  for (const { target } of list) {
    const el = target.closest<HTMLElement>('[data-marks]');
    if (el) marks(el, Number(el.dataset.seed));
  }
});

export function drawShared() {
  document.querySelectorAll<SVGElement>('svg[data-underline]').forEach((s, k) => underline(s, 970 + k));
  document.querySelectorAll<SVGElement>('svg[data-ring]').forEach((s, k) => ring(s, 990 + k, Number(s.dataset.ring) || 2));
  document.querySelectorAll<HTMLElement>('[data-marks]').forEach((el, k) => {
    el.dataset.seed = String(900 + k * 20);
    marks(el, 900 + k * 20);
    const target = el.querySelector(':scope > img, :scope > picture') ?? el;
    if (!watched.has(target)) {
      watched.add(target);
      resized?.observe(target);
      target.addEventListener('load', () => marks(el, Number(el.dataset.seed)));
    }
  });
}

/** Call `fn` now, after fonts load, and (debounced) on every resize. */
export function onLayout(fn: () => void) {
  fn();
  document.fonts?.ready.then(fn);
  addEventListener('load', fn);
  let t: number | undefined;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = window.setTimeout(fn, 80);
  });
}

/** Read JSON a page put in <script type="application/json" id="…">. */
export function data<T>(id: string): T {
  return JSON.parse(document.getElementById(id)!.textContent!);
}
