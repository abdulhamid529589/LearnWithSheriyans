/*
  # All About Event Listeners in the DOM
  Event listeners allow you to "listen" for specific events on HTML elements (clicks, typing, mouse movement, focus, etc.) and run some JavaScript code when they happen. 
  This is a core part of making your page interactive!

  ## 1. Basic addEventListener Syntax

    element.addEventListener(eventType, callbackFunction, options);

    - eventType: A string like "click", "mouseenter", "keydown", etc.
    - callbackFunction: The function to run when the event occurs.
    - options (optional): Object or boolean for settings like capture, once, passive.

  ## 2. Most Common DOM Event Types (with examples):

    - Mouse events: click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, contextmenu
    - Keyboard events: keydown, keyup, keypress
    - Form events: submit, change, input, focus, blur
    - UI events: load, resize, scroll
    - Clipboard: cut, copy, paste
    - Others: touch events (mobile), pointer events, drag & drop, etc.

  ---------
  ## Examples with createElement
  ---------

  Let's demonstrate the major event listeners, each with a real code example
*/

/* 1. Click Event Example */
const clickBtn = document.createElement("button");
clickBtn.textContent = "Click Me!";
document.body.appendChild(clickBtn);

clickBtn.addEventListener("click", function (event) {
  alert("Button was clicked! Event type: " + event.type);
});

/* 2. Mouse Events Example */
const mouseBox = document.createElement("div");
mouseBox.textContent = "Mouse Over, Mouse Down, and Right click Me!";
mouseBox.style.width = "260px";
mouseBox.style.height = "60px";
mouseBox.style.border = "2px solid blue";
mouseBox.style.margin = "10px 0";
mouseBox.style.textAlign = "center";
mouseBox.style.lineHeight = "60px";
document.body.appendChild(mouseBox);

// mouseover & mouseout
mouseBox.addEventListener("mouseover", function () {
  mouseBox.style.background = "lightyellow";
});
mouseBox.addEventListener("mouseout", function () {
  mouseBox.style.background = "";
});
// mousedown & mouseup
mouseBox.addEventListener("mousedown", function () {
  mouseBox.style.borderColor = "red";
});
mouseBox.addEventListener("mouseup", function () {
  mouseBox.style.borderColor = "blue";
});
// contextmenu (right click)
mouseBox.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right click/contextmenu on box!");
});

/* 3. Keyboard Events Example */
const inputField = document.createElement("input");
inputField.placeholder = "Type and Press Enter";
inputField.style.display = "block";
inputField.style.margin = "10px 0";
document.body.appendChild(inputField);

// keydown and keyup
inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    alert("You pressed Enter! Value: " + inputField.value);
  }
});

inputField.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    inputField.value = "";
    alert("Input cleared (Esc pressed)");
  }
});

/* 4. Form Events Example */
const form = document.createElement("form");
form.style.margin = "15px 0";
form.innerHTML = `
  <input name="username" placeholder="Enter username" />
  <button type="submit">Submit</button>
`;
document.body.appendChild(form);
// submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents page from reloading
  alert("Form submitted with username: " + form.username.value);
});
// focus & blur
form.username.addEventListener("focus", function () {
  form.username.style.background = "#e3fcef";
});
form.username.addEventListener("blur", function () {
  form.username.style.background = "";
});
// input & change
form.username.addEventListener("input", function () {
  // Fires every time value changes
  form.username.style.borderColor = "orange";
});
form.username.addEventListener("change", function () {
  // Fires when input is unfocused after a change
  form.username.style.borderColor = "green";
});

/* 5. UI Events Example (window) */
// Resize
window.addEventListener("resize", function () {
  document.body.style.background =
    "rgb(" + (window.innerWidth % 255) + ",240,240)";
});
// Scroll (add a tall div to demonstrate)
const tallDiv = document.createElement("div");
tallDiv.style.height = "900px";
document.body.appendChild(tallDiv);
window.addEventListener("scroll", function () {
  console.log("You scrolled. Y offset:", window.scrollY);
});

/* 6. Clipboard Events Example */
const clipInput = document.createElement("input");
clipInput.style.display = "block";
clipInput.placeholder = "Try copy/cut/paste here";
document.body.appendChild(clipInput);

clipInput.addEventListener("copy", function (e) {
  alert("You copied the input text!");
});
clipInput.addEventListener("cut", function (e) {
  alert("You cut the input text!");
});
clipInput.addEventListener("paste", function (e) {
  alert("You pasted into the input!");
});

/* 7. Event Listener Options: once, capture, passive */
// 'once': fires only the first time
const onceBtn = document.createElement("button");
onceBtn.textContent = "Click Me ONLY ONCE!";
document.body.appendChild(onceBtn);
onceBtn.addEventListener(
  "click",
  function () {
    alert("This button only works once!");
  },
  { once: true }
);

/* 8. Removing Event Listeners */
const rmBtn = document.createElement("button");
rmBtn.textContent = "Click to REMOVE above button";
document.body.appendChild(rmBtn);

function removeOnceBtn() {
  onceBtn.remove();
  rmBtn.disabled = true;
  rmBtn.textContent = "Button removed!";
}
rmBtn.addEventListener("click", removeOnceBtn);

/* 9. Event Delegation Example: Listen on parent and react to children clicks */
const list = document.createElement("ul");
for (let i = 1; i <= 5; ++i) {
  const li = document.createElement("li");
  li.textContent = "List Item #" + i;
  list.appendChild(li);
}
document.body.appendChild(list);
// Listen for clicks on the list, NOT on individual <li>
list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.style.background = "#c9f";
    alert("Clicked: " + e.target.textContent);
  }
});

/*
  # Summary Table of Common Event Types
  | Event type   | Where used         | Common circumstances         |
  | ------------ | ----------------- | ----------------------------|
  | click        | button, link, div  | Any clickable element       |
  | dblclick     | button, image      | Double mouse click          |
  | mouseover    | any                | Mouse pointer enters        |
  | mouseout     | any                | Pointer leaves element      |
  | mousedown/up | any                | Mouse button press/release  |
  | contextmenu  | any                | Right-click context menu    |
  | keydown      | input, doc         | Any key pressed             |
  | keyup        | input, doc         | Key released                |
  | input        | input, textarea    | Any input change            |
  | change       | input, select      | Input loses focus after change|
  | submit       | form               | Form submission             |
  | focus/blur   | input, button      | Element gets/loses focus    |
  | load         | window, image      | Image or page loaded        |
  | resize       | window             | Window size changes         |
  | scroll       | window, element    | Scrolling happens           |
  | cut/copy/paste | input, textarea  | Clipboard operations        |
*/

/*
    # Advanced: Custom Events

    You can also create and dispatch your own events:
 */
const customBtn = document.createElement("button");
customBtn.textContent = "Dispatch Custom Event";
document.body.appendChild(customBtn);

customBtn.addEventListener("superclicked", function (e) {
  alert("Custom event triggered! Data: " + e.detail);
});

customBtn.addEventListener("click", function () {
  // Dispatch custom event
  const myEvent = new CustomEvent("superclicked", { detail: "Hello World" });
  customBtn.dispatchEvent(myEvent);
});

/*
  ## Best Practices for DOM Events
    - Use addEventListener, NOT element.onclick = ... (for flexibility)
    - Remove event listeners when not needed (for performance)
    - Use event delegation for lots of dynamic elements
    - Access event object (e.g. event.target, event.type)
    - Prefer arrow functions only if you don't need "this" inside handler

  Explore more event types on MDN: https://developer.mozilla.org/en-US/docs/Web/Events
*/

/*
  # Practice DOM Project: Interactive Favorite Department List

  Let's build a small interactive project using the DOM, based on the sample HTML you provided.

  ## Project Idea

  We'll create a "Favorite Department" feature:
    - Students can click on a department to add it to their favorites.
    - The favorite list appears below.
    - Favorites can be removed.
    - Input allows adding a *custom* department dynamically.
    - We'll cover selection, events, creation, deletion, and input handling.

  ---
  ## Step-by-step Guide with Detailed Explanation

  ### 1. Select all department elements

  We know the `<h3 class="department">...</h3>` are used for departments:

    const departments = document.querySelectorAll('.department');

  ### 2. Create a container to show the favorites

  We'll create a container in JavaScript and insert it in the DOM after the last department.

    const favContainer = document.createElement('div');
    favContainer.innerHTML = '<h2>Your Favorite Departments</h2>';
    const favList = document.createElement('ul');
    favList.id = 'favorite-departments';
    favContainer.appendChild(favList);
    // Insert after last department
    departments[departments.length - 1].after(favContainer);

  ### 3. Add click event listeners to departments

  We'll respond to clicks and add the department to favorites if not already present.

    function addToFavorites(name) {
      // Prevent duplicate
      if ([...favList.children].some(li => li.textContent.startsWith(name))) {
        alert("Already in favorites!");
        return;
      }
      const li = document.createElement('li');
      li.textContent = name + ' ';
      // Button to remove
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "Remove";
      removeBtn.onclick = function() { li.remove(); };
      li.appendChild(removeBtn);
      favList.appendChild(li);
    }

    departments.forEach(dep => {
      dep.style.cursor = "pointer";
      dep.addEventListener('click', function() {
        addToFavorites(dep.textContent);
      });
    });

  ### 4. Add input for custom department

  Let's allow the user to type and add a department.

    const customDiv = document.createElement('div');
    customDiv.innerHTML = `
      <input type="text" id="custom-dept" placeholder="Add your custom department">
      <button id="add-dept-btn">Add Department</button>
    `;
    favContainer.before(customDiv);
    const addBtn = customDiv.querySelector('#add-dept-btn');
    const input = customDiv.querySelector('#custom-dept');
    addBtn.addEventListener('click', function() {
      const name = input.value.trim();
      if (!name) {
        alert("Please enter a department name.");
        return;
      }
      addToFavorites(name);
      input.value = "";
    });

  ---

  ## Full Example Code

  Put together, here is the DOM script for a project letting users build their favorite department list:

*/

(function () {
  // 1. Get all department elements
  const departments = document.querySelectorAll(".department");
  if (!departments.length) return;

  // 2. Create favorites container
  const favContainer = document.createElement("div");
  favContainer.style.marginTop = "2em";
  favContainer.innerHTML = "<h2>Your Favorite Departments</h2>";
  const favList = document.createElement("ul");
  favList.id = "favorite-departments";
  favContainer.appendChild(favList);

  // Insert after last department
  departments[departments.length - 1].after(favContainer);

  // 3. Function to add department to favorites
  function addToFavorites(name) {
    // Check for duplicate
    if (
      [...favList.children].some(
        (li) => li.firstChild.textContent.trim() === name
      )
    ) {
      alert("Already in favorites!");
      return;
    }
    const li = document.createElement("li");
    li.style.margin = "0.5em 0";
    // Add department name and a remove button
    const textSpan = document.createElement("span");
    textSpan.textContent = name;
    li.appendChild(textSpan);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "1em";
    removeBtn.addEventListener("click", function () {
      li.remove();
    });
    li.appendChild(removeBtn);

    favList.appendChild(li);
  }

  // 4. Click-to-favorite for existing department elements
  departments.forEach((dep) => {
    dep.style.cursor = "pointer";
    dep.title = "Click to add to favorites";
    dep.addEventListener("click", function () {
      addToFavorites(dep.textContent);
    });
  });

  // 5. Add a form for custom department input
  const customDiv = document.createElement("div");
  customDiv.style.margin = "1em 0";
  customDiv.innerHTML = `
    <input type="text" id="custom-dept" placeholder="Add your custom department"
      style="font-size:1em; padding:0.3em;">
    <button id="add-dept-btn" style="font-size:1em;">Add Department</button>
  `;
  favContainer.before(customDiv);

  // 6. Handle custom department adding
  const addBtn = customDiv.querySelector("#add-dept-btn");
  const input = customDiv.querySelector("#custom-dept");
  addBtn.addEventListener("click", function () {
    const name = input.value.trim();
    if (!name) {
      alert("Please enter a department name.");
      return;
    }
    addToFavorites(name);
    input.value = "";
  });

  // Optional: allow enter key to add
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
})();

/*
  ## What You Learned
    - Selecting elements: document.querySelectorAll('.department')
    - Creating and inserting nodes
    - Handling events (click, keydown)
    - Modifying the DOM (add/remove children)
    - Preventing duplicates and using alerts
    - Accessing event target and using callbacks

  ## Experiment!

    - Style it further with CSS.
    - Make favorites persistent using localStorage.
    - Add count, or emoji for favorites.
    - Practice: Try building similar functionality for "Favorite Links" or "Images".

  The DOM and event system let you build ANY interactive feature you find on web apps!
*/
