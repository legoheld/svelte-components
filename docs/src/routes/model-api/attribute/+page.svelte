<script lang="ts">
    import { ModelGateway, UpdateAttribute } from '@lernetz/model-api';
    import { RequestBuilder } from '@lernetz/request';
    import Input from '@lernetz/svelte-input/Input.svelte';
    import { writable } from 'svelte/store';

    const modelGateway = new ModelGateway( { base: new RequestBuilder( { url: 'http://api' } ) });
    const model = writable( {
        modelName: "App\\Demo",
        id: "1234",
        name: "name"
    })


    function adjustName() {
        $model.name = "name " + Math.random();
    }
</script>

<button on:click={adjustName}>Random Name</button>
<hr>
<UpdateAttribute {model} gateway={modelGateway} attribute="name" let:value >
    <Input {value} label="name"></Input>
</UpdateAttribute>



