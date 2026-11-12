/*
 * Papers and writing for /research/.
 *
 * The map places each entry between the topics it lists and keeps points from
 * overlapping, so adding one is just a new object below. A new topic needs a
 * name and a rough position: x and y from 0 (left/top) to 1 (right/bottom).
 */

export interface Topic {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface Entry {
  /** p = paper or preprint, w = writing (blog posts, notes). */
  kind: 'p' | 'w';
  title: string;
  by: string;
  venue: string;
  /** Shown instead of a link when there's nothing to read yet. */
  status?: string;
  award?: string;
  href?: string;
  topics: string[];
}

export const topics: Topic[] = [
  { id: 'ai', name: 'spatial AI', x: 0.3, y: 0.2 },
  { id: 'xr', name: 'extended reality', x: 0.66, y: 0.24 },
  { id: 'soft', name: 'soft robotics', x: 0.9, y: 0.5 },
  { id: 'heritage', name: 'heritage & memory', x: 0.62, y: 0.82 },
  { id: 'capture', name: '3D capture', x: 0.08, y: 0.55 },
  { id: 'body', name: 'how people perceive space', x: 0.42, y: 0.56 },
  { id: 'build', name: 'building performance', x: 0.2, y: 0.88 },
];

/** Bolded wherever it appears in an author list. */
export const me = 'Doudatcz, Q.';

export const entries: Entry[] = [
  {
    kind: 'p',
    title: 'Designing AI to design experiments for studying humans in spatial design: framework and case study',
    by: 'Doudatcz, Q., & Nagakura, T.',
    venue: 'ACADIA 2026',
    status: 'accepted',
    topics: ['ai', 'body'],
  },
  {
    kind: 'p',
    title: 'Context-aware AI assistant and AR interface for lunar extravehicular activity procedural guidance',
    by: 'Gallardo, R., Doudatcz, Q., Goldstein, G., Sarimehmetoglu, I., Mutis, S., Kyaw, A. H., Lin, A., Emmerling, C., Ataman, B., & Tibbits, S.',
    venue: "SIGGRAPH '26 Posters · ACM",
    href: 'https://doi.org/10.1145/3799825.3818743',
    topics: ['ai', 'xr'],
  },
  {
    kind: 'p',
    title: 'Affective translation: emotional engagement with textile soft robots across physical and augmented embodiments',
    by: 'Ataman, B., Gallardo, R., & Doudatcz, Q.',
    venue: 'HCI International 2026 Posters · Springer',
    award: 'best poster award',
    href: 'https://doi.org/10.1007/978-3-032-30819-1_1',
    topics: ['soft', 'xr', 'body'],
  },
  {
    kind: 'p',
    title: 'Morphic Memory: a crowdsourced vision-language framework for documenting vernacular architectural intelligence',
    by: 'Doudatcz, Q., & Nagakura, T.',
    venue: 'SiGraDi 2026',
    status: 'accepted',
    topics: ['ai', 'heritage'],
  },
  {
    kind: 'p',
    title: 'Affective translation: material and virtual embodiments of kinetic textile robots',
    by: 'Ataman, B., Gallardo, R., & Doudatcz, Q.',
    venue: 'arXiv 2025 · cs.HC',
    href: 'https://doi.org/10.48550/arXiv.2601.11543',
    topics: ['soft', 'xr'],
  },
  {
    kind: 'p',
    title: 'Yertönts, the vertical world',
    by: 'Doudatcz, Q.',
    venue: 'Dimensions 38(1) · 2025',
    topics: ['heritage', 'xr'],
  },
  {
    kind: 'p',
    title: 'Measured thermal comfort performance of custom rice-husk insulation in cold-climate emergency shelters',
    by: 'Tuladhar, S.*, Doudatcz, Q.*, & Samuelson, H.',
    venue: 'Target: Building and Environment',
    status: 'in preparation',
    topics: ['build'],
  },
  {
    kind: 'w',
    title: 'Multimodal scene representation learning for spatial and temporal understanding in video',
    by: 'Erus, D., Liu, Y., & Doudatcz, Q.',
    venue: 'MIT 6.7960 · project blog · 2025',
    href: 'https://chillmeg.github.io/25FA_MIT_67960_DL/',
    topics: ['ai', 'capture'],
  },
  {
    kind: 'w',
    title: 'RealityCapture workflow notes: photogrammetry for spatial reconstruction',
    by: 'Doudatcz, Q.',
    venue: 'Notes',
    href: 'https://upbeat-temper-37d.notion.site/264575007a8c80d2bc58c9b72de221bd?v=264575007a8c801b8f9e000c4986d3fc&source=copy_link',
    topics: ['capture'],
  },
];
