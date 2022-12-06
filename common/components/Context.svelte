<script lang="ts">
    import { setContext } from "svelte";


    // inject all props into context
    for (const prop in $$props ) {
        console.log( "Wrote context", prop );
        setContext( prop, $$props[ prop ] )
    }
</script>

<slot></slot>
