exports.loadConfig = () => {
  const conf = require('rc')('halla')
  return { type: 'init', payload: conf }
}

exports.activateService = (id) => {
  return { type: 'service:activate', id: id }
}
