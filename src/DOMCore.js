'use strict';

const invariant = require('./invariant');

const DOMCore = {
  isClient() {
    return !!global.document;
  },

  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM node.
   */
  isNode(object) {
    invariant(this.isClient(), 'DOM.isNode() should be running in a browser env.');
    const doc = object ? (object.ownerDocument || object) : document;
    const defaultView = doc.defaultView || window;
    return !!(object && (
      typeof defaultView.Node === 'function' ? object instanceof defaultView.Node :
      typeof object === 'object' &&
      typeof object.nodeType === 'number' &&
      typeof object.nodeName === 'string'
    ));
  },

  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM text node.
   */
  isTextNode(object) {
    invariant(this.isClient(), 'DOM.isTextNode() should be running in a browser env.');
    return this.isNode(object) && object.nodeType == 3;
  },

  /**
   * Checks if a given DOM node contains or is another DOM node.
   */
  containsNode(outerNode, innerNode){
    invariant(this.isClient(), 'DOM.containsNode() should be running in a browser env.');
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (this.isTextNode(outerNode)) {
      return false;
    } else if (this.isTextNode(innerNode)) {
      return this.containsNode(outerNode, innerNode.parentNode);
    } else if ('contains' in outerNode) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  },

  /**
   * Gets an element's bounding rect in pixels relative to the viewport.
   *
   * @param {DOMElement} elem
   * @return {object}
   */
  getElementRect(elem) {
    invariant(this.isClient(), 'DOM.getElementRect() should be running in a browser env.');
    const docElem = elem.ownerDocument.documentElement;

    // FF 2, Safari 3 and Opera 9.5- do not support getBoundingClientRect().
    // IE9- will throw if the element is not in the document.
    if (!('getBoundingClientRect' in elem) || !this.containsNode(docElem, elem)) {
      return {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
    }

    // Subtracts clientTop/Left because IE8- added a 2px border to the
    // <html> element (see http://fburl.com/1493213). IE 7 in
    // Quicksmode does not report clientLeft/clientTop so there
    // will be an unaccounted offset of 2px when in quirksmode
    const rect = elem.getBoundingClientRect();

    return {
      left: Math.round(rect.left) - docElem.clientLeft,
      right: Math.round(rect.right) - docElem.clientLeft,
      top: Math.round(rect.top) - docElem.clientTop,
      bottom: Math.round(rect.bottom) - docElem.clientTop
    };
  },

  /**
   * Gets an element's position in pixels relative to the viewport. The returned
   * object represents the position of the element's top left corner.
   *
   * @param {DOMElement} element
   * @return {object}
   */
  getElementPosition(element) {
    invariant(this.isClient(), 'DOM.getElementRect() should be running in a browser env.');
    const rect = this.getElementRect(element);
    return {
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  },

  /**
   * get viewport dimensions
   * */
  getViewportDimensions
};

// ******** tool funcs ********

function getViewportWidth() {
  let width;
  if (document.documentElement) {
    width = document.documentElement.clientWidth;
  }

  if (!width && document.body) {
    width = document.body.clientWidth;
  }

  return width || 0;
}

function getViewportHeight() {
  let height;
  if (document.documentElement) {
    height = document.documentElement.clientHeight;
  }

  if (!height && document.body) {
    height = document.body.clientHeight;
  }

  return height || 0;
}

/**
 * Gets the viewport dimensions including any scrollbars.
 */
function getViewportDimensions() {
  invariant(DOMCore.isClient(), 'DOM.getElementRect() should be running in a browser env.');
  return {
    width: window.innerWidth || getViewportWidth(),
    height: window.innerHeight || getViewportHeight(),
  };
}

/**
 * Gets the viewport dimensions excluding any scrollbars.
 */
getViewportDimensions.withoutScrollbars = function() {
  invariant(DOMCore.isClient(), 'DOM.getElementRect() should be running in a browser env.');
  return {
    width: getViewportWidth(),
    height: getViewportHeight(),
  };
};

module.exports = DOMCore;