<div class="glow glow--green" aria-hidden="true"></div>
<div class="glow glow--blue" aria-hidden="true"></div>
<div class="grid-bg" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<style>
	/* Grain overlay */
	.grain {
		position: fixed;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg width='256' height='256' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
		background-size: 256px 256px;
		pointer-events: none;
		z-index: 100;
	}

	/* Ambient glow blobs */
	.glow {
		position: fixed;
		width: 600px;
		height: 600px;
		border-radius: 50%;
		filter: blur(140px);
		opacity: 0.08;
		pointer-events: none;
		z-index: 0;
	}

	.glow--green {
		background: #c4f05a;
		top: -250px;
		right: -150px;
		animation: drift1 12s ease-in-out infinite alternate;
	}

	.glow--blue {
		background: #5a8af0;
		bottom: -300px;
		left: -200px;
		animation: drift2 15s ease-in-out infinite alternate;
	}

	@keyframes drift1 {
		to { transform: translate(-80px, 60px); }
	}

	@keyframes drift2 {
		to { transform: translate(60px, -80px); }
	}

	/* Grid lines background */
	.grid-bg {
		position: fixed;
		inset: 0;
		background-image:
			linear-gradient(#2a2a30 1px, transparent 1px),
			linear-gradient(90deg, #2a2a30 1px, transparent 1px);
		background-size: 80px 80px;
		opacity: 0.25;
		z-index: 0;
		mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
	}
</style>
