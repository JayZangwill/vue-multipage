const path = require ('path');
const merge = require ('webpack-merge');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const TerserJSPlugin = require ('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require ('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require ('vue-loader/lib/plugin');
const glob = require('glob');
const { entries: entry, names } = getEntries(`${__dirname}/src/pages/**/index.js`);

function getEntries(path) {
  const entries = {};
  const names = []

  glob.sync(path).forEach(entry => {
    if(/(pages\/(?:.+[^.]))/.test(entry)) {
      const name = RegExp.$1.slice(0,RegExp.$1.lastIndexOf('/')).split('/')[1]

      entries[name] = entry
      names.push(name)
    }
  })

  return {
    entries,
    names,
  }
}

const htmlWebpackPluginOption = names.map(item => {
  return new HtmlWebpackPlugin ({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: `${item}.html`,
    chunks: ['vendor', item],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  })
})

module.exports = ({production}) => {
  const common = {
    entry,
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      useLocalIp: true,
      hot: true,
      open: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      index: path.resolve (__dirname, 'src/index.html'),
      proxy: {},
    },
    resolve: {
      alias: {
        src: path.resolve (__dirname, 'src'),
      },
      modules: [path.resolve (__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.vue'],
    },
    module: {
      rules: [
        {
          test: /\.(a?png|jpe?g|gif|svga?|mp3|mp4|mov|wma|avi|flv|otf)$/i,
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
              presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
              plugins: [
                '@babel/transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-optional-chaining',
              ],
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
      ...htmlWebpackPluginOption,
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendor',
          },
        },
      },
    },
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
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
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
    plugins: [
      new CleanWebpackPlugin (),
      new MiniCssExtractPlugin ({
        filename: '[name].[content:8].css',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserJSPlugin ({
          cache: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin ({
          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
            }],
          },
        }
),
      ],
    },
  };

  return merge (common, production ? prod : dev);
};
