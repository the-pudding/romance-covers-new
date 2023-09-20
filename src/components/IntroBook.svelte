<script>
    import { getContext } from "svelte";
	import { fit } from '@leveluptuts/svelte-fit'

	export let bookMin;
    
	const copy = getContext("copy");

	let y;
	let w;
	let h;
	let bookTranslate;
	let mainRotate;
	let frontRotate;
	let pageOneText;
	let pageTwoText;

	function computePercentage(y, w, h) {
		if (y >= 2) {
			bookTranslate = w < 600 ? 100 : 50;
			mainRotate = 0;
			frontRotate = 180;
		} else {
			bookTranslate = w >= 600 ? y/h*100 : y/h*50;
			mainRotate = y/h*10;
			frontRotate = y/h*180;
		}
	}
	
	function setBookText() {
		if (copy !== undefined) {
			if (bookMin > 1100) {
				pageOneText = copy.intro.slice(0,2);
				pageTwoText = copy.intro.slice(2,4);
			} else if (bookMin > 850) {
				pageOneText = copy.intro.slice(0,1);
				pageTwoText = copy.intro.slice(1,2);
			} else if (bookMin > 675) {
				pageOneText = copy.intro[0];
				pageOneText = pageOneText.value.split(/(My)/);
				let pageTwoText1 = pageOneText[1];
				let pageTwoText2 = pageOneText[2];
				pageOneText = pageOneText[0];
				pageTwoText = pageTwoText1.concat("", pageTwoText2)
			} else {
				pageOneText = copy.intro[0];
				pageOneText = pageOneText.value.split(/(My)/);
				pageOneText = pageOneText[0];
				pageTwoText = '';
			}
		}
	}

	$: y, computePercentage(y, w, h);
	$: w, computePercentage(y, w, h);
	$: h, computePercentage(y, w, h);
	$: bookMin, setBookText();
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY={y}/>

<section id="intro-book">
	{#if w !== undefined && h !== undefined}
		<div id="book" style="transform:translate3d({bookTranslate}%,0,0); height:{(bookMin-32)/1.5}px; width:{(bookMin-32)/1.5/1.475}px" >
			<div class="main" style="transform:rotate3d(1,1,0,{mainRotate}deg)">
				<div class="book-front" style="transform:translate3d(0,0,25px) rotate3d(0,1,0,-{frontRotate}deg)">
					<div class="book-cover" style={"width: 100%; height: 100%;"}>
						<h1 use:fit>{@html copy.titleBreaks}</h1>
						<p class="byline">Alice Liang</p>
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
				<div class="book-back">
				</div>
				<div class="book-bone">
					<!-- <h2>What Does A Happily Ever After Look Like?</h2> -->
				</div>
				<div class="book-top"></div>
				<div class="book-right"></div>
				<div class="book-bottom"></div>
			</div>
		</div>
	{/if}
	<p class="credit">Cover design by <a href="http://www.sandrachiu.com/">Sandra Chiu</a></p>
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
		transition-duration: .5s;
		perspective: 2000px;
		transform:translate3d(0,0,0);	
		padding: 1rem;
	}
	.main {
		width: 100%;
        height: 100%;
		color: var(--color-off-black);
		position: relative;
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
		background-image: linear-gradient(to right, 
			rgba(60, 13, 20, 0.25) 1px, 
            rgba(255, 255, 255, 0.5) 3px, 
            rgba(255, 255, 255, 0.25) 7px, 
            rgba(255, 255, 255, 0.25) 10px, 
            transparent 12px,
            transparent 16px, 
            rgba(255, 255, 255, 0.25) 17px,
            transparent 22px),
            url("/assets/images/Alice_cover_notype.jpg");
		/* background: url("/assets/images/Alice_cover_notype.jpg"); */
        background-size: contain;
        background-repeat: no-repeat;
		transform-style:preserve-3d;
		backface-visibility:hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
		box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.125), inset -1px 1px 2px rgba(255, 255, 255, 0.5);
	}
	.book-cover h1 {
		font-family: var(--sans-display);
		font-weight: 900;
		font-style: normal;
		text-transform: uppercase;
		color: #f7d92d;
		font-size: var(--24px);
		line-height: 2;
		margin: -0.5rem auto 0 auto;
		padding: 0 0 5rem 0;
		text-align: center;
		width: 100%;
		text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.125);
	}
	.book-cover .byline {
		font-family: var(--serif-display);
		position: absolute;
		bottom: 0.5rem;
		/* font-weight: 900; */
		font-style: normal;
		text-align: center;
		width: 100%;
		font-size: var(--18px);
		color: #f7d92d;
		margin: 0;
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
		font-size: var(--14px);
		line-height: 1.65;
		margin-bottom: 1rem;
		text-align: left;
		padding: 0 0 1rem 0;
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
		padding: 3rem 2rem;
		overflow:hidden;
	}
	.book-page p{
		font-size: var(--16px);
		line-height: 1.65;
		margin-bottom: 1rem;
		padding: 0 0 1rem 0;
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
	
	.book-page,.book-top,.book-right,.book-bottom{
		background:var(--color-white);
	}
	.book-right{
		width:50px; height:100%;
		position:absolute; top:5px; right:-20px;
		box-shadow:0 1px 0 var(--color-white),0 -1px 0 var(--color-white);
		transform:rotate3d(0,1,0,90deg);
	}
	.book-top{
		width:415px; height:50px;
		position:absolute; top:-20px; left:0;
		transform:rotate3d(1,0,0,90deg);
	}
	.book-bottom{
		width:415px; height:50px;
		position:absolute; bottom:-20px; left:0;
		transform: rotate3d(1,0,0,-90deg) translate3d(0,0,0);
	}
	.book-right,.book-top,.book-bottom{
		backface-visibility:hidden;
	}

	/* MEDIA QUERIES */
	@media only screen and (min-width: 400px) and (min-height: 200px) {
		.book-cover h1 {
			font-size: var(--24px);
		}
		.book-cover .byline {
			font-size: var(--18px);
		}
	}
	@media only screen and (min-width: 600px) and (min-height: 400px) {
		.book-cover h1 {
			font-size: var(--40px);
		}
		.book-cover .byline {
			font-size: var(--24px);
		}
		.book-cover-back-indent {
			padding: 3rem 2rem;
		}
		.book-cover-back-indent p {
			font-size: var(--16px);
		}
	}
	@media only screen and (min-width: 800px) and (min-height: 600px) {
		.book-cover {
			padding: 1rem;
		}
		.book-cover h1 {
			font-size: var(--56px);
			margin: -1.5rem 0 0 0;
		}
		.book-cover .byline {
			font-size: var(--36px);
			bottom: 1rem;
		}
	}
	@media only screen and (min-width: 1000px) and (min-height: 1000px) {
		.book-cover h1 {
			font-size: var(--56px);
			margin: -2rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--44px);
		}
	}
</style>