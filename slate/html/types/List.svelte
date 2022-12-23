<script lang="ts">
    import type { TypeElement } from '@lernetz/svelte-slate/defaults'
    import Children from './Children.svelte';

    export let element:TypeElement;
    export let path:number[];
</script>

<svelte:element this={element.type} class="{ element.type == 'ul' ? 'list-disc' : 'list-decimal' } list-outside pl-4">
    <Children path={path} element={element}></Children>
</svelte:element>
