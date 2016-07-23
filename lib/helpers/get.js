module.exports = function get (object, keys) {
  return keys.reduce(function (result, key, i) {
    if (i === 0) {
      return object[key]
    } else if (typeof result !== 'undefined') {
      return result[key]
    }
  }, undefined)
}
