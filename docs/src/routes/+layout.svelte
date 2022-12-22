<script>
    import "../app.css";
    import { page } from '$app/stores';


    const navigation = [
        { path:'/', label:'Home' },
        { path:'/embed', label:'Embed' },
    ]
</script>




<nav class="bg-gray-800 fixed top-0 left-0 bottom-0 w-64 px-6 py-8 shadow-md">
    <div class="space-y-2">
        {#each navigation as nav }
            <a href="{nav.path}" class:bg-teal-900={ $page.url.pathname == nav.path } class="block text-white px-3 py-2 rounded-md text-sm font-medium">{ nav.label }</a>
        {/each}
    </div>
        
</nav>
  
<div class="ml-64 p-4">
    <slot ></slot>
</div>