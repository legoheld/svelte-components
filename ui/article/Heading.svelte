<script lang="ts">
    import type { Writable } from 'svelte/store';
    import type { Descendant } from 'slate';
    import Element from './Element.svelte';
    import {Editor} from '@lernetz/svelte-slate';

    import { defaultEditor } from '@lernetz/svelte-slate/defaults';
    import { UpdateAttribute } from '@lernetz/model-api';

    const editor = defaultEditor();
    export let element:Writable<{
        modelName: string,
        id: string;
        content: {
            slate:Descendant[],
            html:string
        }
    }>;
</script>


<Element>
    <div slot="toolbar" class="flex flex-row items-center rounded-t-lg border border-purple-700">
        <div class="bg-purple-700 text-white px-16 py-8">Heading</div>
        <button class="px-16" on:click={ e => editor.toggleStyle('bold') }>Bold</button>
    </div>

    <svelte:fragment slot="content">
        <UpdateAttribute attribute='text' model={element} let:update>
            <Editor {editor} content={$element.content.slate} on:change={ e => update( e.detail )}></Editor>
        </UpdateAttribute>
    </svelte:fragment>
</Element>
