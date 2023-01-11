<div class="flex flex-row">
    <div class="relative group" view="DropDown" data-content="[[ { view:'CreateDialog', data:{ editor:editor, after:model, entries:editor.createEntries } } ]]" data-hide-inside="[[ true ]]">
        <button aria-label="Element unterhalb einzufügen">
            <svg view="Icon" data-name="article-plus"></svg>
        </button>
        <div class="absolute z-50 -left-80 hidden group-hover:block -right-144 bg-darkerGray text-lightGray text-15 p-8 rounded">
            <span class="font-bold text-white ">Klicken</span> um Element unterhalb einzufügen
        </div>
    </div>
    <!-- <div view="MenuAdd" data-after="[[ data.model ]]"></div> -->
    <div class="handle cursor-move pr-8 relative group">
        <svg view="Icon" data-name="article-handle"></svg>
        <div class="absolute  z-50 -left-80  hidden group-hover:block -right-144 bg-darkerGray text-lightGray text-15 p-8 rounded">
            <span class="font-bold text-white ">Ziehen</span> zum Verschieben
            <!-- <br/> oder <br/>
            <span class="font-bold text-white ">Klicken</span> für mehr Optionen -->
        </div>
    </div>
</div>