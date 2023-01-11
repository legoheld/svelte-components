import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { unify } from './actions/action';
import { keyUpDown } from './actions/keys';
import { listen } from './actions/events';



interface FocusListStore {
    active:HTMLElement|undefined,
    items:Array<HTMLElement>,
}

export interface Menu extends Writable< FocusListStore > {
    item:( node:HTMLElement ) => void,
    next:() => void,
    prev:() => void,
    reset:() => void,
}


export function createFocuslist() {

    const { set, update, subscribe } = writable<FocusListStore>({ active: undefined, items:[] });

    const move = ( dir:number = 1 ) => update( s => {

        // no items to move on
        if( s.items.length == 0 ) return;

        let active:HTMLElement;

        const ci = s.items.indexOf( s.active );

        // if not found take first otherwise next in direction
        let i = ( ci == -1 ) ? 0 : ( ci + dir );
        // clamp
        if( i < 0 ) i = s.items.length - 1;
        if( i > s.items.length - 1 ) i = 0; 
        
        active = s.items[i];
        active?.focus();

        return { ...s, active };
    });

    const next = () => move( 1 );
    const prev = () => move( -1 );


    const outsideFocus = ( e:FocusEvent ) => {
        update( s => ({ ...s, active:e.currentTarget as HTMLElement }) );
    }



    function item( node:HTMLElement, options:{listenOnly:boolean} = {listenOnly:false} ) {

        // add item to all items
        if( !options.listenOnly ) {
            update( s => ( { items:[ ...s.items, node ], active:s.active } ) );
        }

        return unify( [
            // remove node from store on destroy
            { destroy: () => {
                update( s => {
                    let items = s.items;
                    let i = items.indexOf( node );
                    if( i >= 0 ) items.splice( i, 1 );
                    return { ...s, items };
                });
            }},
            keyUpDown( node, { up:prev, down:next } ),
            listen( node, 'focus', outsideFocus )
        ]);
    }


    return {
        item,
        next,
        prev,
        set,
        update,
        subscribe
    }
}