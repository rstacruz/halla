const buildStore = require('./lib/store')
const actions = require('./lib/actions')
const dom = require('decca').dom
const h = require('decca').element

const Chrome = require('./lib/components/chrome')
const FrameDecorator = require('./lib/middleware/frame_decorator')
const KeyListener = require('./lib/services/key_listener')
const Menubar = require('./lib/services/menubar')
const WindowState = require('./lib/services/window_state')

start()

function start () {
  const store = buildStore([FrameDecorator()])
  window.Store = store

  // Start services
  startTicker(store)
  KeyListener(window, store.dispatch)
  Menubar(window, store.dispatch)
  WindowDimensions(window, store.dispatch)

  // Initialize store
  store.dispatch(actions.loadConfig())

  // Start the render cycle
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
