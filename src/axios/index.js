import axios from 'axios'
import store from '../store/store'
import ElementUI from 'element-ui'
import api from '../api'
import 'element-ui/lib/theme-chalk/index.css'
const GLOBAL_RESPONSE_CODE = {SUCCESS: 0, ERROR: 1}

let tempAxios = axios.create()

let loadAccountInfo = function () {
  tempAxios.get(api.AccountLoadAccountInfoRes).then(function (res) {
    if (res.data.code === GLOBAL_RESPONSE_CODE.SUCCESS) {
      store.commit('updateAccountInfo', res.data.result.data)
    } else {
      store.commit('updateAccountInfo', {})
    }
  })
}

let originalAxios = axios.create()
originalAxios.interceptors.request.use(function (config) {
  if (config.url !== api.Login) {
    loadAccountInfo()
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
originalAxios.interceptors.response.use(function (res) {
  if (res.data.code === GLOBAL_RESPONSE_CODE.ERROR && res.data.error_msg === 'no-login') {
    location.hash = '/login'
    ElementUI.Message.error('请先登录')
    return new Promise(() => {})
  } else {
    return res.data
  }
}, function (err) {
  return Promise.reject(err)
})
axios.original = originalAxios
axios.responseCode = GLOBAL_RESPONSE_CODE

axios.defaults.headers.post['Content-type'] = 'application/json'

axios.interceptors.request.use(function (config) {
  if (config.url !== api.Login) {
    loadAccountInfo()
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (res) {
  if (res.data.code === GLOBAL_RESPONSE_CODE.ERROR) {
    if (res.data.error_msg === 'no-login') {
      location.hash = '/login'
      ElementUI.Message.error('请先登录')
    } else {
      ElementUI.Message.error(res.data.error_msg)
    }
    return new Promise(() => {})
  }

  if (res.config.url === api.Login) {
    loadAccountInfo()
  }
  return res.data
}, function (err) {
  return Promise.reject(err)
})

export default axios
