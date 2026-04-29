<script lang="ts">
	import RoleTag from '$lib/components/RoleTag.svelte';
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';
	import interRegularUrl from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
	import instrumentSerifRegularUrl from '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2?url';
	import jetBrainsMonoLatinUrl from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
	import './page.css';

	let emailCopied = $state(false);
	let socialsOpen = $state(false);
	let dropdownEl = $state<HTMLDivElement | null>(null);

	const showEmailCopied = () => {
		emailCopied = true;
		setTimeout(() => { emailCopied = false; }, 2000);
	};

	const fallbackCopyText = (text: string) => {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.setAttribute('readonly', '');
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		textarea.style.pointerEvents = 'none';

		document.body.appendChild(textarea);
		textarea.select();

		const copied = document.execCommand('copy');
		document.body.removeChild(textarea);

		return copied;
	};

	const copyEmail = async () => {
		const email = atob("bWF0dGtyaW5zQGdtYWlsLmNvbQ==");

		try {
			if (navigator.clipboard?.writeText && window.isSecureContext) {
				await navigator.clipboard.writeText(email);
				showEmailCopied();
				return;
			}
		} catch {
			// Fall through to legacy copy support below.
		}

		if (fallbackCopyText(email)) {
			showEmailCopied();
			return;
		}

		window.location.href = `mailto:${email}`;
	};

	$effect(() => {
		if (!socialsOpen) return;
		const handler = (e: MouseEvent) => {
			if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
				socialsOpen = false;
			}
		};
		const keyHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') socialsOpen = false;
		};
		document.addEventListener('click', handler);
		document.addEventListener('keydown', keyHandler);
		return () => {
			document.removeEventListener('click', handler);
			document.removeEventListener('keydown', keyHandler);
		};
	});
</script>

<svelte:head>
	<title>Matt Krins</title>
	<meta name="description" content="Matt Krins - Programmer, SysAdmin, and Educator." />
	<link rel="canonical" href="https://mattkrins.com/" />

	<!-- Preload fonts -->
	<link rel="preload" href={interRegularUrl} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={instrumentSerifRegularUrl} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={jetBrainsMonoLatinUrl} as="font" type="font/woff2" crossorigin="anonymous" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mattkrins.com/" />
	<meta property="og:title" content="Matt Krins - Programmer, SysAdmin, Educator" />
	<meta property="og:description" content="Building systems, writing code, and teaching others how to do the same." />
	<meta property="og:image" content="https://mattkrins.com/og-card.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Matt Krins - Programmer, SysAdmin, Educator" />
	<meta name="twitter:description" content="Building systems, writing code, and teaching others how to do the same." />
	<meta name="twitter:image" content="https://mattkrins.com/og-card.jpg" />

	<!-- JSON-LD Person Schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "Person",
			"name": "Matt Krins",
			"url": "https://mattkrins.com/",
			"jobTitle": ["Programmer", "SysAdmin", "Educator"],
			"image": "https://mattkrins.com/headshot.jpg",
			"sameAs": ["https://github.com/mattkrins/", "https://www.linkedin.com/in/mattkrins/"]
		}
	</script>
</svelte:head>

<main class="home-page">
	<div class="photo-wrapper">
		<div class="photo-frame">
			<img src="/headshot.jpg" alt="Matt Krins" width={260} height={320} fetchpriority="high" />
		</div>
		<div class="status">
			<span class="status-dot" aria-hidden="true"></span>
			Available for work
		</div>
	</div>

	<div class="content">
		<p class="greeting">// hello world</p>
		<h1 class="name">I'm Matt Krins.</h1>

		<div class="roles">
			<RoleTag label="Programmer" />
			<RoleTag label="SysAdmin" />
			<RoleTag label="Educator" />
		</div>

		<p class="tagline">Building systems, and the people who understand them.</p>

		<div class="actions">
			<a href={resolve('/portfolio')} class="btn btn--primary">
				<Icon icon="lucide:monitor" width={16} height={16} aria-hidden="true" />
				Portfolio
			</a>

			<div class="dropdown" bind:this={dropdownEl}>
				<button
					class="btn btn--secondary dropdown-trigger"
					onclick={() => (socialsOpen = !socialsOpen)}
					aria-expanded={socialsOpen}
					aria-haspopup="true"
				>
					<Icon icon="lucide:users" width={16} height={16} aria-hidden="true" />
					Socials
					<span class:open={socialsOpen} class="dropdown-chevron" aria-hidden="true">
						<Icon icon="lucide:chevron-down" width={12} height={12} />
					</span>
				</button>

				{#if socialsOpen}
					<div class="dropdown-menu" role="menu">
						<a
							href="https://github.com/mattkrins/"
							class="dropdown-item"
							target="_blank"
							rel="noopener noreferrer"
							role="menuitem"
							onclick={() => (socialsOpen = false)}
						>
							<Icon icon="lucide:github" width={16} height={16} aria-hidden="true" />
							GitHub
						</a>
						<a
							href="https://linkedin.com/in/mattkrins/"
							class="dropdown-item"
							target="_blank"
							rel="noopener noreferrer"
							role="menuitem"
							onclick={() => (socialsOpen = false)}
						>
							<Icon icon="lucide:linkedin" width={16} height={16} aria-hidden="true" />
							LinkedIn
						</a>
					</div>
				{/if}
			</div>

			<button onclick={copyEmail} class="btn btn--secondary">
				<Icon icon={emailCopied ? 'lucide:check' : 'lucide:mail'} width={16} height={16} aria-hidden="true" />
				{emailCopied ? 'Copied!' : 'Email'}
			</button>
		</div>
	</div>
</main>
