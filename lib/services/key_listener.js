/*
 * Listens for keydown stuff
 */

function listenForKeys (win, dispatch) {
  const KEY_0 = 48
  const KEY_9 = 57

  function listener (e) {
    if ((e.keyCode >= KEY_0) && (e.keyCode <= KEY_9) && (e.metaKey)) {
      e.preventDefault()

      var idx = e.keyCode - KEY_0
      if (idx === 0) idx === 10
      dispatch({ type: 'service:activate_by_index', index: idx - 1 })
    }
  }

  win.addEventListener('keydown', listener)

  return function () {
    // remove listener
  }
}


module.exports = listenForKeys
