# loopRequest
With loopRequest, you can easily make repetitive function executions like you usually do with <code>setInterval</code>. Under the hood it uses <code>requestAnimationFrame</code> to achieve the same purpose, but with better performance.

## Let's not use setInterval anymore!
Why?
- setInterval keeps running event when the browser tab or window is not active.
- When the callback function takes longer to finish than the interval you set, it will not wait for the function thus resulting in enqueuing of multiple callback functions.

See more: [Better Performance With requestAnimationFrame](https://dev.opera.com/articles/better-performance-with-requestanimationframe/) by Luz Caballero

# Usage
## new LoopRequest(callback, interval [, args])
### Argumemts:
* **callback**: <em>Function</em> | Repetitively executing function
* **interval**: <em>Number(milliseconds) | **optional** </em>| Time gap between each loop. By default it matches the display refresh rate of browser, which usually is 60 fps. So it's default value is approximately 16.7 (≈1000/60)
* **args**: <em>Array | **optional** </em>| Array of arguments to be passed into the callback function.

### Methods:
* .start()
* .stop()

## Example
```javascript
var loop;
var left = 0;
var func = function(arg1, arg2) {
  var elem = document.querySelector("#time");
  elem.innerHTML = new Date();
  left += 1;
  if (left >= 1000) {
    loop.stop(); //stop looping!
  }
  elem.style.position = "relative";
  elem.style.left = left + "px";
  console.log(arg1 + ", " + arg2);
};

loop = new LoopRequest(func, 100, ["hello", "world"]);
loop.start(); //start looping!
```
