import { expect, test } from '@playwright/test';
import { create } from '../embed';
import { code } from '../providers/code';
import { iframely } from '../providers/iframely';
import { quizlet } from '../providers/quizlet';

test.describe( 'embed', () => {

    test( 'default options', async () => {

        let embed = create( [], { src: "https://my-source.com", ratio:0.5625 } );

        let options = await embed( 'https://my-new-domain.ch' );

        expect( options ).toEqual( {
            src: 'https://my-new-domain.ch',
            ratio:0.5625
        } );
    } );
} );


test.describe( 'Code provider', () => {

    test( 'full iframe code example', ( { } ) => {
        let source = `<iframe
            src="https://my-source.com"
            width="476px"
            height="288px"
            frameborder="0"
            allow="geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'"
            allowfullscreen
            sandbox="allow-popups"
            title="title">
            Dies ist ein eingebettetes Iframe...
        </iframe>`;

        expect( code( source ) ).toEqual( {
            src: "https://my-source.com",
            ratio: 1.6527777777777777,
            frameborder: "0",
            allow: "geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'",
            allowfullscreen: true,
            sandbox: "allow-popups",
            title: "title",
            height: "288px",
            width: "476px"
        } );
    } );



    test( 'percentage width', ( { } ) => {
        let source = `<iframe
            src="https://my-source.com"
            width="100%"
            height="288px">
        </iframe>`;

        // will not calcualte ratio because of percentage value
        expect( code( source ) ).toEqual( {
            src: "https://my-source.com",
            height: "288px",
            width: "100%",
        } );
    } );


    test( 'undefined w/h', ( { } ) => {
        let source = `<iframe
            src="https://my-source.com">
        </iframe>`;

        // will not calcualte ratio because of percentage value
        expect( code( source ) ).toEqual( {
            src: "https://my-source.com"
        } );
    } );

    test( 'for proper ratio calc', ( { } ) => {
        let source = `<iframe
            src="https://player.vimeo.com/video/183907844"
            width="640"
            height="360"
            </iframe>`;
            
            // will not calcualte ratio because of percentage value
            expect( code( source ) ).toEqual( {
            src: "https://player.vimeo.com/video/183907844",
            width: '640',
            height: '360',
            ratio: 1.7777777777777777
        } );
    } );


    test( 'partial iframe code', ( { } ) => {
        let source = `<iframe
            src="https://my-source.com"
            width="476px"
            height="288px">
        </iframe>`;

        expect( code( source ) ).toEqual( {
            src: "https://my-source.com",
            ratio: 1.6527777777777777,
            height: "288px",
            width: "476px"
        } );
    } );
} );




test.describe( 'Quizlet provider', () => {
    let embed = create( [
        quizlet
    ], {} // no default values
    );

    test( 'Without mode', async () => {
        let result = await embed( 'https://quizlet.com/137843275/quizlet-embed-flash-cards/' );
        expect( result ).toEqual( {
            src: 'https://quizlet.com/137843275/flashcards/embed'
        } );
    } );
    test( 'With mode', async () => {
        let result = await embed( 'https://quizlet.com/137843275/learn/' );
        expect( result ).toEqual( {
            src: 'https://quizlet.com/137843275/learn/embed'
        } );
    } );
} );

/* Can not test as there is no fetch in nodejs where playwright executes
test.describe( 'Test iframely provider', () => {
    let embed = create( [
        iframely( 'https://iframely.b.lernetz.host/' )
    ] );

    test( 'iframely youtube', async ( { } ) => {

        let result = await embed( 'https://www.youtube.com/watch?v=koEzP2ZE7fM' );
        expect( result ).toEqual( {
            src: "https://www.youtube.com/embed/koEzP2ZE7fM?feature=oembed&amp;autoplay=1",
            width: "100%",
            height: "600px",
            allowfullscreen: true,
        } );
    } );
} );
*/


