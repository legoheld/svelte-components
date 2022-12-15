/**
 * A quizlet provider that turns a quizlet url into IFrameOptions
 * @param input
 */


export function quizlet( input: string ) {

    // match quizzlet url
    let match = input.match( /https:\/\/quizlet\.com\/([^\/]+)\/(flashcards|learn|scatter|speller|test)?/i );

    // no match no quizzlet url
    if( !match ) return;

    let id = match[ 1 ];
    let mode = match[ 2 ] || 'flashcards';

    return { src: `https://quizlet.com/${id}/${mode}/embed` };
}
