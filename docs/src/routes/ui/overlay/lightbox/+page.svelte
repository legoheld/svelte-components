<script lang="ts">

    import { Lightbox } from '@lernetz/svelte-overlay';
    
    function test( node:HTMLElement ) {
        node.style.backgroundColor = 'red';
        return {
            destroy: () => {
                console.log( "destroy" );
                node.style.backgroundColor = '';
            }
        }
    }

</script>


<h1 use:test class="text-24 font-bold mb-6">Beispiel</h1>

<div class="flex w-full flex-col items-center justify-center my-64">
    <Lightbox let:overlay >
        <button use:overlay.trigger class="p-8 bg-green-500">Show lightbox</button>
        <div slot="overlay" class="p-24 bg-white shadow-md w-176 rounded-md ">
            <div>I'm a lighbox content</div>
        </div>
    </Lightbox>
</div>

