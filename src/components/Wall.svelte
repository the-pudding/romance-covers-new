<script>
    import { groups } from "d3-array";
    import { select } from "d3-selection";
    import { activeSection, maxWidthRaunch, maxWidthIllo, maxWidthRace, sliderVisible, sliderStoreRaunch, sliderStoreIllo, sliderStoreRace, xShiftRaunch, xShiftIllo, xShiftRace } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";
    // import { lazy, lazyAll } from "$utils/lazyLoad.js";

    export let data;
    export let value;
    export let section;
    export let copy;
    export let xShiftSection;

    const margins = 32;
    const yearGroups = groups(data, d => d.year);

    let bookWidth;
    let bookRows = 4;
    let shelves = [0, 1, 2];
    let h;
    let w;
    let wallH;
    let chunkWidths = [];
    let totalShelfWidth;
    let slideSpeed = 1.5;
    let imgsLoaded = false;

    function calcTotalWidth(chunks) {
        if (chunks.length == 13) {
            totalShelfWidth = chunks.reduce(function (a, b) {
                return {chunkWidth: a.chunkWidth + b.chunkWidth};
            })
        }
    }

    function shiftX(value) {
        if (copy[value] !== undefined) {
            if (value == 0) { 
                if ($activeSection == "raunchiness") { 
                    sliderStoreRaunch.set(0);
                    xShiftRaunch.set(0);  
                } else if ($activeSection == "illustration") { 
                    sliderStoreIllo.set(0);
                    xShiftIllo.set(0); 
                } else if ($activeSection == "race") { 
                    sliderStoreRace.set(0);
                    xShiftRace.set(0);  
                }
            }
            else if (copy[value] !== 0 && select(`#${section} #book_${copy[value].scrollToId}`).node() !== null) {
                const sel = select(`#${section} #book_${copy[value].scrollToId}`).node().getBoundingClientRect().x;
                if ($activeSection == "raunchiness") { 
                    const val = $xShiftRaunch + sel - margins;
                    slideSpeed = Math.max(Math.abs(sel)/750, 1.5);
                    xShiftRaunch.set(val);  
                } else if ($activeSection == "illustration") { 
                    const val = $xShiftIllo + sel - margins;
                    slideSpeed = Math.max(Math.abs(sel)/750, 1.5);
                    xShiftIllo.set(val); 
                } else if ($activeSection == "race") { 
                    const val = $xShiftRace + sel - margins;
                    slideSpeed = Math.max(Math.abs(sel)/750, 1.5);
                    xShiftRace.set(val);  
                }
            }
            if (value == copy.length - 1 && select(`#${$activeSection} .overflow-wrap`).node() !== null) { 
                if ($activeSection == "raunchiness") { 
                    const val = $xShiftRaunch
                    maxWidthRaunch.set(val); 
                } else if ($activeSection == "illustration") { 
                    const val = $xShiftIllo
                    maxWidthIllo.set(val);
                } else if ($activeSection == "race") { 
                    const val = $xShiftRace
                    maxWidthRace.set(val);
                }
            }
        }
    }

    function getYearLengths(data, bookRows) {
        chunkWidths = [];
        if (wallH !== undefined && bookRows !== undefined) {
            bookWidth = Math.floor(wallH/bookRows*0.66);
            data.forEach((d, i) => {
                const year = d[0];
                const chunkLength = d[1].length;
                const remainder = chunkLength % bookRows;
                const bookCols = setBookCols(remainder, chunkLength, bookRows)
                const chunkWidth = bookCols == 0 ? bookWidth + 8 : (bookCols * (bookWidth)) + 8;
                chunkWidths.push({year: year, chunkWidth: chunkWidth});
            });
        }

        function setBookCols(remainder, chunkLength, bookRows) {
            if (wallH > 550) {
                const val = remainder <= 2 && remainder !== 0 ? (Math.round((chunkLength)/bookRows) + 1) : Math.round((chunkLength)/bookRows);
                return val
            } else {
                const val = remainder <= 1 && remainder !== 0 ? (Math.round((chunkLength)/bookRows) + 1) : Math.round((chunkLength)/bookRows);
                return val
            }

        }
    }
    
    function shiftSlider() {
        if (totalShelfWidth && $maxWidthRaunch !== undefined && $maxWidthIllo !== undefined && $maxWidthRace !== undefined) {
            if ($activeSection == "raunchiness") {
                const val = $sliderStoreRaunch*$maxWidthRaunch/100;
                xShiftRaunch.set(val)
            } else if ($activeSection == "illustration") {
                const val = $sliderStoreIllo*$maxWidthIllo/100;
                xShiftIllo.set(val)
            } if ($activeSection == "race") {
                const val = $sliderStoreRace*$maxWidthRace/100;
                xShiftRace.set(val)
            }
        }
    }

    function getBookRows(wallH) {
        if (wallH !== undefined) {
            bookRows = wallH > 550 ? 5 : 4;
            shelves = wallH > 550 ? [0, 1, 2, 3, 4] : [0, 1, 2, 3];
        }
    }

    function loadImgs($activeSection, section) {
        imgsLoaded = $activeSection == section || $activeSection == "intro" ? true : false;
    }

    $: value, shiftX(value);
    $: wallH, getBookRows(wallH);
    $: w, getYearLengths(yearGroups, bookRows);
    $: wallH, getYearLengths(yearGroups, bookRows);
    $: chunkWidths, calcTotalWidth(chunkWidths);
    $: $sliderStoreRaunch, shiftSlider();
    $: $sliderStoreIllo, shiftSlider();
    $: $sliderStoreRace, shiftSlider();
    $: $activeSection, loadImgs($activeSection, section);
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />


<section id="wall-{section}" class="wall">
        <div class="overflow-wrap" style="transform:translate3d(-{xShiftSection}px,0,0); transition: {slideSpeed}s ease-in-out;">
            {#each yearGroups as year, i}
                <div class="year-wrapper" bind:clientHeight={wallH}>
                    {#if wallH !== undefined && chunkWidths.length == 13}
                        {@const match = chunkWidths.find((d) => d.year == year[0])}
                        <div class="yearChunk" id="chunk-{year[0]}"
                        style="width:{match.chunkWidth}px">
                            <div class="books">
                                {#each year[1] as book, i}
                                    <Book book={book} index={i} wallH={wallH} bookRows={bookRows} imgsLoaded={imgsLoaded} />
                                {/each}
                            </div>
                        </div>
                        <div class="shelves">
                            {#each shelves as shelf, i} 
                                <Shelf shelfW={match.chunkWidth} wallH={wallH} bookRows={bookRows} />
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
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
        transition: 1.5s ease-in-out;
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
        height: 62vh;
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
        height: 72vh;
        position: absolute;
        z-index: 999;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        transform:translate3d(0,0,0);
        -webkit-transform:translate3d(0,0,0);
    }
</style>
