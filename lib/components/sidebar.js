const h = require('decca').element
const c = require('classnames')
const map = require('lodash/map')
const get = require('lodash/get')
const actions = require('../actions')

exports.render = function (m) {
  const services = get(m.props, ['services']) || {}
  const active = m.props.active

  return h('div', {class: 'chrome-sidebar'},
    h('div', {class: 'service-list'},
      map(services, (service, id) =>
        h('button', {
          class: c('item service-item', {'-active': active === id}),
          onClick: activate(m.dispatch, id)
        }, service.name || service.url)
      )
    )
  )
}

function activate (dispatch, id) {
  return function () {
    dispatch(actions.activateService(id))
  }
}
