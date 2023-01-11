import isHotkey from "is-hotkey";
import { Editor as SlateEditor, Text, Transforms } from "slate";
import type { TypeEditor } from "./Type";
import { Editor } from "../Editor";


const LIST_TYPES = [ 'ul', 'ol' ];


export function List( editor: Editor & TypeEditor ) {

    const { setType, removeType, events } = editor;


    editor.setType = ( type: string ) => {

        // regular set type
        if( !LIST_TYPES.includes( type ) ) return setType( type );

        setType( 'li' );
        const block = { type: type, children: [] };
        Transforms.wrapNodes( editor.slate, block );
    };


    editor.removeType = ( type ) => {
        // regular remove type
        if( !LIST_TYPES.includes( type ) ) return removeType( type );

        removeType( type );
        setType( 'p' );
    };


    const { onKeyDown } = events;

    events.onKeyDown = ( e ) => {

        // check for enter in empty list elements
        if( isHotkey( 'enter', e ) && editor.isTypeActive( 'li' ) ) {
            const [ match ] = SlateEditor.nodes<Text>( editor.slate, { mode: 'lowest' } );

            // check if li text node is empty
            if( match[ 0 ]?.text == '' ) {

                Transforms.liftNodes( editor.slate );

                // if are not in a list anymore turn li into p
                if( !( editor.isTypeActive( 'ol' ) || editor.isTypeActive( 'ul' ) ) ) {
                    editor.setType( 'p' );
                }

                e.preventDefault();
                return;
            }
        }
        onKeyDown( e );
    };

    return editor;

}
