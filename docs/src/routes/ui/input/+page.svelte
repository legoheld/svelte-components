<script lang="ts">
    import { Input } from '@lernetz/svelte-input';

    let value = '';
</script>

<Input bind:value label="demo"></Input>


{value}
