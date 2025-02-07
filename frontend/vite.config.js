
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
  
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update the service worker
      manifest: {
        name: 'Secret Room',  // The name of your app
        short_name: 'SecretRoom',
        description: 'A secure place for your conversations.',
        theme_color: '#8185fe',  
        icons: [
          {
            src: '/image/icon192.png',  
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'image/icon512.png',  
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
     
      injectManifest: false,  
    })

  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
})
