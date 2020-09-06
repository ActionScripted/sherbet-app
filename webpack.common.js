const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const path_django = 'sherbet';
const path_frontend = 'frontend';


module.exports = {
  entry: {
    public: path.resolve(__dirname, path_frontend, 'public.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, path_django, 'static'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
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
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '__public.html',
      template: path.resolve(__dirname, 'frontend', 'public.html')
    }),
    new HtmlWebpackInlineSVGPlugin({
      inlineAll: true,
      runPreEmit: true,
    }),
  ],
  resolve: {
    alias: {
      API: path.resolve(__dirname, path_frontend, 'api/'),
      Components: path.resolve(__dirname, path_frontend, 'components/'),
      Constants: path.resolve(__dirname, path_frontend, 'constants/'),
      Images: path.resolve(__dirname, path_frontend, 'images/'),
      Packages: path.resolve(__dirname, path_frontend, 'packages/'),
    }
  }
};
