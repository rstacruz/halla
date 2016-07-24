const open = require('open')

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
