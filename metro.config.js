const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@bases': path.resolve(__dirname, './src/bases'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@specs': path.resolve(__dirname, './src/specs'),
      '@examples': path.resolve(__dirname, './src/examples'),
    },
  },
};


module.exports = mergeConfig(getDefaultConfig(__dirname), config);
