<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { GalleryImage } from '$lib/types';

  let {
    images,
    open = $bindable(false),
    startIndex = 0
  }: {
    images: GalleryImage[];
    open?: boolean;
    startIndex?: number;
  } = $props();

  const effectiveStartIndex = $derived(startIndex);
  let currentIndex = $state(0);
  let closeButtonRef: HTMLButtonElement | null = $state(null);

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === 'Escape') {
      open = false;
    } else if (e.key === 'ArrowRight') {
      next();
    } else if (e.key === 'ArrowLeft') {
      prev();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
    }
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    handleKeydown(e);
  }

  $effect(() => {
    currentIndex = effectiveStartIndex;
  });

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (closeButtonRef) closeButtonRef.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Image viewer"
    tabindex="-1"
    onclick={handleBackdropClick}
    onkeydown={handleDialogKeydown}
  >
    <button
      type="button"
      class="close-btn"
      onclick={() => (open = false)}
      bind:this={closeButtonRef}
      aria-label="Close lightbox"
    >
      <span>ESC</span>
    </button>

    {#if images.length > 1}
      <button type="button" class="nav-btn nav-prev" onclick={prev} aria-label="Previous image">
        <Icon icon="lucide:chevron-left" width="24" height="24" />
      </button>
    {/if}

    <figure class="image-container">
      <img src={images[currentIndex].src} alt={images[currentIndex].desc ?? 'Gallery image'} />
      {#if images[currentIndex].desc}
        <figcaption>{images[currentIndex].desc}</figcaption>
      {/if}
    </figure>

    {#if images.length > 1}
      <button type="button" class="nav-btn nav-next" onclick={next} aria-label="Next image">
        <Icon icon="lucide:chevron-right" width="24" height="24" />
      </button>
    {/if}
  </div>
{/if}

<style>
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(12, 12, 15, 0.92);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }

  .image-container {
    max-width: min(92vw, 1400px);
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  figcaption {
    padding: 0.8rem 0;
    font-size: 0.8rem;
    color: var(--muted);
    font-family: var(--font-code);
    letter-spacing: 0.04em;
    text-align: center;
    margin-top: 0.8rem;
  }

  .close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: rgba(196, 240, 90, 0.1);
    border: 1px solid rgba(196, 240, 90, 0.3);
    color: var(--accent);
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-family: var(--font-code);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 201;
  }

  .close-btn:hover {
    background: rgba(196, 240, 90, 0.2);
    border-color: var(--accent);
  }

  .close-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(196, 240, 90, 0.1);
    border: 1px solid rgba(196, 240, 90, 0.3);
    color: var(--accent);
    padding: 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 201;
  }

  .nav-btn:hover {
    background: rgba(196, 240, 90, 0.2);
    border-color: var(--accent);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .nav-prev {
    left: 2rem;
  }

  .nav-next {
    right: 2rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .lightbox {
      padding: 1rem;
    }

    .close-btn {
      top: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.7rem;
    }

    .nav-btn {
      padding: 0.6rem;
    }

    .nav-prev {
      left: 1rem;
    }

    .nav-next {
      right: 1rem;
    }
  }
</style>
