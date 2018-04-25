import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as path from 'path'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import getBaseWebpackConfig from './webpack.base.conf'
import {
  styleLoaders,
  assetsPath,
  resolve
} from './utils'

export default function getDevWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getBaseWebpackConfig(config)
  return merge(baseWebpackConfig, {
    module: {
      rules: styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        extract: true
      })
    },
    devtool: '#source-map',
    output: {
      path: config.build.assertsRoot,
      // filename: utils.assetsPath('js/[name].[chunkhash].js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      filename: assetsPath('js/[name].js', config),
      chunkFilename: assetsPath('js/[id].js', config)
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),

      // copy from ./webpack.prod.conf.js
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: utils.assetsPath('css/[name].[contenthash].css')
        filename: assetsPath('css/[name].wxss', config)
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            (module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf('node_modules') >= 0) ||
            count >= 2
          )
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve('./static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ]),

      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'index.html',
      //   inject: true
      // }),
      new FriendlyErrorsPlugin()
    ]
  })
}
