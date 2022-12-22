<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte";
    import { DBModel, ModelGateway } from "../ModelGateway";



    export let attribute:string;
    export let model:DBModel = getContext('model');
    export let gateway:ModelGateway = getContext('modelGateway');

    const dispatch = createEventDispatcher<{deleted:DBModel}>();


    export async function remove( child:DBModel ) {
        await gateway.delete( child );

        dispatch( 'deleted', child );

        let oldRelation = $model[attribute] || [];

        let copy = oldRelation.slice();
        let index = copy.indexOf( child );
        if( index >= 0 ) copy.splice( index, 1 );

        let ref = {};
        ref[ attribute ] = copy;

        await gateway.update( model, ref );
    }
</script>


<slot {remove}></slot>
