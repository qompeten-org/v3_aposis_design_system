import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  if (isLib) {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src'],
          exclude: ['src/playground', '**/*.test.ts', '**/*.test.tsx'],
          rollupTypes: false,
        }),
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
      build: {
        outDir: 'dist',
        lib: {
          entry: {
            index: resolve(__dirname, 'src/index.ts'),
            'atoms/index': resolve(__dirname, 'src/atoms/index.ts'),
            'molecules/index': resolve(__dirname, 'src/molecules/index.ts'),
            'organisms/index': resolve(__dirname, 'src/organisms/index.ts'),
            'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
          },
          formats: ['es', 'cjs'],
          fileName: (format, entryName) => {
            const ext = format === 'es' ? 'js' : 'cjs';
            return `${entryName}.${ext}`;
          },
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'style.css';
              return assetInfo.name || 'assets/[name][extname]';
            },
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        sourcemap: true,
        emptyOutDir: true,
      },
    };
  }

  // Default: Build Playground SPA web application (for Vercel & local preview)
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist-app',
      emptyOutDir: true,
    },
  };
});
