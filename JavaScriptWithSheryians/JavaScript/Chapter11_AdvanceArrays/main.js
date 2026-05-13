/*
====================================
Advanced Arrays in JavaScript (with Real-World Examples)
====================================

Arrays are powerful and flexible in JavaScript. Once you know the basics, "advanced" array skills involve higher-order methods, manipulating arrays of objects, multidimensional arrays, and patterns you'll find in real projects.

Let's explore these core advanced topics, with clear explanations and real-world style examples.


-------------------------
1. Higher-Order Methods: map, filter, reduce, find, some, every
-------------------------

These methods allow you to *process and transform* arrays in expressive, concise ways.

- map: transforms each element, returns new array.
- filter: selects elements matching a condition, returns new array.
- reduce: accumulates array into a single value (sum, object, etc.).
- find: gets the first element matching a condition.
- some/every: test if *any/all* elements match a condition.

Real-world example: Transform and process API response

Suppose an API returns a list of users:
*/
const apiUsers = [
  { id: 1, name: "Amit", active: true },
  { id: 2, name: "Neha", active: false },
  { id: 3, name: "Ravi", active: true },
];

// 1. Make a list of only active users (filter)
const activeUsers = apiUsers.filter((u) => u.active);
console.log("Active:", activeUsers);

// 2. Get only names in uppercase (map)
const upperNames = apiUsers.map((u) => u.name.toUpperCase());
console.log("Uppercase Names:", upperNames);

// 3. Check if all users are active (every)
const allActive = apiUsers.every((u) => u.active);
console.log("Are all users active?", allActive);

// 4. Find the user with id=2 (find)
const user2 = apiUsers.find((u) => u.id === 2);
console.log("User with id=2:", user2);

// 5. Count number of active users (reduce)
const activeCount = apiUsers.reduce(
  (count, u) => count + (u.active ? 1 : 0),
  0
);
console.log("Active user count:", activeCount);

/*
-------------------------------
2. Array of Objects: Real Project Manipulations
-------------------------------

In real applications, you often deal with *arrays of objects* (e.g., products, users, orders).

Example: Shopping Cart Calculation
*/
const cart = [
  { product: "Laptop", price: 70000, qty: 1 },
  { product: "Mouse", price: 1500, qty: 2 },
  { product: "USB Cable", price: 500, qty: 3 },
];

// Calculate total price in cart (reduce)
const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.qty,
  0
);
console.log("Cart Total: ₹" + cartTotal);

/*
-------------------------------
3. Sorting Arrays (with custom logic)
-------------------------------

Arrays can be sorted using .sort(). For *arrays of objects*, you provide a function.

Example: Sort products by price (descending)
*/
const products = [
  { name: "B", price: 200 },
  { name: "A", price: 150 },
  { name: "C", price: 300 },
];
products.sort((a, b) => b.price - a.price);
console.log("Sorted (price desc):", products);

/*
-------------------------
4. Flat, flatMap: Handling Nested Arrays (Matrix, Nested Data)
-------------------------
.flat(depth) flattens nested arrays.

Example: Flattens a chat system's messages:
*/
const allMessages = [
  ["Hello!", "How are you?"],
  ["Fine.", "See you!"],
  ["Bye!"],
];
const flatMsgs = allMessages.flat(); // All messages in a single array
console.log("Flat Messages:", flatMsgs);

// Real project: flatten user selected options from multiple groups
const selectedOptions = [["Small", "Large"], ["Red", "Blue"], ["Cotton"]];
const allSelected = selectedOptions.flat();
console.log("All selected (1D):", allSelected);

/*
-------------------------
5. Array.from & Array Construction (ranges, mapping, sets)
-------------------------

Create arrays from:
- array-like (NodeList, arguments, etc.)
- objects with .length property
- Sets/Maps (uniqueness, keys, etc.)

Example: Create an array of numbers from 1—100
*/
const nums = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(nums);

// Real-world: Generate an array of dates for a calendar
function getNextNDates(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}
console.log("Next 5 dates:", getNextNDates(5));

/*
-------------------------------
6. Set Operations: Unique, Intersection, Union, Difference
-------------------------------

Real apps often need "unique" lists, merging arrays, or finding overlap.

Example: Ensure only unique emails:
*/
const userEmails = ["a@mail.com", "b@mail.com", "a@mail.com"];
const uniqueEmails = Array.from(new Set(userEmails));
console.log("Unique:", uniqueEmails);

// Intersection (users present in two groups)
const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];
const intersection = a.filter((x) => b.includes(x));
console.log("Intersection:", intersection);

// Union
const union = Array.from(new Set([...a, ...b]));
console.log("Union:", union);

// Difference (in a but not in b)
const diff = a.filter((x) => !b.includes(x));
console.log("Difference:", diff);

/*
-------------------------------
7. Chaining Methods: Power Moves for Data Processing
-------------------------------

Real projects chain methods to process data quickly, e.g., filter → map → reduce.

Example: Scores above 80, then square them, sum result
*/
const scores = [100, 55, 87, 72, 98, 61];
const result = scores
  .filter((s) => s > 80)
  .map((s) => s * s)
  .reduce((sum, val) => sum + val, 0);
console.log("Sum of squares (scores >80):", result);

/*
-------------------------------
8. Immutable Updates: Spread, slice, concat (vs. mutation)
-------------------------------

In React, Redux, or stateful JS, never mutate directly. Use .map, .filter, ...spread, .slice, .concat.

Example: Add item to user notifications list immutably:
*/
const notifications = ["msg1", "msg2"];
const newNotif = "msg3";
const updatedNotifications = [...notifications, newNotif];
console.log("Updated:", updatedNotifications);

// Remove item (without mutation)
const removed = notifications.filter((msg) => msg !== "msg1");
console.log("Without 'msg1':", removed);

/*
-------------------------------
9. Multidimensional Arrays (Matrix)
-------------------------------

Handling tables, grids, spreadsheet data.

Example: 2D Tic-Tac-Toe board checker
*/
const board = [
  ["X", "", "O"],
  ["O", "X", ""],
  ["", "", "X"],
];

// Check if X has won diagonally:
const diagonalWin =
  board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X";
console.log("X wins?", diagonalWin);

/*
-------------------------------
10. Real-World Example: Filtering a Product Catalog with Search & Price Range
-------------------------------

Combine multiple skills together.
*/
const catalog = [
  { name: "iPhone 13", price: 60000, tags: ["mobile", "apple"] },
  { name: "Galaxy M31", price: 15000, tags: ["mobile", "samsung"] },
  { name: "Macbook Air", price: 90000, tags: ["laptop", "apple"] },
];

function searchProducts(
  products,
  { minPrice = 0, maxPrice = 1e6, search = "", tag = "" }
) {
  return products.filter(
    (p) =>
      p.price >= minPrice &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (tag ? p.tags.includes(tag) : true)
  );
}
console.log(
  "Search Apple Mobiles under 70k:",
  searchProducts(catalog, {
    minPrice: 10000,
    maxPrice: 70000,
    search: "iphone",
    tag: "apple",
  })
);

/*
======================================
Summary: Master Advanced Arrays!
======================================

- Use higher-order methods (map/filter/reduce) for clean functional code.
- Manage arrays of objects for real data (users, products, etc).
- Sort flexibly with custom comparators.
- Flatten complex/nested data for display or logic.
- Use Sets for uniqueness and array set operations.
- Always favor immutability for updates (especially in React/state).
- Chain methods to process data in a declarative style.
- Use multidimensional arrays for tables, boards, or grids.
- Build composable, reusable utility functions for common patterns.

These patterns and techniques are the heart of real-world JS codebases (ecommerce, dashboards, forms, analytics, games, etc)!
Practice them and you'll be a professional JavaScript array master.
*/
