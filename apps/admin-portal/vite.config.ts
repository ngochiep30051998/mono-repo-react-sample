import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const root = path.resolve(__dirname, '../..');

  return {
    root: __dirname,
    plugins: [react()],
    resolve: {
      alias: {
        '@ui': path.join(root, 'libs/ui/src'),
        '@atoms': path.join(root, 'libs/ui/src'),
        '@molecules': path.join(root, 'libs/ui/src/molecules'),
        '@organisms': path.join(root, 'libs/ui/src/organisms'),
        '@templates': path.join(root, 'libs/ui/src/templates'),
        '@utils': path.join(root, 'libs/ui/src/utils'),
        '@core': path.join(root, 'libs/core/src'),
        '@shared-types': path.join(root, 'libs/shared-types/src'),
        '@hooks': path.join(root, 'libs/hooks/src'),
        '@features/admin/auth': path.join(root, 'libs/features/admin/auth/src'),
        '@features/admin/feature-dashboard': path.join(root, 'libs/features/admin/dashboard/src'),
        '@features/admin/feature-users': path.join(root, 'libs/features/admin/users/src'),
        '@features/admin/feature-products': path.join(root, 'libs/features/admin/products/src'),
        '@features/admin/feature-orders': path.join(root, 'libs/features/admin/orders/src'),
        '@mocks': path.join(root, 'libs/mocks/src'),
        '@theme': path.join(root, 'libs/theme/src'),
        '@contexts': path.join(root, 'libs/contexts/src'),
        '@stores': path.join(root, 'libs/stores/src'),
        '@services': path.join(root, 'libs/services/src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      port: Number(env.VITE_PORT) || 4200,
    },
  };
});
