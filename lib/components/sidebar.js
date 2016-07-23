const h = require('decca').element
const map = require('lodash/map')
const get = require('lodash/get')
const actions = require('../actions')

exports.render = function (m) {
  const services = get(m.props, ['services']) || {}

  return h('div', {class: 'chrome-sidebar'},
    h('div', {class: 'service-list'},
      map(services, (service, id) =>
        h('button', {
          class: 'service-item',
          onClick: activate(m.dispatch, id)
        }, service.url)
      )
    )
  )
}

function activate (dispatch, id) {
  return function () {
    dispatch(actions.activateService(id))
  }
}
