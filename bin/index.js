#!/usr/bin/env node

const program = require("commander");
const { dev, devH5, build, buildH5 } = require("../lib");
const { readPkgConfig } = require("../lib/utils");

const pkgConfig = readPkgConfig();

program.version(pkgConfig.version, "-v, --version");

// 默认平台微信
// "wechat" | "h5"
const PLATFORM = process.env.PLATFORM_ENV || "wechat";

program.command("dev").action(() => {
  if (PLATFORM === "h5") return devH5();
  dev();
});

program.command("build").action(() => {
  if (PLATFORM === "h5") return buildH5();
  build();
});

program.parse(process.argv);
