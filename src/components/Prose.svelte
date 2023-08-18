<script>
    export let copy;
</script>

<div class="prose">
    {#if copy}
        {#each copy as text, i}
            <p>{@html text.value}</p>
        {/each}
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
    }
</style>