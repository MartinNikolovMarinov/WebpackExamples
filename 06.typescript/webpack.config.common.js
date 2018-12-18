const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const DIST_DIR = path.join(__dirname, 'dist')
const SRC_DIR = path.join(__dirname, 'src')

const commonConfig = {
  entry: {
    bundle: path.resolve(SRC_DIR, 'index.tsx')
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[hash].js'
  },
  context: SRC_DIR,
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
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
}


module.exports = (env) => {
  if (env.analyze) {
    if (!commonConfig.plugins) {
      commonConfig.plugins = []
    }
    commonConfig.plugins.push(
      new BundleAnalyzerPlugin({
        statsOptions: path.resolve(__dirname, './chunk_report/report.html')
      })
    )
  }

  return {
    commonConfig,
    DIST_DIR,
    SRC_DIR
  }
}