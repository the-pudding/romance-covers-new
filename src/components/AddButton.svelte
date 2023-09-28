<script>
    import { readingList } from "$stores/misc.js";
    import {select} from "d3-selection";

    let showMessage = false;

    function handleBtnClick(e) {
        const btn = select(this);
        const textFeedback = select(this.parentNode).select(".message");
        const readingListIcon = select(".listBtn");

        let bookID = e.target.parentNode.id;
            if (bookID == "") { bookID = e.target.parentNode.parentNode.id; }
            if (bookID.includes("chunk")) { bookID = e.target.parentNode.id; }
            bookID = bookID.split("_")[1];

        if ((this.className).includes("book_inList")) {
            btn.classed("book_inList", false);
            btn.classed("book_noList", true); 
            const indexOfObject = $readingList.findIndex(object => { return object.id == bookID })
            $readingList.splice(indexOfObject, 1)
            readingList.set($readingList);
            textFeedback.text("Book removed!")
            showMessage = true;
        } else {
            btn.classed("book_inList", true)
            btn.classed("book_noList", false); 
            readingList.set([...$readingList, { id: bookID }]);
            textFeedback.text("Book added!")
            showMessage = true;
        }  
        readingListIcon.classed("highlight", true)

        setTimeout(() => { showMessage = false; }, 3000);
    }
</script>

<button 
    on:click={handleBtnClick}
    class="add book_noList"
    aria-label="add or remove book from reading list">
</button>
<p class="message" class:visible={showMessage}>Book added!</p>

<style>
    .add {
        position: absolute;
        bottom: -0.75rem;
        right: 0rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
        pointer-events: auto;
        background-color: var(--color-gray-800);
        border: 2px solid white;
        box-shadow: 0.25rem 0 0.5rem  rgba(0,0,0,0.125);
        transition: 0.25s transform linear, 0.5s background-color linear;
        z-index: 1;
        pointer-events: auto;
        transform: translateZ(0px);
    }
    .add:hover {
        transform: translateZ(0px) scale(1.5);
        transform-style: preserve-3d;
        z-index: 5;
    }
    :global(.add.book_inList) {
        background-image: url($svg/x.svg);
        background-size: 0.75rem 0.75rem;
        background-repeat: no-repeat;
        background-position: center;
        background-color: var(--romance-pink-light);
        transition: 0.5s background-color linear;
    }
    :global(.add.book_noList) {
        background-image: url($svg/book-open.svg);
        background-size: 0.75rem 0.75rem;
        background-repeat: no-repeat;
        background-position: center;
    }
    .message {
        position: absolute;
        right: 0;
        font-size: var(--12px);
        font-weight: 900;
        width: 4.5rem;
        opacity: 0;
        bottom: 0;
        text-align: center;
        font-family: var(--sans-display);
        transform:translate3d(1.5rem,100%,0);
        transform-style: preserve-3d;
        transition: 0.125s all linear;
        background-color: white;
        border-radius: 0.25rem;
        padding: 0.25rem;
        box-shadow: 1rem 0 1rem  var(--color-gray-100);
        pointer-events: none;
        z-index: 1000;
    }
    .message.visible {
		opacity: 1;
        transform:translate3d(1.5rem,0,0);
        transform-style: preserve-3d;
        z-index: 1000;
	}
</style>