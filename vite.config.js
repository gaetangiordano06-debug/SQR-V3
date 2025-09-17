import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// dev => '/', prod (GitHub Pages) => '/SQR-V3/'
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/SQR-V3/' : '/',
  server: { port: 5173 },
}))
