import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    proxy: {
      // '/api': {
      //   target: 'http://192.168.1.212:8081',
      //   changeOrigin: true,
      //   rewrite: (pathStr) => pathStr.replace('/api', '')
      // }
    }
  }
})
