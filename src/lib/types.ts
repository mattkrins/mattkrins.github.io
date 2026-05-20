export interface GalleryImage {
  src: string;
  desc?: string;
}

export interface SkillTag {
  label: string;
  color?: string;
  description?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  descriptionHtml: string;
  skills: SkillTag[];
  hero: { src: string; alt: string };
  gallery?: GalleryImage[];
  links?: { live?: string; repo?: string };
  date?: string | number;
  status?: string;
  affiliation?: string;
}
