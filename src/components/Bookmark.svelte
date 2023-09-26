<script>
    import AddButton from "$components/AddButton.svelte";

    export let category;
</script>

<div class="instructions">
    {#if category == "wall"}
        <p>Use the <AddButton /> buttons next to each book to add it to your reading list and see the full list in the top right.</p>
    {:else}
        <p>Use the <AddButton /> buttons next to each book to add it to your reading list.</p>
    {/if}
</div>  

<style>
    .instructions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 2rem auto 0 auto;
        max-width: 25rem;
        font-family: var(--sans-display);
        text-align: center;
        padding: 0 1rem;
        letter-spacing: -0.025rem;
        color: var(--color-gray-600);
        font-size: var(--14px);
    }
    :global(.instructions .add) {
        display: inline-block;
        position: relative;
        bottom: 0.25rem;
        right: 0;
        pointer-events: none;
    }
    :global(.instructions .message) {
        display: none;
    }
</style>