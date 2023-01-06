<img {alt} bind:this={img}>

<svelte:window on:resize={updateImage}></svelte:window>

<script lang="ts" context="module">
    let defaultBreakpoints:any = {}

    export function setDefaultBreakpoints( config:any ) {
        defaultBreakpoints = config;
    }
</script>

<script lang="ts">

    import { RequestBuilder } from '@lernetz/request';
    import { onMount } from 'svelte';

    export let alt:string = 'image';
    export let route:RequestBuilder = null;
    export let vars:any = null;
    export let breakpoints:any = null;
    export let image:{
        file_name:string,
        name:string,
        width: number,
        height: number,
        ext:string
    } = null;
    export let relativeToParent:boolean = false;
    export let aspectRatio:number = undefined;
    
    let img:HTMLImageElement;

    onMount( () => {
        alt = image ? image.name : vars.file_name;
        updateImage();
        img.addEventListener( 'error', errorHandler );
    });

    function updateImage(){
        let breakpoint = calculateBreakpoint();
        let routeToUse = route ? route : breakpoint.route;
        setImage( routeToUse.vars( { ...image, ...breakpoint, ...vars } ).url );
    }

    function calculateBreakpoint(){
        let breakpointsToUse = breakpoints ? breakpoints : defaultBreakpoints;
        let breakpoint = breakpointsToUse.default;

        let sizes = Object.keys( breakpointsToUse ).sort();
        let compareElement = relativeToParent ? img.parentElement : document.documentElement

        sizes.forEach( key => {
            if( key !== 'default' && compareElement.clientWidth <= Number.parseInt( key )  ){
                breakpoint = breakpointsToUse[key];
            }
        });

        return breakpoint;
    }

    function calcualteAspectRatio() {
        if( aspectRatio ) return aspectRatio;
        
        let breakpoint = calculateBreakpoint();
        if( breakpoint?.width && breakpoint?.height ) {
            return breakpoint.height / breakpoint.width;
        }
        
        if( image?.width && image?.height ) {
            return image.height / image.width;
        }

        return 3/4;
    }

    function errorHandler(){
        let breakpoint = calculateBreakpoint();
        let aspect = calcualteAspectRatio();
        let width = breakpoint?.width || 600;
        let height = aspect * width;
        setImage( 'https://placehold.co/600x400?text=Image Error')
    }
    
    function setImage( url ) {
        img.style.aspectRatio = calcualteAspectRatio() + '';
        img.setAttribute('src', url );
    }
    
    

</script>