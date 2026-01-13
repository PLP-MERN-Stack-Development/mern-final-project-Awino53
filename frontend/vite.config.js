import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
         
      },
    },
  },

  optimizeDeps: {
    include: [
      "@chakra-ui/react",
      "@chakra-ui/system",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion"
    ]
  }
});
