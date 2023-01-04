<script lang="ts">

    import { onMount } from 'svelte';

    export let content:string|ConstructorOfATypedSvelteComponent;
    export let calcPosition:( tooltip:HTMLElement ) => void;

    export let styling = "bg-black opacity-90 shadow-sm rounded-md text-white z-50 p-8";

    let node;

    onMount( () => {
        calcPosition( node );
    })
</script>

<div bind:this={node} class={styling} class:absolute={true}>
    {#if typeof content == 'string'}
        { content }
    {:else}
        <svelte:component this={content}></svelte:component>
    {/if}
</div>