const ESLintPlugin = require('eslint-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/_variables.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    config.module.rules.delete('svg');
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeTitle: true },
            { removeAttrs: { attrs: ['fill', 'class', 'id', 'data-name'] } },
            { removeStyleElement: true },
            { removeViewBox: false },
            { addClassesToSVGElement: { className: 'c-svg' } }
          ]
        }
      });
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
