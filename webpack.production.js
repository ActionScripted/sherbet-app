const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'sherbet/static/*.{css,js}',
        'sherbet/static/fonts',
      ],
    }),
    new MiniCssExtractPlugin({filename: '[name].styles.css'}),
    new FaviconsWebpackPlugin({
      background: '#00babc',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        windows: true,
        yandex: false
      },
      logo: path.resolve(__dirname, 'frontend', 'images', 'icon.png'),
      persistentCache: true,
      prefix: 'icons/',
      title: 'Sherbet'
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{
          source: path.resolve(__dirname, 'sherbet', 'static', 'icons', 'favicon.ico'),
          destination: path.resolve(__dirname, 'sherbet', 'static', 'favicon.ico'),
        }]
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '__webpack-report.html',
    }),
  ]
});
