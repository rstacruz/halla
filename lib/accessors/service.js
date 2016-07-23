const get = require('lodash/get')

const SLACK_NORMAL_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFW…kwzjk3531vBDZezYjxV1nMkY2y//DMI2NQNJsWOvafAAMAxE3MJSrFyPAAAAAASUVORK5CYII='
const SLACK_NOTIF_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFW…h7rO8mqTxp+jZU2X/kxZxcsQPAXq/2WneAVmDUDBr2XwEGADZFpKJDFtSPAAAAAElFTkSuQmCC'
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

module.exports = {
  favicon,
  getNotificationCount
}
