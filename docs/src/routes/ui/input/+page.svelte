<script lang="ts">
    import { Input } from '@lernetz/svelte-input';
</script>

<Input on:change={ e => console.log( e.detail ) } label="demo"></Input>
