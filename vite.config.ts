import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import proxy from './config/dev.config'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '': path.resolve(__dirname, './pubilc'),
    }
  },
  // 代理
  server: {
    host: '0.0.0.0',//允许局域网访问
    port: 9527,
    open: true,
    proxy: {
      ...proxy
    }
  }
})
