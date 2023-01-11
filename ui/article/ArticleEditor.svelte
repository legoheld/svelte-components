<script lang="ts">
    import {dndzone} from "svelte-dnd-action";
    import type { DndEvent } from "svelte-dnd-action";
    import { flip } from 'svelte/animate';
    import { get } from 'svelte/store';
    import type { DBModel } from "@lernetz/model-api";

    export let componentResolve:( element:DBModel ) => ConstructorOfATypedSvelteComponent;
    export let elements:DBModel[];

    function handler( e:CustomEvent<DndEvent<any>> ) {
        elements = e.detail.items;
    }

</script>

<div>
    {#each elements as item ( get(item).id )}
        <div animate:flip>
            <svelte:component this={componentResolve(item) } element={item}></svelte:component>
        </div>
    {/each}
</div>