<script>
    import { getContext } from "svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";
    import Tip from "$components/helpers/Tip.svelte";
    import ReadingList from "$components/ReadingList.svelte";
    import data from "$data/listings.csv";
    import Prose from "$components/Prose.svelte";
    const copy = getContext("copy");

    function setSection(id) { activeSection.set(id); }
</script>

<section id="methods"
    use:inView
    on:enter={() => setSection("methods")}>
    <Prose copy={copy.outro} />
        <ReadingList data={data} pos={"inline"}/>
    <div id="notes">
        <h5>Methods & Notes</h5>
        <Prose copy={copy.dataNote} />
    </div>
    <div class="tip-wrapper">
        <p>Like this story? Give the author a <span><Tip href={"https://donate.stripe.com/14k9DY8BJ5C07PG8wD"}/></span></p>
    </div>
</section>

<style>
    #methods {
        background-image: linear-gradient(var(--romance-bg-teal) 0%, var(--romance-bg-pink) 50%);
        padding: 10rem 0 5rem 0;
    }
    :global(#notes a:hover, section#methods a:hover) {
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
    .tip-wrapper p {
        max-width: 40rem;
        margin: 2rem auto 0 auto;
        padding: 0 1rem;
        font-family: var(--sans-display);
        font-weight: 900;
        display: flex;
        align-items: center;
        color: var(--color-gray-800);
    }
    :global(#methods .tip-wrapper p span a.tip-button) {
        position: relative;
        left: 0;
        bottom: 0;
        margin: 0 0 0 0.5rem;
        background-image: var(--color-gray-800);
    }
    :global(#methods .tip-wrapper p span a.tip-button:hover) {
        background: var(--romance-pink);
    }
</style>