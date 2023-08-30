<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { stepData } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";

    export let data;
    export let value;
    export let section;
    export let copy;

    const shelves = [0, 1, 2, 3, 4];
    let bookWidth = 64;
    let margins = 32;
    let bookRows = 5;
    let xShift = 0;
    let h;
    let w;
    let bookAdded = false;
    let stop1_raunchiness;
    let stop2_raunchiness;
    let stop3_raunchiness;
    let stop4_raunchiness;

    let yearGroups = d3.groups(data, d => d.year);
    let chunkWidths = [];
    let totalShelfWidth;

    function calcWidth(len) {
        let remainder = len % 5;
        let bookCols = remainder == 1 ? Math.round((len)/bookRows) + 1 : Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + margins : bookCols * (bookWidth + margins);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }

    // function calcTotalWidth(chunks) {
    //     totalShelfWidth = chunks.reduce((a, b) => a + b, 0);
    // }

    onMount(() => {
		stop1_raunchiness = d3.select("#book_9780345543790").node().getBoundingClientRect().x;
        stop2_raunchiness = d3.select("#book_9780062448026").node().getBoundingClientRect().x;
        stop3_raunchiness = d3.select("#book_9781335458520").node().getBoundingClientRect().x;

        if (chunkWidths.length == 26) {
            calcTotalWidth(chunkWidths)
        }
        // wallWidth = d3.select(`#wall-${section}`).node().getBoundingClientRect().width;
	})

    function shiftX(value) {
        if (copy[value] !== undefined) {
            if (value == 0) {
                xShift = 0; 
            } else if (copy[value] !== 0 && d3.select(`#book_${copy[value].scrollToId}`).node() !== null) {
                let sel = d3.select(`#book_${copy[value].scrollToId}`).node().getBoundingClientRect().x;
                xShift = xShift + sel - margins
            }
        }
    }

    $: value, shiftX(value);
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<section id="wall-{section}" class="wall" style="transform:translateX(-{xShift}px)">
    {#each yearGroups as year, i}
        <div class="year-wrapper">
            <div class="yearChunk" id="chunk-{year[0]}"
            style="width:{calcWidth(year[1].length)}px">
                <div class="books">
                    {#each year[1] as book, i}
                        <Book book={book} index={i} />
                    {/each}
                </div>
            </div>
            <div class="shelves">
                {#each shelves as shelf, i} 
                    <Shelf shelfW={calcWidth(year[1].length)} />
                {/each}
            </div>
        </div>
    {/each}
</section>

<style>
    .wall {
        margin: 0;
        padding: 0 5rem;
        display: flex;
        flex-direction: row;
        height: 100vh;
        z-index: 1;
        position: relative;
        transition: 1s ease-in-out;
    }
    .year-wrapper {
        pointer-events: none;
    }
    .yearChunk {
        margin: 0 2rem 0 0;
    }
    .shelves {
        width: 100%;
        height: 70vh;
        position: absolute;
        z-index: 1;
        pointer-events: none;
    }
    .books {
        height: 70vh;
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>