<script lang="ts">
    import { setContext } from "svelte";



    // inject all props into context
    for (const prop in $$restProps ) {
        setContext( prop, $$props[ prop ] )
    }
</script>

<slot></slot>
