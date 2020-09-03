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
          loader: "babel-loader"
        }
      }
    ]
  },
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
