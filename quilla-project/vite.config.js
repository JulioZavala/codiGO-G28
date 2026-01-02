import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  //Shadcn requiere del alias @ para la carpeta ./src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
