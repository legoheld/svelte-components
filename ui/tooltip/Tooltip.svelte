<script lang="ts">

    import { onMount, onDestroy } from 'svelte';

    export let content:string|ConstructorOfATypedSvelteComponent;
    export let trigger:HTMLElement;
    export let align:'left'|'right'|'top'|'bottom' = 'top';
    export let offset = 0;

    export let styling = "bg-black opacity-90 shadow-sm rounded-md text-white z-50 p-8";

    let node;


    function getPageBounds( element:HTMLElement ) {
        let rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            right: rect.right + window.scrollX,
            width: rect.width,
            height: rect.height,
        }
    }

    function calcPosition() {
		// calculate position of tooltip
		let buttonBounds = getPageBounds( trigger );
		let tooltipBounds = getPageBounds( node );

		let pos = {
			top:0,
			left:0
		};

		if( align == 'top' || align == 'bottom' ) {
			pos.left = buttonBounds.left + ( ( buttonBounds.width - tooltipBounds.width ) / 2 );

			pos.top = align == 'top' ? buttonBounds.top - tooltipBounds.height - offset: buttonBounds.bottom + offset;
		}
		if( align == 'left' || align == 'right' ) {
			pos.top = buttonBounds.top + ( ( buttonBounds.height - tooltipBounds.height ) / 2 );
			pos.left = align == 'left' ? buttonBounds.left - tooltipBounds.width - offset: buttonBounds.right + offset;
		}

		node.style.top = pos.top + 'px';
		node.style.left = pos.left + 'px';
	}


    onMount( () => {
        calcPosition();
    })
    
</script>

<div bind:this={node} class="absolute {styling}">
    {#if typeof content == 'string'}
        { content }
    {:else}
        <svelte:component this={content}></svelte:component>
    {/if}
</div>