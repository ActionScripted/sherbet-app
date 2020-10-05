const path = require('path');

const { settings } = require('./frontend/settings');


module.exports = {
  entry: {
    public: path.resolve(__dirname, settings.path.frontend, 'public.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, settings.path.django, 'static'),
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
  plugins: [],
  resolve: {
    alias: {
      API: path.resolve(__dirname, settings.path.frontend, 'api/'),
      Client: path.resolve(__dirname, settings.path.frontend, 'client/'),
      Components: path.resolve(__dirname, settings.path.frontend, 'components/'),
      Constants: path.resolve(__dirname, settings.path.frontend, 'constants/'),
      Contexts: path.resolve(__dirname, settings.path.frontend, 'contexts/'),
      Images: path.resolve(__dirname, settings.path.frontend, 'images/'),
      Packages: path.resolve(__dirname, settings.path.frontend, 'packages/'),
      Settings: path.resolve(__dirname, settings.path.frontend, 'settings/'),
    }
  }
};
