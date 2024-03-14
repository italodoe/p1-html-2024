var mousePosition;
var offset = { x: 0, y: 0 };
var isDown = false;

const track_elem = document.getElementById("track");
track_elem.dataset.lastX = 0;

window.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = {
      x: track_elem.offsetLeft - e.clientX,
      y: track_elem.offsetTop - e.clientY,
    };
  },
  true
);

window.addEventListener(
  "mouseup",
  function (e) {
    isDown = false;
  },
  true
);

window.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      let maxPosition = (mousePosition.x + offset.x);
      let maxWidth = window.innerWidth / 2;
      let percentage = (maxPosition / maxWidth) * 100;

      track_elem.style.transform = `translate(${percentage}%, -50%)`;
    }
  },
  true
);
