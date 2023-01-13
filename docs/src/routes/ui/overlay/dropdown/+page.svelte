<script lang="ts">

    import { DropDown } from '@lernetz/svelte-overlay';
    
    import FilterMenu from './FilterMenu.svelte';
    import Code from '../../../../components/code.svelte';
    import { focusable } from '@lernetz/svelte-overlay/actions';

    let choices = [
        { name:'Name 1', modelName:'App\\Demo'},
        { name:'Name 2', modelName:'App\\Demo'},
        { name:'Name 3', modelName:'App\\Demo'},
        { name:'Name 4', modelName:'App\\Demo'},
    ]

    let align;


    function menuSelect( item, modal ) {
        modal.close();
        console.log( item );
    }


    function filter( item, input ) {
        return item.name.indexOf( input ) >= 0;
    } 
</script>

<div class="bg-slate-400 p-12 flex flex-row">
    <div>
        Aligment:
        <select bind:value={align}>
            <option value="Top">Top</option>
            <option value="TopLeft">Topleft</option>
            <option value="TopRight">TopRight</option>
            <option value="Bottom">Bottom</option>
            <option value="BottomLeft">Bottomleft</option>
            <option value="BottomRight">BottomRight</option>
            <option value="Left">Left</option>
            <option value="LeftTop">LeftTop</option>
            <option value="LeftBottom">LeftBottom</option>
            <option value="Right">Right</option>
            <option value="RightTop">RightTop</option>
            <option value="RightBottom">RightBottom</option>
            <option value="Center">Center</option>
        </select>
    </div>

</div>


<h1 class="text-24 font-bold mb-6">Positioning</h1>

<div class="flex w-full flex-col items-center justify-center my-64">
    <DropDown let:overlay {align}>
        <button use:overlay.trigger class="p-8 bg-green-500"> Menu Hallo</button>
        <div slot="overlay" class="p-24 bg-white shadow-md w-176 rounded-md ">
            <div>I'm a panel content</div>
        </div>
    </DropDown>
</div>


<hr class="my-10">
<h1 class="text-24 font-bold mb-6">Accessible Menu</h1>

<div class="max-w-prose">
    Use <Code>use:focus.item</Code> to select the items that are navigtable with the arrow keys.
    Make sure the element is focusable. Either use a <Code>&lt;button&gt;</Code> or make it focusable
    the <Code>use:focusable</Code> from the <Code>@lernetz/svelte-overlay/actions</Code> package.
</div>

<div class="flex w-full flex-col items-center justify-center my-64">
<DropDown let:overlay let:focus {align}>
    <button use:overlay.trigger use:focus.item={{listenOnly:true}} class="p-8"> Menu</button>
    <div slot="overlay" class="p-24 bg-white shadow-md w-176 rounded-md">
        {#each choices as choice }
            <button
                class="focus:bg-blue-800 focus:text-white hover:bg-blue-800 hover:text-white flex w-full items-center"
                use:focus.item
                on:click={() => { console.log( choice ); overlay.close()}}
            >
            {choice.name}</button>
            
        {/each}
        <hr>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div use:focusable use:focus.item class="py-8 px-12 bg-slate-300" on:click={() => { console.log( 'Demo 2' ); overlay.close()}}>
            Demo 2
        </div>
    </div>
</DropDown>
</div>


<DropDown let:overlay {align} >
    <button use:overlay.trigger >Add Filter +</button>
    <div slot="overlay" class="p-24 bg-white shadow-md w-176 rounded-md">
        <FilterMenu items={choices} {filter} let:item let:focus>
            <button
                class="focus:bg-blue-800 focus:text-white flex w-full items-center"
                use:focus.item
                on:click={() => { console.log( item ); overlay.close()}}
            >{item.name}</button>
        </FilterMenu>
    </div>
</DropDown>

