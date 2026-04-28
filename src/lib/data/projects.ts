import { load as parseYaml } from 'js-yaml';
import { marked } from 'marked';
import { skills as skillRegistry } from '../../content/skills';
import type { GalleryImage, Project, SkillTag } from '$lib/types';

const files = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

interface ProjectFrontmatter {
  title: string;
  summary: string;
  slug?: string;
  date?: string | number;
  status?: string;
  hero: string;
  skills: string[];
  links?: { live?: string; repo?: string };
  gallery?: { src: string; desc?: string }[];
}

function splitFrontmatter(raw: string): { meta: ProjectFrontmatter; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('Missing frontmatter in project markdown file');
  return { meta: parseYaml(m[1]) as ProjectFrontmatter, body: m[2].trim() };
}

function buildProject(path: string, raw: string): Project {
  const { meta, body } = splitFrontmatter(raw);
  const filenameSlug = path.split('/').pop()!.replace(/\.md$/, '');
  const slug = meta.slug ?? filenameSlug;

  const resolvedSkills: SkillTag[] = (meta.skills ?? []).map((key) => {
    const skill = skillRegistry[key.toLowerCase()];
    if (!skill) throw new Error(`Unknown skill "${key}" in ${filenameSlug}.md — add it to src/content/skills.ts`);
    return skill;
  });

  const gallery: GalleryImage[] | undefined = Array.isArray(meta.gallery)
    ? meta.gallery
        .map((g) => ({
          src: String(g.src ?? '').trim(),
          desc: String(g.desc ?? '').trim() || undefined
        }))
        .filter((g) => g.src)
    : undefined;

  return {
    slug,
    title: meta.title,
    summary: meta.summary ?? '',
    descriptionHtml: body ? (marked(body) as string) : '',
    skills: resolvedSkills,
    hero: { src: meta.hero, alt: meta.title },
    gallery: gallery?.length ? gallery : undefined,
    links: meta.links,
    date: meta.date,
    status: meta.status?.trim()
  };
}

const MONTHS: Record<string, number> = {
  Jan: 0, January: 0,
  Feb: 1, February: 1,
  Mar: 2, March: 2,
  Apr: 3, April: 3,
  May: 4,
  Jun: 5, June: 5,
  Jul: 6, July: 6,
  Aug: 7, August: 7,
  Sep: 8, September: 8,
  Oct: 9, October: 9,
  Nov: 10, November: 10,
  Dec: 11, December: 11
};

function parseDateForSort(date: string | number): number {
  if (typeof date === 'number') {
    return date * 12;
  }

  const trimmed = date.trim();

  // New format: a plain year value such as "2026".
  if (/^\d{4}$/.test(trimmed)) {
    return parseInt(trimmed, 10) * 12;
  }

  // Year range support, e.g. "2009 - 2012".
  const yearRangeMatch = trimmed.match(/^(\d{4})\s*-\s*(\d{4})$/);
  if (yearRangeMatch) {
    return parseInt(yearRangeMatch[1], 10) * 12;
  }

  // Legacy format support, e.g. "Apr 2020 - Apr 2021".
  const [mon, year] = trimmed.split(' - ')[0].trim().split(' ');
  const m = MONTHS[mon];
  const y = parseInt(year, 10);
  return m !== undefined && !isNaN(y) ? y * 12 + m : -1;
}

let cache: Project[] | null = null;

export function loadProjects(): Project[] {
  if (cache) return cache;

  const projects = Object.entries(files).map(([path, raw]) => buildProject(path, raw));

  projects.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return parseDateForSort(b.date) - parseDateForSort(a.date);
  });

  cache = projects;
  return projects;
}

export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
