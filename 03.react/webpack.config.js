module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // for files that end with js or jsx, use the babel-loader
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'] // presets for es2015 and react jsx syntax
          }
        }
      }
    ]
  }
};
