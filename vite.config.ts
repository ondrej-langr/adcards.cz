import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'
import { promPlugin } from '@prom-cms/vite/plugins'
import * as path from 'path'

export default defineConfig({
  build: {
    outDir: '../../public/dist',
  },
  plugins: [
    liveReload('../(modules|public)/**/*.(php|ts|js|css|scss|json|twig)'),
    promPlugin(),
  ],
})
