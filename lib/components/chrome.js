const h = require('decca').element
const c = require('classnames')
const get = require('lodash/get')
const map = require('lodash/map')

const Sidebar = require('./sidebar')
const ServiceFrame = require('./service_frame')

exports.render = function (m) {
  const services = get(m.props.state, ['conf', 'services']) || []
  const active = get(m.props.state, ['active'])

  return h('div', {class: 'chrome-root'},
    h('div', {class: 'sidebar'},
      h(Sidebar, {
        services: services,
        active: active
      })
    ),
    h('div', {class: 'body'},
      map(services, (service, id) =>
        h('div', {
          class: c('service-body', {'-active': id === active}),
          id: id + '-body'
        },
          h(ServiceFrame, {
            id: id,
            service: service,
            active: id === active
          })
        )
      )
    )
  )
}
