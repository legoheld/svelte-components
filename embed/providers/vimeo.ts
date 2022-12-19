// based on https://github.com/editor-js/embed

/**
 * A vimeo provider that turns a vimeo url into IFrameOptions
 * @param input
 */
export function vimeo( url:string ) {

    let match = url.match(/(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.com/g);

    if( match ) {

        const parsed = new URL( url );

        // get id from last path segment
        let id = parsed.pathname.split('/').pop();

        let embed = new URL( `https://player.vimeo.com/video/${id}` );
        embed.search = parsed.searchParams.toString();

        return {
            src: embed.href
        }
    }
}
