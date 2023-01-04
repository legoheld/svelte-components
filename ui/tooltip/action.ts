import { SvelteComponent } from 'svelte';
import Tooltip from './Tooltip.svelte';

interface TooltpOptions {
	content:string|SvelteComponent,
	align?:'left'|'right'|'top'|'bottom',
	offset?:number;
	styling?:string;
}


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

export function tooltip( element:HTMLElement, options:TooltpOptions ) {

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
                content: op.content,
				styling:op.styling,
				calcPosition
            },
            target: document.body
        });
	}

	function calcPosition( tooltip:HTMLElement ) {
		// calculate position of tooltip
		let buttonBounds = getPageBounds( element );
		let tooltipBounds = getPageBounds( tooltip );

		let pos = {
			top:0,
			left:0
		};

		if( op.align == 'top' || op.align == 'bottom' ) {
			pos.left = buttonBounds.left + ( ( buttonBounds.width - tooltipBounds.width ) / 2 );

			pos.top = op.align == 'top' ? buttonBounds.top - tooltipBounds.height - op.offset : buttonBounds.bottom + op.offset;
		}
		if( op.align == 'left' || op.align == 'right' ) {
			pos.top = buttonBounds.top + ( ( buttonBounds.height - tooltipBounds.height ) / 2 );
			pos.left = op.align == 'left' ? buttonBounds.left - tooltipBounds.width - op.offset : buttonBounds.right + op.offset;
		}

		tooltip.style.top = pos.top + 'px';
		tooltip.style.left = pos.left + 'px';
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