import * as path from 'path'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import getBaseWebpackConfig from './webpack.base.conf'
import {
  styleLoaders,
  assetsPath,
  resolve,
  createWebpackVenderPlugins,
  resolveLocalModule
} from './utils'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

export default function getProdWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getBaseWebpackConfig(config)
  const env = config.build.env

  return merge(baseWebpackConfig, {
    module: {
      rules: [
        {
          test: /\.(html|wxml|axml)$/,
          loader: resolveLocalModule('html-loader'),
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }
        },
        ...styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      ]
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      // filename: utils.assetsPath('js/[name].[chunkhash].js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      filename: assetsPath('js/[name].js', config),
      chunkFilename: assetsPath('js/[id].js', config)
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new UglifyJsPlugin({
        sourceMap: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: utils.assetsPath('css/[name].[contenthash].css')
        filename: assetsPath('css/[name].wxss', config)
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        assetNameRegExp: /\.(css|wxss|acss)/g,
        cssProcessorOptions: {
          safe: true
        }
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      // new HtmlWebpackPlugin({
      //   filename: config.build.index,
      //   template: 'index.html',
      //   inject: true,
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   },
      //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      //   chunksSortMode: 'dependency'
      // }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // split vendor js into its own file
      ...createWebpackVenderPlugins(),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve('static'),
          to: path.resolve(
            config.build.assertsRoot,
            config.build.assetsSubDirectory
          ),
          ignore: ['.*']
        }
      ])
    ]
  })
}
