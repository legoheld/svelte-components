import type { Writable } from 'svelte/store';




export function ariaButton( node:HTMLElement ) {
    setAttribute( node, { type:'button', 'role':'button'});
}


export function trackAttribute<K>( node:HTMLElement, options: { attribute:string, store:Writable<K>, value:( store:K ) => any } ) {
    const destroy = options.store.subscribe( ( s ) => {
        setAttribute( node, { [options.attribute]:options.value( s ) } );
    });

    return { destroy }
}


export function setAttribute( node:HTMLElement, attributes:{[key:string]:any} ) {
    Object.keys( attributes ).forEach( key => {
        if( attributes[ key ] === false ) {
            node.removeAttribute( key );
        } else {
            node.setAttribute( key, attributes[ key ] );
        }
    });
}
