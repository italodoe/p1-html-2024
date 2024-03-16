const glow_elem = document.getElementById("glow");

function randomGenerateColor() {
  return [...Array(3).keys()].map(() => Math.floor(Math.random() * 256));
}

function setRandomColorStyle(card) {
  let randColor = randomGenerateColor();
  return (card.style = `---bg-r: ${randColor[0]};---bg-g: ${randColor[1]};---bg-b: ${randColor[2]}`);
}

for (const card of document.querySelectorAll(".card-h, .card-m")) {
  setRandomColorStyle(card);
}

window.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = {
      x: e.clientX,
      y: e.clientY,
    };
    glow_elem.style.transform = `translate(${offset.x - 300}px, ${
      offset.y - 300
    }px)`;
    glow_elem.style.opacity = `0.28`;

  },
  true
);

window.addEventListener(
  "mouseup",
  function (e) {
    isDown = false;
    offset = {
      x: e.clientX,
      y: e.clientY,
    };
    glow_elem.style.opacity = `0`;
  },
  true
);

window.addEventListener(
  "mousemove",
  function (e) {
    offset = {
      x: e.clientX,
      y: e.clientY,
    };
    //glow

    if (isDown) {
      glow_elem.style.transform = `translate(${offset.x - 300}px, ${
        offset.y - 300
      }px)`;
      glow_elem.style.opacity = `0.28`;
      
    }
    //inside cards
    const target = e.target;
    console.log(target);
    const rect = target.getBoundingClientRect();
    const x = offset.x - rect.left;
    const y = offset.y - rect.top;
    target.style.cssText += `---mouse-x: ${x}px; ---mouse-y: ${y}px;`;
  },
  true
);

function randomString(length, Uppercase = true) {
  let str = "";
  const character_case = Uppercase
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    : "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = character_case.length;
  let counter = 0;
  while (counter < length) {
    str += character_case.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return str;
}

const phrase_one = document.getElementById("profile_name");
const original_phrase = phrase_one.textContent;
let text = "";

setInterval(() => {
  text = "";
  for (const letter of phrase_one.textContent) {
    if (letter !== " ") text += randomString(1, false);
    else text += " ";
  }
  phrase_one.textContent = "";
  phrase_one.textContent = text;
}, 63);
