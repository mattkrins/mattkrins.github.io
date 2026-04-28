<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { getEligibleRedirectKey, lookupRedirect } from '$lib/redirects';

	let redirectState = $state<'idle' | 'checking' | 'miss'>('idle');
	let attemptedKey = $state<string | null>(null);

	const eligibleKey = $derived(getEligibleRedirectKey(page.url.pathname));
	const status = $derived(page.status);
	const errorMessage = $derived(
		typeof page.error?.message === 'string' && page.error.message.trim()
			? page.error.message
			: 'The page you asked for does not exist.'
	);

	$effect(() => {
		if (!browser || status !== 404 || !eligibleKey || redirectState !== 'idle') return;

		redirectState = 'checking';
		attemptedKey = eligibleKey;

		lookupRedirect(page.url)
			.then((result) => {
				if (result?.target) {
					window.location.replace(result.target);
					return;
				}

				redirectState = 'miss';
			})
			.catch(() => {
				redirectState = 'miss';
			});
	});
</script>

<svelte:head>
	<title>{status === 404 ? 'Not Found' : `Error ${status}`} &mdash; Matt Krins</title>
	<meta
		name="description"
		content="The page you requested could not be found."
	/>
</svelte:head>

<main class="container">
	<Breadcrumbs items={[{ label: 'home', href: '/' }, { label: '404' }]} />

	<p class="label">// {status === 404 ? 'not found' : 'error'}</p>
	<h1 class="heading">{status === 404 ? 'Nothing lives here.' : `Error ${status}`}</h1>

	{#if status === 404 && redirectState === 'checking' && attemptedKey}
		<p class="subtitle">
			Checking whether <span class="code">/{attemptedKey}</span> is a redirect alias.
		</p>
	{:else}
		<p class="subtitle">{errorMessage}</p>
	{/if}

	{#if status === 404}
		<div class="card">
			{#if redirectState === 'checking' && attemptedKey}
				<p class="card-title">Looking up redirect alias</p>
			{:else if attemptedKey}
				<p class="card-title">No page or redirect found for <span class="code">/{attemptedKey}</span></p>
				<p class="card-copy">
					The Codex Astartes does not support this request.
				</p>
			{:else}
				<p class="card-title">This route is not part of the site</p>
			{/if}
		</div>
	{/if}

	<div class="actions">
		<a href={resolve('/')} class="btn btn--primary">Back home</a>
	</div>
</main>

<style>
	.container {
		position: relative;
		z-index: 1;
		max-width: 860px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.label {
		margin: 0 0 1rem;
		font-size: 0.8rem;
		font-family: var(--font-code);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.heading {
		margin: 0 0 1rem;
		font-family: var(--font-heading);
		font-size: clamp(3rem, 10vw, 5.2rem);
		line-height: 0.98;
		font-weight: 400;
		letter-spacing: -0.02em;
	}

	.subtitle {
		margin: 0;
		max-width: 42rem;
		font-size: 1.05rem;
		line-height: 1.8;
		color: var(--muted);
	}

	.card {
		margin-top: 2rem;
		padding: 1.3rem 1.4rem;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: rgba(21, 21, 26, 0.9);
		backdrop-filter: blur(8px);
	}

	.card-title {
		margin: 0 0 0.6rem;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--fg);
	}

	.card-copy {
		margin: 0;
		line-height: 1.7;
		color: var(--muted);
	}

	.code {
		font-family: var(--font-code);
		color: var(--accent);
		font-size: 0.95em;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.85rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-size: 0.8rem;
		font-weight: 600;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
	}

	.btn--primary {
		background: var(--accent);
		color: var(--bg);
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn--primary:hover {
		box-shadow: 0 8px 30px rgba(196, 240, 90, 0.22);
	}

	.btn:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (max-width: 640px) {
		.container {
			padding: 1.5rem;
		}

		.subtitle,
		.card-copy {
			font-size: 0.98rem;
		}

		.actions {
			flex-direction: column;
		}

		.btn {
			width: 100%;
		}
	}
</style>
