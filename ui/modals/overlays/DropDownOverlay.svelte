
<script lang="ts">
    import { onMount,tick } from 'svelte';
    import { Transition } from "svelte-transition";
    import type { Modal } from "../modal";
    import { clickOutside } from '../actions/events';
    import { place } from '../actions/place';

    export let modal:Modal;

    let node:HTMLElement;

    onMount( async () => {
        await tick();
        place( node, { align: 'top', reference:modal.trigger(), offset: 0 } );
    })
    

</script>

<Transition
    show={ $modal.opened }
    appear={true}

    enter="transition ease-in duration-100"
    enterTo="opacity-100 scale-100 transform"
	enterFrom="opacity-0 scale-95 transform"
>
    <div bind:this={node} class="absolute z-50" use:clickOutside={modal.close} >
        <slot></slot>
    </div>
</Transition>