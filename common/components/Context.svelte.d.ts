import { SvelteComponentTyped } from 'svelte';

export interface ContextProps {
    [ key: string ]: any;
}


export default class Context extends SvelteComponentTyped<ContextProps, {}, {}> { }
