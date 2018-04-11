interface IBuildConfig {
  [x: string]: any
  /**
   * 环境变量 process.env
   */
  env: {
    [x: string]: string
    NODE_ENV: string
  }
  index: string
  assertsRoot: string
  assetsSubDirectory: string
  assetsPublicPath: string
  productionSourceMap: boolean
  productionGzip: boolean
  productionGzipExtensions: string[]
}

interface IDevConfig {
  [x: string]: any
  /**
   * 环境变量 process.env
   */
  env: {
    [x: string]: string
    NODE_ENV: string
  }
  port: number
  autoOpenBrowser: boolean
  assetsSubDirectory: string
  assetsPublicPath: string
  proxyTable: any
  cssSourceMap: boolean
}

/**
 * 默认配置
 */
interface IDefaultConfig {
  /**
   * watch&开发配置
   */
  dev: IDevConfig
  /**
   * publish配置
   */
  build: IBuildConfig
}