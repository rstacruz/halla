const open = require('open')
const get = require('lodash/get')

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

function focus (service, frame) {
  const win = frame.contentWindow

  win.requestAnimationFrame(() => {
    frame.focus()
  })

  var input = win.document.querySelector('#message-input')
  if (!input) return

  win.requestAnimationFrame(() => {
    input.focus()
  })
}

function favicon (service, frame) {
  var team = get(frame.contentWindow, ['TS', 'model', 'team'])
  if (!team) return

  return get(team, ['icon', 'image_132'])
}

function getNotificationCount (service, frame) {
  return get(frame.contentWindow, ['TS', 'model', 'all_unread_highlights_cnt'])
}

module.exports = {
  decorate,
  favicon,
  focus,
  getNotificationCount
}
