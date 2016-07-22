const h = require('decca').element

exports.render = function (m) {
  return h('div', {class: 'chrome-root'},
    h('div', {class: 'sidebar chrome-sidebar'}),
    h('div', {class: 'body'},
      h('iframe', {
        src: 'https://phackers.slack.com',
        seamless: true,
        nwdisable: true,
        nwfaketop: true
      })
    )
  )
}
