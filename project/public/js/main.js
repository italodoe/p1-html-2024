const glow_elem = document.getElementById("glow");
var offset = { x: 0, y: 0 };
var isDown = false;
var interval = null;
var isIntervalActive = true;

const HelperClass = {
  addClass: (elem, className) => {
    return elem.classList.add(className);
  },
  removeClass: (elem, className) => {
    return elem.classList.remove(className);
  },
  hasClass: (elem, className) => {
    return elem.classList.contains(className);
  },
  toggleClass: (elem, className, force = null) => {
    let addClass =
      force !== null ? force : !HelperClass.hasClass(elem, className);
    return addClass
      ? HelperClass.addClass(elem, className)
      : HelperClass.removeClass(elem, className);
  },
};

//helpers

// random card inside glow
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
    // console.log(target);
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
const phrase_two = document.getElementById("profile_career");
const original_phrase = phrase_one.innerText;
const original_phrase2 = phrase_two.innerText;

const runRandomisation = () => {
  interval = setInterval(() => {
    isIntervalActive = true;

    const getRandomText = (phrase) => {
      let text = "";
      for (const letter of phrase.innerText) {
        if (letter !== " ") text += randomString(1, false);
        else text += " ";
      }
      return text;
    };

    phrase_one.textContent = getRandomText(phrase_one);
    phrase_two.textContent = getRandomText(phrase_two);
  }, 73);
};

const stopRandomisation = () => {
  isIntervalActive = false;
  clearInterval(interval);
};

function setOriginalPhrase() {
  let index = 0;

  function runchange(index_inside, phrase, original) {
    let text = phrase.innerText;
    str = text.split("");
    str[index_inside] = original[index_inside];
    text = str.join("");
    phrase.innerText = text;
  }

  const timer = setInterval(() => {
    runchange(index, phrase_one, original_phrase);
    runchange(index++, phrase_two, original_phrase2);

    if (index === Math.max(original_phrase.length, original_phrase2.length))
      clearInterval(timer);
  }, 21);
}

runRandomisation();

// menu background
for (const [index, item] of document.querySelectorAll(".menu-item").entries()) {
  item.dataset.index = index;
  item.addEventListener("mouseover", onMouseOverHandser);
}

function onMouseOverHandser(e) {
  let index = e.target.dataset.index;
  let threshold = 25;
  document.getElementById("bg_menu").style.backgroundPosition = `0 ${
    (index * threshold + threshold * index) * -1
  }%`;
}

//open/close sidebar
const sidebar = document.getElementById("sidebar");
const menu_btn = document.getElementById("menu_btn");
const menu_close_btn = document.getElementById("menu_close_btn");

if (menu_btn) menu_btn.addEventListener("click", onClickMenu);

if (menu_close_btn) menu_close_btn.addEventListener("click", onClickMenu);

function onClickMenu(e) {
  HelperClass.toggleClass(menu_btn, "active-bg");
  HelperClass.toggleClass(menu_close_btn, "active-bg");
  HelperClass.toggleClass(sidebar, "active-bg");
}
