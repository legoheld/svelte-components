<script lang="ts">
    import type { Selection } from "slate";
    import { Editor } from '@lernetz/svelte-slate';
    import { defaultEditor } from '@lernetz/svelte-slate/defaults';
    import { generate } from "../textGenerator";
    import { writable } from 'svelte/store';
    
    let content = [
        { type:'p', children: [
            { text:"Paragraph " },
            { text:"Demo" }
        ]},
    ];

    let editor = defaultEditor();
    let selection:Selection = undefined;

    let isBold:boolean = false;
    let isItalic:boolean = false;
    let isUL:boolean = false;
    let isOL:boolean = false;

    $:{
        // change on selection
        let test = selection;
        isBold = editor.isStyleActive( 'bold' );
        isItalic = editor.isStyleActive( 'italic' );
        isOL = editor.isTypeActive( 'ol' );
        isUL = editor.isTypeActive( 'ul' );
    }


    function randomText() {
        content = generate( { type:'p', mode:'paragraph', num:1 } );
    }
    
    
</script>

<button class="bg-blue-600 text-white text-14 px-8 py-4" on:click={ () => randomText() }>Random Text</button>
<hr class="my-12">
<div on:mousedown={ e => e.preventDefault() }>
    <button class:bg-red-400={ isBold } on:click={ () => editor.toggleStyle( 'bold' ) }>bold</button>
    <button class:bg-red-400={ isItalic } on:click={ () => editor.toggleStyle( 'italic' ) }>italic</button>
    <button class:bg-red-400={ isUL } on:click={ () => editor.toggleType( 'ul' ) }>ul</button>
    <button class:bg-red-400={ isOL } on:click={ () => editor.toggleType( 'ol' ) }>ol</button>
</div>
<hr class="my-12">

<Editor content={content} bind:editor bind:selection></Editor>

<hr class="my-12">
{ JSON.stringify( selection ) }

    
    