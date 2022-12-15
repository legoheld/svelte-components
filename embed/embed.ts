export interface IFrameOptions {
    src: string;
    width?: string;
    height?: string;
    title?: string;
    frameborder?: number;
    allow?: string;
    allowfullscreen?: boolean;
    sandbox?: string;
}


export interface Provider {
    ( input: string ): IFrameOptions | Promise<void | IFrameOptions> | void;
}


export function create( providers: Provider[], defaults: Partial<IFrameOptions> = { width: '100%', height: '600px', allowfullscreen: true } ) {

    return async ( input, options: Partial<IFrameOptions> = {} ) => {
        for( const provider of providers ) {
            let res = await provider( input.trim() );
            if( res ) return Object.assign( {}, defaults, options, res );
        }

        // if nothing matches return fallback where the input will be the src of the iframe
        return Object.assign( {}, defaults, options, { src: input } );
    };
}


