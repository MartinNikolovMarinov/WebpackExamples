const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'main.html',
    title: 'Main SPA Page',
    minify: {
      // collapseWhitespace: true, // might want to remove white space for production
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  })]
};