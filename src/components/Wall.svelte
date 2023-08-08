<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { readingList, highlightYear } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";

    export let data;
    export let value;
    export let stepData;
    export let section;

    const shelves = [0, 1, 2, 3, 4];
    let bookWidth = 64;
    let margins = 32;
    let bookRows = 5;
    let xShift;
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
        let bookCols = Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + margins : bookCols * (bookWidth + margins);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }

    function calcTotalWidth(chunks) {
        totalShelfWidth = chunks.reduce((a, b) => a + b, 0);
    }


    onMount(() => {
		stop1_raunchiness = d3.select("#book_9780345543790").node().getBoundingClientRect().x;
        stop2_raunchiness = d3.select("#book_9780062448026").node().getBoundingClientRect().x;
        stop3_raunchiness = d3.select("#book_9781335458520").node().getBoundingClientRect().x;

        if (chunkWidths.length == 26) {
            calcTotalWidth(chunkWidths)
        }
        // wallWidth = d3.select(`#wall-${section}`).node().getBoundingClientRect().width;
	})

    function horizShift(value) {
         if (value == 0 || value == undefined) {
            xShift = 0;
         } else if (value == 1) {
            xShift = stop1_raunchiness - margins;
         } else if (value == 2) {
            xShift =  stop2_raunchiness - margins;
         } else if (value == 3) {
            xShift =  stop3_raunchiness - margins;
         }
    }

    $: value, horizShift(value);
    $: console.log(stepData);
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<section id="wall-{section}" class="wall" style="transform:translateX(-{xShift}px)">
    {#each yearGroups as year, i}
        <div class="yearChunk" id="chunk-{year[0]}"
        style="width:{calcWidth(year[1].length)}px;margin-right:{calcWidth(year[1].length)}px">
            <div class="books">
                {#each year[1] as book, i}
                    <Book book={book} index={i} />
                {/each}
            </div>
        </div>
    {/each}
    {#if totalShelfWidth}
        <div class="shelves">
            {#each shelves as shelf, i} 
                <div class="shelf" style="width:{totalShelfWidth}px">
                    <div class="shelf-front"></div>
                    <div class="shelf-top"></div>
                    <div class="shelf-shadow"></div>
                </div>
            {/each}
        </div>
    {/if}
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
    .shelves {
        width: 100%;
        height: 50vh;
        position: absolute;
        z-index: 1;
    }
    .shelf {
        height: calc(100vh / 8);
        display: flex;
        align-items: end;
        position: relative;
    }
    .shelf-front {
        background: #FBF7F7;
        width: 100%;
        height: 1rem;
        position: absolute;
        bottom: -1.5rem;
        z-index: 999;
    }
    .shelf-top {
        background: var(--color-white);
        /* background: purple; */
        width: 100%;
        height: 1rem;
        position: absolute;
        left: 0.25rem;
        bottom: -0.5rem;
        transform: skew(-30deg);
        stroke: 1px solid #FBF7F7;
        z-index: 999;
    }
    .shelf-shadow {
        background: #D9D9D9;
        /* background: green; */
        transform: skew(-60deg);
        width: 100%;
        bottom: -6.5rem;
        height: 5rem;
        position: absolute;
        left: -8.75rem;
        opacity: 0.75;
        filter: blur(3rem); 
        z-index: 1;
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