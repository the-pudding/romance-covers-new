<script>
    import { getContext, onMount } from "svelte";
    const copy = getContext("copy");
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    let w;
	let h;
	let y;
	let scrollPercent;
	let bookTranslate;
	let mainRotate;
	let frontTranslate;
	let frontRotate;
	let bookMax;
	export let value;

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function computePercentage(y) {
		if (y >= 2) {
			bookTranslate = w <= 600 ? 100 : 50;
			mainRotate = 0;
			frontRotate = 180;
		} else {
			bookTranslate = w <= 600 ? y/h*100 : y/h*50;
			mainRotate = y/h*10;
			frontRotate = y/h*180;
		}
	}

    $: open = y < 10 ? false : true;
	$: y, computePercentage(y);
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY={y}/>

<section id="intro-book">
	<div id="book" style="transform:translate3d({bookTranslate}%,0,0)" >
		<div class="main" style="transform:rotate3d(1,1,0,{mainRotate}deg)">
			<div class="book-front" style="transform:translate3d(0,0,25px) rotate3d(0,1,0,-{frontRotate}deg)">
				<div class="book-cover">
					<h1>What does a happily ever after look like?</h1>
					<p class="byline">Alice Liang</p>
				</div>
				<div class="book-cover-back">
					<div class="book-cover-back-indent">
						{#each copy.intro as text, i}
							<p>{@html text.value}</p>
						{/each}
					</div>
				</div>
			</div>
			<div class="book-page">
				<div id="page-1" class="page">
					{#each copy.postIntro as text, i}
						<p>{@html text.value}</p>
					{/each}
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
	<p class="credit">Cover design by <a href="http://www.sandrachiu.com/">Sandra Chiu</a></p>
</section>

<style>
    #intro-book {
		position: sticky;
		top: 0rem;
        width: 100%;
        height: auto;
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
    }
    .credit a {
        color: var(--color-gray-800)
    }
    .credit a:hover {
        color: var(--romance-pink)
    }
	#book {
		width: 15rem;
		height: 22.125rem;
		margin: 0 auto;
		position: relative;
		transition-duration: .5s;
		perspective: 2000px;
		transform:translate3d(0,0,0);	
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
        height: 100%;
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
		box-shadow: -15px 15px 20px -3px  rgba(0, 0, 0, 0.125), inset -1px 1px 2px rgba(255, 255, 255, 0.5);
	}
	.book-cover h1 {
		font-family: var(--sans-display);
		font-weight: 900;
		font-style: normal;
		text-transform: uppercase;
		color: #f7d92d;
		font-size: var(--36px);
		line-height: 2;
		margin: -0.25rem auto 0 auto;
		padding: 0;
		text-align: center;
		width: 95%;
		/* text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.125); */
	}
	.book-cover .byline {
		font-family: var(--serif-display);
		/* font-weight: 900; */
		font-style: normal;
		text-align: center;
		width: 95%;
		font-size: var(--24px);
		color: #f7d92d;
		margin: 1.5rem auto 0 auto;
		padding: 0 0 1.5rem 0;
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
		padding: 3rem 2rem;
	}

	.book-cover-back-indent p{
		font-size: var(--16px);
		line-height: 1.65;
		margin-bottom: 1rem;
		text-align: left;
		padding: 0 0 1rem 0;
	}

/* = Book Page
-------------------------------------------------------------- */
	.book-page{
		width: calc(100% - 1rem);
        height: calc(100% - 2rem);
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
	.book-page h3{
		font-size:14px;
		text-align:center;
		margin-bottom:14px;
	}
	.book-page p{
		font-size: var(--16px);
		line-height: 1.65;
		margin-bottom: 1rem;
		padding: 0 0 1rem 0;
	}
	.page-number{
		width:100%;
		font-size:13px;
		text-align:center;
		position:absolute;
		bottom:10px;
	}

/* = Book Back
-------------------------------------------------------------- */
    .book-back{
		width:100%;
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
		top:0; bottom:0; left:-25px;
		transform:rotate3d(0,1,0,-90deg);
	}
	.book-bone h2{
		width:530px;
		height:50px; line-height:50px; /* 对应关系-1 */
		font-size:14px; text-align:right;
		padding:0 15px;
		transform-origin:0 0;
		transform:rotate(90deg) translateY(-50px);
	}
	.book-bone span{ font-size:14px; padding-right:20px;}
	
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
	@media only screen and (min-width: 400px) {
		#book {
			width: 18rem;
			height: 26.55rem;
		}
		.book-cover h1 {
			font-size: var(--44px);
			margin: -0.25rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--28px);
			margin: 1.5rem auto 0 auto;
		}
	}
	@media only screen and (min-width: 600px) {
		#book {
			width: 20rem;
			height: 29.6rem;
		}
		.book-cover h1 {
			font-size: var(--44px);
			margin: -0.25rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--32px);
			margin: 4.25rem auto 0 auto;
		}
	}
	@media only screen and (min-width: 800px) {
		#book {
			width: 25rem;
			height: 36.9rem;
		}
		.book-cover h1 {
			font-size: var(--56px);
			margin: 0.5rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--36px);
			margin: 4.25rem auto 0 auto;
		}
	}
	@media only screen and (min-width: 1000px) {
		#book {
			width: 30rem;
			height: 44.25rem;
		}
		.book-cover h1 {
			font-size: var(--72px);
			margin: -0.5rem auto 0 auto;
		}
		.book-cover .byline {
			font-size: var(--44px);
			margin: 1rem auto 0 auto;
		}
	}
</style>