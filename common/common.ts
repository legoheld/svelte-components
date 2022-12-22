
/**
 * @param text The text containing {...} placeholder
 * @param values The values to inject into placeholder
 * @returns The replaced text
 */
export function interpolate( text: string, values: { [ key: string ]: string; } ) {
    return text.replace( /{(.*?)}/g, ( match: string, $1: string ) => {
        return values[ $1.trim() ] || '';
    } );
}



/**
 * Helper function that traverses a data structure with depth/child first and
 * invokes the given closure on every item in structure.
 * @param data The data to traverse on
 * @param func The closure function to invoke on every item - make sure to return an item
 * @returns The same data after traversation. If the closure returns different items the returned data is mapped.
 */
export function depthFirst( data: any, func: ( d: any ) => any ) {

    // handle arrays
    if( Array.isArray( data ) ) return func( data.map( item => depthFirst( item, func ) ) );

    // handle objects
    if( typeof data === 'object' && data != undefined ) {
        Object.keys( data ).forEach( key => {
            data[ key ] = depthFirst( data[ key ], func );
        } );
    }

    return func( data );
}
