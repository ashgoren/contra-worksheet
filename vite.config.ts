// README: Also update aliases in tsconfig.app.json if you change them here.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint2'
import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({ open: true }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'PCDC Contra Worksheet',
        short_name: 'Worksheet',
        description: 'PCDC Contra Worksheet',
        theme_color: '#ffffff',
        icons: [
          {
          src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any' // android
          }
        ]
      }
    }),
    eslint({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      emitWarning: true,
      emitError: false
    })
  ],
  server: { open: true },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      types: "/src/types",
      sections: "/src/components/sections",
      hooks: "/src/hooks",
      utils: "/src/utils",
      services: "/src/services",
      contexts: "/src/contexts",
      providers: "/src/providers",
      constants: "/src/constants",
      inputs: "/src/components/inputs",
      ui: "/src/components/ui",
    }
  }
})
