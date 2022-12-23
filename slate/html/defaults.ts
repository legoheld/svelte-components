import Type from './types/Type.svelte';
import Link from './types/Link.svelte';
import Text from './types/Text.svelte';
import List from './types/List.svelte';

export const types = {
    'p': Type,
    'ul': List,
    'ol': List,
    'li': Type,
    'h1': Type,
    'h2': Type,
    'h3': Type,
    'a': Link,
    'text': Text
};
