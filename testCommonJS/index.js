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