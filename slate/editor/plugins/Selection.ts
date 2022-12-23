import { Range, Selection, Transforms } from "slate";
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
    let oldSelection;


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
        return compareSelection( editor.dom.getSelection(), editor.slate.selection );
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

        onSlateChange();

        // check if selection has change
        if( !compareSelection( oldSelection, editor.slate.selection ) ) {
            // update selection to the outside
            editor.dom.updateSelection( editor.slate.selection );
            // svelte component content is only updated after tick
            await tick();
            // update selection to dom after slate change
            editor.selectionToDom();
        }
    };

    return editor;
}


function compareSelection( a:Selection, b:Selection ) {

    // compare ranges
    if( Range.isRange( a ) && Range.isRange( b ) ) return Range.equals( a, b );

    // compare if both are null or different
    return a == b;
}






