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
    } );

    if( result.src ) return result as IFrameOptions;

    return;
}




function optionalMatch( input: string, matches: { [ key: string ]: RegExp; } ): Partial<IFrameOptions> {
    let res = {};
    Object.keys( matches ).forEach( key => {
        let match = input.match( matches[ key ] );
        if( match ) res[ key ] = match.length == 1 ? true : match[ 1 ];
    } );
    return res;
}
