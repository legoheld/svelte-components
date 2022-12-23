<script lang="ts">
    import { getContext } from "svelte";
    import { writable } from "svelte/store";
    import { ModelGateway } from "../ModelGateway";
    import type { DBModel } from "../ModelGateway";

    export let attribute:string;
    export let model:DBModel = getContext('model');
    export let gateway:ModelGateway = getContext('modelGateway');

    export const value = writable( $model[attribute] );

    // store value into backend when value changes
    value.subscribe( ( v ) => {

        // check if value has changed
        let old = $model[attribute];
        if( v == old ) return;
    
        const newAttr = {};
        newAttr[ attribute ] = v;
    
        gateway.update( model, newAttr );
    })

    // update value when model changes
    $: {
        $value = $model[attribute];
    }


</script>

<slot {value}></slot>

