<script>
    import { groups } from "d3-array";
    import { select } from "d3-selection";
    import { activeSection, maxWidthRaunch, maxWidthIllo, maxWidthRace, sliderStoreRaunch, sliderStoreIllo, sliderStoreRace, xShiftRaunch, xShiftIllo, xShiftRace } from "$stores/misc.js";
    import Book from "$components/Wall.Book.svelte";
    import Shelf from "$components/Wall.Shelf.svelte";

    export let data;
    export let value;
    export let section;
    export let copy;

    const margins = 32;
    const yearGroups = groups(data, d => d.year);

    let bookWidth;
    let bookRows = 3;
    let shelves = [0, 1, 2];
    let h;
    let w;
    let wallH;
    let chunkWidths = [];
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
                // sliderStore.set(0)
            }
            else if (copy[value] !== 0 && select(`#${section} #book_${copy[value].scrollToId}`).node() !== null) {
                let sel = select(`#${section} #book_${copy[value].scrollToId}`).node().getBoundingClientRect().x;
                if ($activeSection == "raunchiness") { 
                    let val = $xShiftRaunch + sel - margins;
                    xShiftRaunch.set(val);  
                } else if ($activeSection == "illustration") { 
                    let val = $xShiftIllo + sel - margins;
                    xShiftIllo.set(val); 
                } else if ($activeSection == "race") { 
                    let val = $xShiftRace + sel - margins;
                    xShiftRace.set(val);  
                }

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
            if (value == copy.length - 1 && select(`#${$activeSection} .overflow-wrap`).node() !== null) { 
                if ($activeSection == "raunchiness") { 
                    let val = $xShiftRaunch
                    maxWidthRaunch.set(val); 
                } else if ($activeSection == "illustration") { 
                    let val = $xShiftIllo
                    maxWidthIllo.set(val);
                } else if ($activeSection == "race") { 
                    let val = $xShiftRace
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
                let year = d[0];
                let chunkLength = d[1].length;
                let remainder = chunkLength % bookRows;
                let bookCols = setBookCols(remainder, chunkLength, bookRows)
                let chunkWidth = bookCols == 0 ? bookWidth + 8 : (bookCols * (bookWidth)) + 8;
                chunkWidths.push({year: year, chunkWidth: chunkWidth});
            });
        }

        function setBookCols(remainder, chunkLength, bookRows) {
            if (remainder == 1) {
                return Math.round((chunkLength)/bookRows) + 1
            } else {
                return Math.round((chunkLength)/bookRows)
            }

        }
    }
    
    function shiftSlider() {
        if (totalShelfWidth && $maxWidthRaunch !== undefined && $maxWidthIllo !== undefined && $maxWidthRace !== undefined) {
            if ($activeSection == "raunchiness") {
                let val = $sliderStoreRaunch*$maxWidthRaunch/100;
                xShiftRaunch.set(val)
            } else if ($activeSection == "illustration") {
                let val = $sliderStoreIllo*$maxWidthIllo/100;
                xShiftIllo.set(val)
            } if ($activeSection == "race") {
                let val = $sliderStoreRace*$maxWidthRace/100;
                xShiftRace.set(val)
            }
        }
    }

    function getBookRows(h) {
        if (h !== undefined) {
            bookRows = h > 900 ? 5 : 3;
            shelves = h > 900 ? [0, 1, 2, 3, 4] : [0, 1, 2];
        }
    }

    $: value, shiftX(value);
    $: h, getBookRows(h);
    $: w, getYearLengths(yearGroups, bookRows);
    $: wallH, getYearLengths(yearGroups, bookRows);
    $: chunkWidths, calcTotalWidth(chunkWidths);
    $: $sliderStoreRaunch, shiftSlider();
    $: $sliderStoreIllo, shiftSlider();
    $: $sliderStoreRace, shiftSlider();
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<section id="wall-{section}" class="wall">
    {#if $xShiftRaunch !== undefined && section == "raunchiness"}
        <div class="overflow-wrap" style="transform:translate3d(-{$xShiftRaunch}px,0,0)">
            {#each yearGroups as year, i}
                <div class="year-wrapper" bind:clientHeight={wallH}>
                    {#if wallH !== undefined && chunkWidths.length == 13}
                        {@const match = chunkWidths.find((d) => d.year == year[0])}
                        <div class="yearChunk" id="chunk-{year[0]}"
                        style="width:{match.chunkWidth}px">
                            <div class="books">
                                {#each year[1] as book, i}
                                    <Book book={book} index={i} wallH={wallH} bookRows={bookRows} />
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
    {:else if $xShiftIllo !== undefined && section == "illustration"}
        <div class="overflow-wrap" style="transform:translate3d(-{$xShiftIllo}px,0,0)">
            {#each yearGroups as year, i}
                <div class="year-wrapper" bind:clientHeight={wallH}>
                    {#if wallH !== undefined && chunkWidths.length == 13}
                        {@const match = chunkWidths.find((d) => d.year == year[0])}
                        <div class="yearChunk" id="chunk-{year[0]}"
                        style="width:{match.chunkWidth}px">
                            <div class="books">
                                {#each year[1] as book, i}
                                    <Book book={book} index={i} wallH={wallH} bookRows={bookRows} />
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
    {:else if $xShiftRace !== undefined && section == "race"}
        <div class="overflow-wrap" style="transform:translate3d(-{$xShiftRace}px,0,0)">
            {#each yearGroups as year, i}
                <div class="year-wrapper" bind:clientHeight={wallH}>
                    {#if wallH !== undefined && chunkWidths.length == 13}
                        {@const match = chunkWidths.find((d) => d.year == year[0])}
                        <div class="yearChunk" id="chunk-{year[0]}"
                        style="width:{match.chunkWidth}px">
                            <div class="books">
                                {#each year[1] as book, i}
                                    <Book book={book} index={i} wallH={wallH} bookRows={bookRows} />
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
