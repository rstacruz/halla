const get = require('lodash/get')

/*
 * Returns the favicon for a given service `id`.
 */

function favicon (service) {
  var $frame = document.querySelector('iframe[src^="' + service.url + '"]')
  if (!$frame) return

  var team = get($frame.contentWindow, ['TS', 'model', 'team'])
  if (!team) return

  return get(team, ['icon', 'image_132'])
}

/*
 * Checks if service `id` has notifications.
 *
 * Returns `0` for no notifs, a number for notifications, or `'*'` for
 * indeterminate notification count, or `undefined` if unknown.
 *
 * Also see:
 *
 *     sig = TS.channels.unread_changed_sig; if (sig) { sig.add(this._onNotificationUpdate); }
 */

function getNotificationCount (service) {
  var $frame = document.querySelector('iframe[src^="' + service.url + '"]')
  if (!$frame) return

  return get($frame.contentWindow, ['TS', 'model', 'all_unread_highlights_cnt'])
}

/*
 * Focuses on a given tab.
 */

function focus (service) {
  var $frame = document.querySelector('iframe[src^="' + service.url + '"]')
  if (!$frame) return

  window.requestAnimationFrame(() => {
    $frame.focus()
  })

  var win = $frame.contentWindow
  var $input = win
    && win.document
    && win.document.querySelector('#message-input')
  if (!$input) return

  window.requestAnimationFrame(() => {
    $input.focus()
  })
}

module.exports = {
  favicon,
  getNotificationCount,
  focus
}
