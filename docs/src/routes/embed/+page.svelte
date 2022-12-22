<script lang="ts">

    import type { IFrameOptions } from '@lernetz/embed';
    import { create } from '@lernetz/embed';
    import { code, quizlet, youtube, vimeo, iframely, fallback  } from '@lernetz/embed/providers';

    let frameOptions:Partial<IFrameOptions> = {};
    let value:string = '';
    let embed = create( [ code, quizlet, youtube, vimeo, iframely('https://iframely.b.lernetz.host'), fallback ] );

    $: (async() => frameOptions = await embed( value ))();
</script>



<div>
    <label for="input" class="block text-sm font-medium text-gray-700">Input</label>
    <div>
        <input bind:value type="text" name="input" id="input" class="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="<iframe...>">
    </div>
</div>

{#if frameOptions?.src}
<div id="options" class="font-mono text-xs">
    { JSON.stringify( frameOptions ) }
</div>
{/if}