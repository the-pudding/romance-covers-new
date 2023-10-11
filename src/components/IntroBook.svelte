<script>
    import { getContext } from "svelte";
	import { fit } from '@leveluptuts/svelte-fit';
	import { fade } from 'svelte/transition';

	export let bookMin;
	export let w;
	export let h;
	export let scrollY;
    
	const copy = getContext("copy");

	let bookH;
	let bookTranslate = 0;
	let frontRotate = 0;
	let pageOneText;
	let pageTwoText;

	function computePercentage(scrollY, w, h) {
		if (scrollY >= 2) {
			if (w < 600) { bookTranslate = scrollY/h*100 < 50 ? 100 : 0;
			} else { bookTranslate = 50; }
			frontRotate = 180;
		} else {
			bookTranslate = 0;
			frontRotate = 0;
		}
	}
	
	function setBookText() {
		if (copy !== undefined) {
			if (bookMin > 900) {
				pageOneText = copy.page1_900;
				pageTwoText = copy.page2_900;
			} else if (bookMin > 750) {
				pageOneText = copy.page1_750;
				pageTwoText = copy.page2_750;
			} else if (bookMin > 650) {
				pageOneText = copy.page1_650;
				pageTwoText = copy.page2_650;
			} else if (bookMin > 600) {
				pageOneText = copy.page1_600;
				pageTwoText = copy.page2_600;
			} else  {
				pageOneText = copy.page1_else;
				pageTwoText = copy.page2_else;
			} 
		}
	}

	$: scrollY, computePercentage(scrollY, w, h);
	$: w, computePercentage(scrollY, w, h);
	$: h, computePercentage(scrollY, w, h);
	$: bookMin, setBookText();
</script>

<section id="intro-book">
		<div id="book" style="transform:translate3d({bookTranslate}%,0,0);" bind:clientHeight={bookH} >
			<div class="main">
				<div class="book-front" style="transform:translate3d(0,0,25px) rotate3d(0,1,0,-{frontRotate}deg)">
					<div class="book-cover">
						<div class="img-wrapper">
							<img 
								srcset="/assets/images/Alice_cover_notype_600.jpg 600w, /assets/images/Alice_cover_notype_900.jpg 900w" 
								sizes="(max-width: 600px) 600px, 900px"
								src="/assets/images/Alice_cover_notype_900.jpg"
								alt="An illustrated book cover of an Asian woman with one hand on her hip and the other on her chin in a curious pose. There are colorful books flying around her on a blue background."
							/>
						</div>
						<div class="gradient-wrapper"></div>
						<div class="title-wrapper" style={"width: 100%; height: 80%;"}>
							<h1 in:fade={{ delay: 0 }} use:fit={{min_size: 12, max_size:72 }}>{@html copy.titleBreaks}</h1>
						</div>
						<p in:fade={{ delay: 0 }} class="byline"><a href="https://pudding.cool/author/alice">Alice Liang</a></p>
					</div>
					<div class="book-cover-back">
						<div class="book-cover-back-indent">
							{#if pageOneText !== undefined}
								{#if Array.isArray(pageOneText)}
								{#each pageOneText as text, i}
									<p>{@html text.value}</p>
								{/each}
								{:else}
									<p>{@html pageOneText}</p>
								{/if}
							{/if}
						</div>
					</div>
				</div>
				<div class="book-page">
					<div id="page-1" class="page">
						{#if pageTwoText !== undefined}
							{#if Array.isArray(pageTwoText)}
							{#each pageTwoText as text, i}
								<p>{@html text.value}</p>
							{/each}
							{:else}
								<p>{@html pageTwoText}</p>
							{/if}
						{/if}
					</div>
				</div>
				<div class="book-back"></div>
				<div class="book-bone"></div>
			</div>
		</div>
	<p class="credit">With <a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a> • Cover design by <a href="http://www.sandrachiu.com/">Sandra Chiu</a></p>
</section>

<style>
    #intro-book {
		position: sticky;
		top: 0rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 0 0 0;
    }
	.credit {
        font-size: var(--12px);
        color: var(--color-gray-800);
        font-family: var(--sans-display);
		text-align: center;
		margin: -1rem 1rem 0 1rem;
		z-index: 1000;
    }
    .credit a {
        color: var(--color-gray-800);
		background-position: 0 0.9rem;
    }
	.credit a:hover {
		background-position: 0 0;
    }
	#book {
		margin: 0 auto;
		position: relative;
		perspective: 2000px;
		transform:translate3d(0,0,0);	
		padding: 1rem;
		max-width: 600px;
		max-height: 740px;
		min-width: 200px;
		min-height: 400px;
		transition: all 0.5s;
		aspect-ratio: 1 / 1.475;
		height: 80vmin;
	}
	.main {
		width: 100%;
        height: 100%;
		color: var(--color-off-black);
		position: relative;
		padding: 32% 0 0 0;
		transform-style: preserve-3d;
		transition-duration: .5s;
		aspect-ratio: 1/1.475;
	}

/* = Book Font
-------------------------------------------------------------- */
	.book-front{
		width: 100%;
        height: calc(100% - 1rem);
		position:absolute; top:0; bottom:0;
		font-size:15px; text-align:center;
		box-shadow:inset 3px 0 10px rgba(0,0,0,0.1); /* 给书本添加光照阴影 */
		z-index:10;
		transform-style:preserve-3d;
		transform-origin:0% 50%;
		transition-duration:.5s;
		transform:translate3d(0,0,25px);
	}
	.book-cover{
		width: 100%;
        height: 100%;
		overflow:hidden;
		position:absolute; top:0; bottom:0;
		background-color: var(--romance-blue);
        background-size: cover;
        background-repeat: no-repeat;
		transform-style:preserve-3d;
		backface-visibility:hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.125), inset -1px 1px 2px rgba(255, 255, 255, 0.5);
	}
	.img-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.img-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.gradient-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right, 
			rgba(60, 13, 20, 0.25) 1px, 
            rgba(255, 255, 255, 0.5) 3px, 
            rgba(255, 255, 255, 0.25) 7px, 
            rgba(255, 255, 255, 0.25) 10px, 
            transparent 12px,
            transparent 16px, 
            rgba(255, 255, 255, 0.25) 17px,
            transparent 22px);
            /* url("/assets/images/Alice_cover_notype.jpg"); */
	}
	.title-wrapper {
		position: absolute;
		width: 100%;
		height: 60%;
	}
	.book-cover h1 {
		font-family: var(--sans-display);
		font-weight: 900;
		font-style: normal;
		text-transform: uppercase;
		color: #F8DC3F;
		font-size: var(--24px);
		line-height: 2;
		margin: 0 auto 0 auto;
		padding: 0 0 5rem 0;
		text-align: center;
		width: 100%;
		text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
		max-height: 60%;
		white-space: nowrap;
		/* transition: all 0.5s; */
	}
	.book-cover .byline {
		font-family: var(--serif-display);
		position: absolute;
		bottom: 0.5rem;
		/* font-weight: 900; */
		font-style: normal;
		text-align: center;
		width: 100%;
		font-size: var(--24px);
		color: #F8DC3F;
		margin: 0;
	}
	.byline a {
		color: #F8DC3F;
		background-image: none !important;
	}
	.byline a:hover {
		color: var(--romance-yellow-light);
	}
	.book-cover-back{
		width: 100%;
        height: 100%;
		position:absolute; top:0; bottom:0;
		background:#4C7DFE;
		transform-style:preserve-3d;
		backface-visibility:hidden;
		transform:rotate3d(0,1,0,-180deg);
		box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.125);
	}
	.book-cover-back-indent {
		width: calc(100% - 1rem);
		height: calc(100% - 2rem);
		background: white;
		margin-top: 1rem;
		margin-left: 1rem;
		box-shadow: inset -3px 0 10px rgba(0,0,0,0.1);
		padding: 2rem 1rem;
	}

	.book-cover-back-indent p{
		font-family: var(--serif);
		font-weight: 500;
		font-size: var(--16px);
		line-height: 1.65;
		margin: 0 0 1rem 0;
		text-align: left;
		padding: 0 0 1rem 0;
	}

	:global(.initial-cap) {
		float: left;
		font-family: var(--serif-display);
		font-weight: 600;
		font-size: 50px;
		line-height: 0.8;
		margin: 0.25rem 0 0 0;
		padding: 0 0.25rem 0 0;
		position: relative;
		z-index: 1000;
	}

/* = Book Page
-------------------------------------------------------------- */
	.book-page{
		width: calc(100% - 1rem);
        height: calc(100% - 3rem);
		line-height:20px;
		position:absolute;
		top: 1rem;
		z-index:9;
		box-shadow:inset 3px 0 10px rgba(0,0,0,0.1);
		transform-style:preserve-3d;
        transition-duration:.5s;
		transform-style:preserve-3d;
		transform:translate3d(0,0,24px);
	}
	.page{
        height: 100%;
		padding: 2rem 2rem;
		overflow:hidden;
	}
	.book-page p{
		font-size: var(--16px);
		line-height: 1.65;
		margin: 0 0 1rem 0;
		padding: 0 0 1rem 0;
		font-family: var(--serif);
	}

/* = Book Back
-------------------------------------------------------------- */
    .book-back{
		width:100%;
		height: calc(100% - 1rem);
		background:#4C7DFE;
		position:absolute; 
        top:0; 
        bottom:0;
		transform:rotate3d(0,1,0,-180deg) translate3d(0,0,25px);
		z-index:8;
		box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.125)
	}

/* = Book Bone
-------------------------------------------------------------- */
	.book-bone{
		width:50px;
		background:#4C7DFE;
		box-shadow:1px 0 0 #4C7DFE,-1px 0 0 #4C7DFE; /* 旋转的时候 拼接处隐隐约约会有个缝隙 所以加上个阴影来填补它 */
		position:absolute;
		top:0; bottom:16px; left:-25px;
		transform:rotate3d(0,1,0,-90deg);
	}
	
	.book-page {
		background:var(--color-white);
	}

	/* MEDIA QUERIES */
	@media only screen and (min-width: 400px) and (min-height: 600px) {
		.book-cover h1 {
			font-size: var(--24px);
		}
		.book-cover .byline {
			font-size: var(--24px);
		}
	}
	@media only screen and (min-width: 600px) and (min-height: 800px) {
		.book-cover h1 {
			font-size: var(--40px);
		}
		.book-cover .byline {
			font-size: var(--40px);
			bottom: 1rem;
		}
		.book-cover-back-indent, .page {
			padding: 2rem;
		}
		.book-cover-back-indent p, #page-1 p {
			font-size: var(--16px);
		}
		:global(.initial-cap) {
			font-size: 60px;
			line-height: 0.8;
		}
	}
	@media only screen and (min-width: 800px) and (min-height: 1000px) {
		.book-cover h1 {
			font-size: var(--56px);
			margin: 0 auto;
		}
		.book-cover .byline {
			font-size: var(--44px);
			bottom: 1rem;
		}
	}
	@media only screen and (min-width: 1000px) and (min-height: 1200px) {
		.book-cover h1 {
			font-size: var(--64px);
			margin: -1rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--44px);
		}
	}
</style>