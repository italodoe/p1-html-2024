const glow_elem = document.getElementById("glow");

window.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = {
      x: e.clientX,
      y: e.clientY,
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
    // let offset = ;
    const percentage = (mousePosition.x / this.window.innerWidth) * 100;
    document.getElementById(
      "right_layer"
    ).style.width = `calc(${percentage}% - 10px)`;
  },
  true
);
