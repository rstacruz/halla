const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const thunk = require('redux-thunk').default
const set = require('lodash/set')
const get = require('lodash/get')
const firstKey = require('./helpers/first_key')

/*
 * Builds a store
 */

module.exports = function buildStore () {
  return createStore(reducer, {}, applyMiddleware(thunk))
}

/*
 * The reducer
 */

function reducer (state, action) {
  switch (action.type) {
    case 'init':
      state = set(state, 'conf', action.payload)
      state = set(state, 'active', firstKey(get(state, ['conf', 'services'])))
      return state

    case 'service:activate':
      return set(state, 'active', action.id)

    default:
      return state
  }
}
