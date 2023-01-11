import type { BaseElement, BaseText } from "slate";
import { Editor } from "./editor/Editor";
import { Cut, Delete, Hotkey, Insert, Link, List, Paste, Selection, Style, Type } from "./editor/plugins";



// default editor with all plugins enabled
export function defaultEditor() {
    return new Editor()
       .plugin( Selection )
       .plugin( Insert )
       .plugin( Delete )
       .plugin( Paste )
       .plugin( Style )
       .plugin( Type )
       .plugin( List )
       .plugin( Cut )
       .plugin( Hotkey( {
           'mod+b': ( e ) => e.toggleStyle( 'bold' ),
           'shift+enter': ( e ) => e.insertText( '\n' ),
       } ) )
       .plugin( Link );
}



export interface TypeElement extends BaseElement {
    type: string;
};
export interface LinkElement extends TypeElement {
    url: string,
    target: string,
}
export interface TextElement extends BaseText {
    bold?: true,
    italic?: boolean;
}


/* Add this module declaration in your project for custom slate elements
declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor;
        Element: TypeElement | LinkElement;
        Text: TextElement;
    }
}
*/

