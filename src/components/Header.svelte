<script>
	import logo from "$svg/logo.svg";
</script>

<header>
	<div class="logo">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html logo}</a
		>
	</div>
</header>

<style>
	header {
		position: absolute;
		width: 2rem;
		top: 0.75rem;
		left: 1rem;
	}
	.logo {
		width: 1.5rem;
		padding: 0;
	}

	.logo a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.logo a:hover {
		background-color: transparent;
	}

	:global(.logo svg path) {
		fill: currentColor;
	}
</style>
