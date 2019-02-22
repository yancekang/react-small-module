// import { Toast, Indicator } from 'mint-ui'
var root = '/api/financial'
var request = require('superagent')
function dataType(data) { // 获取数据类型
  return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
function filterNull(o) { // 过滤值为null的请求参数数据
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (dataType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (key === 'asset_id') {
        o[key] = +o[key]
      }
      if (o[key].length === 0) {
        delete o[key]
      }
    } else if (dataType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (dataType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
let count = 1

const ajaxAgent = (method, url, params, success, failure) => {
  let u = navigator.userAgent
  // alert(u)
  if (u.indexOf('huanqiuiOSApp') !== -1) {
    if (sessionStorage.getItem('token')) {
      return getToken(method, url, params, success, failure)
    } else {
      if (count < 10) {
        count++
        setTimeout(() => ajaxAgent(method, url, params, success, failure), 300)
      } else {
        getToken(method, url, params, success, failure)
      }
    }
  } else {
    getToken(method, url, params, success, failure)
  }
}

const getToken = (method, url, params, success, failure, reject) => { // 发送请求并得到响应
  var r = request(method, url).type('application/json').withCredentials()
  r.header.Token = sessionStorage.getItem('token')
  if (params) {
    params = filterNull(params)
    if (method === 'POST' || method === 'PUT') {
      if (dataType(params) === 'object') {
        // params.timestamp = new Date().getTime() // 增加时间戳
        params = JSON.stringify(params)
      }
      r = r.send(params)
    } else if (method === 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function (err, response) {
    if (err) {
      // Indicator.close()
      if (failure) {
        failure({ data: err.name + ': ' + err.message, http_status: response.status }, response, 'HTTP_ERROR') // err, res, esta
      } else {
      }
    } else {
      // Indicator.close()

      if (response.body.return_code === '0000' || response.body.status === 0) {
        if (success) {
          success(response.body, response) // rdata, res
        }
      } else {
        if (failure) {
          failure(response.body, response, 'STATUS_ERROR') // err:, res, esta
        } else {
        }
      }
    }
  })
}
function testRequestParams(method, url, params, success, failure) { // 验证请求时，传递的参数
  if (Object.prototype.toString.call(success) !== '[object Function]') {
    try {
      throw new Error('成功的回调函数位置接受的是一个Function,但是却得到一个' + dataType(success))
    } catch (e) {
      console.error(e)
      return
    }
  }
  if (failure) {
    if (Object.prototype.toString.call(failure) !== '[object Function]') {
      try {
        throw new Error('失败的回调函数位置接受的是一个Function,但是却得到一个' + dataType(failure))
      } catch (e) {
        console.error(e)
        return
      }
    }
  }
  if (Object.prototype.toString.call(params) === '[object Object]' || params === null) {
    // let u = navigator.userAgent
    // if (u.indexOf('huanqiuiOSApp') === -1) {
    //   if (sessionStorage.getItem('token')) {
    //     conso
    //     return GetToken(method, url, params, success, failure)
    //   } else {
    //     setTimeout(() => ajaxAgent(), 200)
    //   }
    // } else {
      return ajaxAgent(method, url, params, success, failure)
    // }
  } else {
    try {
      throw new Error('接受的是一个对象或者为空(即null),但是却得到一个' + dataType(params))
    } catch (e) {
      console.error(e)
    }
  }
}
export default {
  /*
    参数:
    url,
    params-请求参数，
    success-成功的回调函数，参数：返回数据、response响应数据,
    failure-失败的回调函数,参数：返回数据、response响应数据、失败类型（STATUS_ERROR:返回数据状态不为0，HTTP_ERROR:响应状态错误及不为statusCode）
  */
  get: function (url, params, success, failure) {
    testRequestParams('GET', root + '/' + url, params, success, failure)
    // return ajaxAgent('GET', root + '/' + url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    testRequestParams('POST', root + '/' + url, params, success, failure)
    // return ajaxAgent('POST', root + '/' + url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    testRequestParams('PUT', root + '/' + url, params, success, failure)
    // return ajaxAgent('PUT', root + '/' + url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    testRequestParams('DELETE', root + '/' + url, params, success, failure)
    // return ajaxAgent('DELETE', root + '/' + url, params, success, failure)
  },
  root() {
    return root
  },
  filterNull
}
