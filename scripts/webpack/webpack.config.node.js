require('babel-register')
const devConfigs = require('./webpack.config.development')

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: devConfigs.module.loaders.filter(
      loader => loader.loader !== 'babel-loader',
    ),
  },
}
