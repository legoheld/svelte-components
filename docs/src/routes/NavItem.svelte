<script context="module" lang="ts">
export interface INavItem {
    label:string;
    path?:string;
    children?:Array<INavItem>;
}
</script>



<script lang="ts">
import { page } from '$app/stores';

export let item:INavItem;
</script>



{#if item.path }
    <a href="{item.path}" class:bg-teal-900={ $page.url.pathname == item.path } class="block text-white px-3 py-2 rounded-md text-sm font-medium">{ item.label }</a>
{:else }
    <div class="text-white px-3 py-2 rounded-md text-sm font-medium">
        { item.label }
    </div>
    <div class="pl-2">
        {#each item.children as child }
            <svelte:self item={child}/>
        {/each}
    </div>
{/if}