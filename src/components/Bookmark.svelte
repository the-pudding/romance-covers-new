<script>
    import Icon from "$components/helpers/Icon.svelte";
    import AddButton from "$components/AddButton.svelte";
</script>

<div class="instructions">
    <p>Use the <AddButton /> buttons next to each book to add it to your reading list and see the full list in the top right.</p>
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
     .svg-wrapper {
        display: inline-block;
        background-color: var(--color-gray-900);
        border: 2px solid white;
        box-shadow: 0.25rem 0 1rem  var(--color-gray-300);
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
        margin: 0;
    }
    :global(.svg-wrapper svg) {
        width: 100%;
        height: 100%;
        margin: 0.3rem 0 0 0;
        display: inline-block;
    }
    :global(.svg-wrapper svg path) {
        stroke: var(--color-white);
    }
</style>