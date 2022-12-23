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
        { label:'UI', children:[
            { path:'/ui/input', label:'Input'},
        ] },
        {
            path:"/image", label:"Image"
        }
    ]
</script>




<nav class="bg-gray-800 fixed top-0 left-0 bottom-0 w-256 px-24 py-32 shadow-md">
    <div class="space-y-8">
        {#each navigation as nav }
            <NavItem item={nav}></NavItem>
        {/each}
    </div>
        
</nav>
  
<div class="ml-256 p-16">
    <slot ></slot>
</div>