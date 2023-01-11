import type { Writable } from "svelte/store";


export function isWritable<T = unknown>( store: any ): store is Writable<T> {
    return ( store
        && typeof store === 'object'
        && 'subscribe' in store
        && 'set' in store
        && 'update' in store
        && typeof store.subscribe === 'function'
        && typeof store.set === 'function'
        && typeof store.update === 'function'
    );
}
