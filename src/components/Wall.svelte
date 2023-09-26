<script>
    import { groups } from "d3-array";
    import { select } from "d3-selection";
    import { activeSection, sliderVisible, sliderStore, xShift } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";

    export let data;
    export let value;
    export let section;
    export let copy;

    const shelves = [0, 1, 2, 3, 4];
    const margins = 32;
    const bookRows = 5;
    const yearGroups = groups(data, d => d.year);

    let bookWidth;
    let h;
    let w;
    let wallH;
    let chunkWidths = [];
    let maxWidth;
    let totalShelfWidth;

    function calcTotalWidth(chunks) {
        if (chunks.length == 13) {
            totalShelfWidth = chunks.reduce(function (a, b) {
                return {chunkWidth: a.chunkWidth + b.chunkWidth}; // returns object with property x
            })
        }
    }

    function shiftX(value) {
        if (copy[value] !== undefined) {
            if (value == 0) { xShift.set(0); }
            else if (copy[value] !== 0 && select(`#${section} #book_${copy[value].scrollToId}`).node() !== null) {
                let sel = select(`#${section} #book_${copy[value].scrollToId}`).node().getBoundingClientRect().x;
                let val = $xShift + sel - margins;
                xShift.set(val) 
                // let blur = selectAll(".year-wrapper");
                // if (Math.abs(sel - margins) > w/1.25) {
                //     blur.classed("blur", true);
                // }
                // setTimeout(() => {
                //     let val = $xShift + sel - margins;
                //     xShift.set(val) 
                // }, 500)
                // setTimeout(() => {
                //     blur.classed("blur", false)
                // }, 1500)
            }
            if (value == copy.length - 1 && select(`#${$activeSection} .overflow-wrap`).node() !== null) { maxWidth = $xShift; }
        }
    }

    function getYearLengths(data) {
        chunkWidths = [];
        if (wallH !== undefined) {
            bookWidth = Math.floor(wallH/5*0.66);
            data.forEach((d, i) => {
                let year = d[0];
                let chunkLength = d[1].length;
                let remainder = chunkLength % 5;
                let bookCols = setBookCols(remainder, chunkLength, bookRows)
                let chunkWidth = bookCols == 0 ? bookWidth + 8 : (bookCols * (bookWidth)) + 8;
                chunkWidths.push({year: year, chunkWidth: chunkWidth});
            });
        }

        function setBookCols(remainder, chunkLength, bookRows) {
            if (remainder == 1 || remainder == 2) {
                return Math.round((chunkLength)/bookRows) + 1
            } else {
                return Math.round((chunkLength)/bookRows)
            }

        }
    }
    
    function shiftSlider() {
        if ($sliderVisible && totalShelfWidth && maxWidth !== undefined) {
            let val = $sliderStore*maxWidth/100;
            xShift.set(val)
        }
    }

    $: value, shiftX(value);
    $: wallH, getYearLengths(yearGroups);
    $: w, getYearLengths(yearGroups);
    $: chunkWidths, calcTotalWidth(chunkWidths);
    $: $sliderStore, shiftSlider();
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<section id="wall-{section}" class="wall">
    {#if $xShift !== undefined}
        <div class="overflow-wrap" style="transform:translate3d(-{$xShift}px,0,0)">
            {#each yearGroups as year, i}
                <div class="year-wrapper" bind:clientHeight={wallH}>
                    {#if wallH !== undefined && chunkWidths.length == 13}
                        {@const match = chunkWidths.find((d) => d.year == year[0])}
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
    {/if}
</section>

<style>
    /* :global(.blur) {
        filter: blur(1px);
        transition: 1s ease-in-out;
    } */
    .overflow-wrap {
        display: flex;
        flex-direction: row;
        padding: 0 5rem;
        transition: 0.5s ease-in-out;
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
        margin: 0 5rem 0 0;
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