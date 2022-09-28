// const ESLintPlugin = require('eslint-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: './src/renderer.ts',
    preview: './src/preview/renderer.ts'
  },
  pluginOptions: {
    electronBuilder: {
      preload: './src/background/preload.ts',
      customFileProtocol: './',
      builderOptions: {
        appId: 'com.ai.singing-frame.app',
        mac: {
          target: 'dmg'
        },
        win: {
          target: {
            target: 'zip',
            arch: ['x64']
          }
        },
        // TODO resource内の出力テスト
        extraResources: 'README.md'
      }
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
  }
});
