/*
 * Returns the first service
 */

module.exports = function (list) {
  if (!list) return

  const keys = Object.keys(list)
  return keys && keys[0]
}
