import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Nếu deploy lên GitHub Pages với tên repo, uncomment và đổi tên repo:
  // base: '/kanji-master/',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
