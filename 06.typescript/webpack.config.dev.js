const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const mergeConfigs = require('webpack-merge')
const path = require('path')

module.exports = (env) => {
  const { commonConfig, DIST_DIR } = require('./webpack.config.common')(env)

  const devConfig = {
    output: {
      pathinfo: true, // include useful path info about modules, exports, requests, etc. into the generated code.
      publicPath: 'http://localhost:3000/', // the url to the output directory, in this case to the web-dev-server hosted html page.
      filename: '[name].[id].bundle.js', // the filename template for entry chunks.
      chunkFilename: '[name].chunk.js' // the filename template for additional chunks.
    },
    mode: 'development', // chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'source-map', // most detailed map at the expense of build speed. Can be removed to speed up build!
    profile: true, // capture timing information. Can be removed to speed up build!
    devServer: {
      contentBase: '.', // Tells the server where to serve content from. This is only necessary if you serve static files.
      hot: true, // Enable webpack's Hot Module Replacement feature.
      host: 'localhost',
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        /**
         * This plugin generates html from a provided template.
         */
        template: path.join(__dirname, 'index.html'), // path to the template.
        filename: 'index.html' // name for the generated file.
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin({
        /**
         * Generates the webpack manifest file in the dist folder.
         */
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