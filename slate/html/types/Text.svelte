<script lang="ts">
    import { Text } from "slate";
    import { onMount } from "svelte";
    import { getRegister } from "../Html.svelte";


    export let element:Text;
    export let path:number[];
    let ref:Node;
    let registerNode = getRegister();

    onMount( ( ) => {
        // register text node
        registerNode( path, ref.childNodes[0] );
    })
</script>

<span class:font-bold={element.bold} class:italic={element.italic} bind:this={ref}>{ element.text != '' ? element.text : '\uFEFF' }</span>
