const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');


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
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'sass-loader',
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
        process.env.DJANGO_DIR + '/static/*.{css,js}',
        process.env.DJANGO_DIR + '/static/fonts',
      ],
    }),
    new HtmlWebpackPlugin({
      filename: '__public.html',
      minify: false,
      template: path.resolve(__dirname, 'frontend', 'public.html'),
      xhtml: true,
    }),
    new MiniCssExtractPlugin({filename: '[name].styles.css'}),
    new FaviconsWebpackPlugin({
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
      logo: path.resolve(__dirname, process.env.FRONTEND_DIR, 'images', 'icon.png'),
      persistentCache: true,
      prefix: 'icons/',
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{
          source: path.resolve(__dirname, process.env.DJANGO_DIR, 'static', 'icons', 'favicon.ico'),
          destination: path.resolve(__dirname, process.env.DJANGO_DIR, 'static', 'favicon.ico'),
        }]
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '__webpack-report.html',
    }),
  ]
});
