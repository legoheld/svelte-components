import { Editor as SlateEditor, Transforms, Range, Element, Node } from "slate";
import isUrl from 'is-url';
import type { InsertEditor } from "./Insert";
import type { PasteEditor } from "./Paste";
import type { TypeElement } from './Type';
import { Editor } from '../Editor';

export interface LinkElement extends TypeElement {
    type: string,
    url: string,
    target: string,
}


export interface LinkEditor {
    insertLink( url: string, target );
    removeLink();
}

export function Link( base: Editor & InsertEditor & PasteEditor ) {

    // METHODS
    const editor = base as Editor & InsertEditor & PasteEditor & LinkEditor;

    const { insertData, insertText } = editor;
    const { isInline } = editor.slate;

    editor.slate.isInline = ( element: Element ) => {
        return element.type === 'a' ? true : isInline( element );
    };

    editor.insertText = text => {
        if( text && isUrl( text ) ) {
            wrapLink( editor.slate, text );
        } else {
            insertText( text );
        }
    };

    editor.insertData = data => {
        const text = data.getData( 'text/plain' );

        if( text && isUrl( text ) ) {
            wrapLink( editor.slate, text );
        } else {
            insertData( data );
        }
    };


    editor.insertLink = ( url, target?) => {
        if( editor.slate.selection ) wrapLink( editor.slate, url, target );
    };

    editor.removeLink = () => {
        if( isLinkActive( editor.slate ) ) {
            unwrapLink( editor.slate );
        }
    };



    return editor;
}




const isLinkActive = editor => {
    const [ link ] = SlateEditor.nodes( editor, { match: ( n: Node ) => Element.isElement( n ) && n.type === 'a' } );
    return !!link;
};

const unwrapLink = editor => {
    Transforms.unwrapNodes( editor, { match: ( n: Node ) => Element.isElement( n ) && n.type === 'a' } );
};

const wrapLink = ( editor, url: string, target: string = '_blank' ) => {
    if( isLinkActive( editor ) ) {
        unwrapLink( editor );
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed( selection );
    const link = {
        type: 'a',
        url,
        target,
        children: isCollapsed ? [ { text: url } ] : [],
    };

    if( isCollapsed ) {
        Transforms.insertNodes( editor, link );
    } else {
        Transforms.wrapNodes( editor, link, { split: true } );
        Transforms.collapse( editor, { edge: 'end' } );
    }

    Transforms.move( editor, { unit: 'offset', distance: 1 } ); // go outside of Link.
};
