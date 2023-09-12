<script>
    import { getContext, onMount } from "svelte";
    import lookbackData from "$data/lookback.csv";
    import * as d3 from "d3";

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


    // This function calculates the width of the shelf based on the book rows
    function calcWidth(len) {
        let remainder = len % 5;
        let bookCols = remainder == 1 ? Math.round((len)/bookRows) + 1 : Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + margins : bookCols * (bookWidth + margins);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }

    onMount(() => {
		lookbackDoc = d3.selectAll(".lookback-doc");
        lookbackClinch = d3.selectAll(".lookback-clinch");
        lookbackTravel = d3.selectAll(".lookback-travel");
        smallChartRaunchiness = d3.selectAll(".small-chart-raunchiness");
        smallChartIllustration = d3.selectAll(".small-chart-illustration");
        smallChartRace = d3.selectAll(".small-chart-race");
    })

    $: if (lookbackDoc !== undefined && lookbackTravel !== undefined && lookbackClinch !== undefined) {
        lookbackDoc
            .on("mouseover", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
                d3.selectAll("#book_0 .img-wrapper, #book_1 .img-wrapper, #book_2 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
            })
        lookbackTravel
            .on("mouseover", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
                d3.selectAll("#book_2 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
            })
        lookbackClinch
            .on("mouseover", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
                d3.selectAll("#book_3 .img-wrapper, #book_4 .img-wrapper").classed("highlight", true);
            })
            .on("mouseout", function() {
                d3.selectAll("#lookback .img-wrapper").classed("highlight", false);
            })

    }

    $: if (smallChartRaunchiness !== undefined && smallChartIllustration !== undefined && smallChartRace != undefined) {
        smallChartRaunchiness
            .on("mouseover", function() {
                d3.select(".top-wrapper.raunchiness").selectAll(".year-bar").classed("active", true);
            })
            .on("mouseout", function() {
                d3.select(".top-wrapper.raunchiness").selectAll(".year-bar").classed("active", false);
            })
        smallChartIllustration
            .on("mouseover", function() {
                d3.select(".top-wrapper.illustration").selectAll(".year-bar").classed("active", true);
            })
            .on("mouseout", function() {
                d3.select(".top-wrapper.illustration").selectAll(".year-bar").classed("active", false);
            })
        smallChartRace
            .on("mouseover", function() {
                d3.select(".top-wrapper.race").selectAll(".year-bar").classed("active", true);
            })
            .on("mouseout", function() {
                d3.select(".top-wrapper.race").selectAll(".year-bar").classed("active", false);
            })
    }

    function handleEnter(){
        let el = d3.select(this);
        let img = el.select(".book .img-wrapper");
        img.classed("highlight", true)
    }
    function handleExit(){
        let el = d3.select(this);
        let img = el.select(".book .img-wrapper");
        img.classed("highlight", false)
    }
</script>

<section id="lookback">
    <!-- This component handles the body copy. It expects and iteratible array of paragraphs 
        that is pulled from the Google Doc. Right now, it is pulling from the ".lookBack" section.-->
    <Prose copy={copy.lookBack} />

    <!-- This setcion pulls out book(s) to highlight without a full wall by using the Wall.Book.svelte
        and Wall.Shelf.svelte components. To style them differently, you'll want to use global stylings
        like the example in the css.-->
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
    
    <Prose copy={copy.postLookBack} />
    <SmallMultiples />
</section>

<style>
    .book-wrapper {
        display: flex;
        flex-direction: row;
        max-width: 50rem;
        margin: 0 auto;
        padding: 2rem 0 4rem 0;
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
        height: 12rem;
    }
    :global(#lookback .book) {
        margin: 0.5rem 0 0 0.25rem;
        transition: 0.125s all linear;
    }
    :global(#lookback .img-wrapper.highlight) {
        transform: scale(1.5) translate(0, -15%);
        transition: 0.125s all linear;
    }
    :global(#lookback .lookback-doc, #lookback .lookback-clinch, #lookback .lookback-travel, #lookback .small-chart-raunchiness, #lookback .small-chart-illustration, #lookback .small-chart-race) {
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        box-shadow: -2px 2px 5px  rgba(0,0,0,0.125);
        opacity: 1; 
        font-family: var(--sans-display);
        box-decoration-break: clone;
    }
    :global(#lookback .lookback-doc:hover, #lookback .lookback-clinch:hover, #lookback .lookback-travel:hover, #lookback .small-chart-raunchiness:hover, #lookback .small-chart-illustration:hover, #lookback .small-chart-race:hover) {
        background-color: var(--romance-pink-light);
    }

    @media only screen and (min-width: 600px) {
        .book-wrapper {
            flex-wrap: nowrap;
        }
        .highlightBook {
            width: 30rem;
        }
        :global(#lookback .img-wrapper.highlight) {
            transform: scale(1.75) translate(0, -25%);
            transition: 0.125s all linear;
        }
	}
</style>