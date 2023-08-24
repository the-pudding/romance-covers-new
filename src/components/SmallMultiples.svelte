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
        <BarChart data={raunchinessData} color={"#7aaaf9"} highlightColor={"#2f76ec"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper">
        <h5>Illustration</h5>
        <BarChart data={illustrationData} color={"#fdeb74"} highlightColor={"#fcdf1f"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper">
        <h5>Race & Ethnicity</h5>
        <BarChart data={raceData} color={"#50dada"} highlightColor={"#25b3b4"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
</div>

<style>
    #small-multiples {
        max-width: 50rem;
        margin: 0 auto;
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
        margin: 0;
    }
    .year-labels {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: var(--sans);
    }
    .year-labels p {
        padding: 0;
        margin: 0;
    }
</style>