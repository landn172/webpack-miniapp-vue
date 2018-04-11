import * as path from 'path'
import * as express from 'express'
import * as webpack from 'webpack'
import * as proxyMiddleware from 'http-proxy-middleware'
import * as webpackHardDisk from 'webpack-dev-middleware-hard-disk'
import getDefaultConfig from './config/index'
import getDevWebpackConfig from './webpack.dev.conf'
import * as merge from 'webpack-merge'

export default function runDevServer(config: IDefaultConfig, localWebpackConfig: any) {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }
  
  const devWebpackConfig = getDevWebpackConfig(config)
  const webpackConfig = merge(devWebpackConfig, localWebpackConfig)
  const port = process.env.PORT || config.dev.port
  const autoOpenBrowser = !!config.dev.autoOpenBrowser
  const proxyTable = config.dev.proxyTable

  const app = express()
  const compiler = webpack(webpackConfig)

  // proxy api requests
  Object.keys(proxyTable).forEach(function(context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  const staticPath = path.posix.join(
    config.dev.assetsPublicPath,
    config.dev.assetsSubDirectory
  )
  app.use(staticPath, express.static('./static'))

  const uri = 'http://localhost:' + port
  let _resolve
  const readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  const server = app.listen(port, 'localhost')

  console.log(webpackConfig.output.publicPath)
  // for 小程序的文件保存机制
  webpackHardDisk(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  return {
    ready: readyPromise,
    close: () => {
      server.close()
    }
  }
}
