import { loadProjects } from '$lib/data/projects';

export const prerender = true;

const SITE = 'https://mattkrins.com';

export function GET() {
	const projects = loadProjects();

	const urls = [
		{ loc: `${SITE}/`, priority: '1.0' },
		{ loc: `${SITE}/portfolio`, priority: '0.8' },
		...projects.map((p) => ({ loc: `${SITE}/portfolio/${p.slug}`, priority: '0.6' }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `\t<url>
\t\t<loc>${u.loc}</loc>
\t\t<changefreq>monthly</changefreq>
\t\t<priority>${u.priority}</priority>
\t</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
