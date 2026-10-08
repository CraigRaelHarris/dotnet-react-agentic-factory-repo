import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import gates from '../../quality-gates.json' with { type: 'json' };

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    proxy: { '/api': 'http://localhost:5080', '/health': 'http://localhost:5080' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}'],
      thresholds: {
        lines: gates.frontendCoverage,
        statements: gates.frontendCoverage,
        functions: gates.frontendCoverage,
        branches: gates.frontendCoverage,
      },
    },
  },
});
