/*
 * @Author: jrucker
 * @Description: 配置文件
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/10/20 11:06:04
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 压缩css
const dynamicProxy = require('./build/proxy/index.ts')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '后台管理'
const port = process.env.port || 8445
const cdn = {
  css: [
    // 'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/element-plus@1.0.2-beta.35/theme-chalk/index.css',
  ],
  js: [
    'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/vue@3.2.6/vue.global.prod.js',
    'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/element-plus@1.0.2-beta.35/index.full.js',
    '//at.alicdn.com/t/font_2288564_y9n0hmrs19.js',
  ]
};

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: dynamicProxy.proxy
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss'),
      ]
    }
  },
  configureWebpack: config => {
    config.name = name
    config.resolve.alias['@'] = resolve('src')
    config.optimization.minimizer[0].options.terserOptions.output.comments = false
    config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')

    if (process.env.NODE_ENV === "production") {
      config.externals({
        vue: "Vue",
        'element-plus': "ElementPlus",
      });

      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }

    config
      .output
      .filename('static/js/[name].js?v=[hash]')
      .chunkFilename('static/js/[name].js?v=[chunkhash]')
      .end()

    let miniCssExtractPlugin = new MiniCssExtractPlugin({
      filename: 'static/css/[name].css?v=[hash:8]',
      chunkFilename: 'static/css/[name].css?v=[hash:8]'
    })
    config.plugin('extract-css').use(miniCssExtractPlugin)
  }
}
