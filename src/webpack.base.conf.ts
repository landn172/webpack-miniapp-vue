import * as target from 'mpvue-webpack-target'
import getDefaultConfig from './config/index'
import { resolve, assetsPath, ownDir, resolveLocalModule } from './utils'
import getVueConfigLoader from './vue-loader.conf'

const MpvuePlugin = require('webpack-mpvue-asset-plugin')

export default function getBaseWebpackConfig(config: IDefaultConfig) {
  const vueLoaderConfig = getVueConfigLoader(config)
  // we can resolve own node_modules
  const resolveModules = [
    resolve('node_modules'),
    'node_modules',
    ownDir('node_modules')
  ]
  return {
    target,
    output: {
      path: config.build.assertsRoot,
      filename: '[name].js',
      publicPath:
        process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', 'wxml', 'html'],
      alias: {
        '@': resolve('src'),
        vue: 'mpvue'
      },
      modules: resolveModules,
      symlinks: false
    },
    resolveLoader: {
      symlinks: true,
      modules: resolveModules
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/,
          loader: resolveLocalModule('mpvue-loader'),
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          include: [resolve('src'), resolve('node_modules/mpvue-entry')],
          use: [
            resolveLocalModule('babel-loader'),
            {
              loader: resolveLocalModule('mpvue-loader'),
              options: {
                checkMPEntry: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: resolveLocalModule('url-loader'),
          options: {
            limit: 10000,
            name: assetsPath('img/[name].[ext]', config)
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: resolveLocalModule('url-loader'),
          options: {
            limit: 10000,
            name: assetsPath('media/[name]].[ext]', config)
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: resolveLocalModule('url-loader'),
          options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[ext]', config)
          }
        }
      ]
    },
    plugins: [new MpvuePlugin()]
  }
}
