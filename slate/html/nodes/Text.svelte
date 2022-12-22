<script lang="ts">
    import { Text } from "slate";
    import { getContext } from "svelte";
    import { HtmlContext, registerText } from "../Html.svelte";


    export let element:Text;
    export let path:number[];
    let html = getContext<HtmlContext>( 'html' );
</script>


<span class:font-bold={element.bold} class:italic={element.italic} use:registerText={ {path, html } }>{ element.text.trim() != '' ? element.text : '\uFEFF' }</span>
