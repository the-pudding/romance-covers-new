<script>
    import { getContext, onMount } from "svelte";
    import lookbackData from "$data/lookback.csv";
    import {select, selectAll}from "d3-selection";

    import Wall from "$components/Wall.svelte";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";
    import Prose from "$components/Prose.svelte";
    import SmallMultiples from "$components/SmallMultiples.svelte";
	import { Dice4 } from "lucide-svelte";

    const copy = getContext("copy");
    let bookRows = 5;
    let bookWidth = 64;
    let margins = 32;
    const shelves = [0];
    let chunkWidths = [];
    let lookbackDoc;
    let lookbackClinch;
    let lookbackTravel;
    let smallChartRaunchiness;
    let smallChartIllustration;
    let smallChartRace;
    export let bookMin;


    // This function calculates the width of the shelf based on the book rows
    function calcWidth(len) {
        let remainder = len % 5;
        let bookCols = remainder == 1 ? Math.round((len)/bookRows) + 1 : Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + margins : bookCols * (bookWidth + margins);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }

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

    $: if (smallChartRaunchiness !== undefined && smallChartIllustration !== undefined && smallChartRace != undefined) {
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

    function handleEnter(){
        let el = select(this);
        let img = el.select(".book .img-wrapper");
        img.classed("highlight", true)
    }
    function handleExit(){
        let el = select(this);
        let img = el.select(".book .img-wrapper");
        img.classed("highlight", false)
    }
</script>

<section id="lookback">
    <!-- This component handles the body copy. It expects and iteratible array of paragraphs 
        that is pulled from the Google Doc. Right now, it is pulling from the ".lookBack" section.-->
    {#if bookMin < 700}
        <div class="prose">
            <p>{@html copy.intro[1].value}</p>
        </div>
    {/if}
    <Prose copy={copy.lookBack} />

    <!-- This setcion pulls out book(s) to highlight without a full wall by using the Wall.Book.svelte
        and Wall.Shelf.svelte components. To style them differently, you'll want to use global stylings
        like the example in the css.-->
    <h5>Historical Romance Novel Covers</h5>
    <div class="book-wrapper">
        {#each lookbackData as book, i}
            <div class="highlightBook">
                <div class="books"
                    on:mouseenter={handleEnter}
                    on:mouseout={handleExit}>
                    <!-- Books expects a single book. In this case, I'm just using the first row of data from the
                    overall spreadsheet. We could create another spreadsheet structured in the same way, just with
                    "lookBack" books. If you need multiple books, you can wrap the Book.svelte component in an
                    {#each} statement (see Wall.svelte) or the Shelf component below.-->
                    <!-- Index is set to 0 to add publication year on the shelf (might remove?) -->
                    <Book book={book} index={0} bookAddable={false} wallH={760}/>
                </div>
                <div class="shelves">
                    {#each shelves as shelf, i} 
                        <!-- Shelf will be a single shelf. It is wrapped in an {#each} statement to produce
                        multiple shelf rows, but currently there's only one item in the array (const shelves = [0];).
                        To add more, it would look like (const shelves = [0, 1];). This value is hardcoded now, but
                        it could change based on screen size.-->
                        <Shelf shelfW={calcWidth(lookbackData.length)} shelfHasShadow={false} wallH={760} />
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    
    <div class="prose">
        <p>{@html copy.postLookBack[0].value}</p>
    </div>
    <h5>Percentage of Romance Covers Featuring</h5>
    <SmallMultiples />
</section>

<style>
    #lookback {
        background: var(--romance-bg-pink);
        padding: 0 0 4rem 0;
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
        box-decoration-break: clone;
    }
    :global(#lookback .lookback-doc, #lookback .lookback-clinch, #lookback .lookback-travel) {
        border: 2px solid var(--romance-pink)
    }
    :global(#lookback .lookback-doc:hover, #lookback .lookback-clinch:hover, #lookback .lookback-travel:hover, #lookback .small-chart-raunchiness:hover, #lookback .small-chart-illustration:hover, #lookback .small-chart-race:hover) {
        background-color: var(--romance-pink-light);
    }
    :global(#lookback .small-chart-raunchiness) {
        border: 2px solid var(--romance-blue)
    }
    :global(#lookback .small-chart-illustration) {
        border: 2px solid var(--romance-yellow)
    }
    :global(#lookback .small-chart-race) {
        border: 2px solid var(--romance-teal)
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