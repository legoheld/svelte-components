import { test, expect } from '@playwright/experimental-ct-svelte';
import TestImage from './TestImage.svelte';

test.describe('Test image', () => {

    test('should work', async ({ mount }) => {
        const component = await mount(TestImage );
        await expect(component).toHaveAttribute('alt', 'test');
    });

});

