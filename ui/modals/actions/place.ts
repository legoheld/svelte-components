import { tick } from 'svelte';


export function place( node:HTMLElement, options:{ reference:HTMLElement, align:'left'|'right'|'top'|'bottom', offset:number }) {

    const { align, reference, offset } = options;


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

    let buttonBounds = getPageBounds( reference );
    let panelBounds = getPageBounds( node );

    let pos = {
        top:0,
        left:0
    };

    if( align == 'top' || align == 'bottom' ) {
        pos.left = buttonBounds.left + ( ( buttonBounds.width - panelBounds.width ) / 2 );

        pos.top = align == 'top' ? buttonBounds.top - panelBounds.height - offset: buttonBounds.bottom + offset;
    }
    if( align == 'left' || align == 'right' ) {
        pos.top = buttonBounds.top + ( ( buttonBounds.height - panelBounds.height ) / 2 );
        pos.left = align == 'left' ? buttonBounds.left - panelBounds.width - offset: buttonBounds.right + offset;
    }

    node.style.top = pos.top + 'px';
    node.style.left = pos.left + 'px';

}