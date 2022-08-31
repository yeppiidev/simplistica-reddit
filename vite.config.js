import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        short_name: "Simplistica",
        name: "Simplistica",
        description: "A lightweight Reddit client made with OnsenUI",
        id: "/simplistica-reddit/index.html",
        icons: [
          {
            src: "/simplistica-reddit/icons/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "/simplistica-reddit/icons/ic_192.png",
            sizes: "192X192",
            type: "image/png"
          },
          {
            src: "/simplistica-reddit/icons/ic_144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/simplistica-reddit/icons/ic_96.png",
            sizes: "96x96",
            type: "image/png"
          }
        ],
        start_url: "index.html",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#000000",
        background_color: "#ffffff"
      }
    })
  ],
  base: "/simplistica-reddit/"
})
