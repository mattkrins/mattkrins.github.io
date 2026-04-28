<script lang="ts">
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import PortfolioCard from '$lib/components/PortfolioCard.svelte';
  import type { Project, SkillTag } from '$lib/types';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  function normalizeTag(tag: string) {
    return tag.trim().toLowerCase();
  }

  function collectTags(projects: Project[]) {
    const tags: Record<string, SkillTag> = {};

    for (const project of projects) {
      for (const skill of project.skills) {
        const key = normalizeTag(skill.label);
        const existing = tags[key];

        if (!existing) {
          tags[key] = skill;
          continue;
        }

        if (!existing.description && skill.description) {
          existing.description = skill.description;
        }
      }
    }

    return Object.values(tags).sort((a, b) => a.label.localeCompare(b.label));
  }

  const allTags = $derived(collectTags(data.projects));

  const activeFilter = $derived(browser ? (page.url.searchParams.get('filter') ?? '') : '');
  const normalizedActiveFilter = $derived(normalizeTag(activeFilter));
  const matchedFilterTag = $derived(
    normalizedActiveFilter
      ? allTags.find((tag) => normalizeTag(tag.label) === normalizedActiveFilter)
      : undefined
  );

  const filteredProjects = $derived(
    normalizedActiveFilter
      ? data.projects.filter((project) =>
          project.skills.some((skill) => normalizeTag(skill.label) === normalizedActiveFilter)
        )
      : data.projects
  );

  function setFilter(tag: string) {
    const url = new URL(page.url.href);
    if (!tag || normalizeTag(tag) === normalizedActiveFilter) {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', tag);
    }
    const query = url.searchParams.toString();
    const destination = query
      ? resolve(`/portfolio?${query}` as `/portfolio?${string}`)
      : resolve('/portfolio');
    goto(destination, { replaceState: true, keepFocus: true });
  }

  function filterButtonClass(isActive: boolean) {
    return `filter-btn${isActive ? ' active' : ''}`;
  }
</script>

<svelte:head>
  <title>Portfolio &mdash; Matt Krins</title>
  <meta name="description" content="The front, the back, and the bits in between." />
  <meta property="og:title" content="Portfolio &mdash; Matt Krins" />
  <meta property="og:description" content="The front, the back, and the bits in between." />
  <link rel="canonical" href="https://mattkrins.com/portfolio" />
</svelte:head>

<main class="container">
  <Breadcrumbs items={[
    { label: 'home', href: '/' },
    { label: 'portfolio' }
  ]} />

  <div class="header">
    <p class="label">// portfolio</p>
    <h1 class="heading">Things I've built.</h1>
    <p class="subtitle">The front, the back, and the bits in between.</p>
  </div>

  <div class="filter-bar">
    <button
      type="button"
      class={filterButtonClass(!activeFilter)}
      onclick={() => setFilter('')}
    >All</button>
    {#each allTags as tag (tag.label)}
      <Tooltip text={tag.description}>
        <button
          type="button"
          class={filterButtonClass(matchedFilterTag?.label === tag.label)}
          onclick={() => setFilter(tag.label)}
          aria-label={`Filter by ${tag.label}`}
          aria-pressed={matchedFilterTag?.label === tag.label}
        >
          {#if tag.color}
            <span class="filter-dot" style={`--filter-color: ${tag.color}`} aria-hidden="true"></span>
          {/if}
          <span>{tag.label}</span>
        </button>
      </Tooltip>
    {/each}
  </div>

  {#if filteredProjects.length > 0}
    <div class="grid">
      {#each filteredProjects as project, i (project.slug)}
        <PortfolioCard {project} index={i} activeFilter={matchedFilterTag?.label ?? activeFilter} onfilter={setFilter} />
      {/each}
    </div>
  {:else}
    <div class="empty">
      <p class="empty-text">No projects match <span class="empty-tag">{activeFilter}</span>.</p>
      <button type="button" class="empty-clear" onclick={() => setFilter('')}>Clear filter</button>
    </div>
  {/if}

  <footer class="footer">
    <a href={resolve('/')} class="back-link">&larr; Back home</a>
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
    min-height: 100vh;
  }

  .header {
    margin-bottom: 2rem;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
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

  .subtitle {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
  }

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    appearance: none;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.45rem 1.1rem;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.04em;
    font-family: var(--font-code);
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .filter-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: var(--filter-color);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    flex: 0 0 auto;
  }

  .filter-btn:hover {
    border-color: var(--fg);
    color: var(--fg);
  }

  .filter-btn.active {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(196, 240, 90, 0.08);
    box-shadow: 0 0 20px rgba(196, 240, 90, 0.08);
  }

  .filter-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .empty {
    padding: 4rem 0;
    text-align: center;
    animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    margin-bottom: 4rem;
  }

  .empty-text {
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 1rem;
  }

  .empty-tag {
    color: var(--accent);
    font-family: var(--font-code);
  }

  .empty-clear {
    appearance: none;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-family: var(--font-ui);
    font-size: 0.8rem;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .empty-clear:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
  }

  .back-link {
    font-size: 0.8rem;
    color: var(--muted);
    text-decoration: none;
    font-family: var(--font-code);
    letter-spacing: 0.04em;
    transition: color 0.2s ease;
  }

  .back-link:hover { color: var(--accent); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .container { padding: 2rem 1.5rem; }
    .heading   { font-size: 2.5rem; }
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
    }
  }
</style>
