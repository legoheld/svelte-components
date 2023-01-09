<script lang="ts">
    import { createModal } from './modal';
    import LightboxOverlay from "./overlays/LightboxOverlay.svelte";
    import DropDownOverlay from "./overlays/DropDownOverlay.svelte";

    export let overlay:any = DropDownOverlay;

    const modal = createModal();
</script>


<slot {modal}></slot>
{#if $modal.opened }
    <svelte:component this={overlay} {modal}>
        <slot name="panel" {modal}></slot>
    </svelte:component>
{/if}