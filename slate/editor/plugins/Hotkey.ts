import { Editor } from '../Editor';
import isHotkey from 'is-hotkey';

export interface HotkeyDefinition<T> {
    [ key: string ]: ( editor: T ) => void;
}
export function Hotkey<T extends Editor>( hotkeys: HotkeyDefinition<T> ) {

    return function test( editor: T ): T {

        // EVENTS
        const { events } = editor;
        const { onKeyDown } = events;

        events.onKeyDown = ( e ) => {

            // test over all defined hotkeys
            Object.keys( hotkeys ).forEach( ( key ) => {
                if( isHotkey( key, e ) ) {
                    e.preventDefault();
                    hotkeys[ key ]( editor );
                }
            } );

            onKeyDown( e );
        };

        return editor;
    };

}
