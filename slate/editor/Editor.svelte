<script lang="ts">
    import type { Descendant, Selection } from "slate";
    import { Element, Range } from "slate";

    import { onMount, createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import { types as defaultTypes } from "../html/defaults";
    import Html from "../html/Html.svelte";
    import { rootNode } from './utils';
    import { Editor as BaseEditor } from './Editor';


    let html:Html;
    let ref:HTMLElement;
    let skipNextUpdate:boolean;
    let dispatcher = createEventDispatcher<{
        change:{slate:Descendant[],html:string},
    }>();

    export let content:Descendant[];
    export let editor:BaseEditor;
    export let selection:Selection = undefined;
    export let types = defaultTypes;

    onMount( () => {

        let root = rootNode( ref ) as Document;
        editor.dom = {
            getSelection,
            setSelection,
            updateContent: ( c ) => {

                // to break the next update in the `$: {}` expression we will flag 
                // otherwise it will set selection to undefined, that should only be happen when setting content from outside!
                skipNextUpdate = true;
                content = JSON.parse( JSON.stringify( c ) );
            },
            updateSelection: (s) => {
                selection = s;
            }
        }

        // listen to selection changes in the whole document
        root.addEventListener( 'selectionchange', async ( e ) => {
            editor.events.onSelectionChange( e )
        });

    })



    $: {
        // TODO: Optimize 
        // Is there a way to update a prop from inside without dirty it, so it will not execute this statement.
        // the editor.slate.selection should only be reset/undefined when changing the content from outside.
        if( skipNextUpdate ) {
            skipNextUpdate = false;
        } else {
            editor.slate.selection = selection = undefined;
            editor.slate.children = JSON.parse( JSON.stringify( content ) );
        }
    }
    /**
     * Turns a native selection into a slate selection
     */
    function getSelection():Selection {

        if( !ref ) return;

        let root = rootNode( ref ) as Document;
        let selection = root.getSelection();

        // no native selection
        if( selection.anchorNode == null && selection.focusNode == null ) return;

        let anchorPath = html.pathOf( selection.anchorNode );
        let focusPath = html.pathOf( selection.focusNode );

        // no selection within this editor
        if( !(anchorPath && focusPath) ) return

        return {
            anchor: {
                path: anchorPath,
                offset: ( selection.anchorNode?.textContent == '\uFEFF' ) ? 0 : selection.anchorOffset
            },
            focus: {
                path: focusPath,
                offset: ( selection.focusNode?.textContent == '\uFEFF' ) ? 0 : selection.focusOffset
            }
        }
    }


    function setSelection( r:Selection ) {

        if( !r ) return;

        let range = document.createRange();
        let anchor = html.nodeOf( r.anchor.path ) as any;
        let focus = html.nodeOf( r.focus.path ) as any;

        // clamp offset to available text node length
        let focusOffset = Math.min( Math.max( r.focus.offset, 0 ), focus.length );
        let anchorOffset = Math.min( Math.max( r.anchor.offset, 0 ), anchor.length );

        if( Range.isBackward( r ) ) {
            range.setStart( focus, focusOffset );
            range.setEnd( anchor, anchorOffset );
        } else {
            range.setStart( anchor, anchorOffset );
            range.setEnd( focus, focusOffset );
        }

        let root = rootNode( ref ) as Document;
        let domSelection = root.getSelection();
        domSelection.removeAllRanges();
        domSelection.addRange( range );
    }

    function dispatchChange() {
        dispatcher( 'change', { slate:content, html:ref.innerHTML } );
    }

  

</script>

<div contenteditable="true" style="white-space: pre-wrap; overflow-wrap: break-word;"
    bind:this={ref}
    on:keydown={editor.events.onKeyDown}
    on:keyup={editor.events.onKeyUp}
    on:keypress={editor.events.onKeyPress}
    on:compositionend={editor.events.onCompositionEnd}
    on:blur={dispatchChange}
    on:paste={editor.events.onPaste}
    on:cut={editor.events.onCut}>
    <Html bind:this={html} types={types} content={content}></Html>
</div>
