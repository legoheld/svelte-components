<script lang="ts">
    import { generateId } from './generateId';
    import { createEventDispatcher } from 'svelte';

    export let label = undefined;
    export let type = 'text';
    export let placeholder = '';

    const labelId = generateId( 'input' );
    const dispatch = createEventDispatcher<{'change':string}>();

    function updateValue( e:FocusEvent ) {
        dispatch('change', ( e.target as HTMLInputElement ).value );
    }

</script>

{#if label}
<label for={labelId} class="block text-14 font-medium text-gray-700">{label}</label>
{/if}
<div class:mt-1={label}>
    <input on:blur={updateValue} type={type} id={labelId} class="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-14" placeholder={placeholder}>
</div>