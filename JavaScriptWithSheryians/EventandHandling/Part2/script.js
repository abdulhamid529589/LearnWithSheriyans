let body = document.querySelector("body");
body.style.backgroundColor = "black";
body.style.color = "white";

let h1 = document.querySelector("h1");
window.addEventListener("keydown", function (yourTypedText) {
  console.log(yourTypedText);
  if (yourTypedText.key === " ") {
    h1.textContent = "Space";
  } else {
    h1.textContent = yourTypedText.key;
  }
});

let btn = document.querySelector("#btn");
let fileInput = document.querySelector("#fileInput");
btn.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (details) {
  // console.log(details.target.files[0].name);
  const file = details.target.files[0];
  if (file) {
    btn.textContent = `You Uploaded ${file.name}`;
  }
});
