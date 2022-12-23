<script lang="ts">
    import { Element } from "slate";
    import Children from "./Children.svelte";


    export let element:Element;
    export let path:number[];

</script>


<svelte:element this={ element.type }>
    <Children path={path} element={element}></Children>
</svelte:element>
