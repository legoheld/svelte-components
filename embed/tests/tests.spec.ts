import { expect, test } from '@playwright/test';
import { create } from '../embed';
import { code } from '../providers/code';
import { iframely } from '../providers/iframely';
import { quizlet } from '../providers/quizlet';

test.describe( 'embed', () => {

    test( 'default options', async () => {

        let embed = create( [], { src: "https://my-source.com", width: "476px", height: "288px" } );

        let options = await embed( 'https://my-new-domain.ch' );

        expect( options ).toEqual( {
            src: 'https://my-new-domain.ch',
            width: "476px",
            height: "288px"
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
            width: "476px",
            height: "288px",
            frameborder: "0",
            allow: "geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'",
            allowfullscreen: true,
            sandbox: "allow-popups",
            title: "title"
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
            width: "476px",
            height: "288px",
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
} );


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


