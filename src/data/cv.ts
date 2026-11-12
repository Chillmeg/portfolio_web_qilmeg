/*
 * The about page is the CV, kept short: a roadmap of where she's been. The full
 * detail lives in public/cv.pdf, linked from the top of the page.
 */

export interface CvItem {
  when: string;
  /** Lines of the title; most entries have one. */
  title: string[];
  where?: string;
}

export interface CvSection {
  heading: string;
  /** compact: one-liners (awards, teaching). Otherwise title + place. */
  compact?: boolean;
  items: CvItem[];
}

export const statement =
  'Designer, developer and researcher working on 3D neural scene representations, using how people move through digitized spaces to build more human-centred computer vision.';

export const bio =
  'S.M. EECS and SMArchS Computation at MIT. Previously M.Arch at the University of Michigan Taubman College and B.Eng. in Civil Engineering at Southeast University, Nanjing. Most recently a perception software intern at Glydways, reconstructing driving scenes with 3D Gaussian Splatting.';

/* To update the CV itself, replace public/cv.pdf — the link doesn't change. */
export const links = [
  { label: 'cv.pdf ↓', href: '/cv.pdf', ring: true },
  { label: 'qlmg954@mit.edu', href: 'mailto:qlmg954@mit.edu' },
  { label: 'github', href: 'https://github.com/Chillmeg' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/qilmegdoudatcz/' },
  { label: 'instagram', href: 'https://www.instagram.com/chillmeggg' },
  { label: 'mit profile', href: 'https://architecture.mit.edu/people/qilmeg-doudatcz' },
];

export const education: CvSection = {
  heading: 'Education',
  items: [
    {
      when: 'exp. 2027',
      title: ['S.M. Electrical Engineering & Computer Science', 'S.M. Architecture Studies, Computation'],
      where: 'Massachusetts Institute of Technology',
    },
    { when: '— 2024', title: ['Master of Architecture'], where: 'University of Michigan, Taubman College' },
    { when: '— 2021', title: ['B.Eng. Civil Engineering'], where: 'Southeast University, Nanjing' },
  ],
};

/** Shown straight after education: what she can do before where she's been. */
export const skills: [string, string[]][] = [
  ['Languages & systems', ['Python', 'C++', 'Bash', 'JavaScript/Node', 'HTML/CSS', 'Linux (Ubuntu)', 'WSL2', 'Git']],
  [
    'Computer vision & 3D',
    ['COLMAP structure-from-motion', '3D Gaussian Splatting', 'camera models (pinhole, fisheye, equirectangular)', 'camera–LiDAR registration', 'terrestrial LiDAR', 'SAM 2'],
  ],
  [
    'ML & imaging',
    ['PyTorch', 'CNNs', 'vision transformers (ViT, VideoMAE)', 'fine-tuning', 'HDR processing', 'vision-language models', 'OpenCV', 'NumPy', 'FFmpeg'],
  ],
  ['Real-time & web', ['Unity', 'Unreal Engine 5', 'OpenXR', 'Three.js', 'WebXR', 'React', 'Node']],
];

export const roadmap: CvSection[] = [
  {
    heading: 'Research',
    items: [
      { when: 'Jan 2026 –', title: ['Graduate Research Assistant'], where: 'MIT Architecture Representation & Computation Group' },
      { when: 'Aug 2025 –', title: ['Graduate Research Assistant'], where: 'Livable Space Lab, MIT' },
      { when: '2024 – 2025', title: ['Research Assistant & Game Designer'], where: 'Simulated Assemblies Lab, UMich' },
      { when: '2023 – 2024', title: ['Visualization Specialist, FARO LiDAR capture'], where: 'Empathy in Point Clouds Scan Lab, UMich' },
      { when: '2023 – 2024', title: ['Research Assistant'], where: 'DESIGN EARTH, UMich' },
      { when: '2022 – 2023', title: ['Research Assistant'], where: 'More Room at the Table, UMich' },
    ],
  },
  {
    heading: 'Industry',
    items: [
      { when: 'Jun – Sep 2026', title: ['Software Engineer Intern, Perception'], where: 'Glydways' },
      { when: 'Jan – May 2024', title: ['3D Artist Fellow'], where: 'University of Michigan Center for Academic Innovation' },
    ],
  },
  {
    heading: 'Awards & honours',
    compact: true,
    items: [
      { when: '2026', title: ['HCI International 2026, Best Poster Award'] },
      { when: '2026', title: ['NASA SUITS Challenge, Winner (Team PR Lead)'] },
      { when: '2026', title: ['MIT Web Lab Competition, Most Unique Concept Award'] },
      { when: '2025', title: ['MIT School of Architecture and Planning Department Fellowship'] },
      { when: '2024', title: ['Burton L. Kampner Memorial Award (Taubman College best thesis)'] },
      { when: '2024', title: ['RIBA President’s Medals, Silver Medal category, nominee'] },
      { when: '2023', title: ['UMich Arts Initiative Graduate Student Arts Funding Grant'] },
      { when: '2023', title: ['Arts Integrative Interdisciplinary Research (AiiR) Grant, Arts Engine'] },
      { when: '2023', title: ['UMich XR Student Showcase, Best Use of XR for Research'] },
      { when: '2021', title: ['Southeast University Distinguished Bachelor’s Thesis Award'] },
    ],
  },
  {
    heading: 'Teaching & service',
    compact: true,
    items: [
      { when: '2026', title: ['Teaching Assistant, MIT 6.9020 How to Make Almost Anything'] },
      { when: '2023 – 2024', title: ['Teaching Assistant, ARCH 314/324 Structures I–II, UMich'] },
      { when: '2023 – 2024', title: ['Workshop Instructor, ARCH 509 Point Clouds and Unreal Worlds; ARCH 662 Blender Workshop'] },
      { when: '2023 – 2024', title: ['Invited Reviewer, UMich design studios (ARCH 432, 442, 662, 672)'] },
    ],
  },
];
