import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      emitWarning: true,
      emitError: false
    })
  ],
  server: { open: true },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      types: "/src/types",
    }
  }
})
