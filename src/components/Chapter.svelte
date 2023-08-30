<script>
    import WallScrolly from "$components/WallScrolly.svelte";
    import ChapterText from "$components/ChapterText.svelte";
    import Bookmark from "$components/Bookmark.svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";

    export let id;
    export let data;
    export let copyBlock;
    export let copyScroll;

    function setSection(id) { activeSection.set(id); }

    function resetTitles(id) {
        let title = id == "race" ? "racial diversity" : id;
        return title
    }
</script>

<section id={id}
    use:inView
    on:enter={() => setSection(id)}>
    <h2>{resetTitles(id)}</h2>
    <ChapterText copy={copyBlock}/>
    <Bookmark />
    <WallScrolly data={data} copy={copyScroll} section={id} />
</section>

<style>
    section {
        padding: 10rem 0;
    }
    #raunchiness {
        background-image: linear-gradient(var(--romance-bg-pink) 0%, var(--romance-bg-blue) 10%);
    }
    #illustration {
        background-image: linear-gradient(var(--romance-bg-blue) 0%, var(--romance-bg-yellow) 10%);
    }
    #race {
        background-image: linear-gradient(var(--romance-bg-yellow) 0%, var(--romance-bg-teal) 10%);
    }
    h2 {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 40rem;
        margin: 0 auto 4rem auto;
        text-align: center;
        text-transform: capitalize;
        font-family: var(--serif-display);
        font-size: var(--44px);
        padding: 3rem 0 0 0;
        z-index: 100;
        position: relative;
    }
    h2:after {
        position: absolute;
        font-family: var(--sans-display);
        font-weight: 900;
        font-size: 200px;
        text-align: center;
        left: 50%;
        transform: translate(-50%, -10%);
        text-transform: uppercase;
        pointer-events: none;
        z-index: -1;
        letter-spacing: -0.5rem; 
    }
    :global(#raunchiness h2:after) {
        content: "Raunchiness";
        background: linear-gradient(to bottom, rgba(142, 172, 249, 0) 15%, rgba(142, 172, 249, 1));
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        opacity: 0.25;
    }
    :global(#illustration h2:after) {
        content: "Illustration";
        background: linear-gradient(to bottom, rgba(253, 229, 154, 0) 15%, rgba(253, 229, 154, 1));
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        opacity: 0.5;
    }
    :global(#race h2:after) {
        content: "Diversity";
        background: linear-gradient(to bottom, rgba(124, 231, 231, 0) 15%, rgba(124, 231, 231, 1));
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        opacity: 0.35;
    }
    @media only screen and (min-width: 600px) {
        h2 {
            font-size: var(--64px);
        }
        h2:after {
            font-size: 300px;
        }
	}
</style>