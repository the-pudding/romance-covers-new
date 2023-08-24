<script>
    import { readingList, readingListVisible, activeSection } from "$stores/misc.js";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Icon from "$components/helpers/Icon.svelte";
    import Bookmark from "$components/Bookmark.svelte";
    import * as d3 from "d3";
    export let data;
    export let pos;

    let displayList = $readingList;

    function findBookMatch(id, type) {
        let match = data.find(d => d.ISBN == id);

        if (type == "title") { return match.title }
        else if (type == "img") { return match.ISBN }
        else if (type == "author") { return match.author }
    }

    function handleBtnClick(e) {
        let btn = d3.select(this);

        let bookID = e.target.parentNode.id;
        if (bookID == "") { bookID = e.target.parentNode.parentNode.id; }
        
        const indexOfObject = $readingList.findIndex(object => { return object.id == bookID })
        $readingList.splice(indexOfObject, 1)
        $readingList = $readingList
        
        let allBookButtons = d3.selectAll(`#book_${bookID} button`);
        allBookButtons.classed("book_inList", false);
        allBookButtons.classed("book_noList", true); 

    }
    function handleClickOut(e) {
        if (e.target.parentNode.id == "reading-list") {
            $readingListVisible = false;
        }
    }
    function clearList(e) {
        $readingList = [];
        let allBookButtons = d3.selectAll(`.book button`);
        allBookButtons.classed("book_inList", false);

        setTimeout(() => {
            $readingListVisible = false;
        }, 500);
    }
</script>

{#if pos == "overlay"}
<section id="reading-list">
    {#if $readingListVisible && pos == "overlay"}
        <div class="paper"
            in:fly={{ y: 200, duration: 1000}}
            out:fly={{ y: 200, duration: 1000}}>
            <h3>Your Reading List</h3>
            {#if $readingList.length > 0}
                <button class="clear-list"
                on:click={clearList}>Clear list</button>
                <ul>
                    {#each $readingList as book, i (book.id)}
                        <div animate:flip={{duration:1000, delay:0}}> 
                            {#if book.id !== undefined && $readingList.find(d => d.id == book.id) !== undefined}  
                                <li id="{findBookMatch(book.id, "img")}" >    
                                    <img src ="assets/images/img_{findBookMatch(book.id, "img")}.jpg" alt="a thumbnail book cover of {findBookMatch(book.id, "title")}">
                                    <div class="details">
                                        <p class="title">{findBookMatch(book.id, "title")}</p>
                                        <p class="author">By {findBookMatch(book.id, "author")}</p>
                                        <span class="list-link library"><a href="https://www.worldcat.org/search?q=bn%3A{book.id}" target="_blank">Check out from your library</a></span>
                                        <span class="list-link bookshop"><a href="https://bookshop.org/book/{book.id}" target="_blank">Buy from Bookshop</a></span>
                                    </div>
                                    <button class="remove"
                                        on:click={handleBtnClick}>
                                        <Icon name="x" />
                                    </button>
                                </li> 
                            {/if}
                        </div>
                    {/each}
                </ul>
            {:else}
                <Bookmark />
            {/if}
        </div>
    {/if}
    {#if $readingListVisible && pos == "overlay"}
        <div class="bg" in:fade={{ delay: 300 }} out:fade={{ delay: 300 }}
        on:click={handleClickOut}></div>
    {/if}
</section>
{:else if pos == "inline"}
<section id="reading-list-inline">
    <div class="paper"
        in:fly={{ y: 2000, duration: 1000 }}
        out:fly={{ y: 2000, duration: 1000 }}>
        <h3>Your Reading List</h3>
        {#if $readingList.length > 0}
            <ul>
                {#each $readingList as book, i (book.id)}
                    <div animate:flip={{duration:1000, delay:0}}> 
                        {#if book.id !== undefined && $readingList.find(d => d.id == book.id) !== undefined}  
                            <li id="{findBookMatch(book.id, "img")}" >    
                                <img src ="assets/images/img_{findBookMatch(book.id, "img")}.jpg" alt="a thumbnail book cover of {findBookMatch(book.id, "title")}">
                                <div class="details">
                                    <p class="title">{findBookMatch(book.id, "title")}</p>
                                    <p class="author">By {findBookMatch(book.id, "author")}</p>
                                    <span class="list-link library"><a href="https://www.worldcat.org/search?q=bn%3A{book.id}" target="_blank">Check out from your library</a></span>
                                    <span class="list-link bookshop"><a href="https://bookshop.org/book/{book.id}" target="_blank">Buy from Bookshop</a></span>
                                </div>
                                <button class="remove"
                                    on:click={handleBtnClick}>
                                    <Icon name="x" />
                                </button>
                            </li> 
                        {/if}
                    </div>
                {/each}
            </ul>
        {:else}
            <p>Click on the + signs next to each book to add them to your list</p>
        {/if}
    </div>
</section>
{/if}

<style>
    #reading-list {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        /* background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(2px); */
        z-index: 999;
        pointer-events: none;
    }
    #reading-list-inline {
        position: relative;
    }
    .bg {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(2px);
        z-index: 999;
        pointer-events: auto;
    }
    .paper {
        background: white;
        max-width: 50rem;
        transform: translateX(-50%);
        width: 100%;
        height: 80vh;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        bottom: 0;
        box-shadow: -0.25rem 0 1rem  var(--color-gray-100);
        padding: 2rem;
        z-index: 1000;
        overflow-y: scroll;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #reading-list-inline .paper {
        position: relative;
        margin: 0 auto;
        transform: translate(0,0);
        left: 0;
        height: auto;
        z-index: 997;
    }
    h3 {
        font-family: 'Canela';
        text-align: center;
        font-size: var(--36px);
    }
    .clear-list {
        margin: 0 auto;
        background: transparent;
        color: var(--color-gray-500);
    }
    ul {
        margin-top: 5rem;
        width: 100%;
    }
    li {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--color-gray-100);
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
    }
    .details {
        width: calc(100% - 10rem);
    }
    .title {
        font-family: 'Canela';
        font-size: var(--24px);
        padding: 0;
        margin: 0;
    }
    .author {
        font-family: var(--sans);
        padding: 0 0 .25rem;
        margin: 0;
    }
    li img {
        width: 3.5rem;
        object-fit: contain;
        margin-right: 2rem;
    }
    li button {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        color: var(--romance-pink);
        pointer-events: auto;
        background-color: transparent;
    }
    :global(li button svg) {
        pointer-events: none;
        margin-top: 0.2rem;
    }
    :global(li button svg line) {
        stroke: white;
    }
    .list-link {
        text-transform: uppercase;
        font-variant: small-caps;
        text-transform: lowercase;
        font-size: var(--16px);
        font-family: var(--sans);
    }
    .list-link a {
        color: var(--color-gray-500);
    }
    .library a {
        margin-right: 1rem;
        color: var(--color-gray-500);
    }

</style>