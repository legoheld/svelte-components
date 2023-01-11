import { tick } from 'svelte';


export type AlignModes = 'TopLeft' | 'Top' | 'TopRight' | 'RightTop' | 'Right' | 'RightBottom' | 'BottomRight' | 'Bottom' | 'BottomLeft' | 'LeftBottom' | 'Left' | 'LeftTop' | 'Center';



export function place( node:HTMLElement, options:{ reference:HTMLElement, align:AlignModes }) {

    const { align, reference } = options;
    
    let bounds = reference.getBoundingClientRect();
    const { width, height } = node.getBoundingClientRect();

    // clamp to viewport
    const e = document.documentElement;
    const viewTop = e.scrollTop;
    const viewLeft = e.scrollLeft;
    const viewBottom = viewTop + window.innerHeight;
    const viewRight = viewLeft + window.innerWidth;

    const clampTop = ( value ) => Math.max( Math.min( value + bounds.top, viewBottom - height ), viewTop ) - bounds.top + 'px';
    const clampLeft = ( value ) => Math.max( Math.min( value + bounds.left, viewRight - width ), viewLeft ) - bounds.left + 'px';


    
    switch( align ) {
        case 'TopLeft':
            node.style.top = clampTop( -height );
            node.style.left = clampLeft( 0 );
            break;
        case 'Top':
            node.style.top = clampTop( -height );
            node.style.left = clampLeft( ( bounds.width / 2 ) - ( width / 2 ) );
            break;
        case 'TopRight':
            node.style.top = clampTop( -height );
            node.style.left = clampLeft( bounds.width - width );
            break;
        case 'RightTop':
            node.style.top = clampTop( 0 );
            node.style.left = clampLeft( bounds.width );
            break;
        case 'Right':
            node.style.top = clampTop( ( bounds.height / 2 ) - ( height / 2 ) );
            node.style.left = clampLeft( bounds.width );
            break;
        case 'RightBottom':
            node.style.top = clampTop( bounds.height - height );
            node.style.left = clampLeft( bounds.width );
            break;
        case 'Bottom':
            node.style.top = clampTop( bounds.height );
            node.style.left = clampLeft( ( bounds.width / 2 ) - ( width / 2 ) );
            break;
        case 'BottomRight':
            node.style.top = clampTop( bounds.height );
            node.style.left = clampLeft( bounds.width - width );
            break;
        case 'BottomLeft':
            node.style.top = clampTop( bounds.height );
            node.style.left = clampLeft( 0 );
            break;
        case 'Left':
            node.style.top = clampTop( ( bounds.height / 2 ) - ( height / 2 ) );
            node.style.left = clampLeft( -width );
            break;
        case 'LeftBottom':
            node.style.top = clampTop( bounds.height - height );
            node.style.left = clampLeft( -width );
            break;
        case 'LeftTop':
            node.style.top = clampTop( 0 );
            node.style.left = clampLeft( -width );
            break;
        case 'Center':
            node.style.top = clampTop( ( bounds.height / 2 ) - ( height / 2 ) );
            node.style.left = clampLeft( ( bounds.width / 2 ) - ( width / 2 ) );
            break;
        }
        
}


export function placeTransform( node:HTMLElement, options:{ reference:HTMLElement, align:AlignModes }) {

    let bounds = options.reference.getBoundingClientRect();

    const transforms = {
        'Top': {
            'left': bounds.width / 2 + 'px',
            'top': 0,
            'transform': 'translateY( -100% ) translateX( -50% )'
        },
        /*
        'TopLeft': 'origin-bottom-left',
        'TopRight': 'origin-bottom-right',
        'Right': 'origin-left',
        'RightTop': 'origin-top-left',
        'RightBottom': 'origin-bottom-left',
        'Bottom': 'origin-top',
        'BottomRight': 'origin-top-right',
        'BottomLeft': 'origin-top-left',
        'Left': 'origin-right',
        'LeftBottom': 'origin-bottom-right',
        'LeftTop': 'origin-top-right',
        */
    }

    const styles = transforms[ options.align ];
    for (const key of Object.keys( styles ) ) {
        node.style[ key ] = styles[ key ];
    }


}