import { depthFirst } from "@lernetz/common";
import { RequestBuilder } from "@lernetz/request";
import { get, writable, Writable } from 'svelte/store';
import { isWritable } from './guards';


export class ModelGateway {

    base: RequestBuilder;
    in: ( data: { modelName: string; } ) => any;
    out: ( data: Writable<any> ) => any;

    constructor( config: Partial<ModelGateway> ) {
        Object.assign( this, { in: noop, out: noop, ...config } );
    }



    query<Type extends DBModel[] = DBModel[]>( queryObject: QueryObject ) {
        return this.base
            .jsonApi( "query", queryObject )
            .then<Type>( ( res ) => traverseIn( res, this.in ) );
    }



    create<Type extends DBModel = DBModel>( model: {
        [ key: string ]: any;
        modelName: string;
    }, relations: object = {} ) {
        return this.base
            .jsonApi( "create", { model: traverseOut( model, this.out ), relations } )
            .then<Type>( ( res ) => traverseIn( res, this.in ) );
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
            .jsonApi( "update", traverseOut( {
                model: reduceModels( traverseOut( model, this.out ) ),
                newValues,
                oldValues,
            }, this.out ) )
            .then<Type>( ( res: any ) => {
                // apply tranformations
                res = traverseIn( res, this.in );

                // return original model
                return model;
            } );
    }



    delete<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "delete", traverseOut( { model: reduceModels( model ) }, this.out ) )
            .then<Type>( ( res ) => traverseIn( res, this.in ) );
    }




    restore<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "restore", traverseOut( { model: reduceModels( model ) }, this.out ) )
            .then<Type>( ( res ) => traverseIn( res, this.in ) );
    }



    clone<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
            .jsonApi( "copy", traverseOut( { model: reduceModels( model ) }, this.out ) )
            .then<Type>( ( res ) => traverseIn( res, this.in ) );
    }


}


export type DBModel = Writable<{
    modelName: string,
    id: string;
}>;

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
    return depthFirst( obj, ( i ) => {
        return ( i?.id && i?.modelName ) ? { id: i.id, modelName: i.modelName } : i;
    } );
}


function traverseIn( d: any, inFunc: ( d: any ) => any ) {
    return depthFirst( d, ( i ) => {
        // handle model files
        if( i?.modelName ) {
            // invoke use function to create custom stores or model adjustments
            i = inFunc( i );
            // turn into store
            if( !isWritable( i ) ) i = writable( i );
        }

        return i;
    } );
}


function traverseOut( d: any, outFunc: ( d: any ) => any ) {
    return depthFirst( d, ( i ) => {
        // handle stores
        if( isWritable( i ) ) {
            // invoke user function to adjust model to backend
            i = outFunc( i );
            // unwrap store
            if( isWritable( i ) ) i = get( i );
        }

        return i;
    } );
}


const noop = ( d ) => d;

