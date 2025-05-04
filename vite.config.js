import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
    plugins: [react(), commonjs()],
    server: {
        port: 3000,
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            external: [],
            output: {
                format: 'es',
                inlineDynamicImports: true
            }
        }
    },
    optimizeDeps: {
        include: [
            'canvasjs',
            '@canvasjs/react-charts',
            'chart.js',
            'react-chartjs-2'
        ]
    }
});