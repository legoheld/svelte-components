import { expect, test } from '@playwright/test';
import { create } from '../embed';
import { fallback } from '../providers';
import { code } from '../providers/code';
import { quizlet } from '../providers/quizlet';
import { vimeo } from '../providers/vimeo';
import { youtube } from '../providers/youtube';

test.describe( 'embed', () => {

    test( 'default options and fallback', async () => {

        let embed = create( [ fallback ], { src: "https://my-source.com", ratio:0.5625 } );

        let options = await embed( 'https://my-new-domain.ch' );

        expect( options ).toEqual( {
            src: 'https://my-new-domain.ch',
            ratio:0.5625
        } );


        options = await embed( undefined );

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
    
    test( '&amp; in url', () => {
        let source = `<iframe
        src="https://onedrive.live.com/embed?resid=39D4F0952BFC6E39%21113&amp;authkey=%21AB8p4mpdcd0aivA&amp;em=2&amp;wdAr=1.7777777777777777">
        </iframe>`;
        
        expect( code( source ) ).toEqual( {
            src: "https://onedrive.live.com/embed?resid=39D4F0952BFC6E39%21113&authkey=%21AB8p4mpdcd0aivA&em=2&wdAr=1.7777777777777777",
        } );
    })
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


test.describe( "test youtube", () => {
    let embed = create( [ youtube ], {} );

    test( 'start time', async () => {
        let result1 = await embed( 'https://www.youtube.com/watch?v=wZZ7oFKsKzY&t=120' );
        let result2 = await embed( 'https://www.youtube.com/watch?v=wZZ7oFKsKzY&time_continue=173' );
        expect( result1 ).toEqual( {
            src: 'https://www.youtube.com/embed/wZZ7oFKsKzY?start=120',
        })
        expect( result2 ).toEqual( {
            src: 'https://www.youtube.com/embed/wZZ7oFKsKzY?start=173',
        })
    });

    test( 'list param', async () => {
        let result1 = await embed( 'https://www.youtube.com/watch?v=xhCS0iR1ab0&list=PLpyju4SX4A6jfHyEA1P46ghBASNjh3Lxv&t=55' );
        expect( result1 ).toEqual( {
            src: 'https://www.youtube.com/embed/xhCS0iR1ab0?start=55&list=PLpyju4SX4A6jfHyEA1P46ghBASNjh3Lxv',
        })
    });
    
    test( 'short form', async () => {
        let result1 = await embed( 'https://youtu.be/xhCS0iR1ab0?t=55' );
        expect( result1 ).toEqual( {
            src: 'https://www.youtube.com/embed/xhCS0iR1ab0?start=55',
        })

    })

    test( 'embed form', async () => {
        let result1 = await embed( 'https://www.youtube.com/embed/xhCS0iR1ab0?start=55&list=PLpyju4SX4A6jfHyEA1P46ghBASNjh3Lxv' );
        expect( result1 ).toEqual( {
            src: 'https://www.youtube.com/embed/xhCS0iR1ab0?start=55&list=PLpyju4SX4A6jfHyEA1P46ghBASNjh3Lxv',
        })

    })


});


test.describe( "test vimeo", () => {
    let embed = create( [ vimeo ], {} );

    test( 'check urls', async () => {
        let result1 = await embed( 'https://vimeo.com/289836809' );
        let result2 = await embed( 'https://www.vimeo.com/289836809?title=0&byline=0&portrait=0' );
        let result3 = await embed( 'https://player.vimeo.com/video/289836809' );
        expect( result1 ).toEqual( {
            src: 'https://player.vimeo.com/video/289836809',
        });
        expect( result2 ).toEqual( {
            src: 'https://player.vimeo.com/video/289836809?title=0&byline=0&portrait=0',
        });
        expect( result3 ).toEqual( {
            src: 'https://player.vimeo.com/video/289836809',
        });
    });

});

test.describe( 'Test iframely provider', () => {

    test( 'iframely youtube', async ( { page } ) => {
        await page.goto( '/embed' );

        // mock iframely api
        await page.route('https://iframely.b.lernetz.host/**', async route => {
            await route.fulfill({ 
                body: JSON.stringify({
                    "html": "<div><div style=\"left: 0; width: 100%; height: 400px; position: relative;\"><iframe src=\"https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1376352658&amp;show_artwork=true\" style=\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\" allowfullscreen></iframe></div></div>"
                })
            });
        });

        // fill to invoke api call
        await page.fill( 'input', 'url' );

        expect(await page.textContent('#options')).toBe( JSON.stringify( {ratio:1.3333333333333333,allowfullscreen:true,src:"https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1376352658&show_artwork=true"} ));
    } );
} );


