(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var LoopRequest = require("loop-request");

var func1, func2, loop1, loop2;

var target = document.querySelector("#target");
var text = target.innerHTML;
var l = text.length;
var currentContent = "";
var currentPos = 0;
target.innerHTML = currentContent;

func1 = function () {
  if (currentPos >= (l - 1)) {
    currentPos = 0;
    currentContent = "";
  }
  currentContent = currentContent + text[currentPos];
  currentPos++;
  target.innerHTML = currentContent;
}

var box = document.querySelector("#box");
var left = 0;
var increment = 3;
var max = document.body.clientWidth - 200;
var backward = false;

func2 = function () {
  if (left >= max) {
    backward = true;
  } else if (left <= 0) {
    backward = false;
  }
  if (backward) {
    left -= increment;
  } else {
    left += increment;
  }

  box.style.left = left + "px";
}

loop1 = new LoopRequest(func1, 80);
loop2 = new LoopRequest(func2);



function startLooping() {
  loop1.start();
  loop2.start();
}

function stopLooping() {
  loop1.stop();
  loop2.stop();
}
window.startLooping = startLooping;
window.stopLooping = stopLooping;
},{"loop-request":2}],2:[function(require,module,exports){
(function () {
  //rAF polyfill
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
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
} ());

//LoopRequest
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = (root.LoopRequest = factory());
  } else {
    root.LoopRequest = factory();
  }
} (this, function () {
  var LoopRequest = function (action, interval, args) {
    if (typeof action != "function") {
      throw new Error("First argument should be of type function");
    }
    if (interval && Array.isArray(interval)) {
      args = interval;
      interval = 0;
    }
    if (interval && isNaN(interval)) {
      throw new Error("Second argument should be a number");
    }
    this.animationReq;
    this.action = action;
    this.interval = interval;
    this.args = args || [];
    this.looping = false;
  };

  LoopRequest.prototype.start = function () {
    if (this.looping) return;
    this.looping = true;
    var now, lastFrameTime = 0, elapsed, lastReqTime = 0, reqGap;
    var loopFunc = function (timestamp) {
      reqGap = timestamp - lastReqTime;
      lastReqTime = timestamp;
      this.animationReq = requestAnimationFrame(loopFunc);
      if (!this.interval || this.interval < reqGap) {
        this.action.apply(this, this.args);
      } else {
        now = new Date();
        elapsed = now - lastFrameTime;
        if (elapsed > this.interval) {
          lastFrameTime = now;
          this.action.apply(this, this.args);
        }
      }
    }.bind(this);

    loopFunc();
  };

  LoopRequest.prototype.stop = function () {
    if (!this.looping) return;
    cancelAnimationFrame(this.animationReq);
    this.looping = false;
  };

  return LoopRequest;
}));
},{}]},{},[1]);
