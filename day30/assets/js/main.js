const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const fileBtn = $(".btn-file");
const btnStyle = $$(".style-editor button")
const btnDropdown = $(".dropdown");
const txtBtn = $(".txt-btn");
const pdfBtn = $(".pdf-btn");
const textEditor = $(".text-editor");
const newBtn = $(".new-btn");
const btnBold = $(".btn-bold");
const btnUnderline = $(".btn-underline");
const btnItalic = $(".btn-italic");
const inputNameFile = $(".file-name");
const inputColor = $('input[type="color"]');

let checkDropdown = false;
function setDropDown() {
  if (!checkDropdown) {
      btnDropdown.classList.add("active");
      checkDropdown = true;
  } else {
      btnDropdown.classList.remove("active");
      checkDropdown = false;
  }
}

fileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setDropDown();
});

document.addEventListener("click", () => {
  btnDropdown.classList.remove("active");
  checkDropdown = false;
});

btnBold.addEventListener("click", () => {
  document.execCommand("bold", false, null);
});
btnItalic.addEventListener("click", () => {
  document.execCommand("italic", false, null);
});
btnUnderline.addEventListener("click", () => {
  document.execCommand("underline", false, null);
});
inputColor.addEventListener("input", () => {
  document.execCommand("foreColor", false, inputColor.value);
});
btnStyle.forEach(btn => {
  btn.addEventListener('click',function() {
    this.classList.toggle('active')
  })
})
newBtn.addEventListener("click", () => {
  textEditor.innerText = "";
  $(".num-words").innerText = 0;
  $(".num-characters").innerText = 0;
  inputNameFile.value = "untitled";
});

// Count text
function countText() {
  if (/^\s*$/.test(textEditor.innerText)) {
    $(".num-words").innerText = 0;
    $(".num-characters").innerText = 0;
    return
  }
  const txt = textEditor.innerText.trim();
  const numWords = txt.split(/\s+/g).length;
  const numCharacters = txt.length;
  $(".num-words").innerText = numWords;
  $(".num-characters").innerText = numCharacters;
}
textEditor.addEventListener("input", countText);
// Download file
txtBtn.addEventListener("click", () => {
  const blob = new Blob([textEditor.innerText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${inputNameFile.value}.txt`;
  link.click();  
});
pdfBtn.addEventListener("click", () => {
  const option = {
    filename: `${inputNameFile.value}.pdf`,
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(option).from(textEditor).save();
});
textEditor.addEventListener("paste", (e) => {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});