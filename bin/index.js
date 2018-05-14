#!/usr/bin/env node

const program = require('commander')
const { dev, build } = require('../lib')
const { readPkgConfig } = require('../lib/utils')

const pkgConfig = readPkgConfig()

program.version(pkgConfig.version, '-v, --version')
program.command('dev').action(() => {
  dev()
})
program.command('build').action(() => {
  build()
})

program.parse(process.argv)
