import Type from './nodes/Type.svelte';
import Link from './nodes/Link.svelte';
import Text from './nodes/Text.svelte';
import List from './nodes/List.svelte';

export const nodes = {
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
