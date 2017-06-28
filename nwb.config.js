var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var config = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlightTutorials',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    rules: {
      'sass-rule': {
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                function() {
                  return autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                  });
                }
              ],
              sourceMap: true,
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    }
  }
}



module.exports = function (args) {
  if (process.env.NODE_ENV === 'production') {
    config.webpack.rules['sass-rule'].use = 
      ExtractTextPlugin.extract({
        // fallback: 'style-loader',
        use: config.webpack.rules['sass-rule'].use,
      })
  } else {
    config.webpack.rules['sass-rule'].use.unshift('style-loader');
  }
  return config;
};

