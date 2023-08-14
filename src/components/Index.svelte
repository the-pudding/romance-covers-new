<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import ChapterMarker from "$components/ChapterMarker.svelte";
	import Chapter from "$components/Chapter.svelte";
	import BarChart from "$components/BarChart.svelte";
	import IntroScrolly from "$components/IntroScrolly.svelte";
	import ReadingList from "$components/ReadingList.svelte";
	import Outro from "$components/Outro.svelte";
	import { activeSection, readingListVisible } from "$stores/misc.js";
	import Footer from "$components/Footer.svelte";
	import { fade, fly } from 'svelte/transition';

	const copy = getContext("copy");
	// const data = getContext("data");
	let scrollY = 0;
	let containerElement;
	let w;
	let body;

	import data from "$data/listings.csv";
    import * as d3 from "d3";

	let raunchinessData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Man partially unclothed"] == "true" || d["Woman partially unclothed"] == "true").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
	let illustrationData = data.filter(d => d.cover_url.includes("http")).filter(d => d.Style == "Illustrated").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
	let raceData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Has POC"] == "true").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
	let barData = raunchinessData;
	let barColorHighlight = "#4C7DFE";
	let barColor = "#7da1fa"
	
	onMount(() => {
		body = d3.select("body")
		setScroll($readingListVisible)
	})

	function setScroll(readingListVisible) {
		if (body) {
			if (readingListVisible == false) {
				body.style("overflow-y", "auto")
			} else {
				body.style("overflow-y", "hidden")
			}
		}
	}

	function swapBarData(activeSection) {
		if (activeSection == "raunchiness") {
			barData = raunchinessData;
			barColor = "#a3bcfb";
			barColorHighlight = "#4C7DFE";
		} else if (activeSection == "illustration") {
			barData = illustrationData;
			barColor = "#f9dd8b";
			barColorHighlight = "#F7C42D";
		} else if (activeSection == "race") {
			barData = raceData;
			barColor = "#8de0ef";
			barColorHighlight = "#01AFCC";
		}
	}
	$: activeSection, swapBarData($activeSection)
	$: readingListVisible, setScroll($readingListVisible)
</script>

<svelte:window bind:scrollY={scrollY} />

<!-- <Header /> -->
<IntroScrolly />
<ChapterMarker />
<div class="sections">
	<Chapter id={"raunchiness"} data={raunchinessData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} pos={"overlay"} />
	<Chapter id={"illustration"} data={illustrationData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} pos={"overlay"} />
	<Chapter id={"race"} data={raceData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} pos={"overlay"} />
</div>
{#if $activeSection !== "intro" && $activeSection !== "outro" && $activeSection !== null}
	<section id="barChart" in:fly={{ y: 200, duration: 2000 }}>
		<BarChart data={barData} color={barColor} highlightColor={barColorHighlight} pos={"overlay"}/>
	</section>
{/if}
{#if $readingListVisible == true}
	<ReadingList data={data} pos={"overlay"}/>
{/if}
<Outro />
<Footer />

<style>
	.scrollContainer {
		width: 100%;
		position: fixed;
		height: 100vh;
	}
	.sections {
		margin-top: 5rem;
	}
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
</style>
