<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { DBModel, ModelGateway } from "../ModelGateway";



    export let model:DBModel;
    export let attribute:string;
    export let gateway:ModelGateway;
    export let relations:{} = {};

    const dispatch = createEventDispatcher<{created:DBModel}>();


    export async function add( blueprint:{ modelName: string; [ key: string ]: any }, index:number = undefined ) {
        let newModel = await gateway.create( blueprint, relations );

        dispatch( 'created', newModel );

        let oldRelation = $model[attribute] || [];

        // if no valid array - we can not store model
        if( !Array.isArray( oldRelation ) ) return;

        let copy = oldRelation.slice();
        copy.splice( index ? Math.min( Math.max( index, 0), copy.length - 1 ) : copy.length, 0, newModel );

        let ref = {};
        ref[ attribute ] = copy;

        await gateway.update( model, ref );
    }
</script>


<slot {add}></slot>
