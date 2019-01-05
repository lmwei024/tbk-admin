import api from '../api'

export default function (url) {
  let str = ''

  if (url.indexOf('http') === -1) {
    str = api.imgHost + url
  } else {
    str = url
  }

  return str
}
