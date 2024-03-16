const glow_elem = document.getElementById("glow");
var offset = { x: 0, y: 0 };
var isDown = false;
var interval = null;
var isIntervalActive = true;

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

    if (target.classList.contains("nav-top") && isIntervalActive) {
      stopRandomisation();
      setOriginalPhrase();
    } 

  },
  true
);

// Randomize String

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
const original_phrase = phrase_one.innerText;
let text = "";

const runRandomisation = () => {
  interval = setInterval(() => {
    isIntervalActive = true;
    text = "";
    for (const letter of phrase_one.innerText) {
      if (letter !== " ") text += randomString(1, false);
      else text += " ";
    }
    phrase_one.textContent = "";
    phrase_one.textContent = text;
  }, 63);
};

const stopRandomisation = () => {
  isIntervalActive = false;
  clearInterval(interval);
};

function setOriginalPhrase() {
  let index = 0;

  function runchange(index_inside) {
    let text = phrase_one.innerText;
    str = text.split("");
    str[index_inside] = original_phrase[index_inside];
    text = str.join("");
    phrase_one.innerText = text;
  }

  const timer = setInterval(() => {
    runchange(index++);
    if (index === original_phrase.length) 
      clearInterval(timer);
  }, 31);
}

runRandomisation();
