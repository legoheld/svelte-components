<script lang="ts">
    import type { BaseElement } from "slate";
    import { resolveType } from "../Html.svelte";
    
    export let element:BaseElement;
    export let path:number[];
</script>



{#each element.children as child, index }
    <svelte:component this={ resolveType( child ) } element={child} path={ [ ...path, index ] }></svelte:component>
{/each}