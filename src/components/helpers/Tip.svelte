<script>
	import { DollarSign } from "lucide-svelte";
	export let text = "Tip";
	export let href;
</script>

<a class="tip-button" {href} target="_blank" rel="noreferrer" role="button"
	>{text} <span><DollarSign color="currentColor" /></span>
</a>

<style>
	a.tip-button {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		background: var(--color-fg);
		color: var(--color-bg);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		box-shadow: 0px 3px 3px 0px var(--color-gray-200);
		letter-spacing: 0.05em;
		padding: 0.5rem;
		font-size: 14px;
	}
	:global(#intro a.tip-button) {
		background-image: var(--color-fg);
	}
	a.tip-button:hover {
		background: var(--romance-pink);
		transition: all 0.25s;
	}
	a.tip-button:hover span {
		transform: translate(0, -4px);
		transition: all 0.25s;
	}

	span {
		display: inline-block;
		border: 1px solid currentColor;
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		text-align: center;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-left: 8px;
		padding: 2px;
	}
</style>
