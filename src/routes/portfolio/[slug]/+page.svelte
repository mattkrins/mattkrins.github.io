<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import RoleTag from '$lib/components/RoleTag.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import type { Pathname } from '$app/types';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const project = $derived(data.project);
	const normalizedStatus = $derived(project.status?.trim().toLowerCase() ?? '');

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	function openLightbox(i: number) {
		lightboxIndex = i;
		lightboxOpen = true;
	}

	function isInternalHref(href: string): href is Pathname {
		return href === '/' || href === '/portfolio' || href.startsWith('/portfolio/');
	}
</script>

<svelte:head>
	<title>{project.title} &mdash; Matt Krins</title>
	<meta name="description" content={project.summary} />
	<meta property="og:title" content="{project.title} &mdash; Matt Krins" />
	<meta property="og:description" content={project.summary} />
	<meta property="og:image" content={project.hero.src} />
	<link rel="canonical" href="https://mattkrins.com/portfolio/{project.slug}" />
</svelte:head>

<main class="container">
	<Breadcrumbs items={[
		{ label: 'home', href: '/' },
		{ label: 'portfolio', href: '/portfolio' },
		{ label: project.slug }
	]} />

	<section class="header">
		<p class="label">// project</p>
		<h1 class="heading">{project.title}</h1>
	</section>

	<section class="hero">
		<img src={project.hero.src} alt={project.hero.alt} />
	</section>

	<div class="body">
		{#if project.descriptionHtml}
			<section class="description">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- content is sanitized in src/lib/data/github.ts -->
				{@html project.descriptionHtml}
			</section>
		{/if}

		<aside class="sidebar">
			{#if project.date || project.status}
				<div class="sidebar-section">
					<p class="sidebar-section-label">Details</p>
					{#if project.status}
						<p class="meta">
							<span class="meta-label">Status</span>
							<span
								class="status-badge"
								class:status-active={normalizedStatus === 'active'}
								class:status-discontinued={normalizedStatus !== 'active'}
							>
								<span class="status-dot" aria-hidden="true"></span>
								{project.status}
							</span>
						</p>
					{/if}
					{#if project.date}
						<p class="meta">
							<span class="meta-label">Date</span>
							<span class="meta-badge">{project.date}</span>
						</p>
					{/if}
				</div>
			{/if}

			{#if project.skills?.length}
				<div class="sidebar-section">
					<p class="sidebar-section-label">Skills</p>
					<div class="skills">
						{#each project.skills as skill (skill.label)}
							<RoleTag
								label={skill.label}
								color={skill.color}
								description={skill.description}
								href={`${resolve('/portfolio')}?filter=${encodeURIComponent(skill.label)}`}
							/>
						{/each}
					</div>
				</div>
			{/if}

			{#if project.links?.live || project.links?.repo}
				<div class="sidebar-section">
					<p class="sidebar-section-label">Links</p>
					<div class="links">
						{#if project.links.live}
							{#if isInternalHref(project.links.live)}
								<a href={resolve(project.links.live)} class="btn btn-primary">
									<Icon icon="lucide:external-link" width="16" height="16" />
									<span>Live</span>
								</a>
							{:else}
								<a href={project.links.live} target="_blank" rel="external noopener noreferrer" class="btn btn-primary">
									<Icon icon="lucide:external-link" width="16" height="16" />
									<span>Live</span>
								</a>
							{/if}
						{/if}
						{#if project.links.repo}
							{#if isInternalHref(project.links.repo)}
								<a href={resolve(project.links.repo)} class="btn btn-secondary">
									<Icon icon="lucide:github" width="16" height="16" />
									<span>GitHub</span>
								</a>
							{:else}
								<a href={project.links.repo} target="_blank" rel="external noopener noreferrer" class="btn btn-secondary">
									<Icon icon="lucide:github" width="16" height="16" />
									<span>GitHub</span>
								</a>
							{/if}
						{/if}
					</div>
				</div>
			{/if}
		</aside>
	</div>

	{#if project.gallery?.length}
		<section class="gallery">
			<h2 class="section-heading">Gallery</h2>
			<div class="gallery-grid">
				{#each project.gallery as image, i (image.src)}
					<figure class="gallery-item" style="--i: {i}">
						<button
							type="button"
							class="gallery-btn"
							onclick={() => openLightbox(i)}
							aria-label={`Open ${image.desc ?? project.title} in lightbox`}
						>
							<img src={image.src} alt={image.desc ?? project.title} loading="lazy" />
						</button>
						{#if image.desc}
							<figcaption>{image.desc}</figcaption>
						{/if}
					</figure>
				{/each}
			</div>
		</section>

		<Lightbox images={project.gallery} bind:open={lightboxOpen} startIndex={lightboxIndex} />
	{/if}

	<footer class="footer">
		<a href={resolve('/portfolio')} class="back-link">&larr; Back to portfolio</a>
	</footer>
</main>

<style>
	.container {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.back-link {
		display: inline-block;
		font-size: 0.8rem;
		color: var(--muted);
		text-decoration: none;
		font-family: var(--font-code);
		letter-spacing: 0.04em;
		transition: color 0.2s ease;
		margin-bottom: 2rem;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.back-link:hover {
		color: var(--accent);
	}

	.header {
		margin-bottom: 2rem;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.label {
		font-size: 0.8rem;
		color: var(--accent);
		font-family: var(--font-code);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.heading {
		font-family: var(--font-heading);
		font-size: 3.5rem;
		font-weight: 400;
		line-height: 1.05;
		color: var(--fg);
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.85rem;
		color: var(--fg);
		font-family: var(--font-code);
		letter-spacing: 0.04em;
		margin: 0;
	}

	.meta + .meta {
		margin-top: 0.5rem;
	}

	.meta-label {
		color: var(--muted);
		text-transform: uppercase;
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		opacity: 0.8;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: var(--fg);
		font-size: 0.72rem;
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.meta-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: var(--muted);
		font-size: 0.72rem;
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.status-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: currentColor;
		box-shadow: 0 0 0.45rem currentColor;
		flex: 0 0 auto;
	}

	.status-active {
		color: var(--accent);
		border-color: rgba(196, 240, 90, 0.35);
		background: rgba(196, 240, 90, 0.08);
		box-shadow: 0 0 1.1rem rgba(196, 240, 90, 0.08);
	}

	.status-discontinued {
		color: #ff6b6b;
		border-color: rgba(255, 107, 107, 0.35);
		background: rgba(255, 107, 107, 0.08);
		box-shadow: 0 0 1.1rem rgba(255, 107, 107, 0.08);
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.4rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.3s ease;
		border: 1px solid var(--border);
	}

	.btn-primary {
		background: rgba(196, 240, 90, 0.1);
		color: var(--accent);
		border-color: var(--accent);
	}

	.btn-primary:hover {
		background: rgba(196, 240, 90, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(196, 240, 90, 0.25);
	}

	.btn-secondary {
		color: var(--fg);
	}

	.btn-secondary:hover {
		border-color: var(--fg);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(255, 255, 255, 0.05);
	}

	.hero {
		margin: 2rem 0 0;
		border: 2px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.body {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 280px;
		gap: 3rem;
		margin: 3rem 0;
		align-items: start;
	}

	.sidebar {
		position: sticky;
		top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card-bg);
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	.sidebar-section-label {
		font-family: var(--font-code);
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		font-weight: 600;
		margin: 0 0 0.8rem;
	}

	.sidebar .btn {
		justify-content: center;
		width: 100%;
	}

	.hero img {
		width: 100%;
		height: auto;
		display: block;
		}

	.description {
		margin: 0;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	.description :global(p) {
		font-size: 0.95rem;
		color: var(--fg);
		line-height: 1.8;
		margin: 0 0 1.5rem;
	}

	.description :global(p:last-child) { margin-bottom: 0; }

	.description :global(h2),
	.description :global(h3) {
		font-family: var(--font-heading);
		color: var(--fg);
		margin: 2rem 0 0.75rem;
		font-weight: 400;
	}

	.description :global(h2) { font-size: 1.6rem; }
	.description :global(h3) { font-size: 1.2rem; }

	.description :global(ul),
	.description :global(ol) {
		font-size: 0.95rem;
		color: var(--fg);
		line-height: 1.8;
		padding-left: 1.5rem;
		margin: 0 0 1.5rem;
	}

	.description :global(code) {
		font-family: var(--font-code);
		font-size: 0.85em;
		color: var(--accent);
		background: rgba(196, 240, 90, 0.08);
		padding: 0.15em 0.4em;
		border-radius: 4px;
	}

	.description :global(pre) {
		background: var(--card-bg);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		overflow-x: auto;
		margin: 0 0 1.5rem;
	}

	.description :global(pre code) {
		background: none;
		padding: 0;
		color: var(--fg);
	}

	.description :global(a) {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.gallery {
		margin: 3rem 0;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
	}

	.section-heading {
		font-family: var(--font-code);
		font-size: 0.8rem;
		color: var(--accent);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		font-weight: 500;
		margin-bottom: 1.25rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.gallery-item {
		margin: 0;
		background: var(--card-bg);
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 0.06s + 0.7s) both;
		transition: all 0.3s ease;
	}

	.gallery-item:hover {
		border-color: var(--accent);
		box-shadow: 0 8px 20px rgba(196, 240, 90, 0.08);
	}

	.gallery-btn {
		appearance: none;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		display: block;
		width: 100%;
	}

	.gallery-btn:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.gallery-btn img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		display: block;
		filter: grayscale(20%);
		transition: filter 0.4s ease;
	}

	.gallery-item:hover .gallery-btn img {
		filter: grayscale(0%);
	}

	figcaption {
		padding: 0.6rem 0.9rem;
		font-size: 0.75rem;
		color: var(--muted);
		font-family: var(--font-code);
		letter-spacing: 0.04em;
		border-top: 1px solid var(--border);
	}

	.footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
		text-align: center;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 900px) {
		.body {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.sidebar {
			position: static;
			order: -1;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1.5rem;
		}

		.heading {
			font-size: 2.5rem;
		}

		.gallery-grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 0.75rem;
		}
	}
</style>
