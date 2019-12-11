const path = require ('path');
const webpack = require ('webpack');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const TerserJSPlugin = require ('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'vue-router',
      'vue',
    ],
  },
  output: {
    path: path.resolve ('./dist'),
    filename: 'js/vendor.js',
    library: '[name]_library',
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin ({
        cache: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin (),
    new webpack.DllPlugin ({
      path: path.resolve ('./dist', 'vendor-manifest.json'),
      name: '[name]_library',
    }),
  ],
};
