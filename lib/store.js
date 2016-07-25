const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const thunk = require('redux-thunk').default
const set = require('lodash/set')
const get = require('lodash/get')
const firstKey = require('./helpers/first_key')

/*
 * Builds a store
 */

module.exports = function buildStore (middlewares) {
  middlewares = [thunk].concat(middlewares || [])
  const enhancer = applyMiddleware.apply(null, middlewares)
  return createStore(reducer, {}, enhancer)
}

/*
 * The reducer
 */

function reducer (state, action) {
  switch (action.type) {
    case 'init':
      state = set(state, 'conf', action.payload)
      state = set(state, 'active', firstKey(get(state, ['conf', 'services'])))
      // TODO: decorate `services` with .id
      return state

    case 'service:activate':
      return set(state, 'active', action.id)

    case 'service:activate_by_index':
      const services = get(state, ['conf', 'services'])
      if (!services) return state

      const id = Object.keys(services)[action.index]
      if (!id) return state
      return set(state, 'active', id)

    default:
      return state
  }
}
