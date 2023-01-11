import { tick } from 'svelte'
import { get, writable, type Writable } from 'svelte/store';
import { unify } from './actions/action';
import { ariaButton, setAttribute, trackAttribute } from './actions/attribute';
import { listen } from './actions/events';
import { keydown } from './actions/keys';

interface ModalStore {
    opened:boolean,
    id:string
}

export interface Modal extends Writable<ModalStore> {
    open: () => void,
    close: () => void,
    toggle: () => void,
    button: (node: HTMLElement) => void,
    autoFocus: (node: HTMLElement) => void,
    trigger: () => HTMLElement,
}

export function createModal() {

    const store = writable<ModalStore>({ opened: false, id: 'modal-' + ( 1000 * Math.random() ).toFixed() });
    const { set, update, subscribe } = store;

    let trigger:HTMLElement;

    const open = () => update( s => ({ ...s, opened: true }) );
    const close = () => update( s => ({ ...s, opened: false }) );
    const toggle = () => update( s => ({ ...s, opened: !s.opened }) );


    function button(node: HTMLElement) {

        trigger = node;

        return unify([
            setAttribute( node, { role:'button', type:'button', 'aria-haspopup':'true', 'aria-controls':get( store ).id } ),
            trackAttribute( node, { attribute: 'aria-expanded', store, value:(s) => s.opened + '' }),
            listen(node, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("click toggle")
                toggle();
                
                
            }, true ),
            keydown( node, ( e:KeyboardEvent ) => {
                if( e.key == 'Escape' ) close();
            })
        ]);
    }

    async function autoFocus(node:HTMLElement) {
        await tick();
        if( get( store ).opened ) node.focus();
    }


    return {
        open,
        close,
        toggle,
        button,
        autoFocus,
        trigger:() => trigger,
        subscribe,
        set,
        update,
    }

}


