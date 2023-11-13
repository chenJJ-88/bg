export default {
  '/api': {
    target: 'http://10.0.204.199:18886/',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, '')
  }
}