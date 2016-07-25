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

function favicon (service, frame) { }

function focus (service, frame) { }

function getNotificationCount (service, frame) { }

module.exports = {
  decorate,
  favicon,
  focus,
  getNotificationCount
}
