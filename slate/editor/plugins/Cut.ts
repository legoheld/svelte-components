import { Editor as SlateEditor } from 'slate';
import { Editor } from '../Editor';
import { cutText } from '../hotkeys';

export function Cut( editor: Editor ) {

    // EVENTS
    const { events } = editor;
    const { onCut, onKeyDown } = events;

    events.onKeyDown = ( e ) => {

        // check for cut shortcut
        if( cutText( e ) ) {
            e.preventDefault();
            cutToClipboard( editor );
        }

        onKeyDown( e );
    };

    events.onCut = ( e ) => {

        e.preventDefault();
        cutToClipboard( editor, e );

        onCut( e );
    };

    return editor;
}


function cutToClipboard( editor: Editor, event?: ClipboardEvent ) {
    const text = editor.slate.selection ? SlateEditor.string( editor.slate, editor.slate.selection ) : "";
    if( event && event.clipboardData ) {
        event.clipboardData.setData( "text/plain", text );
    } else {
        navigator.clipboard.write( [ new ClipboardItem( { "text/plain": text } ) ] );
    }
    editor.slate.deleteFragment();
}

