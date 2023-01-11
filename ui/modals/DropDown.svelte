<script lang="ts">
    import type { AlignModes } from './actions/place';
    import { createModal } from './modal';
    import { createFocuslist } from './focuslist';
    import DropDownOverlay from "./overlays/DropDownOverlay.svelte";

    export let align:AlignModes = 'Top';

    const modal = createModal();
    const focus = createFocuslist();
    
</script>

<div class="relative inline-block">
    <slot {modal} {focus}></slot>
    {#if $modal.opened }
        <DropDownOverlay {modal} {align}>
            <slot name="panel" {modal} {focus}></slot>
        </DropDownOverlay>
    {/if}
</div>
