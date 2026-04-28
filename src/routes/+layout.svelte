<script lang="ts">
	import { navigating } from '$app/stores';
	import { dev } from '$app/environment';
	import './layout.css';
	import AmbientBackground from '$lib/components/AmbientBackground.svelte';

	let { children } = $props();
</script>

{#if $navigating}
	<div class="progress-bar"></div>
{/if}

{#if dev}
	<div class="dev-badge" aria-hidden="true">
		<span class="dev-badge-dot"></span>
		dev
	</div>
{/if}

<AmbientBackground />
{@render children()}

<style>
	:global(body) {
		overflow-y: scroll;
	}

	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 2px;
		background: var(--accent);
		z-index: 9999;
		animation: progress 0.3s ease-out forwards;
	}

	@keyframes progress {
		0% { width: 0%; }
		90% { width: 90%; }
		100% { width: 100%; }
	}

	.dev-badge {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		background: rgba(15, 15, 20, 0.8);
		border: 1px solid var(--accent);
		border-radius: 100px;
		font-family: var(--font-code);
		font-size: 0.65rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		backdrop-filter: blur(8px);
		pointer-events: none;
		z-index: 9998;
	}

	.dev-badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
		animation: dev-pulse 2s ease-in-out infinite;
	}

	@keyframes dev-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	@media (prefers-reduced-motion: reduce) {
		.dev-badge-dot { animation: none; }
	}
</style>
