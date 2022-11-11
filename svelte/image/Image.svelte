<img {alt} bind:this={img}>


<script lang="ts">

    import { Route } from '@lernetz/routes';
    import { onMount } from 'svelte';

    export const alt:string = 'test';
    export let route:Route;
    let img:HTMLImageElement;

    onMount( () => {
        console.log( 'here', img );
        img.setAttribute('src', route.vars( { height:300, width:400 } ).url );
    });

</script>

