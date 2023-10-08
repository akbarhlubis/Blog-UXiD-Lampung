import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import AstroPWA from '@vite-pwa/astro'
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    alpinejs(),
    AstroPWA({
      devOptions: {
        enabled: true
      },
      manifest:{
        name: 'Laravel PWA App',
        short_name: 'Laravel PWA',
        description: 'My Awesome App description',
        theme_color: '#F5F6F7',
        background_color: '#F5F6F7',
        scope: '/',
        start_url: '/',
        screenshots: [
            {
                src: '/iconPWA.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: "any maskable"
            }
        ],
        // menambahkan icon
        icons: [
            {
                src: '/iconPWA.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: "any maskable"
            }
        ],
        // menambahkan shortcut ke homescreen
        shortcuts: [
            {
                name: 'My Shortcut',
                short_name: 'Shortcut',
                description: 'A shortcut that opens the app',
                url: '/',
                icons: [
                    {
                        src: 'public/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: "any maskable"
                    }
                ]
            }
        ]
    },
    }),
  ],
});