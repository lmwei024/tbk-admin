let msToM = function (time) {
  let t = ''
  if (time) {
    t = parseInt(parseInt(time) / 1000)
    if (t === 0) {
      t = ''
    }
  }
  return t
}

let mToMs = function (time) {
  let t = ''
  if (time) {
    t = parseInt(time) * 1000
    if (t === 0) {
      t = ''
    }
  }
  return t
}
export default {
  msToM: msToM,
  mToMs: mToMs
}
