<script>
    import {groups} from "d3-array";
    import { fade, fly } from 'svelte/transition';
    import { stepData } from "$stores/misc.js";

    export let data;
    export let color;
    export let highlightColor;
    export let pos;
    export let yearTotals;

    let w;
    let barChartW;

    function checkData(data, year) {
        if (pos == "inline") { return false } 
        else if (pos !== "overlay") { return true } 
        else {
            if (data[1] !== undefined && data[1].highlightYears.includes(year)) { return true; } 
            else { return false; }
        }
    }

    function calcPercentage(year, groupLen, i) {
        const yearMatch = yearTotals.find(d => d[0] == year);
        const yearTotLen = yearMatch[1].length;
        const percent = Math.round(groupLen/yearTotLen*100);
        return percent
    }

    $: groupedData = groups(data, d => d.year);
</script>

<svelte:window bind:innerWidth={w} />

    {#if pos == "overlay"}
        <p class="label left" style="color: {data[0]}">2011</p>
    {/if}
    <div class="chart-wrapper chart-wrapper-{pos}" bind:clientWidth={barChartW}>
        {#if groupedData !== undefined}
            {#each groupedData as year, i}
                <div class={checkData($stepData, year[0]) ? "year-bar active" : "year-bar"} 
                id="bar-{year[0]}"
                style="height: {calcPercentage(year[0], year[1].length)*1.125}px;
                width: {barChartW/groupedData.length}px;
                background: {checkData($stepData, year[0]) ? highlightColor : color}"
                >
                    {#if pos == "overlay"}
                        <p class="count"
                        in:fly={{ y: 20, duration: 500 }} out:fade>
                            {calcPercentage(year[0], year[1].length, i)}%
                        </p>
                    {/if}
                    {#if pos == "inline" && i == 12 || pos == "inline" && i == 0}
                        <p class="count" style="opacity: 1">
                            {calcPercentage(year[0], year[1].length, i)}%
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
        -webkit-align-items: flex-end;
        height: 100%;
        width: 100%;
        padding: 0 1rem;
        position: relative;
        border-bottom: 1px solid var(--color-gray-800);
    }
    .chart-wrapper-inline {
        height: 9rem;
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
        top: -1rem;
        left: 50%;
        transition: 0.25s linear;
        opacity: 0.125;
        letter-spacing: -0.05rem;
        font-family: var(--sans-display);
        font-size: var(--12px);
        white-space: nowrap;
        z-index: 1000;
        transform: translate(-50%, 0);
    }
    .year-bar.active .count {
        opacity: 1;
    }
    .label {
        margin: 0;
        padding: 0;
        display: flex;
        align-self: flex-end;
        align-items: center;
        font-family: var(--sans-display);
        font-size: var(--14px);
        padding: 0;
        line-height: 1;
        transition: 0.25s linear;
        z-index: 1000;
        letter-spacing: -0.05rem;
    }
    .label.left {
        margin: 0 1rem 0 0;
        position: absolute;
        bottom: -1.5rem;
        left: 1rem;
    }
    .label.right {
        margin: 0 0 0 1rem;
        position: absolute;
        bottom: -1.5rem;
        right: 1rem;
    }
    :global(#barChart .label .icon) {
        margin: 0;
        opacity: 1;
        display: inline;
    }
    @media only screen and (min-width: 600px) {
        .count {
            font-size: var(--12px);
            top: -1rem;
        }
        .chart-wrapper {
            width: 60%;
            border-bottom: none;
        }
        .label {
            font-size: var(--36px);
            font-family: var(--serif-display);
            letter-spacing: 0;
        }
        .label.left {
            margin: 0 1rem 0 0;
            position: relative;
            top: 0;
            left: 0;
        }
        .label.right {
            margin: 0 0 0 1rem;
            position: relative;
            top: 0;
            right: 0;
        }
        :global(#barChart .label .icon) {
            display: none;
        }
	}
    @media only screen and (min-width: 800px) {
        .count {
            font-size: var(--14px);
            top: -1.25rem;
        }
	}
</style>
