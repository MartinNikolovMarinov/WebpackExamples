const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

// adds prefixes to styles for different browsers
const autoprefixerLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer()],
  },
}

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/, // resolve files ending in .css
        // loaders are executed in reverse order :
        use: [
          'style-loader',     // load those string in style tags
          'css-loader',       // load css files into string
          autoprefixerLoader  // add prefixes
        ]
      },
      {
        test: /\.scss$/, // resolve files ending in .scss
        // loaders are executed in reverse order :
        use: [
          'style-loader',     // load those string in style tags
          'css-loader',       // load css files into string
          autoprefixerLoader, // add prefixes
          'sass-loader'       // convert sass files to css
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
