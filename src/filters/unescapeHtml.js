export default function (html) {
  let str = ''
  if (html) {
    str = html.replace(/<\/?.+?>/g, '').replace(/ /g, '')
  }
  return str
}
