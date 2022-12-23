<script lang="ts">
    import { Input } from '@lernetz/svelte-input';
    import { writable } from 'svelte/store';

    let value = writable('');
</script>

<Input bind:value label="demo"></Input>


{$value}
