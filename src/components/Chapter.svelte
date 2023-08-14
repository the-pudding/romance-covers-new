<script>
    import WallScrolly from "$components/WallScrolly.svelte";
    import ChapterText from "$components/ChapterText.svelte";
    import inView from "$actions/inView.js";
    import { activeSection } from "$stores/misc.js";

    export let id;
    export let data;
    export let copyBlock;
    export let copyScroll;

    function setSection(id) { activeSection.set(id); }
</script>

<section id={id}
    use:inView
    on:enter={() => setSection(id)}>
    <h2>{id}</h2>
    <ChapterText copy={copyBlock}/>
    <WallScrolly data={data} copy={copyScroll} section={id} />
</section>

<style>
    section {
        padding: 0 0 10rem 0;
    }
    #raunchiness {
        background-image: linear-gradient(var(--romance-bg-pink) 0%, var(--romance-bg-blue) 10%);;
    }
    #illustration {
        background-image: linear-gradient(var(--romance-bg-blue) 0%, var(--romance-bg-yellow) 10%);;
    }
    #race {
        background-image: linear-gradient(var(--romance-bg-yellow) 0%, var(--romance-bg-teal) 10%);;
    }
    h2 {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 40rem;
        margin: 0 auto;
        text-align: center;
        text-transform: capitalize;
        font-family: "Canela";
        font-size: var(--64px);
        padding: 3rem 0 0 0;
    }
</style>