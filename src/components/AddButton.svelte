<script>
    import Icon from "$components/helpers/Icon.svelte";
    import { fly } from 'svelte/transition';
    import { readingList, highlightYear } from "$stores/misc.js";
    import * as d3 from "d3";
    import addbook from "$svg/addbook.svg";

    let showMessage = false;
    let showX = false;

    function handleBtnClick(e) {
        let btn = d3.select(this);
        let textFeedback = d3.select(this.parentNode).select(".message");
        let readingListIcon = d3.select(".listBtn");

        let bookID = e.target.parentNode.parentNode.id;
            if (bookID == "") {
                bookID = e.target.parentNode.parentNode.parentNode.id;
            }
            if (bookID.includes("chunk")) {
                bookID = e.target.parentNode.parentNode.id; 
            }
        bookID = bookID.split("_")[1];

        if ((this.className).includes("book_inList")) {
            btn.classed("book_inList", false);
            btn.classed("book_noList", true); 
            const indexOfObject = $readingList.findIndex(object => { return object.id == bookID })
            $readingList.splice(indexOfObject, 1)
            textFeedback.text("Book removed!")
            showMessage = true;
        } else {
            btn.classed("book_inList", true)
            btn.classed("book_noList", false); 
            $readingList = [...$readingList, { id: bookID }];
            textFeedback.text("Book added!")
            showMessage = true;
        }  
        readingListIcon.classed("highlight", true)

        showX = !showX;

        setTimeout(() => {
            showMessage = false;
            // readingListIcon.classed("highlight", false)
        }, 3000);
    }
</script>

<button 
    on:click={handleBtnClick}
    class="add book_noList">
    {#if showX}
        <Icon name="plus" size="0.75em"/>
    {:else}
        <Icon name="book-open" size="0.75em"/>
    {/if}
</button>
<p class="message" class:visible={showMessage}>Book added!</p>

<style>
    .add {
        position: absolute;
        bottom: -0.75rem;
        right: -0.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
        pointer-events: auto;
        background-color: var(--color-gray-900);
        border: 2px solid white;
        box-shadow: 0.25rem 0 1rem  var(--color-gray-300);
        transition: 0.25s transform linear, 0.5s background-color linear;
        z-index: 1000;
    }
    .add:hover {
        transform: scale(1.5);
    }
    .add:hover .message {
        transform: translate(-50%, -100%) scale(0.6);
    }
    .add:hover .message.visible {
        transform: translate(-50%, -165%) scale(0.65);
    }
    :global(.add.book_inList) {
        background-color: var(--romance-pink-light);
        transition: 0.5s background-color linear;
    }
    :global(.add svg) {
        margin-top: 0.25rem;
        pointer-events: none;
    }
    :global(.add.book_noList svg) {
        transform: rotate(0deg);
        pointer-events: none;
        /* background-color: var(--color-gray-900);
        transition: 0.25s rotate linear-out, 1s background-color 0.25s; */
    }
    :global(.add.book_inList svg) {
        transform: rotate(45deg);
        pointer-events: none;
        transition: 0.25s rotate linear;
    }
    :global(.add svg path) {
        stroke: white;
        pointer-events: none;
        pointer-events: none;
    }
    .message {
        position: absolute;
        font-size: var(--12px);
        font-weight: 700;
        opacity: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        font-family: var(--sans);
        transform: translate(50%, 50%);
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.25rem;
        box-shadow: 1rem 0 1rem  var(--color-gray-100);
        pointer-events: none;
    }
    .message.visible {
		opacity: 1;
		transform: translate(50%, 0%);
	}
</style>