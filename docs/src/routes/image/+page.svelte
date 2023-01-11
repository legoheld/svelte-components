<script lang="ts">
    import Image from "@lernetz/svelte-image";
    import { setDefaultBreakpoints } from "@lernetz/svelte-image";
    import { RequestBuilder } from "@lernetz/request";
    import { set } from '@lernetz/svelte-translate';

    const sizeRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.{ext}/o/height={height}&width={width}/responsive.jpg"
    });
    const presetRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.{ext}/{preset}.jpg"
    });
    const staticRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.jpg/large.jpg"
    });

    set( 'de',{
        'image-error': "Bild nicht gefunden"
    });

    const image = {
        file_name:'636baf36473fb5003d262b98',
        name:'test.jpg',
        width: 1918,
        height: 751,
        ext:'jpg'
    }

    const breakpoints = {
        600:{
            preset:"thumb",
            route:presetRoute,
            aspectRatio: "1 / 2"
        },
        1000:{
            preset: "medium",
            route: presetRoute,
            aspectRatio: "1 / 1"
        },
        default:{
            preset: "large",
            route: presetRoute,
            aspectRatio: "2 / 1"
        }
    };

    setDefaultBreakpoints( {
        600:{
            width: 200,
            height: 200,
            route: sizeRoute
        },
        1000:{
            preset:"medium",
            route: presetRoute,
            aspectRatio: "1 / 1"
        },
        default:{
            preset: "large",
            route: presetRoute,
            aspectRatio: "2 / 1"
        }
    });


</script>

<div class="text-24 font-bold mb-6">Image Component</div>

<div class="text-24 font-bold mb-6">Image with default breakpoints</div>
<Image image={image} class="rounded-md"></Image>

<div class="text-24 font-bold mb-6">Image with fix route and route vars</div>
<Image route={staticRoute} vars={{file_name:'636baf36473fb5003d262b98'}} aspectRatio={"2 / 1"}></Image>

<div class="text-24 font-bold mb-6">Image with own breakpoints</div>
<Image image={image} breakpoints={breakpoints} ></Image>

<div class="text-24 font-bold mb-6">Image with own breakpoints and size relative to parent element</div>
<Image image={image} breakpoints={breakpoints} relativeToParent={true}></Image>

<div class="text-24 font-bold mb-6">Image with loading error</div>
<Image route={sizeRoute} vars={{file_name:'no-file', ext:'jpg', width:100, height:100}}></Image>