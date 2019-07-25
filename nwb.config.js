const webpack = require('webpack');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'flight_tutorials',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    }
  },
}
