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

    onMount( () => {
        alt = image ? image.name : vars.file_name;
        updateImage();
        img.addEventListener( 'error', errorHandler );
    });

    function updateImage(){
        let breakpointsToUse = defaultBreakpoints;
        if( breakpoints ) breakpointsToUse = breakpoints;
         
        let config = breakpointsToUse.default;

        let sizes = Object.keys( breakpointsToUse ).sort();
        let compareElement = relativeToParent ? img.parentElement : document.documentElement

        sizes.forEach( key => {
            if( key !== 'default' && compareElement.clientWidth <= Number.parseInt( key )  ){
                config = breakpointsToUse[key];
            }
        });
        
        setSrc( config );
        
    }

    // function heightAccordingToWidthAndRatio( w:number, r:number ){
    //     return Number( w * r ).toFixed();
    // }

    function setSrc( config ){
        if( config.width && config.height) setWidthAndHeight( config );
        if( vars && vars.width && vars.height ) setWidthAndHeight( vars );
        let routeToUse = route ? route : config.route;
        let url = routeToUse.vars( { ...image, ...config, ...vars } ).url;
        if( url != img.getAttribute('src') ) img.setAttribute( 'src', url );
    }

    function setWidthAndHeight( config ){
        img.setAttribute( 'width', config.width );
        img.setAttribute( 'height', config.height );
    }

    function errorHandler(){
        img.setAttribute('src', 'https://placehold.co/600x400?text=Image Error')
    }

</script>