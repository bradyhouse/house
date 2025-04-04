import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import packageJson from './package.json'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/vue/fiddle-0018-InfiniteSelectJs/',
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
    'import.meta.env.PACKAGE_NAME': JSON.stringify(packageJson.name)
  },
  server: {
    proxy: {
      '/api/api': {
        target: 'http://localhost:2023/api/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/api/, ''),
      },
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
  },
})
