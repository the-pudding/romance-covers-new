<script>
    export let shelfW;
    export let shelfHasShadow = true;
    export let wallH;
    export let bookRows;

    let w;
    let h; 
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />

<div class="shelf" style="width:{shelfW}px; height:{Math.floor(wallH/bookRows)}px">
    <div class="shelf-front"></div>
    <div class="shelf-top"></div>
    <div class="shelf-right"></div>
    {#if shelfHasShadow == true}
        <div class="shelf-shadow"></div>
    {/if}
</div>

<style>
    .shelf {
        display: flex;
        align-items: end;
        position: relative;
        pointer-events: none;
        margin: 0;
        transform:translate3d(0,0,0);
        -webkit-transform:translate3d(0,0,0);
    }
    .shelf-front {
        background: #FBF7F7;
        width: 100%;
        height: 1rem;
        position: absolute;
        bottom: -1.5rem;
        z-index: 999;
        box-shadow: 0 19px 38px rgba(0,0,0,0.1), 0 15px 12px rgba(0,0,0,0.05);
    }
    .shelf-top {
        background: var(--color-white);
        /* background: purple; */
        width: 100%;
        height: 1rem;
        position: absolute;
        left: 0.25rem;
        bottom: -0.5rem;
        transform: skew(-30deg);
        z-index: 999;
        clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 100%, calc(100% - 1rem) 100%, 0 100%, 0 0); 
    }
    /* .shelf-front:after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 2rem;
        background: green;
        bottom: 0rem;
        right: -1rem;
    } */
    /* .shelf-shadow {
        background: var(--romance-blue-light);
        transform: skew(-50deg);
        width: 100%;
        bottom: -2.5rem;
        height: 2.5rem;
        position: absolute;
        right: 1rem;
        opacity: 0.75;
        filter: blur(1rem); 
        z-index: 1;
    } */
</style>
