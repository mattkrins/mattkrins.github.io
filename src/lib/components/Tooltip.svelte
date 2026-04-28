<script lang="ts">
  import type { Snippet } from 'svelte';

  let { text, children }: { text?: string; children: Snippet } = $props();

  let visible = $state(false);
  const id = $props.id();
  const tooltipId = `tooltip-${id}`;

  function show() { visible = true; }
  function hide() { visible = false; }

  $effect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') visible = false; };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

{#if text}
  <span
    class="tt-wrap"
    role="group"
    onmouseenter={show}
    onmouseleave={hide}
    onfocusin={show}
    onfocusout={hide}
    aria-describedby={visible ? tooltipId : undefined}
  >
    {@render children()}
    {#if visible}
      <span class="tt-box" id={tooltipId} role="tooltip">
        {text}
        <span class="tt-arrow" aria-hidden="true"></span>
      </span>
    {/if}
  </span>
{:else}
  {@render children()}
{/if}

<style>
  .tt-wrap { position: relative; display: inline-flex; }

  .tt-box {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 15rem;
    width: max-content;
    padding: 0.45rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--card-bg);
    color: var(--fg);
    font-family: var(--font-code);
    font-size: 0.68rem;
    line-height: 1.4;
    letter-spacing: 0.02em;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);
    z-index: 50;
    pointer-events: none;
  }

  .tt-arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--border);
  }
  .tt-arrow::after {
    content: '';
    position: absolute;
    top: -7px;
    left: -5px;
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--card-bg);
  }
</style>
