<script lang="ts">
    import {dndzone} from "svelte-dnd-action";
    import type { DndEvent } from "svelte-dnd-action";
    import { flip } from 'svelte/animate';

    export let elements = [{id:1},{id:2}];


    function handler( e:CustomEvent<DndEvent<{id:number}>> ) {
        elements = e.detail.items;
    }

</script>

<div use:dndzone={ { items:elements } } on:consider={handler} on:finalize={handler}>
    {#each elements as item(item.id)}
    <div animate:flip="{{ duration: 200 }}">
        <div class="handle" aria-label="drag-handle">HANDLE</div>
        <span class="font-bold">{item.id}</span>this is now a draggable div that can be dropped in other dnd zones</div>
    {/each}
</div>