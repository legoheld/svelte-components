<script lang="ts">

    import { TypeElement } from '@lernetz/svelte-slate/defaults'
    import { HtmlContext, resolveNode } from '@lernetz/svelte-slate/html/Html.svelte';
    import { getContext } from 'svelte';

    export let element:TypeElement;
    export let path:number[];
    let html = getContext<HtmlContext>( 'html' );

</script>

<svelte:element this={element.type} class="{ element.type == 'ul' ? 'list-disc' : 'list-decimal' } list-inside">
    {#each element.children as child, index }
        <svelte:component this={ resolveNode( child ) } element={child} path={ [ ...path, index ] }></svelte:component>
    {/each}
</svelte:element>
