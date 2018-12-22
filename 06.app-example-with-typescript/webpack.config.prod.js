const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
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
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // combines all those strings into chunks.
            'css-loader', // loads css into strings.
            {
              /**
               * adds prefixes to styles for different browsers.
               */
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            }
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // extracts css to file chunks.
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
      }),
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
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          /**
           * This plugin minifies all generated javascript files.
           */
          cache: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}) // This plugin minifies all css files.
      ]
    },
  }

  return mergeConfigs(commonConfig, prodConfig)
}