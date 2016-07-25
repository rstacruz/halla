/*
 * Creates a Redux reducer from an Object.
 *
 *     reducers = {
 *       'init' (state, action) { ... },
 *       'config:load' (state, action) { ... }
 *     }
 *
 *     store = createStore(reducerify(reducers))
 */

function reducerify (reducers) {
  return function reducer (state, action) {
    const fn = reducers[action.type]
    return fn ? fn(state, action) : state
  }
}

module.exports = reducerify
