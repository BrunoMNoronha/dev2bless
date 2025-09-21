import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Hospedagem em domínio raiz: base '/'
export default defineConfig({ plugins: [react()], base: '/' })
