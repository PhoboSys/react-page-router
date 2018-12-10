import each from 'lodash.foreach'

export function map(array, mapper) {
  var arr = []
  each(array, function (value, key) { arr.push(mapper(value, key)) })
  return arr
}

export function find(array, predicate) {
  var result = null
  each(array, function (value, key) {
    if (predicate(value, key) && result === null) {
      result = value
    }
  })
  return result
}
