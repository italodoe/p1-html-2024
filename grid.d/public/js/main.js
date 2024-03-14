function randomGenerateColor() {
  return [...Array(3).keys()].map(() => Math.floor(Math.random() * 256));
}

function setRandomColorStyle(card) {
  let randColor = randomGenerateColor();
  return (card.style = `---bg-r: ${randColor[0]};---bg-g: ${randColor[1]};---bg-b: ${randColor[2]}`);
}

for (const card of document.querySelectorAll(".card")) {
  console.log(card);
  setRandomColorStyle(card);
}

window.addEventListener(
  "mousemove",
  function (e) {
    offset = {
      x: e.clientX,
      y: e.clientY,
    };

    console.log(offset);
    const target = e.target;
    console.log(target);
    const rect = target.getBoundingClientRect();
    console.log(rect);
    const x = offset.x - rect.left;
    const y = offset.y - rect.top;
    target.style.cssText += `---mouse-x: ${x}px; ---mouse-y: ${y}px;`
  },
  true
);
