<script lang="ts">
    import { getContext } from "svelte";
    import { writable } from "svelte/store";
    import { ModelGateway } from "../ModelGateway";
    import type { DBModel } from "../ModelGateway";

    export let attribute:string;
    export let model:DBModel = getContext('model');
    export let gateway:ModelGateway = getContext('modelGateway');

    
    function update( v:unknown ) {

        // check if value has changed
        let old = $model[attribute];
        if( v == old ) return;

        const newAttr = {};
        newAttr[ attribute ] = v;
    
        gateway.update( model, newAttr );
    }


</script>

<slot update={update}></slot>

