<script lang="ts">
    import { createOverlay } from './overlay';
    import LightboxPanel from "./panels/LightboxPanel.svelte";


    const overlay = createOverlay();
    
</script>

<slot {overlay}></slot>
{#if $overlay.opened }
    <LightboxPanel {overlay}>
        <slot name="overlay" {overlay}></slot>
    </LightboxPanel>
{/if}
