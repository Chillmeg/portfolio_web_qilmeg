/*
 * The Work side menu, exactly as it was on Cargo ("Side Meu" page). Labels are
 * deliberately not the project titles — Cargo used shorter names, and a couple
 * point somewhere unexpected ("Woodworking" is the US Embassy facade study,
 * "Scan Work Selection" is Empathy in Point Clouds).
 *
 * `slug` links to /work/<slug>/; `href` is an outside link, opened in a new tab.
 * Archived projects aren't listed here, same as on Cargo.
 */
export type MenuItem = { label: string; slug: string } | { label: string; href: string };

export const menu: { section: string; items: MenuItem[] }[] = [
  {
    section: 'Machine Learning',
    items: [
      { label: 'NASA SUITS GAIN_AI', slug: 'nasa-suits-gain-ai' },
      {
        label: 'Multimodal Scene Representation Learning',
        href: 'https://chillmeg.github.io/25FA_MIT_67960_DL/',
      },
      { label: 'Gaussian Splatting Selection', slug: 'gaussian-splatting-selection' },
    ],
  },
  {
    section: 'Spatial Computing',
    items: [
      { label: 'Re-Membering (HTMAA, 2025)', slug: 're-membering' },
      { label: 'PlaybackXR (Web Lab)', slug: 'playback-xr' },
      { label: 'Yertönts, the Vertical World', slug: 'yertonts' },
      { label: 'CareSpaceXR (UMich XR Summit)', slug: 'carespace-xr' },
      { label: 'Scan Work Selection', slug: 'empathy-in-point-clouds' },
    ],
  },
  {
    section: 'Design & Game Dev & Comp',
    items: [
      { label: 'Stool Series', slug: 'stool-series' },
      { label: 'More Room at The Table', slug: 'more-room-at-the-table' },
      { label: 'Simulated Assemblies', slug: 'simulated-assemblies' },
      { label: 'Graphic Statics', slug: 'graphic-statics' },
      { label: 'Multi-Stable Metamaterial', slug: 'multi-stable-metamaterial' },
      { label: 'Rural Bridge House', slug: 'rural-bridge-house' },
    ],
  },
  {
    section: 'Crafting',
    items: [
      { label: 'Woodworking', slug: 'us-embassy-london' },
      { label: 'Robotic Arm 3D Printing', slug: 'robotic-arm-3d-printing' },
    ],
  },
];

/* Thumbnail grid on /work/, in Cargo's order, three to a row. */
export const workGrid: string[] = [
  'nasa-suits-gain-ai',
  're-membering',
  'playback-xr',
  'gaussian-splatting-selection',
  'yertonts',
  'carespace-xr',
  'more-room-at-the-table',
  'empathy-in-point-clouds',
  'stool-series',
  'simulated-assemblies',
  'graphic-statics',
  'us-embassy-london',
  'robotic-arm-3d-printing',
  'rural-bridge-house',
  'multi-stable-metamaterial',
];
