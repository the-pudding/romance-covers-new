<script>
    import { readingList, readingListVisible } from "$stores/misc.js";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Icon from "$components/helpers/Icon.svelte";
    import Bookmark from "$components/Bookmark.svelte";
    import {select, selectAll} from "d3-selection";
    export let data;
    export let pos;

    function findBookMatch(id, type) {
        let match = data.find(d => d.ISBN == id);

        if (type == "title") { return match.title }
        else if (type == "img") { return match.ISBN }
        else if (type == "author") { return match.author }
    }

    function handleBtnClick(e) {

        let bookID = e.target.parentNode.id;
        if (bookID == "") { bookID = e.target.parentNode.parentNode.id; }
        
        const indexOfObject = $readingList.findIndex(object => { return object.id == bookID })
        $readingList.splice(indexOfObject, 1)
        $readingList = $readingList
        
        let allBookButtons = selectAll(`#book_${bookID} button`);
        // console.log(allBookButtons)
        allBookButtons.classed("book_inList", false);
        allBookButtons.classed("book_noList", true); 

    }
    function handleClickOut(e) {
        if (e.target.parentNode.id == "reading-list-overlay") {
            $readingListVisible = false;
        }
    }
    function clearList(e) {
        $readingList = [];
        let allBookButtons = selectAll(`.book button`);
        allBookButtons.classed("book_noList", true);
        allBookButtons.classed("book_inList", false);

        setTimeout(() => {
            $readingListVisible = false;
        }, 500);
    }
    $: console.log($readingListVisible, pos)
</script>

{#if pos == "overlay"}
<section id="reading-list-{pos}">
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
                        <div class="flip-div" animate:flip={{duration:1000, delay:0}}> 
                            {#if book.id !== undefined && $readingList.find(d => d.id == book.id) !== undefined}  
                                <li id="{findBookMatch(book.id, "img")}" >    
                                    <img src ="assets/images/img_{findBookMatch(book.id, "img")}.jpg" alt="a thumbnail book cover of {findBookMatch(book.id, "title")}">
                                    <div class="details">
                                        <p class="title">{findBookMatch(book.id, "title")}</p>
                                        <p class="author">By {findBookMatch(book.id, "author")}</p>
                                        <div class="link-outs">
                                            <p class="list-link library">
                                                <span><Icon name="book" /></span>
                                                <a href="https://www.worldcat.org/search?q=bn%3A{book.id}">
                                                    Check out from your library
                                                </a>
                                            </p>
                                            <p class="list-link bookshop">
                                                <span><Icon name="shopping-bag" /></span>
                                                <a href="https://bookshop.org/book/{book.id}">
                                                    Buy from Bookshop
                                                </a>
                                            </p>
                                        </div>
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
            <button class="clear-list"
                on:click={clearList}>Clear list</button>
                <ul>
                    {#each $readingList as book, i (book.id)}
                        <div class="flip-div" animate:flip={{duration:1000, delay:0}}> 
                            {#if book.id !== undefined && $readingList.find(d => d.id == book.id) !== undefined}  
                                <li id="{findBookMatch(book.id, "img")}" >    
                                    <img src ="assets/images/img_{findBookMatch(book.id, "img")}.jpg" alt="a thumbnail book cover of {findBookMatch(book.id, "title")}">
                                    <div class="details">
                                        <p class="title">{findBookMatch(book.id, "title")}</p>
                                        <p class="author">By {findBookMatch(book.id, "author")}</p>
                                        <div class="link-outs">
                                            <p class="list-link library">
                                                <span><Icon name="book" /></span>
                                                <a href="https://www.worldcat.org/search?q=bn%3A{book.id}">
                                                    Check out from your library
                                                </a>
                                            </p>
                                            <p class="list-link bookshop">
                                                <span><Icon name="shopping-bag" /></span>
                                                <a href="https://bookshop.org/book/{book.id}">
                                                    Buy from Bookshop
                                                </a>
                                            </p>
                                        </div>
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
</section>
{/if}

<style>
    #reading-list-overlay {
        width: calc(100% - 2rem);
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        /* background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(2px); */
        z-index: 999;
        pointer-events: none;
        margin: 0 1rem;
    }
    #reading-list-inline {
        position: relative;
        margin: 4rem auto;
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
        max-height: 40rem;
        margin: 0 auto;
        transform: translate(0,0);
        left: 0;
        height: auto;
        z-index: 997;
        box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.05);
    }
    h3 {
        font-family: var(--serif-display);
        text-align: center;
        font-size: var(--36px);
    }
    .clear-list {
        margin: 0 auto;
        background: transparent;
        color: var(--color-gray-600);
        font-family: var(--sans-display);
        font-size: var(--14px);
    }
    .clear-list:hover {
        color: var(--color-gray-800);
    }
    ul {
        margin-top: 5rem;
        width: 100%;
    }
    li {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        justify-content: space-between;
        align-items: start;
    }
    .flip-div {
        border-bottom: 1px solid var(--color-gray-100);
    }
    .flip-div:last-of-type {
        border-bottom: none; 
    }
    .details {
        width: calc(100% - 10rem);
    }
    .title {
        font-family: var(--serif-display);
        font-size: var(--18px);
        padding: 0;
        margin: 0;
    }
    .author {
        font-family: var(--sans-display);
        font-size: var(--14px);
        padding: 0;
        margin: 0;
    }
    .link-outs {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    :global(.link-outs svg path) {
        stroke: var(--color-gray-500);
    }
    .link-outs span {
        position: relative;
        top: 0.125rem;
        margin: 0 0.25rem 0 0;
    }
    li img {
        width: 3.5rem;
        object-fit: contain;
        margin-right: 0rem;
    }
    li button {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        color: var(--color-gray-800);
        pointer-events: auto;
        background-color: var(--romance-bg-pink);
        transition: 0.25s all linear;
    }
    li button:hover {
        transform: scale(1.125);
        background-color: var(--romance-pink-light);;
    }
    :global(li button svg) {
        pointer-events: none;
        margin-top: 0.2rem;
    }
    :global(li button svg line) {
        stroke: white;
    }
    .list-link {
        font-size: var(--12px);
        font-family: var(--sans-display);
    }
    .list-link a, .library a {
        margin-right: 1rem;
        color: var(--color-gray-600);
        letter-spacing: -0.025rem;
    }
    .list-link a:hover, .library a:hover {
        color: var(--color-gray-800);
    }
    @media only screen and (min-width: 600px) {
        li {
            align-items: center;
        }
        .title {
            font-size: var(--28px);
        }
        .author {
            font-size: var(--14px);
        }
        li button {
            width: 3rem;
            height: 3rem;
        }
	}
</style>