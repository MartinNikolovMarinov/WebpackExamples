# The package.json scripts

```js
// Deletes the dist folder :
"clean": "rimraf dist",
// Compile the project with development configuration :
"build": "npm run clean && webpack --config webpack.config.dev.js",
// Build the project and host it in a dev server on port 3000 :
"start": "npm run build && webpack-dev-server --progress --inline",
// Compile the project with development configuration and watch for changes :
"watch": "npm run clean && webpack --config webpack.config.dev.js --watch",
// Compile the project with production configuration :
"prod": "npm run clean && webpack --config webpack.config.prod.js"
```