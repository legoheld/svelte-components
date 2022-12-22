import { Editor as SlateEditor, Element, Transforms, BaseElement } from "slate";
import { Editor } from "../Editor";

export interface TypeElement extends BaseElement {
    type: string;
}


/**
 * A slate plugin that allows to change the type of a node at a specified location
 */

export interface TypeEditor extends SlateEditor {
    isTypeActive( type: string ): boolean;
    toggleType( type: string );
    setType( type: string );
    removeType( type: string );
}


export function Type( base: Editor ) {
    const editor = base as Editor & TypeEditor;

    // METHODS
    editor.toggleType = ( type: string ) => {
        if( editor.isTypeActive( type ) ) {
            editor.removeType( type );
        } else {
            editor.setType( type );
        }
    };

    editor.setType = ( type: string ) => {
        Transforms.setNodes( editor.slate, { type } );
    };

    editor.removeType = ( type: string ) => {
        Transforms.unwrapNodes( editor.slate, {
            match: n =>
                !SlateEditor.isEditor( n ) &&
                Element.isElement( n ) &&
                n.type == type,
            split: true,
        } );
    };

    editor.isTypeActive = ( type: string ) => {

        const { selection } = editor.slate;
        if( !selection ) return false;

        const [ match ] = SlateEditor.nodes( editor.slate, {
            at: SlateEditor.unhangRange( editor.slate, selection ),
            match: n =>
                !SlateEditor.isEditor( n ) && Element.isElement( n ) && n.type === type,
        } );

        return !!match;
    };

    return editor;
}
