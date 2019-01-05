import {formatDate} from './date-fns'
export default function (str, _format) {
  let date
  if (/\d{10}/.test(str)) {
    str = str * 1000
  }
  date = new Date(str)
  if (!_format) {
    _format = 'yyyy-MM-dd hh:mm'
  }
  return formatDate(date, _format)
}
