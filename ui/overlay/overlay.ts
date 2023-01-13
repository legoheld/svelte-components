import { tick } from 'svelte'
import { get, writable, type Writable } from 'svelte/store';
import { unify } from './actions/action';
import { ariaButton, setAttribute, trackAttribute } from './actions/attribute';
import { listen } from './actions/events';
import { keydown } from './actions/keys';

interface OverlayStore {
    opened:boolean,
    id:string
}

export interface Overlay extends Writable<OverlayStore> {
    open: () => void,
    close: () => void,
    toggle: () => void,
    trigger: (node: HTMLElement) => void,
    reference: () => HTMLElement,
}

export function createOverlay() {

    const store = writable<OverlayStore>({ opened: false, id: 'overlay-' + ( 1000 * Math.random() ).toFixed() });
    const { set, update, subscribe } = store;

    let reference:HTMLElement;

    const open = () => update( s => ({ ...s, opened: true }) );
    const close = () => update( s => ({ ...s, opened: false }) );
    const toggle = () => update( s => ({ ...s, opened: !s.opened }) );


    function trigger(node: HTMLElement) {

        reference = node;

        return unify([
            setAttribute( node, { role:'button', type:'button', 'aria-haspopup':'true', 'aria-controls':get( store ).id } ),
            trackAttribute( node, { attribute: 'aria-expanded', store, value:(s) => s.opened + '' }),
            listen(node, 'click', (e) => {
                //e.preventDefault();
                //e.stopPropagation();
                toggle();
            } ),
            keydown( node, ( e:KeyboardEvent ) => {
                if( e.key == 'Escape' ) close();
            })
        ]);
    }



    return {
        open,
        close,
        toggle,
        trigger,
        reference:() => reference,
        subscribe,
        set,
        update,
    }

}


