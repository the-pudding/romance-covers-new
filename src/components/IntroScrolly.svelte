<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import IntroBook from "$components/IntroBook.svelte";
    import { getContext } from "svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";

    const copy = getContext("copy");
    let steps = [0, 1];
	let value;
    let id = "intro";

    function setSection(id) { activeSection.set(id); }
</script>

<section id="intro"
    use:inView
    on:enter={() => setSection(id)}>
	<div class="sticky">
        <IntroBook value={value}/>
    </div>
	<Scrolly bind:value>
        {#each steps as step, i}
            <div class="step">
            </div>
        {/each}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	.sticky {
		position: sticky;
		top: 0rem;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
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
        opacity: 0;
        visibility: none;
	}
    .step:first-of-type {
        height: 20vh;
    }

	.step p {
		padding: 1rem;
        text-align: left;
        padding: 2rem;
        background: var(--color-white);
	}
</style>
