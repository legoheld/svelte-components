import { test, expect } from '@playwright/test';

test.describe('Test image', () => {

    test.only( 'desktop - no sizes', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg').first();
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('src', "https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/o/height=570&width=1456/responsive.jpg");

    });

    test.only( 'desktop - sizes', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg').nth(1);
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('sizes', "(max-width: 480px) 300px,(max-width: 1024px) 600px,1000px");

    });

    test.only( 'desktop - presets', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const sources = await page.locator('source');
        const img = await page.getByAltText('test.jpg').last();
        await expect(sources).toHaveCount(1);
        await expect(sources.first()).toHaveAttribute('media', '(max-width: 800px)');
        await expect(img).toHaveAttribute('alt', 'test.jpg');

    });

});

