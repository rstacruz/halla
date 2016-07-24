const get = require('lodash/get')

const Services = require('../services')

/*
 * Returns the iframe
 */

function getFrame (service) {
  return document.querySelector('iframe[src^="' + service.url + '"]')
}

/*
 * Returns the type of service
 */

function typeOf (service) {
  if (service.type) return service.type

  if (service.url.indexOf('.slack.com') > -1) {
    return 'slack'
  } else {
    return 'generic'
  }
}

/*
 * Returns the favicon for a given service `id`.
 */

function favicon (service) {
  var $frame = getFrame(service)
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
  var $frame = getFrame(service)
  if (!$frame) return

  return get($frame.contentWindow, ['TS', 'model', 'all_unread_highlights_cnt'])
}

/*
 * Focuses on a given tab.
 */

function focus (service) {
  const $frame = getFrame(service)
  if (!$frame) return

  Services[typeOf(service)].focus(service, $frame)
}

/*
 * Decorate
 */

function decorate (service) {
  var $frame = getFrame(service)
  if (!$frame) return

  const win = $frame.contentWindow
  if (win.__halla) return

  Services[typeOf(service)].decorate(service, $frame)

  win.__halla = true
}

module.exports = {
  getFrame,
  typeOf,
  favicon,
  getNotificationCount,
  focus,
  decorate
}
