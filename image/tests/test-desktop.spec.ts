import { test, expect } from '@playwright/experimental-ct-svelte';
import TestImage from './TestImage.svelte';

test.use({ viewport: { width: 1024, height: 768 } });

test.describe('Test image', () => {

    test('should work', async ({ mount }) => {
        const component = await mount(TestImage );
        await expect(component).toHaveAttribute('alt', 'test.jpg');
        await expect(component).toHaveAttribute('sizes', "(max-width: 480px) 300px,(max-width: 1024px) 600px,1000px");
    });

});

