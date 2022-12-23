<script lang="ts">
import { Html } from '@lernetz/svelte-slate';
import {generate} from '../textGenerator';


let content:any[] = [];

function randomText() {
    content = generate( { type:'p', mode:'paragraph', num:20 } );
}


</script>

<button on:click={ e => randomText() } class="bg-blue-600 text-white text-14 px-8 py-4">Random Text</button>

<Html bind:content></Html>

