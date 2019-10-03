/* onsenui-ilove v2.10.10 - 2019-10-03 */

import ons from './ons/index.js';
import './ons/platform';
import './ons/microevent.js';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var fastclick = createCommonjsModule(function (module) {
	(function () {
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
    * Whether a click is currently being tracked.
    *
    * @type boolean
    */
			this.trackingClick = false;

			/**
    * Timestamp for when click tracking started.
    *
    * @type number
    */
			this.trackingClickStart = 0;

			/**
    * The element being tracked for a click.
    *
    * @type EventTarget
    */
			this.targetElement = null;

			/**
    * X-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartX = 0;

			/**
    * Y-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartY = 0;

			/**
    * ID of the last touch, retrieved from Touch.identifier.
    *
    * @type number
    */
			this.lastTouchIdentifier = 0;

			/**
    * Touchmove boundary, beyond which a click will be cancelled.
    *
    * @type number
    */
			this.touchBoundary = options.touchBoundary || 10;

			/**
    * The FastClick layer.
    *
    * @type Element
    */
			this.layer = layer;

			/**
    * The minimum time between tap(touchstart and touchend) events
    *
    * @type number
    */
			this.tapDelay = options.tapDelay || 200;

			/**
    * The maximum time for a tap
    *
    * @type number
    */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function () {
					return method.apply(context, arguments);
				};
			}

			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function (type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function (type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function (event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
  * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
  *
  * @type boolean
  */
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
   * Android requires exceptions.
   *
   * @type boolean
   */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

		/**
   * iOS requires exceptions.
   *
   * @type boolean
   */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

		/**
   * iOS 4 requires an exception for select elements.
   *
   * @type boolean
   */
		var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

		/**
   * iOS 6.0-7.* requires the target element to be manually derived
   *
   * @type boolean
   */
		var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

		/**
   * BlackBerry requires exceptions.
   *
   * @type boolean
   */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
   * Valid types for text inputs
   *
   * @type array
   */
		var textFields = ['email', 'number', 'password', 'search', 'tel', 'text', 'url'];

		/**
   * Determine whether a given element requires a native click.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element needs a native click
   */
		FastClick.prototype.needsClick = function (target) {
			switch (target.nodeName.toLowerCase()) {

				// Don't send a synthetic click to disabled inputs (issue #62)
				case 'button':
				case 'select':
				case 'textarea':
					if (target.disabled) {
						return true;
					}

					break;
				case 'input':

					// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
					if (deviceIsIOS && target.type === 'file' || target.disabled) {
						return true;
					}

					break;
				case 'label':
				case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
				case 'video':
					return true;
			}

			return (/\bneedsclick\b/.test(target.className)
			);
		};

		/**
   * Determine whether a given element requires a call to focus to simulate click into element.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
   */
		FastClick.prototype.needsFocus = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'textarea':
					return true;
				case 'select':
					return !deviceIsAndroid;
				case 'input':
					switch (target.type) {
						case 'button':
						case 'checkbox':
						case 'file':
						case 'image':
						case 'radio':
						case 'submit':
							return false;
					}

					// No point in attempting to focus disabled inputs
					return !target.disabled && !target.readOnly;
				default:
					return (/\bneedsfocus\b/.test(target.className)
					);
			}
		};

		/**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */
		FastClick.prototype.sendClick = function (targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function (targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};

		/**
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.focus = function (targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email' && targetElement.type !== 'number') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};

		/**
   * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
   *
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.updateScrollParent = function (targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};

		/**
   * @param {EventTarget} targetElement
   * @returns {Element|EventTarget}
   */
		FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};

		/**
   * @param {EventTarget} targetElement
   * @returns {boolean}
   */
		FastClick.prototype.isTextField = function (targetElement) {
			return targetElement.tagName.toLowerCase() === 'textarea' || textFields.indexOf(targetElement.type) !== -1;
		};

		/**
   * On touch start, record the position and scroll offset.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchStart = function (event) {
			var targetElement, touch;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			// Ignore touches on contenteditable elements to prevent conflict with text selection.
			// (For details: https://github.com/ftlabs/fastclick/pull/211 )
			if (targetElement.isContentEditable) {
				return true;
			}

			if (deviceIsIOS) {
				// Ignore touchstart in focused text field
				// Allows normal text selection and commands (select/paste/cut) when a field has focus, while still allowing fast tap-to-focus.
				// Without this fix, user needs to tap-and-hold a text field for context menu, and double-tap to select text doesn't work at all.
				if (targetElement === document.activeElement && this.isTextField(targetElement)) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay && event.timeStamp - this.lastClickTime > -1) {
				event.preventDefault();
			}

			return true;
		};

		/**
   * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.touchHasMoved = function (event) {
			var touch = event.changedTouches[0],
			    boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};

		/**
   * Update the last position.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchMove = function (event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};

		/**
   * Attempt to find the labelled control for the given label element.
   *
   * @param {EventTarget|HTMLLabelElement} labelElement
   * @returns {Element|null}
   */
		FastClick.prototype.findControl = function (labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};

		/**
   * On touch end, determine whether to send a click event at once.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchEnd = function (event) {
			var forElement,
			    trackingClickStart,
			    targetTagName,
			    scrollParent,
			    touch,
			    targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay && event.timeStamp - this.lastClickTime > -1) {
				this.cancelNextClick = true;
				return true;
			}

			if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS4 || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};

		/**
   * On touch cancel, stop tracking the click.
   *
   * @returns {void}
   */
		FastClick.prototype.onTouchCancel = function () {
			this.trackingClick = false;
			this.targetElement = null;
		};

		/**
   * Determine mouse events which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onMouse = function (event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};

		/**
   * On actual clicks, determine whether this is a touch-generated click, a click action occurring
   * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
   * an actual click which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onClick = function (event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};

		/**
   * Remove all FastClick's event listeners.
   *
   * @returns {void}
   */
		FastClick.prototype.destroy = function () {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};

		/**
   * Check whether FastClick is needed.
   *
   * @param {Element} layer The layer to listen on
   */
		FastClick.notNeeded = function (layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

					// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};

		/**
   * Factory method for creating a FastClick object
   *
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */
		FastClick.attach = function (layer, options) {
			return new FastClick(layer, options);
		};

		if (typeof undefined === 'function' && _typeof(undefined.amd) === 'object' && undefined.amd) {

			// AMD. Register as an anonymous module.
			undefined(function () {
				return FastClick;
			});
		} else if ('object' !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	})();
});

var fastclick_1 = fastclick.FastClick;

// For @onsenui/custom-elements
if (window.customElements) {
    // even if native CE1 impl exists, use polyfill
    window.customElements.forcePolyfill = true;
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.9' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _library = false;

var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: _library ? 'pure' : 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');

  var TO_STRING = 'toString';
  var TPL = ('' + _functionToString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return _functionToString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || _functionToString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$1 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
  f: f$1
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */

var check = function check(O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var _Symbol = _global.Symbol;
  var USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? _cof(O)
  // ES3 arguments fallback
  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()

var test = {};
test[_wks('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof(this) + ']';
  }, true);
}

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes


var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO$1) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    _objectDp.f(O, P = keys[i++], Properties[P]);
  }return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


var IE_PROTO = _sharedKey('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
  }return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var def = _objectDp.f;

var TAG$1 = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function _iterStep(done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$1 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = ArrayValues;
    if (explicit) for (key in es6_array_iterator) {
      if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
    }
  }
}

var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    _redefine(target, key, src[key], safe);
  }return target;
};

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$2 = _wks('iterator');
var ArrayProto$1 = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
};

var ITERATOR$3 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');

  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function setMeta(it) {
    setDesc(it, META, { value: {
        i: 'O' + ++id, // object ID
        w: {} // weak collections IDs
      } });
  };
  var fastKey = function fastKey(it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
      // return object ID
    }return it[META].i;
  };
  var getWeak = function getWeak(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
      // return hash weak collections IDs
    }return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function onFreeze(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
});

var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _validateCollection = function _validateCollection(it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$1 = _objectDp.f;

var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$1(C.prototype, 'size', {
      get: function get() {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var ITERATOR$4 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  
} catch (e) {/* empty */}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$4]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR$4] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

var setPrototypeOf$2 = _setProto.set;
var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf$2) {
    setPrototypeOf$2(that, P);
  }return that;
};

var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = _fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) {
        $instance[ADDER](index, index);
      }return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var SET = 'Set';

// 23.2 Set Objects
var es6_set = _collection(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong);

var _arrayFromIterable = function _arrayFromIterable(iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function _collectionToJson(NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function _setCollectionOf(COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
      var length = arguments.length;
      var A = new Array(length);
      while (length--) {
        A[length] = arguments[length];
      }return new this(A);
    } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
_setCollectionOf('Set');

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionFrom = function _setCollectionFrom(COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      _aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) _aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = _ctx(mapFn, arguments[2], 2);
        _forOf(source, false, function (nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        _forOf(source, false, A.push, A);
      }
      return new this(A);
    } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
_setCollectionFrom('Set');

var set$1 = _core.Set;

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var map = _core.Map;

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function _arraySpeciesConstructor(original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function _arraySpeciesCreate(original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex


var _arrayMethods = function _arrayMethods(TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var f$3 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$3
};

// 19.1.2.1 Object.assign(target, source, ...)


var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  }return T;
} : $assign;

var getWeak = _meta.getWeak;

var arrayFind = _arrayMethods(5);
var arrayFindIndex = _arrayMethods(6);
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};
var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

var _collectionWeak = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = id$1++; // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
        return data && _has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
        return data && _has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(_anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

var es6_weakMap = createCommonjsModule(function (module) {
  var each = _arrayMethods(0);

  var NATIVE_WEAK_MAP = _validateCollection;
  var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
  var WEAK_MAP = 'WeakMap';
  var getWeak = _meta.getWeak;
  var isExtensible = Object.isExtensible;
  var uncaughtFrozenStore = _collectionWeak.ufstore;
  var InternalMap;

  var wrapper = function wrapper(get) {
    return function WeakMap() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  };

  var methods = {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key) {
      if (_isObject(key)) {
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
        return data ? data[this._i] : undefined;
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
    }
  };

  // 23.3 WeakMap Objects
  var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

  // IE11 WeakMap frozen keys fix
  if (NATIVE_WEAK_MAP && IS_IE11) {
    InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
    _objectAssign(InternalMap.prototype, methods);
    _meta.NEED = true;
    each(['delete', 'has', 'get', 'set'], function (key) {
      var proto = $WeakMap.prototype;
      var method = proto[key];
      _redefine(proto, key, function (a, b) {
        // store frozen objects on internal weakmap shim
        if (_isObject(a) && !isExtensible(a)) {
          if (!this._f) this._f = new InternalMap();
          var result = this._f[key](a, b);
          return key == 'set' ? this : result;
          // store all the rest on native weakmap
        }return method.call(this, a, b);
      });
    });
  }
});

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
_setCollectionOf('WeakMap');

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
_setCollectionFrom('WeakMap');

var weakMap = _core.WeakMap;

var _createProperty = function _createProperty(object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) {
  
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$1 = _core.Array.from;

var reservedTagList = new Set(['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph']);

/**
 * @param {string} localName
 * @returns {boolean}
 */
function isValidCustomElementName(localName) {
  var reserved = reservedTagList.has(localName);
  var validForm = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(localName);
  return !reserved && validForm;
}

/**
 * @private
 * @param {!Node} node
 * @return {boolean}
 */
function isConnected(node) {
  // Use `Node#isConnected`, if defined.
  var nativeValue = node.isConnected;
  if (nativeValue !== undefined) {
    return nativeValue;
  }

  /** @type {?Node|undefined} */
  var current = node;
  while (current && !(current.__CE_isImportDocument || current instanceof Document)) {
    current = current.parentNode || (window.ShadowRoot && current instanceof ShadowRoot ? current.host : undefined);
  }
  return !!(current && (current.__CE_isImportDocument || current instanceof Document));
}

/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */
function nextSiblingOrAncestorSibling(root, start) {
  var node = start;
  while (node && node !== root && !node.nextSibling) {
    node = node.parentNode;
  }
  return !node || node === root ? null : node.nextSibling;
}

/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */
function nextNode(root, start) {
  return start.firstChild ? start.firstChild : nextSiblingOrAncestorSibling(root, start);
}

/**
 * @param {!Node} root
 * @param {!function(!Element)} callback
 * @param {!Set<Node>=} visitedImports
 */
function walkDeepDescendantElements(root, callback) {
  var visitedImports = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

  var node = root;
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      var element = /** @type {!Element} */node;

      callback(element);

      var localName = element.localName;
      if (localName === 'link' && element.getAttribute('rel') === 'import') {
        // If this import (polyfilled or not) has it's root node available,
        // walk it.
        var importNode = /** @type {!Node} */element.import;
        if (importNode instanceof Node && !visitedImports.has(importNode)) {
          // Prevent multiple walks of the same import root.
          visitedImports.add(importNode);

          for (var child = importNode.firstChild; child; child = child.nextSibling) {
            walkDeepDescendantElements(child, callback, visitedImports);
          }
        }

        // Ignore descendants of import links to prevent attempting to walk the
        // elements created by the HTML Imports polyfill that we just walked
        // above.
        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      } else if (localName === 'template') {
        // Ignore descendants of templates. There shouldn't be any descendants
        // because they will be moved into `.content` during construction in
        // browsers that support template but, in case they exist and are still
        // waiting to be moved by a polyfill, they will be ignored.
        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      }

      // Walk shadow roots.
      var shadowRoot = element.__CE_shadowRoot;
      if (shadowRoot) {
        for (var _child = shadowRoot.firstChild; _child; _child = _child.nextSibling) {
          walkDeepDescendantElements(_child, callback, visitedImports);
        }
      }
    }

    node = nextNode(root, node);
  }
}

/**
 * Used to suppress Closure's "Modifying the prototype is only allowed if the
 * constructor is in the same scope" warning without using
 * `@suppress {newCheckTypes, duplicate}` because `newCheckTypes` is too broad.
 *
 * @param {!Object} destination
 * @param {string} name
 * @param {*} value
 */
function setPropertyUnchecked(destination, name, value) {
  destination[name] = value;
}

/**
 * @enum {number}
 */
var CustomElementState = {
  custom: 1,
  failed: 2
};

var CustomElementInternals = function () {
  function CustomElementInternals() {
    classCallCheck(this, CustomElementInternals);

    /** @type {!Map<string, !CustomElementDefinition>} */
    this._localNameToDefinition = new Map();

    /** @type {!Map<!Function, !CustomElementDefinition>} */
    this._constructorToDefinition = new Map();

    /** @type {!Array<!function(!Node)>} */
    this._patches = [];

    /** @type {boolean} */
    this._hasPatches = false;
  }

  /**
   * @param {string} localName
   * @param {!CustomElementDefinition} definition
   */


  createClass(CustomElementInternals, [{
    key: 'setDefinition',
    value: function setDefinition(localName, definition) {
      this._localNameToDefinition.set(localName, definition);
      this._constructorToDefinition.set(definition.constructor, definition);
    }

    /**
     * @param {string} localName
     * @return {!CustomElementDefinition|undefined}
     */

  }, {
    key: 'localNameToDefinition',
    value: function localNameToDefinition(localName) {
      return this._localNameToDefinition.get(localName);
    }

    /**
     * @param {!Function} constructor
     * @return {!CustomElementDefinition|undefined}
     */

  }, {
    key: 'constructorToDefinition',
    value: function constructorToDefinition(constructor) {
      return this._constructorToDefinition.get(constructor);
    }

    /**
     * @param {!function(!Node)} listener
     */

  }, {
    key: 'addPatch',
    value: function addPatch(listener) {
      this._hasPatches = true;
      this._patches.push(listener);
    }

    /**
     * @param {!Node} node
     */

  }, {
    key: 'patchTree',
    value: function patchTree(node) {
      var _this = this;

      if (!this._hasPatches) return;

      walkDeepDescendantElements(node, function (element) {
        return _this.patch(element);
      });
    }

    /**
     * @param {!Node} node
     */

  }, {
    key: 'patch',
    value: function patch(node) {
      if (!this._hasPatches) return;

      if (node.__CE_patched) return;
      node.__CE_patched = true;

      for (var i = 0; i < this._patches.length; i++) {
        this._patches[i](node);
      }
    }

    /**
     * @param {!Node} root
     */

  }, {
    key: 'connectTree',
    value: function connectTree(root) {
      var elements = [];

      walkDeepDescendantElements(root, function (element) {
        return elements.push(element);
      });

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.__CE_state === CustomElementState.custom) {
          if (isConnected(element)) {
            this.connectedCallback(element);
          }
        } else {
          this.upgradeElement(element);
        }
      }
    }

    /**
     * @param {!Node} root
     */

  }, {
    key: 'disconnectTree',
    value: function disconnectTree(root) {
      var elements = [];

      walkDeepDescendantElements(root, function (element) {
        return elements.push(element);
      });

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.__CE_state === CustomElementState.custom) {
          this.disconnectedCallback(element);
        }
      }
    }

    /**
     * Upgrades all uncustomized custom elements at and below a root node for
     * which there is a definition. When custom element reaction callbacks are
     * assumed to be called synchronously (which, by the current DOM / HTML spec
     * definitions, they are *not*), callbacks for both elements customized
     * synchronously by the parser and elements being upgraded occur in the same
     * relative order.
     *
     * NOTE: This function, when used to simulate the construction of a tree that
     * is already created but not customized (i.e. by the parser), does *not*
     * prevent the element from reading the 'final' (true) state of the tree. For
     * example, the element, during truly synchronous parsing / construction would
     * see that it contains no children as they have not yet been inserted.
     * However, this function does not modify the tree, the element will
     * (incorrectly) have children. Additionally, self-modification restrictions
     * for custom element constructors imposed by the DOM spec are *not* enforced.
     *
     *
     * The following nested list shows the steps extending down from the HTML
     * spec's parsing section that cause elements to be synchronously created and
     * upgraded:
     *
     * The "in body" insertion mode:
     * https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
     * - Switch on token:
     *   .. other cases ..
     *   -> Any other start tag
     *      - [Insert an HTML element](below) for the token.
     *
     * Insert an HTML element:
     * https://html.spec.whatwg.org/multipage/syntax.html#insert-an-html-element
     * - Insert a foreign element for the token in the HTML namespace:
     *   https://html.spec.whatwg.org/multipage/syntax.html#insert-a-foreign-element
     *   - Create an element for a token:
     *     https://html.spec.whatwg.org/multipage/syntax.html#create-an-element-for-the-token
     *     - Will execute script flag is true?
     *       - (Element queue pushed to the custom element reactions stack.)
     *     - Create an element:
     *       https://dom.spec.whatwg.org/#concept-create-element
     *       - Sync CE flag is true?
     *         - Constructor called.
     *         - Self-modification restrictions enforced.
     *       - Sync CE flag is false?
     *         - (Upgrade reaction enqueued.)
     *     - Attributes appended to element.
     *       (`attributeChangedCallback` reactions enqueued.)
     *     - Will execute script flag is true?
     *       - (Element queue popped from the custom element reactions stack.
     *         Reactions in the popped stack are invoked.)
     *   - (Element queue pushed to the custom element reactions stack.)
     *   - Insert the element:
     *     https://dom.spec.whatwg.org/#concept-node-insert
     *     - Shadow-including descendants are connected. During parsing
     *       construction, there are no shadow-*excluding* descendants.
     *       However, the constructor may have validly attached a shadow
     *       tree to itself and added descendants to that shadow tree.
     *       (`connectedCallback` reactions enqueued.)
     *   - (Element queue popped from the custom element reactions stack.
     *     Reactions in the popped stack are invoked.)
     *
     * @param {!Node} root
     * @param {!Set<Node>=} visitedImports
     */

  }, {
    key: 'patchAndUpgradeTree',
    value: function patchAndUpgradeTree(root) {
      var _this2 = this;

      var visitedImports = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

      var elements = [];

      var gatherElements = function gatherElements(element) {
        if (element.localName === 'link' && element.getAttribute('rel') === 'import') {
          // The HTML Imports polyfill sets a descendant element of the link to
          // the `import` property, specifically this is *not* a Document.
          var importNode = /** @type {?Node} */element.import;

          if (importNode instanceof Node && importNode.readyState === 'complete') {
            importNode.__CE_isImportDocument = true;

            // Connected links are associated with the registry.
            importNode.__CE_hasRegistry = true;
          } else {
            // If this link's import root is not available, its contents can't be
            // walked. Wait for 'load' and walk it when it's ready.
            element.addEventListener('load', function () {
              var importNode = /** @type {!Node} */element.import;

              if (importNode.__CE_documentLoadHandled) return;
              importNode.__CE_documentLoadHandled = true;

              importNode.__CE_isImportDocument = true;

              // Connected links are associated with the registry.
              importNode.__CE_hasRegistry = true;

              // Clone the `visitedImports` set that was populated sync during
              // the `patchAndUpgradeTree` call that caused this 'load' handler to
              // be added. Then, remove *this* link's import node so that we can
              // walk that import again, even if it was partially walked later
              // during the same `patchAndUpgradeTree` call.
              visitedImports.delete(importNode);

              _this2.patchAndUpgradeTree(importNode, visitedImports);
            });
          }
        } else {
          elements.push(element);
        }
      };

      // `walkDeepDescendantElements` populates (and internally checks against)
      // `visitedImports` when traversing a loaded import.
      walkDeepDescendantElements(root, gatherElements, visitedImports);

      if (this._hasPatches) {
        for (var i = 0; i < elements.length; i++) {
          this.patch(elements[i]);
        }
      }

      for (var _i = 0; _i < elements.length; _i++) {
        this.upgradeElement(elements[_i]);
      }
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'upgradeElement',
    value: function upgradeElement(element) {
      var currentState = element.__CE_state;
      if (currentState !== undefined) return;

      var definition = this.localNameToDefinition(element.localName);
      if (!definition) return;

      definition.constructionStack.push(element);

      var constructor = definition.constructor;
      try {
        try {
          var result = new constructor();
          if (result !== element) {
            throw new Error('The custom element constructor did not produce the element being upgraded.');
          }
        } finally {
          definition.constructionStack.pop();
        }
      } catch (e) {
        element.__CE_state = CustomElementState.failed;
        throw e;
      }

      element.__CE_state = CustomElementState.custom;
      element.__CE_definition = definition;

      if (definition.attributeChangedCallback) {
        var observedAttributes = definition.observedAttributes;
        for (var i = 0; i < observedAttributes.length; i++) {
          var name = observedAttributes[i];
          var value = element.getAttribute(name);
          if (value !== null) {
            this.attributeChangedCallback(element, name, null, value, null);
          }
        }
      }

      if (isConnected(element)) {
        this.connectedCallback(element);
      }
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback(element) {
      var definition = element.__CE_definition;
      if (definition.connectedCallback) {
        definition.connectedCallback.call(element);
      }

      element.__CE_isConnectedCallbackCalled = true;
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback(element) {
      if (!element.__CE_isConnectedCallbackCalled) {
        this.connectedCallback(element);
      }

      var definition = element.__CE_definition;
      if (definition.disconnectedCallback) {
        definition.disconnectedCallback.call(element);
      }

      element.__CE_isConnectedCallbackCalled = undefined;
    }

    /**
     * @param {!Element} element
     * @param {string} name
     * @param {?string} oldValue
     * @param {?string} newValue
     * @param {?string} namespace
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(element, name, oldValue, newValue, namespace) {
      var definition = element.__CE_definition;
      if (definition.attributeChangedCallback && definition.observedAttributes.indexOf(name) > -1) {
        definition.attributeChangedCallback.call(element, name, oldValue, newValue, namespace);
      }
    }
  }]);
  return CustomElementInternals;
}();

var DocumentConstructionObserver = function () {
  function DocumentConstructionObserver(internals, doc) {
    classCallCheck(this, DocumentConstructionObserver);

    /**
     * @type {!CustomElementInternals}
     */
    this._internals = internals;

    /**
     * @type {!Document}
     */
    this._document = doc;

    /**
     * @type {MutationObserver|undefined}
     */
    this._observer = undefined;

    // Simulate tree construction for all currently accessible nodes in the
    // document.
    this._internals.patchAndUpgradeTree(this._document);

    if (this._document.readyState === 'loading') {
      this._observer = new MutationObserver(this._handleMutations.bind(this));

      // Nodes created by the parser are given to the observer *before* the next
      // task runs. Inline scripts are run in a new task. This means that the
      // observer will be able to handle the newly parsed nodes before the inline
      // script is run.
      this._observer.observe(this._document, {
        childList: true,
        subtree: true
      });
    }
  }

  createClass(DocumentConstructionObserver, [{
    key: 'disconnect',
    value: function disconnect() {
      if (this._observer) {
        this._observer.disconnect();
      }
    }

    /**
     * @param {!Array<!MutationRecord>} mutations
     */

  }, {
    key: '_handleMutations',
    value: function _handleMutations(mutations) {
      // Once the document's `readyState` is 'interactive' or 'complete', all new
      // nodes created within that document will be the result of script and
      // should be handled by patching.
      var readyState = this._document.readyState;
      if (readyState === 'interactive' || readyState === 'complete') {
        this.disconnect();
      }

      for (var i = 0; i < mutations.length; i++) {
        var addedNodes = mutations[i].addedNodes;
        for (var j = 0; j < addedNodes.length; j++) {
          var node = addedNodes[j];
          this._internals.patchAndUpgradeTree(node);
        }
      }
    }
  }]);
  return DocumentConstructionObserver;
}();

/**
 * @template T
 */
var Deferred = function () {
  function Deferred() {
    var _this = this;

    classCallCheck(this, Deferred);

    /**
     * @private
     * @type {T|undefined}
     */
    this._value = undefined;

    /**
     * @private
     * @type {Function|undefined}
     */
    this._resolve = undefined;

    /**
     * @private
     * @type {!Promise<T>}
     */
    this._promise = new Promise(function (resolve) {
      _this._resolve = resolve;

      if (_this._value) {
        resolve(_this._value);
      }
    });
  }

  /**
   * @param {T} value
   */


  createClass(Deferred, [{
    key: 'resolve',
    value: function resolve(value) {
      if (this._value) {
        throw new Error('Already resolved.');
      }

      this._value = value;

      if (this._resolve) {
        this._resolve(value);
      }
    }

    /**
     * @return {!Promise<T>}
     */

  }, {
    key: 'toPromise',
    value: function toPromise() {
      return this._promise;
    }
  }]);
  return Deferred;
}();

/**
 * @unrestricted
 */

var CustomElementRegistry = function () {

  /**
   * @param {!CustomElementInternals} internals
   */
  function CustomElementRegistry(internals) {
    classCallCheck(this, CustomElementRegistry);

    /**
     * @private
     * @type {boolean}
     */
    this._elementDefinitionIsRunning = false;

    /**
     * @private
     * @type {!CustomElementInternals}
     */
    this._internals = internals;

    /**
     * @private
     * @type {!Map<string, !Deferred<undefined>>}
     */
    this._whenDefinedDeferred = new Map();

    /**
     * The default flush callback triggers the document walk synchronously.
     * @private
     * @type {!Function}
     */
    this._flushCallback = function (fn) {
      return fn();
    };

    /**
     * @private
     * @type {boolean}
     */
    this._flushPending = false;

    /**
     * @private
     * @type {!Array<string>}
     */
    this._unflushedLocalNames = [];

    /**
     * @private
     * @type {!DocumentConstructionObserver}
     */
    this._documentConstructionObserver = new DocumentConstructionObserver(internals, document);
  }

  /**
   * @param {string} localName
   * @param {!Function} constructor
   */


  createClass(CustomElementRegistry, [{
    key: 'define',
    value: function define(localName, constructor) {
      var _this = this;

      if (!(constructor instanceof Function)) {
        throw new TypeError('Custom element constructors must be functions.');
      }

      if (!isValidCustomElementName(localName)) {
        throw new SyntaxError('The element name \'' + localName + '\' is not valid.');
      }

      if (this._internals.localNameToDefinition(localName)) {
        throw new Error('A custom element with name \'' + localName + '\' has already been defined.');
      }

      if (this._elementDefinitionIsRunning) {
        throw new Error('A custom element is already being defined.');
      }
      this._elementDefinitionIsRunning = true;

      var connectedCallback = void 0;
      var disconnectedCallback = void 0;
      var adoptedCallback = void 0;
      var attributeChangedCallback = void 0;
      var observedAttributes = void 0;
      try {
        var getCallback = function getCallback(name) {
          var callbackValue = prototype[name];
          if (callbackValue !== undefined && !(callbackValue instanceof Function)) {
            throw new Error('The \'' + name + '\' callback must be a function.');
          }
          return callbackValue;
        };

        /** @type {!Object} */
        var prototype = constructor.prototype;
        if (!(prototype instanceof Object)) {
          throw new TypeError('The custom element constructor\'s prototype is not an object.');
        }

        connectedCallback = getCallback('connectedCallback');
        disconnectedCallback = getCallback('disconnectedCallback');
        adoptedCallback = getCallback('adoptedCallback');
        attributeChangedCallback = getCallback('attributeChangedCallback');
        observedAttributes = constructor['observedAttributes'] || [];
      } catch (e) {
        return;
      } finally {
        this._elementDefinitionIsRunning = false;
      }

      var definition = {
        localName: localName,
        constructor: constructor,
        connectedCallback: connectedCallback,
        disconnectedCallback: disconnectedCallback,
        adoptedCallback: adoptedCallback,
        attributeChangedCallback: attributeChangedCallback,
        observedAttributes: observedAttributes,
        constructionStack: []
      };

      this._internals.setDefinition(localName, definition);

      this._unflushedLocalNames.push(localName);

      // If we've already called the flush callback and it hasn't called back yet,
      // don't call it again.
      if (!this._flushPending) {
        this._flushPending = true;
        this._flushCallback(function () {
          return _this._flush();
        });
      }
    }
  }, {
    key: '_flush',
    value: function _flush() {
      // If no new definitions were defined, don't attempt to flush. This could
      // happen if a flush callback keeps the function it is given and calls it
      // multiple times.
      if (this._flushPending === false) return;

      this._flushPending = false;
      this._internals.patchAndUpgradeTree(document);

      while (this._unflushedLocalNames.length > 0) {
        var localName = this._unflushedLocalNames.shift();
        var deferred = this._whenDefinedDeferred.get(localName);
        if (deferred) {
          deferred.resolve(undefined);
        }
      }
    }

    /**
     * @param {string} localName
     * @return {Function|undefined}
     */

  }, {
    key: 'get',
    value: function get$$1(localName) {
      var definition = this._internals.localNameToDefinition(localName);
      if (definition) {
        return definition.constructor;
      }

      return undefined;
    }

    /**
     * @param {string} localName
     * @return {!Promise<undefined>}
     */

  }, {
    key: 'whenDefined',
    value: function whenDefined(localName) {
      if (!isValidCustomElementName(localName)) {
        return Promise.reject(new SyntaxError('\'' + localName + '\' is not a valid custom element name.'));
      }

      var prior = this._whenDefinedDeferred.get(localName);
      if (prior) {
        return prior.toPromise();
      }

      var deferred = new Deferred();
      this._whenDefinedDeferred.set(localName, deferred);

      var definition = this._internals.localNameToDefinition(localName);
      // Resolve immediately only if the given local name has a definition *and*
      // the full document walk to upgrade elements with that local name has
      // already happened.
      if (definition && this._unflushedLocalNames.indexOf(localName) === -1) {
        deferred.resolve(undefined);
      }

      return deferred.toPromise();
    }
  }, {
    key: 'polyfillWrapFlushCallback',
    value: function polyfillWrapFlushCallback(outer) {
      this._documentConstructionObserver.disconnect();
      var inner = this._flushCallback;
      this._flushCallback = function (flush) {
        return outer(function () {
          return inner(flush);
        });
      };
    }
  }]);
  return CustomElementRegistry;
}();

window['CustomElementRegistry'] = CustomElementRegistry;
CustomElementRegistry.prototype['define'] = CustomElementRegistry.prototype.define;
CustomElementRegistry.prototype['get'] = CustomElementRegistry.prototype.get;
CustomElementRegistry.prototype['whenDefined'] = CustomElementRegistry.prototype.whenDefined;
CustomElementRegistry.prototype['polyfillWrapFlushCallback'] = CustomElementRegistry.prototype.polyfillWrapFlushCallback;

var Native = {
  Document_createElement: window.Document.prototype.createElement,
  Document_createElementNS: window.Document.prototype.createElementNS,
  Document_importNode: window.Document.prototype.importNode,
  Document_prepend: window.Document.prototype['prepend'],
  Document_append: window.Document.prototype['append'],
  Node_cloneNode: window.Node.prototype.cloneNode,
  Node_appendChild: window.Node.prototype.appendChild,
  Node_insertBefore: window.Node.prototype.insertBefore,
  Node_removeChild: window.Node.prototype.removeChild,
  Node_replaceChild: window.Node.prototype.replaceChild,
  Node_textContent: Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
  Element_attachShadow: window.Element.prototype['attachShadow'],
  Element_innerHTML: Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
  Element_getAttribute: window.Element.prototype.getAttribute,
  Element_setAttribute: window.Element.prototype.setAttribute,
  Element_removeAttribute: window.Element.prototype.removeAttribute,
  Element_getAttributeNS: window.Element.prototype.getAttributeNS,
  Element_setAttributeNS: window.Element.prototype.setAttributeNS,
  Element_removeAttributeNS: window.Element.prototype.removeAttributeNS,
  Element_insertAdjacentElement: window.Element.prototype['insertAdjacentElement'],
  Element_prepend: window.Element.prototype['prepend'],
  Element_append: window.Element.prototype['append'],
  Element_before: window.Element.prototype['before'],
  Element_after: window.Element.prototype['after'],
  Element_replaceWith: window.Element.prototype['replaceWith'],
  Element_remove: window.Element.prototype['remove'],
  HTMLElement: window.HTMLElement,
  HTMLElement_innerHTML: Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML'),
  HTMLElement_insertAdjacentElement: window.HTMLElement.prototype['insertAdjacentElement']
};

/**
 * This class exists only to work around Closure's lack of a way to describe
 * singletons. It represents the 'already constructed marker' used in custom
 * element construction stacks.
 *
 * https://html.spec.whatwg.org/#concept-already-constructed-marker
 */
var AlreadyConstructedMarker = function AlreadyConstructedMarker() {
  classCallCheck(this, AlreadyConstructedMarker);
};

var AlreadyConstructedMarker$1 = new AlreadyConstructedMarker();

/**
 * @param {!CustomElementInternals} internals
 */
var PatchHTMLElement = function (internals) {
  window['HTMLElement'] = function () {
    /**
     * @type {function(new: HTMLElement): !HTMLElement}
     */
    function HTMLElement() {
      // This should really be `new.target` but `new.target` can't be emulated
      // in ES5. Assuming the user keeps the default value of the constructor's
      // prototype's `constructor` property, this is equivalent.
      /** @type {!Function} */
      var constructor = this.constructor;

      var definition = internals.constructorToDefinition(constructor);
      if (!definition) {
        throw new Error('The custom element being constructed was not registered with `customElements`.');
      }

      var constructionStack = definition.constructionStack;

      if (constructionStack.length === 0) {
        var _element = Native.Document_createElement.call(document, definition.localName);
        Object.setPrototypeOf(_element, constructor.prototype);
        _element.__CE_state = CustomElementState.custom;
        _element.__CE_definition = definition;
        internals.patch(_element);
        return _element;
      }

      var lastIndex = constructionStack.length - 1;
      var element = constructionStack[lastIndex];
      if (element === AlreadyConstructedMarker$1) {
        throw new Error('The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.');
      }
      constructionStack[lastIndex] = AlreadyConstructedMarker$1;

      Object.setPrototypeOf(element, constructor.prototype);
      internals.patch( /** @type {!HTMLElement} */element);

      return element;
    }

    HTMLElement.prototype = Native.HTMLElement.prototype;

    return HTMLElement;
  }();
};

/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ParentNodeNativeMethods} builtIn
 */
var PatchParentNode = function (internals, destination, builtIn) {
  /**
   * @param {...(!Node|string)} nodes
   */
  destination['prepend'] = function () {
    for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
      nodes[_key] = arguments[_key];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.prepend.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['append'] = function () {
    for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nodes[_key2] = arguments[_key2];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.append.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var node = nodes[_i2];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchDocument = function (internals) {
  setPropertyUnchecked(Document.prototype, 'createElement',
  /**
   * @this {Document}
   * @param {string} localName
   * @return {!Element}
   */
  function (localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry) {
      var definition = internals.localNameToDefinition(localName);
      if (definition) {
        return new definition.constructor();
      }
    }

    var result = /** @type {!Element} */
    Native.Document_createElement.call(this, localName);
    internals.patch(result);
    return result;
  });

  setPropertyUnchecked(Document.prototype, 'importNode',
  /**
   * @this {Document}
   * @param {!Node} node
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (node, deep) {
    var clone = Native.Document_importNode.call(this, node, deep);
    // Only create custom elements if this document is associated with the registry.
    if (!this.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }
    return clone;
  });

  var NS_HTML = "http://www.w3.org/1999/xhtml";

  setPropertyUnchecked(Document.prototype, 'createElementNS',
  /**
   * @this {Document}
   * @param {?string} namespace
   * @param {string} localName
   * @return {!Element}
   */
  function (namespace, localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry && (namespace === null || namespace === NS_HTML)) {
      var definition = internals.localNameToDefinition(localName);
      if (definition) {
        return new definition.constructor();
      }
    }

    var result = /** @type {!Element} */
    Native.Document_createElementNS.call(this, namespace, localName);
    internals.patch(result);
    return result;
  });

  PatchParentNode(internals, Document.prototype, {
    prepend: Native.Document_prepend,
    append: Native.Document_append
  });
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchNode = function (internals) {
  // `Node#nodeValue` is implemented on `Attr`.
  // `Node#textContent` is implemented on `Attr`, `Element`.

  setPropertyUnchecked(Node.prototype, 'insertBefore',
  /**
   * @this {Node}
   * @param {!Node} node
   * @param {?Node} refNode
   * @return {!Node}
   */
  function (node, refNode) {
    if (node instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(node.childNodes);
      var _nativeResult = Native.Node_insertBefore.call(this, node, refNode);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult;
    }

    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_insertBefore.call(this, node, refNode);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'appendChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    if (node instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(node.childNodes);
      var _nativeResult2 = Native.Node_appendChild.call(this, node);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult2;
    }

    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_appendChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'cloneNode',
  /**
   * @this {Node}
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (deep) {
    var clone = Native.Node_cloneNode.call(this, deep);
    // Only create custom elements if this element's owner document is
    // associated with the registry.
    if (!this.ownerDocument.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }
    return clone;
  });

  setPropertyUnchecked(Node.prototype, 'removeChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_removeChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'replaceChild',
  /**
   * @this {Node}
   * @param {!Node} nodeToInsert
   * @param {!Node} nodeToRemove
   * @return {!Node}
   */
  function (nodeToInsert, nodeToRemove) {
    if (nodeToInsert instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(nodeToInsert.childNodes);
      var _nativeResult3 = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        internals.disconnectTree(nodeToRemove);
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult3;
    }

    var nodeToInsertWasConnected = isConnected(nodeToInsert);
    var nativeResult = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);
    var thisIsConnected = isConnected(this);

    if (thisIsConnected) {
      internals.disconnectTree(nodeToRemove);
    }

    if (nodeToInsertWasConnected) {
      internals.disconnectTree(nodeToInsert);
    }

    if (thisIsConnected) {
      internals.connectTree(nodeToInsert);
    }

    return nativeResult;
  });

  function patch_textContent(destination, baseDescriptor) {
    Object.defineProperty(destination, 'textContent', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set: /** @this {Node} */function set(assignedValue) {
        // If this is a text node then there are no nodes to disconnect.
        if (this.nodeType === Node.TEXT_NODE) {
          baseDescriptor.set.call(this, assignedValue);
          return;
        }

        var removedNodes = undefined;
        // Checking for `firstChild` is faster than reading `childNodes.length`
        // to compare with 0.
        if (this.firstChild) {
          // Using `childNodes` is faster than `children`, even though we only
          // care about elements.
          var childNodes = this.childNodes;
          var childNodesLength = childNodes.length;
          if (childNodesLength > 0 && isConnected(this)) {
            // Copying an array by iterating is faster than using slice.
            removedNodes = new Array(childNodesLength);
            for (var i = 0; i < childNodesLength; i++) {
              removedNodes[i] = childNodes[i];
            }
          }
        }

        baseDescriptor.set.call(this, assignedValue);

        if (removedNodes) {
          for (var _i = 0; _i < removedNodes.length; _i++) {
            internals.disconnectTree(removedNodes[_i]);
          }
        }
      }
    });
  }

  if (Native.Node_textContent && Native.Node_textContent.get) {
    patch_textContent(Node.prototype, Native.Node_textContent);
  } else {
    internals.addPatch(function (element) {
      patch_textContent(element, {
        enumerable: true,
        configurable: true,
        // NOTE: This implementation of the `textContent` getter assumes that
        // text nodes' `textContent` getter will not be patched.
        get: /** @this {Node} */function get() {
          /** @type {!Array<string>} */
          var parts = [];

          for (var i = 0; i < this.childNodes.length; i++) {
            parts.push(this.childNodes[i].textContent);
          }

          return parts.join('');
        },
        set: /** @this {Node} */function set(assignedValue) {
          while (this.firstChild) {
            Native.Node_removeChild.call(this, this.firstChild);
          }
          Native.Node_appendChild.call(this, document.createTextNode(assignedValue));
        }
      });
    });
  }
};

/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ChildNodeNativeMethods} builtIn
 */
var PatchChildNode = function (internals, destination, builtIn) {
  /**
   * @param {...(!Node|string)} nodes
   */
  destination['before'] = function () {
    for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
      nodes[_key] = arguments[_key];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.before.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['after'] = function () {
    for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nodes[_key2] = arguments[_key2];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.after.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var node = nodes[_i2];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['replaceWith'] = function () {
    for (var _len3 = arguments.length, nodes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      nodes[_key3] = arguments[_key3];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    var wasConnected = isConnected(this);

    builtIn.replaceWith.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (wasConnected) {
      internals.disconnectTree(this);
      for (var _i3 = 0; _i3 < nodes.length; _i3++) {
        var node = nodes[_i3];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  destination['remove'] = function () {
    var wasConnected = isConnected(this);

    builtIn.remove.call(this);

    if (wasConnected) {
      internals.disconnectTree(this);
    }
  };
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchElement = function (internals) {
  if (Native.Element_attachShadow) {
    setPropertyUnchecked(Element.prototype, 'attachShadow',
    /**
     * @this {Element}
     * @param {!{mode: string}} init
     * @return {ShadowRoot}
     */
    function (init) {
      var shadowRoot = Native.Element_attachShadow.call(this, init);
      this.__CE_shadowRoot = shadowRoot;
      return shadowRoot;
    });
  } else {
    console.warn('Custom Elements: `Element#attachShadow` was not patched.');
  }

  function patch_innerHTML(destination, baseDescriptor) {
    Object.defineProperty(destination, 'innerHTML', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set: /** @this {Element} */function set(htmlString) {
        var _this = this;

        var isConnected$$1 = isConnected(this);

        // NOTE: In IE11, when using the native `innerHTML` setter, all nodes
        // that were previously descendants of the context element have all of
        // their children removed as part of the set - the entire subtree is
        // 'disassembled'. This work around walks the subtree *before* using the
        // native setter.
        /** @type {!Array<!Element>|undefined} */
        var removedElements = undefined;
        if (isConnected$$1) {
          removedElements = [];
          walkDeepDescendantElements(this, function (element) {
            if (element !== _this) {
              removedElements.push(element);
            }
          });
        }

        baseDescriptor.set.call(this, htmlString);

        if (removedElements) {
          for (var i = 0; i < removedElements.length; i++) {
            var element = removedElements[i];
            if (element.__CE_state === CustomElementState.custom) {
              internals.disconnectedCallback(element);
            }
          }
        }

        // Only create custom elements if this element's owner document is
        // associated with the registry.
        if (!this.ownerDocument.__CE_hasRegistry) {
          internals.patchTree(this);
        } else {
          internals.patchAndUpgradeTree(this);
        }
        return htmlString;
      }
    });
  }

  if (Native.Element_innerHTML && Native.Element_innerHTML.get) {
    patch_innerHTML(Element.prototype, Native.Element_innerHTML);
  } else if (Native.HTMLElement_innerHTML && Native.HTMLElement_innerHTML.get) {
    patch_innerHTML(HTMLElement.prototype, Native.HTMLElement_innerHTML);
  } else {

    /** @type {HTMLDivElement} */
    var rawDiv = Native.Document_createElement.call(document, 'div');

    internals.addPatch(function (element) {
      patch_innerHTML(element, {
        enumerable: true,
        configurable: true,
        // Implements getting `innerHTML` by performing an unpatched `cloneNode`
        // of the element and returning the resulting element's `innerHTML`.
        // TODO: Is this too expensive?
        get: /** @this {Element} */function get() {
          return Native.Node_cloneNode.call(this, true).innerHTML;
        },
        // Implements setting `innerHTML` by creating an unpatched element,
        // setting `innerHTML` of that element and replacing the target
        // element's children with those of the unpatched element.
        set: /** @this {Element} */function set(assignedValue) {
          // NOTE: re-route to `content` for `template` elements.
          // We need to do this because `template.appendChild` does not
          // route into `template.content`.
          /** @type {!Node} */
          var content = this.localName === 'template' ? /** @type {!HTMLTemplateElement} */this.content : this;
          rawDiv.innerHTML = assignedValue;

          while (content.childNodes.length > 0) {
            Native.Node_removeChild.call(content, content.childNodes[0]);
          }
          while (rawDiv.childNodes.length > 0) {
            Native.Node_appendChild.call(content, rawDiv.childNodes[0]);
          }
        }
      });
    });
  }

  setPropertyUnchecked(Element.prototype, 'setAttribute',
  /**
   * @this {Element}
   * @param {string} name
   * @param {string} newValue
   */
  function (name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_setAttribute.call(this, name, newValue);
    }

    var oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_setAttribute.call(this, name, newValue);
    newValue = Native.Element_getAttribute.call(this, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, null);
  });

  setPropertyUnchecked(Element.prototype, 'setAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   * @param {string} newValue
   */
  function (namespace, name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    }

    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    newValue = Native.Element_getAttributeNS.call(this, namespace, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
  });

  setPropertyUnchecked(Element.prototype, 'removeAttribute',
  /**
   * @this {Element}
   * @param {string} name
   */
  function (name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_removeAttribute.call(this, name);
    }

    var oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_removeAttribute.call(this, name);
    if (oldValue !== null) {
      internals.attributeChangedCallback(this, name, oldValue, null, null);
    }
  });

  setPropertyUnchecked(Element.prototype, 'removeAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   */
  function (namespace, name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_removeAttributeNS.call(this, namespace, name);
    }

    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_removeAttributeNS.call(this, namespace, name);
    // In older browsers, `Element#getAttributeNS` may return the empty string
    // instead of null if the attribute does not exist. For details, see;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS#Notes
    var newValue = Native.Element_getAttributeNS.call(this, namespace, name);
    if (oldValue !== newValue) {
      internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
    }
  });

  function patch_insertAdjacentElement(destination, baseMethod) {
    setPropertyUnchecked(destination, 'insertAdjacentElement',
    /**
     * @this {Element}
     * @param {string} where
     * @param {!Element} element
     * @return {?Element}
     */
    function (where, element) {
      var wasConnected = isConnected(element);
      var insertedElement = /** @type {!Element} */
      baseMethod.call(this, where, element);

      if (wasConnected) {
        internals.disconnectTree(element);
      }

      if (isConnected(insertedElement)) {
        internals.connectTree(element);
      }
      return insertedElement;
    });
  }

  if (Native.HTMLElement_insertAdjacentElement) {
    patch_insertAdjacentElement(HTMLElement.prototype, Native.HTMLElement_insertAdjacentElement);
  } else if (Native.Element_insertAdjacentElement) {
    patch_insertAdjacentElement(Element.prototype, Native.Element_insertAdjacentElement);
  } else {
    console.warn('Custom Elements: `Element#insertAdjacentElement` was not patched.');
  }

  PatchParentNode(internals, Element.prototype, {
    prepend: Native.Element_prepend,
    append: Native.Element_append
  });

  PatchChildNode(internals, Element.prototype, {
    before: Native.Element_before,
    after: Native.Element_after,
    replaceWith: Native.Element_replaceWith,
    remove: Native.Element_remove
  });
};

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

var priorCustomElements = window['customElements'];

if (!priorCustomElements || priorCustomElements['forcePolyfill'] || typeof priorCustomElements['define'] != 'function' || typeof priorCustomElements['get'] != 'function') {
  /** @type {!CustomElementInternals} */
  var internals = new CustomElementInternals();

  PatchHTMLElement(internals);
  PatchDocument(internals);
  PatchNode(internals);
  PatchElement(internals);

  // The main document is always associated with the registry.
  document.__CE_hasRegistry = true;

  /** @type {!CustomElementRegistry} */
  var customElements = new CustomElementRegistry(internals);

  Object.defineProperty(window, 'customElements', {
    configurable: true,
    enumerable: true,
    value: customElements
  });
}

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.7.22

(function (global) {
  if (global.JsMutationObserver) {
    return;
  }
  var registrationsTable = new WeakMap();
  var setImmediate;
  if (/Trident|Edge/.test(navigator.userAgent)) {
    setImmediate = setTimeout;
  } else if (window.setImmediate) {
    setImmediate = window.setImmediate;
  } else {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener("message", function (e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function (func) {
          func();
        });
      }
    });
    setImmediate = function setImmediate(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, "*");
    };
  }
  var isScheduled = false;
  var scheduledObservers = [];
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }
  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
  }
  function dispatchCallbacks() {
    isScheduled = false;
    var observers = scheduledObservers;
    scheduledObservers = [];
    observers.sort(function (o1, o2) {
      return o1.uid_ - o2.uid_;
    });
    var anyNonEmpty = false;
    observers.forEach(function (observer) {
      var queue = observer.takeRecords();
      removeTransientObserversFor(observer);
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });
    if (anyNonEmpty) dispatchCallbacks();
  }
  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function (node) {
      var registrations = registrationsTable.get(node);
      if (!registrations) return;
      registrations.forEach(function (registration) {
        if (registration.observer === observer) registration.removeTransientObservers();
      });
    });
  }
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);
      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;
          if (node !== target && !options.subtree) continue;
          var record = callback(options);
          if (record) registration.enqueue(record);
        }
      }
    }
  }
  var uidCounter = 0;
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }
  JsMutationObserver.prototype = {
    observe: function observe(target, options) {
      target = wrapIfNeeded(target);
      if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
        throw new SyntaxError();
      }
      var registrations = registrationsTable.get(target);
      if (!registrations) registrationsTable.set(target, registrations = []);
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }
      registration.addListeners();
    },
    disconnect: function disconnect() {
      this.nodes_.forEach(function (node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
      this.records_ = [];
    },
    takeRecords: function takeRecords() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }
  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  }
  var currentRecord, recordWithOldValue;
  function getRecord(type, target) {
    return currentRecord = new MutationRecord(type, target);
  }
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue) return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }
  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord) return lastRecord;
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
    return null;
  }
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }
  Registration.prototype = {
    enqueue: function enqueue(record) {
      var records = this.observer.records_;
      var length = records.length;
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }
      records[length] = record;
    },
    addListeners: function addListeners() {
      this.addListeners_(this.target);
    },
    addListeners_: function addListeners_(node) {
      var options = this.options;
      if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true);
    },
    removeListeners: function removeListeners() {
      this.removeListeners_(this.target);
    },
    removeListeners_: function removeListeners_(node) {
      var options = this.options;
      if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true);
    },
    addTransientObserver: function addTransientObserver(node) {
      if (node === this.target) return;
      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations) registrationsTable.set(node, registrations = []);
      registrations.push(this);
    },
    removeTransientObservers: function removeTransientObservers() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];
      transientObservedNodes.forEach(function (node) {
        this.removeListeners_(node);
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
    },
    handleEvent: function handleEvent(e) {
      e.stopImmediatePropagation();
      switch (e.type) {
        case "DOMAttrModified":
          var name = e.attrName;
          var namespace = e.relatedNode.namespaceURI;
          var target = e.target;
          var record = new getRecord("attributes", target);
          record.attributeName = name;
          record.attributeNamespace = namespace;
          var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function (options) {
            if (!options.attributes) return;
            if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
              return;
            }
            if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
            return record;
          });
          break;

        case "DOMCharacterDataModified":
          var target = e.target;
          var record = getRecord("characterData", target);
          var oldValue = e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function (options) {
            if (!options.characterData) return;
            if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
            return record;
          });
          break;

        case "DOMNodeRemoved":
          this.addTransientObserver(e.target);

        case "DOMNodeInserted":
          var changedNode = e.target;
          var addedNodes, removedNodes;
          if (e.type === "DOMNodeInserted") {
            addedNodes = [changedNode];
            removedNodes = [];
          } else {
            addedNodes = [];
            removedNodes = [changedNode];
          }
          var previousSibling = changedNode.previousSibling;
          var nextSibling = changedNode.nextSibling;
          var record = getRecord("childList", e.target.parentNode);
          record.addedNodes = addedNodes;
          record.removedNodes = removedNodes;
          record.previousSibling = previousSibling;
          record.nextSibling = nextSibling;
          forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function (options) {
            if (!options.childList) return;
            return record;
          });
      }
      clearRecords();
    }
  };
  global.JsMutationObserver = JsMutationObserver;
  if (!global.MutationObserver) {
    global.MutationObserver = JsMutationObserver;
    JsMutationObserver._isPolyfilled = true;
  }
})(self);

/*
Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function (global, undefined) {
    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function () {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                new Function("" + handler)();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(self);

// Caution:
// Do not replace this import statement with codes.
//
// If you replace this import statement with codes,
// the codes will be executed after the following polyfills are imported
// because import statements are hoisted during compilation.
// Polyfill ECMAScript standard features with global namespace pollution
// Polyfill Custom Elements v1 with global namespace pollution
// Polyfill MutationObserver with global namespace pollution
// Polyfill setImmediate with global namespace pollution

(function () {
  var DEFAULT_VIEWPORT = 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no';

  var Viewport = {
    ensureViewportElement: function ensureViewportElement() {
      var viewportElement = document.querySelector('meta[name=viewport]');

      if (!viewportElement) {
        viewportElement = document.createElement('meta');
        viewportElement.name = 'viewport';
        document.head.appendChild(viewportElement);
      }

      return viewportElement;
    },

    setup: function setup() {
      var viewportElement = Viewport.ensureViewportElement();

      if (!viewportElement) {
        return;
      }

      if (!viewportElement.hasAttribute('content')) {
        viewportElement.setAttribute('content', DEFAULT_VIEWPORT);
      }
    }
  };

  window.Viewport = Viewport;
})();

function setup(ons$$1) {
  if (window._onsLoaded) {
    ons$$1._util.warn('Onsen UI is loaded more than once.');
  }
  window._onsLoaded = true;

  // fastclick
  window.addEventListener('load', function () {
    ons$$1.fastClick = fastclick_1.attach(document.body);

    var supportTouchAction = 'touch-action' in document.body.style;

    ons$$1.platform._runOnActualPlatform(function () {
      if (ons$$1.platform.isAndroid()) {
        // In Android4.4+, correct viewport settings can remove click delay.
        // So disable FastClick on Android.
        ons$$1.fastClick.destroy();
      } else if (ons$$1.platform.isIOS()) {
        if (supportTouchAction && (ons$$1.platform.isIOSSafari() || ons$$1.platform.isWKWebView())) {
          // If 'touch-action' supported in iOS Safari or WKWebView, disable FastClick.
          ons$$1.fastClick.destroy();
        } else {
          // Do nothing. 'touch-action: manipulation' has no effect on UIWebView.
        }
      }
    });
  }, false);

  ons$$1.ready(function () {
    ons$$1.enableDeviceBackButtonHandler();
    ons$$1._defaultDeviceBackButtonHandler = ons$$1._internal.dbbDispatcher.createHandler(window.document.body, function () {
      if (Object.hasOwnProperty.call(navigator, 'app')) {
        navigator.app.exitApp();
      } else {
        console.warn('Could not close the app. Is \'cordova.js\' included?\nError: \'window.navigator.app\' is undefined.');
      }
    });
    document.body._gestureDetector = new ons$$1.GestureDetector(document.body, { passive: true });

    // Simulate Device Back Button on ESC press
    if (!ons$$1.platform.isWebView()) {
      document.body.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
          ons$$1.fireDeviceBackButtonEvent();
        }
      });
    }

    // setup loading placeholder
    ons$$1._setupLoadingPlaceHolders();
  });

  // viewport.js
  Viewport.setup();
}

setup(ons); // Setup initial listeners

export default ons;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyIsIi4uLy4uL2NvcmUvc3JjL3BvbHlmaWxscy9wb2x5ZmlsbC1zd2l0Y2hlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZnVuY3Rpb24tdG8tc3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWV0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3ZhbGlkYXRlLWNvbGxlY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC5vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1jb2xsZWN0aW9uLWZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQuZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3NldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWFwLm9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWFwLmZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9mbi9tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LndlYWstbWFwLm9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcud2Vhay1tYXAuZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3dlYWstbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9VdGlsaXRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9DdXN0b21FbGVtZW50U3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvRG9jdW1lbnRDb25zdHJ1Y3Rpb25PYnNlcnZlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL0RlZmVycmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvUGF0Y2gvTmF0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvQWxyZWFkeUNvbnN0cnVjdGVkTWFya2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvUGF0Y2gvSFRNTEVsZW1lbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9QYXRjaC9JbnRlcmZhY2UvUGFyZW50Tm9kZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL1BhdGNoL0RvY3VtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvUGF0Y2gvTm9kZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL1BhdGNoL0ludGVyZmFjZS9DaGlsZE5vZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9QYXRjaC9FbGVtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvY3VzdG9tLWVsZW1lbnRzLmpzIiwiLi4vLi4vY29yZS9zcmMvcG9seWZpbGxzL011dGF0aW9uT2JzZXJ2ZXJAMC43LjIyL011dGF0aW9uT2JzZXJ2ZXIuanMiLCIuLi8uLi9jb3JlL3NyYy9wb2x5ZmlsbHMvc2V0SW1tZWRpYXRlQDEuMC4yK21vZC9zZXRJbW1lZGlhdGUuanMiLCIuLi8uLi9jb3JlL3NyYy9wb2x5ZmlsbHMvaW5kZXguanMiLCIuLi8uLi9jb3JlL3NyYy92ZW5kb3Ivdmlld3BvcnQuanMiLCIuLi8uLi9jb3JlL3NyYy9zZXR1cC5qcyIsIi4uLy4uL2NvcmUvc3JjL2luZGV4LmVzbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAcHJlc2VydmUgRmFzdENsaWNrOiBwb2x5ZmlsbCB0byByZW1vdmUgY2xpY2sgZGVsYXlzIG9uIGJyb3dzZXJzIHdpdGggdG91Y2ggVUlzLlxuXHQgKlxuXHQgKiBAY29kaW5nc3RhbmRhcmQgZnRsYWJzLWpzdjJcblx0ICogQGNvcHlyaWdodCBUaGUgRmluYW5jaWFsIFRpbWVzIExpbWl0ZWQgW0FsbCBSaWdodHMgUmVzZXJ2ZWRdXG5cdCAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChzZWUgTElDRU5TRS50eHQpXG5cdCAqL1xuXG5cdC8qanNsaW50IGJyb3dzZXI6dHJ1ZSwgbm9kZTp0cnVlKi9cblx0LypnbG9iYWwgZGVmaW5lLCBFdmVudCwgTm9kZSovXG5cblxuXHQvKipcblx0ICogSW5zdGFudGlhdGUgZmFzdC1jbGlja2luZyBsaXN0ZW5lcnMgb24gdGhlIHNwZWNpZmllZCBsYXllci5cblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0ZnVuY3Rpb24gRmFzdENsaWNrKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0dmFyIG9sZE9uQ2xpY2s7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8qKlxuXHRcdCAqIFdoZXRoZXIgYSBjbGljayBpcyBjdXJyZW50bHkgYmVpbmcgdHJhY2tlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIGJvb2xlYW5cblx0XHQgKi9cblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGltZXN0YW1wIGZvciB3aGVuIGNsaWNrIHRyYWNraW5nIHN0YXJ0ZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBlbGVtZW50IGJlaW5nIHRyYWNrZWQgZm9yIGEgY2xpY2suXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFdmVudFRhcmdldFxuXHRcdCAqL1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFgtY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFggPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBZLWNvb3JkaW5hdGUgb2YgdG91Y2ggc3RhcnQgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoU3RhcnRZID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogSUQgb2YgdGhlIGxhc3QgdG91Y2gsIHJldHJpZXZlZCBmcm9tIFRvdWNoLmlkZW50aWZpZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUb3VjaG1vdmUgYm91bmRhcnksIGJleW9uZCB3aGljaCBhIGNsaWNrIHdpbGwgYmUgY2FuY2VsbGVkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaEJvdW5kYXJ5ID0gb3B0aW9ucy50b3VjaEJvdW5kYXJ5IHx8IDEwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgRmFzdENsaWNrIGxheWVyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgRWxlbWVudFxuXHRcdCAqL1xuXHRcdHRoaXMubGF5ZXIgPSBsYXllcjtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBtaW5pbXVtIHRpbWUgYmV0d2VlbiB0YXAodG91Y2hzdGFydCBhbmQgdG91Y2hlbmQpIGV2ZW50c1xuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBEZWxheSA9IG9wdGlvbnMudGFwRGVsYXkgfHwgMjAwO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1heGltdW0gdGltZSBmb3IgYSB0YXBcblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudGFwVGltZW91dCA9IG9wdGlvbnMudGFwVGltZW91dCB8fCA3MDA7XG5cblx0XHRpZiAoRmFzdENsaWNrLm5vdE5lZWRlZChsYXllcikpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBBbmRyb2lkIGRvbid0IGhhdmUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcblx0XHRmdW5jdGlvbiBiaW5kKG1ldGhvZCwgY29udGV4dCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gbWV0aG9kLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7IH07XG5cdFx0fVxuXG5cblx0XHR2YXIgbWV0aG9kcyA9IFsnb25Nb3VzZScsICdvbkNsaWNrJywgJ29uVG91Y2hTdGFydCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoRW5kJywgJ29uVG91Y2hDYW5jZWwnXTtcblx0XHR2YXIgY29udGV4dCA9IHRoaXM7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBtZXRob2RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0Y29udGV4dFttZXRob2RzW2ldXSA9IGJpbmQoY29udGV4dFttZXRob2RzW2ldXSwgY29udGV4dCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHVwIGV2ZW50IGhhbmRsZXJzIGFzIHJlcXVpcmVkXG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHR9XG5cblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgdHJ1ZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLm9uVG91Y2hDYW5jZWwsIGZhbHNlKTtcblxuXHRcdC8vIEhhY2sgaXMgcmVxdWlyZWQgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdC8vIHdoaWNoIGlzIGhvdyBGYXN0Q2xpY2sgbm9ybWFsbHkgc3RvcHMgY2xpY2sgZXZlbnRzIGJ1YmJsaW5nIHRvIGNhbGxiYWNrcyByZWdpc3RlcmVkIG9uIHRoZSBGYXN0Q2xpY2tcblx0XHQvLyBsYXllciB3aGVuIHRoZXkgYXJlIGNhbmNlbGxlZC5cblx0XHRpZiAoIUV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdFx0XHR2YXIgcm12ID0gTm9kZS5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRybXYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2suaGlqYWNrZWQgfHwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdFx0XHR2YXIgYWR2ID0gTm9kZS5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2suaGlqYWNrZWQgfHwgKGNhbGxiYWNrLmhpamFja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmICghZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKGV2ZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSwgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWR2LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBJZiBhIGhhbmRsZXIgaXMgYWxyZWFkeSBkZWNsYXJlZCBpbiB0aGUgZWxlbWVudCdzIG9uY2xpY2sgYXR0cmlidXRlLCBpdCB3aWxsIGJlIGZpcmVkIGJlZm9yZVxuXHRcdC8vIEZhc3RDbGljaydzIG9uQ2xpY2sgaGFuZGxlci4gRml4IHRoaXMgYnkgcHVsbGluZyBvdXQgdGhlIHVzZXItZGVmaW5lZCBoYW5kbGVyIGZ1bmN0aW9uIGFuZFxuXHRcdC8vIGFkZGluZyBpdCBhcyBsaXN0ZW5lci5cblx0XHRpZiAodHlwZW9mIGxheWVyLm9uY2xpY2sgPT09ICdmdW5jdGlvbicpIHtcblxuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIG9uIGF0IGxlYXN0IDMuMiByZXF1aXJlcyBhIG5ldyByZWZlcmVuY2UgdG8gdGhlIGZ1bmN0aW9uIGluIGxheWVyLm9uY2xpY2tcblx0XHRcdC8vIC0gdGhlIG9sZCBvbmUgd29uJ3Qgd29yayBpZiBwYXNzZWQgdG8gYWRkRXZlbnRMaXN0ZW5lciBkaXJlY3RseS5cblx0XHRcdG9sZE9uQ2xpY2sgPSBsYXllci5vbmNsaWNrO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRvbGRPbkNsaWNrKGV2ZW50KTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdGxheWVyLm9uY2xpY2sgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIFdpbmRvd3MgUGhvbmUgOC4xIGZha2VzIHVzZXIgYWdlbnQgc3RyaW5nIHRvIGxvb2sgbGlrZSBBbmRyb2lkIGFuZCBpUGhvbmUuXG5cdCpcblx0KiBAdHlwZSBib29sZWFuXG5cdCovXG5cdHZhciBkZXZpY2VJc1dpbmRvd3NQaG9uZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIldpbmRvd3MgUGhvbmVcIikgPj0gMDtcblxuXHQvKipcblx0ICogQW5kcm9pZCByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNBbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdBbmRyb2lkJykgPiAwICYmICFkZXZpY2VJc1dpbmRvd3NQaG9uZTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TID0gL2lQKGFkfGhvbmV8b2QpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICFkZXZpY2VJc1dpbmRvd3NQaG9uZTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgNCByZXF1aXJlcyBhbiBleGNlcHRpb24gZm9yIHNlbGVjdCBlbGVtZW50cy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TNCA9IGRldmljZUlzSU9TICYmICgvT1MgNF9cXGQoX1xcZCk/LykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgNi4wLTcuKiByZXF1aXJlcyB0aGUgdGFyZ2V0IGVsZW1lbnQgdG8gYmUgbWFudWFsbHkgZGVyaXZlZFxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyBbNi03XV9cXGQvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cdC8qKlxuXHQgKiBCbGFja0JlcnJ5IHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0JsYWNrQmVycnkxMCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQkIxMCcpID4gMDtcblxuXHQvKipcblx0ICogVmFsaWQgdHlwZXMgZm9yIHRleHQgaW5wdXRzXG5cdCAqXG5cdCAqIEB0eXBlIGFycmF5XG5cdCAqL1xuXHR2YXIgdGV4dEZpZWxkcyA9IFsnZW1haWwnLCAnbnVtYmVyJywgJ3Bhc3N3b3JkJywgJ3NlYXJjaCcsICd0ZWwnLCAndGV4dCcsICd1cmwnXTtcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgbmF0aXZlIGNsaWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldCBUYXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBuZWVkcyBhIG5hdGl2ZSBjbGlja1xuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5uZWVkc0NsaWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cdFx0c3dpdGNoICh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2VuZCBhIHN5bnRoZXRpYyBjbGljayB0byBkaXNhYmxlZCBpbnB1dHMgKGlzc3VlICM2Milcblx0XHRjYXNlICdidXR0b24nOlxuXHRcdGNhc2UgJ3NlbGVjdCc6XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0aWYgKHRhcmdldC5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnaW5wdXQnOlxuXG5cdFx0XHQvLyBGaWxlIGlucHV0cyBuZWVkIHJlYWwgY2xpY2tzIG9uIGlPUyA2IGR1ZSB0byBhIGJyb3dzZXIgYnVnIChpc3N1ZSAjNjgpXG5cdFx0XHRpZiAoKGRldmljZUlzSU9TICYmIHRhcmdldC50eXBlID09PSAnZmlsZScpIHx8IHRhcmdldC5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnbGFiZWwnOlxuXHRcdGNhc2UgJ2lmcmFtZSc6IC8vIGlPUzggaG9tZXNjcmVlbiBhcHBzIGNhbiBwcmV2ZW50IGV2ZW50cyBidWJibGluZyBpbnRvIGZyYW1lc1xuXHRcdGNhc2UgJ3ZpZGVvJzpcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiAoL1xcYm5lZWRzY2xpY2tcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gZWxlbWVudCByZXF1aXJlcyBhIGNhbGwgdG8gZm9jdXMgdG8gc2ltdWxhdGUgY2xpY2sgaW50byBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldCBUYXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCByZXF1aXJlcyBhIGNhbGwgdG8gZm9jdXMgdG8gc2ltdWxhdGUgbmF0aXZlIGNsaWNrLlxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5uZWVkc0ZvY3VzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cdFx0c3dpdGNoICh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdGNhc2UgJ3RleHRhcmVhJzpcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGNhc2UgJ3NlbGVjdCc6XG5cdFx0XHRyZXR1cm4gIWRldmljZUlzQW5kcm9pZDtcblx0XHRjYXNlICdpbnB1dCc6XG5cdFx0XHRzd2l0Y2ggKHRhcmdldC50eXBlKSB7XG5cdFx0XHRjYXNlICdidXR0b24nOlxuXHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0Y2FzZSAnZmlsZSc6XG5cdFx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRjYXNlICdzdWJtaXQnOlxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5vIHBvaW50IGluIGF0dGVtcHRpbmcgdG8gZm9jdXMgZGlzYWJsZWQgaW5wdXRzXG5cdFx0XHRyZXR1cm4gIXRhcmdldC5kaXNhYmxlZCAmJiAhdGFyZ2V0LnJlYWRPbmx5O1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gKC9cXGJuZWVkc2ZvY3VzXFxiLykudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogU2VuZCBhIGNsaWNrIGV2ZW50IHRvIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnNlbmRDbGljayA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQsIGV2ZW50KSB7XG5cdFx0dmFyIGNsaWNrRXZlbnQsIHRvdWNoO1xuXG5cdFx0Ly8gT24gc29tZSBBbmRyb2lkIGRldmljZXMgYWN0aXZlRWxlbWVudCBuZWVkcyB0byBiZSBibHVycmVkIG90aGVyd2lzZSB0aGUgc3ludGhldGljIGNsaWNrIHdpbGwgaGF2ZSBubyBlZmZlY3QgKCMyNClcblx0XHRpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcblx0XHR9XG5cblx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0Ly8gU3ludGhlc2lzZSBhIGNsaWNrIGV2ZW50LCB3aXRoIGFuIGV4dHJhIGF0dHJpYnV0ZSBzbyBpdCBjYW4gYmUgdHJhY2tlZFxuXHRcdGNsaWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcblx0XHRjbGlja0V2ZW50LmluaXRNb3VzZUV2ZW50KHRoaXMuZGV0ZXJtaW5lRXZlbnRUeXBlKHRhcmdldEVsZW1lbnQpLCB0cnVlLCB0cnVlLCB3aW5kb3csIDEsIHRvdWNoLnNjcmVlblgsIHRvdWNoLnNjcmVlblksIHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcblx0XHRjbGlja0V2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQgPSB0cnVlO1xuXHRcdHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcblx0fTtcblxuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmRldGVybWluZUV2ZW50VHlwZSA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblxuXHRcdC8vSXNzdWUgIzE1OTogQW5kcm9pZCBDaHJvbWUgU2VsZWN0IEJveCBkb2VzIG5vdCBvcGVuIHdpdGggYSBzeW50aGV0aWMgY2xpY2sgZXZlbnRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkICYmIHRhcmdldEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuXHRcdFx0cmV0dXJuICdtb3VzZWRvd24nO1xuXHRcdH1cblxuXHRcdHJldHVybiAnY2xpY2snO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgbGVuZ3RoO1xuXG5cdFx0Ly8gSXNzdWUgIzE2MDogb24gaU9TIDcsIHNvbWUgaW5wdXQgZWxlbWVudHMgKGUuZy4gZGF0ZSBkYXRldGltZSBtb250aCkgdGhyb3cgYSB2YWd1ZSBUeXBlRXJyb3Igb24gc2V0U2VsZWN0aW9uUmFuZ2UuIFRoZXNlIGVsZW1lbnRzIGRvbid0IGhhdmUgYW4gaW50ZWdlciB2YWx1ZSBmb3IgdGhlIHNlbGVjdGlvblN0YXJ0IGFuZCBzZWxlY3Rpb25FbmQgcHJvcGVydGllcywgYnV0IHVuZm9ydHVuYXRlbHkgdGhhdCBjYW4ndCBiZSB1c2VkIGZvciBkZXRlY3Rpb24gYmVjYXVzZSBhY2Nlc3NpbmcgdGhlIHByb3BlcnRpZXMgYWxzbyB0aHJvd3MgYSBUeXBlRXJyb3IuIEp1c3QgY2hlY2sgdGhlIHR5cGUgaW5zdGVhZC4gRmlsZWQgYXMgQXBwbGUgYnVnICMxNTEyMjcyNC5cblx0XHRpZiAoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0YXJnZXRFbGVtZW50LnR5cGUuaW5kZXhPZignZGF0ZScpICE9PSAwICYmIHRhcmdldEVsZW1lbnQudHlwZSAhPT0gJ3RpbWUnICYmIHRhcmdldEVsZW1lbnQudHlwZSAhPT0gJ21vbnRoJyAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICdlbWFpbCcgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAnbnVtYmVyJykge1xuXHRcdFx0bGVuZ3RoID0gdGFyZ2V0RWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cdFx0XHR0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGxlbmd0aCwgbGVuZ3RoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mb2N1cygpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciBhbmQgaWYgc28sIHNldCBhIGZsYWcgb24gaXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS51cGRhdGVTY3JvbGxQYXJlbnQgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cdFx0dmFyIHNjcm9sbFBhcmVudCwgcGFyZW50RWxlbWVudDtcblxuXHRcdHNjcm9sbFBhcmVudCA9IHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXG5cdFx0Ly8gQXR0ZW1wdCB0byBkaXNjb3ZlciB3aGV0aGVyIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBjb250YWluZWQgd2l0aGluIGEgc2Nyb2xsYWJsZSBsYXllci4gUmUtY2hlY2sgaWYgdGhlXG5cdFx0Ly8gdGFyZ2V0IGVsZW1lbnQgd2FzIG1vdmVkIHRvIGFub3RoZXIgcGFyZW50LlxuXHRcdGlmICghc2Nyb2xsUGFyZW50IHx8ICFzY3JvbGxQYXJlbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCkpIHtcblx0XHRcdHBhcmVudEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocGFyZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuXHRcdFx0XHRcdHNjcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSBwYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH0gd2hpbGUgKHBhcmVudEVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdC8vIEFsd2F5cyB1cGRhdGUgdGhlIHNjcm9sbCB0b3AgdHJhY2tlciBpZiBwb3NzaWJsZS5cblx0XHRpZiAoc2Nyb2xsUGFyZW50KSB7XG5cdFx0XHRzY3JvbGxQYXJlbnQuZmFzdENsaWNrTGFzdFNjcm9sbFRvcCA9IHNjcm9sbFBhcmVudC5zY3JvbGxUb3A7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldEVsZW1lbnRcblx0ICogQHJldHVybnMge0VsZW1lbnR8RXZlbnRUYXJnZXR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQgPSBmdW5jdGlvbihldmVudFRhcmdldCkge1xuXG5cdFx0Ly8gT24gc29tZSBvbGRlciBicm93c2VycyAobm90YWJseSBTYWZhcmkgb24gaU9TIDQuMSAtIHNlZSBpc3N1ZSAjNTYpIHRoZSBldmVudCB0YXJnZXQgbWF5IGJlIGEgdGV4dCBub2RlLlxuXHRcdGlmIChldmVudFRhcmdldC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdHJldHVybiBldmVudFRhcmdldC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudFRhcmdldDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5pc1RleHRGaWVsZCA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYSdcblx0XHRcdHx8IHRleHRGaWVsZHMuaW5kZXhPZih0YXJnZXRFbGVtZW50LnR5cGUpICE9PSAtMVxuXHRcdCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIHN0YXJ0LCByZWNvcmQgdGhlIHBvc2l0aW9uIGFuZCBzY3JvbGwgb2Zmc2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdGFyZ2V0RWxlbWVudCwgdG91Y2gsIHNlbGVjdGlvbjtcblxuXHRcdC8vIElnbm9yZSBtdWx0aXBsZSB0b3VjaGVzLCBvdGhlcndpc2UgcGluY2gtdG8tem9vbSBpcyBwcmV2ZW50ZWQgaWYgYm90aCBmaW5nZXJzIGFyZSBvbiB0aGUgRmFzdENsaWNrIGVsZW1lbnQgKGlzc3VlICMxMTEpLlxuXHRcdGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldEVsZW1lbnQgPSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG5cblx0XHQvLyBJZ25vcmUgdG91Y2hlcyBvbiBjb250ZW50ZWRpdGFibGUgZWxlbWVudHMgdG8gcHJldmVudCBjb25mbGljdCB3aXRoIHRleHQgc2VsZWN0aW9uLlxuXHRcdC8vIChGb3IgZGV0YWlsczogaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2svcHVsbC8yMTEgKVxuXHRcdGlmICh0YXJnZXRFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MpIHtcblx0XHRcdC8vIElnbm9yZSB0b3VjaHN0YXJ0IGluIGZvY3VzZWQgdGV4dCBmaWVsZFxuXHRcdFx0Ly8gQWxsb3dzIG5vcm1hbCB0ZXh0IHNlbGVjdGlvbiBhbmQgY29tbWFuZHMgKHNlbGVjdC9wYXN0ZS9jdXQpIHdoZW4gYSBmaWVsZCBoYXMgZm9jdXMsIHdoaWxlIHN0aWxsIGFsbG93aW5nIGZhc3QgdGFwLXRvLWZvY3VzLlxuXHRcdFx0Ly8gV2l0aG91dCB0aGlzIGZpeCwgdXNlciBuZWVkcyB0byB0YXAtYW5kLWhvbGQgYSB0ZXh0IGZpZWxkIGZvciBjb250ZXh0IG1lbnUsIGFuZCBkb3VibGUtdGFwIHRvIHNlbGVjdCB0ZXh0IGRvZXNuJ3Qgd29yayBhdCBhbGwuXG5cdFx0XHRpZiAodGFyZ2V0RWxlbWVudCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB0aGlzLmlzVGV4dEZpZWxkKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHQgIHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHRcdC8vIFdlaXJkIHRoaW5ncyBoYXBwZW4gb24gaU9TIHdoZW4gYW4gYWxlcnQgb3IgY29uZmlybSBkaWFsb2cgaXMgb3BlbmVkIGZyb20gYSBjbGljayBldmVudCBjYWxsYmFjayAoaXNzdWUgIzIzKTpcblx0XHRcdFx0Ly8gd2hlbiB0aGUgdXNlciBuZXh0IHRhcHMgYW55d2hlcmUgZWxzZSBvbiB0aGUgcGFnZSwgbmV3IHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kIGV2ZW50cyBhcmUgZGlzcGF0Y2hlZFxuXHRcdFx0XHQvLyB3aXRoIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgdGhlIHRvdWNoIGV2ZW50IHRoYXQgcHJldmlvdXNseSB0cmlnZ2VyZWQgdGhlIGNsaWNrIHRoYXQgdHJpZ2dlcmVkIHRoZSBhbGVydC5cblx0XHRcdFx0Ly8gU2FkbHksIHRoZXJlIGlzIGFuIGlzc3VlIG9uIGlPUyA0IHRoYXQgY2F1c2VzIHNvbWUgbm9ybWFsIHRvdWNoIGV2ZW50cyB0byBoYXZlIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgYW5cblx0XHRcdFx0Ly8gaW1tZWRpYXRlbHkgcHJlY2VlZGluZyB0b3VjaCBldmVudCAoaXNzdWUgIzUyKSwgc28gdGhpcyBmaXggaXMgdW5hdmFpbGFibGUgb24gdGhhdCBwbGF0Zm9ybS5cblx0XHRcdFx0Ly8gSXNzdWUgMTIwOiB0b3VjaC5pZGVudGlmaWVyIGlzIDAgd2hlbiBDaHJvbWUgZGV2IHRvb2xzICdFbXVsYXRlIHRvdWNoIGV2ZW50cycgaXMgc2V0IHdpdGggYW4gaU9TIGRldmljZSBVQSBzdHJpbmcsXG5cdFx0XHRcdC8vIHdoaWNoIGNhdXNlcyBhbGwgdG91Y2ggZXZlbnRzIHRvIGJlIGlnbm9yZWQuIEFzIHRoaXMgYmxvY2sgb25seSBhcHBsaWVzIHRvIGlPUywgYW5kIGlPUyBpZGVudGlmaWVycyBhcmUgYWx3YXlzIGxvbmcsXG5cdFx0XHRcdC8vIHJhbmRvbSBpbnRlZ2VycywgaXQncyBzYWZlIHRvIHRvIGNvbnRpbnVlIGlmIHRoZSBpZGVudGlmaWVyIGlzIDAgaGVyZS5cblx0XHRcdFx0aWYgKHRvdWNoLmlkZW50aWZpZXIgJiYgdG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG5cdFx0XHRcdC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciAodXNpbmcgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoKSBhbmQ6XG5cdFx0XHRcdC8vIDEpIHRoZSB1c2VyIGRvZXMgYSBmbGluZyBzY3JvbGwgb24gdGhlIHNjcm9sbGFibGUgbGF5ZXJcblx0XHRcdFx0Ly8gMikgdGhlIHVzZXIgc3RvcHMgdGhlIGZsaW5nIHNjcm9sbCB3aXRoIGFub3RoZXIgdGFwXG5cdFx0XHRcdC8vIHRoZW4gdGhlIGV2ZW50LnRhcmdldCBvZiB0aGUgbGFzdCAndG91Y2hlbmQnIGV2ZW50IHdpbGwgYmUgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdW5kZXIgdGhlIHVzZXIncyBmaW5nZXJcblx0XHRcdFx0Ly8gd2hlbiB0aGUgZmxpbmcgc2Nyb2xsIHdhcyBzdGFydGVkLCBjYXVzaW5nIEZhc3RDbGljayB0byBzZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhhdCBsYXllciAtIHVubGVzcyBhIGNoZWNrXG5cdFx0XHRcdC8vIGlzIG1hZGUgdG8gZW5zdXJlIHRoYXQgYSBwYXJlbnQgbGF5ZXIgd2FzIG5vdCBzY3JvbGxlZCBiZWZvcmUgc2VuZGluZyBhIHN5bnRoZXRpYyBjbGljayAoaXNzdWUgIzQyKS5cblx0XHRcdFx0dGhpcy51cGRhdGVTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gdHJ1ZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IGV2ZW50LnRpbWVTdGFtcDtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSB0b3VjaC5wYWdlWTtcblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSAmJiAoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA+IC0xKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGEgdG91Y2htb3ZlIGV2ZW50IG9iamVjdCwgY2hlY2sgd2hldGhlciB0aGUgdG91Y2ggaGFzIG1vdmVkIHBhc3QgYSBib3VuZGFyeSBzaW5jZSBpdCBzdGFydGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudG91Y2hIYXNNb3ZlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0sIGJvdW5kYXJ5ID0gdGhpcy50b3VjaEJvdW5kYXJ5O1xuXG5cdFx0aWYgKE1hdGguYWJzKHRvdWNoLnBhZ2VYIC0gdGhpcy50b3VjaFN0YXJ0WCkgPiBib3VuZGFyeSB8fCBNYXRoLmFicyh0b3VjaC5wYWdlWSAtIHRoaXMudG91Y2hTdGFydFkpID4gYm91bmRhcnkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGxhc3QgcG9zaXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSB0b3VjaCBoYXMgbW92ZWQsIGNhbmNlbCB0aGUgY2xpY2sgdHJhY2tpbmdcblx0XHRpZiAodGhpcy50YXJnZXRFbGVtZW50ICE9PSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLnRvdWNoSGFzTW92ZWQoZXZlbnQpKSB7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQXR0ZW1wdCB0byBmaW5kIHRoZSBsYWJlbGxlZCBjb250cm9sIGZvciB0aGUgZ2l2ZW4gbGFiZWwgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxIVE1MTGFiZWxFbGVtZW50fSBsYWJlbEVsZW1lbnRcblx0ICogQHJldHVybnMge0VsZW1lbnR8bnVsbH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZmluZENvbnRyb2wgPSBmdW5jdGlvbihsYWJlbEVsZW1lbnQpIHtcblxuXHRcdC8vIEZhc3QgcGF0aCBmb3IgbmV3ZXIgYnJvd3NlcnMgc3VwcG9ydGluZyB0aGUgSFRNTDUgY29udHJvbCBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50LmNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5jb250cm9sO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBicm93c2VycyB1bmRlciB0ZXN0IHRoYXQgc3VwcG9ydCB0b3VjaCBldmVudHMgYWxzbyBzdXBwb3J0IHRoZSBIVE1MNSBodG1sRm9yIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuaHRtbEZvcikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxhYmVsRWxlbWVudC5odG1sRm9yKTtcblx0XHR9XG5cblx0XHQvLyBJZiBubyBmb3IgYXR0cmlidXRlIGV4aXN0cywgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgZmlyc3QgbGFiZWxsYWJsZSBkZXNjZW5kYW50IGVsZW1lbnRcblx0XHQvLyB0aGUgbGlzdCBvZiB3aGljaCBpcyBkZWZpbmVkIGhlcmU6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjY2F0ZWdvcnktbGFiZWxcblx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiwgaW5wdXQ6bm90KFt0eXBlPWhpZGRlbl0pLCBrZXlnZW4sIG1ldGVyLCBvdXRwdXQsIHByb2dyZXNzLCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggZW5kLCBkZXRlcm1pbmUgd2hldGhlciB0byBzZW5kIGEgY2xpY2sgZXZlbnQgYXQgb25jZS5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hFbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBmb3JFbGVtZW50LCB0cmFja2luZ0NsaWNrU3RhcnQsIHRhcmdldFRhZ05hbWUsIHNjcm9sbFBhcmVudCwgdG91Y2gsIHRhcmdldEVsZW1lbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQ7XG5cblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCBwaGFudG9tIGNsaWNrcyBvbiBmYXN0IGRvdWJsZS10YXAgKGlzc3VlICMzNilcblx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRoaXMubGFzdENsaWNrVGltZSkgPCB0aGlzLnRhcERlbGF5ICYmIChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpID4gLTEpIHtcblx0XHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQpID4gdGhpcy50YXBUaW1lb3V0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCB0byBwcmV2ZW50IHdyb25nIGNsaWNrIGNhbmNlbCBvbiBpbnB1dCAoaXNzdWUgIzE1NikuXG5cdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSBmYWxzZTtcblxuXHRcdHRoaXMubGFzdENsaWNrVGltZSA9IGV2ZW50LnRpbWVTdGFtcDtcblxuXHRcdHRyYWNraW5nQ2xpY2tTdGFydCA9IHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0O1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXHRcdC8vIE9uIHNvbWUgaU9TIGRldmljZXMsIHRoZSB0YXJnZXRFbGVtZW50IHN1cHBsaWVkIHdpdGggdGhlIGV2ZW50IGlzIGludmFsaWQgaWYgdGhlIGxheWVyXG5cdFx0Ly8gaXMgcGVyZm9ybWluZyBhIHRyYW5zaXRpb24gb3Igc2Nyb2xsLCBhbmQgaGFzIHRvIGJlIHJlLWRldGVjdGVkIG1hbnVhbGx5LiBOb3RlIHRoYXRcblx0XHQvLyBmb3IgdGhpcyB0byBmdW5jdGlvbiBjb3JyZWN0bHksIGl0IG11c3QgYmUgY2FsbGVkICphZnRlciogdGhlIGV2ZW50IHRhcmdldCBpcyBjaGVja2VkIVxuXHRcdC8vIFNlZSBpc3N1ZSAjNTc7IGFsc28gZmlsZWQgYXMgcmRhcjovLzEzMDQ4NTg5IC5cblx0XHRpZiAoZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0KSB7XG5cdFx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHQvLyBJbiBjZXJ0YWluIGNhc2VzIGFyZ3VtZW50cyBvZiBlbGVtZW50RnJvbVBvaW50IGNhbiBiZSBuZWdhdGl2ZSwgc28gcHJldmVudCBzZXR0aW5nIHRhcmdldEVsZW1lbnQgdG8gbnVsbFxuXHRcdFx0dGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KSB8fCB0YXJnZXRFbGVtZW50O1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdH1cblxuXHRcdHRhcmdldFRhZ05hbWUgPSB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodGFyZ2V0VGFnTmFtZSA9PT0gJ2xhYmVsJykge1xuXHRcdFx0Zm9yRWxlbWVudCA9IHRoaXMuZmluZENvbnRyb2wodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRpZiAoZm9yRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFyZ2V0RWxlbWVudCA9IGZvckVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLm5lZWRzRm9jdXModGFyZ2V0RWxlbWVudCkpIHtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBJZiB0aGUgdG91Y2ggc3RhcnRlZCBhIHdoaWxlIGFnbyAoYmVzdCBndWVzcyBpcyAxMDBtcyBiYXNlZCBvbiB0ZXN0cyBmb3IgaXNzdWUgIzM2KSB0aGVuIGZvY3VzIHdpbGwgYmUgdHJpZ2dlcmVkIGFueXdheS4gUmV0dXJuIGVhcmx5IGFuZCB1bnNldCB0aGUgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBiZSBhbGxvd2VkIHRocm91Z2guXG5cdFx0XHQvLyBDYXNlIDI6IFdpdGhvdXQgdGhpcyBleGNlcHRpb24gZm9yIGlucHV0IGVsZW1lbnRzIHRhcHBlZCB3aGVuIHRoZSBkb2N1bWVudCBpcyBjb250YWluZWQgaW4gYW4gaWZyYW1lLCB0aGVuIGFueSBpbnB1dHRlZCB0ZXh0IHdvbid0IGJlIHZpc2libGUgZXZlbiB0aG91Z2ggdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB1cGRhdGVkIGFzIHRoZSB1c2VyIHR5cGVzIChpc3N1ZSAjMzcpLlxuXHRcdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0cmFja2luZ0NsaWNrU3RhcnQpID4gMTAwIHx8IChkZXZpY2VJc0lPUyAmJiB3aW5kb3cudG9wICE9PSB3aW5kb3cgJiYgdGFyZ2V0VGFnTmFtZSA9PT0gJ2lucHV0JykpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXG5cdFx0XHQvLyBTZWxlY3QgZWxlbWVudHMgbmVlZCB0aGUgZXZlbnQgdG8gZ28gdGhyb3VnaCBvbiBpT1MgNCwgb3RoZXJ3aXNlIHRoZSBzZWxlY3RvciBtZW51IHdvbid0IG9wZW4uXG5cdFx0XHQvLyBBbHNvIHRoaXMgYnJlYWtzIG9wZW5pbmcgc2VsZWN0cyB3aGVuIFZvaWNlT3ZlciBpcyBhY3RpdmUgb24gaU9TNiwgaU9TNyAoYW5kIHBvc3NpYmx5IG90aGVycylcblx0XHRcdGlmICghZGV2aWNlSXNJT1M0IHx8IHRhcmdldFRhZ05hbWUgIT09ICdzZWxlY3QnKSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MgJiYgIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIGV2ZW50IGlmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBjb250YWluZWQgd2l0aGluIGEgcGFyZW50IGxheWVyIHRoYXQgd2FzIHNjcm9sbGVkXG5cdFx0XHQvLyBhbmQgdGhpcyB0YXAgaXMgYmVpbmcgdXNlZCB0byBzdG9wIHRoZSBzY3JvbGxpbmcgKHVzdWFsbHkgaW5pdGlhdGVkIGJ5IGEgZmxpbmcgLSBpc3N1ZSAjNDIpLlxuXHRcdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cdFx0XHRpZiAoc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wICE9PSBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgdGhlIGFjdHVhbCBjbGljayBmcm9tIGdvaW5nIHRob3VnaCAtIHVubGVzcyB0aGUgdGFyZ2V0IG5vZGUgaXMgbWFya2VkIGFzIHJlcXVpcmluZ1xuXHRcdC8vIHJlYWwgY2xpY2tzIG9yIGlmIGl0IGlzIGluIHRoZSB3aGl0ZWxpc3QgaW4gd2hpY2ggY2FzZSBvbmx5IG5vbi1wcm9ncmFtbWF0aWMgY2xpY2tzIGFyZSBwZXJtaXR0ZWQuXG5cdFx0aWYgKCF0aGlzLm5lZWRzQ2xpY2sodGFyZ2V0RWxlbWVudCkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnNlbmRDbGljayh0YXJnZXRFbGVtZW50LCBldmVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIGNhbmNlbCwgc3RvcCB0cmFja2luZyB0aGUgY2xpY2suXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoQ2FuY2VsID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgbW91c2UgZXZlbnRzIHdoaWNoIHNob3VsZCBiZSBwZXJtaXR0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vbk1vdXNlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdC8vIElmIGEgdGFyZ2V0IGVsZW1lbnQgd2FzIG5ldmVyIHNldCAoYmVjYXVzZSBhIHRvdWNoIGV2ZW50IHdhcyBuZXZlciBmaXJlZCkgYWxsb3cgdGhlIGV2ZW50XG5cdFx0aWYgKCF0aGlzLnRhcmdldEVsZW1lbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChldmVudC5mb3J3YXJkZWRUb3VjaEV2ZW50KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBQcm9ncmFtbWF0aWNhbGx5IGdlbmVyYXRlZCBldmVudHMgdGFyZ2V0aW5nIGEgc3BlY2lmaWMgZWxlbWVudCBzaG91bGQgYmUgcGVybWl0dGVkXG5cdFx0aWYgKCFldmVudC5jYW5jZWxhYmxlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBEZXJpdmUgYW5kIGNoZWNrIHRoZSB0YXJnZXQgZWxlbWVudCB0byBzZWUgd2hldGhlciB0aGUgbW91c2UgZXZlbnQgbmVlZHMgdG8gYmUgcGVybWl0dGVkO1xuXHRcdC8vIHVubGVzcyBleHBsaWNpdGx5IGVuYWJsZWQsIHByZXZlbnQgbm9uLXRvdWNoIGNsaWNrIGV2ZW50cyBmcm9tIHRyaWdnZXJpbmcgYWN0aW9ucyxcblx0XHQvLyB0byBwcmV2ZW50IGdob3N0L2RvdWJsZWNsaWNrcy5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0aGlzLnRhcmdldEVsZW1lbnQpIHx8IHRoaXMuY2FuY2VsTmV4dENsaWNrKSB7XG5cblx0XHRcdC8vIFByZXZlbnQgYW55IHVzZXItYWRkZWQgbGlzdGVuZXJzIGRlY2xhcmVkIG9uIEZhc3RDbGljayBlbGVtZW50IGZyb20gYmVpbmcgZmlyZWQuXG5cdFx0XHRpZiAoZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoZSBoYWNrIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgRXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIChlLmcuIEFuZHJvaWQgMilcblx0XHRcdFx0ZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FuY2VsIHRoZSBldmVudFxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIG1vdXNlIGV2ZW50IGlzIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiBhY3R1YWwgY2xpY2tzLCBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIGEgdG91Y2gtZ2VuZXJhdGVkIGNsaWNrLCBhIGNsaWNrIGFjdGlvbiBvY2N1cnJpbmdcblx0ICogbmF0dXJhbGx5IGFmdGVyIGEgZGVsYXkgYWZ0ZXIgYSB0b3VjaCAod2hpY2ggbmVlZHMgdG8gYmUgY2FuY2VsbGVkIHRvIGF2b2lkIGR1cGxpY2F0aW9uKSwgb3Jcblx0ICogYW4gYWN0dWFsIGNsaWNrIHdoaWNoIHNob3VsZCBiZSBwZXJtaXR0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgcGVybWl0dGVkO1xuXG5cdFx0Ly8gSXQncyBwb3NzaWJsZSBmb3IgYW5vdGhlciBGYXN0Q2xpY2stbGlrZSBsaWJyYXJ5IGRlbGl2ZXJlZCB3aXRoIHRoaXJkLXBhcnR5IGNvZGUgdG8gZmlyZSBhIGNsaWNrIGV2ZW50IGJlZm9yZSBGYXN0Q2xpY2sgZG9lcyAoaXNzdWUgIzQ0KS4gSW4gdGhhdCBjYXNlLCBzZXQgdGhlIGNsaWNrLXRyYWNraW5nIGZsYWcgYmFjayB0byBmYWxzZSBhbmQgcmV0dXJuIGVhcmx5LiBUaGlzIHdpbGwgY2F1c2Ugb25Ub3VjaEVuZCB0byByZXR1cm4gZWFybHkuXG5cdFx0aWYgKHRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gVmVyeSBvZGQgYmVoYXZpb3VyIG9uIGlPUyAoaXNzdWUgIzE4KTogaWYgYSBzdWJtaXQgZWxlbWVudCBpcyBwcmVzZW50IGluc2lkZSBhIGZvcm0gYW5kIHRoZSB1c2VyIGhpdHMgZW50ZXIgaW4gdGhlIGlPUyBzaW11bGF0b3Igb3IgY2xpY2tzIHRoZSBHbyBidXR0b24gb24gdGhlIHBvcC11cCBPUyBrZXlib2FyZCB0aGUgYSBraW5kIG9mICdmYWtlJyBjbGljayBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCB3aXRoIHRoZSBzdWJtaXQtdHlwZSBpbnB1dCBlbGVtZW50IGFzIHRoZSB0YXJnZXQuXG5cdFx0aWYgKGV2ZW50LnRhcmdldC50eXBlID09PSAnc3VibWl0JyAmJiBldmVudC5kZXRhaWwgPT09IDApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHBlcm1pdHRlZCA9IHRoaXMub25Nb3VzZShldmVudCk7XG5cblx0XHQvLyBPbmx5IHVuc2V0IHRhcmdldEVsZW1lbnQgaWYgdGhlIGNsaWNrIGlzIG5vdCBwZXJtaXR0ZWQuIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCB0aGUgY2hlY2sgZm9yICF0YXJnZXRFbGVtZW50IGluIG9uTW91c2UgZmFpbHMgYW5kIHRoZSBicm93c2VyJ3MgY2xpY2sgZG9lc24ndCBnbyB0aHJvdWdoLlxuXHRcdGlmICghcGVybWl0dGVkKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIElmIGNsaWNrcyBhcmUgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiBwZXJtaXR0ZWQ7XG5cdH07XG5cblxuXHQvKipcblx0ICogUmVtb3ZlIGFsbCBGYXN0Q2xpY2sncyBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGxheWVyID0gdGhpcy5sYXllcjtcblxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIHRydWUpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCBmYWxzZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciBGYXN0Q2xpY2sgaXMgbmVlZGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICovXG5cdEZhc3RDbGljay5ub3ROZWVkZWQgPSBmdW5jdGlvbihsYXllcikge1xuXHRcdHZhciBtZXRhVmlld3BvcnQ7XG5cdFx0dmFyIGNocm9tZVZlcnNpb247XG5cdFx0dmFyIGJsYWNrYmVycnlWZXJzaW9uO1xuXHRcdHZhciBmaXJlZm94VmVyc2lvbjtcblxuXHRcdC8vIERldmljZXMgdGhhdCBkb24ndCBzdXBwb3J0IHRvdWNoIGRvbid0IG5lZWQgRmFzdENsaWNrXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hyb21lIHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGNocm9tZVZlcnNpb24gPSArKC9DaHJvbWVcXC8oWzAtOV0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBbLDBdKVsxXTtcblxuXHRcdGlmIChjaHJvbWVWZXJzaW9uKSB7XG5cblx0XHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXG5cdFx0XHRcdGlmIChtZXRhVmlld3BvcnQpIHtcblx0XHRcdFx0XHQvLyBDaHJvbWUgb24gQW5kcm9pZCB3aXRoIHVzZXItc2NhbGFibGU9XCJub1wiIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICM4OSlcblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIENocm9tZSAzMiBhbmQgYWJvdmUgd2l0aCB3aWR0aD1kZXZpY2Utd2lkdGggb3IgbGVzcyBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdFx0XHRcdGlmIChjaHJvbWVWZXJzaW9uID4gMzEgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hyb21lIGRlc2t0b3AgZG9lc24ndCBuZWVkIEZhc3RDbGljayAoaXNzdWUgIzE1KVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGRldmljZUlzQmxhY2tCZXJyeTEwKSB7XG5cdFx0XHRibGFja2JlcnJ5VmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1ZlcnNpb25cXC8oWzAtOV0qKVxcLihbMC05XSopLyk7XG5cblx0XHRcdC8vIEJsYWNrQmVycnkgMTAuMysgZG9lcyBub3QgcmVxdWlyZSBGYXN0Y2xpY2sgbGlicmFyeS5cblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrL2lzc3Vlcy8yNTFcblx0XHRcdGlmIChibGFja2JlcnJ5VmVyc2lvblsxXSA+PSAxMCAmJiBibGFja2JlcnJ5VmVyc2lvblsyXSA+PSAzKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gdXNlci1zY2FsYWJsZT1ubyBlbGltaW5hdGVzIGNsaWNrIGRlbGF5LlxuXHRcdFx0XHRcdGlmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gd2lkdGg9ZGV2aWNlLXdpZHRoIChvciBsZXNzIHRoYW4gZGV2aWNlLXdpZHRoKSBlbGltaW5hdGVzIGNsaWNrIGRlbGF5LlxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTAgd2l0aCAtbXMtdG91Y2gtYWN0aW9uOiBub25lIG9yIG1hbmlwdWxhdGlvbiwgd2hpY2ggZGlzYWJsZXMgZG91YmxlLXRhcC10by16b29tIChpc3N1ZSAjOTcpXG5cdFx0aWYgKGxheWVyLnN0eWxlLm1zVG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIEZpcmVmb3ggdmVyc2lvbiAtIHplcm8gZm9yIG90aGVyIGJyb3dzZXJzXG5cdFx0ZmlyZWZveFZlcnNpb24gPSArKC9GaXJlZm94XFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoZmlyZWZveFZlcnNpb24gPj0gMjcpIHtcblx0XHRcdC8vIEZpcmVmb3ggMjcrIGRvZXMgbm90IGhhdmUgdGFwIGRlbGF5IGlmIHRoZSBjb250ZW50IGlzIG5vdCB6b29tYWJsZSAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkyMjg5NlxuXG5cdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cdFx0XHRpZiAobWV0YVZpZXdwb3J0ICYmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSUUxMTogcHJlZml4ZWQgLW1zLXRvdWNoLWFjdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGFuZCBpdCdzIHJlY29tZW5kZWQgdG8gdXNlIG5vbi1wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0Ly8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3dpbmRvd3MvYXBwcy9IaDc2NzMxMy5hc3B4XG5cdFx0aWYgKGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogRmFjdG9yeSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgRmFzdENsaWNrIG9iamVjdFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHNcblx0ICovXG5cdEZhc3RDbGljay5hdHRhY2ggPSBmdW5jdGlvbihsYXllciwgb3B0aW9ucykge1xuXHRcdHJldHVybiBuZXcgRmFzdENsaWNrKGxheWVyLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIEZhc3RDbGljaztcblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gRmFzdENsaWNrLmF0dGFjaDtcblx0XHRtb2R1bGUuZXhwb3J0cy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LkZhc3RDbGljayA9IEZhc3RDbGljaztcblx0fVxufSgpKTtcbiIsIi8vIEZvciBAb25zZW51aS9jdXN0b20tZWxlbWVudHNcbmlmICh3aW5kb3cuY3VzdG9tRWxlbWVudHMpIHsgLy8gZXZlbiBpZiBuYXRpdmUgQ0UxIGltcGwgZXhpc3RzLCB1c2UgcG9seWZpbGxcbiAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZm9yY2VQb2x5ZmlsbCA9IHRydWU7XG59XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjknIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFNSQyA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuL19mdW5jdGlvbi10by1zdHJpbmcnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChPLCBwcm90bykge1xuICBhbk9iamVjdChPKTtcbiAgaWYgKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpIHRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uICh0ZXN0LCBidWdneSwgc2V0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgc2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldCB9KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIHRlc3QgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYgKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpIHtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufVxuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuaWYgKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkgcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyICRpdGVyYXRvcnMgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIElURVJBVE9SID0gd2tzKCdpdGVyYXRvcicpO1xudmFyIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJyk7XG52YXIgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnZhciBET01JdGVyYWJsZXMgPSB7XG4gIENTU1J1bGVMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogZmFsc2UsXG4gIENTU1ZhbHVlTGlzdDogZmFsc2UsXG4gIENsaWVudFJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NUmVjdExpc3Q6IGZhbHNlLFxuICBET01TdHJpbmdMaXN0OiBmYWxzZSxcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogZmFsc2UsXG4gIEZpbGVMaXN0OiBmYWxzZSxcbiAgSFRNTEFsbENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxGb3JtRWxlbWVudDogZmFsc2UsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiBmYWxzZSxcbiAgTWVkaWFMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgTWltZVR5cGVBcnJheTogZmFsc2UsXG4gIE5hbWVkTm9kZU1hcDogZmFsc2UsXG4gIE5vZGVMaXN0OiB0cnVlLFxuICBQYWludFJlcXVlc3RMaXN0OiBmYWxzZSxcbiAgUGx1Z2luOiBmYWxzZSxcbiAgUGx1Z2luQXJyYXk6IGZhbHNlLFxuICBTVkdMZW5ndGhMaXN0OiBmYWxzZSxcbiAgU1ZHTnVtYmVyTGlzdDogZmFsc2UsXG4gIFNWR1BhdGhTZWdMaXN0OiBmYWxzZSxcbiAgU1ZHUG9pbnRMaXN0OiBmYWxzZSxcbiAgU1ZHU3RyaW5nTGlzdDogZmFsc2UsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IGZhbHNlLFxuICBTb3VyY2VCdWZmZXJMaXN0OiBmYWxzZSxcbiAgU3R5bGVTaGVldExpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBUZXh0VHJhY2tDdWVMaXN0OiBmYWxzZSxcbiAgVGV4dFRyYWNrTGlzdDogZmFsc2UsXG4gIFRvdWNoTGlzdDogZmFsc2Vcbn07XG5cbmZvciAodmFyIGNvbGxlY3Rpb25zID0gZ2V0S2V5cyhET01JdGVyYWJsZXMpLCBpID0gMDsgaSA8IGNvbGxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gY29sbGVjdGlvbnNbaV07XG4gIHZhciBleHBsaWNpdCA9IERPTUl0ZXJhYmxlc1tOQU1FXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIHZhciBrZXk7XG4gIGlmIChwcm90bykge1xuICAgIGlmICghcHJvdG9bSVRFUkFUT1JdKSBoaWRlKHByb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIGlmICghcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IEFycmF5VmFsdWVzO1xuICAgIGlmIChleHBsaWNpdCkgZm9yIChrZXkgaW4gJGl0ZXJhdG9ycykgaWYgKCFwcm90b1trZXldKSByZWRlZmluZShwcm90bywga2V5LCAkaXRlcmF0b3JzW2tleV0sIHRydWUpO1xuICB9XG59XG4iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBzYWZlKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG4iLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUWVBFKSB7XG4gIGlmICghaXNPYmplY3QoaXQpIHx8IGl0Ll90ICE9PSBUWVBFKSB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyICRpdGVyRGVmaW5lID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIGZhc3RLZXkgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBTSVpFID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbiAodGhhdCwga2V5KSB7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSk7XG4gIHZhciBlbnRyeTtcbiAgaWYgKGluZGV4ICE9PSAnRicpIHJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvciAoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKSB7XG4gICAgaWYgKGVudHJ5LmsgPT0ga2V5KSByZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24gKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpIHtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24gKHRoYXQsIGl0ZXJhYmxlKSB7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5fdCA9IE5BTUU7ICAgICAgICAgLy8gY29sbGVjdGlvbiB0eXBlXG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMS4zLjEgTWFwLnByb3RvdHlwZS5jbGVhcigpXG4gICAgICAvLyAyMy4yLjMuMiBTZXQucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgZm9yICh2YXIgdGhhdCA9IHZhbGlkYXRlKHRoaXMsIE5BTUUpLCBkYXRhID0gdGhhdC5faSwgZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKSB7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYgKGVudHJ5LnApIGVudHJ5LnAgPSBlbnRyeS5wLm4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZW50cnkuaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5fZiA9IHRoYXQuX2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoYXRbU0laRV0gPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjIuMy40IFNldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB2YWxpZGF0ZSh0aGlzLCBOQU1FKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uO1xuICAgICAgICAgIHZhciBwcmV2ID0gZW50cnkucDtcbiAgICAgICAgICBkZWxldGUgdGhhdC5faVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAocHJldikgcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZiAobmV4dCkgbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZiAodGhhdC5fZiA9PSBlbnRyeSkgdGhhdC5fZiA9IG5leHQ7XG4gICAgICAgICAgaWYgKHRoYXQuX2wgPT0gZW50cnkpIHRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgICAgICB2YWxpZGF0ZSh0aGlzLCBOQU1FKTtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpO1xuICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgIHdoaWxlIChlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2YpIHtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlIChlbnRyeSAmJiBlbnRyeS5yKSBlbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh2YWxpZGF0ZSh0aGlzLCBOQU1FKSwga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUodGhpcywgTkFNRSlbU0laRV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24gKHRoYXQsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgIHZhciBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmICghdGhhdC5fZikgdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYgKHByZXYpIHByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZiAoaW5kZXggIT09ICdGJykgdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24gKEMsIE5BTUUsIElTX01BUCkge1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgICAgIHRoaXMuX3QgPSB2YWxpZGF0ZShpdGVyYXRlZCwgTkFNRSk7IC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgICAgICAgICAgICAgICAgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIga2luZCA9IHRoYXQuX2s7XG4gICAgICB2YXIgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucikgZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmICghdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKSB7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhhdCwgdGFyZ2V0LCBDKSB7XG4gIHZhciBTID0gdGFyZ2V0LmNvbnN0cnVjdG9yO1xuICB2YXIgUDtcbiAgaWYgKFMgIT09IEMgJiYgdHlwZW9mIFMgPT0gJ2Z1bmN0aW9uJyAmJiAoUCA9IFMucHJvdG90eXBlKSAhPT0gQy5wcm90b3R5cGUgJiYgaXNPYmplY3QoUCkgJiYgc2V0UHJvdG90eXBlT2YpIHtcbiAgICBzZXRQcm90b3R5cGVPZih0aGF0LCBQKTtcbiAgfSByZXR1cm4gdGhhdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciAkaXRlckRldGVjdCA9IHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0Jyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSykge1xuICB2YXIgQmFzZSA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIEMgPSBCYXNlO1xuICB2YXIgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnO1xuICB2YXIgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlO1xuICB2YXIgTyA9IHt9O1xuICB2YXIgZml4TWV0aG9kID0gZnVuY3Rpb24gKEtFWSkge1xuICAgIHZhciBmbiA9IHByb3RvW0tFWV07XG4gICAgcmVkZWZpbmUocHJvdG8sIEtFWSxcbiAgICAgIEtFWSA9PSAnZGVsZXRlJyA/IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IGZhbHNlIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnaGFzJyA/IGZ1bmN0aW9uIGhhcyhhKSB7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IGZhbHNlIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnZ2V0JyA/IGZ1bmN0aW9uIGdldChhKSB7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IHVuZGVmaW5lZCA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSkgeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IHJldHVybiB0aGlzOyB9XG4gICAgICAgIDogZnVuY3Rpb24gc2V0KGEsIGIpIHsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEsIGIpOyByZXR1cm4gdGhpczsgfVxuICAgICk7XG4gIH07XG4gIGlmICh0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpIHtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IEMoKTtcbiAgICAvLyBlYXJseSBpbXBsZW1lbnRhdGlvbnMgbm90IHN1cHBvcnRzIGNoYWluaW5nXG4gICAgdmFyIEhBU05UX0NIQUlOSU5HID0gaW5zdGFuY2VbQURERVJdKElTX1dFQUsgPyB7fSA6IC0wLCAxKSAhPSBpbnN0YW5jZTtcbiAgICAvLyBWOCB+ICBDaHJvbWl1bSA0MC0gd2Vhay1jb2xsZWN0aW9ucyB0aHJvd3Mgb24gcHJpbWl0aXZlcywgYnV0IHNob3VsZCByZXR1cm4gZmFsc2VcbiAgICB2YXIgVEhST1dTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IGluc3RhbmNlLmhhcygxKTsgfSk7XG4gICAgLy8gbW9zdCBlYXJseSBpbXBsZW1lbnRhdGlvbnMgZG9lc24ndCBzdXBwb3J0cyBpdGVyYWJsZXMsIG1vc3QgbW9kZXJuIC0gbm90IGNsb3NlIGl0IGNvcnJlY3RseVxuICAgIHZhciBBQ0NFUFRfSVRFUkFCTEVTID0gJGl0ZXJEZXRlY3QoZnVuY3Rpb24gKGl0ZXIpIHsgbmV3IEMoaXRlcik7IH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIC8vIGZvciBlYXJseSBpbXBsZW1lbnRhdGlvbnMgLTAgYW5kICswIG5vdCB0aGUgc2FtZVxuICAgIHZhciBCVUdHWV9aRVJPID0gIUlTX1dFQUsgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVjggfiBDaHJvbWl1bSA0Mi0gZmFpbHMgb25seSB3aXRoIDUrIGVsZW1lbnRzXG4gICAgICB2YXIgJGluc3RhbmNlID0gbmV3IEMoKTtcbiAgICAgIHZhciBpbmRleCA9IDU7XG4gICAgICB3aGlsZSAoaW5kZXgtLSkgJGluc3RhbmNlW0FEREVSXShpbmRleCwgaW5kZXgpO1xuICAgICAgcmV0dXJuICEkaW5zdGFuY2UuaGFzKC0wKTtcbiAgICB9KTtcbiAgICBpZiAoIUFDQ0VQVF9JVEVSQUJMRVMpIHtcbiAgICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0YXJnZXQsIGl0ZXJhYmxlKSB7XG4gICAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FKTtcbiAgICAgICAgdmFyIHRoYXQgPSBpbmhlcml0SWZSZXF1aXJlZChuZXcgQmFzZSgpLCB0YXJnZXQsIEMpO1xuICAgICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcHJvdG8uY29uc3RydWN0b3IgPSBDO1xuICAgIH1cbiAgICBpZiAoVEhST1dTX09OX1BSSU1JVElWRVMgfHwgQlVHR1lfWkVSTykge1xuICAgICAgZml4TWV0aG9kKCdkZWxldGUnKTtcbiAgICAgIGZpeE1ldGhvZCgnaGFzJyk7XG4gICAgICBJU19NQVAgJiYgZml4TWV0aG9kKCdnZXQnKTtcbiAgICB9XG4gICAgaWYgKEJVR0dZX1pFUk8gfHwgSEFTTlRfQ0hBSU5JTkcpIGZpeE1ldGhvZChBRERFUik7XG4gICAgLy8gd2VhayBjb2xsZWN0aW9ucyBzaG91bGQgbm90IGNvbnRhaW5zIC5jbGVhciBtZXRob2RcbiAgICBpZiAoSVNfV0VBSyAmJiBwcm90by5jbGVhcikgZGVsZXRlIHByb3RvLmNsZWFyO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEMgIT0gQmFzZSksIE8pO1xuXG4gIGlmICghSVNfV0VBSykgY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXN0cm9uZycpO1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIFNFVCA9ICdTZXQnO1xuXG4vLyAyMy4yIFNldCBPYmplY3RzXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKShTRVQsIGZ1bmN0aW9uIChnZXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFNldCgpIHsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHZhbGlkYXRlKHRoaXMsIFNFVCksIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTtcbiIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyLCBJVEVSQVRPUikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgZnJvbSA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICBpZiAoY2xhc3NvZih0aGlzKSAhPSBOQU1FKSB0aHJvdyBUeXBlRXJyb3IoTkFNRSArIFwiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO1xuICAgIHJldHVybiBmcm9tKHRoaXMpO1xuICB9O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0JywgeyB0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKSB9KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS9cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTExFQ1RJT04pIHtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsIENPTExFQ1RJT04sIHsgb2Y6IGZ1bmN0aW9uIG9mKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBBID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSBBW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0Lm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdTZXQnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS9cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTExFQ1RJT04pIHtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsIENPTExFQ1RJT04sIHsgZnJvbTogZnVuY3Rpb24gZnJvbShzb3VyY2UgLyogLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgbWFwcGluZywgQSwgbiwgY2I7XG4gICAgYUZ1bmN0aW9uKHRoaXMpO1xuICAgIG1hcHBpbmcgPSBtYXBGbiAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChtYXBwaW5nKSBhRnVuY3Rpb24obWFwRm4pO1xuICAgIGlmIChzb3VyY2UgPT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IHRoaXMoKTtcbiAgICBBID0gW107XG4gICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgIG4gPSAwO1xuICAgICAgY2IgPSBjdHgobWFwRm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgICBmb3JPZihzb3VyY2UsIGZhbHNlLCBmdW5jdGlvbiAobmV4dEl0ZW0pIHtcbiAgICAgICAgQS5wdXNoKGNiKG5leHRJdGVtLCBuKyspKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JPZihzb3VyY2UsIGZhbHNlLCBBLnB1c2gsIEEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0LmZyb21cbnJlcXVpcmUoJy4vX3NldC1jb2xsZWN0aW9uLWZyb20nKSgnU2V0Jyk7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuc2V0Lm9mJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuU2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgTUFQID0gJ01hcCc7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKE1BUCwgZnVuY3Rpb24gKGdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTUFQKSwga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHZhbGlkYXRlKHRoaXMsIE1BUCksIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywgeyB0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdNYXAnKSB9KTtcbiIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLW1hcC5vZlxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tb2YnKSgnTWFwJyk7XG4iLCIvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vI3NlYy1tYXAuZnJvbVxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tZnJvbScpKCdNYXAnKTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC50by1qc29uJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5tYXAub2YnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5NYXA7XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWwpKSB7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59O1xuIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcbiIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBhc2MgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVFlQRSwgJGNyZWF0ZSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHZhciBjcmVhdGUgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbCwgcmVzO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgcmVzdWx0W2luZGV4XSA9IHJlczsgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzKSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYgKElTX0VWRVJZKSByZXR1cm4gZmFsc2U7IC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIHtcbiAgICAgIGtleSA9IGtleXNbaisrXTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMgfHwgaXNFbnVtLmNhbGwoUywga2V5KSkgVFtrZXldID0gU1trZXldO1xuICAgIH1cbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgZ2V0V2VhayA9IHJlcXVpcmUoJy4vX21ldGEnKS5nZXRXZWFrO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIGNyZWF0ZUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpO1xudmFyICRoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBhcnJheUZpbmQgPSBjcmVhdGVBcnJheU1ldGhvZCg1KTtcbnZhciBhcnJheUZpbmRJbmRleCA9IGNyZWF0ZUFycmF5TWV0aG9kKDYpO1xudmFyIGlkID0gMDtcblxuLy8gZmFsbGJhY2sgZm9yIHVuY2F1Z2h0IGZyb3plbiBrZXlzXG52YXIgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IFVuY2F1Z2h0RnJvemVuU3RvcmUoKSk7XG59O1xudmFyIFVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYSA9IFtdO1xufTtcbnZhciBmaW5kVW5jYXVnaHRGcm96ZW4gPSBmdW5jdGlvbiAoc3RvcmUsIGtleSkge1xuICByZXR1cm4gYXJyYXlGaW5kKHN0b3JlLmEsIGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICB9KTtcbn07XG5VbmNhdWdodEZyb3plblN0b3JlLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYgKGVudHJ5KSByZXR1cm4gZW50cnlbMV07XG4gIH0sXG4gIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhIWZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYgKGVudHJ5KSBlbnRyeVsxXSA9IHZhbHVlO1xuICAgIGVsc2UgdGhpcy5hLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSxcbiAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheUZpbmRJbmRleCh0aGlzLmEsIGZ1bmN0aW9uIChpdCkge1xuICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgfSk7XG4gICAgaWYgKH5pbmRleCkgdGhpcy5hLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuICEhfmluZGV4O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX3QgPSBOQU1FOyAgICAgIC8vIGNvbGxlY3Rpb24gdHlwZVxuICAgICAgdGhhdC5faSA9IGlkKys7ICAgICAgLy8gY29sbGVjdGlvbiBpZFxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgLy8gbGVhayBzdG9yZSBmb3IgdW5jYXVnaHQgZnJvemVuIG9iamVjdHNcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHZhbGlkYXRlKHRoaXMsIE5BTUUpKVsnZGVsZXRlJ10oa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKSAmJiBkZWxldGUgZGF0YVt0aGlzLl9pXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHZhbGlkYXRlKHRoaXMsIE5BTUUpKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbiAodGhhdCwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBkYXRhID0gZ2V0V2Vhayhhbk9iamVjdChrZXkpLCB0cnVlKTtcbiAgICBpZiAoZGF0YSA9PT0gdHJ1ZSkgdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGF0KS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgZWxzZSBkYXRhW3RoYXQuX2ldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIHVmc3RvcmU6IHVuY2F1Z2h0RnJvemVuU3RvcmVcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyk7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIElTX0lFMTEgPSAhZ2xvYmFsLkFjdGl2ZVhPYmplY3QgJiYgJ0FjdGl2ZVhPYmplY3QnIGluIGdsb2JhbDtcbnZhciBXRUFLX01BUCA9ICdXZWFrTWFwJztcbnZhciBnZXRXZWFrID0gbWV0YS5nZXRXZWFrO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG52YXIgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IHdlYWsudWZzdG9yZTtcbnZhciBJbnRlcm5hbE1hcDtcblxudmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrTWFwKCkge1xuICAgIHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICB9O1xufTtcblxudmFyIG1ldGhvZHMgPSB7XG4gIC8vIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIGlmIChpc09iamVjdChrZXkpKSB7XG4gICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgIGlmIChkYXRhID09PSB0cnVlKSByZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh2YWxpZGF0ZSh0aGlzLCBXRUFLX01BUCkpLmdldChrZXkpO1xuICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhW3RoaXMuX2ldIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgLy8gMjMuMy4zLjUgV2Vha01hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gd2Vhay5kZWYodmFsaWRhdGUodGhpcywgV0VBS19NQVApLCBrZXksIHZhbHVlKTtcbiAgfVxufTtcblxuLy8gMjMuMyBXZWFrTWFwIE9iamVjdHNcbnZhciAkV2Vha01hcCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKFdFQUtfTUFQLCB3cmFwcGVyLCBtZXRob2RzLCB3ZWFrLCB0cnVlLCB0cnVlKTtcblxuLy8gSUUxMSBXZWFrTWFwIGZyb3plbiBrZXlzIGZpeFxuaWYgKE5BVElWRV9XRUFLX01BUCAmJiBJU19JRTExKSB7XG4gIEludGVybmFsTWFwID0gd2Vhay5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBXRUFLX01BUCk7XG4gIGFzc2lnbihJbnRlcm5hbE1hcC5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICBtZXRhLk5FRUQgPSB0cnVlO1xuICBlYWNoKFsnZGVsZXRlJywgJ2hhcycsICdnZXQnLCAnc2V0J10sIGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcHJvdG8gPSAkV2Vha01hcC5wcm90b3R5cGU7XG4gICAgdmFyIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVkZWZpbmUocHJvdG8sIGtleSwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGludGVybmFsIHdlYWttYXAgc2hpbVxuICAgICAgaWYgKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mKSB0aGlzLl9mID0gbmV3IEludGVybmFsTWFwKCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9mW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vI3NlYy13ZWFrbWFwLm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdXZWFrTWFwJyk7XG4iLCIvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vI3NlYy13ZWFrbWFwLmZyb21cbnJlcXVpcmUoJy4vX3NldC1jb2xsZWN0aW9uLWZyb20nKSgnV2Vha01hcCcpO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi53ZWFrLW1hcCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcud2Vhay1tYXAub2YnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LndlYWstbWFwLmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLldlYWtNYXA7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBtYXBmbiA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oTyk7XG4gICAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZiAobWFwcGluZykgbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZiAoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEMoKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yIChyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuIiwiY29uc3QgcmVzZXJ2ZWRUYWdMaXN0ID0gbmV3IFNldChbXG4gICdhbm5vdGF0aW9uLXhtbCcsXG4gICdjb2xvci1wcm9maWxlJyxcbiAgJ2ZvbnQtZmFjZScsXG4gICdmb250LWZhY2Utc3JjJyxcbiAgJ2ZvbnQtZmFjZS11cmknLFxuICAnZm9udC1mYWNlLWZvcm1hdCcsXG4gICdmb250LWZhY2UtbmFtZScsXG4gICdtaXNzaW5nLWdseXBoJyxcbl0pO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEN1c3RvbUVsZW1lbnROYW1lKGxvY2FsTmFtZSkge1xuICBjb25zdCByZXNlcnZlZCA9IHJlc2VydmVkVGFnTGlzdC5oYXMobG9jYWxOYW1lKTtcbiAgY29uc3QgdmFsaWRGb3JtID0gL15bYS16XVsuMC05X2Etel0qLVtcXC0uMC05X2Etel0qJC8udGVzdChsb2NhbE5hbWUpO1xuICByZXR1cm4gIXJlc2VydmVkICYmIHZhbGlkRm9ybTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ29ubmVjdGVkKG5vZGUpIHtcbiAgLy8gVXNlIGBOb2RlI2lzQ29ubmVjdGVkYCwgaWYgZGVmaW5lZC5cbiAgY29uc3QgbmF0aXZlVmFsdWUgPSBub2RlLmlzQ29ubmVjdGVkO1xuICBpZiAobmF0aXZlVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuYXRpdmVWYWx1ZTtcbiAgfVxuXG4gIC8qKiBAdHlwZSB7P05vZGV8dW5kZWZpbmVkfSAqL1xuICBsZXQgY3VycmVudCA9IG5vZGU7XG4gIHdoaWxlIChjdXJyZW50ICYmICEoY3VycmVudC5fX0NFX2lzSW1wb3J0RG9jdW1lbnQgfHwgY3VycmVudCBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGUgfHwgKHdpbmRvdy5TaGFkb3dSb290ICYmIGN1cnJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gY3VycmVudC5ob3N0IDogdW5kZWZpbmVkKTtcbiAgfVxuICByZXR1cm4gISEoY3VycmVudCAmJiAoY3VycmVudC5fX0NFX2lzSW1wb3J0RG9jdW1lbnQgfHwgY3VycmVudCBpbnN0YW5jZW9mIERvY3VtZW50KSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gcm9vdFxuICogQHBhcmFtIHshTm9kZX0gc3RhcnRcbiAqIEByZXR1cm4gez9Ob2RlfVxuICovXG5mdW5jdGlvbiBuZXh0U2libGluZ09yQW5jZXN0b3JTaWJsaW5nKHJvb3QsIHN0YXJ0KSB7XG4gIGxldCBub2RlID0gc3RhcnQ7XG4gIHdoaWxlIChub2RlICYmIG5vZGUgIT09IHJvb3QgJiYgIW5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiAoIW5vZGUgfHwgbm9kZSA9PT0gcm9vdCkgPyBudWxsIDogbm9kZS5uZXh0U2libGluZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFOb2RlfSByb290XG4gKiBAcGFyYW0geyFOb2RlfSBzdGFydFxuICogQHJldHVybiB7P05vZGV9XG4gKi9cbmZ1bmN0aW9uIG5leHROb2RlKHJvb3QsIHN0YXJ0KSB7XG4gIHJldHVybiBzdGFydC5maXJzdENoaWxkID8gc3RhcnQuZmlyc3RDaGlsZCA6IG5leHRTaWJsaW5nT3JBbmNlc3RvclNpYmxpbmcocm9vdCwgc3RhcnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU5vZGV9IHJvb3RcbiAqIEBwYXJhbSB7IWZ1bmN0aW9uKCFFbGVtZW50KX0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7IVNldDxOb2RlPj19IHZpc2l0ZWRJbXBvcnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhyb290LCBjYWxsYmFjaywgdmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KCkpIHtcbiAgbGV0IG5vZGUgPSByb290O1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovKG5vZGUpO1xuXG4gICAgICBjYWxsYmFjayhlbGVtZW50KTtcblxuICAgICAgY29uc3QgbG9jYWxOYW1lID0gZWxlbWVudC5sb2NhbE5hbWU7XG4gICAgICBpZiAobG9jYWxOYW1lID09PSAnbGluaycgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnaW1wb3J0Jykge1xuICAgICAgICAvLyBJZiB0aGlzIGltcG9ydCAocG9seWZpbGxlZCBvciBub3QpIGhhcyBpdCdzIHJvb3Qgbm9kZSBhdmFpbGFibGUsXG4gICAgICAgIC8vIHdhbGsgaXQuXG4gICAgICAgIGNvbnN0IGltcG9ydE5vZGUgPSAvKiogQHR5cGUgeyFOb2RlfSAqLyAoZWxlbWVudC5pbXBvcnQpO1xuICAgICAgICBpZiAoaW1wb3J0Tm9kZSBpbnN0YW5jZW9mIE5vZGUgJiYgIXZpc2l0ZWRJbXBvcnRzLmhhcyhpbXBvcnROb2RlKSkge1xuICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgd2Fsa3Mgb2YgdGhlIHNhbWUgaW1wb3J0IHJvb3QuXG4gICAgICAgICAgdmlzaXRlZEltcG9ydHMuYWRkKGltcG9ydE5vZGUpO1xuXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgPSBpbXBvcnROb2RlLmZpcnN0Q2hpbGQ7IGNoaWxkOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICB3YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhjaGlsZCwgY2FsbGJhY2ssIHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZ25vcmUgZGVzY2VuZGFudHMgb2YgaW1wb3J0IGxpbmtzIHRvIHByZXZlbnQgYXR0ZW1wdGluZyB0byB3YWxrIHRoZVxuICAgICAgICAvLyBlbGVtZW50cyBjcmVhdGVkIGJ5IHRoZSBIVE1MIEltcG9ydHMgcG9seWZpbGwgdGhhdCB3ZSBqdXN0IHdhbGtlZFxuICAgICAgICAvLyBhYm92ZS5cbiAgICAgICAgbm9kZSA9IG5leHRTaWJsaW5nT3JBbmNlc3RvclNpYmxpbmcocm9vdCwgZWxlbWVudCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChsb2NhbE5hbWUgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgLy8gSWdub3JlIGRlc2NlbmRhbnRzIG9mIHRlbXBsYXRlcy4gVGhlcmUgc2hvdWxkbid0IGJlIGFueSBkZXNjZW5kYW50c1xuICAgICAgICAvLyBiZWNhdXNlIHRoZXkgd2lsbCBiZSBtb3ZlZCBpbnRvIGAuY29udGVudGAgZHVyaW5nIGNvbnN0cnVjdGlvbiBpblxuICAgICAgICAvLyBicm93c2VycyB0aGF0IHN1cHBvcnQgdGVtcGxhdGUgYnV0LCBpbiBjYXNlIHRoZXkgZXhpc3QgYW5kIGFyZSBzdGlsbFxuICAgICAgICAvLyB3YWl0aW5nIHRvIGJlIG1vdmVkIGJ5IGEgcG9seWZpbGwsIHRoZXkgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICBub2RlID0gbmV4dFNpYmxpbmdPckFuY2VzdG9yU2libGluZyhyb290LCBlbGVtZW50KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFdhbGsgc2hhZG93IHJvb3RzLlxuICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IGVsZW1lbnQuX19DRV9zaGFkb3dSb290O1xuICAgICAgaWYgKHNoYWRvd1Jvb3QpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgPSBzaGFkb3dSb290LmZpcnN0Q2hpbGQ7IGNoaWxkOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgd2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMoY2hpbGQsIGNhbGxiYWNrLCB2aXNpdGVkSW1wb3J0cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlID0gbmV4dE5vZGUocm9vdCwgbm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2VkIHRvIHN1cHByZXNzIENsb3N1cmUncyBcIk1vZGlmeWluZyB0aGUgcHJvdG90eXBlIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGVcbiAqIGNvbnN0cnVjdG9yIGlzIGluIHRoZSBzYW1lIHNjb3BlXCIgd2FybmluZyB3aXRob3V0IHVzaW5nXG4gKiBgQHN1cHByZXNzIHtuZXdDaGVja1R5cGVzLCBkdXBsaWNhdGV9YCBiZWNhdXNlIGBuZXdDaGVja1R5cGVzYCBpcyB0b28gYnJvYWQuXG4gKlxuICogQHBhcmFtIHshT2JqZWN0fSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFByb3BlcnR5VW5jaGVja2VkKGRlc3RpbmF0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICBkZXN0aW5hdGlvbltuYW1lXSA9IHZhbHVlO1xufVxuIiwiLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDdXN0b21FbGVtZW50U3RhdGUgPSB7XG4gIGN1c3RvbTogMSxcbiAgZmFpbGVkOiAyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tRWxlbWVudFN0YXRlO1xuIiwiaW1wb3J0ICogYXMgVXRpbGl0aWVzIGZyb20gJy4vVXRpbGl0aWVzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4vQ3VzdG9tRWxlbWVudFN0YXRlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tRWxlbWVudEludGVybmFscyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKiBAdHlwZSB7IU1hcDxzdHJpbmcsICFDdXN0b21FbGVtZW50RGVmaW5pdGlvbj59ICovXG4gICAgdGhpcy5fbG9jYWxOYW1lVG9EZWZpbml0aW9uID0gbmV3IE1hcCgpO1xuXG4gICAgLyoqIEB0eXBlIHshTWFwPCFGdW5jdGlvbiwgIUN1c3RvbUVsZW1lbnREZWZpbml0aW9uPn0gKi9cbiAgICB0aGlzLl9jb25zdHJ1Y3RvclRvRGVmaW5pdGlvbiA9IG5ldyBNYXAoKTtcblxuICAgIC8qKiBAdHlwZSB7IUFycmF5PCFmdW5jdGlvbighTm9kZSk+fSAqL1xuICAgIHRoaXMuX3BhdGNoZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLl9oYXNQYXRjaGVzID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsTmFtZVxuICAgKiBAcGFyYW0geyFDdXN0b21FbGVtZW50RGVmaW5pdGlvbn0gZGVmaW5pdGlvblxuICAgKi9cbiAgc2V0RGVmaW5pdGlvbihsb2NhbE5hbWUsIGRlZmluaXRpb24pIHtcbiAgICB0aGlzLl9sb2NhbE5hbWVUb0RlZmluaXRpb24uc2V0KGxvY2FsTmFtZSwgZGVmaW5pdGlvbik7XG4gICAgdGhpcy5fY29uc3RydWN0b3JUb0RlZmluaXRpb24uc2V0KGRlZmluaXRpb24uY29uc3RydWN0b3IsIGRlZmluaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAgICogQHJldHVybiB7IUN1c3RvbUVsZW1lbnREZWZpbml0aW9ufHVuZGVmaW5lZH1cbiAgICovXG4gIGxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxOYW1lVG9EZWZpbml0aW9uLmdldChsb2NhbE5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHshQ3VzdG9tRWxlbWVudERlZmluaXRpb258dW5kZWZpbmVkfVxuICAgKi9cbiAgY29uc3RydWN0b3JUb0RlZmluaXRpb24oY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0b3JUb0RlZmluaXRpb24uZ2V0KGNvbnN0cnVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFmdW5jdGlvbighTm9kZSl9IGxpc3RlbmVyXG4gICAqL1xuICBhZGRQYXRjaChsaXN0ZW5lcikge1xuICAgIHRoaXMuX2hhc1BhdGNoZXMgPSB0cnVlO1xuICAgIHRoaXMuX3BhdGNoZXMucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICAgKi9cbiAgcGF0Y2hUcmVlKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1BhdGNoZXMpIHJldHVybjtcblxuICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhub2RlLCBlbGVtZW50ID0+IHRoaXMucGF0Y2goZWxlbWVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICovXG4gIHBhdGNoKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1BhdGNoZXMpIHJldHVybjtcblxuICAgIGlmIChub2RlLl9fQ0VfcGF0Y2hlZCkgcmV0dXJuO1xuICAgIG5vZGUuX19DRV9wYXRjaGVkID0gdHJ1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcGF0Y2hlc1tpXShub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTm9kZX0gcm9vdFxuICAgKi9cbiAgY29ubmVjdFRyZWUocm9vdCkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gW107XG5cbiAgICBVdGlsaXRpZXMud2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMocm9vdCwgZWxlbWVudCA9PiBlbGVtZW50cy5wdXNoKGVsZW1lbnQpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIGlmIChlbGVtZW50Ll9fQ0Vfc3RhdGUgPT09IENFU3RhdGUuY3VzdG9tKSB7XG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZ3JhZGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFOb2RlfSByb290XG4gICAqL1xuICBkaXNjb25uZWN0VHJlZShyb290KSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhyb290LCBlbGVtZW50ID0+IGVsZW1lbnRzLnB1c2goZWxlbWVudCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgaWYgKGVsZW1lbnQuX19DRV9zdGF0ZSA9PT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayhlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBncmFkZXMgYWxsIHVuY3VzdG9taXplZCBjdXN0b20gZWxlbWVudHMgYXQgYW5kIGJlbG93IGEgcm9vdCBub2RlIGZvclxuICAgKiB3aGljaCB0aGVyZSBpcyBhIGRlZmluaXRpb24uIFdoZW4gY3VzdG9tIGVsZW1lbnQgcmVhY3Rpb24gY2FsbGJhY2tzIGFyZVxuICAgKiBhc3N1bWVkIHRvIGJlIGNhbGxlZCBzeW5jaHJvbm91c2x5ICh3aGljaCwgYnkgdGhlIGN1cnJlbnQgRE9NIC8gSFRNTCBzcGVjXG4gICAqIGRlZmluaXRpb25zLCB0aGV5IGFyZSAqbm90KiksIGNhbGxiYWNrcyBmb3IgYm90aCBlbGVtZW50cyBjdXN0b21pemVkXG4gICAqIHN5bmNocm9ub3VzbHkgYnkgdGhlIHBhcnNlciBhbmQgZWxlbWVudHMgYmVpbmcgdXBncmFkZWQgb2NjdXIgaW4gdGhlIHNhbWVcbiAgICogcmVsYXRpdmUgb3JkZXIuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZnVuY3Rpb24sIHdoZW4gdXNlZCB0byBzaW11bGF0ZSB0aGUgY29uc3RydWN0aW9uIG9mIGEgdHJlZSB0aGF0XG4gICAqIGlzIGFscmVhZHkgY3JlYXRlZCBidXQgbm90IGN1c3RvbWl6ZWQgKGkuZS4gYnkgdGhlIHBhcnNlciksIGRvZXMgKm5vdCpcbiAgICogcHJldmVudCB0aGUgZWxlbWVudCBmcm9tIHJlYWRpbmcgdGhlICdmaW5hbCcgKHRydWUpIHN0YXRlIG9mIHRoZSB0cmVlLiBGb3JcbiAgICogZXhhbXBsZSwgdGhlIGVsZW1lbnQsIGR1cmluZyB0cnVseSBzeW5jaHJvbm91cyBwYXJzaW5nIC8gY29uc3RydWN0aW9uIHdvdWxkXG4gICAqIHNlZSB0aGF0IGl0IGNvbnRhaW5zIG5vIGNoaWxkcmVuIGFzIHRoZXkgaGF2ZSBub3QgeWV0IGJlZW4gaW5zZXJ0ZWQuXG4gICAqIEhvd2V2ZXIsIHRoaXMgZnVuY3Rpb24gZG9lcyBub3QgbW9kaWZ5IHRoZSB0cmVlLCB0aGUgZWxlbWVudCB3aWxsXG4gICAqIChpbmNvcnJlY3RseSkgaGF2ZSBjaGlsZHJlbi4gQWRkaXRpb25hbGx5LCBzZWxmLW1vZGlmaWNhdGlvbiByZXN0cmljdGlvbnNcbiAgICogZm9yIGN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9ycyBpbXBvc2VkIGJ5IHRoZSBET00gc3BlYyBhcmUgKm5vdCogZW5mb3JjZWQuXG4gICAqXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgbmVzdGVkIGxpc3Qgc2hvd3MgdGhlIHN0ZXBzIGV4dGVuZGluZyBkb3duIGZyb20gdGhlIEhUTUxcbiAgICogc3BlYydzIHBhcnNpbmcgc2VjdGlvbiB0aGF0IGNhdXNlIGVsZW1lbnRzIHRvIGJlIHN5bmNocm9ub3VzbHkgY3JlYXRlZCBhbmRcbiAgICogdXBncmFkZWQ6XG4gICAqXG4gICAqIFRoZSBcImluIGJvZHlcIiBpbnNlcnRpb24gbW9kZTpcbiAgICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keVxuICAgKiAtIFN3aXRjaCBvbiB0b2tlbjpcbiAgICogICAuLiBvdGhlciBjYXNlcyAuLlxuICAgKiAgIC0+IEFueSBvdGhlciBzdGFydCB0YWdcbiAgICogICAgICAtIFtJbnNlcnQgYW4gSFRNTCBlbGVtZW50XShiZWxvdykgZm9yIHRoZSB0b2tlbi5cbiAgICpcbiAgICogSW5zZXJ0IGFuIEhUTUwgZWxlbWVudDpcbiAgICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjaW5zZXJ0LWFuLWh0bWwtZWxlbWVudFxuICAgKiAtIEluc2VydCBhIGZvcmVpZ24gZWxlbWVudCBmb3IgdGhlIHRva2VuIGluIHRoZSBIVE1MIG5hbWVzcGFjZTpcbiAgICogICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNpbnNlcnQtYS1mb3JlaWduLWVsZW1lbnRcbiAgICogICAtIENyZWF0ZSBhbiBlbGVtZW50IGZvciBhIHRva2VuOlxuICAgKiAgICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjY3JlYXRlLWFuLWVsZW1lbnQtZm9yLXRoZS10b2tlblxuICAgKiAgICAgLSBXaWxsIGV4ZWN1dGUgc2NyaXB0IGZsYWcgaXMgdHJ1ZT9cbiAgICogICAgICAgLSAoRWxlbWVudCBxdWV1ZSBwdXNoZWQgdG8gdGhlIGN1c3RvbSBlbGVtZW50IHJlYWN0aW9ucyBzdGFjay4pXG4gICAqICAgICAtIENyZWF0ZSBhbiBlbGVtZW50OlxuICAgKiAgICAgICBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtY3JlYXRlLWVsZW1lbnRcbiAgICogICAgICAgLSBTeW5jIENFIGZsYWcgaXMgdHJ1ZT9cbiAgICogICAgICAgICAtIENvbnN0cnVjdG9yIGNhbGxlZC5cbiAgICogICAgICAgICAtIFNlbGYtbW9kaWZpY2F0aW9uIHJlc3RyaWN0aW9ucyBlbmZvcmNlZC5cbiAgICogICAgICAgLSBTeW5jIENFIGZsYWcgaXMgZmFsc2U/XG4gICAqICAgICAgICAgLSAoVXBncmFkZSByZWFjdGlvbiBlbnF1ZXVlZC4pXG4gICAqICAgICAtIEF0dHJpYnV0ZXMgYXBwZW5kZWQgdG8gZWxlbWVudC5cbiAgICogICAgICAgKGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgIHJlYWN0aW9ucyBlbnF1ZXVlZC4pXG4gICAqICAgICAtIFdpbGwgZXhlY3V0ZSBzY3JpcHQgZmxhZyBpcyB0cnVlP1xuICAgKiAgICAgICAtIChFbGVtZW50IHF1ZXVlIHBvcHBlZCBmcm9tIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suXG4gICAqICAgICAgICAgUmVhY3Rpb25zIGluIHRoZSBwb3BwZWQgc3RhY2sgYXJlIGludm9rZWQuKVxuICAgKiAgIC0gKEVsZW1lbnQgcXVldWUgcHVzaGVkIHRvIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suKVxuICAgKiAgIC0gSW5zZXJ0IHRoZSBlbGVtZW50OlxuICAgKiAgICAgaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LW5vZGUtaW5zZXJ0XG4gICAqICAgICAtIFNoYWRvdy1pbmNsdWRpbmcgZGVzY2VuZGFudHMgYXJlIGNvbm5lY3RlZC4gRHVyaW5nIHBhcnNpbmdcbiAgICogICAgICAgY29uc3RydWN0aW9uLCB0aGVyZSBhcmUgbm8gc2hhZG93LSpleGNsdWRpbmcqIGRlc2NlbmRhbnRzLlxuICAgKiAgICAgICBIb3dldmVyLCB0aGUgY29uc3RydWN0b3IgbWF5IGhhdmUgdmFsaWRseSBhdHRhY2hlZCBhIHNoYWRvd1xuICAgKiAgICAgICB0cmVlIHRvIGl0c2VsZiBhbmQgYWRkZWQgZGVzY2VuZGFudHMgdG8gdGhhdCBzaGFkb3cgdHJlZS5cbiAgICogICAgICAgKGBjb25uZWN0ZWRDYWxsYmFja2AgcmVhY3Rpb25zIGVucXVldWVkLilcbiAgICogICAtIChFbGVtZW50IHF1ZXVlIHBvcHBlZCBmcm9tIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suXG4gICAqICAgICBSZWFjdGlvbnMgaW4gdGhlIHBvcHBlZCBzdGFjayBhcmUgaW52b2tlZC4pXG4gICAqXG4gICAqIEBwYXJhbSB7IU5vZGV9IHJvb3RcbiAgICogQHBhcmFtIHshU2V0PE5vZGU+PX0gdmlzaXRlZEltcG9ydHNcbiAgICovXG4gIHBhdGNoQW5kVXBncmFkZVRyZWUocm9vdCwgdmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KCkpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gICAgY29uc3QgZ2F0aGVyRWxlbWVudHMgPSBlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxvY2FsTmFtZSA9PT0gJ2xpbmsnICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ2ltcG9ydCcpIHtcbiAgICAgICAgLy8gVGhlIEhUTUwgSW1wb3J0cyBwb2x5ZmlsbCBzZXRzIGEgZGVzY2VuZGFudCBlbGVtZW50IG9mIHRoZSBsaW5rIHRvXG4gICAgICAgIC8vIHRoZSBgaW1wb3J0YCBwcm9wZXJ0eSwgc3BlY2lmaWNhbGx5IHRoaXMgaXMgKm5vdCogYSBEb2N1bWVudC5cbiAgICAgICAgY29uc3QgaW1wb3J0Tm9kZSA9IC8qKiBAdHlwZSB7P05vZGV9ICovIChlbGVtZW50LmltcG9ydCk7XG5cbiAgICAgICAgaWYgKGltcG9ydE5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIGltcG9ydE5vZGUucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgIGltcG9ydE5vZGUuX19DRV9pc0ltcG9ydERvY3VtZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIENvbm5lY3RlZCBsaW5rcyBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgICAgICBpbXBvcnROb2RlLl9fQ0VfaGFzUmVnaXN0cnkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIHRoaXMgbGluaydzIGltcG9ydCByb290IGlzIG5vdCBhdmFpbGFibGUsIGl0cyBjb250ZW50cyBjYW4ndCBiZVxuICAgICAgICAgIC8vIHdhbGtlZC4gV2FpdCBmb3IgJ2xvYWQnIGFuZCB3YWxrIGl0IHdoZW4gaXQncyByZWFkeS5cbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnROb2RlID0gLyoqIEB0eXBlIHshTm9kZX0gKi8gKGVsZW1lbnQuaW1wb3J0KTtcblxuICAgICAgICAgICAgaWYgKGltcG9ydE5vZGUuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkKSByZXR1cm47XG4gICAgICAgICAgICBpbXBvcnROb2RlLl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGltcG9ydE5vZGUuX19DRV9pc0ltcG9ydERvY3VtZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ29ubmVjdGVkIGxpbmtzIGFyZSBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICAgICAgICAgICAgaW1wb3J0Tm9kZS5fX0NFX2hhc1JlZ2lzdHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ2xvbmUgdGhlIGB2aXNpdGVkSW1wb3J0c2Agc2V0IHRoYXQgd2FzIHBvcHVsYXRlZCBzeW5jIGR1cmluZ1xuICAgICAgICAgICAgLy8gdGhlIGBwYXRjaEFuZFVwZ3JhZGVUcmVlYCBjYWxsIHRoYXQgY2F1c2VkIHRoaXMgJ2xvYWQnIGhhbmRsZXIgdG9cbiAgICAgICAgICAgIC8vIGJlIGFkZGVkLiBUaGVuLCByZW1vdmUgKnRoaXMqIGxpbmsncyBpbXBvcnQgbm9kZSBzbyB0aGF0IHdlIGNhblxuICAgICAgICAgICAgLy8gd2FsayB0aGF0IGltcG9ydCBhZ2FpbiwgZXZlbiBpZiBpdCB3YXMgcGFydGlhbGx5IHdhbGtlZCBsYXRlclxuICAgICAgICAgICAgLy8gZHVyaW5nIHRoZSBzYW1lIGBwYXRjaEFuZFVwZ3JhZGVUcmVlYCBjYWxsLlxuICAgICAgICAgICAgY29uc3QgY2xvbmVkVmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICAgIHZpc2l0ZWRJbXBvcnRzLmRlbGV0ZShpbXBvcnROb2RlKTtcblxuICAgICAgICAgICAgdGhpcy5wYXRjaEFuZFVwZ3JhZGVUcmVlKGltcG9ydE5vZGUsIHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gYHdhbGtEZWVwRGVzY2VuZGFudEVsZW1lbnRzYCBwb3B1bGF0ZXMgKGFuZCBpbnRlcm5hbGx5IGNoZWNrcyBhZ2FpbnN0KVxuICAgIC8vIGB2aXNpdGVkSW1wb3J0c2Agd2hlbiB0cmF2ZXJzaW5nIGEgbG9hZGVkIGltcG9ydC5cbiAgICBVdGlsaXRpZXMud2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMocm9vdCwgZ2F0aGVyRWxlbWVudHMsIHZpc2l0ZWRJbXBvcnRzKTtcblxuICAgIGlmICh0aGlzLl9oYXNQYXRjaGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucGF0Y2goZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudXBncmFkZUVsZW1lbnQoZWxlbWVudHNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAqL1xuICB1cGdyYWRlRWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gZWxlbWVudC5fX0NFX3N0YXRlO1xuICAgIGlmIChjdXJyZW50U3RhdGUgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHRoaXMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGVsZW1lbnQubG9jYWxOYW1lKTtcbiAgICBpZiAoIWRlZmluaXRpb24pIHJldHVybjtcblxuICAgIGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2sucHVzaChlbGVtZW50KTtcblxuICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gZGVmaW5pdGlvbi5jb25zdHJ1Y3RvcjtcbiAgICB0cnkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyAoY29uc3RydWN0b3IpKCk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvciBkaWQgbm90IHByb2R1Y2UgdGhlIGVsZW1lbnQgYmVpbmcgdXBncmFkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZWxlbWVudC5fX0NFX3N0YXRlID0gQ0VTdGF0ZS5mYWlsZWQ7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX19DRV9zdGF0ZSA9IENFU3RhdGUuY3VzdG9tO1xuICAgIGVsZW1lbnQuX19DRV9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuICAgIGlmIChkZWZpbml0aW9uLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaykge1xuICAgICAgY29uc3Qgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gZGVmaW5pdGlvbi5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmVkQXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gb2JzZXJ2ZWRBdHRyaWJ1dGVzW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhlbGVtZW50LCBuYW1lLCBudWxsLCB2YWx1ZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAqL1xuICBjb25uZWN0ZWRDYWxsYmFjayhlbGVtZW50KSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGVsZW1lbnQuX19DRV9kZWZpbml0aW9uO1xuICAgIGlmIChkZWZpbml0aW9uLmNvbm5lY3RlZENhbGxiYWNrKSB7XG4gICAgICBkZWZpbml0aW9uLmNvbm5lY3RlZENhbGxiYWNrLmNhbGwoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5fX0NFX2lzQ29ubmVjdGVkQ2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnRcbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQuX19DRV9pc0Nvbm5lY3RlZENhbGxiYWNrQ2FsbGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSBlbGVtZW50Ll9fQ0VfZGVmaW5pdGlvbjtcbiAgICBpZiAoZGVmaW5pdGlvbi5kaXNjb25uZWN0ZWRDYWxsYmFjaykge1xuICAgICAgZGVmaW5pdGlvbi5kaXNjb25uZWN0ZWRDYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX19DRV9pc0Nvbm5lY3RlZENhbGxiYWNrQ2FsbGVkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHs/c3RyaW5nfSBvbGRWYWx1ZVxuICAgKiBAcGFyYW0gez9zdHJpbmd9IG5ld1ZhbHVlXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAqL1xuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soZWxlbWVudCwgbmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBuYW1lc3BhY2UpIHtcbiAgICBjb25zdCBkZWZpbml0aW9uID0gZWxlbWVudC5fX0NFX2RlZmluaXRpb247XG4gICAgaWYgKFxuICAgICAgZGVmaW5pdGlvbi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgJiZcbiAgICAgIGRlZmluaXRpb24ub2JzZXJ2ZWRBdHRyaWJ1dGVzLmluZGV4T2YobmFtZSkgPiAtMVxuICAgICkge1xuICAgICAgZGVmaW5pdGlvbi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbChlbGVtZW50LCBuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIG5hbWVzcGFjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyIHtcbiAgY29uc3RydWN0b3IoaW50ZXJuYWxzLCBkb2MpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9XG4gICAgICovXG4gICAgdGhpcy5faW50ZXJuYWxzID0gaW50ZXJuYWxzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgeyFEb2N1bWVudH1cbiAgICAgKi9cbiAgICB0aGlzLl9kb2N1bWVudCA9IGRvYztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtNdXRhdGlvbk9ic2VydmVyfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB0aGlzLl9vYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuXG4gICAgLy8gU2ltdWxhdGUgdHJlZSBjb25zdHJ1Y3Rpb24gZm9yIGFsbCBjdXJyZW50bHkgYWNjZXNzaWJsZSBub2RlcyBpbiB0aGVcbiAgICAvLyBkb2N1bWVudC5cbiAgICB0aGlzLl9pbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZSh0aGlzLl9kb2N1bWVudCk7XG5cbiAgICBpZiAodGhpcy5fZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX2hhbmRsZU11dGF0aW9ucy5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gTm9kZXMgY3JlYXRlZCBieSB0aGUgcGFyc2VyIGFyZSBnaXZlbiB0byB0aGUgb2JzZXJ2ZXIgKmJlZm9yZSogdGhlIG5leHRcbiAgICAgIC8vIHRhc2sgcnVucy4gSW5saW5lIHNjcmlwdHMgYXJlIHJ1biBpbiBhIG5ldyB0YXNrLiBUaGlzIG1lYW5zIHRoYXQgdGhlXG4gICAgICAvLyBvYnNlcnZlciB3aWxsIGJlIGFibGUgdG8gaGFuZGxlIHRoZSBuZXdseSBwYXJzZWQgbm9kZXMgYmVmb3JlIHRoZSBpbmxpbmVcbiAgICAgIC8vIHNjcmlwdCBpcyBydW4uXG4gICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX2RvY3VtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFycmF5PCFNdXRhdGlvblJlY29yZD59IG11dGF0aW9uc1xuICAgKi9cbiAgX2hhbmRsZU11dGF0aW9ucyhtdXRhdGlvbnMpIHtcbiAgICAvLyBPbmNlIHRoZSBkb2N1bWVudCdzIGByZWFkeVN0YXRlYCBpcyAnaW50ZXJhY3RpdmUnIG9yICdjb21wbGV0ZScsIGFsbCBuZXdcbiAgICAvLyBub2RlcyBjcmVhdGVkIHdpdGhpbiB0aGF0IGRvY3VtZW50IHdpbGwgYmUgdGhlIHJlc3VsdCBvZiBzY3JpcHQgYW5kXG4gICAgLy8gc2hvdWxkIGJlIGhhbmRsZWQgYnkgcGF0Y2hpbmcuXG4gICAgY29uc3QgcmVhZHlTdGF0ZSA9IHRoaXMuX2RvY3VtZW50LnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgcmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZGVkTm9kZXMgPSBtdXRhdGlvbnNbaV0uYWRkZWROb2RlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWRkZWROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBub2RlID0gYWRkZWROb2Rlc1tqXTtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmVycmVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7VHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5fcmVzb2x2ZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFQcm9taXNlPFQ+fVxuICAgICAqL1xuICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUfSB2YWx1ZVxuICAgKi9cbiAgcmVzb2x2ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHJlc29sdmVkLicpO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fcmVzb2x2ZSkge1xuICAgICAgdGhpcy5fcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFQcm9taXNlPFQ+fVxuICAgKi9cbiAgdG9Qcm9taXNlKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICB9XG59XG4iLCJpbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuaW1wb3J0IERvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIgZnJvbSAnLi9Eb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyLmpzJztcbmltcG9ydCBEZWZlcnJlZCBmcm9tICcuL0RlZmVycmVkLmpzJztcbmltcG9ydCAqIGFzIFV0aWxpdGllcyBmcm9tICcuL1V0aWxpdGllcy5qcyc7XG5cbi8qKlxuICogQHVucmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21FbGVtZW50UmVnaXN0cnkge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFDdXN0b21FbGVtZW50SW50ZXJuYWxzfSBpbnRlcm5hbHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVybmFscykge1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fZWxlbWVudERlZmluaXRpb25Jc1J1bm5pbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFDdXN0b21FbGVtZW50SW50ZXJuYWxzfVxuICAgICAqL1xuICAgIHRoaXMuX2ludGVybmFscyA9IGludGVybmFscztcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFNYXA8c3RyaW5nLCAhRGVmZXJyZWQ8dW5kZWZpbmVkPj59XG4gICAgICovXG4gICAgdGhpcy5fd2hlbkRlZmluZWREZWZlcnJlZCA9IG5ldyBNYXAoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGZsdXNoIGNhbGxiYWNrIHRyaWdnZXJzIHRoZSBkb2N1bWVudCB3YWxrIHN5bmNocm9ub3VzbHkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7IUZ1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMuX2ZsdXNoQ2FsbGJhY2sgPSBmbiA9PiBmbigpO1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9mbHVzaFBlbmRpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFBcnJheTxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMuX3VuZmx1c2hlZExvY2FsTmFtZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFEb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyfVxuICAgICAqL1xuICAgIHRoaXMuX2RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIgPSBuZXcgRG9jdW1lbnRDb25zdHJ1Y3Rpb25PYnNlcnZlcihpbnRlcm5hbHMsIGRvY3VtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZGVmaW5lKGxvY2FsTmFtZSwgY29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3JzIG11c3QgYmUgZnVuY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICghVXRpbGl0aWVzLmlzVmFsaWRDdXN0b21FbGVtZW50TmFtZShsb2NhbE5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFRoZSBlbGVtZW50IG5hbWUgJyR7bG9jYWxOYW1lfScgaXMgbm90IHZhbGlkLmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcm5hbHMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGxvY2FsTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBjdXN0b20gZWxlbWVudCB3aXRoIG5hbWUgJyR7bG9jYWxOYW1lfScgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9lbGVtZW50RGVmaW5pdGlvbklzUnVubmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGN1c3RvbSBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgZGVmaW5lZC4nKTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudERlZmluaXRpb25Jc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgbGV0IGNvbm5lY3RlZENhbGxiYWNrO1xuICAgIGxldCBkaXNjb25uZWN0ZWRDYWxsYmFjaztcbiAgICBsZXQgYWRvcHRlZENhbGxiYWNrO1xuICAgIGxldCBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s7XG4gICAgbGV0IG9ic2VydmVkQXR0cmlidXRlcztcbiAgICB0cnkge1xuICAgICAgLyoqIEB0eXBlIHshT2JqZWN0fSAqL1xuICAgICAgY29uc3QgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgaWYgKCEocHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3JcXCdzIHByb3RvdHlwZSBpcyBub3QgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRDYWxsYmFjayhuYW1lKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrVmFsdWUgPSBwcm90b3R5cGVbbmFtZV07XG4gICAgICAgIGlmIChjYWxsYmFja1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgIShjYWxsYmFja1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7bmFtZX0nIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2tWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgY29ubmVjdGVkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnY29ubmVjdGVkQ2FsbGJhY2snKTtcbiAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrID0gZ2V0Q2FsbGJhY2soJ2Rpc2Nvbm5lY3RlZENhbGxiYWNrJyk7XG4gICAgICBhZG9wdGVkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnYWRvcHRlZENhbGxiYWNrJyk7XG4gICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJyk7XG4gICAgICBvYnNlcnZlZEF0dHJpYnV0ZXMgPSBjb25zdHJ1Y3Rvclsnb2JzZXJ2ZWRBdHRyaWJ1dGVzJ10gfHwgW107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9lbGVtZW50RGVmaW5pdGlvbklzUnVubmluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSB7XG4gICAgICBsb2NhbE5hbWUsXG4gICAgICBjb25zdHJ1Y3RvcixcbiAgICAgIGNvbm5lY3RlZENhbGxiYWNrLFxuICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2ssXG4gICAgICBhZG9wdGVkQ2FsbGJhY2ssXG4gICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2ssXG4gICAgICBvYnNlcnZlZEF0dHJpYnV0ZXMsXG4gICAgICBjb25zdHJ1Y3Rpb25TdGFjazogW10sXG4gICAgfTtcblxuICAgIHRoaXMuX2ludGVybmFscy5zZXREZWZpbml0aW9uKGxvY2FsTmFtZSwgZGVmaW5pdGlvbik7XG5cbiAgICB0aGlzLl91bmZsdXNoZWRMb2NhbE5hbWVzLnB1c2gobG9jYWxOYW1lKTtcblxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgY2FsbGVkIHRoZSBmbHVzaCBjYWxsYmFjayBhbmQgaXQgaGFzbid0IGNhbGxlZCBiYWNrIHlldCxcbiAgICAvLyBkb24ndCBjYWxsIGl0IGFnYWluLlxuICAgIGlmICghdGhpcy5fZmx1c2hQZW5kaW5nKSB7XG4gICAgICB0aGlzLl9mbHVzaFBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fZmx1c2hDYWxsYmFjaygoKSA9PiB0aGlzLl9mbHVzaCgpKTtcbiAgICB9XG4gIH1cblxuICBfZmx1c2goKSB7XG4gICAgLy8gSWYgbm8gbmV3IGRlZmluaXRpb25zIHdlcmUgZGVmaW5lZCwgZG9uJ3QgYXR0ZW1wdCB0byBmbHVzaC4gVGhpcyBjb3VsZFxuICAgIC8vIGhhcHBlbiBpZiBhIGZsdXNoIGNhbGxiYWNrIGtlZXBzIHRoZSBmdW5jdGlvbiBpdCBpcyBnaXZlbiBhbmQgY2FsbHMgaXRcbiAgICAvLyBtdWx0aXBsZSB0aW1lcy5cbiAgICBpZiAodGhpcy5fZmx1c2hQZW5kaW5nID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2U7XG4gICAgdGhpcy5faW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUoZG9jdW1lbnQpO1xuXG4gICAgd2hpbGUgKHRoaXMuX3VuZmx1c2hlZExvY2FsTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbG9jYWxOYW1lID0gdGhpcy5fdW5mbHVzaGVkTG9jYWxOYW1lcy5zaGlmdCgpO1xuICAgICAgY29uc3QgZGVmZXJyZWQgPSB0aGlzLl93aGVuRGVmaW5lZERlZmVycmVkLmdldChsb2NhbE5hbWUpO1xuICAgICAgaWYgKGRlZmVycmVkKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsTmFtZVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuICBnZXQobG9jYWxOYW1lKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHRoaXMuX2ludGVybmFscy5sb2NhbE5hbWVUb0RlZmluaXRpb24obG9jYWxOYW1lKTtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgcmV0dXJuIGRlZmluaXRpb24uY29uc3RydWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAqIEByZXR1cm4geyFQcm9taXNlPHVuZGVmaW5lZD59XG4gICAqL1xuICB3aGVuRGVmaW5lZChsb2NhbE5hbWUpIHtcbiAgICBpZiAoIVV0aWxpdGllcy5pc1ZhbGlkQ3VzdG9tRWxlbWVudE5hbWUobG9jYWxOYW1lKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTeW50YXhFcnJvcihgJyR7bG9jYWxOYW1lfScgaXMgbm90IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZS5gKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJpb3IgPSB0aGlzLl93aGVuRGVmaW5lZERlZmVycmVkLmdldChsb2NhbE5hbWUpO1xuICAgIGlmIChwcmlvcikge1xuICAgICAgcmV0dXJuIHByaW9yLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG4gICAgdGhpcy5fd2hlbkRlZmluZWREZWZlcnJlZC5zZXQobG9jYWxOYW1lLCBkZWZlcnJlZCk7XG5cbiAgICBjb25zdCBkZWZpbml0aW9uID0gdGhpcy5faW50ZXJuYWxzLmxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpO1xuICAgIC8vIFJlc29sdmUgaW1tZWRpYXRlbHkgb25seSBpZiB0aGUgZ2l2ZW4gbG9jYWwgbmFtZSBoYXMgYSBkZWZpbml0aW9uICphbmQqXG4gICAgLy8gdGhlIGZ1bGwgZG9jdW1lbnQgd2FsayB0byB1cGdyYWRlIGVsZW1lbnRzIHdpdGggdGhhdCBsb2NhbCBuYW1lIGhhc1xuICAgIC8vIGFscmVhZHkgaGFwcGVuZWQuXG4gICAgaWYgKGRlZmluaXRpb24gJiYgdGhpcy5fdW5mbHVzaGVkTG9jYWxOYW1lcy5pbmRleE9mKGxvY2FsTmFtZSkgPT09IC0xKSB7XG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayhvdXRlcikge1xuICAgIHRoaXMuX2RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIGNvbnN0IGlubmVyID0gdGhpcy5fZmx1c2hDYWxsYmFjaztcbiAgICB0aGlzLl9mbHVzaENhbGxiYWNrID0gZmx1c2ggPT4gb3V0ZXIoKCkgPT4gaW5uZXIoZmx1c2gpKTtcbiAgfVxufVxuXG4vLyBDbG9zdXJlIGNvbXBpbGVyIGV4cG9ydHMuXG53aW5kb3dbJ0N1c3RvbUVsZW1lbnRSZWdpc3RyeSddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZVsnZGVmaW5lJ10gPSBDdXN0b21FbGVtZW50UmVnaXN0cnkucHJvdG90eXBlLmRlZmluZTtcbkN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGVbJ2dldCddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZS5nZXQ7XG5DdXN0b21FbGVtZW50UmVnaXN0cnkucHJvdG90eXBlWyd3aGVuRGVmaW5lZCddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZS53aGVuRGVmaW5lZDtcbkN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGVbJ3BvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2snXSA9IEN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGUucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaztcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgRG9jdW1lbnRfY3JlYXRlRWxlbWVudDogd2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50LFxuICBEb2N1bWVudF9jcmVhdGVFbGVtZW50TlM6IHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudE5TLFxuICBEb2N1bWVudF9pbXBvcnROb2RlOiB3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUsXG4gIERvY3VtZW50X3ByZXBlbmQ6IHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGVbJ3ByZXBlbmQnXSxcbiAgRG9jdW1lbnRfYXBwZW5kOiB3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlWydhcHBlbmQnXSxcbiAgTm9kZV9jbG9uZU5vZGU6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jbG9uZU5vZGUsXG4gIE5vZGVfYXBwZW5kQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCxcbiAgTm9kZV9pbnNlcnRCZWZvcmU6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmUsXG4gIE5vZGVfcmVtb3ZlQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCxcbiAgTm9kZV9yZXBsYWNlQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZXBsYWNlQ2hpbGQsXG4gIE5vZGVfdGV4dENvbnRlbnQ6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93Lk5vZGUucHJvdG90eXBlLCAndGV4dENvbnRlbnQnKSxcbiAgRWxlbWVudF9hdHRhY2hTaGFkb3c6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsnYXR0YWNoU2hhZG93J10sXG4gIEVsZW1lbnRfaW5uZXJIVE1MOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSwgJ2lubmVySFRNTCcpLFxuICBFbGVtZW50X2dldEF0dHJpYnV0ZTogd2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSxcbiAgRWxlbWVudF9zZXRBdHRyaWJ1dGU6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUsXG4gIEVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlLFxuICBFbGVtZW50X2dldEF0dHJpYnV0ZU5TOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlTlMsXG4gIEVsZW1lbnRfc2V0QXR0cmlidXRlTlM6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyxcbiAgRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUzogd2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TLFxuICBFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudDogd2luZG93LkVsZW1lbnQucHJvdG90eXBlWydpbnNlcnRBZGphY2VudEVsZW1lbnQnXSxcbiAgRWxlbWVudF9wcmVwZW5kOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ3ByZXBlbmQnXSxcbiAgRWxlbWVudF9hcHBlbmQ6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsnYXBwZW5kJ10sXG4gIEVsZW1lbnRfYmVmb3JlOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ2JlZm9yZSddLFxuICBFbGVtZW50X2FmdGVyOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ2FmdGVyJ10sXG4gIEVsZW1lbnRfcmVwbGFjZVdpdGg6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsncmVwbGFjZVdpdGgnXSxcbiAgRWxlbWVudF9yZW1vdmU6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsncmVtb3ZlJ10sXG4gIEhUTUxFbGVtZW50OiB3aW5kb3cuSFRNTEVsZW1lbnQsXG4gIEhUTUxFbGVtZW50X2lubmVySFRNTDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnaW5uZXJIVE1MJyksXG4gIEhUTUxFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudDogd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZVsnaW5zZXJ0QWRqYWNlbnRFbGVtZW50J10sXG59O1xuIiwiLyoqXG4gKiBUaGlzIGNsYXNzIGV4aXN0cyBvbmx5IHRvIHdvcmsgYXJvdW5kIENsb3N1cmUncyBsYWNrIG9mIGEgd2F5IHRvIGRlc2NyaWJlXG4gKiBzaW5nbGV0b25zLiBJdCByZXByZXNlbnRzIHRoZSAnYWxyZWFkeSBjb25zdHJ1Y3RlZCBtYXJrZXInIHVzZWQgaW4gY3VzdG9tXG4gKiBlbGVtZW50IGNvbnN0cnVjdGlvbiBzdGFja3MuXG4gKlxuICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1hbHJlYWR5LWNvbnN0cnVjdGVkLW1hcmtlclxuICovXG5jbGFzcyBBbHJlYWR5Q29uc3RydWN0ZWRNYXJrZXIge31cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFscmVhZHlDb25zdHJ1Y3RlZE1hcmtlcigpO1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRTdGF0ZS5qcyc7XG5pbXBvcnQgQWxyZWFkeUNvbnN0cnVjdGVkTWFya2VyIGZyb20gJy4uL0FscmVhZHlDb25zdHJ1Y3RlZE1hcmtlci5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVybmFscykge1xuICB3aW5kb3dbJ0hUTUxFbGVtZW50J10gPSAoZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKG5ldzogSFRNTEVsZW1lbnQpOiAhSFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gSFRNTEVsZW1lbnQoKSB7XG4gICAgICAvLyBUaGlzIHNob3VsZCByZWFsbHkgYmUgYG5ldy50YXJnZXRgIGJ1dCBgbmV3LnRhcmdldGAgY2FuJ3QgYmUgZW11bGF0ZWRcbiAgICAgIC8vIGluIEVTNS4gQXNzdW1pbmcgdGhlIHVzZXIga2VlcHMgdGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIGNvbnN0cnVjdG9yJ3NcbiAgICAgIC8vIHByb3RvdHlwZSdzIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHksIHRoaXMgaXMgZXF1aXZhbGVudC5cbiAgICAgIC8qKiBAdHlwZSB7IUZ1bmN0aW9ufSAqL1xuICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgICBjb25zdCBkZWZpbml0aW9uID0gaW50ZXJuYWxzLmNvbnN0cnVjdG9yVG9EZWZpbml0aW9uKGNvbnN0cnVjdG9yKTtcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gZWxlbWVudCBiZWluZyBjb25zdHJ1Y3RlZCB3YXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBgY3VzdG9tRWxlbWVudHNgLicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25zdHJ1Y3Rpb25TdGFjayA9IGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2s7XG5cbiAgICAgIGlmIChjb25zdHJ1Y3Rpb25TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IE5hdGl2ZS5Eb2N1bWVudF9jcmVhdGVFbGVtZW50LmNhbGwoZG9jdW1lbnQsIGRlZmluaXRpb24ubG9jYWxOYW1lKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVsZW1lbnQsIGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgIGVsZW1lbnQuX19DRV9zdGF0ZSA9IENFU3RhdGUuY3VzdG9tO1xuICAgICAgICBlbGVtZW50Ll9fQ0VfZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG4gICAgICAgIGludGVybmFscy5wYXRjaChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3RJbmRleCA9IGNvbnN0cnVjdGlvblN0YWNrLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29uc3RydWN0aW9uU3RhY2tbbGFzdEluZGV4XTtcbiAgICAgIGlmIChlbGVtZW50ID09PSBBbHJlYWR5Q29uc3RydWN0ZWRNYXJrZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgSFRNTEVsZW1lbnQgY29uc3RydWN0b3Igd2FzIGVpdGhlciBjYWxsZWQgcmVlbnRyYW50bHkgZm9yIHRoaXMgY29uc3RydWN0b3Igb3IgY2FsbGVkIG11bHRpcGxlIHRpbWVzLicpO1xuICAgICAgfVxuICAgICAgY29uc3RydWN0aW9uU3RhY2tbbGFzdEluZGV4XSA9IEFscmVhZHlDb25zdHJ1Y3RlZE1hcmtlcjtcblxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVsZW1lbnQsIGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICBpbnRlcm5hbHMucGF0Y2goLyoqIEB0eXBlIHshSFRNTEVsZW1lbnR9ICovIChlbGVtZW50KSk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZSA9IE5hdGl2ZS5IVE1MRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICByZXR1cm4gSFRNTEVsZW1lbnQ7XG4gIH0pKCk7XG59O1xuIiwiaW1wb3J0IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMgZnJvbSAnLi4vLi4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBwcmVwZW5kOiAhZnVuY3Rpb24oLi4uKCFOb2RlfHN0cmluZykpLFxuICAqICBhcHBlbmQ6ICFmdW5jdGlvbiguLi4oIU5vZGV8c3RyaW5nKSksXG4gKiB9fVxuICovXG5sZXQgUGFyZW50Tm9kZU5hdGl2ZU1ldGhvZHM7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKiBAcGFyYW0geyFPYmplY3R9IGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0geyFQYXJlbnROb2RlTmF0aXZlTWV0aG9kc30gYnVpbHRJblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMsIGRlc3RpbmF0aW9uLCBidWlsdEluKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ3ByZXBlbmQnXSA9IGZ1bmN0aW9uKC4uLm5vZGVzKSB7XG4gICAgLy8gVE9ETzogRml4IHRoaXMgZm9yIHdoZW4gb25lIG9mIGBub2Rlc2AgaXMgYSBEb2N1bWVudEZyYWdtZW50IVxuICAgIGNvbnN0IGNvbm5lY3RlZEJlZm9yZSA9IC8qKiBAdHlwZSB7IUFycmF5PCFOb2RlPn0gKi8gKG5vZGVzLmZpbHRlcihub2RlID0+IHtcbiAgICAgIC8vIERvY3VtZW50RnJhZ21lbnRzIGFyZSBub3QgY29ubmVjdGVkIGFuZCB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgbGlzdC5cbiAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgTm9kZSAmJiBVdGlsaXRpZXMuaXNDb25uZWN0ZWQobm9kZSk7XG4gICAgfSkpO1xuXG4gICAgYnVpbHRJbi5wcmVwZW5kLmFwcGx5KHRoaXMsIG5vZGVzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29ubmVjdGVkQmVmb3JlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUoY29ubmVjdGVkQmVmb3JlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ2FwcGVuZCddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmFwcGVuZC5hcHBseSh0aGlzLCBub2Rlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbm5lY3RlZEJlZm9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGNvbm5lY3RlZEJlZm9yZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG4iLCJpbXBvcnQgTmF0aXZlIGZyb20gJy4vTmF0aXZlLmpzJztcbmltcG9ydCBDdXN0b21FbGVtZW50SW50ZXJuYWxzIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbGl0aWVzIGZyb20gJy4uL1V0aWxpdGllcy5qcyc7XG5cbmltcG9ydCBQYXRjaFBhcmVudE5vZGUgZnJvbSAnLi9JbnRlcmZhY2UvUGFyZW50Tm9kZS5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVybmFscykge1xuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnY3JlYXRlRWxlbWVudCcsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0RvY3VtZW50fVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAgICAgKiBAcmV0dXJuIHshRWxlbWVudH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihsb2NhbE5hbWUpIHtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGRvY3VtZW50IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVnaXN0cnkuXG4gICAgICBpZiAodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSBpbnRlcm5hbHMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGxvY2FsTmFtZSk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyAoZGVmaW5pdGlvbi5jb25zdHJ1Y3RvcikoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSAvKiogQHR5cGUgeyFFbGVtZW50fSAqL1xuICAgICAgICAoTmF0aXZlLkRvY3VtZW50X2NyZWF0ZUVsZW1lbnQuY2FsbCh0aGlzLCBsb2NhbE5hbWUpKTtcbiAgICAgIGludGVybmFscy5wYXRjaChyZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnaW1wb3J0Tm9kZScsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0RvY3VtZW50fVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBkZWVwXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZSwgZGVlcCkge1xuICAgICAgY29uc3QgY2xvbmUgPSBOYXRpdmUuRG9jdW1lbnRfaW1wb3J0Tm9kZS5jYWxsKHRoaXMsIG5vZGUsIGRlZXApO1xuICAgICAgLy8gT25seSBjcmVhdGUgY3VzdG9tIGVsZW1lbnRzIGlmIHRoaXMgZG9jdW1lbnQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgIGlmICghdGhpcy5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgIGludGVybmFscy5wYXRjaFRyZWUoY2xvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUoY2xvbmUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH0pO1xuXG4gIGNvbnN0IE5TX0hUTUwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnY3JlYXRlRWxlbWVudE5TJyxcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7RG9jdW1lbnR9XG4gICAgICogQHBhcmFtIHs/c3RyaW5nfSBuYW1lc3BhY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAgICogQHJldHVybiB7IUVsZW1lbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24obmFtZXNwYWNlLCBsb2NhbE5hbWUpIHtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGRvY3VtZW50IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVnaXN0cnkuXG4gICAgICBpZiAodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5ICYmIChuYW1lc3BhY2UgPT09IG51bGwgfHwgbmFtZXNwYWNlID09PSBOU19IVE1MKSkge1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uID0gaW50ZXJuYWxzLmxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXcgKGRlZmluaXRpb24uY29uc3RydWN0b3IpKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gLyoqIEB0eXBlIHshRWxlbWVudH0gKi9cbiAgICAgICAgKE5hdGl2ZS5Eb2N1bWVudF9jcmVhdGVFbGVtZW50TlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIGxvY2FsTmFtZSkpO1xuICAgICAgaW50ZXJuYWxzLnBhdGNoKHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gIFBhdGNoUGFyZW50Tm9kZShpbnRlcm5hbHMsIERvY3VtZW50LnByb3RvdHlwZSwge1xuICAgIHByZXBlbmQ6IE5hdGl2ZS5Eb2N1bWVudF9wcmVwZW5kLFxuICAgIGFwcGVuZDogTmF0aXZlLkRvY3VtZW50X2FwcGVuZCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxpdGllcyBmcm9tICcuLi9VdGlsaXRpZXMuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMpIHtcbiAgLy8gYE5vZGUjbm9kZVZhbHVlYCBpcyBpbXBsZW1lbnRlZCBvbiBgQXR0cmAuXG4gIC8vIGBOb2RlI3RleHRDb250ZW50YCBpcyBpbXBsZW1lbnRlZCBvbiBgQXR0cmAsIGBFbGVtZW50YC5cblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoTm9kZS5wcm90b3R5cGUsICdpbnNlcnRCZWZvcmUnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcGFyYW0gez9Ob2RlfSByZWZOb2RlXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZSwgcmVmTm9kZSkge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IGluc2VydGVkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobm9kZS5jaGlsZE5vZGVzKTtcbiAgICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfaW5zZXJ0QmVmb3JlLmNhbGwodGhpcywgbm9kZSwgcmVmTm9kZSk7XG5cbiAgICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgY2FuJ3QgYmUgY29ubmVjdGVkLCBzbyBgZGlzY29ubmVjdFRyZWVgIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gbmVlZCB0byBiZSBjYWxsZWQgb24gYSBEb2N1bWVudEZyYWdtZW50J3MgY2hpbGRyZW4gYWZ0ZXIgaW5zZXJ0aW5nIGl0LlxuXG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc2VydGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShpbnNlcnRlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlV2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfaW5zZXJ0QmVmb3JlLmNhbGwodGhpcywgbm9kZSwgcmVmTm9kZSk7XG5cbiAgICAgIGlmIChub2RlV2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuYXRpdmVSZXN1bHQ7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAnYXBwZW5kQ2hpbGQnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHshTm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgY29uc3QgaW5zZXJ0ZWROb2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShub2RlLmNoaWxkTm9kZXMpO1xuICAgICAgICBjb25zdCBuYXRpdmVSZXN1bHQgPSBOYXRpdmUuTm9kZV9hcHBlbmRDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuXG4gICAgICAgIC8vIERvY3VtZW50RnJhZ21lbnRzIGNhbid0IGJlIGNvbm5lY3RlZCwgc28gYGRpc2Nvbm5lY3RUcmVlYCB3aWxsIG5ldmVyXG4gICAgICAgIC8vIG5lZWQgdG8gYmUgY2FsbGVkIG9uIGEgRG9jdW1lbnRGcmFnbWVudCdzIGNoaWxkcmVuIGFmdGVyIGluc2VydGluZyBpdC5cblxuICAgICAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnNlcnRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUoaW5zZXJ0ZWROb2Rlc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5hdGl2ZVJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZVdhc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICAgIGNvbnN0IG5hdGl2ZVJlc3VsdCA9IE5hdGl2ZS5Ob2RlX2FwcGVuZENoaWxkLmNhbGwodGhpcywgbm9kZSk7XG5cbiAgICAgIGlmIChub2RlV2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuYXRpdmVSZXN1bHQ7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAnY2xvbmVOb2RlJyxcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBkZWVwXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24oZGVlcCkge1xuICAgICAgY29uc3QgY2xvbmUgPSBOYXRpdmUuTm9kZV9jbG9uZU5vZGUuY2FsbCh0aGlzLCBkZWVwKTtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGVsZW1lbnQncyBvd25lciBkb2N1bWVudCBpc1xuICAgICAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgIGlmICghdGhpcy5vd25lckRvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnkpIHtcbiAgICAgICAgaW50ZXJuYWxzLnBhdGNoVHJlZShjbG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZShjbG9uZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmU7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAncmVtb3ZlQ2hpbGQnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHshTm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihub2RlKSB7XG4gICAgICBjb25zdCBub2RlV2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBub2RlKTtcblxuICAgICAgaWYgKG5vZGVXYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgIH0pO1xuXG4gIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChOb2RlLnByb3RvdHlwZSwgJ3JlcGxhY2VDaGlsZCcsXG4gICAgLyoqXG4gICAgICogQHRoaXMge05vZGV9XG4gICAgICogQHBhcmFtIHshTm9kZX0gbm9kZVRvSW5zZXJ0XG4gICAgICogQHBhcmFtIHshTm9kZX0gbm9kZVRvUmVtb3ZlXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZVRvSW5zZXJ0LCBub2RlVG9SZW1vdmUpIHtcbiAgICAgIGlmIChub2RlVG9JbnNlcnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IGluc2VydGVkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobm9kZVRvSW5zZXJ0LmNoaWxkTm9kZXMpO1xuICAgICAgICBjb25zdCBuYXRpdmVSZXN1bHQgPSBOYXRpdmUuTm9kZV9yZXBsYWNlQ2hpbGQuY2FsbCh0aGlzLCBub2RlVG9JbnNlcnQsIG5vZGVUb1JlbW92ZSk7XG5cbiAgICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgY2FuJ3QgYmUgY29ubmVjdGVkLCBzbyBgZGlzY29ubmVjdFRyZWVgIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gbmVlZCB0byBiZSBjYWxsZWQgb24gYSBEb2N1bWVudEZyYWdtZW50J3MgY2hpbGRyZW4gYWZ0ZXIgaW5zZXJ0aW5nIGl0LlxuXG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvUmVtb3ZlKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc2VydGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShpbnNlcnRlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlVG9JbnNlcnRXYXNDb25uZWN0ZWQgPSBVdGlsaXRpZXMuaXNDb25uZWN0ZWQobm9kZVRvSW5zZXJ0KTtcbiAgICAgIGNvbnN0IG5hdGl2ZVJlc3VsdCA9IE5hdGl2ZS5Ob2RlX3JlcGxhY2VDaGlsZC5jYWxsKHRoaXMsIG5vZGVUb0luc2VydCwgbm9kZVRvUmVtb3ZlKTtcbiAgICAgIGNvbnN0IHRoaXNJc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXNJc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvUmVtb3ZlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGVUb0luc2VydFdhc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvSW5zZXJ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXNJc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZVRvSW5zZXJ0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5hdGl2ZVJlc3VsdDtcbiAgICB9KTtcblxuXG4gIGZ1bmN0aW9uIHBhdGNoX3RleHRDb250ZW50KGRlc3RpbmF0aW9uLCBiYXNlRGVzY3JpcHRvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0aW5hdGlvbiwgJ3RleHRDb250ZW50Jywge1xuICAgICAgZW51bWVyYWJsZTogYmFzZURlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogYmFzZURlc2NyaXB0b3IuZ2V0LFxuICAgICAgc2V0OiAvKiogQHRoaXMge05vZGV9ICovIGZ1bmN0aW9uKGFzc2lnbmVkVmFsdWUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHRleHQgbm9kZSB0aGVuIHRoZXJlIGFyZSBubyBub2RlcyB0byBkaXNjb25uZWN0LlxuICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICBiYXNlRGVzY3JpcHRvci5zZXQuY2FsbCh0aGlzLCBhc3NpZ25lZFZhbHVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBDaGVja2luZyBmb3IgYGZpcnN0Q2hpbGRgIGlzIGZhc3RlciB0aGFuIHJlYWRpbmcgYGNoaWxkTm9kZXMubGVuZ3RoYFxuICAgICAgICAvLyB0byBjb21wYXJlIHdpdGggMC5cbiAgICAgICAgaWYgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIC8vIFVzaW5nIGBjaGlsZE5vZGVzYCBpcyBmYXN0ZXIgdGhhbiBgY2hpbGRyZW5gLCBldmVuIHRob3VnaCB3ZSBvbmx5XG4gICAgICAgICAgLy8gY2FyZSBhYm91dCBlbGVtZW50cy5cbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZXNMZW5ndGggPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICBpZiAoY2hpbGROb2Rlc0xlbmd0aCA+IDAgJiYgVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICAvLyBDb3B5aW5nIGFuIGFycmF5IGJ5IGl0ZXJhdGluZyBpcyBmYXN0ZXIgdGhhbiB1c2luZyBzbGljZS5cbiAgICAgICAgICAgIHJlbW92ZWROb2RlcyA9IG5ldyBBcnJheShjaGlsZE5vZGVzTGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJlbW92ZWROb2Rlc1tpXSA9IGNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmFzZURlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgYXNzaWduZWRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWROb2Rlcykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUocmVtb3ZlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlLk5vZGVfdGV4dENvbnRlbnQgJiYgTmF0aXZlLk5vZGVfdGV4dENvbnRlbnQuZ2V0KSB7XG4gICAgcGF0Y2hfdGV4dENvbnRlbnQoTm9kZS5wcm90b3R5cGUsIE5hdGl2ZS5Ob2RlX3RleHRDb250ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpbnRlcm5hbHMuYWRkUGF0Y2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcGF0Y2hfdGV4dENvbnRlbnQoZWxlbWVudCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaW1wbGVtZW50YXRpb24gb2YgdGhlIGB0ZXh0Q29udGVudGAgZ2V0dGVyIGFzc3VtZXMgdGhhdFxuICAgICAgICAvLyB0ZXh0IG5vZGVzJyBgdGV4dENvbnRlbnRgIGdldHRlciB3aWxsIG5vdCBiZSBwYXRjaGVkLlxuICAgICAgICBnZXQ6IC8qKiBAdGhpcyB7Tm9kZX0gKi8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLyoqIEB0eXBlIHshQXJyYXk8c3RyaW5nPn0gKi9cbiAgICAgICAgICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5jaGlsZE5vZGVzW2ldLnRleHRDb250ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogLyoqIEB0aGlzIHtOb2RlfSAqLyBmdW5jdGlvbihhc3NpZ25lZFZhbHVlKSB7XG4gICAgICAgICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCB0aGlzLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBOYXRpdmUuTm9kZV9hcHBlbmRDaGlsZC5jYWxsKHRoaXMsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFzc2lnbmVkVmFsdWUpKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMgZnJvbSAnLi4vLi4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBiZWZvcmU6ICFmdW5jdGlvbiguLi4oIU5vZGV8c3RyaW5nKSksXG4gKiAgIGFmdGVyOiAhZnVuY3Rpb24oLi4uKCFOb2RlfHN0cmluZykpLFxuICogICByZXBsYWNlV2l0aDogIWZ1bmN0aW9uKC4uLighTm9kZXxzdHJpbmcpKSxcbiAqICAgcmVtb3ZlOiAhZnVuY3Rpb24oKSxcbiAqIH19XG4gKi9cbmxldCBDaGlsZE5vZGVOYXRpdmVNZXRob2RzO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICogQHBhcmFtIHshT2JqZWN0fSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHshQ2hpbGROb2RlTmF0aXZlTWV0aG9kc30gYnVpbHRJblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMsIGRlc3RpbmF0aW9uLCBidWlsdEluKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ2JlZm9yZSddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmJlZm9yZS5hcHBseSh0aGlzLCBub2Rlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbm5lY3RlZEJlZm9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGNvbm5lY3RlZEJlZm9yZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHsuLi4oIU5vZGV8c3RyaW5nKX0gbm9kZXNcbiAgICovXG4gIGRlc3RpbmF0aW9uWydhZnRlciddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmFmdGVyLmFwcGx5KHRoaXMsIG5vZGVzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29ubmVjdGVkQmVmb3JlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUoY29ubmVjdGVkQmVmb3JlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ3JlcGxhY2VXaXRoJ10gPSBmdW5jdGlvbiguLi5ub2Rlcykge1xuICAgIC8vIFRPRE86IEZpeCB0aGlzIGZvciB3aGVuIG9uZSBvZiBgbm9kZXNgIGlzIGEgRG9jdW1lbnRGcmFnbWVudCFcbiAgICBjb25zdCBjb25uZWN0ZWRCZWZvcmUgPSAvKiogQHR5cGUgeyFBcnJheTwhTm9kZT59ICovIChub2Rlcy5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAvLyBEb2N1bWVudEZyYWdtZW50cyBhcmUgbm90IGNvbm5lY3RlZCBhbmQgd2lsbCBub3QgYmUgYWRkZWQgdG8gdGhlIGxpc3QuXG4gICAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE5vZGUgJiYgVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgIH0pKTtcblxuICAgIGNvbnN0IHdhc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKTtcblxuICAgIGJ1aWx0SW4ucmVwbGFjZVdpdGguYXBwbHkodGhpcywgbm9kZXMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25uZWN0ZWRCZWZvcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShjb25uZWN0ZWRCZWZvcmVbaV0pO1xuICAgIH1cblxuICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZSh0aGlzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZGVzdGluYXRpb25bJ3JlbW92ZSddID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgd2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpO1xuXG4gICAgYnVpbHRJbi5yZW1vdmUuY2FsbCh0aGlzKTtcblxuICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZSh0aGlzKTtcbiAgICB9XG4gIH07XG59O1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRTdGF0ZS5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vVXRpbGl0aWVzLmpzJztcblxuaW1wb3J0IFBhdGNoUGFyZW50Tm9kZSBmcm9tICcuL0ludGVyZmFjZS9QYXJlbnROb2RlLmpzJztcbmltcG9ydCBQYXRjaENoaWxkTm9kZSBmcm9tICcuL0ludGVyZmFjZS9DaGlsZE5vZGUuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMpIHtcbiAgaWYgKE5hdGl2ZS5FbGVtZW50X2F0dGFjaFNoYWRvdykge1xuICAgIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChFbGVtZW50LnByb3RvdHlwZSwgJ2F0dGFjaFNoYWRvdycsXG4gICAgICAvKipcbiAgICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAgICogQHBhcmFtIHshe21vZGU6IHN0cmluZ319IGluaXRcbiAgICAgICAqIEByZXR1cm4ge1NoYWRvd1Jvb3R9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uKGluaXQpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IE5hdGl2ZS5FbGVtZW50X2F0dGFjaFNoYWRvdy5jYWxsKHRoaXMsIGluaXQpO1xuICAgICAgICB0aGlzLl9fQ0Vfc2hhZG93Um9vdCA9IHNoYWRvd1Jvb3Q7XG4gICAgICAgIHJldHVybiBzaGFkb3dSb290O1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdDdXN0b20gRWxlbWVudHM6IGBFbGVtZW50I2F0dGFjaFNoYWRvd2Agd2FzIG5vdCBwYXRjaGVkLicpO1xuICB9XG5cblxuICBmdW5jdGlvbiBwYXRjaF9pbm5lckhUTUwoZGVzdGluYXRpb24sIGJhc2VEZXNjcmlwdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3RpbmF0aW9uLCAnaW5uZXJIVE1MJywge1xuICAgICAgZW51bWVyYWJsZTogYmFzZURlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogYmFzZURlc2NyaXB0b3IuZ2V0LFxuICAgICAgc2V0OiAvKiogQHRoaXMge0VsZW1lbnR9ICovIGZ1bmN0aW9uKGh0bWxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaXNDb25uZWN0ZWQgPSBVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcyk7XG5cbiAgICAgICAgLy8gTk9URTogSW4gSUUxMSwgd2hlbiB1c2luZyB0aGUgbmF0aXZlIGBpbm5lckhUTUxgIHNldHRlciwgYWxsIG5vZGVzXG4gICAgICAgIC8vIHRoYXQgd2VyZSBwcmV2aW91c2x5IGRlc2NlbmRhbnRzIG9mIHRoZSBjb250ZXh0IGVsZW1lbnQgaGF2ZSBhbGwgb2ZcbiAgICAgICAgLy8gdGhlaXIgY2hpbGRyZW4gcmVtb3ZlZCBhcyBwYXJ0IG9mIHRoZSBzZXQgLSB0aGUgZW50aXJlIHN1YnRyZWUgaXNcbiAgICAgICAgLy8gJ2Rpc2Fzc2VtYmxlZCcuIFRoaXMgd29yayBhcm91bmQgd2Fsa3MgdGhlIHN1YnRyZWUgKmJlZm9yZSogdXNpbmcgdGhlXG4gICAgICAgIC8vIG5hdGl2ZSBzZXR0ZXIuXG4gICAgICAgIC8qKiBAdHlwZSB7IUFycmF5PCFFbGVtZW50Pnx1bmRlZmluZWR9ICovXG4gICAgICAgIGxldCByZW1vdmVkRWxlbWVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgIHJlbW92ZWRFbGVtZW50cyA9IFtdO1xuICAgICAgICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyh0aGlzLCBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIHJlbW92ZWRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFzZURlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgaHRtbFN0cmluZyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWRFbGVtZW50cykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVtb3ZlZEVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuX19DRV9zdGF0ZSA9PT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGVsZW1lbnQncyBvd25lciBkb2N1bWVudCBpc1xuICAgICAgICAvLyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICAgICAgICBpZiAoIXRoaXMub3duZXJEb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLnBhdGNoVHJlZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbFN0cmluZztcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlLkVsZW1lbnRfaW5uZXJIVE1MICYmIE5hdGl2ZS5FbGVtZW50X2lubmVySFRNTC5nZXQpIHtcbiAgICBwYXRjaF9pbm5lckhUTUwoRWxlbWVudC5wcm90b3R5cGUsIE5hdGl2ZS5FbGVtZW50X2lubmVySFRNTCk7XG4gIH0gZWxzZSBpZiAoTmF0aXZlLkhUTUxFbGVtZW50X2lubmVySFRNTCAmJiBOYXRpdmUuSFRNTEVsZW1lbnRfaW5uZXJIVE1MLmdldCkge1xuICAgIHBhdGNoX2lubmVySFRNTChIVE1MRWxlbWVudC5wcm90b3R5cGUsIE5hdGl2ZS5IVE1MRWxlbWVudF9pbm5lckhUTUwpO1xuICB9IGVsc2Uge1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICBjb25zdCByYXdEaXYgPSBOYXRpdmUuRG9jdW1lbnRfY3JlYXRlRWxlbWVudC5jYWxsKGRvY3VtZW50LCAnZGl2Jyk7XG5cbiAgICBpbnRlcm5hbHMuYWRkUGF0Y2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcGF0Y2hfaW5uZXJIVE1MKGVsZW1lbnQsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAvLyBJbXBsZW1lbnRzIGdldHRpbmcgYGlubmVySFRNTGAgYnkgcGVyZm9ybWluZyBhbiB1bnBhdGNoZWQgYGNsb25lTm9kZWBcbiAgICAgICAgLy8gb2YgdGhlIGVsZW1lbnQgYW5kIHJldHVybmluZyB0aGUgcmVzdWx0aW5nIGVsZW1lbnQncyBgaW5uZXJIVE1MYC5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyB0b28gZXhwZW5zaXZlP1xuICAgICAgICBnZXQ6IC8qKiBAdGhpcyB7RWxlbWVudH0gKi8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE5hdGl2ZS5Ob2RlX2Nsb25lTm9kZS5jYWxsKHRoaXMsIHRydWUpLmlubmVySFRNTDtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gSW1wbGVtZW50cyBzZXR0aW5nIGBpbm5lckhUTUxgIGJ5IGNyZWF0aW5nIGFuIHVucGF0Y2hlZCBlbGVtZW50LFxuICAgICAgICAvLyBzZXR0aW5nIGBpbm5lckhUTUxgIG9mIHRoYXQgZWxlbWVudCBhbmQgcmVwbGFjaW5nIHRoZSB0YXJnZXRcbiAgICAgICAgLy8gZWxlbWVudCdzIGNoaWxkcmVuIHdpdGggdGhvc2Ugb2YgdGhlIHVucGF0Y2hlZCBlbGVtZW50LlxuICAgICAgICBzZXQ6IC8qKiBAdGhpcyB7RWxlbWVudH0gKi8gZnVuY3Rpb24oYXNzaWduZWRWYWx1ZSkge1xuICAgICAgICAgIC8vIE5PVEU6IHJlLXJvdXRlIHRvIGBjb250ZW50YCBmb3IgYHRlbXBsYXRlYCBlbGVtZW50cy5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGRvIHRoaXMgYmVjYXVzZSBgdGVtcGxhdGUuYXBwZW5kQ2hpbGRgIGRvZXMgbm90XG4gICAgICAgICAgLy8gcm91dGUgaW50byBgdGVtcGxhdGUuY29udGVudGAuXG4gICAgICAgICAgLyoqIEB0eXBlIHshTm9kZX0gKi9cbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5sb2NhbE5hbWUgPT09ICd0ZW1wbGF0ZScgPyAoLyoqIEB0eXBlIHshSFRNTFRlbXBsYXRlRWxlbWVudH0gKi8gKHRoaXMpKS5jb250ZW50IDogdGhpcztcbiAgICAgICAgICByYXdEaXYuaW5uZXJIVE1MID0gYXNzaWduZWRWYWx1ZTtcblxuICAgICAgICAgIHdoaWxlIChjb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbChjb250ZW50LCBjb250ZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAocmF3RGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfYXBwZW5kQ2hpbGQuY2FsbChjb250ZW50LCByYXdEaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChFbGVtZW50LnByb3RvdHlwZSwgJ3NldEF0dHJpYnV0ZScsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0VsZW1lbnR9XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lLCBuZXdWYWx1ZSkge1xuICAgICAgLy8gRmFzdCBwYXRoIGZvciBub24tY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgaWYgKHRoaXMuX19DRV9zdGF0ZSAhPT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZS5FbGVtZW50X3NldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGUuY2FsbCh0aGlzLCBuYW1lKTtcbiAgICAgIE5hdGl2ZS5FbGVtZW50X3NldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIG5ld1ZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlLmNhbGwodGhpcywgbmFtZSk7XG4gICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbnVsbCk7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKEVsZW1lbnQucHJvdG90eXBlLCAnc2V0QXR0cmlidXRlTlMnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lc3BhY2UsIG5hbWUsIG5ld1ZhbHVlKSB7XG4gICAgICAvLyBGYXN0IHBhdGggZm9yIG5vbi1jdXN0b20gZWxlbWVudHMuXG4gICAgICBpZiAodGhpcy5fX0NFX3N0YXRlICE9PSBDRVN0YXRlLmN1c3RvbSkge1xuICAgICAgICByZXR1cm4gTmF0aXZlLkVsZW1lbnRfc2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICBOYXRpdmUuRWxlbWVudF9zZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSwgbmV3VmFsdWUpO1xuICAgICAgbmV3VmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgICB9KTtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRWxlbWVudC5wcm90b3R5cGUsICdyZW1vdmVBdHRyaWJ1dGUnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24obmFtZSkge1xuICAgICAgLy8gRmFzdCBwYXRoIGZvciBub24tY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgaWYgKHRoaXMuX19DRV9zdGF0ZSAhPT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZS5FbGVtZW50X3JlbW92ZUF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IE5hdGl2ZS5FbGVtZW50X2dldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgTmF0aXZlLkVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlLmNhbGwodGhpcywgbmFtZSk7XG4gICAgICBpZiAob2xkVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaW50ZXJuYWxzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLCBuYW1lLCBvbGRWYWx1ZSwgbnVsbCwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKEVsZW1lbnQucHJvdG90eXBlLCAncmVtb3ZlQXR0cmlidXRlTlMnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lc3BhY2UsIG5hbWUpIHtcbiAgICAgIC8vIEZhc3QgcGF0aCBmb3Igbm9uLWN1c3RvbSBlbGVtZW50cy5cbiAgICAgIGlmICh0aGlzLl9fQ0Vfc3RhdGUgIT09IENFU3RhdGUuY3VzdG9tKSB7XG4gICAgICAgIHJldHVybiBOYXRpdmUuRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgTmF0aXZlLkVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgLy8gSW4gb2xkZXIgYnJvd3NlcnMsIGBFbGVtZW50I2dldEF0dHJpYnV0ZU5TYCBtYXkgcmV0dXJuIHRoZSBlbXB0eSBzdHJpbmdcbiAgICAgIC8vIGluc3RlYWQgb2YgbnVsbCBpZiB0aGUgYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0LiBGb3IgZGV0YWlscywgc2VlO1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0QXR0cmlidXRlTlMjTm90ZXNcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gIGZ1bmN0aW9uIHBhdGNoX2luc2VydEFkamFjZW50RWxlbWVudChkZXN0aW5hdGlvbiwgYmFzZU1ldGhvZCkge1xuICAgIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChkZXN0aW5hdGlvbiwgJ2luc2VydEFkamFjZW50RWxlbWVudCcsXG4gICAgICAvKipcbiAgICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHdoZXJlXG4gICAgICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAgICAgKiBAcmV0dXJuIHs/RWxlbWVudH1cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24od2hlcmUsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgd2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpbnNlcnRlZEVsZW1lbnQgPSAvKiogQHR5cGUgeyFFbGVtZW50fSAqL1xuICAgICAgICAgIChiYXNlTWV0aG9kLmNhbGwodGhpcywgd2hlcmUsIGVsZW1lbnQpKTtcblxuICAgICAgICBpZiAod2FzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZChpbnNlcnRlZEVsZW1lbnQpKSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnNlcnRlZEVsZW1lbnQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGlmIChOYXRpdmUuSFRNTEVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KSB7XG4gICAgcGF0Y2hfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KEhUTUxFbGVtZW50LnByb3RvdHlwZSwgTmF0aXZlLkhUTUxFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoTmF0aXZlLkVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KSB7XG4gICAgcGF0Y2hfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KEVsZW1lbnQucHJvdG90eXBlLCBOYXRpdmUuRWxlbWVudF9pbnNlcnRBZGphY2VudEVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybignQ3VzdG9tIEVsZW1lbnRzOiBgRWxlbWVudCNpbnNlcnRBZGphY2VudEVsZW1lbnRgIHdhcyBub3QgcGF0Y2hlZC4nKTtcbiAgfVxuXG5cbiAgUGF0Y2hQYXJlbnROb2RlKGludGVybmFscywgRWxlbWVudC5wcm90b3R5cGUsIHtcbiAgICBwcmVwZW5kOiBOYXRpdmUuRWxlbWVudF9wcmVwZW5kLFxuICAgIGFwcGVuZDogTmF0aXZlLkVsZW1lbnRfYXBwZW5kLFxuICB9KTtcblxuICBQYXRjaENoaWxkTm9kZShpbnRlcm5hbHMsIEVsZW1lbnQucHJvdG90eXBlLCB7XG4gICAgYmVmb3JlOiBOYXRpdmUuRWxlbWVudF9iZWZvcmUsXG4gICAgYWZ0ZXI6IE5hdGl2ZS5FbGVtZW50X2FmdGVyLFxuICAgIHJlcGxhY2VXaXRoOiBOYXRpdmUuRWxlbWVudF9yZXBsYWNlV2l0aCxcbiAgICByZW1vdmU6IE5hdGl2ZS5FbGVtZW50X3JlbW92ZSxcbiAgfSk7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5cbmltcG9ydCBDdXN0b21FbGVtZW50SW50ZXJuYWxzIGZyb20gJy4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5IGZyb20gJy4vQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LmpzJztcblxuaW1wb3J0IFBhdGNoSFRNTEVsZW1lbnQgZnJvbSAnLi9QYXRjaC9IVE1MRWxlbWVudC5qcyc7XG5pbXBvcnQgUGF0Y2hEb2N1bWVudCBmcm9tICcuL1BhdGNoL0RvY3VtZW50LmpzJztcbmltcG9ydCBQYXRjaE5vZGUgZnJvbSAnLi9QYXRjaC9Ob2RlLmpzJztcbmltcG9ydCBQYXRjaEVsZW1lbnQgZnJvbSAnLi9QYXRjaC9FbGVtZW50LmpzJztcblxuY29uc3QgcHJpb3JDdXN0b21FbGVtZW50cyA9IHdpbmRvd1snY3VzdG9tRWxlbWVudHMnXTtcblxuaWYgKCFwcmlvckN1c3RvbUVsZW1lbnRzIHx8XG4gICAgIHByaW9yQ3VzdG9tRWxlbWVudHNbJ2ZvcmNlUG9seWZpbGwnXSB8fFxuICAgICAodHlwZW9mIHByaW9yQ3VzdG9tRWxlbWVudHNbJ2RlZmluZSddICE9ICdmdW5jdGlvbicpIHx8XG4gICAgICh0eXBlb2YgcHJpb3JDdXN0b21FbGVtZW50c1snZ2V0J10gIT0gJ2Z1bmN0aW9uJykpIHtcbiAgLyoqIEB0eXBlIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gKi9cbiAgY29uc3QgaW50ZXJuYWxzID0gbmV3IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMoKTtcblxuICBQYXRjaEhUTUxFbGVtZW50KGludGVybmFscyk7XG4gIFBhdGNoRG9jdW1lbnQoaW50ZXJuYWxzKTtcbiAgUGF0Y2hOb2RlKGludGVybmFscyk7XG4gIFBhdGNoRWxlbWVudChpbnRlcm5hbHMpO1xuXG4gIC8vIFRoZSBtYWluIGRvY3VtZW50IGlzIGFsd2F5cyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICBkb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5ID0gdHJ1ZTtcblxuICAvKiogQHR5cGUgeyFDdXN0b21FbGVtZW50UmVnaXN0cnl9ICovXG4gIGNvbnN0IGN1c3RvbUVsZW1lbnRzID0gbmV3IEN1c3RvbUVsZW1lbnRSZWdpc3RyeShpbnRlcm5hbHMpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csICdjdXN0b21FbGVtZW50cycsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3VzdG9tRWxlbWVudHMsXG4gIH0pO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE0IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vLyBAdmVyc2lvbiAwLjcuMjJcblxuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBpZiAoZ2xvYmFsLkpzTXV0YXRpb25PYnNlcnZlcikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVnaXN0cmF0aW9uc1RhYmxlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHNldEltbWVkaWF0ZTtcbiAgaWYgKC9UcmlkZW50fEVkZ2UvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICBzZXRJbW1lZGlhdGUgPSBzZXRUaW1lb3V0O1xuICB9IGVsc2UgaWYgKHdpbmRvdy5zZXRJbW1lZGlhdGUpIHtcbiAgICBzZXRJbW1lZGlhdGUgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICB9IGVsc2Uge1xuICAgIHZhciBzZXRJbW1lZGlhdGVRdWV1ZSA9IFtdO1xuICAgIHZhciBzZW50aW5lbCA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUuZGF0YSA9PT0gc2VudGluZWwpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gc2V0SW1tZWRpYXRlUXVldWU7XG4gICAgICAgIHNldEltbWVkaWF0ZVF1ZXVlID0gW107XG4gICAgICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oZnVuYykge1xuICAgICAgc2V0SW1tZWRpYXRlUXVldWUucHVzaChmdW5jKTtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShzZW50aW5lbCwgXCIqXCIpO1xuICAgIH07XG4gIH1cbiAgdmFyIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciBzY2hlZHVsZWRPYnNlcnZlcnMgPSBbXTtcbiAgZnVuY3Rpb24gc2NoZWR1bGVDYWxsYmFjayhvYnNlcnZlcikge1xuICAgIHNjaGVkdWxlZE9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICBpZiAoIWlzU2NoZWR1bGVkKSB7XG4gICAgICBpc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICBzZXRJbW1lZGlhdGUoZGlzcGF0Y2hDYWxsYmFja3MpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB3cmFwSWZOZWVkZWQobm9kZSkge1xuICAgIHJldHVybiB3aW5kb3cuU2hhZG93RE9NUG9seWZpbGwgJiYgd2luZG93LlNoYWRvd0RPTVBvbHlmaWxsLndyYXBJZk5lZWRlZChub2RlKSB8fCBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIGRpc3BhdGNoQ2FsbGJhY2tzKCkge1xuICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgdmFyIG9ic2VydmVycyA9IHNjaGVkdWxlZE9ic2VydmVycztcbiAgICBzY2hlZHVsZWRPYnNlcnZlcnMgPSBbXTtcbiAgICBvYnNlcnZlcnMuc29ydChmdW5jdGlvbihvMSwgbzIpIHtcbiAgICAgIHJldHVybiBvMS51aWRfIC0gbzIudWlkXztcbiAgICB9KTtcbiAgICB2YXIgYW55Tm9uRW1wdHkgPSBmYWxzZTtcbiAgICBvYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbihvYnNlcnZlcikge1xuICAgICAgdmFyIHF1ZXVlID0gb2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgICAgIHJlbW92ZVRyYW5zaWVudE9ic2VydmVyc0ZvcihvYnNlcnZlcik7XG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG9ic2VydmVyLmNhbGxiYWNrXyhxdWV1ZSwgb2JzZXJ2ZXIpO1xuICAgICAgICBhbnlOb25FbXB0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGFueU5vbkVtcHR5KSBkaXNwYXRjaENhbGxiYWNrcygpO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZVRyYW5zaWVudE9ic2VydmVyc0ZvcihvYnNlcnZlcikge1xuICAgIG9ic2VydmVyLm5vZGVzXy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldChub2RlKTtcbiAgICAgIGlmICghcmVnaXN0cmF0aW9ucykgcmV0dXJuO1xuICAgICAgcmVnaXN0cmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xuICAgICAgICBpZiAocmVnaXN0cmF0aW9uLm9ic2VydmVyID09PSBvYnNlcnZlcikgcmVnaXN0cmF0aW9uLnJlbW92ZVRyYW5zaWVudE9ic2VydmVycygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZm9yRWFjaEFuY2VzdG9yQW5kT2JzZXJ2ZXJFbnF1ZXVlUmVjb3JkKHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBub2RlID0gdGFyZ2V0OyBub2RlOyBub2RlID0gbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICB2YXIgcmVnaXN0cmF0aW9ucyA9IHJlZ2lzdHJhdGlvbnNUYWJsZS5nZXQobm9kZSk7XG4gICAgICBpZiAocmVnaXN0cmF0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmVnaXN0cmF0aW9uID0gcmVnaXN0cmF0aW9uc1tqXTtcbiAgICAgICAgICB2YXIgb3B0aW9ucyA9IHJlZ2lzdHJhdGlvbi5vcHRpb25zO1xuICAgICAgICAgIGlmIChub2RlICE9PSB0YXJnZXQgJiYgIW9wdGlvbnMuc3VidHJlZSkgY29udGludWU7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGNhbGxiYWNrKG9wdGlvbnMpO1xuICAgICAgICAgIGlmIChyZWNvcmQpIHJlZ2lzdHJhdGlvbi5lbnF1ZXVlKHJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIHVpZENvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBKc011dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xuICAgIHRoaXMubm9kZXNfID0gW107XG4gICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgIHRoaXMudWlkXyA9ICsrdWlkQ291bnRlcjtcbiAgfVxuICBKc011dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlID0ge1xuICAgIG9ic2VydmU6IGZ1bmN0aW9uKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgdGFyZ2V0ID0gd3JhcElmTmVlZGVkKHRhcmdldCk7XG4gICAgICBpZiAoIW9wdGlvbnMuY2hpbGRMaXN0ICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgJiYgIW9wdGlvbnMuY2hhcmFjdGVyRGF0YSB8fCBvcHRpb25zLmF0dHJpYnV0ZU9sZFZhbHVlICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgfHwgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIgJiYgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIubGVuZ3RoICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgfHwgb3B0aW9ucy5jaGFyYWN0ZXJEYXRhT2xkVmFsdWUgJiYgIW9wdGlvbnMuY2hhcmFjdGVyRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldCh0YXJnZXQpO1xuICAgICAgaWYgKCFyZWdpc3RyYXRpb25zKSByZWdpc3RyYXRpb25zVGFibGUuc2V0KHRhcmdldCwgcmVnaXN0cmF0aW9ucyA9IFtdKTtcbiAgICAgIHZhciByZWdpc3RyYXRpb247XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbnNbaV0ub2JzZXJ2ZXIgPT09IHRoaXMpIHtcbiAgICAgICAgICByZWdpc3RyYXRpb24gPSByZWdpc3RyYXRpb25zW2ldO1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbi5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgICByZWdpc3RyYXRpb24ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghcmVnaXN0cmF0aW9uKSB7XG4gICAgICAgIHJlZ2lzdHJhdGlvbiA9IG5ldyBSZWdpc3RyYXRpb24odGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgcmVnaXN0cmF0aW9ucy5wdXNoKHJlZ2lzdHJhdGlvbik7XG4gICAgICAgIHRoaXMubm9kZXNfLnB1c2godGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJlZ2lzdHJhdGlvbi5hZGRMaXN0ZW5lcnMoKTtcbiAgICB9LFxuICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5ub2Rlc18uZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldChub2RlKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RyYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHJlZ2lzdHJhdGlvbiA9IHJlZ2lzdHJhdGlvbnNbaV07XG4gICAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbi5vYnNlcnZlciA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9uLnJlbW92ZUxpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgIH0sXG4gICAgdGFrZVJlY29yZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvcHlPZlJlY29yZHMgPSB0aGlzLnJlY29yZHNfO1xuICAgICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgICAgcmV0dXJuIGNvcHlPZlJlY29yZHM7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBNdXRhdGlvblJlY29yZCh0eXBlLCB0YXJnZXQpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuYWRkZWROb2RlcyA9IFtdO1xuICAgIHRoaXMucmVtb3ZlZE5vZGVzID0gW107XG4gICAgdGhpcy5wcmV2aW91c1NpYmxpbmcgPSBudWxsO1xuICAgIHRoaXMubmV4dFNpYmxpbmcgPSBudWxsO1xuICAgIHRoaXMuYXR0cmlidXRlTmFtZSA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lc3BhY2UgPSBudWxsO1xuICAgIHRoaXMub2xkVmFsdWUgPSBudWxsO1xuICB9XG4gIGZ1bmN0aW9uIGNvcHlNdXRhdGlvblJlY29yZChvcmlnaW5hbCkge1xuICAgIHZhciByZWNvcmQgPSBuZXcgTXV0YXRpb25SZWNvcmQob3JpZ2luYWwudHlwZSwgb3JpZ2luYWwudGFyZ2V0KTtcbiAgICByZWNvcmQuYWRkZWROb2RlcyA9IG9yaWdpbmFsLmFkZGVkTm9kZXMuc2xpY2UoKTtcbiAgICByZWNvcmQucmVtb3ZlZE5vZGVzID0gb3JpZ2luYWwucmVtb3ZlZE5vZGVzLnNsaWNlKCk7XG4gICAgcmVjb3JkLnByZXZpb3VzU2libGluZyA9IG9yaWdpbmFsLnByZXZpb3VzU2libGluZztcbiAgICByZWNvcmQubmV4dFNpYmxpbmcgPSBvcmlnaW5hbC5uZXh0U2libGluZztcbiAgICByZWNvcmQuYXR0cmlidXRlTmFtZSA9IG9yaWdpbmFsLmF0dHJpYnV0ZU5hbWU7XG4gICAgcmVjb3JkLmF0dHJpYnV0ZU5hbWVzcGFjZSA9IG9yaWdpbmFsLmF0dHJpYnV0ZU5hbWVzcGFjZTtcbiAgICByZWNvcmQub2xkVmFsdWUgPSBvcmlnaW5hbC5vbGRWYWx1ZTtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG4gIHZhciBjdXJyZW50UmVjb3JkLCByZWNvcmRXaXRoT2xkVmFsdWU7XG4gIGZ1bmN0aW9uIGdldFJlY29yZCh0eXBlLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gY3VycmVudFJlY29yZCA9IG5ldyBNdXRhdGlvblJlY29yZCh0eXBlLCB0YXJnZXQpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFJlY29yZFdpdGhPbGRWYWx1ZShvbGRWYWx1ZSkge1xuICAgIGlmIChyZWNvcmRXaXRoT2xkVmFsdWUpIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gICAgcmVjb3JkV2l0aE9sZFZhbHVlID0gY29weU11dGF0aW9uUmVjb3JkKGN1cnJlbnRSZWNvcmQpO1xuICAgIHJlY29yZFdpdGhPbGRWYWx1ZS5vbGRWYWx1ZSA9IG9sZFZhbHVlO1xuICAgIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gY2xlYXJSZWNvcmRzKCkge1xuICAgIGN1cnJlbnRSZWNvcmQgPSByZWNvcmRXaXRoT2xkVmFsdWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gcmVjb3JkUmVwcmVzZW50c0N1cnJlbnRNdXRhdGlvbihyZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkID09PSByZWNvcmRXaXRoT2xkVmFsdWUgfHwgcmVjb3JkID09PSBjdXJyZW50UmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIHNlbGVjdFJlY29yZChsYXN0UmVjb3JkLCBuZXdSZWNvcmQpIHtcbiAgICBpZiAobGFzdFJlY29yZCA9PT0gbmV3UmVjb3JkKSByZXR1cm4gbGFzdFJlY29yZDtcbiAgICBpZiAocmVjb3JkV2l0aE9sZFZhbHVlICYmIHJlY29yZFJlcHJlc2VudHNDdXJyZW50TXV0YXRpb24obGFzdFJlY29yZCkpIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZnVuY3Rpb24gUmVnaXN0cmF0aW9uKG9ic2VydmVyLCB0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSBbXTtcbiAgfVxuICBSZWdpc3RyYXRpb24ucHJvdG90eXBlID0ge1xuICAgIGVucXVldWU6IGZ1bmN0aW9uKHJlY29yZCkge1xuICAgICAgdmFyIHJlY29yZHMgPSB0aGlzLm9ic2VydmVyLnJlY29yZHNfO1xuICAgICAgdmFyIGxlbmd0aCA9IHJlY29yZHMubGVuZ3RoO1xuICAgICAgaWYgKHJlY29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgbGFzdFJlY29yZCA9IHJlY29yZHNbbGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciByZWNvcmRUb1JlcGxhY2VMYXN0ID0gc2VsZWN0UmVjb3JkKGxhc3RSZWNvcmQsIHJlY29yZCk7XG4gICAgICAgIGlmIChyZWNvcmRUb1JlcGxhY2VMYXN0KSB7XG4gICAgICAgICAgcmVjb3Jkc1tsZW5ndGggLSAxXSA9IHJlY29yZFRvUmVwbGFjZUxhc3Q7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlZHVsZUNhbGxiYWNrKHRoaXMub2JzZXJ2ZXIpO1xuICAgICAgfVxuICAgICAgcmVjb3Jkc1tsZW5ndGhdID0gcmVjb3JkO1xuICAgIH0sXG4gICAgYWRkTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzXyh0aGlzLnRhcmdldCk7XG4gICAgfSxcbiAgICBhZGRMaXN0ZW5lcnNfOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUF0dHJNb2RpZmllZFwiLCB0aGlzLCB0cnVlKTtcbiAgICAgIGlmIChvcHRpb25zLmNoYXJhY3RlckRhdGEpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZFwiLCB0aGlzLCB0cnVlKTtcbiAgICAgIGlmIChvcHRpb25zLmNoaWxkTGlzdCkgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hpbGRMaXN0IHx8IG9wdGlvbnMuc3VidHJlZSkgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZVJlbW92ZWRcIiwgdGhpcywgdHJ1ZSk7XG4gICAgfSxcbiAgICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnNfKHRoaXMudGFyZ2V0KTtcbiAgICB9LFxuICAgIHJlbW92ZUxpc3RlbmVyc186IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlcykgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQXR0ck1vZGlmaWVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hhcmFjdGVyRGF0YSkgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ2hhcmFjdGVyRGF0YU1vZGlmaWVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hpbGRMaXN0KSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Ob2RlSW5zZXJ0ZWRcIiwgdGhpcywgdHJ1ZSk7XG4gICAgICBpZiAob3B0aW9ucy5jaGlsZExpc3QgfHwgb3B0aW9ucy5zdWJ0cmVlKSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZFwiLCB0aGlzLCB0cnVlKTtcbiAgICB9LFxuICAgIGFkZFRyYW5zaWVudE9ic2VydmVyOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdGhpcy50YXJnZXQpIHJldHVybjtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzXyhub2RlKTtcbiAgICAgIHRoaXMudHJhbnNpZW50T2JzZXJ2ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdmFyIHJlZ2lzdHJhdGlvbnMgPSByZWdpc3RyYXRpb25zVGFibGUuZ2V0KG5vZGUpO1xuICAgICAgaWYgKCFyZWdpc3RyYXRpb25zKSByZWdpc3RyYXRpb25zVGFibGUuc2V0KG5vZGUsIHJlZ2lzdHJhdGlvbnMgPSBbXSk7XG4gICAgICByZWdpc3RyYXRpb25zLnB1c2godGhpcyk7XG4gICAgfSxcbiAgICByZW1vdmVUcmFuc2llbnRPYnNlcnZlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXM7XG4gICAgICB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSBbXTtcbiAgICAgIHRyYW5zaWVudE9ic2VydmVkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzXyhub2RlKTtcbiAgICAgICAgdmFyIHJlZ2lzdHJhdGlvbnMgPSByZWdpc3RyYXRpb25zVGFibGUuZ2V0KG5vZGUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uc1tpXSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG4gICAgaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgIGNhc2UgXCJET01BdHRyTW9kaWZpZWRcIjpcbiAgICAgICAgdmFyIG5hbWUgPSBlLmF0dHJOYW1lO1xuICAgICAgICB2YXIgbmFtZXNwYWNlID0gZS5yZWxhdGVkTm9kZS5uYW1lc3BhY2VVUkk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIHJlY29yZCA9IG5ldyBnZXRSZWNvcmQoXCJhdHRyaWJ1dGVzXCIsIHRhcmdldCk7XG4gICAgICAgIHJlY29yZC5hdHRyaWJ1dGVOYW1lID0gbmFtZTtcbiAgICAgICAgcmVjb3JkLmF0dHJpYnV0ZU5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gZS5hdHRyQ2hhbmdlID09PSBNdXRhdGlvbkV2ZW50LkFERElUSU9OID8gbnVsbCA6IGUucHJldlZhbHVlO1xuICAgICAgICBmb3JFYWNoQW5jZXN0b3JBbmRPYnNlcnZlckVucXVldWVSZWNvcmQodGFyZ2V0LCBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLmF0dHJpYnV0ZXMpIHJldHVybjtcbiAgICAgICAgICBpZiAob3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIgJiYgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIubGVuZ3RoICYmIG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyLmluZGV4T2YobmFtZSkgPT09IC0xICYmIG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyLmluZGV4T2YobmFtZXNwYWNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlT2xkVmFsdWUpIHJldHVybiBnZXRSZWNvcmRXaXRoT2xkVmFsdWUob2xkVmFsdWUpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgIGNhc2UgXCJET01DaGFyYWN0ZXJEYXRhTW9kaWZpZWRcIjpcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgcmVjb3JkID0gZ2V0UmVjb3JkKFwiY2hhcmFjdGVyRGF0YVwiLCB0YXJnZXQpO1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBlLnByZXZWYWx1ZTtcbiAgICAgICAgZm9yRWFjaEFuY2VzdG9yQW5kT2JzZXJ2ZXJFbnF1ZXVlUmVjb3JkKHRhcmdldCwgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5jaGFyYWN0ZXJEYXRhKSByZXR1cm47XG4gICAgICAgICAgaWYgKG9wdGlvbnMuY2hhcmFjdGVyRGF0YU9sZFZhbHVlKSByZXR1cm4gZ2V0UmVjb3JkV2l0aE9sZFZhbHVlKG9sZFZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICBjYXNlIFwiRE9NTm9kZVJlbW92ZWRcIjpcbiAgICAgICAgdGhpcy5hZGRUcmFuc2llbnRPYnNlcnZlcihlLnRhcmdldCk7XG5cbiAgICAgICBjYXNlIFwiRE9NTm9kZUluc2VydGVkXCI6XG4gICAgICAgIHZhciBjaGFuZ2VkTm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgYWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzO1xuICAgICAgICBpZiAoZS50eXBlID09PSBcIkRPTU5vZGVJbnNlcnRlZFwiKSB7XG4gICAgICAgICAgYWRkZWROb2RlcyA9IFsgY2hhbmdlZE5vZGUgXTtcbiAgICAgICAgICByZW1vdmVkTm9kZXMgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRlZE5vZGVzID0gW107XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzID0gWyBjaGFuZ2VkTm9kZSBdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91c1NpYmxpbmcgPSBjaGFuZ2VkTm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGNoYW5nZWROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gZ2V0UmVjb3JkKFwiY2hpbGRMaXN0XCIsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICByZWNvcmQuYWRkZWROb2RlcyA9IGFkZGVkTm9kZXM7XG4gICAgICAgIHJlY29yZC5yZW1vdmVkTm9kZXMgPSByZW1vdmVkTm9kZXM7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIHJlY29yZC5uZXh0U2libGluZyA9IG5leHRTaWJsaW5nO1xuICAgICAgICBmb3JFYWNoQW5jZXN0b3JBbmRPYnNlcnZlckVucXVldWVSZWNvcmQoZS5yZWxhdGVkTm9kZSwgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5jaGlsZExpc3QpIHJldHVybjtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNsZWFyUmVjb3JkcygpO1xuICAgIH1cbiAgfTtcbiAgZ2xvYmFsLkpzTXV0YXRpb25PYnNlcnZlciA9IEpzTXV0YXRpb25PYnNlcnZlcjtcbiAgaWYgKCFnbG9iYWwuTXV0YXRpb25PYnNlcnZlcikge1xuICAgIGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyID0gSnNNdXRhdGlvbk9ic2VydmVyO1xuICAgIEpzTXV0YXRpb25PYnNlcnZlci5faXNQb2x5ZmlsbGVkID0gdHJ1ZTtcbiAgfVxufSkoc2VsZik7XG4iLCIvKlxuQ29weXJpZ2h0IChjKSAyMDEyIEJhcm5lc2FuZG5vYmxlLmNvbSwgbGxjLCBEb25hdm9uIFdlc3QsIGFuZCBEb21lbmljIERlbmljb2xhXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbk5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcbkxJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbk9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciBzZXRJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3MpIHtcbiAgICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHBhcnRpYWxseUFwcGxpZWQuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgdGhlIHNhbWUgYXJndW1lbnRzIGFzIHNldEltbWVkaWF0ZSwgYnV0XG4gICAgLy8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVxdWlyZXMgbm8gYXJndW1lbnRzLlxuICAgIGZ1bmN0aW9uIHBhcnRpYWxseUFwcGxpZWQoaGFuZGxlcikge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIChuZXcgRnVuY3Rpb24oXCJcIiArIGhhbmRsZXIpKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocGFydGlhbGx5QXBwbGllZChydW5JZlByZXNlbnQsIGhhbmRsZSksIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGFzaygpO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICBzZXRJbW1lZGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKHBhcnRpYWxseUFwcGxpZWQocnVuSWZQcmVzZW50LCBoYW5kbGUpKTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEltbWVkaWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNldEltbWVkaWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBzZXRJbW1lZGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgc2V0VGltZW91dChwYXJ0aWFsbHlBcHBsaWVkKHJ1bklmUHJlc2VudCwgaGFuZGxlKSwgMCk7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0oc2VsZikpO1xuIiwiLy8gQ2F1dGlvbjpcbi8vIERvIG5vdCByZXBsYWNlIHRoaXMgaW1wb3J0IHN0YXRlbWVudCB3aXRoIGNvZGVzLlxuLy9cbi8vIElmIHlvdSByZXBsYWNlIHRoaXMgaW1wb3J0IHN0YXRlbWVudCB3aXRoIGNvZGVzLFxuLy8gdGhlIGNvZGVzIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIGZvbGxvd2luZyBwb2x5ZmlsbHMgYXJlIGltcG9ydGVkXG4vLyBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnRzIGFyZSBob2lzdGVkIGR1cmluZyBjb21waWxhdGlvbi5cbmltcG9ydCAnLi9wb2x5ZmlsbC1zd2l0Y2hlcyc7XG5cbi8vIFBvbHlmaWxsIEVDTUFTY3JpcHQgc3RhbmRhcmQgZmVhdHVyZXMgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mJztcbmltcG9ydCAnY29yZS1qcy9mbi9zZXQnO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL21hcCc7XG5pbXBvcnQgJ2NvcmUtanMvZm4vd2Vhay1tYXAnO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL2FycmF5L2Zyb20nO1xuXG4vLyBQb2x5ZmlsbCBDdXN0b20gRWxlbWVudHMgdjEgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICdAb25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL2N1c3RvbS1lbGVtZW50cyc7XG5cbi8vIFBvbHlmaWxsIE11dGF0aW9uT2JzZXJ2ZXIgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICcuL011dGF0aW9uT2JzZXJ2ZXJAMC43LjIyL011dGF0aW9uT2JzZXJ2ZXIuanMnO1xuXG4vLyBQb2x5ZmlsbCBzZXRJbW1lZGlhdGUgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICcuL3NldEltbWVkaWF0ZUAxLjAuMittb2Qvc2V0SW1tZWRpYXRlLmpzJztcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIERFRkFVTFRfVklFV1BPUlQgPSAnd2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSxtYXhpbXVtLXNjYWxlPTEsbWluaW11bS1zY2FsZT0xLHVzZXItc2NhbGFibGU9bm8nO1xuXG4gIHZhciBWaWV3cG9ydCA9IHsgXG4gICAgZW5zdXJlVmlld3BvcnRFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2aWV3cG9ydEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cbiAgICAgIGlmICghdmlld3BvcnRFbGVtZW50KSB7XG4gICAgICAgIHZpZXdwb3J0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgdmlld3BvcnRFbGVtZW50Lm5hbWUgPSAndmlld3BvcnQnO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHZpZXdwb3J0RWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2aWV3cG9ydEVsZW1lbnQ7XG4gICAgfSxcblxuICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2aWV3cG9ydEVsZW1lbnQgPSBWaWV3cG9ydC5lbnN1cmVWaWV3cG9ydEVsZW1lbnQoKTtcblxuICAgICAgaWYgKCF2aWV3cG9ydEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXZpZXdwb3J0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnQnKSkge1xuICAgICAgICB2aWV3cG9ydEVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50JywgREVGQVVMVF9WSUVXUE9SVCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5WaWV3cG9ydCA9IFZpZXdwb3J0O1xufSkoKTtcbiIsImltcG9ydCB7IEZhc3RDbGljayB9IGZyb20gJ0BvbnNlbnVpL2Zhc3RjbGljayc7XG5pbXBvcnQgJy4vb25zL3BsYXRmb3JtJzsgLy8gVGhpcyBmaWxlIG11c3QgYmUgbG9hZGVkIGJlZm9yZSBDdXN0b20gRWxlbWVudHMgcG9seWZpbGxzLlxuaW1wb3J0ICcuL3BvbHlmaWxscy9pbmRleC5qcyc7XG5pbXBvcnQgJy4vdmVuZG9yL2luZGV4LmpzJztcbmltcG9ydCAnLi9vbnMvbWljcm9ldmVudC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHVwKG9ucykge1xuICBpZiAod2luZG93Ll9vbnNMb2FkZWQpIHtcbiAgICBvbnMuX3V0aWwud2FybignT25zZW4gVUkgaXMgbG9hZGVkIG1vcmUgdGhhbiBvbmNlLicpO1xuICB9XG4gIHdpbmRvdy5fb25zTG9hZGVkID0gdHJ1ZTtcblxuICAvLyBmYXN0Y2xpY2tcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgb25zLmZhc3RDbGljayA9IEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG5cbiAgICBjb25zdCBzdXBwb3J0VG91Y2hBY3Rpb24gPSAndG91Y2gtYWN0aW9uJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlO1xuXG4gICAgb25zLnBsYXRmb3JtLl9ydW5PbkFjdHVhbFBsYXRmb3JtKCgpID0+IHtcbiAgICAgIGlmIChvbnMucGxhdGZvcm0uaXNBbmRyb2lkKCkpIHtcbiAgICAgICAgLy8gSW4gQW5kcm9pZDQuNCssIGNvcnJlY3Qgdmlld3BvcnQgc2V0dGluZ3MgY2FuIHJlbW92ZSBjbGljayBkZWxheS5cbiAgICAgICAgLy8gU28gZGlzYWJsZSBGYXN0Q2xpY2sgb24gQW5kcm9pZC5cbiAgICAgICAgb25zLmZhc3RDbGljay5kZXN0cm95KCk7XG4gICAgICB9IGVsc2UgaWYgKG9ucy5wbGF0Zm9ybS5pc0lPUygpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0VG91Y2hBY3Rpb24gJiYgKG9ucy5wbGF0Zm9ybS5pc0lPU1NhZmFyaSgpIHx8IG9ucy5wbGF0Zm9ybS5pc1dLV2ViVmlldygpKSkge1xuICAgICAgICAgIC8vIElmICd0b3VjaC1hY3Rpb24nIHN1cHBvcnRlZCBpbiBpT1MgU2FmYXJpIG9yIFdLV2ViVmlldywgZGlzYWJsZSBGYXN0Q2xpY2suXG4gICAgICAgICAgb25zLmZhc3RDbGljay5kZXN0cm95KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRG8gbm90aGluZy4gJ3RvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uJyBoYXMgbm8gZWZmZWN0IG9uIFVJV2ViVmlldy5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LCBmYWxzZSk7XG5cbiAgb25zLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIG9ucy5lbmFibGVEZXZpY2VCYWNrQnV0dG9uSGFuZGxlcigpO1xuICAgIG9ucy5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyID0gb25zLl9pbnRlcm5hbC5kYmJEaXNwYXRjaGVyLmNyZWF0ZUhhbmRsZXIod2luZG93LmRvY3VtZW50LmJvZHksICgpID0+IHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChuYXZpZ2F0b3IsICdhcHAnKSkge1xuICAgICAgICBuYXZpZ2F0b3IuYXBwLmV4aXRBcHAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGNsb3NlIHRoZSBhcHAuIElzIFxcJ2NvcmRvdmEuanNcXCcgaW5jbHVkZWQ/XFxuRXJyb3I6IFxcJ3dpbmRvdy5uYXZpZ2F0b3IuYXBwXFwnIGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5Ll9nZXN0dXJlRGV0ZWN0b3IgPSBuZXcgb25zLkdlc3R1cmVEZXRlY3Rvcihkb2N1bWVudC5ib2R5LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAvLyBTaW11bGF0ZSBEZXZpY2UgQmFjayBCdXR0b24gb24gRVNDIHByZXNzXG4gICAgaWYgKCFvbnMucGxhdGZvcm0uaXNXZWJWaWV3KCkpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgIG9ucy5maXJlRGV2aWNlQmFja0J1dHRvbkV2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgbG9hZGluZyBwbGFjZWhvbGRlclxuICAgIG9ucy5fc2V0dXBMb2FkaW5nUGxhY2VIb2xkZXJzKCk7XG4gIH0pO1xuXG4gIC8vIHZpZXdwb3J0LmpzXG4gIFZpZXdwb3J0LnNldHVwKCk7XG59XG4iLCJpbXBvcnQgb25zIGZyb20gJy4vb25zJzsgLy8gRXh0ZXJuYWwgZGVwZW5kZW5jeSwgYWx3YXlzIGhvaXN0ZWRcbmltcG9ydCBzZXR1cCBmcm9tICcuL3NldHVwJzsgLy8gQWRkIHBvbHlmaWxsc1xuXG5zZXR1cChvbnMpOyAvLyBTZXR1cCBpbml0aWFsIGxpc3RlbmVyc1xuXG5leHBvcnQgZGVmYXVsdCBvbnM7XG4iXSwibmFtZXMiOlsiRmFzdENsaWNrIiwibGF5ZXIiLCJvcHRpb25zIiwib2xkT25DbGljayIsInRyYWNraW5nQ2xpY2siLCJ0cmFja2luZ0NsaWNrU3RhcnQiLCJ0YXJnZXRFbGVtZW50IiwidG91Y2hTdGFydFgiLCJ0b3VjaFN0YXJ0WSIsImxhc3RUb3VjaElkZW50aWZpZXIiLCJ0b3VjaEJvdW5kYXJ5IiwidGFwRGVsYXkiLCJ0YXBUaW1lb3V0Iiwibm90TmVlZGVkIiwiYmluZCIsIm1ldGhvZCIsImNvbnRleHQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm1ldGhvZHMiLCJpIiwibCIsImxlbmd0aCIsImRldmljZUlzQW5kcm9pZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbk1vdXNlIiwib25DbGljayIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uVG91Y2hDYW5jZWwiLCJFdmVudCIsInByb3RvdHlwZSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0eXBlIiwiY2FsbGJhY2siLCJjYXB0dXJlIiwicm12IiwiTm9kZSIsImNhbGwiLCJoaWphY2tlZCIsImFkdiIsImV2ZW50IiwicHJvcGFnYXRpb25TdG9wcGVkIiwib25jbGljayIsImRldmljZUlzV2luZG93c1Bob25lIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsImRldmljZUlzSU9TIiwidGVzdCIsImRldmljZUlzSU9TNCIsImRldmljZUlzSU9TV2l0aEJhZFRhcmdldCIsImRldmljZUlzQmxhY2tCZXJyeTEwIiwidGV4dEZpZWxkcyIsIm5lZWRzQ2xpY2siLCJ0YXJnZXQiLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiZGlzYWJsZWQiLCJjbGFzc05hbWUiLCJuZWVkc0ZvY3VzIiwicmVhZE9ubHkiLCJzZW5kQ2xpY2siLCJjbGlja0V2ZW50IiwidG91Y2giLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJibHVyIiwiY2hhbmdlZFRvdWNoZXMiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwiZGV0ZXJtaW5lRXZlbnRUeXBlIiwid2luZG93Iiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsImZvcndhcmRlZFRvdWNoRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwidGFnTmFtZSIsImZvY3VzIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJ2YWx1ZSIsInVwZGF0ZVNjcm9sbFBhcmVudCIsInNjcm9sbFBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJmYXN0Q2xpY2tTY3JvbGxQYXJlbnQiLCJjb250YWlucyIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsImZhc3RDbGlja0xhc3RTY3JvbGxUb3AiLCJzY3JvbGxUb3AiLCJnZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJub2RlVHlwZSIsIlRFWFRfTk9ERSIsInBhcmVudE5vZGUiLCJpc1RleHRGaWVsZCIsInRhcmdldFRvdWNoZXMiLCJpc0NvbnRlbnRFZGl0YWJsZSIsImlkZW50aWZpZXIiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWVTdGFtcCIsInBhZ2VYIiwicGFnZVkiLCJsYXN0Q2xpY2tUaW1lIiwidG91Y2hIYXNNb3ZlZCIsImJvdW5kYXJ5IiwiTWF0aCIsImFicyIsImZpbmRDb250cm9sIiwibGFiZWxFbGVtZW50IiwiY29udHJvbCIsInVuZGVmaW5lZCIsImh0bWxGb3IiLCJnZXRFbGVtZW50QnlJZCIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JFbGVtZW50IiwidGFyZ2V0VGFnTmFtZSIsImNhbmNlbE5leHRDbGljayIsImVsZW1lbnRGcm9tUG9pbnQiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwidG9wIiwiY2FuY2VsYWJsZSIsInN0b3BQcm9wYWdhdGlvbiIsInBlcm1pdHRlZCIsImRldGFpbCIsImRlc3Ryb3kiLCJtZXRhVmlld3BvcnQiLCJjaHJvbWVWZXJzaW9uIiwiYmxhY2tiZXJyeVZlcnNpb24iLCJmaXJlZm94VmVyc2lvbiIsIm9udG91Y2hzdGFydCIsImV4ZWMiLCJjb250ZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsV2lkdGgiLCJvdXRlcldpZHRoIiwibWF0Y2giLCJzdHlsZSIsIm1zVG91Y2hBY3Rpb24iLCJ0b3VjaEFjdGlvbiIsImF0dGFjaCIsImRlZmluZSIsImJhYmVsSGVscGVycy50eXBlb2YiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3VzdG9tRWxlbWVudHMiLCJmb3JjZVBvbHlmaWxsIiwiZ2xvYmFsIiwic2VsZiIsIkZ1bmN0aW9uIiwiX19nIiwiY29yZSIsInZlcnNpb24iLCJfX2UiLCJpdCIsImlzT2JqZWN0IiwiVHlwZUVycm9yIiwiZSIsInJlcXVpcmUkJDAiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImEiLCJpcyIsImNyZWF0ZUVsZW1lbnQiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsIlMiLCJmbiIsInZhbCIsInRvU3RyaW5nIiwidmFsdWVPZiIsImRQIiwiTyIsIlAiLCJBdHRyaWJ1dGVzIiwidG9QcmltaXRpdmUiLCJJRThfRE9NX0RFRklORSIsImJpdG1hcCIsIm9iamVjdCIsImtleSIsImYiLCJjcmVhdGVEZXNjIiwiaGFzT3duUHJvcGVydHkiLCJpZCIsInB4IiwicmFuZG9tIiwiY29uY2F0IiwiU0hBUkVEIiwic3RvcmUiLCJwdXNoIiwiU1JDIiwiVE9fU1RSSU5HIiwiVFBMIiwiJHRvU3RyaW5nIiwic3BsaXQiLCJpbnNwZWN0U291cmNlIiwic2FmZSIsImlzRnVuY3Rpb24iLCJoYXMiLCJoaWRlIiwiam9pbiIsIlN0cmluZyIsInRoYXQiLCJiIiwiYyIsIlBST1RPVFlQRSIsIiRleHBvcnQiLCJuYW1lIiwic291cmNlIiwiSVNfRk9SQ0VEIiwiRiIsIklTX0dMT0JBTCIsIkciLCJJU19TVEFUSUMiLCJJU19QUk9UTyIsIklTX0JJTkQiLCJCIiwiZXhwUHJvdG8iLCJvd24iLCJvdXQiLCJleHAiLCJjdHgiLCJyZWRlZmluZSIsIlUiLCJXIiwiUiIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwic2xpY2UiLCJjb2YiLCJJT2JqZWN0IiwiZGVmaW5lZCIsImdPUEQiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ0b0lPYmplY3QiLCJwSUUiLCJjaGVjayIsInByb3RvIiwic2V0UHJvdG90eXBlT2YiLCJidWdneSIsInNldCIsIkFycmF5IiwiX19wcm90b19fIiwiU3ltYm9sIiwiVVNFX1NZTUJPTCIsIiRleHBvcnRzIiwidWlkIiwiVEFHIiwiQVJHIiwidHJ5R2V0IiwiVCIsImNhbGxlZSIsImNsYXNzb2YiLCJjZWlsIiwiZmxvb3IiLCJpc05hTiIsInBvcyIsInMiLCJ0b0ludGVnZXIiLCJjaGFyQ29kZUF0IiwiY2hhckF0IiwibWluIiwibWF4IiwiaW5kZXgiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJ0b0xlbmd0aCIsInRvQWJzb2x1dGVJbmRleCIsInNoYXJlZCIsImFycmF5SW5kZXhPZiIsIklFX1BST1RPIiwibmFtZXMiLCJyZXN1bHQiLCJrZXlzIiwiJGtleXMiLCJlbnVtQnVnS2V5cyIsImRlZmluZVByb3BlcnRpZXMiLCJQcm9wZXJ0aWVzIiwiZ2V0S2V5cyIsIkVtcHR5IiwiY3JlYXRlRGljdCIsImlmcmFtZSIsImx0IiwiZ3QiLCJpZnJhbWVEb2N1bWVudCIsImRpc3BsYXkiLCJhcHBlbmRDaGlsZCIsInNyYyIsImNvbnRlbnRXaW5kb3ciLCJvcGVuIiwid3JpdGUiLCJjbG9zZSIsImNyZWF0ZSIsImFuT2JqZWN0IiwiZFBzIiwiZGVmIiwidGFnIiwic3RhdCIsImNvbmZpZ3VyYWJsZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiQ29uc3RydWN0b3IiLCJOQU1FIiwibmV4dCIsImRlc2NyaXB0b3IiLCJPYmplY3RQcm90byIsImdldFByb3RvdHlwZU9mIiwidG9PYmplY3QiLCJjb25zdHJ1Y3RvciIsIklURVJBVE9SIiwiQlVHR1kiLCJGRl9JVEVSQVRPUiIsIktFWVMiLCJWQUxVRVMiLCJyZXR1cm5UaGlzIiwiQmFzZSIsIkRFRkFVTFQiLCJJU19TRVQiLCJGT1JDRUQiLCJnZXRNZXRob2QiLCJraW5kIiwidmFsdWVzIiwiZW50cmllcyIsIkRFRl9WQUxVRVMiLCJWQUxVRVNfQlVHIiwiJG5hdGl2ZSIsIiRkZWZhdWx0IiwiJGVudHJpZXMiLCIkYW55TmF0aXZlIiwiTElCUkFSWSIsIiRhdCIsIml0ZXJhdGVkIiwiX3QiLCJfaSIsInBvaW50IiwiZG9uZSIsIlVOU0NPUEFCTEVTIiwiQXJyYXlQcm90byIsIl9rIiwic3RlcCIsIkl0ZXJhdG9ycyIsIkFyZ3VtZW50cyIsImFkZFRvVW5zY29wYWJsZXMiLCJ3a3MiLCJUT19TVFJJTkdfVEFHIiwiQXJyYXlWYWx1ZXMiLCJET01JdGVyYWJsZXMiLCJjb2xsZWN0aW9ucyIsImV4cGxpY2l0IiwiQ29sbGVjdGlvbiIsIiRpdGVyYXRvcnMiLCJmb3JiaWRkZW5GaWVsZCIsIml0ZXJhdG9yIiwicmV0IiwiZ2V0SXRlcmF0b3JNZXRob2QiLCJCUkVBSyIsIlJFVFVSTiIsIml0ZXJhYmxlIiwiaXRlckZuIiwiZ2V0SXRlckZuIiwiaXNBcnJheUl0ZXIiLCJTUEVDSUVTIiwiS0VZIiwiQyIsIkRFU0NSSVBUT1JTIiwiTUVUQSIsInNldERlc2MiLCJpc0V4dGVuc2libGUiLCJGUkVFWkUiLCJwcmV2ZW50RXh0ZW5zaW9ucyIsInNldE1ldGEiLCJmYXN0S2V5IiwiZ2V0V2VhayIsInciLCJvbkZyZWV6ZSIsIm1ldGEiLCJORUVEIiwiVFlQRSIsIlNJWkUiLCJnZXRFbnRyeSIsImVudHJ5IiwiX2YiLCJuIiwiayIsIndyYXBwZXIiLCJJU19NQVAiLCJBRERFUiIsIl9sIiwiZm9yT2YiLCJjbGVhciIsInZhbGlkYXRlIiwiZGF0YSIsInIiLCJwIiwicHJldiIsImZvckVhY2giLCJjYWxsYmFja2ZuIiwidiIsIlNBRkVfQ0xPU0lORyIsInJpdGVyIiwic2tpcENsb3NpbmciLCJhcnIiLCJpdGVyIiwiY29tbW9uIiwiSVNfV0VBSyIsImZpeE1ldGhvZCIsImFkZCIsImZhaWxzIiwiZ2V0Q29uc3RydWN0b3IiLCJpbnN0YW5jZSIsIkhBU05UX0NIQUlOSU5HIiwiVEhST1dTX09OX1BSSU1JVElWRVMiLCJBQ0NFUFRfSVRFUkFCTEVTIiwiJGl0ZXJEZXRlY3QiLCJCVUdHWV9aRVJPIiwiJGluc3RhbmNlIiwiaW5oZXJpdElmUmVxdWlyZWQiLCJzZXRTdHJvbmciLCJTRVQiLCJTZXQiLCJzdHJvbmciLCJ0b0pTT04iLCJmcm9tIiwiQ09MTEVDVElPTiIsIm9mIiwiQSIsIm1hcEZuIiwibWFwcGluZyIsImNiIiwiYUZ1bmN0aW9uIiwibmV4dEl0ZW0iLCJyZXF1aXJlJCQ3IiwiTUFQIiwiTWFwIiwiaXNBcnJheSIsImFyZyIsIm9yaWdpbmFsIiwic3BlY2llc0NvbnN0cnVjdG9yIiwiJGNyZWF0ZSIsIklTX0ZJTFRFUiIsIklTX1NPTUUiLCJJU19FVkVSWSIsIklTX0ZJTkRfSU5ERVgiLCJOT19IT0xFUyIsImFzYyIsInJlcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsIiRhc3NpZ24iLCJhc3NpZ24iLCJLIiwiYUxlbiIsImdldFN5bWJvbHMiLCJnT1BTIiwiaXNFbnVtIiwiaiIsImFycmF5RmluZCIsImNyZWF0ZUFycmF5TWV0aG9kIiwiYXJyYXlGaW5kSW5kZXgiLCJ1bmNhdWdodEZyb3plblN0b3JlIiwiVW5jYXVnaHRGcm96ZW5TdG9yZSIsImZpbmRVbmNhdWdodEZyb3plbiIsInNwbGljZSIsIiRoYXMiLCJlYWNoIiwiTkFUSVZFX1dFQUtfTUFQIiwiSVNfSUUxMSIsIkFjdGl2ZVhPYmplY3QiLCJXRUFLX01BUCIsIndlYWsiLCJ1ZnN0b3JlIiwiSW50ZXJuYWxNYXAiLCJXZWFrTWFwIiwiJFdlYWtNYXAiLCJyZXF1aXJlJCQ1IiwiJGRlZmluZVByb3BlcnR5IiwiYXJyYXlMaWtlIiwibWFwZm4iLCJyZXNlcnZlZFRhZ0xpc3QiLCJpc1ZhbGlkQ3VzdG9tRWxlbWVudE5hbWUiLCJsb2NhbE5hbWUiLCJyZXNlcnZlZCIsInZhbGlkRm9ybSIsImlzQ29ubmVjdGVkIiwibm9kZSIsIm5hdGl2ZVZhbHVlIiwiY3VycmVudCIsIl9fQ0VfaXNJbXBvcnREb2N1bWVudCIsIkRvY3VtZW50IiwiU2hhZG93Um9vdCIsImhvc3QiLCJuZXh0U2libGluZ09yQW5jZXN0b3JTaWJsaW5nIiwicm9vdCIsInN0YXJ0IiwibmV4dFNpYmxpbmciLCJuZXh0Tm9kZSIsImZpcnN0Q2hpbGQiLCJ3YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyIsInZpc2l0ZWRJbXBvcnRzIiwiRUxFTUVOVF9OT0RFIiwiZWxlbWVudCIsImdldEF0dHJpYnV0ZSIsImltcG9ydE5vZGUiLCJpbXBvcnQiLCJjaGlsZCIsInNoYWRvd1Jvb3QiLCJfX0NFX3NoYWRvd1Jvb3QiLCJzZXRQcm9wZXJ0eVVuY2hlY2tlZCIsImRlc3RpbmF0aW9uIiwiQ3VzdG9tRWxlbWVudFN0YXRlIiwiQ3VzdG9tRWxlbWVudEludGVybmFscyIsIl9sb2NhbE5hbWVUb0RlZmluaXRpb24iLCJfY29uc3RydWN0b3JUb0RlZmluaXRpb24iLCJfcGF0Y2hlcyIsIl9oYXNQYXRjaGVzIiwiZGVmaW5pdGlvbiIsImxpc3RlbmVyIiwicGF0Y2giLCJfX0NFX3BhdGNoZWQiLCJlbGVtZW50cyIsIl9fQ0Vfc3RhdGUiLCJDRVN0YXRlIiwiY3VzdG9tIiwiVXRpbGl0aWVzIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJ1cGdyYWRlRWxlbWVudCIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwiZ2F0aGVyRWxlbWVudHMiLCJyZWFkeVN0YXRlIiwiX19DRV9oYXNSZWdpc3RyeSIsIl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZCIsImRlbGV0ZSIsInBhdGNoQW5kVXBncmFkZVRyZWUiLCJjdXJyZW50U3RhdGUiLCJsb2NhbE5hbWVUb0RlZmluaXRpb24iLCJjb25zdHJ1Y3Rpb25TdGFjayIsIkVycm9yIiwicG9wIiwiZmFpbGVkIiwiX19DRV9kZWZpbml0aW9uIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiX19DRV9pc0Nvbm5lY3RlZENhbGxiYWNrQ2FsbGVkIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIm5hbWVzcGFjZSIsIkRvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIiLCJpbnRlcm5hbHMiLCJkb2MiLCJfaW50ZXJuYWxzIiwiX2RvY3VtZW50IiwiX29ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIl9oYW5kbGVNdXRhdGlvbnMiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIm11dGF0aW9ucyIsImFkZGVkTm9kZXMiLCJEZWZlcnJlZCIsIl92YWx1ZSIsIl9yZXNvbHZlIiwiX3Byb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsIkN1c3RvbUVsZW1lbnRSZWdpc3RyeSIsIl9lbGVtZW50RGVmaW5pdGlvbklzUnVubmluZyIsIl93aGVuRGVmaW5lZERlZmVycmVkIiwiX2ZsdXNoQ2FsbGJhY2siLCJfZmx1c2hQZW5kaW5nIiwiX3VuZmx1c2hlZExvY2FsTmFtZXMiLCJfZG9jdW1lbnRDb25zdHJ1Y3Rpb25PYnNlcnZlciIsIlN5bnRheEVycm9yIiwiYWRvcHRlZENhbGxiYWNrIiwiZ2V0Q2FsbGJhY2siLCJjYWxsYmFja1ZhbHVlIiwic2V0RGVmaW5pdGlvbiIsIl9mbHVzaCIsInNoaWZ0IiwiZGVmZXJyZWQiLCJyZWplY3QiLCJwcmlvciIsInRvUHJvbWlzZSIsIm91dGVyIiwiaW5uZXIiLCJmbHVzaCIsIndoZW5EZWZpbmVkIiwicG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayIsImNyZWF0ZUVsZW1lbnROUyIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwicmVwbGFjZUNoaWxkIiwiRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZU5TIiwic2V0QXR0cmlidXRlTlMiLCJyZW1vdmVBdHRyaWJ1dGVOUyIsIkhUTUxFbGVtZW50IiwiQWxyZWFkeUNvbnN0cnVjdGVkTWFya2VyIiwiY29uc3RydWN0b3JUb0RlZmluaXRpb24iLCJOYXRpdmUiLCJEb2N1bWVudF9jcmVhdGVFbGVtZW50IiwibGFzdEluZGV4IiwiYnVpbHRJbiIsIm5vZGVzIiwiY29ubmVjdGVkQmVmb3JlIiwiZmlsdGVyIiwicHJlcGVuZCIsImRpc2Nvbm5lY3RUcmVlIiwiY29ubmVjdFRyZWUiLCJhcHBlbmQiLCJkZWVwIiwiY2xvbmUiLCJEb2N1bWVudF9pbXBvcnROb2RlIiwicGF0Y2hUcmVlIiwiTlNfSFRNTCIsIkRvY3VtZW50X2NyZWF0ZUVsZW1lbnROUyIsIkRvY3VtZW50X3ByZXBlbmQiLCJEb2N1bWVudF9hcHBlbmQiLCJyZWZOb2RlIiwiRG9jdW1lbnRGcmFnbWVudCIsImluc2VydGVkTm9kZXMiLCJjaGlsZE5vZGVzIiwibmF0aXZlUmVzdWx0IiwiTm9kZV9pbnNlcnRCZWZvcmUiLCJub2RlV2FzQ29ubmVjdGVkIiwiTm9kZV9hcHBlbmRDaGlsZCIsIk5vZGVfY2xvbmVOb2RlIiwib3duZXJEb2N1bWVudCIsIk5vZGVfcmVtb3ZlQ2hpbGQiLCJub2RlVG9JbnNlcnQiLCJub2RlVG9SZW1vdmUiLCJOb2RlX3JlcGxhY2VDaGlsZCIsIm5vZGVUb0luc2VydFdhc0Nvbm5lY3RlZCIsInRoaXNJc0Nvbm5lY3RlZCIsInBhdGNoX3RleHRDb250ZW50IiwiYmFzZURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiYXNzaWduZWRWYWx1ZSIsInJlbW92ZWROb2RlcyIsImNoaWxkTm9kZXNMZW5ndGgiLCJOb2RlX3RleHRDb250ZW50IiwiYWRkUGF0Y2giLCJwYXJ0cyIsInRleHRDb250ZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJiZWZvcmUiLCJhZnRlciIsIndhc0Nvbm5lY3RlZCIsInJlcGxhY2VXaXRoIiwicmVtb3ZlIiwiRWxlbWVudF9hdHRhY2hTaGFkb3ciLCJpbml0Iiwid2FybiIsInBhdGNoX2lubmVySFRNTCIsImh0bWxTdHJpbmciLCJyZW1vdmVkRWxlbWVudHMiLCJFbGVtZW50X2lubmVySFRNTCIsIkhUTUxFbGVtZW50X2lubmVySFRNTCIsInJhd0RpdiIsImlubmVySFRNTCIsIkVsZW1lbnRfc2V0QXR0cmlidXRlIiwiRWxlbWVudF9nZXRBdHRyaWJ1dGUiLCJFbGVtZW50X3NldEF0dHJpYnV0ZU5TIiwiRWxlbWVudF9nZXRBdHRyaWJ1dGVOUyIsIkVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlIiwiRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUyIsInBhdGNoX2luc2VydEFkamFjZW50RWxlbWVudCIsImJhc2VNZXRob2QiLCJ3aGVyZSIsImluc2VydGVkRWxlbWVudCIsIkhUTUxFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudCIsIkVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiRWxlbWVudF9wcmVwZW5kIiwiRWxlbWVudF9hcHBlbmQiLCJFbGVtZW50X2JlZm9yZSIsIkVsZW1lbnRfYWZ0ZXIiLCJFbGVtZW50X3JlcGxhY2VXaXRoIiwiRWxlbWVudF9yZW1vdmUiLCJwcmlvckN1c3RvbUVsZW1lbnRzIiwiSnNNdXRhdGlvbk9ic2VydmVyIiwicmVnaXN0cmF0aW9uc1RhYmxlIiwic2V0SW1tZWRpYXRlIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZVF1ZXVlIiwic2VudGluZWwiLCJxdWV1ZSIsImZ1bmMiLCJwb3N0TWVzc2FnZSIsImlzU2NoZWR1bGVkIiwic2NoZWR1bGVkT2JzZXJ2ZXJzIiwic2NoZWR1bGVDYWxsYmFjayIsIm9ic2VydmVyIiwiZGlzcGF0Y2hDYWxsYmFja3MiLCJ3cmFwSWZOZWVkZWQiLCJTaGFkb3dET01Qb2x5ZmlsbCIsIm9ic2VydmVycyIsInNvcnQiLCJvMSIsIm8yIiwidWlkXyIsImFueU5vbkVtcHR5IiwidGFrZVJlY29yZHMiLCJjYWxsYmFja18iLCJyZW1vdmVUcmFuc2llbnRPYnNlcnZlcnNGb3IiLCJub2Rlc18iLCJyZWdpc3RyYXRpb25zIiwicmVnaXN0cmF0aW9uIiwicmVtb3ZlVHJhbnNpZW50T2JzZXJ2ZXJzIiwiZm9yRWFjaEFuY2VzdG9yQW5kT2JzZXJ2ZXJFbnF1ZXVlUmVjb3JkIiwic3VidHJlZSIsInJlY29yZCIsImVucXVldWUiLCJ1aWRDb3VudGVyIiwicmVjb3Jkc18iLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwiY2hhcmFjdGVyRGF0YSIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiY2hhcmFjdGVyRGF0YU9sZFZhbHVlIiwicmVtb3ZlTGlzdGVuZXJzIiwiUmVnaXN0cmF0aW9uIiwiYWRkTGlzdGVuZXJzIiwiY29weU9mUmVjb3JkcyIsIk11dGF0aW9uUmVjb3JkIiwicHJldmlvdXNTaWJsaW5nIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZU5hbWVzcGFjZSIsImNvcHlNdXRhdGlvblJlY29yZCIsImN1cnJlbnRSZWNvcmQiLCJyZWNvcmRXaXRoT2xkVmFsdWUiLCJnZXRSZWNvcmQiLCJnZXRSZWNvcmRXaXRoT2xkVmFsdWUiLCJjbGVhclJlY29yZHMiLCJyZWNvcmRSZXByZXNlbnRzQ3VycmVudE11dGF0aW9uIiwic2VsZWN0UmVjb3JkIiwibGFzdFJlY29yZCIsIm5ld1JlY29yZCIsInRyYW5zaWVudE9ic2VydmVkTm9kZXMiLCJyZWNvcmRzIiwicmVjb3JkVG9SZXBsYWNlTGFzdCIsImFkZExpc3RlbmVyc18iLCJyZW1vdmVMaXN0ZW5lcnNfIiwiYXR0ck5hbWUiLCJyZWxhdGVkTm9kZSIsIm5hbWVzcGFjZVVSSSIsImF0dHJDaGFuZ2UiLCJNdXRhdGlvbkV2ZW50IiwiQURESVRJT04iLCJwcmV2VmFsdWUiLCJhZGRUcmFuc2llbnRPYnNlcnZlciIsImNoYW5nZWROb2RlIiwiX2lzUG9seWZpbGxlZCIsIm5leHRIYW5kbGUiLCJ0YXNrc0J5SGFuZGxlIiwiY3VycmVudGx5UnVubmluZ0FUYXNrIiwiYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyIsImFyZ3MiLCJwYXJ0aWFsbHlBcHBsaWVkIiwiaGFuZGxlciIsInJ1bklmUHJlc2VudCIsImhhbmRsZSIsInRhc2siLCJjbGVhckltbWVkaWF0ZSIsImluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uIiwibmV4dFRpY2siLCJjYW5Vc2VQb3N0TWVzc2FnZSIsImltcG9ydFNjcmlwdHMiLCJwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzIiwib2xkT25NZXNzYWdlIiwib25tZXNzYWdlIiwiaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24iLCJtZXNzYWdlUHJlZml4Iiwib25HbG9iYWxNZXNzYWdlIiwiYXR0YWNoRXZlbnQiLCJpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbiIsImNoYW5uZWwiLCJNZXNzYWdlQ2hhbm5lbCIsInBvcnQxIiwicG9ydDIiLCJpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uIiwiaHRtbCIsInNjcmlwdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24iLCJhdHRhY2hUbyIsInByb2Nlc3MiLCJERUZBVUxUX1ZJRVdQT1JUIiwiVmlld3BvcnQiLCJ2aWV3cG9ydEVsZW1lbnQiLCJoZWFkIiwiZW5zdXJlVmlld3BvcnRFbGVtZW50IiwiaGFzQXR0cmlidXRlIiwic2V0dXAiLCJvbnMiLCJfb25zTG9hZGVkIiwiX3V0aWwiLCJmYXN0Q2xpY2siLCJib2R5Iiwic3VwcG9ydFRvdWNoQWN0aW9uIiwicGxhdGZvcm0iLCJfcnVuT25BY3R1YWxQbGF0Zm9ybSIsImlzQW5kcm9pZCIsImlzSU9TIiwiaXNJT1NTYWZhcmkiLCJpc1dLV2ViVmlldyIsInJlYWR5IiwiZW5hYmxlRGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJfZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2ludGVybmFsIiwiZGJiRGlzcGF0Y2hlciIsImNyZWF0ZUhhbmRsZXIiLCJhcHAiLCJleGl0QXBwIiwiX2dlc3R1cmVEZXRlY3RvciIsIkdlc3R1cmVEZXRlY3RvciIsInBhc3NpdmUiLCJpc1dlYlZpZXciLCJrZXlDb2RlIiwiZmlyZURldmljZUJhY2tCdXR0b25FdmVudCIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFFLGFBQVk7V0FzQkpBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCQyxPQUExQixFQUFtQztPQUM5QkMsVUFBSjs7YUFFVUQsV0FBVyxFQUFyQjs7Ozs7OztRQU9LRSxhQUFMLEdBQXFCLEtBQXJCOzs7Ozs7O1FBUUtDLGtCQUFMLEdBQTBCLENBQTFCOzs7Ozs7O1FBUUtDLGFBQUwsR0FBcUIsSUFBckI7Ozs7Ozs7UUFRS0MsV0FBTCxHQUFtQixDQUFuQjs7Ozs7OztRQVFLQyxXQUFMLEdBQW1CLENBQW5COzs7Ozs7O1FBUUtDLG1CQUFMLEdBQTJCLENBQTNCOzs7Ozs7O1FBUUtDLGFBQUwsR0FBcUJSLFFBQVFRLGFBQVIsSUFBeUIsRUFBOUM7Ozs7Ozs7UUFRS1QsS0FBTCxHQUFhQSxLQUFiOzs7Ozs7O1FBT0tVLFFBQUwsR0FBZ0JULFFBQVFTLFFBQVIsSUFBb0IsR0FBcEM7Ozs7Ozs7UUFPS0MsVUFBTCxHQUFrQlYsUUFBUVUsVUFBUixJQUFzQixHQUF4Qzs7T0FFSVosVUFBVWEsU0FBVixDQUFvQlosS0FBcEIsQ0FBSixFQUFnQzs7Ozs7WUFLdkJhLElBQVQsQ0FBY0MsTUFBZCxFQUFzQkMsT0FBdEIsRUFBK0I7V0FDdkIsWUFBVztZQUFTRCxPQUFPRSxLQUFQLENBQWFELE9B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
