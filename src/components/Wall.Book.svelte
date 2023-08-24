<script>
    import AddButton from "$components/AddButton.svelte";
    import { stepData } from "$stores/misc.js";
    import * as d3 from "d3";

    export let book;
    export let index;
    export let bookAddable = true;

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
        style="height:{h/8}px"
    >   
        <div class='img-wrapper' style="height:{h/12}px; background-image: linear-gradient(to right, 
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
        style="height:{h/8}px"
    >
        <div class='img-wrapper' style="height:{h/12}px; background-image: linear-gradient(to right, 
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
        {#if bookAddable == true}
            <AddButton />
        {/if}
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
    .img-wrapper {
        background-size: cover;
        background-repeat: no-repeat;
        width: 4rem;
        height: calc(100vh / 5);
        box-shadow: -5px 5px 4px -3px  rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(255, 255, 255, 0.5);
        transform: perspective(8rem) rotateX(2deg);
        transform-style: preserve-3d;
    }
    .book img {
        box-shadow: -0.25rem 0 1rem  var(--color-gray-100);
        /* opacity: 0.5; */
        /* filter: contrast(20%) brightness(150%) saturate(25%); */
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
        font-family: var(--serif);
        padding: 0.25rem 0.5rem;
        text-align: center;
        width: 3.5rem;
        left: 0.25rem;
        bottom: -2.25rem;
        font-family: var(--sans);
        z-index: 999;
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