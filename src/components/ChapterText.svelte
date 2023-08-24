<script>
    import Prose from "$components/Prose.svelte";
    export let copy;
</script>

<Prose copy={copy} />

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