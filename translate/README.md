# @lernetz/svelte-translation

This module will help to translate a svelte application.
You can set one of more translation objects that contains translation keys and the corresponding translation.
It supports variables interpolation as well as plural forms for translations.


The following example shows how to use the translation module:

First make sure to set the one or more translations as soon as possible in your application
```ts
import { set } from "@lernetz/svelte-translation"

set( 'de', {
    'my key': 'Mein Schlüssel zum Erfolg',
});
```


Then you can use it in your svelte component:
```svelte
<script lang="ts">
    import { t } from "@lernetz/svelte-translation"
</script>

<div>
    <h1>{$t('my key')}</h1>
</div>
```



## Variables
```ts
set( 'de', {
    'my key': 'Mein {key} zum Erfolg',
});
```

```svelte
<script lang="ts">
    import { t } from "@lernetz/svelte-translation"
</script>

<div>
    <h1>{$t('my key', { values: { key:t( 'Schlüssel' ) } } ) }</h1>
</div>
```

## Plurals

```ts
set( 'de', {
    'my key': {
        '-50...-1': 'Minus',
        '0': 'Null',
        '1': 'Ein',
        '2...8': 'Einige',
        '8+': 'Viele'
    }
});
```

```svelte
<script lang="ts">
    import { t } from "@lernetz/svelte-translation"
</script>

<div>
    <h1>{$t('my key', { count:-20 } ) }</h1> <!-- Minus -->
    <h1>{$t('my key', { count:0 } ) }</h1> <!-- Null -->
    <h1>{$t('my key', { count:1 } ) }</h1> <!-- Ein -->
    <h1>{$t('my key', { count:3 } ) }</h1> <!-- Einige -->
    <h1>{$t('my key', { count:15 } ) }</h1> <!-- Viele -->
</div>
```


## Language switcher

If you like to make a language switcher on the fly set all required languages:
```ts
set( 'de', {
    'my key': 'Mein Schlüssel zum Erfolg',
});
set( 'en', {
    'my key': 'My key to success',
});

// or 
set( {
    de: {
        'my key': 'Mein Schlüssel zum Erfolg',
    },
    en: {
        'my key': 'My key to success',
    }
})
```


Then you can bind the `locale` store with a dropdown.
So if the local changes all translations will be replaced.
```svelte
<script lang="ts">
    import { locale } from "@lernetz/svelte-translate";

    export let locales:string[] = [ 'de', 'en' ];
</script>

<select bind:value={$locale} >
    {#each locales as l}
        <option value={l}>
            {l}
        </option>
	{/each}
</select>
```