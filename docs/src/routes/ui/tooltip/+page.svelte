<script lang="ts">
    import { tooltip } from '@lernetz/svelte-tooltip';
    import Demo from './Demo.svelte';
</script>

<h1 class="text-24 font-bold mb-6">Tooltip optional offset</h1>
<button use:tooltip={{ content:"Text left", align:'left', offset:30 }}>Left</button>
<button use:tooltip={{ content:"Text right", align:'right', offset:30 }}>Right</button>
<button use:tooltip={{ content:"Text top", align:'top', offset:30 }}>Top</button>
<button use:tooltip={{ content:"Text bottom", align:'bottom', offset:30 }}>Bottom</button>
<hr class="my-10">

<h1 class="text-24 font-bold mb-6">Tooltip optional alignment</h1>
<button use:tooltip={{ content:"Text left", align:'left' }}>Left</button>
<button use:tooltip={{ content:"Text right", align:'right' }}>Right</button>
<button use:tooltip={{ content:"Text top", align:'top' }}>Top</button>
<button use:tooltip={{ content:"Text bottom", align:'bottom' }}>Bottom</button>

<hr class="my-10">

<h1 class="text-24 font-bold mb-6">Component content</h1>
<button use:tooltip={{ content:Demo }}>Custom svelte component as content</button>

<hr class="my-10">
<h1 class="text-24 font-bold mb-6">A tooltip inside text</h1>

<p>Lorem ipsum dolor sit amet, consetetur <span class="underline" use:tooltip={{content:"sadipscing"}}>sadipscing</span> elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est <span class="underline" use:tooltip={{content:"sadipscing"}}>Lorem ipsum dolor</span> sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

<hr class="my-10">
<h1 class="text-24 font-bold mb-6">Custom styling</h1>

<button use:tooltip={{
    content:"Other styling",
    styling: 'bg-blue-500 opacity-90 shadow-lg rounded-md text-white z-50 p-24 border border-blue-900'
}}>My custom style</button>
