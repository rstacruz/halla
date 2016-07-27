function WindowDimensions (win, dispatch) {
  const nwWin = nw.Window.get()

  try {
    const savedDimensions = getDimensions()
    if (savedDimensions) {
      applyDimensions(savedDimensions, nwWin)
    }
  } catch (e) {
    console.error(e)
    resetDimensions()
  }

  let resizeTimeout
  nwWin.window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      saveDimensions(nwWin)
    }, 500)
  }, false)
}

function applyDimensions (dimensions, nwWin) {
  nw.Screen.Init()

  const windowIsOnScreen = nw.Screen.screens.find((screen) => {
    const { x, y, width, height } = screen.bounds
    const insideX = dimensions.x > x && dimensions.x < x + width
    const insideY = dimensions.y > y && dimensions.y < y + height

    if (insideX && insideY) {
      return true
    }
  })

  if (windowIsOnScreen) {
    console.log('applying dimensions: ' + JSON.stringify(dimensions))
    nwWin.window.moveTo(dimensions.x, dimensions.y)
    nwWin.window.resizeTo(dimensions.width, dimensions.height)
  } else {
    nwWin.setPosition("center")
  }
}

function dimensionsOf (nwWin) {
  const { x, y, width, height } = nwWin
  return { x, y, width, height }
}

function saveDimensions (nwWin) {
  const dimensionsJSON = JSON.stringify(dimensionsOf(nwWin))
  console.log('saving dimensions: ' + dimensionsJSON)
  return localStorage.windowDimensions = dimensionsJSON
}

function getDimensions () {
  return JSON.parse(localStorage.windowDimensions || 'null')
}

function resetDimensions () {
  console.log('resetting dimensions')
  return localStorage.windowDimensions = 'null'
}

module.exports = WindowDimensions
