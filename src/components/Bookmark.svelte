<script>
    import Icon from "$components/helpers/Icon.svelte";
</script>

<div class="instructions">
    <p>Use the <span class="svg-wrapper">
        <Icon name="book open" size="0.75em" />
    </span> buttons next to each book to add it to your reading list.</p>
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
        font-family: var(--sans-display);
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
        margin: 0.25rem 0 0 0.25rem;
    }
    :global(.svg-wrapper svg path) {
        stroke: var(--color-white);
    }
</style>