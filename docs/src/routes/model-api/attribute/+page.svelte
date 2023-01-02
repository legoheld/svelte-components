<script lang="ts">
    import { ModelGateway, UpdateAttribute } from '@lernetz/model-api';
    import { RequestBuilder } from '@lernetz/request';
    import Input from '@lernetz/svelte-input/Input.svelte';
    import { writable, get } from 'svelte/store';

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
<UpdateAttribute {model} gateway={modelGateway} attribute="name" let:update>

    <input value={$model.name} on:blur={e => update( e.currentTarget.value )}>

    <!-- Variante mit store als Argument
    Nachteil Input muss intern ein store haben
    <Input value={value} label="name"></Input>
    -->

    <!-- Variante mit event und set
    Nachteil: Event muss typisiert werden, viel code
    <Input value="$value" on:blur={event => $value = event.detail}></Input>
    -->

    <!-- Variante mit bind und store
    Vorteil: Input muss nichts von store wissen, binding klappt 
    https://svelte.dev/repl/0bf7acc3bde9496d930795da34fae251?version=3.18.2
    Funktioniert hier nicht, weil store von let:... kommt
    <Input bind:value={$value}></Input>
    -->

    <!-- Variante mit bind ohne store
    Nachteil: schwierig zu kontrollieren, da man nicht update nicht so gut kontrollieren kann wie bei store
    Möglichkeit von zuvielen updates.
    <Input bind:value={value}></Input>
    -->
</UpdateAttribute>



