<script>
    import { getContext, onMount } from "svelte";
    import lookbackData from "$data/lookback.csv";
    import * as d3 from "d3";

    import Wall from "$components/Wall.svelte";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";
    import Prose from "$components/Prose.svelte";
    import SmallMultiples from "$components/SmallMultiples.svelte";

    const copy = getContext("copy");
    let bookRows = 5;
    let bookWidth = 64;
    let margins = 32;
    const shelves = [0,1,2,3,4];
    let chunkWidths = [];

    // This function calculates the width of the shelf based on the book rows
    function calcWidth(len) {
        let remainder = len % 5;
        let bookCols = remainder == 1 ? Math.round((len)/bookRows) + 1 : Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + margins : bookCols * (bookWidth + margins);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }
</script>

<section id="lookback">
    <!-- This component handles the body copy. It expects and iteratible array of paragraphs 
        that is pulled from the Google Doc. Right now, it is pulling from the ".lookBack" section.-->
    <Prose copy={copy.lookBack} />

    <!-- This setcion pulls out book(s) to highlight without a full wall by using the Wall.Book.svelte
        and Wall.Shelf.svelte components. To style them differently, you'll want to use global stylings
        like the example in the css.-->
    <div class="highlightBook">
        <div class="books">
            <!-- Books expects a single book. In this case, I'm just using the first row of data from the
            overall spreadsheet. We could create another spreadsheet structured in the same way, just with
            "lookBack" books. If you need multiple books, you can wrap the Book.svelte component in an
            {#each} statement (see Wall.svelte) or the Shelf component below.-->
            <!-- Index is set to 0 to add publication year on the shelf (might remove?) -->
            {#each lookbackData as book, i} 
                <Book book={book} index={0} bookAddable={false}/>
            {/each}
        </div>
        <div class="shelves">
            {#each shelves as shelf, i} 
                <!-- Shelf will be a single shelf. It is wrapped in an {#each} statement to produce
                multiple shelf rows, but currently there's only one item in the array (const shelves = [0];).
                To add more, it would look like (const shelves = [0, 1];). This value is hardcoded now, but
                it could change based on screen size.-->
                <Shelf shelfW={calcWidth(lookbackData.length)} shelfHasShadow={false} />
            {/each}
        </div>
    </div>
    
    <Prose copy={copy.postLookBack} />
    <SmallMultiples />
</section>

<style>
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
    .highlightBook{
        display: flex;
        width: 30rem;
        margin: auto;
        height: 12rem;
    }
</style>