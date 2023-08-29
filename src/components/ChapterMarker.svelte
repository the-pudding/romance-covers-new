<script>
    import { activeSection, readingList, readingListVisible } from "$stores/misc.js";
    import { fly, fade } from 'svelte/transition';
    import Icon from "$components/helpers/Icon.svelte";
    const sections = ["intro", "raunchiness", "illustration", "race", "outro"];
    import * as d3 from "d3";

    function handleListToggle(initState) {
        readingListVisible.set(!$readingListVisible);
        d3.select(this).style("animation", "none")
        d3.select(this).classed("highlight", false)
    }
    function handleChapterClick(e) {
        let id = (d3.select(this).node().id).split("-")[1];

        e.preventDefault()
		const anchor = document.getElementById(id)
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'instant'
		})
    }
</script>

<nav>
    {#each sections as section, i}
        {@const active = $activeSection == section ? "active" : ""}
        <div class="btn-wrapper">
            <button 
                on:click={handleChapterClick}
                class="sectionBox {active}"
                id="sectionBox-{section}">
            </button>
            <p class="label {active}">{section}</p>
        </div>
    {/each}
    <button 
        on:click={handleListToggle}
        class="listBtn">
            {#if $readingList.length > 0}
                <p class="count"
                in:fly={{ y: 20, duration: 200}}
                out:fade={{ duration: 200}}>
                    {$readingList.length}
                </p>
            {/if}
            {#if $readingListVisible == true}
                <Icon name="x" />
            {:else}
                <Icon name="book-open" />
            {/if}
    </button>
</nav>

<style>
    nav {
        width: 100%;
        position: fixed;
        top: 0rem;
        padding: 1rem 0 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        height: 3rem;
    }
    .sectionBox {
        width: 20px;
        height: 20px;
        background: white;
        margin: 0 1rem;
        opacity: 1;
        transform: scale(0.65);
        transition: 0.25s linear;
    }
    .sectionBox.active {
        transform: scale(1);
    }
    #sectionBox-intro.active {
        border: 3px solid var(--romance-pink);
    }
    #sectionBox-intro.active {
        border: 3px solid var(--romance-pink);
    }
    #sectionBox-raunchiness.active {
        border: 3px solid var(--romance-blue);
    }
    #sectionBox-illustration.active {
        border: 3px solid var(--romance-yellow);
    }
    #sectionBox-race.active {
        border: 3px solid var(--romance-teal);
    }
    #sectionBox-outro.active {
        border: 3px solid var(--romance-purple);
    }
    .sectionBox:hover {
        opacity: 1; 
    }
    #sectionBox-intro {
        border: 3px solid var(--romance-pink-light);
    }
    #sectionBox-raunchiness {
        border: 3px solid var(--romance-blue-light);
    }
    #sectionBox-illustration {
        border: 3px solid var(--romance-yellow-light);
    }
    #sectionBox-race {
        border: 3px solid var(--romance-teal-light);
    }
    #sectionBox-outro {
        border: 3px solid var(--romance-purple-light);
    }
    .label {
        position: absolute;
        top: -0.5rem;
        left: 50%;
        transform: translate(-50%, 100%);
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.25rem;
        box-shadow: -2px 2px 5px  rgba(0,0,0,0.125);
        opacity: 0; 
        text-transform: capitalize;
        font-family: var(--sans-display);
        font-size: var(--14px);
    }
    .label.active {
        opacity: 1; 
    }
    .sectionBox.active .label {
        transform: scale(0.65);
    }
    .btn-wrapper {
        position: relative;
    }
    .btn-wrapper:hover .label {
        opacity: 1; 
        transform: translate(-50%, 100%);
        z-index: 1000;
    }
    .btn-wrapper:hover .sectionBox {
        transform: scale(1);
    }
    .listBtn {
        position: absolute;
        right: 1rem;
        top: 1rem;
        background: transparent;
        z-index: 1000;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        /* animation: pulse-animation 2s infinite; */
        transition: 0.25s linear;
        transform: scale(1);
    }
    .count {
        position: absolute;
        top: -1.3rem;
        right: -0.3rem;
        background: var(--romance-pink-light);
        min-width: 1.25rem;
        min-height: 1.25rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.125rem 0.25rem;
        font-weight: 900;
        font-size: 10px;
        font-family:  var(--sans-display);
        border: 2px solid white;
        box-shadow: 0.25rem 0 1rem  var(--color-gray-300);
    }
    :global(.listBtn.highlight) {
        background: rgba(255, 255, 255, 0.75) !important;
        /* animation: pulse-animation 2s infinite !important; */
        animation: pulse-animation 2s infinite 1s !important;
    }
    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.75);
        }
        100% {
            box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
        }
    }
    @keyframes scale-up {
        0% {
            transform: scale(1);
        }
        20% {
            transform: scale(1.5);
        }
    }
</style>