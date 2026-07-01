/*
==============================================
JavaScript Destructuring: In-Depth Explanation
==============================================

Destructuring is a powerful, expressive feature of JavaScript (added in ES6)
that allows extracting values from arrays, objects, or nested data structures
and assigning them to variables in a concise, readable manner.

Destructuring is used everywhere: configuring options, dealing with response data,
swapping variables, writing elegant loops, importing modules, and more!

Let's explore EVERY major destructuring concept with clear, real-world examples.

------------------------
1. Array Destructuring
------------------------

Syntax:
Let you "unpack" array elements into variables.

Example:
Suppose you receive RGB color data as an array:

*/
const rgb = [255, 100, 80];
// Traditional way:
const red1 = rgb[0],
  green1 = rgb[1],
  blue1 = rgb[2];
// With destructuring:
const [red, green, blue] = rgb;
console.log(red, green, blue); // 255 100 80

/*
Real-world Example: Swapping Variables
*/
let a = 5,
  b = 10;
[a, b] = [b, a]; // Swap!
console.log(a, b); // 10 5

/*
Partial (Ignore Extra/Skip) Example
*/
const [first, , third] = [10, 20, 30]; // Skip second item!
console.log(first, third); // 10 30

/*
Using with function returns:
*/
function getCoordinates() {
  return [40.7128, -74.006]; // [lat, lng]
}
const [lat, lng] = getCoordinates();
// e.g., mapping APIs, geolocation
console.log(`Latitude: ${lat}, Longitude: ${lng}`);

/*
-------------------------
2. Rest Operator in Arrays
-------------------------

Use ... to collect "the rest" of items into a real array.
*/
const team = ["Alice", "Bob", "Carol", "Dave"];
const [leader, deputy, ...members] = team;
console.log(leader); // "Alice"
console.log(deputy); // "Bob"
console.log(members); // ["Carol", "Dave"]

/*
Useful for splitting head/tail, argument parsing, etc.
*/

/*
--------------------------
3. Default Values in Arrays
--------------------------
Destructuring can supply defaults if the extracted value is undefined.
*/
const settings = [undefined, "dark"];
const [fontSize = "16px", theme = "light"] = settings;
console.log(fontSize, theme); // "16px" "dark"

/*
Practical: Robust config loader when some config options might be missing.
*/

/*
------------------------
4. Object Destructuring
------------------------

Extract properties by name. ORDER doesn't matter.

Example:
Suppose you have a user profile object:
*/
const user = {
  username: "shreya99",
  email: "shreya@email.com",
  age: 21,
  location: "Mumbai",
};

// Old way:
const username1 = user.username,
  email1 = user.email;
// Destructuring:
const { username, email } = user;
console.log(username, email); // "shreya99" "shreya@email.com"

/*
Renaming Properties:
*/
const { location: city } = user;
console.log(city); // "Mumbai"

/*
Missing Properties & Defaults:
*/
const { phone = "N/A" } = user;
console.log(phone); // N/A

/*
Complex/Nested Example:
Suppose you have API data:
*/
const apiResponse = {
  success: true,
  data: {
    id: 9,
    stats: { followers: 120, following: 75 },
  },
};

// Nested destructuring:
const {
  data: {
    id,
    stats: { followers },
  },
} = apiResponse;
console.log(id, followers); // 9 120

/*
---------------------------
5. Rest Operator in Objects
---------------------------

Can collect "the rest" properties into a new object.
*/
const { username: userId, ...others } = user;
console.log(userId); // "shreya99"
console.log(others); // { email, age, location }

/*
-----------------------------
6. Default Values in Objects
-----------------------------

Assign a default if property is missing or undefined:
*/
const settingsObj = { theme: "light" };
const { fontSize: size = "16px", theme: mode } = settingsObj;
console.log(size, mode); // 16px light

/*
-------------------------------
7. Destructuring in Function Parameters
-------------------------------

Very common in real-world code (especially with config objects, options, API calls, React props, etc.)

a) Array Parameters:
*/
function printScores([math, english, science]) {
  console.log(`Math: ${math}, English: ${english}, Science: ${science}`);
}
printScores([90, 85, 88]);

/*
b) Object Parameters:
*/
function signup({ username, email, password }) {
  console.log(
    `Signup: ${username} <${email}> (password ${password.length} chars)`
  );
}
signup({ username: "anil", email: "anil@mail.com", password: "secret123" });

/*
Function Parameter Defaults + Destructuring (Robust Defaults!):
*/
function createUser({ name = "Guest", age = 18, active = true } = {}) {
  // default to empty object to prevent crash if called as createUser()
  console.log(`User ${name}, age ${age}, active: ${active}`);
}
createUser({ name: "Riya", age: 30 });
createUser(); // Uses all defaults!

/*
------------------------------------
8. Destructuring with Loops (Objects)
------------------------------------
*/
const products = [
  { id: 1, name: "TV", price: 500 },
  { id: 2, name: "Book", price: 15 },
];
for (const { name, price } of products) {
  console.log(`Product: ${name}, Price: $${price}`);
}

/*
----------------------------------------
9. Deep/Nested Destructuring in Practice
----------------------------------------
Suppose you have a deeply nested config or state:
// */
// const config = {
//   server: {
//     host: "localhost",
//     port: 8000,
//   },
//   database: {
//     user: "root",
//     pass: "toor",
//     meta: {
//       created: "2022-01-01",
//     },
//   },
// };
// const {
//   server: { host, port },
//   database: {
//     user,
//     meta: { created },
//   },
// } = config;
// console.log(host, port, user, created); // localhost 8000 root 2022-01-01

/*
--------------------------------------
10. Destructuring with Import Statements
--------------------------------------
Destructuring is used with ES6 module imports too:

import { useState, useEffect } from 'react';

-----------------------------------------
SUMMARY TABLE (Quick Cheat Sheet)
-----------------------------------------

| Feature                             | Array                | Object                      |
|--------------------------------------|----------------------|-----------------------------|
| Basic extraction                    | [a, b] = arr         | {x, y} = obj                |
| Skip/ignore values                  | [a, , c] = arr       | n/a                         |
| Collect "rest"                      | [a, ...rest] = arr   | {a, ...rest} = obj          |
| Default values                      | [a=val] = arr        | {x=val} = obj               |
| Parameter destructuring (functions)  | fn([a,b])            | fn({x,y})                   |
| Rename variable                     | n/a                  | {x: localX} = obj           |
| Nested                             | [a, [b]] = arr       | {x: {y}} = obj              |
| Deep/nested with rest/default/alias  | Yes                  | Yes                         |

-----------------------------------------
KEY TAKEAWAYS
-----------------------------------------
- Destructuring simplifies and clarifies variable assignment.
- It's everywhere: config, responses, React props, loops, parameters, etc.
- Supports defaults, renaming, rest, and deep patterns.
- Makes code concise, robust, and expressive!

Explore, practice, and you'll see destructuring massively improves your JS code.
*/
