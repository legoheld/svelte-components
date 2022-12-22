<script lang="ts">
    import { Element } from "slate";
    import { getContext } from "svelte";
    import { HtmlContext, registerElement, resolveNode } from "../Html.svelte";


    export let element:Element;
    export let path:number[];
    let html = getContext<HtmlContext>( 'html' );

</script>

<svelte:element this={ element.type } use:registerElement={ {path, html}}>
    {#each element.children as child, index }
        <svelte:component this={ resolveNode( child ) } element={child} path={ [ ...path, index ] }></svelte:component>
    {/each}
</svelte:element>
