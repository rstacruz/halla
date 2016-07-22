exports.loadConfig = function init () {
  const conf = require('rc')('hola')
  return { type: 'init', payload: conf }
}
