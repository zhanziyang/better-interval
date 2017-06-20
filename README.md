# BetterInterval
It works similar to `setInterval`, but under the hood it uses <code>requestAnimationFrame</code> to achieve the same goal. So it's less buggy.

### NOTICE
* Works in browsers, not on servers.
* Supports CommonJS, so you can use it with tools like Browserify or Webpack.

### Why not just use setInterval?
- setInterval keeps running event when the browser tab or window is not active.
- When the callback function takes longer to finish than the interval you set, it will not wait for the function thus resulting in enqueuing of multiple callback functions.

See more: [Better Performance With requestAnimationFrame](https://dev.opera.com/articles/better-performance-with-requestanimationframe/) by Luz Caballero

## Quck Start
### 1. Download
```html
<script src="https://unpkg.com/vue-croppa/dist/better-interval.min.js"></script>
```
or if you use module bundler such as Browserify:
```cmd
npm install --save better-interval
```
### 2. Import

```javascript
var BetterInterval = require("better-interval");
```
or
```js
import BetterInterval from 'better-interval'
```

## Usage
### Constructor
```js
var betterInterval = new BetterInterval(callback [, interval] [, ...args])
```
#### callback: 
- Repetitively executing function
- type: `function`
#### interval:
- Time gap between each loop. By default it matches the display refresh rate of browser, which usually is 60 fps. So it's default value is approximately 16.7 (≈1000/60)
- type: `number` (milliseconds)
- optional
#### args:
- The rest arguments. They will be passed in to the callback.

### Methods:
- Start looping
```js
betterInterval.set()
```

- Stop looping
```js
betterInterval.clear()
```

## Example

- Use BetterInterval to make a moving box animation. It moves 3 pixels per 100 milliseconds until the offset reaches 1000.

```javascript
var box = document.querySelector("#box");
var offset = 0;

var betterInterval = new BetterInterval(function (increment, max) {
  offset += increment;
  box.style.left = offset + "px";

  if (offset >= max) {
    betterInterval.clear()
  }
}, 100, 3, 1000);

betterInterval.set()
```
