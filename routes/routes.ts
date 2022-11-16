import {depthFirst, interpolate} from "@lernetz/common";

export function mapRoutes<G = {[key:string]:Route}>( data ):G {
    return depthFirst( data, item => {
        if( item && item.url ) return new Route( item );
        return item;
    });
}

interface RouteConfig extends Partial<RequestInit> {
    url: string;
}


export class Route {

    private config: RouteConfig;

    constructor( config: RouteConfig ) {
        this.config = config;
    }


    vars( vars: { [ key: string ]: any; } = {} ): Route {
        return new Route( { ...this.config, url: interpolate( this.config.url, vars ) } );
    }

    headers( headers: Record<string,string> ) {
        return new Route( { ...this.config, headers: Object.assign( this.config.headers || {}, headers ) } );
    }

    method( method: string ) {
        return new Route( { ...this.config, method } );
    }

    body( body: BodyInit | null ) {
        return new Route( { ...this.config, body } );
    }

    query( params:Record<string,string> ) {

        let url = this.getURL()
        let existing = Object.fromEntries( url.searchParams.entries() );
        Object.assign( existing, params );
        url.search = new URLSearchParams( existing ).toString();

        return new Route( { ...this.config, url: decodeURI( url.href ) } );
    }
    
    hash( hash:string ) {
        let url = this.getURL();
        url.hash = hash;
        return new Route( { ...this.config, url: decodeURI( url.href ) } );
    }

    relative( path: string ) {

        let u = this.getURL();
        u.pathname = [ ...u.pathname.split( '/' ), ...path.split( '/' ) ].join( '/' );

        return new Route( { ...this.config, url: decodeURI( u.href ) } );
    }

    jsonApi( relative:string, data:{} = {} ) {
        let route = this
            .relative( relative )
            .body( JSON.stringify( data ) )
            .headers( { 'Accept': 'application/json', 'Content-Type': 'application/json' } )
            .method('POST')

        return route.fetch()
            .then( response => response.json() ) // turn into json
            .then( json => json?.data ) // retrive json api data
            .catch( error => {
                // TODO handle errors object
            } );
    }

    fetch() {
        return fetch( new Request( this.url, this.config ) );
    }

    get url() {
        return this.getURL().href;
    }

    private getURL() {
        let u = new URL( this.config.url );
        u.pathname = u.pathname.replace( /\/+/g, '/' );
        return u;
    }
}
