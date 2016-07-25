const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const thunk = require('redux-thunk').default
const set = require('lodash/set')
const get = require('lodash/get')
const firstKey = require('./helpers/first_key')
const reducerify = require('./helpers/reducerify')

/*
 * Builds a store
 */

module.exports = function buildStore (middlewares) {
  middlewares = [thunk].concat(middlewares || [])
  const enhancer = applyMiddleware.apply(null, middlewares)
  return createStore(reducerify(reducers), {}, enhancer)
}

/*
 * Reducers
 */

const reducers = {
  'init' (state, {payload}) {
    state = set(state, 'conf', payload)
    state = set(state, 'active', firstKey(get(state, ['conf', 'services'])))
    // TODO: decorate `services` with .id
    return state
  },

  'service:activate' (state, {id}) {
    return set(state, 'active', id)
  },

  'service:activate_by_index' (state, {index}) {
    const services = get(state, ['conf', 'services'])
    if (!services) return state

    const id = Object.keys(services)[index]
    if (!id) return state
    return set(state, 'active', id)
  }
}
