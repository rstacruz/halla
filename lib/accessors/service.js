/*
 * Methods for services.
 *
 * All functions take in a `service` as a first parameter, which is taken from
 * the config.
 *
 *     service = {
 *       url: 'https://phackers.slack.com',
 *       name: 'Phackers'
 *     }
 *
 *     $service.getFrame(service)  // => [Object IFrameElement]
 *     $service.typeOf(service)    // => 'slack'
 *     $service.favicon(service)   // => 'http://...'
 */

const Services = require('../service_types')
const listenForKeys = require('../services/key_listener')

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

  return Services[typeOf(service)].favicon(service, $frame)
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

  return Services[typeOf(service)].getNotificationCount(service, $frame)
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
 * Decorates the iframe `window` context with new event handlers.
 */

function decorate (service, dispatch) {
  var $frame = getFrame(service)
  if (!$frame) return

  const win = $frame.contentWindow
  if (win.__halla) return

  listenForKeys($frame.contentWindow, dispatch)
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
