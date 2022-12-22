import { Editor as SlateEditor, Transforms } from "slate";
import { Editor } from '../Editor';
import { deleteBackward, deleteForward, deleteWordBackward, deleteWordForward, deleteLineBackward, deleteLineForward } from "../hotkeys";




export interface DeleteEditor {
    delete( reverse: boolean );
    deleteWord( reverse: boolean );
    deleteLine( reverse: boolean );
};


export function Delete( base: Editor ) {

    // METHODS
    const editor = base as Editor & DeleteEditor;

    editor.delete = function( reverse: boolean ) {
        Transforms.delete( editor.slate, { unit: 'character', reverse } );
    };

    editor.deleteWord = function( reverse: boolean ) {
        Transforms.delete( editor.slate, { unit: 'word', reverse } );
    };

    editor.deleteLine = function( reverse: boolean ) {
        Transforms.delete( editor.slate, { unit: 'line', reverse } );
    };


    // EVENTS
    const { events } = editor;
    const { onKeyDown } = events;


    events.onKeyDown = ( e ) => {

        if( deleteBackward( e ) ) {
            e.preventDefault();
            editor.delete( true );
        }
        if( deleteForward( e ) ) {
            e.preventDefault();
            editor.delete( false );
        }


        if( deleteWordBackward( e ) ) {
            e.preventDefault();
            editor.deleteWord( true );
        }
        if( deleteWordForward( e ) ) {
            e.preventDefault();
            editor.deleteWord( false );
        }

        if( deleteLineBackward( e ) ) {
            e.preventDefault();
            editor.deleteLine( true );
        }
        if( deleteLineForward( e ) ) {
            e.preventDefault();
            editor.deleteLine( false );
        }

        onKeyDown( e );
    };

    return editor;
}




