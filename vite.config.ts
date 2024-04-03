import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import proxy from './config/dev.config'
import VueRouter from 'unplugin-vue-router/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '!': path.resolve(__dirname, './'), // 空字符串别名指向最外层文件夹
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
  },
  build: {
    minify: 'terser', //必须开启：使用terserOptions才有效果
    terserOptions: {
      // 打包后删除console debugger
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  esbuild: {

  }
})
