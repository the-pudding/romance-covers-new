<script>
    export let copy;
</script>

<div class="prose">
    {#if copy && copy.length > 1}
        {#each copy as text, i}
            <p>{@html text.value}</p>
        {/each}
    {:else if copy <= 1}
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
    }
    p {
        font-family: var(--serif);
        font-weight: 500;
    }
</style>