// let dom = document.getElementById("dom");
// console.dir(dom);

// let h1 = document.querySelector("h1");
// console.dir(h1);

// let h3 = document.querySelectorAll("h3");
// console.dir(h3);

let title = document.querySelector("h1");
title.innerHTML = "Hey this is Abdul Hamid";
title.textContent = "Hey my name is Abdul Hamid";
title.innerText = "Hey I am a Developer";

let department = document.querySelector("h3");
department.innerHTML = "<h2>My Department : Computer</h2>";

let ancorTag = document.querySelector("a");
console.dir(ancorTag);
ancorTag.href = "https://www.facebook.com/";
console.log(ancorTag.getAttribute("href"));

// let img = document.querySelector("img");
// img.setAttribute(
//   "src",
//   "https://images.unsplash.com/photo-1759934455445-ed27462a25ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// );

let ancorTagGoogle = document.querySelector("#google");
ancorTagGoogle.removeAttribute("href");
console.log(ancorTagGoogle.getAttribute("href"));

let p = document.createElement("p");
p.textContent = "this is from p tag";
document.querySelector("body").prepend(p);

let h1UnderDiv = document.createElement("h1");
h1UnderDiv.textContent = "Hey may acha hu , tum kaise ho";
document.querySelector("div").append(h1Under);

// Example: Demonstrating the event object in an event handler

const eventObjBtn = document.createElement("button");
eventObjBtn.textContent = "Show Event Object Details";
eventObjBtn.style.margin = "12px 0";
document.body.appendChild(eventObjBtn);

eventObjBtn.addEventListener("click", function (event) {
  console.log("Event object:", event);
  alert(
    `Event type: ${event.type}
Target element: ${event.target.tagName}
Client X/Y: (${event.clientX}, ${event.clientY})
Timestamp: ${event.timeStamp}`
  );
});

// You can explore many properties on 'event' in the console such as:
// - event.type           -> Type of the event ("click")
// - event.target         -> The element that triggered the event
// - event.currentTarget  -> The element the handler is attached to
// - event.timeStamp      -> When the event occurred
// - event.clientX/Y      -> Mouse coordinates (for mouse events)
// - event.preventDefault(), event.stopPropagation(), etc.
/*
  # Detailed Explanation of the DOM Event Object and Its Key Properties/Methods

  When you listen for DOM events (e.g., with addEventListener), the event handler receives an event object.
  This object represents the event in the browser and provides information as well as methods to control its behavior.

  Here are the most important properties and methods with illustrative examples:
*/

// 1. event.type
//    - The string name of the event ("click", "keydown", etc.)
eventObjBtn.addEventListener("click", function (event) {
  console.log("event.type:", event.type); // "click"
});

// 2. event.target
//    - The actual DOM element that triggered the event.
//      Useful in delegation (e.g., clicking on a child in a list)
document.body.addEventListener("click", function (event) {
  console.log("Clicked element:", event.target.tagName);
});

// 3. event.currentTarget
//    - The element the handler is registered on.
//      Often differs from event.target in event delegation.
document.body.addEventListener("click", function (event) {
  console.log("Handler is on:", event.currentTarget.tagName);
  // Compare with event.target.tagName
});

// 4. event.preventDefault()
//    - Stops the default action (e.g., following a link, submitting a form).
let link = document.createElement("a");
link.href = "https://www.google.com/";
link.textContent = "Go to Google (default prevented!)";
document.body.appendChild(link);
link.addEventListener("click", function (event) {
  event.preventDefault(); // Stops navigation!
  alert("Navigation prevented. You stay on this page.");
});

// 5. event.stopPropagation()
//    - Prevents the event from bubbling up the DOM tree.
//      Useful to stop parent handlers.
let outer = document.createElement("div");
outer.style.border = "2px solid red";
outer.style.padding = "10px";
outer.textContent = "Outer DIV (Parent)";
let inner = document.createElement("button");
inner.textContent = "Inner Button (Child)";
outer.appendChild(inner);
document.body.appendChild(outer);

outer.addEventListener("click", function () {
  alert("Outer DIV clicked (bubbled event)");
});
inner.addEventListener("click", function (event) {
  event.stopPropagation(); // Stops click from reaching DIV
  alert("Inner Button clicked, event does NOT bubble to parent div");
});

// 6. event.bubbles, event.cancelable
//    - Boolean: Does the event bubble? (true by default for most "interaction" events)
//    - Can default action be prevented?
document.body.addEventListener("click", function (event) {
  console.log("bubbles:", event.bubbles, "cancelable:", event.cancelable);
});

// 7. event.timeStamp
//    - Numeric timestamp when the event was created (milliseconds)
eventObjBtn.addEventListener("click", function (event) {
  console.log("Event timeStamp (ms):", event.timeStamp);
});

// 8. Mouse Event Properties (for "click", "mousedown", etc.)
//    - event.clientX, event.clientY: Mouse coords (viewport)
//    - event.pageX, event.pageY: Mouse coords (page)
//    - event.button: which mouse button pressed (0=left, 1=middle, 2=right)
document.body.addEventListener("click", function (event) {
  console.log(
    "Mouse X/Y:",
    event.clientX,
    event.clientY,
    "| Button:",
    event.button
  );
});

// 9. Keyboard Event Properties (for "keydown", "keyup", etc.)
//    - event.key: the string value of the key ("a", "Enter", "Escape", etc.)
//    - event.code: physical key code ("KeyA", "Enter", etc.)
//    - event.altKey, event.ctrlKey, event.shiftKey, event.metaKey: Modifier keys
let keyInput = document.createElement("input");
keyInput.placeholder = "Press keys and check console";
document.body.appendChild(keyInput);
keyInput.addEventListener("keydown", function (event) {
  console.log(
    "Key:",
    event.key,
    " Code:",
    event.code,
    " Shift:",
    event.shiftKey,
    " Ctrl:",
    event.ctrlKey,
    " Alt:",
    event.altKey
  );
  if (event.key === "Enter") {
    event.preventDefault();
    alert("Enter key pressed. Default stopped.");
  }
});

// 10. Form Event Properties
//    - event.submitter (button that submitted, if applicable -- modern browsers)
//    - event.defaultPrevented (true if preventDefault was called)
let testForm = document.createElement("form");
testForm.innerHTML = `
  <input name="demo" placeholder="Try submitting" />
  <button>Submit</button>
`;
document.body.appendChild(testForm);
testForm.addEventListener("submit", function (event) {
  if (event.defaultPrevented) {
    alert("Default already prevented!");
  } else {
    event.preventDefault();
    alert(
      "Form submit prevented! event.defaultPrevented = " +
        event.defaultPrevented
    );
  }
  if (event.submitter) {
    console.log("Submit triggered by:", event.submitter);
  }
});

// 11. Clipboard Events (copy, cut, paste)
//    - event.clipboardData (to view/set clipboard)
//    - For example, prevent pasting of certain text:
let pasteField = document.createElement("input");
pasteField.placeholder = "Try to paste something here!";
document.body.appendChild(pasteField);
pasteField.addEventListener("paste", function (event) {
  let pasted = event.clipboardData.getData("text");
  if (pasted.includes("badword")) {
    event.preventDefault();
    alert("You cannot paste that word!");
  }
});

// 12. Touch/Pointer Event properties (mobile/platform support required):
//    - event.touches, event.changedTouches, event.pointerId, etc.

// 13. Custom Event properties
//    - If using CustomEvent, you can access event.detail for custom data.
let custom = new CustomEvent("example", { detail: { foo: 42 } });
document.body.addEventListener("example", function (e) {
  console.log("Custom event with detail:", e.detail);
});
document.body.dispatchEvent(custom);

/*
  ## More Properties and Methods:

  - event.isTrusted         // true if user-initiated (not from script)
  - event.relatedTarget     // e.g. element entered/leaved (mouseover/out)
  - event.composedPath()    // event bubbling path as an array of nodes
  - event.stopImmediatePropagation() // prevents *further* handlers for this event on the same element
  - event.srcElement (IE legacy, use event.target)
  - event.detail (custom events)

  ---

  # Summary Table

  | Property/Method        | Description/Example                                                        |
  |----------------------- |----------------------------------------------------------------------------|
  | event.type             | String event name ("click", etc.)                                         |
  | event.target           | Actual element clicked (or caused event)                                  |
  | event.currentTarget    | Element handler is registered on                                          |
  | event.preventDefault() | Cancels browser's default action                                          |
  | event.stopPropagation()| Stops bubbling up the DOM tree                                            |
  | event.bubbles          | Boolean, does event bubble?                                               |
  | event.cancelable       | Boolean, is default preventable?                                          |
  | event.timeStamp        | When event fired (ms)                                                     |
  | event.clientX/Y        | Mouse coords (relative to viewport)                                       |
  | event.key, event.code  | Key string and code (for keyboard events)                                 |
  | event.altKey, etc.     | Booleans: Were modifier keys pressed?                                     |
  | event.defaultPrevented | Has preventDefault already been called?                                   |
  | event.detail           | (Custom events) Any extra detail data                                     |
  | event.composedPath()   | The event propagation path as array of nodes                              |
  | ... many more (see MDN) | https://developer.mozilla.org/en-US/docs/Web/API/Event                   |

  # FURTHER EXPLORATION
    - Modern events: pointer events, focus events, drag/drop, touch events, etc.
    - See MDN for full list and deep explanations: https://developer.mozilla.org/en-US/docs/Web/API/Event
*/
