import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
// import AstroPWA from '@vite-pwa/astro'
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    alpinejs(),
    // AstroPWA({
    //   devOptions: {
    //     enabled: false
    //   },
    //   manifest:{
    //     name: 'UXiD Lampung',
    //     short_name: 'UXiD Lampung',
    //     description: 'Website komunitas UX Indonesia Lampung',
    //     theme_color: '#F5F6F7',
    //     background_color: '#F5F6F7',
    //     scope: '/',
    //     start_url: '/',
    //     screenshots: [
    //         {
    //             src: '/iconPWA.png',
    //             sizes: '512x512',
    //             type: 'image/png',
    //             purpose: "any maskable"
    //         }
    //     ],
    //     // menambahkan icon
    //     icons: [
    //         {
    //             src: '/iconPWA.png',
    //             sizes: '512x512',
    //             type: 'image/png',
    //             purpose: "any maskable"
    //         }
    //     ],
    //     // menambahkan shortcut ke homescreen
    //     shortcuts: [
    //         {
    //             name: 'My Shortcut',
    //             short_name: 'Shortcut',
    //             description: 'A shortcut that opens the app',
    //             url: '/',
    //             icons: [
    //                 {
    //                     src: 'public/pwa-512x512.png',
    //                     sizes: '512x512',
    //                     type: 'image/png',
    //                     purpose: "any maskable"
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // }),
  ],
});