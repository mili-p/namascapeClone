import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import Manifest from './public/site.manifest.json'


export default defineConfig({
  base:"/admin-namascape/",
  plugins: [
      react(),
      
      VitePWA({
          manifest:Manifest,
          workbox: {
              globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,json,ico}']
          }
      })
  ]
})
