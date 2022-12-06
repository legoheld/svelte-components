import { depthFirst } from "@lernetz/common";
import { RequestBuilder } from "@lernetz/request";
import { get, writable, Writable } from 'svelte/store';
import { isWritable } from './guards';


export class ModelGateway {

    base: RequestBuilder;
    in: ( data: any ) => any;
    out: ( data: any ) => any;

    constructor( config: Partial<ModelGateway> ) {
        Object.assign( this, { in: wrapStores, out: unwrapStores, ...config } );
    }



    query<Type extends DBModel[] = DBModel[]>( queryObject: QueryObject ) {
        return this.base
            .jsonApi( "query", queryObject )
            .then<Type>( ( res ) => this.in( res ) );
    }



    create<Type extends DBModel = DBModel>( model: {
        [ key: string ]: any;
        modelName: string;
    }, relations: object = {} ) {
        return this.base
            .jsonApi( "create", { model: this.out( model ), relations } )
            .then<Type>( ( res ) => this.in( res ) );
    }



    update<Type extends DBModel = DBModel>( model: Type, newValues: { [ name: string ]: any; } ) {
        let oldValues = {};

        Object.keys( newValues ).forEach( ( key ) => {

            let ref = get( model );

            // get old value from model
            oldValues[ key ] = ref[ key ];

            // as we have to previous value, we can apply it on the model
            ref[ key ] = newValues[ key ];
            model.set( ref ); // update svelte store

            // reduce values for transmission
            newValues[ key ] = reduceModels( newValues[ key ] );
            oldValues[ key ] = reduceModels( oldValues[ key ] );

        } );

        return this.base
            .jsonApi( "update", this.out( {
                model: reduceModels( model ),
                newValues,
                oldValues,
            } ) )
            .then<Type>( ( res: any ) => {
                // apply tranformations
                res = this.in( res );

                // return original model
                return model;
            } );
    }



    delete<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "delete", this.out( { model: reduceModels( model ) } ) )
            .then<Type>( ( res ) => this.in( res ) );
    }




    restore<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "restore", this.out( { model: reduceModels( model ) } ) )
            .then<Type>( ( res ) => this.in( res ) );
    }



    clone<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "copy", this.out( { model: reduceModels( model ) } ) )
            .then<Type>( ( res ) => this.in( res ) );
    }


}


export type DBModel = Writable<{ modelName: string, id: string; }>;

export interface QueryObject {
    where: {
        modelName: string;
        [ key: string ]: any;
    },
    relations?: object,
    sort?: {
        attribute: string,
        order?: string;
    },
    offset?: number,
    limit?: number,
    userdata?: boolean | string[],
}


function reduceModels( obj: any ) {
    return depthFirst( unwrapStores( obj ), ( i ) => {
        return ( i?.id && i?.modelName ) ? { id: i.id, modelName: i.modelName } : i;
    } );
}


const wrapStores = ( d ) => {
    return depthFirst( d, ( i ) => i?.modelName ? writable( i ) : i );
};

const unwrapStores = ( d ) => {
    return depthFirst( d, ( i ) => isWritable( i ) ? get( i ) : i );
}


