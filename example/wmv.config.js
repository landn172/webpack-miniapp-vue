const MpvueEntry = require('mpvue-entry');

const path = require('path');

// hack mpvue-entry require.main.filename
require.main.filename = path.resolve(process.cwd(), 'src/main.js');

const entry = MpvueEntry.getEntry('./src/pages.js');

function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  webpack: {
    entry,
    devtool: 'cheap-source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': resolve('src'),
      },
      symlinks: false,
      modules: [resolve('../node_modules')],
      aliasFields: ['mpvue', 'weapp', 'browser'],
      mainFields: ['browser', 'module', 'main'],
    },
    resolveLoader: {
      modules: [resolve('../node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/TS\.vue$/],
              },
            },
          ],
        },
      ],
    },
    externals: {
      plugin: ` new Promise((resolve)=>{
        var interval = setInterval(()=>{
          if(wx.TuhuPluginModule){
            clearInterval(interval)
            resolve(wx.TuhuPluginModule)
          }
        },100)
      })`,
    },
    plugins: [new MpvueEntry()],
  },
  config: {
    dev: {
      env: {
        PLATFORM_ENV: `"${process.env.PLATFORM_ENV || ''}"`,
        API_ENV: `"${process.env.API_ENV || ''}"`,
      },
    },
  },
};
