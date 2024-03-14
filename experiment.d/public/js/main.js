var mousePosition;
var offset = {x: 0, y:0};
var isDown = false;

const track_elem = document.getElementById("track");

track_elem.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = {
        x: track_elem.offsetLeft - e.clientX, 
        y: track_elem.offsetTop - e.clientY
    };
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      track_elem.style.left = mousePosition.x + offset.x + "px";
    }
  },
  true
);
