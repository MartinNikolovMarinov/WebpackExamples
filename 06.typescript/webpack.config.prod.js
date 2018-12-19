const HtmlWebpackPlugin = require('html-webpack-plugin')
const mergeConfigs = require('webpack-merge')
const path = require('path')

module.exports = (env) => {
  const { commonConfig } = require('./webpack.config.common')(env)

  const prodConfig = {
    output: {
      publicPath: '.', // the url to the output directory resolved relative to the HTML page.
      filename: '[name].[id].[hash].bundle.js', // the filename template for entry chunks, with hash for production.
      chunkFilename: '[name].[hash].chunk.js' // the filename template for additional chunks, with hash for production.
    },
    mode: 'production', // chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'none', // no source maps for production. Might want to have them for debug production code.
    plugins: [
      new HtmlWebpackPlugin({
        /**
         * This plugin generates html from a provided template.
         */
        template: path.join(__dirname, 'index.html'), // path to the template.
        filename: 'index.html', // name for the generated file.
        minify: {
          collapseWhitespace: true,
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