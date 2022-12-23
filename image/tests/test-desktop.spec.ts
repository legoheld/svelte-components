import { test, expect } from '@playwright/test';

test.describe('Test image', () => {

    test.only( 'desktop', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.waitForLoadState('domcontentloaded');
        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg');
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('sizes', "(max-width: 480px) 300px,(max-width: 1024px) 600px,1000px");

    });

});

