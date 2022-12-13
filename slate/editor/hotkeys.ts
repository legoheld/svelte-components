import { isKeyHotkey } from "is-hotkey";


// simplified version from https://github.com/ianstormtaylor/slate/blob/master/packages/slate-react/src/utils/hotkeys.ts
// skip OS check for now - just add all shortcuts

export var deleteBackward = isKeyHotkey( [
    // generic
    'shift?+backspace',
    // apple
    'ctrl+backspace', 'ctrl+h'
] );

export var deleteForward = isKeyHotkey( [
    // generic
    'shift?+delete',
    // apple
    'ctrl+delete', 'ctrl+d'
] );

export var deleteLineBackward = isKeyHotkey( [
    // apple
    'cmd+shift?+backspace'
] );

export var deleteLineForward = isKeyHotkey( [
    // apple
    'cmd+shift?+delete', 'ctrl+k'
] );

export var deleteWordBackward = isKeyHotkey( [
    // apple
    'opt+shift?+backspace',
    // windows
    'ctrl+shift?+backspace'
] );

export var deleteWordForward = isKeyHotkey( [
    // apple
    'opt+shift?+delete',
    // windows
    'ctrl+shift?+delete'
] );



