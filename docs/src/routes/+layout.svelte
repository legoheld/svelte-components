<script lang="ts">
    import "../app.css";
    import NavItem from './NavItem.svelte';


    const navigation = [
        { path:'/', label:'Home' },
        { path:'/embed', label:'Embed' },
        { label:'Slate', children:[
            { path:'/slate/html', label:'Html'},
            { path:'/slate/editor', label:'Editor'},
        ] },
        {
            path:"/image", label:"Image"
        }
    ]
</script>




<nav class="bg-gray-800 fixed top-0 left-0 bottom-0 w-64 px-6 py-8 shadow-md">
    <div class="space-y-2">
        {#each navigation as nav }
            <NavItem item={nav}></NavItem>
        {/each}
    </div>
        
</nav>
  
<div class="ml-64 p-4">
    <slot ></slot>
</div>