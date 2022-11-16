import { expect, test } from '@playwright/test';
import { mapRequests, RequestBuilder } from '../request';


test.describe('Test routes', () => {

    let routes = mapRequests<{path:RequestBuilder, query:RequestBuilder, settings:RequestBuilder}>( {
        path: { url:'http://google.com/{one}/{two}/{three}' },
        query: { url:'http://google.com?q={query}'},
        settings: { url:'http://google.com', method:"POST", headers:{ MyHeader:"Peng" } }
    } );



    test('variable substitution', ({}) => {
        expect( routes.path.url ).toEqual( "http://google.com/%7Bone%7D/%7Btwo%7D/%7Bthree%7D" );
        expect( routes.path.vars({one:1}).url ).toEqual( "http://google.com/1/" );
        expect( routes.path.vars({two:2}).url ).toEqual( "http://google.com/2/" );
        expect( routes.path.vars({three:3}).url ).toEqual( "http://google.com/3" );
        expect( routes.path.vars({one:1, three:3}).url ).toEqual( "http://google.com/1/3" );
        expect( routes.path.vars({one:1, two:2, three:3}).url ).toEqual( "http://google.com/1/2/3" );

        expect( routes.query.vars( {query:"Demo" } ).url).toEqual( 'http://google.com/?q=Demo');
        expect( routes.query.vars( {} ).url).toEqual( 'http://google.com/?q=');
    });

    test('query building', ({}) => {
        expect( routes.settings.query( { add: '123' } ).url ).toEqual( "http://google.com/?add=123" );
        // TODO: query is not url encoded?...
        expect( routes.query.query( { add: '123' } ).url ).toEqual( "http://google.com/?q={query}&add=123" );
    });

    test('relative path', ({}) => {
        expect( routes.path.relative('/{four}').vars( { one:1, two:2, three:3, four:4 }).url ).toEqual( "http://google.com/1/2/3/4" );
        expect( routes.settings.relative('/one/two').url ).toEqual( "http://google.com/one/two" );
    });

});

