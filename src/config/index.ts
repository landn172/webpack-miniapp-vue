import { currentCli, resolve, isH5Platform } from "../utils";

const assertsDist = !isH5Platform ? resolve("./dist") : resolve("./dist-h5");

const buildConfig: IBuildConfig = {
  env: {
    NODE_ENV: '"production"'
  },
  index: "index.html",
  assertsRoot: assertsDist,
  assetsSubDirectory: "static",
  assetsPublicPath: "/",
  productionSourceMap: false,
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ["js", "css"]
};

const devConfig: IDevConfig = {
  env: {
    NODE_ENV: '"development"'
  },
  port: 8080,
  host: "127.0.0.1",
  autoOpenBrowser: false,
  assetsSubDirectory: "static",
  assetsPublicPath: "/",
  proxyTable: {},
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  cssSourceMap: false
};

export default function getDefaultConfig(): IDefaultConfig {
  return { dev: devConfig, build: buildConfig };
}
