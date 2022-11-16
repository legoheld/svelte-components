import {depthFirst, interpolate} from "@lernetz/common";

export function mapRequests<G = {[key:string]:Request}>( data ):G {
    return depthFirst( data, item => {
        if( item && item.url ) return new RequestBuilder( item );
        return item;
    });
}

interface RequestBuilderConfig extends Partial<RequestInit> {
    url: string;
}


export class RequestBuilder {

    private config: RequestBuilderConfig;

    constructor( config: RequestBuilderConfig ) {
        this.config = config;
    }


    vars( vars: { [ key: string ]: any; } = {} ): RequestBuilder {
        return new RequestBuilder( { ...this.config, url: interpolate( this.config.url, vars ) } );
    }

    headers( headers: Record<string,string> ) {
        return new RequestBuilder( { ...this.config, headers: Object.assign( this.config.headers || {}, headers ) } );
    }

    method( method: string ) {
        return new RequestBuilder( { ...this.config, method } );
    }

    body( body: BodyInit | null ) {
        return new RequestBuilder( { ...this.config, body } );
    }

    query( params:Record<string,string> ) {

        let url = this.getURL()
        let existing = Object.fromEntries( url.searchParams.entries() );
        Object.assign( existing, params );
        url.search = new URLSearchParams( existing ).toString();

        return new RequestBuilder( { ...this.config, url: decodeURI( url.href ) } );
    }
    
    hash( hash:string ) {
        let url = this.getURL();
        url.hash = hash;
        return new RequestBuilder( { ...this.config, url: decodeURI( url.href ) } );
    }

    relative( path: string ) {

        let u = this.getURL();
        u.pathname = [ ...u.pathname.split( '/' ), ...path.split( '/' ) ].join( '/' );

        return new RequestBuilder( { ...this.config, url: decodeURI( u.href ) } );
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
