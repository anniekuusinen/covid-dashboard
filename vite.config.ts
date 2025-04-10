import { defineConfig } from 'vitest/config'
import { configDefaults } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  plugins: [
    tailwindcss(),
  ],
  },
);