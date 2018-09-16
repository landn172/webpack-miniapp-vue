import * as path from "path";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin";
import getBaseWebpackConfig, { getH5BaseWebpackConfig } from "./webpack.base.conf";
import {
  styleLoaders,
  assetsPath,
  resolve,
  createWebpackVenderPlugins,
  resolveLocalModule
} from "./utils";

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

export default function getProdWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getBaseWebpackConfig(config);
  const env = config.build.env;

  return merge(baseWebpackConfig, {
    module: {
      rules: [
        ...styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      ]
    },
    devtool: config.build.productionSourceMap ? "#source-map" : false,
    output: {
      path: config.build.assetsRoot,
      // filename: utils.assetsPath('js/[name].[chunkhash].js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      filename: assetsPath("[name].js", config),
      chunkFilename: assetsPath("[id].js", config)
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        "process.env": env
      }),
      new UglifyJsPlugin({
        sourceMap: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: utils.assetsPath('css/[name].[contenthash].css')
        filename: assetsPath("[name].wxss", config)
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        assetNameRegExp: /\.(css|wxss|acss)/g,
        cssProcessorOptions: {
          safe: true
        }
      }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // split vendor js into its own file
      ...createWebpackVenderPlugins(),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve("static"),
          to: path.resolve(
            config.build.assertsRoot,
            config.build.assetsStaticPath
          ),
          ignore: [".*"]
        }
      ])
    ]
  });
}

export function getH5ProdWebpackConfig(config: IDefaultConfig) {
  const baseWebpackConfig = getH5BaseWebpackConfig(config);
  const env = config.build.env;
  return merge(baseWebpackConfig, {
    module: {
      rules: [
        ...styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      ]
    },
    devtool: false,
    output: {
      path: config.build.assetsRoot,
      filename: assetsPath("js/[name].[chunkhash].js", config),
      chunkFilename: assetsPath("js/[id].[chunkhash].js", config)
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        "process.env": env
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: utils.assetsPath('css/[name].[contenthash].css')
        filename: assetsPath("css/[name].[contenthash].css", config),
        allChunks: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: config.build.index,
        template: "index.html",
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: "dependency"
      }),
      new webpack.HashedModuleIdsPlugin(),
      // split vendor js into its own file
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks(module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(__dirname, "../node_modules")) ===
              0
          );
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        chunks: ["vendor"]
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "app",
        async: "vendor-async",
        children: true,
        minChunks: 3
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: resolve("static"),
          to: path.resolve(
            config.build.assertsRoot,
            config.build.assetsStaticPath
          ),
          ignore: [".*"]
        }
      ])
    ]
  });
}
