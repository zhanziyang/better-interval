import polyfill from './polyfill'

polyfill()

export default class BetterInterval {
  constructor(action, interval, ...args) {
    if (typeof action != "function") {
      throw new Error("First argument should be a function")
    }
    if (interval && Array.isArray(interval)) {
      args = interval
      interval = 0
    } else if (interval && typeof interval !== "number") {
      throw new Error("Second argument should be a number")
    }
    this.animationReq
    this.action = action
    this.interval = interval
    this.args = args
    this.looping = false
  }

  set() {
    if (this.looping) return
    this.looping = true
    let now, lastFrameTime = 0, elapsed, lastReqTime = 0, reqGap
    let loopFunc = (timestamp) => {
      reqGap = timestamp - lastReqTime
      lastReqTime = timestamp
      this.animationReq = requestAnimationFrame(loopFunc)
      if (!this.interval || this.interval < reqGap) {
        this.action.apply(this, this.args)
      } else {
        now = new Date()
        elapsed = now - lastFrameTime
        if (elapsed > this.interval) {
          lastFrameTime = now
          this.action.apply(this, this.args)
        }
      }
    }

    loopFunc()
  }

  clear() {
    if (!this.looping) return
    cancelAnimationFrame(this.animationReq)
    this.looping = false
  }
}