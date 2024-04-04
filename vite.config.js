import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import removePreloads from './remove-preloads'
import { fileURLToPath, URL } from 'node:url'


// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  plugins: [
    vue(),
    removePreloads(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
