import { Editor as SlateEditor } from "slate";
import { Editor } from '../Editor';



export interface StyleEditor {
    toggleStyle( style: string );
    isStyleActive( style: string ): boolean;
}


export function Style( base: Editor, hotkeys: { [ key: string ]: string; } = {} ) {

    const editor = base as Editor & StyleEditor;

    // METHODS
    editor.toggleStyle = function( style: string ) {
        const marks = SlateEditor.marks( editor.slate );
        if( marks && marks[ style ] ) {
            SlateEditor.removeMark( editor.slate, style );
        } else {
            SlateEditor.addMark( editor.slate, style, true );
        }
    };

    editor.isStyleActive = ( style: string ) => {
        const marks = SlateEditor.marks( editor.slate );
        return marks ? marks[ style ] === true : false;
    };


    return editor;
}
