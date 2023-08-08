<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import ChapterMarker from "$components/ChapterMarker.svelte";
	import Chapter from "$components/Chapter.svelte";
	import BarChart from "$components/BarChart.svelte";
	import IntroScrolly from "$components/IntroScrolly.svelte";
	import ReadingList from "$components/ReadingList.svelte";
	import { activeSection, readingListVisible, readingList } from "$stores/misc.js";
	// import Footer from "$components/Footer.svelte";

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
	let barColor = "#4C7DFE";
	
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
			barColor = "#4C7DFE";
		} else if (activeSection == "illustration") {
			barData = illustrationData;
			barColor = "#F7C42D";
		} else if (activeSection == "race") {
			barData = raceData;
			barColor = "#01AFCC";
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
	<Chapter id={"raunchiness"} data={raunchinessData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} />
	<Chapter id={"illustration"} data={illustrationData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} />
	<Chapter id={"race"} data={raceData} copyBlock={copy.lookBack} copyScroll={copy.raunchinessScroll} />
</div>
{#if $activeSection !== "intro"}
	<BarChart data={barData} color={barColor}/>
{/if}
{#if $readingListVisible == true}
	<ReadingList data={data}/>
{/if}

<style>
	.scrollContainer {
		width: 100%;
		position: fixed;
		height: 100vh;
	}

	.sections {
		margin-top: 5rem;
	}
</style>
