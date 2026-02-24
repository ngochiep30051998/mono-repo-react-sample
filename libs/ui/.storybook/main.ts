import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@ui': resolve(__dirname, '../src'),
      '@core': resolve(__dirname, '../../core/src'),
      '@shared-types': resolve(__dirname, '../../shared-types/src'),
      '@atoms': resolve(__dirname, '../src'),
      '@molecules': resolve(__dirname, '../src/molecules'),
      '@organisms': resolve(__dirname, '../src/organisms'),
    };
    return config;
  },
};

export default config;
