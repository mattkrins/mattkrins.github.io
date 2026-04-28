import { error } from '@sveltejs/kit';
import { loadProjects, getProjectBySlug } from '$lib/data/projects';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const projects = loadProjects();
	return projects.map((p) => ({ slug: p.slug }));
};

export const load: PageServerLoad = ({ params }) => {
	const projects = loadProjects();
	const project = getProjectBySlug(projects, params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
