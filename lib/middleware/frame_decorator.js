/*
 * Middleware for enhancing iframes.
 *
 * Every `tick`, it gets all Services available, then tries to run
 * `$service.decorate()` on them.
 */

const map = require('lodash/map')
const get = require('lodash/get')
const $service = require('../accessors/service')

module.exports = function (options) {
  return store => dispatch => action => {
    if (action.type === 'tick') {
      decorateAll(store)
    }

    return dispatch(action)
  }
}

function decorateAll (store) {
  const state = store.getState()
  const services = get(state, ['conf', 'services'])

  if (services) {
    map(services, (service, id) => {
      $service.decorate(service)
    })
  }
}
