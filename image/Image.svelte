<img {alt} bind:this={img}>


<script lang="ts">

    import { RequestBuilder } from '@lernetz/request';
    import { onMount } from 'svelte';

    export let alt:string = 'image';
    export let route:RequestBuilder;
    export let image:{
        file_name:string,
        name:string,
        width: number,
        height: number,
        ext:string
    }
    export let sizes:{ [key:string]: number } = null;
    export let presets:{ [key:string]: { name:string, w:number } } = null;

    let img:HTMLImageElement;
    let ratio:number;

    onMount( () => {
        alt = image.name;
        ratio = image.height / image.width;
        setSrcSet();
        setSizes();
        setSrc();
    });

    function heightAccordingToWidthAndRatio( w:number, r:number ){
        return Number( w * r ).toFixed();
    }

    function setSizes(){
        let sizesStr = "";
        if( presets ){
            for( const key in presets ){
                if( key !== "default" ){
                    sizesStr += `(max-width: ${key}) ${presets[key].w}px,`
                } else {
                    sizesStr += `${presets[key].w}px`;
                }
            }
            img.setAttribute( 'sizes', sizesStr );
        } else if( sizes ){
            for( const key in sizes ){
                if( key !== "default" ){
                    sizesStr += `(max-width: ${key}) ${sizes[key]}px,`
                } else {
                    sizesStr += `${sizes[key] }px`;
                }
            }
            img.setAttribute( 'sizes', sizesStr );

        }
    }
    
    function setSrc(){
        if( presets ){
            img.setAttribute( 'src', route.vars( { preset:presets.default.name, file_name:image.file_name, ext:image.ext } ).url );
        } else {
            let width = sizes ? sizes.default : image.width;
            img.setAttribute( 'src', route.vars( { width:width, height:heightAccordingToWidthAndRatio( width, ratio ), file_name:image.file_name, ext:image.ext } ).url );
        }
    }

    function setSrcSet(){
        let srcset = "";
        if( presets ){
            for( const key in presets ){
                srcset += `${route.vars( { preset:presets[key].name, file_name:image.file_name, ext:image.ext } ).url} ${presets[key].w}w, `;
            }
            img.setAttribute( 'srcset', srcset.substring(0, srcset.length - 2) );
        } else if( sizes ){
            for( const key in sizes ){
                srcset += `${route.vars( { width:sizes[key], height:heightAccordingToWidthAndRatio( sizes[key], ratio ), file_name:image.file_name, ext:image.ext } ).url} ${sizes[key]}w, `;
            }
            img.setAttribute( 'srcset', srcset.substring(0, srcset.length - 2) );
        }

    }



</script>