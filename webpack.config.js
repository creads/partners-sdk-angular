const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {

  var babelEnabled = false;

  if (argv.babel) {
    babelEnabled = true;
  }

  let minimizeEnabled = false;

  //building for production
  if (argv.mode && argv.mode === 'production') {
    minimizeEnabled = true;
  }

  console.warn('\x1b[33mBabel: ' + babelEnabled + '\x1b[0m');

  return {
    mode: 'production',
    entry: './index.js',
    optimization: {
      minimize: minimizeEnabled,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            output: {
              comments: false
            },
            mangle: false, //bugprone with angular if you set it to true,
            keep_fnames: true // bugprone when including the lib and re-uglifying
          }
        })
      ]
    },
    output: {
      filename: 'partners-sdk-angular.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'partners-sdk-angular',
      libraryTarget: 'umd',
      libraryExport: 'partners-sdk-angular'
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    plugins: [
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        babelEnabled ? {
          test: /\.js$/,
          //include the sources and some modules (only if babel is enabled)
          include: /(src)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: 'last 2 versions, ie 11, not ie<11, not ie_mob 10, not ie_mob 11',
                  useBuiltIns: 'usage',
                  modules: 'commonjs',
                  debug: false
                }]
              ],
            }
          }
        } : {}
      ]
    },
    resolve: {
      modules: [
        './src',
        './node_modules'
      ]
    }
  };
};
