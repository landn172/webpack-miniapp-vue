import * as target from "mpvue-webpack-target";
import getDefaultConfig from "./config/index";
import {
  resolve,
  assetsPath,
  ownDir,
  resolveLocalModule,
  htmlLoaders
} from "./utils";
import getVueConfigLoader, { getH5VueConfigLoader } from "./vue-loader.conf";
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const MpvuePlugin = require("webpack-mpvue-asset-plugin");

// we can resolve own node_modules
const resolveModules = [
  resolve("node_modules"),
  "node_modules",
  ownDir("node_modules")
];

export default function getBaseWebpackConfig(config: IDefaultConfig) {
  const vueLoaderConfig = getVueConfigLoader(config);
  return {
    target,
    output: {
      path: config.build.assertsRoot,
      filename: "[name].js",
      publicPath:
        process.env.NODE_ENV === "production"
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: [".js", ".vue", ".json", "wxml", "html"],
      alias: {
        "@": resolve("src"),
        vue: "mpvue"
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
          loader: "eslint-loader",
          enforce: "pre",
          include: [resolve("src")],
          options: {
            formatter: require("eslint-friendly-formatter")
          }
        },
        htmlLoaders(),
        {
          test: /\.vue$/,
          loader: resolveLocalModule("mpvue-loader"),
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          include: [resolve("src"), resolve("node_modules/mpvue-entry")],
          use: [
            resolveLocalModule("babel-loader"),
            {
              loader: resolveLocalModule("mpvue-loader"),
              options: {
                checkMPEntry: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("img/[name].[ext]", config)
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("media/[name]].[ext]", config)
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("fonts/[name].[ext]", config)
          }
        }
      ]
    },
    plugins: [new MpvuePlugin()]
  };
}

export function getH5BaseWebpackConfig(config: IDefaultConfig) {
  const vuerLoaderConfig = getH5VueConfigLoader(config);
  return {
    context: resolve("./"),
    output: {
      path: config.build.assertsRoot,
      filename: "[name].js",
      publicPath:
        process.env.NODE_ENV === "production"
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: { "@": resolve("src"), vue$: "vue/dist/vue.esm.js" },
      modules: resolveModules,
      symlinks: false
    },
    externals: {
      vue: 'Vue',
      vuex: 'Vuex'
    },
    resolveLoader: {
      symlinks: true,
      modules: resolveModules
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [resolve("src")],
          options: { formatter: require("eslint-friendly-formatter") }
        },
        htmlLoaders(),
        {
          test: /\.vue$/,
          loader: resolveLocalModule("vue-loader"),
          options: vuerLoaderConfig
        },
        {
          test: /\.js$/,
          include: [
            resolve("src"),
            resolve("test"),
            resolve("node_modules/webpack-dev-server/client")
          ],
          use: [resolveLocalModule("babel-loader")]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("img/[name].[hash:7].[ext]", config)
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("media/[name].[hash:7].[ext]", config)
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: resolveLocalModule("url-loader"),
          options: {
            limit: 10000,
            name: assetsPath("fonts/[name].[hash:7].[ext]", config)
          }
        }
      ]
    },
    plugins: [new VueLoaderPlugin()],
    node: {
      setImmediate: false,
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    }
  };
}
