import { get, writable } from 'svelte/store';
import { unifyDestroy } from './actions/action';
import { ariaButton, setAttribute, trackAttribute } from './actions/attribute';
import { listen } from './actions/events';


export interface Modal {
    open: () => void,
    close: () => void,
    toggle: () => void,
    button: (node: HTMLElement) => void,
    trigger: () => HTMLElement,
    subscribe: () => void,
}

export function createModal() {

    const store = writable({ opened: false });
    let trigger:HTMLElement;

    const open = () => store.set({ opened: true });
    const close = () => store.set({ opened: false });
    const toggle = () => store.set({ opened: !get(store).opened });


    function button(node: HTMLElement) {

        trigger = node;

        return unifyDestroy([
            setAttribute( node, { role:'button', type:'button', 'aria-haspopup':'true' } ),
            trackAttribute( node, { attribute: 'aria-expanded', store, value:(s) => s.opened + '' }),
            listen(node, 'mouseover', open),
            listen(node, 'mouseleave', close)
        ]);
    }


    return {
        open,
        close,
        toggle,
        button,
        trigger:() => trigger,
        subscribe: store.subscribe
    }

}


