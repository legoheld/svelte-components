<script lang="ts">

    import { DropDown } from '@lernetz/svelte-modals';
    import FilterMenu from './FilterMenu.svelte';

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
    <DropDown let:modal {align}>
        <button use:modal.button class="p-8 bg-green-500"> Menu Hallo</button>
        <div slot="panel" class="p-24 bg-white shadow-md w-176 rounded-md ">
            <div>I'm a panel content</div>
        </div>
    </DropDown>
</div>


<hr class="my-10">
<h1 class="text-24 font-bold mb-6">Accessible Menu</h1>

<div class="flex w-full flex-col items-center justify-center my-64">
    <DropDown let:modal let:focus {align}>
        <button use:modal.button use:focus.item={{listenOnly:true}} class="p-8"> Menu</button>
        <div slot="panel" class="p-24 bg-white shadow-md w-176 rounded-md">
            {#each choices as choice }
                <button
                    class="focus:bg-blue-800 focus:text-white flex w-full items-center"
                    use:focus.item
                    on:click={() => { console.log( choice ); modal.close()}}
                >
                {choice.name}</button>
                
            {/each}
            <hr>
            <button use:focus.item class="focus:bg-blue-800 focus:text-white">Demo 2</button>
        </div>
    </DropDown>
</div>


<DropDown let:modal {align} >
    <button use:modal.button >Add Filter +</button>
    <div slot="panel" class="p-24 bg-white shadow-md w-176 rounded-md">
        <FilterMenu items={choices} {filter} {modal} let:item let:focus>
            <button
                class="focus:bg-blue-800 focus:text-white flex w-full items-center"
                use:focus.item
                on:click={() => { console.log( item ); modal.close()}}
            >{item.name}</button>
        </FilterMenu>
    </div>
</DropDown>


<hr>


