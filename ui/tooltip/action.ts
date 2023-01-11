import type { SvelteComponent } from 'svelte';
import Tooltip from './Tooltip.svelte';

interface TooltipOptions {
	content:string|ConstructorOfATypedSvelteComponent,
	align?:'left'|'right'|'top'|'bottom',
	offset?:number;
	styling?:string;
}




export function tooltip( element:HTMLElement, options:TooltipOptions ) {

	let tooltipComponent;

	// set default options
	let op = {
		align:'top',
		offset:0,
		...options
	};

	function mouseOver(event:MouseEvent) {

		// create tooltip component
		tooltipComponent = new Tooltip({
            props: {
				trigger: element,
				...op
            },
			target: document.body,
        });
	}

	function mouseLeave() {
		tooltipComponent.$destroy();
	}
	
	element.addEventListener('mouseover', mouseOver);
    element.addEventListener('mouseleave', mouseLeave);
	
	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
		}
	}
}