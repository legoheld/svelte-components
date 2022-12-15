import { IFrameOptions, Provider } from "../embed";
import { code } from "./code";

/**
 * A provider that queries iframely for the oembed / iframe settings
 */

export function iframely( url: string ): Provider {

    return async function check( input ): Promise<void | IFrameOptions> {
        try {
            let result = await fetch( url + '/iframely?uri=' + encodeURIComponent( input ) ).then( res => res.json() );
            if( result && result.html ) {

                // parse the html result of iframely
                return code( result.html );
            }
        } catch( e ) {
            return;
        }
    };

}
