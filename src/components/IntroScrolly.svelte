<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import IntroBook from "$components/IntroBook.svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";
    import Tip from "$components/helpers/Tip.svelte";

    export let bookMin;

    const steps = [0];

	let value;
    let y;
    let h;
    let scrollDir;
	let lastY;
    let tipVisible = false;

    function setSection(id) { activeSection.set(id); }

    function checkScrollY(y) {
        if (y && y != 0) {
            scrollDir = scrollY > lastY ? "down" : "up"
            lastY = scrollY;
        } else {
            scrollDir = "down";
        }
    }
    function hideTip() {
        tipVisible = !tipVisible;   
    }

    $: y, checkScrollY(y); 
    $: isVisible = y == undefined || y < 5 ? true : false; 
</script>

<svelte:window bind:innerHeight={h} bind:scrollY={y}/>

<section id="intro"
    use:inView
    on:enter={() => setSection("intro")}>
	<div class="sticky">
        {#if isVisible}
            <Tip />
        {/if}
        <IntroBook bookMin={bookMin}/>
    </div>
	<Scrolly bind:value>
        {#each steps as step, i}
            <div class="step">
            </div>
        {/each}
	</Scrolly>
	<div class="spacer" />
    <div class="icon-wrapper" class:isVisible={isVisible}>
        <Icon name="arrow-down-circle" size="3rem"/>
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
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: bounceUp 1s infinite;
        opacity: 0;
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
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
