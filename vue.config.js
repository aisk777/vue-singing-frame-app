const ESLintPlugin = require('eslint-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts'
    }
  },
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'js', 'vue'],
        fix: true
      })
    ]
  }
});
