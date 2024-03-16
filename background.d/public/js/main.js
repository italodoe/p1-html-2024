const bg_positions = ['-25%', '-50%', '-75%', '-100%']
for (const [index, item] of document.querySelectorAll(".profile-item").entries()) {
  item.dataset.index = index;
  item.addEventListener("mouseover", onMouseOverHandser);
}

function onMouseOverHandser(e){
  let index = e.target.dataset.index;
  document.getElementById('bg_profile').style.backgroundPosition = `0 ${bg_positions[index]}`;
}
