const h = require('decca').element
const c = require('classnames')
const map = require('lodash/map')
const get = require('lodash/get')
const actions = require('../actions')
const $service = require('../accessors/service')

exports.render = function (m) {
  const services = get(m.props, ['services']) || {}
  const active = m.props.active

  return h('div', {class: 'chrome-sidebar'},
    h('div', {class: 'service-list'},
      map(services, (service, id) => {
        const icon = $service.favicon(service)
        const notifs = $service.getNotificationCount(service)
        const type = $service.typeOf(service)

        return h('button', {
          class: c('item service-item', `-${type}`, {'-active': active === id}),
          key: id,
          onClick: activate(m.dispatch, id)
        },
          h('span', {class: 'icon'},
            icon
              ? h('img', {class: 'image', src: icon})
              : h('span', {class: 'name'}, service.name || service.url)
          ),
          (notifs === '*')
            ? h('span', {class: 'notif -indeterminate'})
            : ((typeof notifs === 'number') && (notifs > 0))
              ? h('span', {class: 'notif'}, '' + notifs)
              : null
        )
      })
    )
  )
}

function activate (dispatch, id) {
  return function () {
    dispatch(actions.activateService(id))
  }
}
