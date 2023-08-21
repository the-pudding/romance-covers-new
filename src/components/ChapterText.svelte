<script>
    import Prose from "$components/Prose.svelte";
    export let copy;
</script>

<Prose copy={copy} />

<!-- Chapter text is showing up twice with this code -->
<!-- <div class="prose">
    {#if copy}
        {#each copy as text, i}
            <p>{@html text.value}</p>
        {/each}
    {/if}
</div> -->

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