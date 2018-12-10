export function map(array, callback) {
  var arr = []
  each(array, function (value, key) { arr.push(callback(value, key)) })
  return arr
}

export function find(array, callback) {
  var result = null
  each(array, function (value, key) {
    if (callback(value, key) && result === null) {
      result = value
    }
  })
  return result
}
