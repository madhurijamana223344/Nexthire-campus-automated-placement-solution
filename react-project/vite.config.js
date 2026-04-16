import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In dev: /api/... → http://localhost:5000/api/...
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // In dev: /uploads/... → http://localhost:5000/uploads/...
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})
