export default function (string, fixedNum) {
  let num = 0
  if (string && !isNaN(string)) {
    num = Number(string)
  }
  if (fixedNum) {
    num = num.toFixed(fixedNum)
  }

  return num
}
