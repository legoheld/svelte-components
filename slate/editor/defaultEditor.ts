import { Editor } from "./Editor";
import { Delete, Hotkey, Insert, Link, List, Paste, Selection, Style, Type } from "./plugins";


export const defaultEditor = new Editor()
    .plugin( Selection )
    .plugin( Insert )
    .plugin( Delete )
    .plugin( Paste )
    .plugin( Style )
    .plugin( Type )
    .plugin( List )
    .plugin( Hotkey( {
        'mod+b': ( e ) => e.toggleStyle( 'bold' ),
    } ) )
    .plugin( Link );



