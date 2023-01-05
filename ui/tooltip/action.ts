import { SvelteComponent } from 'svelte';
import Tooltip from './Tooltip.svelte';

interface TooltipOptions {
	content:string|SvelteComponent,
	align?:'left'|'right'|'top'|'bottom',
	offset?:number;
	styling?:string;
}




export function tooltip( element:HTMLElement, options:TooltipOptions ) {

	let tooltipComponent;

	// set default options
	let op = {
		align:'top',
		styling:'bg-black opacity-90 shadow-sm rounded-md text-white z-50 p-8',
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
			target: document.body
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