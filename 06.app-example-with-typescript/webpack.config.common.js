const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
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
     * webpack starts generating it's dependency graph from index.ts !
     * Every entry generates a different bundle with different dependency graph, in this case it is just one.
     */
    index: path.resolve(SRC_DIR, 'index.ts'),
    polyfills: [
      // Required to support async/await
      '@babel/polyfill',
    ],
    styles: [
      path.resolve(SRC_DIR, 'styles', 'global.css'),
      path.resolve(SRC_DIR, 'styles', 'bulma.css')
    ],
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
        enforce: 'pre', // this rule is executed before the rest.
        use: {
          loader: 'tslint-loader', // this loader lints the project, according to the rules in ./tslint.json
          options: {
            tsConfigFile: path.resolve(__dirname, 'tsconfig.json'),
            configFile: path.resolve(__dirname, 'tslint.json'),
            typeCheck: true,
            failOnHint: false
          }
        }
      },
      {
        test: /\.(j|t)sx?$/,
        // this tells webpack, exactly where to look for files and not waste time in other folders :
        include: [SRC_DIR],
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-syntax-dynamic-import',
                'react-hot-loader/babel',
              ],
            },
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            /**
             * This loader transforms files into base64 URIs, or defaults to file-loader's behavior.
             */
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings and inline them
              name: '/assets/images/[hash]-[name].[ext]' // the path for the generated/copied image files
            }
          }
        ],
        include: [path.resolve(__dirname, 'assets')],
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
      '~': SRC_DIR,
      '@assets': path.resolve(__dirname, 'assets'),
      '@elements': path.resolve(SRC_DIR, 'elements'),
      '@features': path.resolve(SRC_DIR, 'features'),
      '@services': path.resolve(SRC_DIR, 'services'),
      '@extensions': path.resolve(SRC_DIR, 'extensions'),
      '@config': path.resolve(SRC_DIR, 'config'),
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
    runtimeChunk: 'single' // Adds an additional chunk to each entrypoint containing only the runtime.
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: './tsconfig.json',
      tslint: './tslint.json',
      tslintAutoFix: false,
      watch: [ './src' ],
      reportFiles: [ 'src/**/*.{ts,tsx}' ]
    }),
  ]
}

module.exports = (env) => {
  if (env && env.analyze) {
    /**
     * If environment variable analyze is passed, add plugins for more detailed analysis.
     */
    commonConfig.profile = true // capture timing information.
    if (!commonConfig.plugins) {
      commonConfig.plugins = []
    }
    commonConfig.plugins.push(
      new BundleAnalyzerPlugin({
        /**
         * This plugin is used to generate a visual and interactive analysis for the size of the generated bundles.
         */
        statsOptions: path.resolve(__dirname, './chunk_report/report.html')
      }),
      new webpack.debug.ProfilingPlugin({
        /**
         * This plugin generates an profile json object that can be analyzed by chrome devTools.
         */
        outputPath: path.resolve(__dirname, '.profile-events.json')
      })
    )
  }

  return {
    commonConfig,
    DIST_DIR,
    SRC_DIR
  }
}
