<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { fade, scale, fly } from 'svelte/transition';
    import type { Modal } from "../modal";
    import { clickOutside } from '../actions/events';
    import { place, placeTransform, type AlignModes } from '../actions/place';
    import classes from 'svelte-transition-classes';

    export let modal:Modal;

    export let align:AlignModes = 'Top';


    let origin = {
        'Top': 'origin-bottom',
        'TopLeft': 'origin-bottom-left',
        'TopRight': 'origin-bottom-right',
        'Right': 'origin-left',
        'RightTop': 'origin-top-left',
        'RightBottom': 'origin-bottom-left',
        'Bottom': 'origin-top',
        'BottomRight': 'origin-top-right',
        'BottomLeft': 'origin-top-left',
        'Left': 'origin-right',
        'LeftBottom': 'origin-bottom-right',
        'LeftTop': 'origin-top-right',
    }
    let node:HTMLElement;

    onMount( async() => {
        await tick();
        place( node, { align, reference:modal.trigger() });
    })

    function onOutside( e:MouseEvent ) {
        // only close modal when click is not on trigger that toggles
        if( !modal.trigger().contains( e.target as Node ) ) modal.close();
    }

</script>

{#if $modal.opened}
<div class="absolute z-50 " id={$modal.id} bind:this={node}
    use:clickOutside={onOutside} 
    >
    <div class="{ origin[align] } transition duration-200 ease-out"
        in:classes={{ from:'scale-75 opacity-0', to:'scale-100 opacity-100' }}
    >
        <slot></slot>
    </div>
</div>
{/if}