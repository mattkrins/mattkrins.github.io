<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Pathname } from '$app/types';

  type Segment = { label: string; href?: Pathname };
  let { items }: { items: Segment[] } = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumbs">
  <ol>
    {#each items as item, i (item.label)}
      <li>
        {#if item.href}
          <a href={resolve(item.href)}>{item.label}</a>
        {:else}
          <span aria-current="page">{item.label}</span>
        {/if}
        {#if i < items.length - 1}
          <span class="sep" aria-hidden="true">/</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumbs {
    margin-bottom: 1rem;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-code);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover { color: var(--accent); }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }

  span[aria-current='page'] { color: var(--fg); }

  .sep { color: var(--border); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
