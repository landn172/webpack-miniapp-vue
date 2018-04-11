import { cssLoaders } from './utils'

const isProduction = true

export default function getVueConfigLoader(config: IDefaultConfig) {
  return {
    loaders: cssLoaders({
      sourceMap: isProduction
        ? config.build.productionSourceMap
        : config.dev.cssSourceMap,
      extract: isProduction
    }),
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
