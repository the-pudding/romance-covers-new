<script>
    export let category;
</script>

<div class="instructions">
    {#if category == "wall"}
        <p>Use the <span class="instruct-add"></span> buttons next to each book to add it to your reading list and see your list in the top right.</p>
    {:else}
        <p>Use the <span class="instruct-add"></span> buttons next to each book to add it to your reading list.</p>
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
    :global(.instruct-add) {
        display: inline-block;
        height: 1.5rem;
        width: 1.5rem;
        background-image: url($svg/book-open.svg);
        background-size: 0.75rem 0.75rem;
        background-repeat: no-repeat;
        background-position: center;
        background-color: var(--color-gray-800);
        border-radius: 50%;
        box-shadow: 0.25rem 0 0.5rem  rgba(0,0,0,0.125);
        border: 2px solid var(--color-white);
        pointer-events: none;
        position: relative;
        top: 0.5rem;
    }
</style>