/* eslint-disable */
import adminRes from './admin'

const imgHost = 'https://cdn.idouyao.com/'
const hostPrefix = process.env.NODE_ENV === 'development' ? '' : ''

let api = {imgHost}

Object.keys(adminRes).forEach(function(key) {
  var prefix = 'Admin'
  var subfix = 'Res'
  var name = prefix + key + subfix
  var res = hostPrefix + adminRes[key]
  api[name] = res
});

export default api
