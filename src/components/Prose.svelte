<script>
    export let copy;
</script>

<div class="prose">
    {#if copy && Array.isArray(copy)}
        {#each copy as text, i}
            <p>{@html text.value}</p>
        {/each}
    {:else}
        <p>{@html copy.value}</p>
    {/if}
</div>

<style>
    .prose {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 40rem;
        margin: 0 auto;
        line-height: 2;
        padding: 0 1rem;
        font-weight: 500;
        font-size: var(--16px);
    }
    p {
        font-family: var(--serif);
        font-weight: 500;
    }
</style>