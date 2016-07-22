const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const thunk = require('redux-thunk').default
const put = require('101/put')

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
      return put(state, 'conf', action.payload)

    default:
      return state
  }
}
