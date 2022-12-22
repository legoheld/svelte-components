import { IFrameOptions, Provider } from "../embed";

/**
 * Returns iframe options from <iframe ....> code
 * @param input
 */
export function code( input: string ): ReturnType<Provider> {

    // test if its iframe code
    if( !input.match( /<iframe[^\0]+?<\/iframe>/gm ) ) return;

    let result = optionalMatch( input, {
        src: /src="(.*?)"/,
        width: /width="(.*?)"/,
        height: /height="(.*?)"/,
        frameborder: /frameborder="(.*?)"/,
        allow: /allow="(.*?)"/,
        title: /title="(.*?)"/,
        sandbox: /sandbox="(.*?)"/,
        allowfullscreen: /allowfullscreen/,
    });

    // calculate ratio
    const ratio = calcRatio( result.width, result.height );
    if( ratio ) result.ratio = ratio;

    
    if( result.src ) {
        
        // some embed codes have the & in the source as html entity &amp;
        result.src = result.src.replaceAll( '&amp;', '&' );
        
        return result as IFrameOptions;
    }

    return;
}




export function optionalMatch( input: string, matches: { [ key: string ]: RegExp; } ):any {
    let res = {};
    Object.keys( matches ).forEach( key => {
        let match = input.match( matches[ key ] );
        if( match ) res[ key ] = match.length == 1 ? true : match[ 1 ];
    } );
    return res;
}


export function calcRatio( width:string, height:string ) {
    const w = parseValue( width );
    const h = parseValue( height );
    if( !isNaN( w ) && !isNaN( h ) ) return w / h;
}


function parseValue( s:string ) {
    // we can not parse percentage
    if( s?.indexOf( '%' ) >= 0 ) return NaN;

    return  parseInt( s?.replace( 'px','' ).trim() );
}

