<script lang="ts">
    import { onMount } from "svelte";
    import { Writable, writable } from "svelte/store";
    import { DBModel, ModelGateway } from "../ModelGateway";

    export let attribute:string;
    export let model:any; // TODO find type where DBModel is required but more optional
    export let gateway:ModelGateway;
    let value = writable();

    onMount(() => {
        value.set( model[ attribute ] );

        value.subscribe( v => {

        });
    });


    function save( v:unknown ) {

        // check if value has changed
        let old = model[ attribute ];
        if( v == old ) return;

        const newAttr = {};
        newAttr[ attribute ] = v;

        gateway.update( model, newAttr );
    }


</script>

<slot value={model[attribute]} {save}></slot>
