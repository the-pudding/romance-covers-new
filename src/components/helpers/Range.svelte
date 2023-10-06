<script>
	import { activeSection, sliderStoreRaunch, sliderStoreIllo, sliderStoreRace } from "$stores/misc.js";
	import { fly, fade } from 'svelte/transition';
	import { range, format } from "d3";
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let showTicks = false;
	export let value;
	export let label = "";
	export let section;

	let promptVisible = 1;
	let promptPos = "-1rem";
	let scrollY;
	let scrollDir;
	let lastY;

	const getDecimalCount = (value) => {
		if (Math.floor(value) === value) return 0;
		return value.toString().split(".")[1].length || 0;
	};

	function checkScrollY(scrollY) {
        if (scrollY) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        }
    }

	function handleChange() {
		promptVisible = 0;
		if ($activeSection == "raunchiness") { sliderStoreRaunch.set(value) }
		else if ($activeSection == "illustration") { 
			sliderStoreIllo.set(value) }
		else if ($activeSection == "race") { sliderStoreRace.set(value) }
	}
	$: decimals = getDecimalCount(step);
	$: ticks = showTicks ? range(min, max + step, step) : [];
	$: scrollY, checkScrollY(scrollY);
</script>

<div class="range" id="range-{section}">
	<div class="ticks">
		{#each ticks as tick}
			<span class="tick">{format(`.${decimals}f`)(tick)}</span>
		{/each}
	</div>
	<input on:change={handleChange} type="range" aria-label={label} {min} {max} {step} bind:value />
		<div class="prompt" style="opacity: {promptVisible};"
			in:fly={{ y: 10, duration: 1000, delay: 250}}
			out:fade={{ duration: 200 }}>
			<p>Drag me!</p>
		</div>

</div>

<style>
	.range {
		--thumb-width: 24px;
		--tick-font-size: 12px;
		position: absolute;
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.prompt {
		position: absolute;
		bottom: -2rem;
		right: -1rem;
        transition: 0.125s all linear;
        font-family: var(--sans-display);
        font-size: var(--12px);
        text-align: center;
		animation: shake 1s infinite;
	}
	.prompt p {
		margin: 0;
	}
	input[type="range"] {
		display: block;
		width: 100%;
		appearance: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		background: transparent;
		position: relative;
		outline: none;
	}

	input[type="range"]:focus {
		box-shadow: 0 0 4px 0 var(--color-gray-300);
	}

	input[type="range"]:focus::-webkit-slider-thumb,
	input[type="range"]:focus::-moz-range-thumb,
	input[type="range"]:focus::-ms-thumb {
		box-shadow: 0 0 4px 0 var(--color-gray-300);
	}

	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: calc(var(--thumb-width) / 4);
		background: rgba(255,255,255,0.75);
		border-radius: 4px;
	}
	input[type=range] {
    	-webkit-appearance: none;
	}
	input[type="range"]::-webkit-slider-thumb {
		height: var(--thumb-width);
		width: var(--thumb-width);
		border-radius: 50%;
		position: relative;
		background: var(--color-gray-800);
		appearance: none;
		margin-top: calc(var(--thumb-width) / -3);
	}
	input[type="range"]:focus::-webkit-slider-runnable-track {
		background: rgba(255,255,255,0.75);
	}

	input[type="range"]::-moz-range-track {
		width: 100%;
		height: calc(var(--thumb-width) / 4);
		background: rgba(255,255,255,0.75);
		border-radius: 4px;
	}

	input[type="range"]::-moz-range-thumb {
		box-shadow: 1px 1px 1px var(--color-black), 0 0 1px var(--color-black);
		height: var(--thumb-width);
		width: var(--thumb-width);
		border-radius: 50%;
		background: var(--color-gray-800);
	}

	input[type="range"]::-ms-track {
		width: 100%;
		height: calc(var(--thumb-width) / 4);
		background: transparent;
		border-color: transparent;
		border-width: 16px 0;
		color: transparent;
	}

	input[type="range"]::-ms-fill-lower,
	input[type="range"]::-ms-fill-upper {
		background: var(--color-gray-300);
		border: 0.2px solid var(--color-black);
		border-radius: 4px;
		box-shadow: 1px 1px 1px var(--color-black), 0 0 1px var(--color-black);
	}

	input[type="range"]::-ms-thumb {
		height: var(--thumb-width);
		width: var(--thumb-width);
		border-radius: 50%;
		transform: translate3d(-1px, 0, 0);
		background: var(--color-gray-800);
	}

	input[type="range"]:focus::-ms-fill-lower,
	input[type="range"]:focus::-ms-fill-upper {
		background: var(--color-gray-300);
	}

	.ticks {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 calc(var(--thumb-width) / 2);
		margin: 0;
		user-select: none;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: translate(0, 100%);
	}

	.tick {
		display: flex;
		justify-content: center;
		font-size: var(--tick-font-size);
		line-height: 1;
		text-align: center;
		width: 1px;
		background: transparent;
		color: var(--color-gray);
		padding-top: calc(var(--thumb-width) / 2);
		position: relative;
	}

	.tick:before {
		display: block;
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(var(--thumb-width) / 3);
		background: var(--color-gray-300);
	}

	.tick:first-of-type {
		transform: translate(-1px, 0);
	}

	.tick:last-of-type {
		transform: translate(1px, 0);
	}
	@keyframes shake {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		
		20%, 80% {
			transform: translate3d(-1px, 0, 0);
		}

		30%, 50%, 70% {
			transform: translate3d(-2px, 0, 0);
		}

		40%, 60% {
			transform: translate3d(2px, 0, 0);
		}
	}
</style>
