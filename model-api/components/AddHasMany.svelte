<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte";
    import { DBModel, ModelGateway } from "../ModelGateway";



    export let attribute:string;
    export let model:DBModel = getContext('model');
    export let gateway:ModelGateway = getContext('modelGateway');
    export let relations:{} = {};

    const dispatch = createEventDispatcher<{created:DBModel}>();


    export async function add( blueprint:{ modelName: string; [ key: string ]: any }, index:number = undefined ) {
        let newModel = await gateway.create( blueprint, relations );

        dispatch( 'created', newModel );

        let oldRelation = $model[attribute] || [];

        let copy = oldRelation.slice();
        copy.splice( index ? Math.min( Math.max( index, 0), copy.length - 1 ) : copy.length, 0, newModel );

        let ref = {};
        ref[ attribute ] = copy;

        await gateway.update( model, ref );
    }
</script>


<slot {add}></slot>
