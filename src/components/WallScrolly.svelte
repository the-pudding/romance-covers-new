<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import Wall from "$components/Wall.svelte";
	import { stepData, sliderVisible, sliderStore } from "$stores/misc.js";
	
	let value;

    export let data;
    export let copy;
	export let section;

	function setStepData(value) {
        let localStepData = [section, (copy[value])];
		$stepData = localStepData;
		lastStepUnlock(value)
    }

	function lastStepUnlock(value) {
		if (value == copy.length-1) {
			sliderVisible.set(true)
			// sliderStore.set(sliderStore)
		} else {
			sliderVisible.set(false)
		}
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
                    <p>{@html text.text}</p>
                </div>
            {/each}
        {/if}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	.sticky {
		position: sticky;
		top: 5rem;
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
	.step:last-of-type {
		opacity: 0;
	}

	.step p {
		padding: 1rem;
        text-align: left;
        padding: 2rem;
        background: var(--color-white);
		pointer-events: auto;
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
 </style>
