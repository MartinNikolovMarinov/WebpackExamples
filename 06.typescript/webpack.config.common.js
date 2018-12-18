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
    filename: '[name].js'
  },
  context: SRC_DIR,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'cache-loader',
          'ts-loader',
        ],
        include: SRC_DIR
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          chunks: 'all',
          name: 'react',
          test: /[\\/]node_modules[\\/]react.*[\\/]/
        },
        lodash: {
          chunks: 'all',
          name: 'common',
          test: /[\\/]node_modules[\\/]lodash.*[\\/]/
        },
        commons: {
          chunks: 'all',
          name: 'common',
          test: /[\\/]node_modules[\\/]lodash.*[\\/]/
        }
      }
    }
  }
}


module.exports = (env) => {
  if (env && env.analyze) {
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