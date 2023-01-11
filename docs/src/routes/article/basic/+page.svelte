<script lang="ts">
    import { type DBModel, ModelGateway } from "@lernetz/model-api";
    import Context from "@lernetz/common/components/Context.svelte";
    import { RequestBuilder } from "@lernetz/request";
    import { ArticleEditor, Heading } from "@lernetz/svelte-article";
    import { writable, get  } from 'svelte/store';

    let elements = [
        writable( { modelName:'App\\Heading', text:{ slate: [ { type:'p', children: [ { text:'Demo'} ] } ] }, level:1, id:"1" } ),
        writable( { modelName:'App\\Heading', text:{ slate: [ { type:'p', children: [ { text:'Demo2'} ] } ] }, level:1, id:"2" } ),
    ];

    const modelGateway = new ModelGateway( { base: new RequestBuilder( { url: 'http://api' } ) });

    function componentResolve( item:DBModel ) {
        let map = {
            'App\\Heading': Heading,
        }

        return map[ get( item ).modelName ];
    }

</script>

<Context {modelGateway}>
    <ArticleEditor {componentResolve} {elements}></ArticleEditor>
</Context>
