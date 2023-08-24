<script>
    export let shelfW;
    export let shelfHasShadow = true;
</script>

<div class="shelf" style="width:{shelfW}px">
    <div class="shelf-front"></div>
    <div class="shelf-top"></div>
    {#if shelfHasShadow == true}
        <div class="shelf-shadow"></div>
    {/if}
</div>

<style>
    .shelf {
        height: calc(100vh / 8);
        display: flex;
        align-items: end;
        position: relative;
    }
    .shelf-front {
        background: #FBF7F7;
        width: 100%;
        height: 1rem;
        position: absolute;
        bottom: -1.5rem;
        z-index: 999;
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
        stroke: 1px solid #FBF7F7;
        z-index: 999;
    }
    .shelf-shadow {
        background: #D9D9D9;
        /* background: green; */
        transform: skew(-60deg);
        width: 100%;
        bottom: -6.5rem;
        height: 5rem;
        position: absolute;
        left: -8.75rem;
        opacity: 0.75;
        filter: blur(3rem); 
        z-index: 1;
    }
</style>