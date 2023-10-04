<script>
    import BarChart from "$components/BarChart.svelte";
    import data from "$data/listings.csv";
    import {ascending, groups} from "d3-array";

	const raunchinessData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Man partially unclothed"] == "TRUE" || d["Woman partially unclothed"] == "TRUE").sort((a, b) => ascending(a["Year Season"], b["Year Season"]));
	const illustrationData = data.filter(d => d.cover_url.includes("http")).filter(d => d.Style == "Illustrated").sort((a, b) => ascending(a["Year Season"], b["Year Season"]));
	const raceData = data.filter(d => d.cover_url.includes("http")).filter(d => d["Has POC"] == "TRUE").sort((a, b) => ascending(a["Year Season"], b["Year Season"]));
    const yearTotals = groups(data, d => d.year);
</script>

<div id="small-multiples">
    <div class="top-wrapper raunchiness">
        <h5>Raunchiness</h5>
        <BarChart data={raunchinessData} color={"#4C7DFE"} highlightColor={"#4C7DFE"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper illustration">
        <h5>Illustration</h5>
        <BarChart data={illustrationData} color={"#F7C42D"} highlightColor={"#F7C42D"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
    <div class="top-wrapper race">
        <h5>Racial Diversity</h5>
        <BarChart data={raceData} color={"#20b6b6"} highlightColor={"#20B6B6"} pos={"inline"} yearTotals={yearTotals}/>
        <div class="year-labels">
            <p>2011</p>
            <p>2023</p>
        </div>
    </div>
</div>

<style>
    #small-multiples {
        max-width: 50rem;
        margin: 0 auto 4rem auto;
        display: flex;
        flex-direction: column;
    }
    .top-wrapper {
        width: 100%;
        padding: 0 1rem;
        margin: 1rem 0;
    }
    :global(#small-multiples .chart-wrapper) {
        width: 100%;
    }
    :global(#small-multiples .count) {
        left: 50%;
        transform: translate(-50%, 0);
    }
    h5 {
        font-family: var(--sans-display);
        text-align: center;
        font-size: var(--16px);
        margin: 0 auto -1rem auto;
        line-height: 1;
        display: flex;
        align-items: end;
        justify-content: start;
        z-index: 1000;
    }
    .year-labels {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: var(--sans-display);
        font-size: var(--12px);
        padding: 0 0.5rem;
    }
    .year-labels p {
        padding: 0;
        margin: 0;
    }
    @media only screen and (min-width: 600px) {
        #small-multiples {
            flex-direction: row;
        }
        .top-wrapper {
            width: 33%;
            margin: 0;
        }
        h5 {
            justify-content: center;
        }
        .year-labels p {
            font-size: var(--14px);
        }
        :global(#small-multiples .count) {
            /* text-shadow: 1px 1px 0 var(--romance-bg-pink), -1px -1px 0 var(--romance-bg-pink), 1px -1px 0 var(--romance-bg-pink), -1px 1px 0 var(--romance-bg-pink); */
            left: 0;
            transform: translate(-30%, 0);
        }
	}
</style>