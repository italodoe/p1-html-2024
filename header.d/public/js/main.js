const glow_elem = document.getElementById("glow");

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
    
    mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    glow_elem.style.transform = `translate(${mousePosition.x - 300}px, ${
      mousePosition.y - 300
    }px)`;

  },
  true
);
