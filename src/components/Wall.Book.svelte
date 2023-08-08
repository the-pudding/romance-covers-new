<script>
    import AddButton from "$components/AddButton.svelte";
    import { readingList, highlightYear } from "$stores/misc.js";
    import * as d3 from "d3";

    export let book;
    export let index;

    let w;
    let h; 
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

{#if index == 0}
    <div class="book" id="book_{book.ISBN}" style="height:{h/8}px">
        <img src ="/assets/images/img_{book.ISBN}.jpg" alt="a thumbnail book cover of {book.title}">
        <AddButton />
        <!-- <div class="marker">{book.year}</div> -->
    </div>
{:else}
    <div class="book" id="book_{book.ISBN}" style="height:{h/8}px">
        <img src ="/assets/images/img_{book.ISBN}.jpg" alt="a thumbnail book cover of {book.title}">
        <AddButton />
    </div>
{/if}

<style>
    .book {
        width: 4rem;
        margin: 0 1rem;
        height: calc(100vh / 5);
        display: flex;
        align-items: end;
        position: relative;
    }
        /* .book:hover img {
        -webkit-transform:rotate3d(0,1,0,-30deg);
		-moz-transform:rotate3d(0,1,0,-30deg);
		-ms-transform:rotate3d(0,1,0,-30deg);
		-o-transform:rotate3d(0,1,0,-30deg);
		transform:rotate3d(0,1,0,-30deg);
    } */
    .book img {
        box-shadow: -0.25rem 0 1rem  var(--color-gray-100);
    }
    .book .marker {
        position: absolute;
        background: pink;
        font-family: var(--serif);
        padding: 0.25rem 0.5rem;
        text-align: center;
        width: 3.5rem;
        left: 0.25rem;
        bottom: -1rem;
    }
</style>