const bodyRef = document.body;
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

let colorIntervalId = null;

startBtnRef.addEventListener('click', () => {
  startBtnRef.setAttribute('disabled', '');
  stopBtnRef.removeAttribute('disabled', '');
  colorIntervalId = setInterval(flashBody, 1000);
});

function flashBody() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

stopBtnRef.addEventListener('click', () => {
  stopBtnRef.setAttribute('disabled', '');
  startBtnRef.removeAttribute('disabled', '');
  clearInterval(colorIntervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
