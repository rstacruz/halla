const h = require('decca').element
const c = require('classnames')
const $service = require('../accessors/service')

exports.render = function (m) {
  const service = m.props.service
  const id = m.props.id

  return h('iframe', {
    id: id + '-frame',
    src: service.url,
    seamless: true,
    nwdisable: true,
    nwfaketop: true
  })
}

const previouses = {}

exports.onRemove = function (m) {
  delete previouses[m.path]
}

exports.onUpdate = function (m) {
  if (!previouses[m.path] || previouses[m.path].props.active !== m.props.active) {
    // changed! do the focus thing!
    handleRefocus(m)
  }
  previouses[m.path] = m
}

function handleRefocus (m) {
  if (m.props.active !== true) return
  $service.focus(m.props.service)
}
