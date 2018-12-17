const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules:[
      {
        test: /\.css$/, // resolve files ending in .css
        use: [ 'style-loader', 'css-loader' ] // first use css-loader to compile css files and then use style-loader on the output of css-loader.
      },
      {
        test: /\.scss$/, // resolve files ending in .scss
        use: ['style-loader', 'css-loader', 'sass-loader'], // first use the sass-loader to convert to css, after that same as above.
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
