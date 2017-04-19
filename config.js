// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionServerDirectory: path.resolve(__dirname, 'server')
  },
  dev: {
    port: 8080,
    proxyTable: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^api/': ''
        }
      }, 
      '/fundamentals': {
        target: 'http://localhost:6666',
        changeOrigin: true,
        pathRewrite: {
          '^api/': ''
        }
      }
    }
  }
}
