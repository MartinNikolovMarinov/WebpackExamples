module.exports = {
  rootDir: './src',
  moduleFileExtensions: [ "ts", "tsx", "js", "jsx", "json" ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  collectCoverage: true,
  coverageDirectory: '../coverage',
  // // Coverage for specific files regardless if they got imported in a test :
  // collectCoverageFrom: [
  //   "**/*.{js,jsx,ts,tsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  // // For global variables :
  // globals: {
  //   "__DEV__": true
  // }
}
