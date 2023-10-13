<script>
    import { onMount } from "svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import IntroBook from "$components/IntroBook.svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";
	import { Info } from "lucide-svelte";

    export let bookMin;
    export let w;
    export let h;
    export let scrollY;

    const steps = [0];

	let value;
    let loading = true;
    
    onMount(() => {
		loading = false;
	})

    function setSection(id) { activeSection.set(id); }

    $: isVisible = scrollY == undefined || scrollY < 5 ? true : false; 
</script>

<section id="intro"
    use:inView
    on:enter={() => setSection("intro")}>
	<div class="sticky">
        <IntroBook bookMin={bookMin} w={w} h={h} scrollY={scrollY}/>
    </div>
	<Scrolly bind:value>
        {#each steps as step, i}
            <div class="step">
            </div>
        {/each}
	</Scrolly>
	<div class="spacer" />
    <div class="icon-wrapper" class:isVisible={isVisible}>
        {#if loading == true}
        <p>Loading</p>
        <div class="icon-loading"></div>
        {:else}
        <p>Scroll</p>
        <div class="icon-scroll"></div>
        {/if}
    </div>
</section>

<style>
    #intro {
        height: 200vh;
        width: 100%;
        background: var(--romance-bg-pink);
    }
	.sticky {
		position: sticky;
		top: 0rem;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding: 5rem 0;
	}
	.spacer {
		height: 75vh;
	}
	.step {
		height: 75vh;
		text-align: center;
        z-index: 999;
        max-width: 30rem;
        margin: 0 auto;
        pointer-events: none;
        opacity: 0;
        visibility: none;
	}
    .icon-wrapper {
        height: 3rem;
        width: 3rem;
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        bottom: 2rem;
        left: 50%;
        transform: translate(-50%, 0);
        opacity: 0;
    }
    .icon-wrapper p {
        position: absolute;
        bottom: -2.25rem;
        color: var(--romance-pink-light);
        font-family: var(--sans-display);
        font-size: var(--12px);
        text-align: center;
    }
    .icon-loading {
        height: 3rem;
        position: absolute;
        width: 3rem;
        background-image: url($svg/loader.svg);
        background-size: 3rem 3rem;
        background-repeat: no-repeat;
        background-position: center; 
        animation: rotation 1s infinite;
    }
    .icon-scroll {
        height: 3rem;
        position: absolute;
        width: 3rem;
        background-image: url($svg/arrow-down-circle.svg);
        background-size: 3rem 3rem;
        background-repeat: no-repeat;
        background-position: center; 
        animation: bounceUp 1s infinite;
    }
    .isVisible {
        opacity: 1;
    }
    .loader {
        width: 3rem;
        height: 3rem;
        border: 2px solid var(--romance-pink-light);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    @keyframes bounceUp {
        0%       { bottom:2px; }
        25%, 75% { bottom:4px; }
        50%      { bottom:6px; }
        100%     { bottom:0; }
    }
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
