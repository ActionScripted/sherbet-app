const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    public: path.resolve(__dirname, process.env.FRONTEND_DIR, 'public.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, process.env.DJANGO_DIR, 'static'),
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
    new webpack.EnvironmentPlugin({
      AUTH_LOGIN_URL: process.env.AUTH_LOGIN_URL,
    }),
  ],
  resolve: {
    alias: {
      API: path.resolve(__dirname, process.env.FRONTEND_DIR, 'api/'),
      Client: path.resolve(__dirname, process.env.FRONTEND_DIR, 'client/'),
      Components: path.resolve(__dirname, process.env.FRONTEND_DIR, 'components/'),
      Constants: path.resolve(__dirname, process.env.FRONTEND_DIR, 'constants/'),
      Contexts: path.resolve(__dirname, process.env.FRONTEND_DIR, 'contexts/'),
      Images: path.resolve(__dirname, process.env.FRONTEND_DIR, 'images/'),
      Packages: path.resolve(__dirname, process.env.FRONTEND_DIR, 'packages/'),
      Settings: path.resolve(__dirname, process.env.FRONTEND_DIR, 'settings/'),
    }
  }
};
