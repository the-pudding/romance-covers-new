<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Wall from "$components/Wall.svelte";
	import { stepData, sliderVisible, sliderStoreRaunch, sliderStoreIllo, sliderStoreRace } from "$stores/misc.js";
	
	export let data;
    export let copy;
	export let section;

	let value;

	function setStepData(value) {
        const localStepData = [section, (copy[value])];
		$stepData = localStepData;
		lastStepUnlock(value)
    }

	function lastStepUnlock(value) {
		if (value == copy.length-1) { sliderVisible.set(true) }
		else { sliderVisible.set(false) }
	}

	$: value, setStepData(value);
</script>

<section id="scrolly">
	<div class="sticky">
        <Wall data={data} value={value} section={section} copy={copy}/>
    </div>
	<Scrolly bind:value>
        {#if copy}
            {#each copy as text, i}
                <div class="step">
                    <p>
						<!-- {#if text.kicker}
						<span class="kicker">{@html text.kicker}</span>
						{/if} -->
						{@html text.text}</p>
                </div>
            {/each}
        {/if}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	.sticky {
		position: sticky;
		top: 6rem;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
		pointer-events: none;
	}
	.spacer {
		height: 75vh;
	}

	.step {
		height: 80vh;
		text-align: center;
        z-index: 999;
        max-width: 30rem;
        margin: 0 auto;
		pointer-events: none;
	}
	.step:last-of-type p {
		position: relative;
		text-align: center;
		font-family: var(--sans-display);
		font-weight: 900;
		font-size: var(--12px);
		display: flex;
		justify-content: center;
	}
	.step:last-of-type p::before {
		content: " ";
		position:relative;
		width: 1rem;
		height: 1rem;
		top:0rem;
		left:0;
		margin: 0 0.25rem 0 0;
		background-image: url($svg/pointer.svg);
		background-size: 1rem 1rem;
        background-repeat: no-repeat;
        background-position: center;
	}

	.step p {
		font-family: var(--serif);
		font-weight: 500;
        text-align: left;
        padding: 2rem;
        background: var(--color-white);
		pointer-events: auto;
	}
	:global(.step p .bold-year) {
		font-weight: 600;
		font-family: var(--sans-display);
		letter-spacing: -0.5px;
	}
	:global(.step p a) {
		color: var(--color-gray-800);
		background-repeat: no-repeat;
        transition: background-position .08s ease-out;
        background-position: 0 1.125rem;
		border-bottom: none;
		pointer-events: auto;
	}
	:global(#raunchiness .step p a) {
		background-image: linear-gradient(180deg,transparent 0,var(--romance-blue-light) 0);
	}
	:global(#illustration .step p a) {
		background-image: linear-gradient(180deg,transparent 0,var(--romance-yellow-light) 0);
	}
	:global(#race .step p a) {
		background-image: linear-gradient(180deg,transparent 0,var(--romance-teal-light) 0);
	}
	:global(.step p a:hover) {
		background-position: 0 0rem;
	}
	.kicker {
		font-family: var(--sans-display);
		font-weight: 900;
		display: block;
		letter-spacing: -1px;
		margin: 0 0 0.5rem 0;
	}
	@media only screen and (min-width: 600px) {
        .step:last-of-type p {
			font-size: var(--14px);
		}
		.step:last-of-type p::before {
			top:0.1rem;
		}
	}
 </style>
