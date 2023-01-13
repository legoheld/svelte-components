<script lang="ts">
    import { createFocusList } from '@lernetz/svelte-overlay';
    import { autofocus as test } from '@lernetz/svelte-overlay/actions';


    import { onMount } from 'svelte';
    export let items:Array<any> = [];
    export let filter:( item:any, input:string ) => boolean;

    let filtered:Array<any> = [];
    let focus = createFocusList();


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

<input class="w-full" use:test use:focus.item={{listenOnly:true}} on:input={onInput}>
{#each filtered as item }
    <slot {item} {focus}></slot>
{/each}
