/*
 * loopRequest
 * https://github.com/zhanziyang/loopRequest
 * 
 * Copyright (c) 2017 zhanziyang
 * Released under the ISC license
 */
  
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BetterInterval = factory());
}(this, (function () { 'use strict';

var polyfill = function () {
  //rAF polyfill
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
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

polyfill();

var BetterInterval = function () {
  function BetterInterval(action, interval) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    classCallCheck(this, BetterInterval);

    if (typeof action != "function") {
      throw new Error("First argument should be a function");
    }
    if (interval && Array.isArray(interval)) {
      args = interval;
      interval = 0;
    } else if (interval && typeof interval !== "number") {
      throw new Error("Second argument should be a number");
    }
    this.animationReq;
    this.action = action;
    this.interval = interval;
    this.args = args;
    this.looping = false;
  }

  createClass(BetterInterval, [{
    key: "set",
    value: function set$$1() {
      var _this = this;

      if (this.looping) return;
      this.looping = true;
      var now = void 0,
          lastFrameTime = 0,
          elapsed = void 0,
          lastReqTime = 0,
          reqGap = void 0;
      var loopFunc = function loopFunc(timestamp) {
        reqGap = timestamp - lastReqTime;
        lastReqTime = timestamp;
        _this.animationReq = requestAnimationFrame(loopFunc);
        if (!_this.interval || _this.interval < reqGap) {
          _this.action.apply(_this, _this.args);
        } else {
          now = new Date();
          elapsed = now - lastFrameTime;
          if (elapsed > _this.interval) {
            lastFrameTime = now;
            _this.action.apply(_this, _this.args);
          }
        }
      };

      loopFunc();
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.looping) return;
      cancelAnimationFrame(this.animationReq);
      this.looping = false;
    }
  }]);
  return BetterInterval;
}();

return BetterInterval;

})));
