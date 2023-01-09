<img {alt} bind:this={img}>

<svelte:window on:resize={updateImage}></svelte:window>

<script lang="ts" context="module">
    let defaultBreakpoints:BreakpointConfig = {}

    export function setDefaultBreakpoints( config:any ) {
        defaultBreakpoints = config;
    };

    export interface BreakpointConfig { [key:string|number]:{
        route?:RequestBuilder,
        preset?:string,
        width?:number,
        height?:number,
        aspectRatio?:string
    }}

</script>

<script lang="ts">

    import { RequestBuilder } from '@lernetz/request';
    import { onMount } from 'svelte';
    import { set, t } from '@lernetz/svelte-translate';

    export let alt:string = 'image';
    export let route:RequestBuilder = null;
    export let vars:any = null;
    export let breakpoints:BreakpointConfig = null;
    export let image:{
        file_name:string,
        name:string,
        width: number,
        height: number,
        ext:string
    } = null;
    export let relativeToParent:boolean = false;
    export let aspectRatio:string = undefined;
    
    
    let img:HTMLImageElement;
    let loadingError:boolean = false;

    set( 'de',{
        'image-error': "Bild nicht gefunden"
    });

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

        if( route ) return undefined;

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
        if( breakpoint?.aspectRatio ){
            return breakpoint.aspectRatio;
        }

        if( breakpoint?.width && breakpoint?.height ) {
            return `${breakpoint.width} / ${breakpoint.height}`;
        }
        
        if( image?.width && image?.height ) {
            return `${image.width} / ${image.height}`;
        }
        
        if( vars?.width && vars?.height ){
            return `${vars.width} / ${vars.height}`;
        }

        return "4 / 3";
    }

    function errorHandler(){
        let breakpoint = calculateBreakpoint();
        let aspectRatio = calcualteAspectRatio();
        let ratioWidth = aspectRatio.split('/')[0].trim(), ratioHeight = aspectRatio.split('/')[1].trim();
        let ratio = Number.parseInt(ratioWidth) / Number.parseInt(ratioHeight);
        let width = vars?.width || breakpoint?.width || image?.width || 300;
        let height = width / ratio;
        setImage( `https://placehold.co/${width}x${height}?text=${$t('image-error')}`);
    }
    
    function setImage( url ) {
        img.style.aspectRatio = calcualteAspectRatio();
        if( url !== img.getAttribute( 'src' ) ) img.setAttribute('src', url );
    }
    
    

</script>