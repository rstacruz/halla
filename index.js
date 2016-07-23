const buildStore = require('./lib/store')
const actions = require('./lib/actions')
const dom = require('decca').dom
const h = require('decca').element
const Chrome = require('./lib/components/chrome')

/*
 * Builds the store
 */

const store = buildStore()
window.Store = store
store.dispatch(actions.loadConfig())

/*
 * Ticker
 */

!(function tick () {
  store.dispatch({ type: 'tick', time: Date.now() })
  setTimeout(() => {
    window.requestAnimationFrame &&
    window.requestAnimationFrame(tick)
  }, 1000)
}())

/*
 * Builds the renderer
 */

const render = dom.createRenderer(document.getElementById('app'), store.dispatch)

function update () {
  const state = store.getState()
  render(h(Chrome, {state: state}))
}

store.subscribe(update)
update()
