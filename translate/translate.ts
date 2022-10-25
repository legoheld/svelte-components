import { interpolate } from "@lernetz/common";
import { derived, get, writable } from "svelte/store";

export const locale = writable( "de" );



const rangeSign = '...';
const greaterSign = '+';
const translations: KeyObject = {};



interface KeyObject {
    [ key: string ]: object;
}

interface TranslateOptions {
    values?: {
        [ key: string ]: string;
    },
    count?: number;
}


function translate( locale, key?, options?: TranslateOptions ) {

    let trans = propLookup( translations, key ? locale + '.' + key : locale );

    // check for plural forms
    if( options.count !== undefined && typeof trans === 'object' ) trans = plural( trans, options.count );

    // interpolate values
    if( options.values && typeof trans === 'string' ) trans = interpolate( trans, options.values );

    return trans || key;
}



export const t = derived( locale, ( $locale ) => ( key, options: TranslateOptions = {} ) =>
    translate( $locale, key, options )
);

export function set( translations: KeyObject ): void;
export function set( local: string, translation: object ): void;
export function set( local: string, translation: () => Promise<object> ): void;
export function set( l: string | KeyObject, translation?: object | ( () => Promise<object> ) ) {

    // handle if all translations are set
    if( typeof l !== 'string' ) {
        Object.assign( translations, l );
        return;
    }

    // handle locale and object signature
    if( typeof translation == 'object' ) {
        translations[ l ] = translation;
        if( get( locale ) == l ) locale.set( l );
        return;
    }

    // handle promise
    translation().then( obj => {
        translations[ l ] = obj;
    } );
}


export function has( locale: string ) {
    return !!translations[ locale ];
}


/**
 *
 * @param rules The object containing plural definitions
 * @param count the value to evaluate against
 * @returns The translation based on the rules and count value
 */
function plural( rules: { [ key: string ]: string; }, count: number ) {

    for( const key of Object.keys( rules ) ) {

        // handle exact match
        if( parseInt( key ) == count ) return rules[ key ];

        // handle range
        if( key.includes( rangeSign ) ) {
            const [ min, max ] = key.split( rangeSign ).map( n => parseInt( n ) );
            if( min <= count && count <= max ) return rules[ key ];
        }

        // handle greater than
        if( key.includes( greaterSign ) ) {
            if( count >= parseInt( key ) ) return rules[ key ];
        }
    }
}




/**
 * @param obj The object to look for the property under path
 * @param path The path with . syntax
 * @returns The child property under the given path
 */
function propLookup( obj, path: string ) {
    return path.split( '.' ).reduce( ( acc, part, index, full ) => {

        if( typeof acc !== 'object' ) return acc;

        // support dots in keys
        let trail = full.slice( index ).join( '.' );

        return acc[ trail ] || acc[ part ];
    }, obj );
}
