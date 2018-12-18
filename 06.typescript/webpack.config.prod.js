const HtmlWebpackPlugin = require('html-webpack-plugin')
const mergeConfigs = require('webpack-merge')
const path = require('path')

module.exports = (env) => {
  const { commonConfig } = require('./webpack.config.common')(env)

  const prodConfig = {
    output: {
      publicPath: '.',
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].bundle.js'
    },
    mode: 'none',
    devtool: 'none',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
        filename: 'index.html',
        minify: {
          collapseWhitespace: true, // might want to remove white space for production
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      })
    ]
  }

  return mergeConfigs(commonConfig, prodConfig)
}