import { depthFirst } from "@lernetz/common";
import { Route } from "@lernetz/routes";



export class ModelGateway {

    base:Route;
    in:( data:any ) => any;
    out:( data:any ) => any;

    constructor( config:Partial<ModelGateway> ) {
        Object.assign( this, config );
    }



    query<Type extends DBModel[] = DBModel[]>( queryObject: QueryObject ) {
        return this.base
                .jsonApi( "query", queryObject )
                .then<Type>( ( res ) => this.in( res ) );
    }



    create<Type extends DBModel = DBModel>( model: {
        [key: string]: any;
        modelName: string;
    }, relations: object = {} ) {
        return this.base
            .jsonApi( "create", { model: this.out( model ), relations } )
            .then<Type>( ( res ) => this.in( res ) );
    }



    update<Type extends DBModel = DBModel>( model: Type, newValues: { [name: string]: any } ) {
        let oldValues = {};

        Object.keys( newValues ).forEach( ( key ) => {
            // get old value from model
            oldValues[key] =model[key];

            // as we have to previous value, we can apply it on the model
            model[key] = newValues[key];

            // reduce values for transmission
            newValues[key] = reduceModels( newValues[ key ] );
            oldValues[key] = reduceModels( oldValues[ key ] );

        } );

        return this.base
                .jsonApi( "update", this.out( {
                    model: reduceModels( model ),
                    newValues,
                    oldValues,
                }))
                .then<Type>( ( res: any ) => {
                    // apply tranformations
                    res = this.in( res );
    
                    // return original model
                    return model;
                } );
    }



    delete<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
                .jsonApi( "delete", this.out( { model:reduceModels( model ) } ) )
                .then<Type>( ( res ) => this.in( res ) )
    }
            


    
    restore<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
                .jsonApi( "restore", this.out( { model:reduceModels( model ) } ) )
                .then<Type>( ( res ) => this.in( res ) )
    }



    clone<Type extends DBModel = DBModel>( model: Type ) {
        return this.base
                .jsonApi( "copy", this.out( { model:reduceModels( model ) } ) )
                .then<Type>( ( res ) => this.in( res ) )
    }


}



export interface DBModel {
    modelName: string;
    id: string;
}

export interface QueryObject {
    where: {
        modelName: string;
        [key: string]: any
    },
    relations?: object,
    sort?: {
        attribute: string,
        order?: string
    },
    offset?: number,
    limit?: number,
    userdata?: boolean | string[],
}


function reduceModels( obj: any ) {
    depthFirst( obj, ( i ) => {
        return ( i?.id && i?.modelName ) ? { id: i.id, modelName: i.modelName } : i;
    });
}


