const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
 
let time = null;
stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', () => {
  stopButton.removeAttribute('disabled');
  startButton.setAttribute('disabled', true);
  time = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000)
});

stopButton.addEventListener('click', () => {
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
  clearInterval(time);
})