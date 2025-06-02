import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// <https://vitejs.dev/config/>
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: '<https://e2425-wads-l4bcg2-server.csbihub.id>',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
