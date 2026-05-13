let h1 = document.querySelector("h1");
h1.style.color = "red";

h1.addEventListener("click", function () {
  h1.style.color = "yellow";
});

let body = document.querySelector("body");
body.style.backgroundColor = "black";
body.style.color = "white";

// Remove Event Listener
let p = document.querySelector("p");

function dbclick() {
  p.style.color = "yellow";
}

// Add the event listener
p.addEventListener("dblclick", dbclick);

// Remove the event listener (when needed)
p.removeEventListener("dblclick", dbclick);

let input = document.querySelector("input");
input.addEventListener("input", function (inputDetails) {
  // console.log("You Typed");
  if (inputDetails.data !== null) {
    console.log(inputDetails.data);
  }
});

let devices = document.querySelector("#devices");
let select = document.querySelector("select");
select.addEventListener("change", function (details) {
  console.log(details.target.value);
  devices.textContent = `${details.target.value} Device Selected`;
});
