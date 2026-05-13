// Example demonstrating event bubbling

// Suppose there's a button inside a div (as in your index4.html):
// <div id="nav">
//     <button id="bubbleBtn">Click and Follow</button>
// </div>

// Select the div and button
const navDiv = document.getElementById("nav");
const bubbleBtn = document.querySelector("#nav button");

// Add click event listener to the button
bubbleBtn.addEventListener("click", function (event) {
  alert("Button was clicked! (Bubbling phase)");
  // event.stopPropagation(); // Uncomment to stop the event from bubbling up
});

// Add click event listener to the parent div
navDiv.addEventListener("click", function (event) {
  alert("Div was clicked! (event bubbled up from button)");
});

// Now, when you click the button:
// 1. The button's click listener runs first (because the event originated there).
// 2. Then, the event bubbles up to the parent div, triggering its listener.
// This is called "event bubbling" in the DOM event model.
// Event Capturing (also known as "capture phase") is another important part of the DOM event flow model, which includes three phases:
// 1. Capturing phase (from document down to the event target, before bubbling).
// 2. Target phase (the event reaches the target).
// 3. Bubbling phase (event bubbles up from the target back up to document).
//
// By default, event listeners are attached during the bubbling phase. However, you can attach listeners in the capturing phase by passing `true` as the third argument to `addEventListener` (or using `{ capture: true }`).
//
// During event capturing, the event travels from the outermost ancestor (like `document`) down to the target element. Listeners registered in capture will fire in this order as the event "descends" the DOM.
//
// Example: Let's demonstrate event capturing with the same structure

// Select elements
const mainDiv = document.getElementById("main");
const navDivCapture = document.getElementById("nav");
const buttonCapture = document.querySelector("#nav button");

// Add capture listeners
mainDiv.addEventListener(
  "click",
  function (event) {
    alert("main DIV clicked (capturing phase)");
  },
  true // <--- Important! This attaches the listener to the capture phase
);

navDivCapture.addEventListener(
  "click",
  function (event) {
    alert("nav DIV clicked (capturing phase)");
  },
  true // capture phase
);

buttonCapture.addEventListener(
  "click",
  function (event) {
    alert("Button clicked (capturing phase)");
  },
  true // capture phase
);

// For comparison, let's also add a bubbling phase listener to the button:
buttonCapture.addEventListener("click", function (event) {
  alert("Button clicked (bubbling phase, after capture)");
});

// Now what happens if you click the button?
// - The event starts at the root and "captures" down to the button:
//   1. main DIV (capturing listener runs FIRST)
//   2. nav DIV (capturing listener runs)
//   3. Button (capturing listener runs)
// - THEN the target and bubbling listeners fire:
//   4. Button (bubbling listener runs)
//   5. nav DIV and main DIV (if bubbling listeners exist, they run now)
//
// So if you click the button, you'll see these alerts in order:
//   - main DIV clicked (capturing phase)
//   - nav DIV clicked (capturing phase)
//   - Button clicked (capturing phase)
//   - Button clicked (bubbling phase, after capture)
//
// This lets you "intercept" events before they reach their final target.
