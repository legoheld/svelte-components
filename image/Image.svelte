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
    
    let img:HTMLImageElement;
    let currentConfig:any;

    onMount( () => {
        alt = image ? image.name : vars.file_name;
        updateImage();
        img.addEventListener( 'error', errorHandler );
    });

    function updateImage(){
        let breakpointsToUse = defaultBreakpoints;
        if( breakpoints ) breakpointsToUse = breakpoints;
         
        currentConfig = breakpointsToUse.default;

        let sizes = Object.keys( breakpointsToUse ).sort();
        let compareElement = relativeToParent ? img.parentElement : document.documentElement

        sizes.forEach( key => {
            if( key !== 'default' && compareElement.clientWidth <= Number.parseInt( key )  ){
                currentConfig = breakpointsToUse[key];
            }
        });
        
        setSrc( currentConfig );
        
    }

    // function heightAccordingToWidthAndRatio( w:number, r:number ){
    //     return Number( w * r ).toFixed();
    // }

    function setSrc( config ){
        let dimensions = getDimensions( config );
        if( dimensions ) setWidthAndHeight( dimensions )
        let routeToUse = route ? route : config.route;
        let url = routeToUse.vars( { ...image, ...config, ...vars } ).url;
        if( url != img.getAttribute('src') ) img.setAttribute( 'src', url );
    }

    function setWidthAndHeight( dimensions ){
        img.setAttribute( 'width', dimensions.width );
        img.setAttribute( 'height', dimensions.height );
    }

    function errorHandler(){
        let dimensions = getDimensions( currentConfig );
        dimensions = dimensions ? dimensions : { width:600, height:400 };
        img.setAttribute('src', `https://placehold.co/${dimensions.width}x${dimensions.height}?text=Image Error`)
    }
    
    function getDimensions( config ){
        if( route && vars && vars.width && vars.height ){
            return { width:vars.width, height:vars.height }
        } else if ( config.width && config.height ){
            return { width:config.width, height:config.height };
        }
        return undefined;
    }

</script>