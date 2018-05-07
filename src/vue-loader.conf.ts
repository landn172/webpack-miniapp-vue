import { cssLoaders, htmlLoaders } from './utils'

const isProduction = true

export default function getVueConfigLoader(config: IDefaultConfig) {
  return {
    loaders: {
      ...cssLoaders({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: isProduction
      }),
      ...htmlLoaders
    },
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
