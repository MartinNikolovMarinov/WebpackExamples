module.exports = {
  entry: {
    bundle1: './index1.js', // two entry files.
    bundle2: './index2.js'
  },
  output: {
    filename: '[name].js' // the placeholder [name] is filled with the names of bundle1 and bundle2.
  }
};
