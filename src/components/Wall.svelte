<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { stepData, sliderVisible, sliderStore } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";

    export let data;
    export let value;
    export let section;
    export let copy;

    const shelves = [0, 1, 2, 3, 4];
    let margins = 32;
    let bookRows = 5;
    let xShift = 0;
    let h;
    let w;
    let wallH;
    let shelfSectinoW;

    let yearGroups = d3.groups(data, d => d.year);
    let chunkWidths = [];
    let chunkWidths2 = [];
    let totalShelfWidth;

    function calcWidth(len) {
        let bookWidth = Math.floor(wallH/5*0.66);
        let remainder = len % 5;
        let bookCols = remainder == 1 ? Math.round((len)/bookRows) + 1 : Math.round((len)/bookRows);
        let chunkWidth = bookCols == 0 ? bookWidth + 8 : (bookCols * (bookWidth) + 8);
        chunkWidths.push(chunkWidth);
        return chunkWidth;
    }

    // function calcTotalWidth(chunks) {
    //     totalShelfWidth = chunks.reduce((a, b) => a + b, 0);
    // }

    onMount(() => {
        console.log(d3.selectAll("#race #book_9781250801234"));
	})

    function shiftX(value) {
        if (copy[value] !== undefined) {
            if (value == 0) {
                xShift = 0; 
            } else if (copy[value] !== 0 && d3.select(`#${section} #book_${copy[value].scrollToId}`).node() !== null) {
                let sel = d3.select(`#book_${copy[value].scrollToId}`).node().getBoundingClientRect().x;
                // console.log(xShift, (sel-margins))
                xShift = xShift + sel - margins
            }
        }
    }

    function getYearLengths(data) {
        chunkWidths2 = [];
        if (wallH !== undefined) {
            let bookWidth = Math.floor(wallH/5*0.66);
            data.forEach((d, i) => {
                let year = d[0];
                let chunkLength = d[1].length;
                let remainder = chunkLength % 5;
                let bookCols = remainder == 1 ? Math.round((chunkLength)/bookRows) + 1 : Math.round((chunkLength)/bookRows);
                let chunkWidth = bookCols == 0 ? bookWidth + 8 : (bookCols * (bookWidth) + 8);
                chunkWidths2.push({year: year, chunkWidth: chunkWidth});
            });
        }
    }
    
    function shiftSlider() {
        if ($sliderVisible) {
            let maxSlide = xShift;
            xShift = $sliderStore*maxSlide/100;
        }
    }

    $: value, shiftX(value);
    $: wallH, getYearLengths(yearGroups);
    $: w, getYearLengths(yearGroups)
    $: $sliderStore, shiftSlider();
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<section id="wall-{section}" class="wall">
    <div class="overflow-wrap" style="transform:translate3d(-{xShift}px,0,0)">
        {#each yearGroups as year, i}
            <div class="year-wrapper" bind:clientHeight={wallH}>
                {#if wallH !== undefined && chunkWidths2.length == 13}
                    {@const match = chunkWidths2.find((d) => d.year == year[0])}
                    <div class="yearChunk" id="chunk-{year[0]}"
                    style="width:{match.chunkWidth}px">
                        <div class="books">
                            {#each year[1] as book, i}
                                <Book book={book} index={i} wallH={wallH} />
                            {/each}
                        </div>
                    </div>
                    <div class="shelves">
                        {#each shelves as shelf, i} 
                            <Shelf shelfW={match.chunkWidth} wallH={wallH} />
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>

<style>
    .overflow-wrap {
        display: flex;
        flex-direction: row;
        padding: 0 5rem;
        transition: 1s ease-in-out;
    }
    .wall {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        height: 100vh;
        z-index: 1;
        position: relative;
        transition: 1s ease-in-out;
        overflow-x: hidden;
        width: 100%;
    }
    .year-wrapper {
        height: 70vh;
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
        z-index: 999;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        transform:translate3d(0,0,0);
        -webkit-transform:translate3d(0,0,0);
    }
</style>