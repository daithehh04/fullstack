const counter = document.querySelector(".counter");
const btn = document.querySelector(".btn");

let timer = 0;
let count = 30;
let isDownload = false;

const handleCounter = (startTime) => {
  if (timer <= startTime) {
    count--;
    counter.textContent = count;
    timer = startTime + 1000;
  }
  if (count === 0) {
    isDownload = true;
    btn.removeAttribute("disabled");
  }
  if (count > 0) {
    window.requestAnimationFrame(handleCounter);
  }
};

btn.addEventListener("click", () => {
  if (isDownload) {
    window.open("https://fullstack.edu.vn", "_blank");
  }
});
handleCounter()
