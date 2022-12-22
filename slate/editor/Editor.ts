import { createEditor, Editor as SlateEditor, Element, Range } from 'slate';

export interface DomContract {
    getSelection: () => Range;
    setSelection: ( r: Range ) => void;
    onChange: ( content: Element[] ) => void;
}

export interface EditorPlugin<TOut, TIn extends Editor = Editor> {
    ( e: TIn ): TOut;
}

interface EditorEvents {
    onKeyDown: ( e: KeyboardEvent ) => void;
    onKeyUp: ( e: KeyboardEvent ) => void;
    onKeyPress: ( e: KeyboardEvent ) => void;
    onPaste: ( e: ClipboardEvent ) => void;
    onCut: ( e: ClipboardEvent ) => void;
    onCompositionEnd: ( e: CompositionEvent ) => void;
    onSelectionChange: ( e: Event ) => void;
    onSlateChange: () => void;
}

export class Editor {

    slate: SlateEditor;
    events: EditorEvents;
    dom: DomContract;

    constructor() {
        this.slate = createEditor();
        this.events = {
            onKeyDown: ( e: KeyboardEvent ) => { },
            onKeyUp: ( e: KeyboardEvent ) => { },
            onKeyPress: ( e: KeyboardEvent ) => { },
            onCompositionEnd: ( e: CompositionEvent ) => { },
            onPaste: ( e: ClipboardEvent ) => { },
            onCut: ( e: ClipboardEvent ) => { },
            onSelectionChange: ( e: Event ) => { },
            onSlateChange: () => {
                this.dom.onChange( JSON.parse( JSON.stringify( this.slate.children ) ) );
            }
        };

        // trigger slate changes
        this.slate.onChange = () => {
            this.events.onSlateChange();
        };
    }

    plugin<B>( plugin: EditorPlugin<B, this> ) {
        return plugin( this ) as this & B;
    }
}
