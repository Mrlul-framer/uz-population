
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const emptyModule = fileURLToPath(new URL('./src/empty-module.js', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      html2canvas: emptyModule,
      canvg: emptyModule,
      dompurify: emptyModule,
    },
  },
})
