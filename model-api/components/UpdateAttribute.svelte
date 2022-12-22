<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { get, Writable, writable } from "svelte/store";
    import { DBModel, ModelGateway } from "../ModelGateway";

    export let attribute:string;
    export let model:DBModel = getContext('model');
    export let gateway:ModelGateway = getContext('modelGateway');


    function update( v:unknown ) {

        // check if value has changed
        let old = get( model )[ attribute ]
        if( v == old ) return;

        const newAttr = {};
        newAttr[ attribute ] = v;

        gateway.update( model, newAttr );
    }


</script>

<slot {update}></slot>

