<script lang="ts">
    import { HtmlContext, registerElement, resolveType } from "../Html.svelte";
    import { getContext, onMount } from "svelte";
    import { LinkElement } from "../../editor/plugins/Link";


    export let element:LinkElement;
    export let path:number[];
    let html = getContext<HtmlContext>( 'html' );

</script>

<a href="{element.url}" target="{ element.target || '_blank' }" use:registerElement={ {path, html}}>
    {#each element.children as child, index }
        <svelte:component this={ resolveType( child ) } element={child} path={ [ ...path, index ] }></svelte:component>
    {/each}
</a>
