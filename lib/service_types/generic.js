function decorate (service, frame) {
  const win = frame.contentWindow
  win.addEventListener('click', e => {
    if (e.target.matches('a[target="_blank"]')) {
      e.preventDefault()

      const href = e.target.href
      open(href)
    }
  })
}

function favicon (service, frame) {
  const win = frame.contentWindow
  let icon

  icon = win.document.querySelector(
    'link[rel="apple-touch-icon"], ' +
    'link[rel="fluid-icon"], ' +
    'link[rel="shortcut icon"], ' +
    'link[rel="icon"]')
  if (icon) return icon.href
}

function focus (service, frame) { }

function getNotificationCount (service, frame) { }

module.exports = {
  decorate,
  favicon,
  focus,
  getNotificationCount
}
