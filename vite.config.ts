import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { HstSvelte } from '@histoire/plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })]
    }),
  ],
  histoire: {
    plugins: [
      HstSvelte(),
    ],
    tree: {
      groups: [
        {
          id: 'top',
          title: 'Hallo',
        },
      ],
    },
  },
})