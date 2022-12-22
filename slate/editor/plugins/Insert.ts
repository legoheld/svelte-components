import { Editor as SlateEditor } from "slate";
import { Editor } from "../Editor";
import isHotkey from 'is-hotkey';




export interface InsertEditor {
    insertText( text: string );
    insertBreak();
}




export function Insert( base: Editor ) {

    // METHODS
    const editor = base as Editor & InsertEditor;

    editor.insertText = function( text: string ) {
        SlateEditor.insertText( editor.slate, text );
    };

    editor.insertBreak = function() {
        SlateEditor.insertBreak( editor.slate );
    };


    // EVENTS
    const { events } = editor;
    const { onKeyDown } = events;

    events.onKeyDown = ( e ) => {

        if( isHotkey( 'enter', e ) ) {
            e.preventDefault();
            editor.insertBreak();
        }

        onKeyDown( e );
    };

    events.onKeyPress = ( e ) => {
        e.preventDefault();
        editor.insertText( e.key );
    };

    events.onCompositionEnd = ( e ) => {
        e.preventDefault();
        editor.insertText( e.data );
    };

    return editor;
}


