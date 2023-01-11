import { createEditor, type Descendant, Editor as SlateEditor, Element, Range, type Selection } from 'slate';

export interface DomContract {
    getSelection: () => Range;
    setSelection: ( r: Selection ) => void;
    updateSelection:( c:Selection ) => void;
    updateContent:( c:Descendant[] ) => void;
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

    private oldContent:Descendant[];

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
            onSlateChange: () => {}
        };

        // trigger slate changes
        this.slate.onChange = () => {

            // check if content has chnaged
            let newContent = this.slate.children;
            if( this.oldContent != newContent ) {
                this.dom.updateContent( newContent );
                this.oldContent = newContent;
            }

            // trigger event for plugins
            this.events.onSlateChange();
        };

    }

    plugin<B>( plugin: EditorPlugin<B, this> ) {
        return plugin( this ) as this & B;
    }
}
