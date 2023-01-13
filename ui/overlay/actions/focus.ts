import { tick } from 'svelte';
import { Enter, keydown } from './keys';

export function autofocus( node:HTMLElement ) {
    (async () => {
        await tick();
        node.focus();
    })();
}


export function focusable( node:HTMLElement, options:{ role:string } = { role:'button' } ) {
    node.tabIndex = 0;
    node.role = options.role;

    // listen to enter for trigger click
    return keydown( node, (e:KeyboardEvent ) => {
        if( e.key == Enter ) {
            node.dispatchEvent( new MouseEvent( 'click' ) );
        }
    })
}