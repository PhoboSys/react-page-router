const path = require('path')

module.exports = {
  entry: './react-router.js',
  output: {
    filename: 'react-page-router.js',
    path: path.join(__dirname, 'dist'),
    library: 'ReactPageRouter',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
}
