import { IFrameOptions, Provider } from "../embed";
import { code, optionalMatch } from "./code";

/**
 * A provider that queries iframely for the oembed / iframe settings
 */

export function iframely( url: string ): Provider {

    return async function check( input ): Promise<void | IFrameOptions> {
        try {
            let result = await fetch( url + '/iframely?uri=' + encodeURIComponent( input ) ).then( res => res.json() );
            if( result && result.html ) {

                // get regular iframe params
                let codeMatches = code( result.html ) as {};

                // extract padding-bottom for ratio calc
                let padding = optionalMatch( result.html, {
                    ratio: /padding-bottom:(.*?);/i,
                });
                if( padding.ratio ) {
                    // turn padding percentage into ratio
                    padding.ratio = 100 / parseFloat( padding.ratio.replace( '%', '' ).trim() );

                    // return including ratio if valid
                    if( padding.ratio ) return Object.assign( codeMatches, padding ) as IFrameOptions
                }

                return codeMatches as IFrameOptions
            }
        } catch( e ) {
            return;
        }
    };

}
