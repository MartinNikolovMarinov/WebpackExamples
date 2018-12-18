const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const path = require('path')

const DIST_DIR = path.join(__dirname, 'dist')
const SRC_DIR = path.join(__dirname, 'src')

module.exports = {
  entry: {
    index: path.resolve(SRC_DIR, 'index.tsx')
  },
  output: {
    path: DIST_DIR,
    publicPath: 'http://localhost:3000/',
    filename: '[name].[hash].js'
  },
  context: SRC_DIR,
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  devServer: {
    contentBase: '.',
    hot: true,
    host: 'localhost',
    port: 3000
  },
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