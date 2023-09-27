
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
export default defineConfig({
  // envDir: 'env',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    },
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
  },
  // npm run build打包后，运行npm run preview
  preview: {
    port: 5173,
    host: 'localhost',
    open: true
  },
  // npm run dev
  server: {
    port: 5173,
    host: 'localhost',
    open: true,
    cors: true,
    // https: true,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:30483',
    //     changeOrigin: true,
    //     rewrite: '/'
    //   }
    // }
  },
});