const Generic = require('./generic')

function getNotificationCount (service, frame) {
  const win = frame.contentWindow
  if (!win || !win.document.querySelectorAll) return

  return win.document.querySelectorAll('[aria-live="polite"][aria-relevant="additions text"]').length
}

module.exports = Object.assign({}, Generic, {
  getNotificationCount
})
