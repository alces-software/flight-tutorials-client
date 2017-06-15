module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlightTutorials',
      externals: {
        react: 'React'
      }
    }
  }
}
