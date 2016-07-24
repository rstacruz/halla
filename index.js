const buildStore = require('./lib/store')
const actions = require('./lib/actions')
const dom = require('decca').dom
const h = require('decca').element

const Chrome = require('./lib/components/chrome')
const FrameDecorator = require('./lib/middleware/frame_decorator')

start()

function start () {
  const store = buildStore([FrameDecorator()])
  window.Store = store

  startTicker(store)
  store.dispatch(actions.loadConfig())

  const render = dom.createRenderer(document.getElementById('app'), store.dispatch)

  function update () {
    const state = store.getState()
    render(h(Chrome, {state: state}))
  }

  store.subscribe(update)
  update()
}

/*
 * Ticker
 */

function startTicker (store) {
  !(function tick () {
    store.dispatch({ type: 'tick', time: Date.now() })
    setTimeout(() => {
      window.requestAnimationFrame(tick)
    }, 1000)
  }())
}
