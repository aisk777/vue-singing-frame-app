const ESLintPlugin = require('eslint-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts'
    }
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: '@import "@/assets/scss/style.scss";'
  //     }
  //   }
  // },
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'js', 'vue'],
        fix: true
      })
    ]
  }
});
