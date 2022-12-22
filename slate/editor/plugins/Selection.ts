import { Range, Transforms } from "slate";
import { tick } from "svelte";
import { Editor } from "../Editor";



export interface MoveOptions {
    distance?: number,
    unit?: 'offset' | 'character' | 'word' | 'line',
    reverse?: boolean,
    edge?: 'anchor' | 'focus' | 'start' | 'end';
}



export interface SelectEditor {
    selectionToDom();
    selectionToSlate();
    moveSelection( options: MoveOptions );
    deselect();
    isSelectionSync();
}


export function Selection( base: Editor ) {

    const editor = base as Editor & SelectEditor;


    // METHODS
    editor.selectionToDom = () => {

        if( editor.isSelectionSync() ) return;

        editor.dom.setSelection( editor.slate.selection );
    };



    editor.selectionToSlate = () => {

        if( editor.isSelectionSync() ) return;

        let current = editor.dom.getSelection();

        if( current ) {
            Transforms.select( editor.slate, current );
        } else {
            Transforms.deselect( editor.slate );
        }
    };



    editor.moveSelection = ( options: MoveOptions ) => {
        Transforms.move( editor.slate, options );
    };



    editor.deselect = () => {
        Transforms.deselect( editor.slate );
    };



    editor.isSelectionSync = () => {

        let dom = editor.dom.getSelection();
        let slate = editor.slate.selection;

        if( Range.isRange( dom ) && Range.isRange( slate ) ) return Range.equals( dom, slate );

        return dom == slate;

    };



    // EVENTS
    const { events } = editor;
    const { onSelectionChange, onSlateChange, onCut } = events;

    events.onSelectionChange = ( e ) => {
        editor.selectionToSlate();
        onSelectionChange( e );
    };



    // add selection rendering after change
    events.onSlateChange = async () => {
        // will rerender content
        onSlateChange();
        // svelte component content is only updated after tick
        await tick();
        // update selection to dom after slate change
        editor.selectionToDom();
    };

    return editor;
}






