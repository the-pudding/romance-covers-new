<script>
    import { getContext } from "svelte";
    import inView from "$actions/inView.js";
    import { readingList, activeSection } from "$stores/misc.js";
    import ReadingList from "$components/ReadingList.svelte";
    import data from "$data/listings.csv";
    import Prose from "$components/Prose.svelte";
    const copy = getContext("copy");

    function setSection(id) { activeSection.set(id); }
</script>

<section id="methods"
    use:inView
    on:enter={() => setSection("outro")}>
    <Prose copy={copy.outro} />
    {#if $readingList.length > 0}
        <ReadingList data={data} pos={"inline"}/>
    {/if}
    <div id="notes">
        <h5>Methods & Notes</h5>
        <Prose copy={copy.dataNote} />
    </div>
</section>

<style>
    #methods {
        background-image: linear-gradient(var(--romance-bg-teal) 0%, var(--romance-bg-pink) 50%);
        padding: 10rem 0 5rem 0;
    }
    .prose {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 40rem;
        margin: 0 auto;
        line-height: 2;
    }
    :global(#notes a) {
        background-position: 0 1rem;
        background-image: linear-gradient(180deg,transparent 0,var(--romance-pink-light) 0);
    }
    :global(#notes a:hover) {
        background-position: 0 0;
        background-image: linear-gradient(180deg,transparent 0,var(--romance-pink-light) 0);
    }
    #notes h5 {
        max-width: 40rem;
        margin: 5rem auto 0 auto;
        padding: 0 1rem;
        font-family: var(--sans-display);
        text-transform: uppercase;
        font-size: var(--18px);
        font-weight: 900;
        letter-spacing: -5%;
    }
    :global(#notes .prose p) {
        font-family: var(--sans-display);
        font-size: var(--14px);
        margin: 0.5rem 0;
        line-height: 1.65;
    }
</style>