const GITHUB_REDIRECT_ISSUE_URL =
	'https://api.github.com/repos/mattkrins/mattkrins.github.io/issues/1';

export interface RedirectLookupResult {
	key: string;
	target: string | null;
}

function getRootAliasKey(pathname: string): string | null {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length !== 1) return null;

	const key = decodeURIComponent(segments[0]);

	// Skip obvious asset/framework paths to avoid unnecessary API lookups.
	if (!key || key.includes('.') || key.startsWith('_')) return null;

	return key;
}

function resolveRedirectTarget(rawTarget: string, currentUrl: URL): string | null {
	const trimmed = rawTarget.trim();
	if (!trimmed) return null;

	if (trimmed.startsWith('/')) {
		const url = new URL(trimmed, currentUrl.origin);
		if (url.href === currentUrl.href) return null;
		return url.pathname + url.search + url.hash;
	}

	let url: URL;
	try {
		url = new URL(trimmed);
	} catch {
		return null;
	}

	if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
	if (url.href === currentUrl.href) return null;

	return url.href;
}

export function getEligibleRedirectKey(pathname: string): string | null {
	return getRootAliasKey(pathname);
}

export async function lookupRedirect(
	currentUrl: URL,
	fetchFn: typeof fetch = fetch
): Promise<RedirectLookupResult | null> {
	const key = getRootAliasKey(currentUrl.pathname);
	if (!key) return null;

	const response = await fetchFn(GITHUB_REDIRECT_ISSUE_URL, {
		headers: {
			Accept: 'application/vnd.github+json'
		}
	});

	if (!response.ok) {
		throw new Error(`GitHub redirect lookup failed with status ${response.status}`);
	}

	const payload = (await response.json()) as { body?: unknown };
	if (typeof payload.body !== 'string' || !payload.body.trim()) {
		throw new Error('GitHub redirect issue body is empty');
	}

	const map = JSON.parse(payload.body) as Record<string, unknown>;
	const rawTarget = map[key];
	if (typeof rawTarget !== 'string') {
		return { key, target: null };
	}

	return {
		key,
		target: resolveRedirectTarget(rawTarget, currentUrl)
	};
}
