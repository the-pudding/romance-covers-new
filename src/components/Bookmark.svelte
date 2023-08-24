<script>
    import Icon from "$components/helpers/Icon.svelte";
</script>

<div class="instructions">
    <p>Use the</p>
    <div class="svg-wrapper">
        <Icon name="book open" size="0.75em" />
    </div>
    <p>buttons next to each book to add it to your reading list.</p>
</div>  

<style>
    .instructions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 2rem auto 0 auto;
        max-width: 40rem;
        font-family: var(--sans);
    }

    .svg-wrapper {
        background-color: var(--color-gray-900);
        border: 2px solid white;
        box-shadow: 0.25rem 0 1rem  var(--color-gray-300);
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        margin: 0 0.25rem;
    }
    :global(.svg-wrapper svg) {
        margin-top: 0.4rem;
    }
    :global(.svg-wrapper svg path) {
        stroke: var(--color-white);
    }
</style>