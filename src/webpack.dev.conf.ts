import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as FriendlyErrorsPlugin from "friendly-errors-webpack-plugin";
import * as path from "path";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");

import getBaseWebpackConfig, {
  getH5BaseWebpackConfig
} from "./webpack.base.conf";
import {
  styleLoaders,
  assetsPath,
  resolve,
  createWebpackVenderPlugins
} from "./utils";

export default function getDevWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getBaseWebpackConfig(config);
  return merge(baseWebpackConfig, {
    module: {
      rules: styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        extract: true
      })
    },
    devtool: "#source-map",
    output: {
      path: config.build.assertsRoot,
      // filename: utils.assetsPath('js/[name].[chunkhash].js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      filename: assetsPath("js/[name].js", config),
      chunkFilename: assetsPath("js/[id].js", config)
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": config.dev.env
      }),

      // copy from ./webpack.prod.conf.js
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: utils.assetsPath('css/[name].[contenthash].css')
        filename: assetsPath("css/[name].wxss", config)
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      ...createWebpackVenderPlugins(),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve("./static"),
          to: config.build.assetsSubDirectory,
          ignore: [".*"]
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
  });
}

export function getH5DevWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getH5BaseWebpackConfig(config);
  return merge(baseWebpackConfig, {
    module: {
      rules: styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        extract: false
      })
    },
    devtool: "#source-map",
    devServer: {
      clientLogLevel: "warning",
      historyApiFallback: {
        rewrites: [
          {
            from: /.*/,
            to: path.posix.join(config.dev.assetsPublicPath, "index.html")
          }
        ]
      },
      hot: true,
      contentBase: false, // since we use CopyWebpackPlugin.
      compress: true,
      host: config.dev.host,
      port: config.dev.port,
      open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true, // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: config.dev.poll
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": config.dev.env
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: "index.html",
        inject: true
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve("./static"),
          to: config.dev.assetsSubDirectory,
          ignore: [".*"]
        }
      ])
    ]
  });
}
