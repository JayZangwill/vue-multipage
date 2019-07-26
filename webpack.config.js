const path = require ('path');
const merge = require ('webpack-merge');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const TerserJSPlugin = require ('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require ('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require ('vue-loader/lib/plugin');

module.exports = ({production}) => {
  const common = {
    entry: path.resolve (__dirname, 'src'),
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      open: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      index: path.resolve (__dirname, 'src/index.html'),
      port: 8080,
      proxy: {},
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|mp3|mp4|mov|wma|avi|flv|otf)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin (),
      new HtmlWebpackPlugin ({
        template: path.resolve (__dirname, 'src/index.html'),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
  };

  // 开发环境
  const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };

  // 生产环境
  const prod = {
    mode: 'production',
    output: {
      path: path.resolve (__dirname, 'dist'),
      filename: 'app.[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include: [path.resolve (__dirname, 'src')],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin (), new MiniCssExtractPlugin ()],
    optimization: {
      minimizer: [
        new TerserJSPlugin ({
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin (),
      ],
    },
  };

  return merge (common, production ? prod : dev);
};
