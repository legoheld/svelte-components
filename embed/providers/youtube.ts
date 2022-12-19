// based on https://github.com/editor-js/embed

/**
 * A youtube provider that turns a youtube url into IFrameOptions
 * @param input
 */
export function youtube( url:string ) {
    let match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com))/g);

    if( match ) {

        const parsed = new URL( url );

        // get id from v param or from last path segment
        let id = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();

        const embed = new URL( `https://www.youtube.com/embed/${id}` );

        const start = parsed.searchParams.get('t') || parsed.searchParams.get('start') || parsed.searchParams.get('time_continue');
        if( start ) embed.searchParams.set( 'start', start );
        
        const list = parsed.searchParams.get('list');
        if( list ) embed.searchParams.set( 'list', list );

        return {
            src: embed.href
        }
    }
}
