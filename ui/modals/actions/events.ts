export function clickOutside( node:HTMLElement, fn:() => void ) {

    function handler( e:MouseEvent ) {

        if ((e as PointerEvent).pointerType === '') return // ignore space as click

        if (node && !node.contains(e.target as Node)) {
            if (node.clientWidth) {
                e.preventDefault()
                e.stopPropagation()
                fn();
            }
        }
    }

    return listen( document.documentElement, 'click', handler, true );
}



export function listen<K extends keyof HTMLElementEventMap>( node:HTMLElement, type:K, handler: (event: HTMLElementEventMap[K]) => void, capture = false ) {
    node.addEventListener( type, handler, capture );
    return {
        destroy() {
            node.removeEventListener( type, handler, capture );
        }
    }
}