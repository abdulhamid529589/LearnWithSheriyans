/* 
  DOM - Document Object Model: 
  It's a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.

  The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

  Common Real-World Example:
  1. Interactive forms (validation, dynamic fields)
  2. Modal windows (show/hide dialogs)
  3. Dynamic lists or tables (adding/removing items)
  4. SPA navigation (updating content without page reload)
*/

// 1. Selecting Elements (Ways to select DOM elements)
// ------------------------------

// By Id
const header = document.getElementById("header-id"); // <h1 id="header-id">

// By Class
const highlights = document.getElementsByClassName("highlight");

// By Tag Name
const allParagraphs = document.getElementsByTagName("p");

// Using modern querySelector / querySelectorAll (recommended)
const firstButton = document.querySelector("button.btn");
const allButtons = document.querySelectorAll("button.btn");

// 2. Modifying Content & Attributes
// ------------------------------

// Changing inner text
// <h1 id="title">Welcome</h1>
const title = document.getElementById("title");
if (title) {
  title.innerText = "Welcome to the DOM Tutorial!";
}

// Changing HTML content (Be careful with unsafe HTML, risk of XSS)
const container = document.querySelector(".container");
if (container) {
  container.innerHTML = "<p>This is <strong>DYNAMIC</strong> content.</p>";
}

// Changing attributes
const image = document.querySelector("#main-image");
if (image) {
  image.setAttribute("alt", "A beautiful scenery");
  image.src = "https://example.com/photo.jpg";
}

// Changing CSS styles
const box = document.querySelector(".box");
if (box) {
  box.style.backgroundColor = "#4caf50";
  box.style.padding = "20px";
  // You can remove a style:
  box.style.removeProperty("padding");
}

// 3. Creating, Adding, and Removing Elements
// ------------------------------

// Create an element
const newLi = document.createElement("li");
newLi.innerText = "New List Item";
// Add a class
newLi.classList.add("todo-item");

// Append to list
const ul = document.querySelector("ul.todo-list");
if (ul) {
  ul.appendChild(newLi);
}

// Remove an element
const toRemove = document.querySelector(".remove-me");
if (toRemove) {
  toRemove.parentNode.removeChild(toRemove);
  // or toRemove.remove(); // Modern browsers
}

// Clone elements
const originalButton = document.querySelector("#click-me");
if (originalButton) {
  const clone = originalButton.cloneNode(true);
  clone.id = "click-me-clone";
  originalButton.parentNode.appendChild(clone);
}

// 4. Event Handling (React to user actions)
// ------------------------------

// Inline HTML (not recommended): <button onclick="alert('Clicked!')">Click me</button>

// Best practice: via JavaScript
const btn = document.querySelector("#action-btn");
if (btn) {
  btn.addEventListener("click", function (e) {
    alert("Button was clicked!");
    // e.target - the element that triggered the event
  });
}

// Remove an event listener
function demoHandler() {
  console.log("hi");
}
btn && btn.addEventListener("mouseover", demoHandler);
// To remove:
btn && btn.removeEventListener("mouseover", demoHandler);

// Event delegation (when you have many similar elements)
const list = document.body.querySelector("ul");
if (list) {
  list.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "LI") {
      alert("You clicked list item: " + e.target.innerText);
    }
  });
}

// 5. Traversing the DOM (walk up, down, sideways)
// --------------------
const someElement = document.querySelector(".child");
// Parent node
if (someElement) {
  let parent = someElement.parentNode;
  // Children
  let children = someElement.children;
  // Next sibling
  let next = someElement.nextElementSibling;
  // Previous sibling
  let prev = someElement.previousElementSibling;
}

// Example: Highlight all even list items
const allLis = document.querySelectorAll("ul li");
allLis.forEach((li, i) => {
  if (i % 2 === 1) {
    li.style.backgroundColor = "#eee";
  }
});

// 6. Attributes vs. Properties
// -----------------------
// <input id="user" value="John">
const userInput = document.querySelector("#user");
if (userInput) {
  let val1 = userInput.getAttribute("value"); // value attribute in HTML
  let val2 = userInput.value; // current value property in JS (may change if user types)
}

// 7. Best Practices
// -----------------------
// - Use event delegation for large/complex UIs
// - Always check if an element exists before modifying
// - Use 'let' or 'const' (avoid 'var')
// - Minimize direct DOM manipulation for performance
// - Prefer querySelector/querySelectorAll for flexibility

// --- Real World Example: To-do List ---
// (Manipulates DOM: add, remove, update items dynamically)

function addTodoItem(text) {
  const ul = document.querySelector(".todo-list");
  if (!ul) return;
  const li = document.createElement("li");
  li.innerText = text;
  li.className = "todo-item";
  // Add a remove button
  const rmBtn = document.createElement("button");
  rmBtn.innerText = "Remove";
  rmBtn.onclick = function () {
    ul.removeChild(li);
  };
  li.appendChild(rmBtn);
  ul.appendChild(li);
}

// Usage (Suppose there's a button with id="add-todo-btn" and input with id="new-todo")
const addBtn = document.querySelector("#add-todo-btn");
const input = document.querySelector("#new-todo");
if (addBtn && input) {
  addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (value) {
      addTodoItem(value);
      input.value = "";
    }
  });
}

/* DOM Techniques Covered Above:
   - Selecting elements (getElement*, querySelector)
   - Modifying content, attributes, styles
   - Creating, appending, and removing nodes
   - Event handling and delegation
   - Working with attributes vs. properties
   - Real-World Interactive Example (To-do list)
   - Best practices for robust code
*/

// For further info: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

/* 
  --- Real-world DOM Techniques and Examples ---

  In real projects, developers use a wide range of DOM methods and techniques to build responsive, interactive, and maintainable web apps. Here are the essential skills and approaches, each explained and demonstrated:

  1. Element Selection
  2. Attribute and Property Manipulation
  3. Content Manipulation (text, HTML)
  4. Class and Style Manipulation
  5. Creating/Removing/Cloning Nodes
  6. Event Handling (including Delegation)
  7. Traversing and Querying the DOM
  8. Working with Forms and User Input
  9. Asynchronous DOM Updates (e.g. with fetch())
  10. Accessibility (ARIA attributes)
  11. Performance Patterns (Fragment, Debouncing)
*/

// 1. Element Selection
const mainHeader = document.querySelector("h1");
// const allButtons = document.querySelectorAll("button");
const byId = document.getElementById("new-todo");
const byClass = document.getElementsByClassName("todo-item");
const byTag = document.getElementsByTagName("li");

// 2. Attribute and Property Manipulation
if (mainHeader) {
  mainHeader.setAttribute("data-topic", "DOM");
  // Read and update attributes & properties
  console.log(mainHeader.getAttribute("data-topic")); // "DOM"
  mainHeader.title = "DOM Learning Header"; // Property
}

// 3. Content Manipulation (text, HTML)
if (mainHeader) {
  mainHeader.textContent = "Learn DOM in a Professional Way";
  // Insert HTML
  mainHeader.innerHTML +=
    ' <span style="font-size:0.5em;color:gray">(with Examples)</span>';
}

// 4. Class and Style Manipulation
if (mainHeader) {
  mainHeader.classList.add("highlight", "main-title");
  // Toggle class
  mainHeader.classList.toggle("active");
  // Inline CSS manipulation
  mainHeader.style.color = "navy";
  mainHeader.style.marginBottom = "1rem";
}

// 5. Creating/Removing/Cloning Nodes
// Efficiently create a block (Card) and add to DOM
function createCard(title, body) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>${title}</h2><p>${body}</p>`;
  // Add a close button
  const close = document.createElement("button");
  close.textContent = "×";
  close.className = "close-btn";
  close.onclick = () => card.remove();
  card.appendChild(close);
  return card;
}
// Usage:
const exampleCard = createCard(
  "DOM Example",
  "This card is dynamically created."
);
document.body.appendChild(exampleCard);

// Clone a node (deep clone includes children)
const cardCopy = exampleCard.cloneNode(true);
if (cardCopy) {
  cardCopy.querySelector("h2").textContent += " (copy)";
  document.body.appendChild(cardCopy);
}

// 6. Event Handling (including Delegation)
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-btn")) {
    // Event delegation: handle all close buttons, even those added later
    e.target.closest(".card")?.remove();
  }
});

// 7. Traversing and Querying the DOM
if (mainHeader) {
  // Parent/child/sibling relationships
  const parent = mainHeader.parentElement;
  const next = mainHeader.nextElementSibling;
  // All todo items under .todo-list
  const todos = document.querySelectorAll(".todo-list .todo-item");
}

// 8. Working with Forms and User Input
const form = document.createElement("form");
form.innerHTML = `
  <input name="username" placeholder="Username">
  <button type="submit">Submit</button>
`;
form.onsubmit = (e) => {
  e.preventDefault();
  const user = form.elements["username"].value;
  alert("Submitted username: " + user);
};
document.body.appendChild(form);

// 9. Asynchronous DOM Updates (with fetch, etc.)
function loadUserInfo() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((res) => res.json())
    .then((user) => {
      let info = document.createElement("div");
      info.className = "user-info";
      info.innerHTML = `<strong>User:</strong> ${user.name} <br><strong>Email:</strong> ${user.email}`;
      document.body.appendChild(info);
    });
}
loadUserInfo();

// 10. Accessibility (ARIA attributes)
if (mainHeader) {
  mainHeader.setAttribute("role", "heading");
  mainHeader.setAttribute("aria-level", "1");
  mainHeader.setAttribute("aria-label", "Main Section Header");
}

// 11. Performance Patterns
//  a. DocumentFragment for batch DOM updates
function addManyTodos(items) {
  const ul = document.querySelector(".todo-list");
  if (!ul) return;
  const fragment = document.createDocumentFragment();
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    li.className = "todo-item";
    fragment.appendChild(li);
  });
  ul.appendChild(fragment);
}
addManyTodos(["Read Docs", "Practice", "Review", "Build a Project"]);

//  b. Debouncing rapid DOM changes (e.g., live search input)
let searchTimeout;
const searchInput = document.createElement("input");
searchInput.placeholder = "Live Search Example";
searchInput.oninput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    // Simulate a live search/filter operation
    console.log("Searching for:", searchInput.value);
  }, 250); // only fires if user paused typing for 250ms
};
document.body.appendChild(searchInput);

/* 
  These patterns are broadly used in real product code:
    - Reusable functions for UI components
    - Event delegation for performance & dynamic UIs
    - ARIA/accessibility for inclusivity and compliance
    - Async updates for responsive UIs and data fetching
    - Class/style management for interactivity and theming
    - Using DocumentFragment for performance in lists/tables
    - Debounce/throttle to avoid unnecessary rendering
*/

/*
Try experimenting with these snippets in your project, always:
  - Check existence before manipulating
  - Clean up event listeners for SPA/unmounts
  - Use semantic HTML for accessibility
  - Comment why/what (not just how!)
  - Prefer delegation for event handling on lists/tables
*/
