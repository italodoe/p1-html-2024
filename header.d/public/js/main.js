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

const phrase_one = document.getElementById("phrase_two");
const original_phrase = phrase_one.textContent;
console.log(phrase_one.textContent);
let text = "";

setInterval(() => {
    text = "";
  for (const letter of phrase_one.textContent) {
    if (letter !== " ") 
        text += randomString(1, false);
    else 
        text += " ";

    console.log(letter);
  }
  phrase_one.textContent = "";
  phrase_one.textContent = text;
}, 66);

console.log(text);

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

console.log(randomString(5, false));
