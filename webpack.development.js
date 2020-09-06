const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');
const fqdn = require('node-fqdn');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const origin_host = process.env.WEBPACK_ORIGIN_HOST || fqdn();
const origin_port = process.env.WEBPACK_ORIGIN_PORT || 8001;
const target_host = process.env.WEBPACK_TARGET_HOST || origin_host;
const target_port = process.env.WEBPACK_TARGET_PORT || 8000;

const origin = `http://${origin_host}:${origin_port}`;
const target = `http://${target_host}:${target_port}`;


module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: true,
    index: '',
    overlay: {
      errors: true,
      warnings: true
    },
    port: origin_port,
    proxy: {
      '**': {
        target,
        headers: {
          'X-Webpack-Proxy-Host': origin
        }
      }
    },
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 8888
    }),
  ]
});
