const proxy = require('http-proxy-middleware')



module.exports = function(app) {
  app.use(
    proxy(
      '/api/financial', {
        target: 'https://jr.huanqiu.com',
        changeOrigin: true
      },
      '/cgi-bin', {
        target: 'https://api.weixin.qq.com',
        changeOrigin: true
      }
    )
  )
}
