import { isKeyHotkey } from "is-hotkey";


// simplified version from https://github.com/ianstormtaylor/slate/blob/master/packages/slate-react/src/utils/hotkeys.ts
// skip OS check for now - just add all shortcuts

export const deleteBackward = isKeyHotkey( [
    // generic
    'shift?+backspace',
    // apple
    'ctrl+backspace', 'ctrl+h'
] );

export const deleteForward = isKeyHotkey( [
    // generic
    'shift?+delete',
    // apple
    'ctrl+delete', 'ctrl+d'
] );

export const deleteLineBackward = isKeyHotkey( [
    // apple
    'cmd+shift?+backspace'
] );

export const deleteLineForward = isKeyHotkey( [
    // apple
    'cmd+shift?+delete', 'ctrl+k'
] );

export const deleteWordBackward = isKeyHotkey( [
    // apple
    'opt+shift?+backspace',
    // windows
    'ctrl+shift?+backspace'
] );

export const deleteWordForward = isKeyHotkey( [
    // apple
    'opt+shift?+delete',
    // windows
    'ctrl+shift?+delete'
] );

export const cutText = isKeyHotkey( [
    // apple
    'cmd+x',
    // windows
    'ctrl+x'
] );




