const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

// DIST_DIR the directory which webpack will use to generate code.
const DIST_DIR = path.join(__dirname, 'dist')
// SRC_DIR the source code root directory.
const SRC_DIR = path.join(__dirname, 'src')

/**
 * The webpack configuration object that is common for all builds.
 */
const commonConfig = {
  entry: {
    /**
     * Here the application starts executing and webpack starts bundling.
     * webpack starts generating it's dependency graph from index.tsx !
     * Every entry generates a different bundle with different dependency graph, in this case it is just one.
     */
    index: path.resolve(SRC_DIR, 'index.tsx')
  },
  output: {
    /**
     * The output property defines how webpack emits results.
     */
    path: DIST_DIR // the target directory for all output files
  },
  /**
   * context is aa absolute path!
   * This is the home directory for webpack.
   * The entry and the module.rules.loader option is resolved relative to this directory.
   */
  context: __dirname,
  /**
   * target is the environment in which the bundle should run. Changes chunk loading behavior and available modules.
   */
  target: 'web',
  module: {
    rules: [
      /**
       * These rules define which loaders should handle which types of files.
       */
      {
        test: /\.tsx?$/, // regex rule to distinguish file extensions.
        use: [
          /**
           * The loaders which should be applied. They are applied in reverse order.
           * In this case ts-loader is first and cache-loader second.
           */
          'cache-loader',
          'ts-loader',
        ],
        include: [ SRC_DIR ], // this tells webpack, exactly where to look for files and not waste time in other folders.
        // exclude: [
        //   /*
        //    * exclude must not be matched (takes preference over test and include).
        //    * It is pointless in this case, because of the above include!
        //    */
        //   'node_modules'
        // ]
      }
    ]
  },
  resolve: {
    /**
     * options for resolving module requests. Not the same as the module.rules.test regular expressions !
     */
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // extensions that are used.
    alias: {
      /**
       * a list of module name aliases, that we can use to navigate in code.
       */
      '~': SRC_DIR
    }
  },
  optimization: {
    /**
     * Since version 4 webpack runs optimizations for you depending on the chosen mode,
     * still all optimizations are available for manual configuration and overrides. (with caution!)
     *
     * !!
     * Performs chunk splitting on the generated bundles (search for chunk splitting for more information).
     * By default it only affects on-demand chunks, because changing initial chunks would affect the
     * script tags the HTML file should include to run the project.
     * !!
     */
    runtimeChunk: true // Adds an additional chunk to each entrypoint containing only the runtime.
  }
}

module.exports = (env) => {
  if (env && env.analyze) {
    if (!commonConfig.plugins) {
      commonConfig.plugins = []
    }
    commonConfig.plugins.push(
      // This plugin is used to generate a visual and interactive analysis for the size of the generated bundles :
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