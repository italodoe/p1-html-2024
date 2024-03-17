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

function runGenerateRandomCardColor() {
  var totalAudios = 27;
  var audioKeys = [...Array(totalAudios).keys()].sort(
    () => 0.5 - Math.random()
  );

  // random card inside glow
  function randomGenerateColor() {
    return [...Array(3).keys()].map(() => Math.floor(Math.random() * 256));
  }

  function setRandomColorStyle(card) {
    let randColor = randomGenerateColor();
    return (card.style = `---bg-r: ${randColor[0]};---bg-g: ${randColor[1]};---bg-b: ${randColor[2]}`);
  }

  function setRandomAudio(card) {
    let card_inside = card.querySelector(".card-inside");
    if (card_inside) {
      card_inside.dataset.audiosrc = `../public/audio/audio-${audioKeys.pop()}.wav`;
    }
  }

  for (const card of document.querySelectorAll(".card-h, .card-m")) {
    setRandomColorStyle(card);
    setRandomAudio(card);
  }
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

    let target = e.target;
    console.log(target);
    //show content of card
    if (HelperClass.hasClass(target, "card-m")) {
      let card_inside = target.querySelector(".card-inside");
      if (card_inside) {
        HelperClass.addClass(card_inside, "card-active");
        playMusic(card_inside.dataset.audiosrc, "page1");
      }
    }
    //sidebar clicks
    else if (HelperClass.hasClass(target, "menu-item")) {
      menuItemClickHandler(target);
    }
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

    stopCardVision();
    stopMusic("page1");
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
    const rect = target.getBoundingClientRect();
    const x = offset.x - rect.left;
    const y = offset.y - rect.top;
    target.style.cssText += `---mouse-x: ${x}px; ---mouse-y: ${y}px;`;

    //show original text
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
const audio = document.getElementById("music_player");

if (menu_btn) menu_btn.addEventListener("click", onClickMenu);

if (menu_close_btn) menu_close_btn.addEventListener("click", onClickMenu);

function onClickMenu(e) {
  toggleSidebar();
}

//click card
const stopCardVision = () => {
  for (const card of document.querySelectorAll(".card-inside")) {
    HelperClass.removeClass(card, "card-active");
  }
};

const playMusic = (src, code, loop = true) => {
  if (typeof src === "string" && !isPlaying(audio)) {
    audio.src = src;
    audio.volume = 0.2;
    audio.loop = true;
    audio.play();
    setAudioPageLabel(code);
  }
};

const pauseMusic = (code) => {
  if (getAudioPageLabel() === code && isPlaying(audio)) {
    audio.volume = 0.2;
    audio.pause();
  }
};

const stopMusic = (code) => {
  if (getAudioPageLabel() === code) {
    if (code && isPlaying(audio)) audio.pause();

    audio.currentTime = 0;
    audio.src = audio.src;
  }
};

const isPlaying = (media) => {
  return (
    media &&
    media.currentTime > 0 &&
    !media.paused &&
    !media.ended &&
    media.readyState > media.HAVE_CURRENT_DATA
  );
};

const setAudioPageLabel = (code) => {
  if (audio) {
    audio.dataset.pagecode = code;
  }
};

const getAudioPageLabel = () => {
  if (audio) {
    return audio.dataset.pagecode;
  }
};

//Box
const box = document.getElementById("the_box");
const lyric = document.getElementById("lyric");
var boxOffset = { x: 0, y: 0 };
lyric.dataset.lastY = 0;
lyric.dataset.lastPercentage = 0;

if (box) {
  box.addEventListener(
    "mouseup",
    function (e) {
      boxOffset = {
        x: e.clientX,
        y: e.clientY,
      };
      lyric.dataset.lastY = e.clientY;
      lyric.dataset.lastPercentage = lyric.dataset.percentage;
    },
    true
  );

  box.addEventListener(
    "mousedown",
    function (e) {
      boxOffset = {
        x: lyric.offsetLeft - e.clientX,
        y: lyric.offsetTop - e.clientY,
      };
      lyric.dataset.lastY = e.clientY;
    },
    true
  );

  box.addEventListener(
    "mousemove",
    function (e) {
      boxOffset = {
        x: e.clientX,
        y: e.clientY,
      };
      let maxPositionY = parseFloat(lyric.dataset.lastY) - boxOffset.y;
      let maxHeight = e.target.getBoundingClientRect().bottom / 2;
      let percentage = (maxPositionY / maxHeight) * -100;
      let nextPercentage =
        parseFloat(lyric.dataset.lastPercentage) + percentage;
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
      lyric.dataset.percentage = nextPercentage;
      lyric.style.transform = `translateY(${nextPercentage*1.355}%)`;
    },
    true
  );

  box.addEventListener(
    "click",
    function (e) {
      if (HelperClass.hasClass(box, "playing")) {
        stopMusic("page2");
      } else {
        let src = box.dataset.audiosrc;
        playMusic(src, "page2");
      }

      HelperClass.toggleClass(box, "playing");
    },
    true
  );
}

//sidebar
function menuItemClickHandler(target) {
  document.getElementById("body").dataset.index = target.dataset.index;
  toggleSidebar();
  //stop all music
  stopMusic("page1");
  stopMusic("page2");
  //reset box
  HelperClass.removeClass(box, "playing");
}

const toggleSidebar = () => {
  HelperClass.toggleClass(sidebar, "active-bg");
  HelperClass.toggleClass(menu_btn, "active-bg");
  HelperClass.toggleClass(menu_close_btn, "active-bg");
};

//Run
runRandomisation();
runGenerateRandomCardColor();
