<script>
    import AddButton from "$components/AddButton.svelte";
    import { stepData } from "$stores/misc.js";
    import * as d3 from "d3";

    export let book;
    export let index;
    export let bookAddable = true;
    export let wallH;

    let w;
    let h; 
    let bookActive;

    function checkData(data, id) {
        if (data[1] !== undefined) {
            return data[1].highlightBooks.includes(id);
        }
    }
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

{#if index == 0}
    <div class={checkData($stepData, book.ISBN) ? "book active" : "book"}
        id="book_{book.ISBN}"
        style="height: {Math.floor(wallH/5)}px; width: {Math.floor(wallH/5*0.66)}px"
    >   
        <div class='img-wrapper' style="height: {Math.floor(wallH/5-48)}px; width: {Math.floor((wallH/5-48)*0.66)}px;
            background-image: linear-gradient(to right, 
            rgba(60, 13, 20, 0.25) 1px, 
            rgba(255, 255, 255, 0.5) 3px, 
            rgba(255, 255, 255, 0.25) 7px, 
            rgba(255, 255, 255, 0.25) 10px, 
            transparent 12px,
            transparent 16px, 
            rgba(255, 255, 255, 0.25) 17px,
            transparent 22px),
            url(assets/images/img_{book.ISBN}.jpg)">
            <!-- <img src ="assets/images/img_{book.ISBN}.jpg" alt="a thumbnail book cover of {book.title}"> -->
        </div>
        <div class="marker">{book.year}</div>
        {#if bookAddable == true}
            <AddButton />
        {/if}
    </div>
{:else}
    <div class={checkData($stepData, book.ISBN) ? "book active" : "book"} 
        id="book_{book.ISBN}" 
        style="height: {Math.floor(wallH/5)}px; width: {Math.floor(wallH/5*0.66)}px"
    >
        <div class='img-wrapper' style="height: {Math.floor(wallH/5-48)}px; width: {Math.floor((wallH/5-48)*0.66)}px;
            background-image: linear-gradient(to right, 
            rgba(60, 13, 20, 0.25) 1px, 
            rgba(255, 255, 255, 0.5) 2px, 
            rgba(255, 255, 255, 0.25) 5px, 
            rgba(255, 255, 255, 0.25) 7px, 
            transparent 10px,
            transparent 12px, 
            rgba(255, 255, 255, 0.25) 14px,
            transparent 18px),
            url(assets/images/img_{book.ISBN}.jpg)">
            <!-- <img src ="assets/images/img_{book.ISBN}.jpg" alt="a thumbnail book cover of {book.title}"> -->
        </div>
        {#if bookAddable == true}
            <AddButton />
        {/if}
    </div>
{/if}

<style>
    .book {
        margin: 0;
        display: flex;
        align-items: end;
        position: relative;
        pointer-events: none;
        justify-content: center;
    }
    .img-wrapper {
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: -3px 3px 2px -2px  rgba(0, 0, 0, 0.125), inset -1px 1px 2px rgba(255, 255, 255, 0.5);
        transform: perspective(8rem) rotateX(2deg);
        transform-style: preserve-3d;
    }
    .book.active img {
        opacity: 1;
        filter: contrast(100%) brightness(100%) saturate(100%);
    }
    :global(#raunchiness .book.active img) {
        outline: 5px solid var(--romance-blue);
    }
    :global(#illustration .book.active img) {
        outline: 5px solid var(--romance-yellow);
    }
    :global(#race .book.active img) {
        outline: 5px solid var(--romance-teal);
    }
    .book .marker {
        position: absolute;
        padding: 0.25rem 0.5rem;
        text-align: center;
        width: 3.5rem;
        left: 50%;
        bottom: -2.5rem;
        font-family: var(--sans-display);
        font-size: var(--14px);
        z-index: 999;
        transform: translate(-50%, 0);
    }
    :global(#lookback .book .marker) {
        background: var(--romance-pink-light);
    }
    :global(#raunchiness .book .marker) {
        background: var(--romance-blue-light);
    }
    :global(#illustration .book .marker) {
        background: var(--romance-yellow-light);
    }
    :global(#race .book .marker) {
        background: var(--romance-teal-light);
    }
</style>