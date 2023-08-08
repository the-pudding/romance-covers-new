<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { fade, fly } from 'svelte/transition';
    import { activeSection, stepData } from "$stores/misc.js";

    export let data;
    export let color;
    export let highlightColor;
    let w;
    let barChartW;

    function checkData(data, year) {
        if (data[1] !== undefined && data[1].highlightYears.includes(year)) {
            return true;
        } else {
            return false;
        }
    }

    $: groupedData = d3.groups(data, d => d.year);
</script>

<svelte:window bind:innerWidth={w} />

{#if $activeSection !== "intro"}
<section id="barChart" in:fly={{ y: 200, duration: 2000 }}>
    <p class="label left" style="color: {data[0]}">2011</p>
    <div class="chart-wrapper" bind:clientWidth={barChartW}>
        {#if groupedData !== undefined}
            {#each groupedData as year, i}
                <div class={checkData($stepData, year[0]) ? "year-bar active" : "year-bar"} 
                id="bar-{year[0]}"
                style="height: {year[1].length*1.5}px;
                width: {barChartW/groupedData.length}px;
                background: {checkData($stepData, year[0]) ? highlightColor : color}"
                >
                    <p class="count"
                    in:fly={{ y: 20, duration: 500 }} out:fade>
                        {year[1].length}
                    </p>
                </div>
            {/each}
        {/if}
    </div>
    <p class="label right" style="color: {data[0]}">2023</p>
</section>
{/if}

<style>
    #barChart {
        position: fixed;
        width: 100%;
        height: 10rem;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        z-index: 999;
    }
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
