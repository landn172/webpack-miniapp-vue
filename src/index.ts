import runDevServer from "./dev-server";
import getDevWebpackConfig from "./webpack.dev.conf";
import getDefaultConfig from "./config/index";
import {
  getProjectWebpackConfig,
  getProjectEnvConfig,
  getMergedEnvConfig
} from "./utils";
import runBuild from "./build";
import { runH5DevServer } from "./dev-server";

export function build(webpackConfig) {
  console.log("start run build...");
  const defaultConfig = getDefaultConfig();
  const config = getMergedEnvConfig(defaultConfig);
  const localWebpackConfig = webpackConfig || getProjectWebpackConfig();
  return runBuild(config, localWebpackConfig);
}

export function buildH5(webpackConfig) {
  console.log('start run buildH5...')
  const defaultConfig = getDefaultConfig();
  const config = getMergedEnvConfig(defaultConfig, true);
  const localWebpackConfig = webpackConfig || getProjectWebpackConfig(true);
  return runBuild(config, localWebpackConfig);
}

export function dev(webpackConfig) {
  console.log("start run dev...");

  const defaultConfig = getDefaultConfig();
  const config = getMergedEnvConfig(defaultConfig);
  const localWebpackConfig = webpackConfig || getProjectWebpackConfig();
  return runDevServer(config, localWebpackConfig);
}

export function devH5(webpackConfig) {
  console.log("start run dev...");
  const defaultConfig = getDefaultConfig();
  const config = getMergedEnvConfig(defaultConfig, true);
  const localWebpackConfig = webpackConfig || getProjectWebpackConfig(true);

  return runH5DevServer(config, localWebpackConfig);
}
