<script lang="ts">
    import type { AlignModes } from './actions/place';
    import { createOverlay } from './overlay';
    import { createFocusList } from './focuslist';
    import DropDownPanel from "./panels/DropDownPanel.svelte";

    export let align:AlignModes = 'Top';

    const overlay = createOverlay();
    const focus = createFocusList();
    
</script>

<div class="relative inline-block">
    <slot {overlay} {focus}></slot>
    {#if $overlay.opened }
        <DropDownPanel {overlay} {align}>
            <slot name="overlay" {overlay} {focus}></slot>
        </DropDownPanel>
    {/if}
</div>
