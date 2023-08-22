<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { fade, fly } from 'svelte/transition';
    import { activeSection, stepData } from "$stores/misc.js";

    export let data;
    export let color;
    export let highlightColor;
    export let pos;
    export let yearTotals;
    let w;
    let barChartW;

    function checkData(data, year) {
        if (pos !== "overlay") {
            return true
        } else {
            if (data[1] !== undefined && data[1].highlightYears.includes(year)) {
                return true;
            } else {
                return false;
            }
        }
    }

    function calcPercentage(year, groupLen) {
        let yearMatch = yearTotals.find(d => d[0] == year);
        let yearTotLen = yearMatch[1].length;
        let percent = groupLen/yearTotLen*100;
        return percent
    }

    $: groupedData = d3.groups(data, d => d.year);
</script>

<svelte:window bind:innerWidth={w} />

    {#if pos == "overlay"}
        <p class="label left" style="color: {data[0]}">2011</p>
    {/if}
    <div class="chart-wrapper" bind:clientWidth={barChartW}>
        {#if groupedData !== undefined}
            {#each groupedData as year, i}
                <div class={checkData($stepData, year[0]) ? "year-bar active" : "year-bar"} 
                id="bar-{year[0]}"
                style="height: {calcPercentage(year[0], year[1].length)*1.5}px;
                width: {barChartW/groupedData.length}px;
                background: {checkData($stepData, year[0]) ? highlightColor : color}"
                >
                    {#if pos == "overlay"}
                        <p class="count"
                        in:fly={{ y: 20, duration: 500 }} out:fade>
                            {Math.round(calcPercentage(year[0], year[1].length))}%
                        </p>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
    {#if pos == "overlay"}
        <p class="label right" style="color: {data[0]}">2023</p>
    {/if}

<style>
    .chart-wrapper {
        display: flex;
        flex-direction: row; 
        align-items: end;
        height: 100%;
        width: 60%;
        position: relative;
    }
    .year-bar {
        width: 5rem;
        margin: 0 0.05rem;
        transition: 0.25s linear;
        position: relative;
    }
    .count {
        margin: 0;
        padding: 0;
        position: absolute;
        width: 100%;
        text-align: center;
        top: -1.5rem;
        transition: 0.25s linear;
        opacity: 0.125;
        font-family: var(--sans);
    }
    .year-bar.active .count {
        opacity: 1;
    }
    .label {
        margin: 0;
        padding: 0;
        display: flex;
        align-self: flex-end;
        font-family: "Canela";
        font-size: 36px;
        padding: 0;
        line-height: 1;
        transition: 0.25s linear;
    }
    .label.left {
        margin: 0 1rem 0 0;
    }
    .label.right {
        margin: 0 0 0 1rem;
    }
</style>
