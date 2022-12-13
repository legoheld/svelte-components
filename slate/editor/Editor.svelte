<script lang="ts" context="module">
    export function rootNode( n:Node ) {
        const root = n.getRootNode();
        if( ( root instanceof Document || root instanceof ShadowRoot) && root['getSelection'] != null ) return root;
        return n.ownerDocument;
    }
</script>

<script lang="ts">
    import { Element, Range, Selection } from "slate";

    import { onMount } from "svelte";
    import { nodes as defaultNodes } from "../html/defaults";
    import Html from "../html/Html.svelte";
    import { Editor as BaseEditor } from './Editor';


    let html:Html;
    let ref:Node;

    export let content:Element[];
    export let editor:BaseEditor;
    export let selection:Selection;
    export let nodes = defaultNodes;

    onMount( () => {

        editor.slate.children = content;

        let root = rootNode( ref ) as Document;
        editor.dom = {
            getSelection,
            setSelection,
            onChange: ( c ) => {
                selection = editor.slate.selection;
                content = c;
            }
        }

        // listen to selection changes in the whole document
        root.addEventListener( 'selectionchange', async ( e ) => {
            editor.events.onSelectionChange( e )
        });

    })


    /**
     * Turns a native selection into a slate selection
     */
    function getSelection():Range {

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


    function setSelection( r:Range ) {

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


</script>

<div contenteditable="true" style="white-space: pre-wrap; overflow-wrap: break-word;"
    bind:this={ref}
    on:keydown={editor.events.onKeyDown}
    on:keyup={editor.events.onKeyUp}
    on:keypress={editor.events.onKeyPress}
    on:compositionend={editor.events.onCompositionEnd}
    on:paste={editor.events.onPaste}
    on:cut={editor.events.onCut}>
    <Html bind:content bind:this={html} nodes={nodes}></Html>
</div>
