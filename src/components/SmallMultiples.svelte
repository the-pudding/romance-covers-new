<script>
    import BarChart from "$components/BarChart.svelte";

    import data from "$data/listings.csv";
    import * as d3 from "d3";

    let sections = ["raunchiness", "illustration", "race"]

	let raunchinessData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Man partially unclothed"] == "TRUE" || d["Woman partially unclothed"] == "TRUE").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
	let illustrationData = data.filter(d => d.cover_url.includes("http")).filter(d => d.Style == "Illustrated").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
	let raceData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Has POC"] == "TRUE").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
    let yearTotals = d3.groups(data, d => d.year);
</script>

<div id="small-multiples">
    <div class="top-wrapper">
        <h5>Raunchiness</h5>
        <BarChart data={raunchinessData} color={"#7b9ef6"} highlightColor={"#4C7DFE"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper">
        <h5>Illustration</h5>
        <BarChart data={illustrationData} color={"#fad872"} highlightColor={"#F7C42D"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper">
        <h5>Racial Diversity</h5>
        <BarChart data={raceData} color={"#50dada"} highlightColor={"#20B6B6"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
</div>

<style>
    #small-multiples {
        max-width: 50rem;
        margin: 4rem auto;
        display: flex;
        flex-direction: row;
    }
    .top-wrapper {
        width: 33%;
        padding: 0 1rem;
    }
    :global(#small-multiples .chart-wrapper) {
        width: 100%;
    }
    h5 {
        font-family: "Canela";
        text-align: center;
        margin: 0 0 -1rem 0;
    }
    .year-labels {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: var(--sans-display);
        font-size: var(--14px);
    }
    .year-labels p {
        padding: 0;
        margin: 0;
    }
</style>