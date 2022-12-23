<script lang="ts">
    import { generateId } from './generateId';
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';

    export let label = undefined;
    export let type = 'text';
    export let placeholder = '';
    export let value:Writable<string|number> = writable('');

    const labelId = generateId( 'input' );

    function handleInput( e:Event ) {
        let t = e.target as HTMLInputElement;
        $value = type.match(/^(number|range)$/) ? +t.value : t.value;
    }

</script>

{#if label}
<label for={labelId} class="block text-14 font-medium text-gray-700">{label}</label>
{/if}
<div class:mt-1={label}>
    <input on:blur={handleInput} value={$value} {type} id={labelId} class="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-14" placeholder={placeholder}>
</div>