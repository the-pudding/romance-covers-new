<script>
    import { activeSection, readingListVisible } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";
    const sections = ["intro", "raunchiness", "illustration", "race"];

    function handleListToggle(initState) {
        readingListVisible.set(!$readingListVisible);
    }
</script>

<nav>
    {#each sections as section, i}
        {@const active = $activeSection == section ? "active" : ""}
        <button class="sectionBox {active}" id="sectionBox-{section}"></button>
    {/each}
    <button 
        on:click={handleListToggle}
        class="listBtn">
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
        opacity: 0.5;
        transition: 0.25s ease-in-out;
    }
    .sectionBox.active {
        opacity: 1;
    }
    .sectionBox:hover {
        opacity: 1; 
    }
    #sectionBox-intro {
        border: 3px solid var(--romance-pink);
    }
    #sectionBox-raunchiness {
        border: 3px solid var(--romance-blue);
    }
    #sectionBox-illustration {
        border: 3px solid var(--romance-yellow);
    }
    #sectionBox-race {
        border: 3px solid var(--romance-teal);
    }

    .listBtn {
        position: absolute;
        right: 1rem;
        top: 1rem;
        background: transparent;
        z-index: 1000;
    }
</style>