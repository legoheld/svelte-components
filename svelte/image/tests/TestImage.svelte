<Image route={route}></Image>

<script lang="ts">

    import { Route } from "@lernetz/routes";
    import Image from "../Image.svelte";

    const route = new Route({
        url:"https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/o/height={height}&width={width}/thumb.jpg"
    });

</script>