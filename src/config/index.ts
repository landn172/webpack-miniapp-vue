import { currentCli, resolve } from '../utils'

const buildConfig: IBuildConfig = {
  env: {
    NODE_ENV: '"production"'
  },
  index: resolve('./dist/index.html'),
  assertsRoot: resolve('./dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: false,
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css']
}

const devConfig: IDevConfig = {
  env: {
    NODE_ENV: '"development"'
  },
  port: 8080,
  autoOpenBrowser: false,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {},
  cssSourceMap: false
}

export default function getDefaultConfig(): IDefaultConfig {
  return { dev: devConfig, build: buildConfig }
}
