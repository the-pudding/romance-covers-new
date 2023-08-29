<script>
    import { getContext } from "svelte";
    import inView from "$actions/inView.js";
    import { readingList, activeSection } from "$stores/misc.js";
    import ReadingList from "$components/ReadingList.svelte";
    import data from "$data/listings.csv";
    const copy = getContext("copy");

    function setSection(id) { activeSection.set(id); }
</script>

<section id="outro"
    use:inView
    on:enter={() => setSection("outro")}>
    <div class="prose">
        {#if copy}
            {#each copy.lookBack as text, i}
                <p>{@html text.value}</p>
            {/each}
        {/if}
    </div>
    {#if $readingList.length > 0}
        <ReadingList data={data} pos={"inline"}/>
    {/if}
</section>

<style>
    #outro {
        background-image: linear-gradient(var(--romance-bg-teal) 0%, var(--romance-bg-purple) 50%);
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
</style>