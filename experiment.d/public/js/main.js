var mousePosition;
var offset = { x: 0, y: 0 };
var isDown = false;

const track_elem = document.getElementById("track");
track_elem.dataset.lastX = 0;
track_elem.dataset.lastPercentage = 0;

window.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = {
      x: track_elem.offsetLeft - e.clientX,
      y: track_elem.offsetTop - e.clientY,
    };
    track_elem.dataset.lastX = e.clientX;
  },
  true
);

window.addEventListener(
  "mouseup",
  function (e) {
    isDown = false;
    track_elem.dataset.lastX = e.clientX;
    track_elem.dataset.lastPercentage = track_elem.dataset.percentage;
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

      let maxPositionX = parseFloat(track_elem.dataset.lastX) - mousePosition.x;
      let maxWidth = window.innerWidth / 2;
      let percentage = (maxPositionX / maxWidth) * -100;
      let nextPercentage = parseFloat(track_elem.dataset.lastPercentage) + percentage;
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
      track_elem.dataset.percentage = nextPercentage;
      track_elem.style.transform = `translate(${nextPercentage}%, -50%)`;
    }
  },
  true
);
