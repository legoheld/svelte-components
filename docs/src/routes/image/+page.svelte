<script lang="ts">
    import Image from "@lernetz/svelte-image";
    import { RequestBuilder } from "@lernetz/request";

    const route = new RequestBuilder({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/{file_name}.{ext}/o/height={height}&width={width}/responsive.jpg"
    });

    const image = {
        file_name:'636baf36473fb5003d262b98',
        name:'test.jpg',
        width: 1456,
        height: 570,
        ext:'jpg'
    }

    const sizes = {
        "480px": 300,
        "1024px": 600,
        "default": 1000
    }

</script>

<Image alt="test" route={route} image={image} sizes={sizes}></Image>