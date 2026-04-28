<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Project } from '$lib/types';

  let { project, index = 0, activeFilter = '', onfilter }: {
    project: Project;
    index?: number;
    activeFilter?: string;
    onfilter?: (skill: string) => void;
  } = $props();
</script>

<div class="card" style="--i: {index}">
  <a
    class="card-link"
    href={resolve(`/portfolio/${project.slug}`)}
    aria-label="View {project.title} project"
  ></a>
  <div class="card-image">
    <img src={project.hero.src} alt={project.hero.alt} loading="lazy" />
    {#if project.date}
      <span class="card-date-badge">{project.date}</span>
    {/if}
  </div>
  <div class="card-body">
    <h2 class="card-title">{project.title}</h2>
    <p class="card-summary">{project.summary}</p>
    <div class="card-skills">
      {#each project.skills as skill (skill.label)}
        <button
          type="button"
          class="skill-btn"
          class:active={activeFilter === skill.label}
          onclick={() => onfilter?.(skill.label)}
          aria-label="Filter by {skill.label}"
          aria-pressed={activeFilter === skill.label}
        >
          {#if skill.color}
            <span class="skill-dot" style={`--skill-color: ${skill.color}`} aria-hidden="true"></span>
          {/if}
          <span>{skill.label}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 0.08s + 0.2s) both;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s, box-shadow 0.35s;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(196, 240, 90, 0.4);
    box-shadow: 0 12px 40px rgba(196, 240, 90, 0.08);
  }

  .card-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
  }

  .card-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }

  .card-image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    position: relative;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%) contrast(1.05);
    transition: filter 0.5s, transform 0.5s;
  }

  .card:hover .card-image img {
    filter: grayscale(0%) contrast(1.1);
    transform: scale(1.03);
  }

  .card-date-badge {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.6rem;
    border: 1px solid rgba(196, 240, 90, 0.28);
    border-radius: 999px;
    background: rgba(12, 12, 15, 0.78);
    backdrop-filter: blur(10px);
    color: var(--accent);
    font-family: var(--font-code);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    line-height: 1;
    text-transform: uppercase;
    pointer-events: none;
  }

  .card-body {
    padding: 1.25rem;
    position: relative;
  }

  .card-title {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--fg);
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
  }

  .card-summary {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .card-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    position: relative;
    z-index: 2;
  }

  .skill-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    appearance: none;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.45rem 1rem;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.04em;
    font-family: var(--font-code);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .skill-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: var(--skill-color);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    flex: 0 0 auto;
  }

  .skill-btn:hover,
  .skill-btn.active {
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: 0 0 20px rgba(196, 240, 90, 0.08);
  }

  .skill-btn.active {
    background: rgba(196, 240, 90, 0.08);
  }

  .skill-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .card-title { font-size: 1.25rem; }
    .card-body  { padding: 1rem; }
  }
</style>
