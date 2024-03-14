function randomGenerateColor() {
  return [...Array(3).keys()].map(() => Math.floor(Math.random() * 256));
}

console.log(randomGenerateColor());

for (const card of document.querySelectorAll(".card")) {
  console.log(card);
  let randColor = randomGenerateColor();
  console.log(randColor);
  card.style = `---bg-r: ${randColor[0]};---bg-g: ${randColor[1]};---bg-b: ${randColor[2]}`;
}
