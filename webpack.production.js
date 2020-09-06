const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const brand_color = '#d80058';
const brand_name = 'Sherbet'
const path_django = 'sherbet';
const path_frontend = 'frontend';


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
        path_django + '/static/*.{css,js}',
        path_django + '/static/fonts',
      ],
    }),
    new MiniCssExtractPlugin({filename: '[name].styles.css'}),
    new FaviconsWebpackPlugin({
      background: brand_color,
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
      logo: path.resolve(__dirname, path_frontend, 'images', 'icon.png'),
      persistentCache: true,
      prefix: 'icons/',
      title: brand_name
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{
          source: path.resolve(__dirname, path_django, 'static', 'icons', 'favicon.ico'),
          destination: path.resolve(__dirname, path_django, 'static', 'favicon.ico'),
        }]
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '__webpack-report.html',
    }),
  ]
});
