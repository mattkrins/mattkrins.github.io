<script lang="ts">
  import Tooltip from './Tooltip.svelte';

  let {
    label,
    href,
    color,
    description
  }: {
    label: string;
    href?: string;
    color?: string;
    description?: string;
  } = $props();
</script>

<Tooltip text={description}>
  {#if href}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is resolved by the caller -->
    <a {href} class="role-tag">
      {#if color}
        <span class="role-tag-dot" style={`--tag-color: ${color}`} aria-hidden="true"></span>
      {/if}
      <span>{label}</span>
    </a>
  {:else}
    <span class="role-tag">
      {#if color}
        <span class="role-tag-dot" style={`--tag-color: ${color}`} aria-hidden="true"></span>
      {/if}
      <span>{label}</span>
    </span>
  {/if}
</Tooltip>

<style>
  .role-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    padding: 0.45rem 1rem;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--muted);
    letter-spacing: 0.04em;
    transition: all 0.4s ease;
    cursor: default;
    background: transparent;
    font-family: var(--font-code);
    text-decoration: none;
  }

  a.role-tag {
    cursor: pointer;
  }

  .role-tag-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: var(--tag-color);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
    flex: 0 0 auto;
  }

  .role-tag:hover {
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: 0 0 20px rgba(196, 240, 90, 0.08);
  }

  a.role-tag:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
