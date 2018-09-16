import * as ora from "ora";
import * as rm from "rimraf";
import chalk from "chalk";
import * as path from "path";
import * as webpack from "webpack";
import { currentCli, isH5Platform } from "./utils";
import getProdWebpackConfig, {
  getH5ProdWebpackConfig
} from "./webpack.prod.conf";
import * as merge from "webpack-merge";

export default function runBuild(
  config: IDefaultConfig,
  localWebpackConfig: any
) {
  const spinner = ora("building for production...");
  spinner.start();
  rm(path.join(config.build.assertsRoot, '*'), err => {
    if (err) throw err;
    const getWebpackConfig = isH5Platform
      ? getH5ProdWebpackConfig
      : getProdWebpackConfig;
    const prodWebpackConfig = getWebpackConfig(config);
    const webpackConfig = merge(prodWebpackConfig, localWebpackConfig);
    webpack(webpackConfig, function(err, stats) {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + "\n\n"
      );

      if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"));
        process.exit(1);
      }

      console.log(chalk.cyan("  Build complete.\n"));
      console.log(
        chalk.yellow(
          "  Tip: built files are meant to be served over an HTTP server.\n" +
            "  Opening index.html over file:// won't work.\n"
        )
      );
    });
  });
}
