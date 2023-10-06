<script>
    import { getContext, onMount } from "svelte";
    import lookbackData from "$data/lookback.csv";
    import { selectAll }from "d3-selection";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";
    import Prose from "$components/Prose.svelte";
    import SmallMultiples from "$components/SmallMultiples.svelte";

    export let bookMin;

    const copy = getContext("copy");

    let lookbackDoc;
    let lookbackClinch;
    let lookbackTravel;
    let smallChartRaunchiness;
    let smallChartIllustration;
    let smallChartRace;
    let introText;

    onMount(() => {
		lookbackDoc = selectAll(".lookback-doc");
        lookbackClinch = selectAll(".lookback-clinch");
        lookbackTravel = selectAll(".lookback-travel");
        smallChartRaunchiness = selectAll(".small-chart-raunchiness");
        smallChartIllustration = selectAll(".small-chart-illustration");
        smallChartRace = selectAll(".small-chart-race");
    })

    $: if (lookbackDoc !== undefined && lookbackTravel !== undefined && lookbackClinch !== undefined) {
        lookbackDoc
            .on("mouseover", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
                selectAll("#book_0 .img-wrapper, #book_1 .img-wrapper, #book_2 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
            })
        lookbackTravel
            .on("mouseover", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
                selectAll("#book_2 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
            })
        lookbackClinch
            .on("mouseover", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
                selectAll("#book_3 .img-wrapper, #book_4 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                selectAll("#lookback .img-wrapper").classed("highlight", false);
            })

    }

    $: if (smallChartRaunchiness !== undefined && smallChartIllustration !== undefined && smallChartRace !== undefined) {
        smallChartRaunchiness
            .on("mouseover", function() {
                selectAll(".top-wrapper.illustration, .top-wrapper.race").style("opacity", 0.25);
            })
            .on("mouseout", function() {
                selectAll(".top-wrapper").style("opacity", 1);
            })
        smallChartIllustration
            .on("mouseover", function() {
                selectAll(".top-wrapper.raunchiness, .top-wrapper.race").style("opacity", 0.25);
            })
            .on("mouseout", function() {
                selectAll(".top-wrapper").style("opacity", 1);
            })
        smallChartRace
            .on("mouseover", function() {
                selectAll(".top-wrapper.illustration, .top-wrapper.raunchiness").style("opacity", 0.25);
            })
            .on("mouseout", function() {
                selectAll(".top-wrapper").style("opacity", 1);
            })
    }

    function setText() {
        if (copy !== undefined) {
			if (bookMin > 900) { introText = undefined; }
            else if (bookMin > 750) { 
                introText = copy.intro.slice(3,4); 
                let introBit = copy.intro.slice(2,3)
                introBit = introBit[0].value.split("sexuality. ")[1];
                introText.unshift({type: "text", "value": introBit })
            } else if (bookMin > 650) {
                introText = copy.intro.slice(2,3); 
            } else if (bookMin > 600) {
                introText = copy.intro.slice(2,3); 
                let introBit = copy.intro.slice(1,2);
                introBit = introBit[0].value.split("beliefs. ")[1];
                introText.unshift({type: "text", "value": introBit })
            }
            else { introText = copy.intro.slice(1,4); }
		}
    }

    $: bookMin, setText();
</script>

<section id="lookback">
    {#if introText !== undefined}
        <Prose copy={introText}/>
    {/if}
    <Prose copy={copy.lookBackA[0]}/>
    <h5>Clinch covers featuring Fabio</h5>
    <div class="book-wrapper">
        {#each lookbackData.slice(5,10) as book, i}
            <div class="highlightBook">
                <div class="books books-fabio">
                    <Book book={book} index={0} bookAddable={false} wallH={760} bookRows={5}/>
                </div>
                <div class="shelves">
                    <Shelf shelfW={100} shelfHasShadow={false} wallH={760} bookRows={5}/>
                </div>
            </div>
        {/each}
    </div>
    <Prose copy={copy.lookBackB[0]}/>
    <h5>Historical Romance Novel Covers</h5>
    <div class="book-wrapper">
        {#each lookbackData.slice(0,5) as book, i}
            <div class="highlightBook">
                <div class="books">
                    <Book book={book} index={0} bookAddable={false} wallH={760} bookRows={5}/>
                </div>
                <div class="shelves">
                    <Shelf shelfW={100} shelfHasShadow={false} wallH={760} bookRows={5}/>
                </div>
            </div>
        {/each}
    </div>
    <Prose copy={copy.postLookBack[0]}/>
    <h5>Percentage of Romance Novel Covers Featuring...</h5>
    <SmallMultiples />
</section>

<style>
    #lookback {
        background: var(--romance-bg-pink);
        padding: 0 0 4rem 0;
    }
    :global(#lookback a) {
		background-image: linear-gradient(180deg,transparent 0,var(--romance-pink-light) 0);
	}
    :global(.books-fabio .marker) {
        display: none;
    }
    .prose {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 40rem;
        margin: 0 auto;
        line-height: 2;
        padding: 0 1rem;
    }
    h5 {
        max-width: 40rem;
        text-transform: uppercase;
        margin: 4rem auto 2rem auto;
        font-family: var(--sans-display);
        font-weight: 900;
        text-align: center;
        padding: 0 1rem;
        font-size: var(--16px);
    }
    .book-wrapper {
        display: flex;
        flex-direction: row;
        max-width: 50rem;
        margin: -3rem auto 6rem auto;
        flex-wrap: wrap;
    }
    .shelves {
        height: auto;
        position: absolute;
        z-index: 1;
        display: flex;
        margin: 10px;
    }
    .books {
        height: auto;
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .highlightBook {
        display: flex;
        justify-content: center;
        width: 33%;
        margin: auto;
        height: 10rem;
        z-index: 1;
    }
    :global(#lookback .book) {
        margin: 0.5rem 0 0 0.25rem;
        transition: 0.125s all linear;
    }
    :global(#lookback .img-wrapper.highlight) {
        transform: scale(1.25) translate(0, -15%);
        transition: 0.125s all linear;
    }
    :global(#lookback .lookback-doc, #lookback .lookback-clinch, #lookback .lookback-travel, #lookback .small-chart-raunchiness, #lookback .small-chart-illustration, #lookback .small-chart-race) {
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.125rem 0.5rem;
        box-shadow: -2px 2px 5px  rgba(0,0,0,0.125);
        opacity: 1; 
        font-family: var(--sans-display);
        -ms-box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        -o-box-decoration-break: clone;
        box-decoration-break: clone;
    }
    :global(#lookback .lookback-doc, #lookback .lookback-clinch, #lookback .lookback-travel) {
        border: 2px solid var(--romance-pink)
    }
    :global(#lookback .lookback-doc:hover, #lookback .lookback-clinch:hover, #lookback .lookback-travel:hover, #lookback .small-chart-raunchiness:hover, #lookback .small-chart-illustration:hover, #lookback .small-chart-race:hover) {
        background-color: var(--romance-pink-light);
    }
    :global(#lookback .small-chart-raunchiness) {
        border: 2px solid var(--romance-blue);
    }
    :global(#lookback .small-chart-illustration) {
        border: 2px solid var(--romance-yellow);
    }
    :global(#lookback .small-chart-race) {
        border: 2px solid var(--romance-teal);
    }
    :global(#lookback .small-chart-raunchiness:hover) {
        background-color: var(--romance-blue-light);
    }
    :global(#lookback .small-chart-illustration:hover) {
        background-color: var(--romance-yellow-light);
    }
    :global(#lookback .small-chart-race:hover) {
        background-color: var(--romance-teal-light);
    }

    @media only screen and (min-width: 600px) {
        .book-wrapper {
            flex-wrap: nowrap;
        }
        .highlightBook {
            width: 30rem;
        }
        :global(#lookback .img-wrapper.highlight) {
            transform: scale(1.25) translate(0, 0);
            transition: 0.125s all linear;
        }
	}
</style>