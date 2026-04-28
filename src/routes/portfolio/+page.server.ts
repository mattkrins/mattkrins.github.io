import { loadProjects } from '$lib/data/projects';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
	const projects = loadProjects();
	return { projects };
};
