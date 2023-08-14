<script>
    import { activeSection, readingListVisible } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";
    const sections = ["intro", "raunchiness", "illustration", "race", "outro"];
    import * as d3 from "d3";

    function handleListToggle(initState) {
        readingListVisible.set(!$readingListVisible);
        d3.select(this).style("animation", "none")
    }
    function handleChapterClick(e) {
        let id = (d3.select(this).node().id).split("-")[1];
        console.log(id)

        e.preventDefault()
		const anchor = document.getElementById(id)
        console.log(anchor)
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
            <p class="label">{section}</p>
        </div>
    {/each}
    {#if $activeSection !== "intro"}
        <button 
            on:click={handleListToggle}
            class="listBtn">
                {#if $readingListVisible == true}
                    <Icon name="x" />
                {:else}
                    <Icon name="book-open" />
                {/if}
        </button>
    {/if}
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
        top: 0;
        left: 50%;
        transform: translate(-50%, 100%);
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.25rem;
        box-shadow: 1rem 0 1rem  var(--color-gray-100);
        opacity: 0; 
        text-transform: capitalize;
        font-family: var(--sans);
    }
    .sectionBox.active .label {
        transform: scale(0.65);
    }
    .btn-wrapper {
        position: relative;
    }
    .btn-wrapper:hover .label {
        opacity: 1; 
        transform: translate(-50%, 75%);
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
        animation: pulse-animation 2s infinite;
    }

    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.75);
        }
        100% {
            box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
        }
    }
</style>