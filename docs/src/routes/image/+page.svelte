<script lang="ts">
    import Image from "@lernetz/svelte-image";
    import { setDefaultBreakpoints } from "@lernetz/svelte-image";
    import { RequestBuilder } from "@lernetz/request";

    const sizeRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.{ext}/o/height={height}&width={width}/responsive.jpg"
    });
    const presetRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.{ext}/{preset}.jpg"
    });
    const staticRoute = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.jpg/large.jpg"
    });

    
    const image = {
        file_name:'636baf36473fb5003d262b98',
        name:'test.jpg',
        width: 1456,
        height: 570,
        ext:'jpg'
    }

    const breakpoints = {
        600:{
            preset:"thumb",
            route:presetRoute
        },
        1000:{
            preset: "medium",
            route: presetRoute
        },
        default:{
            preset: "large",
            route: presetRoute,
        }
    };

    setDefaultBreakpoints( {
        600:{
            width: 200,
            height: 200,
            route: sizeRoute
        },
        1000:{
            preset: "medium",
            route: presetRoute
        },
        default:{
            preset: "large",
            route: presetRoute,
        }
    });



</script>

<Image image={image}></Image>
<Image route={staticRoute} vars={{file_name:'636baf36473fb5003d262b98', ext:'jpg', preset:'large'}}></Image>
<Image image={image} breakpoints={breakpoints}></Image>
<Image image={image} breakpoints={breakpoints} relativeToParent={true}></Image>
<Image route={sizeRoute} vars={{file_name:'no-file', ext:'jpg', width:300, height:150}}></Image>