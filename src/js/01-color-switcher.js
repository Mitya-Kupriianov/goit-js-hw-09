const reff = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let id = null;
reff.btnStop.disabled = false;

function backgroundStart() {
  changeDisableBtn(reff.btnStart, reff.btnStop);
  id = setInterval(() => {
    reff.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}
function backgroundStop() {
  clearInterval(id);
  changeDisableBtn(reff.btnStop, reff.btnStart);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeDisableBtn(btnStart, btnStop) {
  btnStart.disabled = true;
  btnStop.disabled = false;
}

reff.btnStart.addEventListener('click', backgroundStart);
reff.btnStop.addEventListener('click', backgroundStop);
