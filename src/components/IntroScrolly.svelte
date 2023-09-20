<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import IntroBook from "$components/IntroBook.svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";
    import { fade } from 'svelte/transition';

    export let bookMin;

    const steps = [0];

	let value;
    let y;
    let h;
    let scrollDir;
	let lastY;

    function setSection(id) { activeSection.set(id); }

    function checkScrollY(y) {
        if (y && y != 0) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        } else {
            scrollDir = "down";
        }
    }

    $: y, checkScrollY(y);  
</script>

<svelte:window bind:innerHeight={h} bind:scrollY={y}/>

<section id="intro"
    use:inView
    on:enter={() => setSection("intro")}>
	<div class="sticky">
        <IntroBook bookMin={bookMin}/>
    </div>
	<Scrolly bind:value>
        {#each steps as step, i}
            <div class="step">
            </div>
        {/each}
	</Scrolly>
	<div class="spacer" />
    {#if y < h && scrollDir != "up"}
        <div class="icon-wrapper"
            out:fade={{ duration: 500}}>
            <Icon name="arrow-down-circle" size="3rem"/>
        </div>
    {/if}
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
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: bounceUp 1s infinite;
    }
    :global(.icon-wrapper svg path, .icon-wrapper svg circle) {
        stroke: var(--romance-pink-light);
        stroke-width: 1px;
    }
    @keyframes bounceUp {
        0%       { bottom:2px; }
        25%, 75% { bottom:4px; }
        50%      { bottom:6px; }
        100%     { bottom:0; }
    }
</style>
