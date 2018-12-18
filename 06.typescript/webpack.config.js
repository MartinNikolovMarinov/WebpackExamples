const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
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
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].js'
  },
  context: SRC_DIR,
  mode: 'development',
  devtool: 'inline-source-map',
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
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}