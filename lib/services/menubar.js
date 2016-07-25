const actions = require('../actions')

function Menubar (win, dispatch) {
  const myMenu = new nw.Menu({ type: 'menubar' })
  myMenu.createMacBuiltin('Halla')

  const submenu = new nw.Menu()
  submenu.append(new nw.MenuItem({
    label: 'Reload config',
    click: () => {
      dispatch(actions.loadConfig())
    }
  }))

  myMenu.append(new nw.MenuItem({
    label: 'Settings',
    submenu: submenu
  }))

  nw.Window.get().menu = myMenu
}

module.exports = Menubar
