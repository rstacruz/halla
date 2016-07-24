const open = require('open')
const get = require('lodash/get')

exports.decorate = function (service, frame) {

  const win = frame.contentWindow
  win.addEventListener('click', e => {
    if (e.target.matches('a[target]')) {
      e.preventDefault()

      const href = e.target.href
      open(href)
    }
  })
}

exports.focus = function (service, frame) {
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

exports.favicon = function (service, frame) {
  var team = get(frame.contentWindow, ['TS', 'model', 'team'])
  if (!team) return

  return get(team, ['icon', 'image_132'])
}

exports.getNotificationCount = function (service, frame) {
  return get(frame.contentWindow, ['TS', 'model', 'all_unread_highlights_cnt'])
}
