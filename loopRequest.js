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
  };

  LoopRequest.prototype.start = function () {
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
    cancelAnimationFrame(this.animationReq);
  };

  return LoopRequest;
}));