<script lang="ts">
    import type { LinkElement } from "../../defaults";
    import Children from "./Children.svelte";

    export let element:LinkElement;
    export let path:number[];

</script>

<a href="{element.url}" target="{ element.target || '_blank' }">
    <Children path={path} element={element}></Children>
</a>
