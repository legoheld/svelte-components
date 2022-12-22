<script lang="ts">
import { Html } from '@lernetz/svelte-slate';
import {generate} from '../textGenerator';


let content:any[] = [];

function randomText() {
    content = generate( { type:'p', mode:'paragraph', num:20 } );
    console.log( content );
}


</script>

<button on:click={ e => randomText() } class="bg-blue-600 text-white text-sm">Random Text</button>

<Html bind:content></Html>

