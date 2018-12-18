const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const mergeConfigs = require('webpack-merge')
const path = require('path')

module.exports = (env) => {
  const { commonConfig, DIST_DIR } = require('./webpack.config.common')(env)

  const devConfig = {
    output: {
      pathinfo: true,
      publicPath: 'http://localhost:3000/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: '.',
      hot: true,
      host: 'localhost',
      port: 3000
    },
    cache: true, // gets added by mode=development by default
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: `${DIST_DIR}\\`,
        seed: {
          name: 'Application Manifest'
        }
      })
    ]
  }

  return mergeConfigs(commonConfig, devConfig)
}