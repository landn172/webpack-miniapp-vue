import { cssLoaders, htmlLoaders, cssH5Loader } from "./utils";

const isProduction = process.env.NODE_ENV === "production";

export default function getVueConfigLoader(config: IDefaultConfig) {
  return {
    loaders: {
      ...cssLoaders({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: true
      })
    },
    transformToRequire: {
      video: "src",
      source: "src",
      img: "src",
      image: "xlink:href"
    }
  };
}

export function getH5VueConfigLoader(config: IDefaultConfig) {
  return {
    loaders: {
      ...cssH5Loader({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: isProduction
      })
    },
    transformToRequire: {
      video: "src",
      source: "src",
      img: "src",
      image: "xlink:href"
    }
  };
}
