<script>
    import { getContext, onMount } from "svelte";
    import data from "$data/listings.csv";
    import * as d3 from "d3";

    import Wall from "$components/Wall.svelte";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";
    import Prose from "$components/Prose.svelte";
    import SmallMultiples from "$components/SmallMultiples.svelte";

    const copy = getContext("copy");
    const book = [data[0]];
    let bookRows = 5;
    let bookWidth = 64;
    let margins = 32;
    const shelves = [0];
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
            <Book book={book[0]}/>
        </div>
        <div class="shelves">
            {#each shelves as shelf, i} 
                <!-- Shelf will be a single shelf. It is wrapped in an {#each} statement to produce
                multiple shelf rows, but currently there's only one item in the array (const shelves = [0];).
                To add more, it would look like (const shelves = [0, 1];). This value is hardcoded now, but
                it could change based on screen size.-->
                <Shelf shelfW={calcWidth(book.length)} />
            {/each}
        </div>
    </div>
    <SmallMultiples />
</section>

<style>
    .shelves {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 1;
    }
    .books {
        height: auto;
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>