'use strict';

const Scroll = () => {};

/**
 * 全面禁止页面滚动 / 处理移动端输入框光标抖动的现象
 * @param hasInput {Boolean} 弹窗禁用滚动场景下使用的配置,
 *  移动端,在需要position为fixed或者absolute且元素内部含有输入框的弹窗时候使用,
 *  置为true,可以防止输入框光标抖动的现象
 * */
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
let oldonwheel;
let oldonmousewheel1;
let oldonmousewheel2;
let oldontouchmove;
let oldonkeydown;
let isDisabled;
let winScrollTop = 0;
Scroll.prototype.disableScroll = (hasInput) => {
  if (isDisabled) {
    return;
  }

  if (hasInput) {
    winScrollTop = window.pageYOffset;
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  if (window.addEventListener) { // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  }
  oldonwheel = window.onwheel;
  window.onwheel = preventDefault; // modern standard

  oldonmousewheel1 = window.onmousewheel;
  window.onmousewheel = preventDefault; // older browsers, IE
  oldonmousewheel2 = document.onmousewheel;
  document.onmousewheel = preventDefault; // older browsers, IE

  oldontouchmove = window.ontouchmove;
  window.ontouchmove = preventDefault; // mobile

  oldonkeydown = document.onkeydown;
  document.onkeydown = preventDefaultForScrollKeys;
  isDisabled = true;
};

/**
 * 全面取消禁止滚动
 * @param hasInput {Boolean} 弹窗禁用滚动场景下使用的配置,
 *  移动端,在需要position为fixed或者absolute且元素内部含有输入框的弹窗时候使用,
 *  置为true,可以防止输入框光标抖动的现象
 * */
Scroll.prototype.enableScroll = (hasInput) => {
  if (!isDisabled) {
    return;
  }

  if (hasInput) {
    document.getElementsByTagName('html')[0].style.overflow = 'unset';
    document.getElementsByTagName('body')[0].style.overflow = 'unset';
    window.scrollTo(0, winScrollTop);
  }

  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  }

  window.onwheel = oldonwheel; // modern standard

  window.onmousewheel = oldonmousewheel1; // older browsers, IE
  document.onmousewheel = oldonmousewheel2; // older browsers, IE

  window.ontouchmove = oldontouchmove; // mobile

  document.onkeydown = oldonkeydown;
  isDisabled = false;
};
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

module.exports = Scroll;