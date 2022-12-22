<script lang="ts">
    import { getContext } from "svelte";
    import { LinkElement } from "../../defaults";
    import { HtmlContext, registerElement, resolveNode } from "../Html.svelte";


    export let element:LinkElement;
    export let path:number[];
    let html = getContext<HtmlContext>( 'html' );

</script>

<a href="{element.url}" target="{ element.target || '_blank' }" use:registerElement={ {path, html}}>
    {#each element.children as child, index }
        <svelte:component this={ resolveNode( child ) } element={child} path={ [ ...path, index ] }></svelte:component>
    {/each}
</a>
