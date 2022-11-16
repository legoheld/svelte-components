<script lang="ts">
    import { set,t, locale } from "@lernetz/svelte-translate";
    import type { Hst } from '@histoire/plugin-svelte'
    export let Hst:Hst;

    set( 'de', {
        'key': "Meine Übersetzung"
    });
    set( 'en', {
        'key': "My Translation"

    });

    let test:string[] = [ 'de', 'en' ];
</script>


<Hst.Story title="title">
    
    <Hst.Variant title="Test1">
        {$t('key')}
        <svelte:fragment slot="controls">
            <input bind:value={$locale}>
            <Hst.Select options={['de','en']} bind:value={$locale} title="Sprache"></Hst.Select>
        </svelte:fragment>
    </Hst.Variant>

    <Hst.Variant title="Test2">
        {$t('key')}
    </Hst.Variant>
    <!--
        Somehow this is not working
    -->
    
</Hst.Story>
