// 添加 module-resolver 需要执行 npm install --save-dev babel-plugin-module-resolver
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@bases': './src/bases',
          '@modules': './src/modules',
          '@specs': './src/specs',
          '@examples': './src/examples',
        },
      },
    ],
  ],
};
