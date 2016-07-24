'use strict'

const test = require('tape')
const buildStore = require('../lib/store')

test('store', t => {
  const store = buildStore()
  const conf = { services: {} }

  store.subscribe((action) => {
    t.equal(store.getState().conf, conf)
    t.end()
  })

  store.dispatch({ type: 'init', payload: conf })
})

test('store middleware', t => {
  const middleware = store => dispatch => action => {
    t.equal(action.type, 'init')
    t.end()
    return dispatch(action)
  }

  const store = buildStore([middleware])
  store.dispatch({ type: 'init', payload: {} })
})
