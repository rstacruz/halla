const h = require('decca').element
const actions = require('../actions')

function render (m) {
  return h('div', {class: 'message-box'},
    h('h1', {}, "Let's get started."),
    h('p', {},
      'Create a file called ',
      h('em', {}, '~/.hallarc'),
      ' with these contents:'),
    h('textarea', {autofocus: true},
      '[services.myslack]\n' +
      'name = My Slack\n' +
      'url = http://myslack.slack.com'),
    h('p', {},
      "Press continue when you're ready."),
    h('p', {class: 'actions'},
      h('button', {
        class: 'button -next',
        onClick: reload(m.dispatch)
      }, 'Continue')))
}

function reload (dispatch) {
  return function (e) {
    dispatch(actions.loadConfig())
  }
}

module.exports = { render }
