const textEle = document.querySelector(".text");
let textContent = textEle.innerText;

let arrText = textContent.split(" ");
let copyText = [...arrText];

let i = 0;
setInterval(() => {
  arrText[i] = `<span class="hight-light">${arrText[i]}</span>`;
  textContent = arrText.join(" ");
  textEle.innerHTML = textContent;

  arrText[i] = copyText[i];
  i++;
  if (i === arrText.length) {
    i = 0;
  }
}, 1000);
