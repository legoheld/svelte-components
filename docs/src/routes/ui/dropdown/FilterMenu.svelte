<script lang="ts">
    import { createFocuslist } from '@lernetz/svelte-modals/focuslist';
    import type { Modal } from '@lernetz/svelte-modals/modal';


    import { onMount } from 'svelte';
    export let items:Array<any> = [];
    export let filter:( item:any, input:string ) => boolean;
    export let modal:Modal;

    let filtered:Array<any> = [];
    let focus = createFocuslist();


    function onInput( e:Event ) {
        const value = ( e.currentTarget as HTMLInputElement ).value;
        if( value == '' ) {
            filtered = items;
        } else {
            filtered = items.filter( i => filter( i, value ) );
        }
    }

    onMount( () => {
        filtered = items;
    })
</script>

<input class="w-full" use:modal.autoFocus use:focus.item={{listenOnly:true}} on:input={onInput}>
{#each filtered as item }
    <slot {item} {focus}></slot>
{/each}
