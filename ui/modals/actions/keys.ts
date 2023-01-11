import { listen } from "./events";


export const ArrowLeft = 'ArrowLeft'
export const ArrowUp = 'ArrowUp'
export const ArrowRight = 'ArrowRight'
export const ArrowDown = 'ArrowDown'



export function keyUpDown( node:HTMLElement, options:{ up:( e:KeyboardEvent ) => void, down:( e:KeyboardEvent ) => void } ) {
    return keydown( node, ( e ) => {
        if( e.key == ArrowUp ) options.up( e );
        if( e.key == ArrowDown ) options.down( e );
    })
}



export function keydown( node:HTMLElement, fn:( e:KeyboardEvent ) => void ) {
    return listen( node, 'keydown', (e:KeyboardEvent ) => {
        fn( e );
    })
  }