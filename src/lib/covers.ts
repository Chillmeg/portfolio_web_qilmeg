import { getImage } from 'astro:assets';
import type { Project } from '../data/projects';

const thumbs = import.meta.glob<{ default: ImageMetadata }>('../assets/thumbnail/*.{jpeg,jpg,png,webp,avif}', {
  eager: true,
});
const gallery = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/*.{jpeg,jpg,png,webp,avif}', {
  eager: true,
});

export interface Cover {
  src: string;
  /** The original's proportions, so figures can be sized without cropping. */
  w: number;
  h: number;
}

/**
 * The still that stands for a project on the map and the work page: its
 * thumbnail, or failing that the first image in its gallery. Projects with
 * neither get null, and the page shows "clip to come" instead.
 */
export async function cover(project: Project, width = 1000): Promise<Cover | null> {
  let meta: ImageMetadata | undefined;
  if (project.thumb) {
    meta = thumbs[`../assets/thumbnail/${project.thumb}`]?.default;
    if (!meta) throw new Error(`${project.slug}: thumb "${project.thumb}" not found in src/assets/thumbnail/`);
  } else {
    const first = (project.images ?? []).map((s) => (typeof s === 'string' ? s : s.file))[0];
    const keys = Object.keys(gallery).filter((k) => k.includes(`/projects/${project.slug}/`)).sort();
    const key = keys.find((k) => first && k.endsWith(`/${first}`)) ?? keys[0];
    meta = key ? gallery[key].default : undefined;
  }
  if (!meta) return null;
  const img = await getImage({ src: meta, width: Math.min(width, meta.width), format: 'webp', quality: 75 });
  return { src: img.src, w: meta.width, h: meta.height };
}
