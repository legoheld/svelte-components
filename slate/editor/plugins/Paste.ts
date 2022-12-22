import { Editor as SlateEditor, Transforms } from "slate";
import { Editor } from '../Editor';


export interface PasteEditor {
    insertData( data: DataTransfer );
}



export function Paste( base: Editor ) {

    const editor = base as Editor & PasteEditor;


    // METHODS
    editor.insertData = function( data: DataTransfer ) {

        const text = data.getData( 'text/plain' );

        if( text ) {
            const lines = text.split( /\r\n|\r|\n/ );
            let split = false;

            for( const line of lines ) {
                if( split ) Transforms.splitNodes( editor.slate, { always: true } );
                SlateEditor.insertText( editor.slate, line );
                split = true;
            }
        }
    };

    // EVENTS
    const { events } = editor;
    const { onPaste } = events;

    events.onPaste = ( e ) => {

        if( e.clipboardData ) {

            e.preventDefault();

            editor.insertData( e.clipboardData );
        }

        onPaste( e );
    };

    return editor;
}
