import { test, expect } from '@playwright/test';

test.describe('Test image', () => {

    test.only( 'desktop - default', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg').first();
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('src', "https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/large.jpg");

    });

    test.only( 'desktop - static image with route', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('636baf36473fb5003d262b98').nth(0);
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('src', "https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/large.jpg");

    });

    test.only( 'desktop - with breakpoints', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg').nth(1);
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('src', "https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/large.jpg");

    });

    test.only( 'desktop - with breakpoints, relative to parent', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('test.jpg').nth(2);
        await expect(img).toHaveAttribute('alt', 'test.jpg');
        await expect(img).toHaveAttribute('src', "https://assets.test.b.lernetz.host/svelte-img-test/convert/636baf36473fb5003d262b98.jpg/medium.jpg");

    });

    test.only( 'desktop - error', async ( { page } ) => {
        await page.setViewportSize( {
            width: 1024,
            height: 768
        } );

        await page.goto( '/image' );

        const img = await page.getByAltText('no-file').nth(0);
        await expect(img).toHaveAttribute('alt', 'no-file');
        await expect(img).toHaveAttribute('src', "https://placehold.co/600x400?text=Image Error");

    });

});

