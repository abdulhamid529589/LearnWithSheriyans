/*
=========================================
JavaScript Control Flow: In-Depth Guide
=========================================

Control flow refers to the order in which individual statements, instructions, or function calls are executed or evaluated in a script. It determines the path a program takes as it runs, based on decisions, loops, exceptions, and jumps.

-------------------------------
1. Sequential Execution
-------------------------------
By default, code is executed line by line, top to bottom:
*/
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
// Output: Step 1 \n Step 2 \n Step 3

/*
-------------------------------
2. Conditional Statements
-------------------------------
Allows branching in program logic based on conditions.

a) if, else if, else
-------------------------------*/
const age = 20;
if (age < 13) {
  console.log("Child");
} else if (age < 20) {
  console.log("Teenager");
} else {
  console.log("Adult");
}
// Output: Adult

/*
b) Nested if
-------------------------------*/
const score = 85;
if (score > 80) {
  if (score > 90) {
    console.log("Excellent");
  } else {
    console.log("Very Good");
  }
}
// Output: Very Good

/*
c) Ternary Operator (?:)
-------------------------------
A concise way to write simple conditional logic.
*/
const isMember = true;
const price = isMember ? 10 : 20;
console.log(price); // 10

/*
d) switch Statement
-------------------------------
Useful for handling multiple possible values for a variable.
*/
const fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Yellow fruit");
    break;
  case "apple":
    console.log("Red or green fruit");
    break;
  case "orange":
    console.log("Orange fruit");
    break;
  default:
    console.log("Unknown fruit");
}
// Output: Red or green fruit

/*
--------------------------------------
3. Looping/Iteration
--------------------------------------
Loops are used to repeat code multiple times based on conditions.

a) for loop
--------------------------------------*/
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5

/*
b) while loop
--------------------------------------*/
let count = 3;
while (count > 0) {
  console.log("Countdown:", count);
  count--;
}
// Output: Countdown: 3, Countdown: 2, Countdown: 1

/*
c) do...while loop
--------------------------------------*/
let n = 0;
do {
  console.log("n is", n);
  n++;
} while (n < 2);
// Output: n is 0, n is 1

/*
d) for...of (iterates over iterable objects like arrays, strings)
--------------------------------------*/
const languages = ["JS", "Python", "Go"];
for (const lang of languages) {
  console.log(lang);
}
// Output: JS, Python, Go

/*
e) for...in (iterates over enumerable properties of an object)
--------------------------------------*/
const person = { name: "Sam", age: 25 };
for (const key in person) {
  console.log(key, person[key]);
}
// Output: name Sam, age 25

/*
------------------------------------------
4. Control Flow Statements (Jump Statements)
------------------------------------------

a) break
------------------------------------------
Stops the current loop or switch entirely.
*/
for (let i = 0; i < 10; i++) {
  if (i === 3) break;
  console.log(i);
}
// Output: 0 1 2

/*
b) continue
------------------------------------------
Skips the current iteration and continues with the next one.
*/
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
// Output: 0 1 3 4

/*
c) return (in functions)
------------------------------------------
Exits the current function and returns a value.
*/
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  }
  return false;
}
console.log(isEven(4)); // true

/*
------------------------------------------
5. Error Handling (try...catch...finally)
------------------------------------------
Used for managing exceptions and maintaining program flow.
*/
try {
  // Code that might throw errors
  let result = 10 / 0;
  if (!isFinite(result)) throw new Error("Divide by zero");
  console.log(result);
} catch (err) {
  console.log("Error caught:", err.message);
} finally {
  console.log("Finally block always runs");
}
// Output: Error caught: Divide by zero
//         Finally block always runs

/*
------------------------------------------
Best Practices & Notes
------------------------------------------
- Choose the simplest structure needed for your logic: simple if for binary conditions, switch for multiple values, loops for repetition.
- Use break and continue to control loops when necessary, but avoid making code hard to follow.
- try...catch is generally for unexpected or error cases—not for normal flow control.
- Functions can use return to send a value back or to exit early.

------------------------------------------
Summary Table
------------------------------------------

| Structure          | Purpose                         | Example                        |
|--------------------|---------------------------------|--------------------------------|
| if/else            | Conditional branching           | if (x > 10) ...                |
| switch             | Multi-way branching             | switch (val) { ... }           |
| for, while, do...while | Loop/repeat code            | for (let i=0; ...)             |
| for...of           | Iterate over iterable (arrays)  | for (const x of arr) ...       |
| for...in           | Iterate object properties       | for (const k in obj) ...       |
| break, continue    | Modify loop execution           | break, continue                |
| return             | Exit function, return value     | return x;                      |
| try...catch        | Exception/error handling        | try { ... } catch(e) { ... }   |

-----------------
Real-world Example:
-----------------
Suppose you want to process a list of users and print only adults (age >= 18), but stop if you find an invalid user object:
*/
const users = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 19 },
  { name: "Eve" }, // invalid
];

for (const user of users) {
  if (!user.age) {
    console.log("Invalid user!");
    break;
  }
  if (user.age < 18) continue;
  console.log(`${user.name} is an adult`);
}
// Output:
// Alice is an adult
// Charlie is an adult
// Invalid user!

/*
------------------------------------------------
Further Reading:
- MDN JavaScript Guide: Control flow and error handling
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

Understanding control flow is essential for writing clear, robust JavaScript programs!
*/

/*
==========================================================
The "Early Return" Pattern in JavaScript: In-Depth Guide
==========================================================

What is an Early Return?
-------------------------
The "early return" pattern is a technique in which a function returns (exits) as soon as a certain condition is met, rather than nesting all remaining logic. This is typically done using the `return` statement before the natural end of a function. 

Why Use Early Returns?
-------------------------
- **Clarity & Simplicity**: Avoids deep nesting by handling special/error cases upfront.
- **Fail Fast**: Handles invalid input or "bail-out" conditions quickly, making code more predictable.
- **Improved Readability**: Main logic is left-aligned and less indented, easier to scan.
- **Performance**: Can sometimes avoid unnecessary computation by exiting early.

Basic Example: Without and With Early Return
---------------------------------------------
// Traditional style (deep nesting):
function isAdult(user) {
  if (user && user.age) {
    if (user.age >= 18) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Using early return:
function isAdult(user) {
  if (!user || !user.age) return false;   // handle bad input early
  return user.age >= 18;                  // main logic, less nesting
}

Notice how the early return immediately exits on bad input, so the main logic doesn't have to be inside "if" blocks.

-----------------------------------
Another Example: Validating Input
-----------------------------------
function greet(name) {
  if (!name || typeof name !== "string") {
    return "Invalid name!";
  }
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));     // Hello, Alice!
console.log(greet(42));          // Invalid name!
console.log(greet());            // Invalid name!

// The invalid cases are handled right at the top—no deeply nested code.

-------------------------------------------------
Real-World Example: Processing an Array
-------------------------------------------------
Suppose you want to process an array of items, but skip non-arrays or empty data.

function sumPositiveNumbers(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  let sum = 0;
  for (const num of arr) {
    if (typeof num !== "number" || num <= 0) continue; // skip invalid/negative
    sum += num;
  }
  return sum;
}

console.log(sumPositiveNumbers([1, -2, 3, 4])); // 8
console.log(sumPositiveNumbers("abc"));         // 0
console.log(sumPositiveNumbers([]));            // 0

// Early returns deal with non-array and empty cases before the main logic.

--------------------------------------------------
Early Return with Multiple Error Conditions
--------------------------------------------------
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Inputs must be numbers";
  }
  if (b === 0) {
    return "Division by zero!";
  }
  return a / b;
}

// Each "problem case" is handled with an immediate return.

--------------------------------------------------
Common Use Cases for Early Return:
--------------------------------------------------
- Input validation (check for null/undefined, bad types)
- Guarding against optional parameters
- Preventing expensive operations when unnecessary
- Handling permissions/authorization logic
- Error "bail-out" before proceeding to main logic

--------------------------------------------------
Anti-Pattern: Deeply Nested Code (What to Avoid)
--------------------------------------------------
function process(user) {
  if (user) {
    if (user.loggedIn) {
      if (user.role === "admin") {
        // main logic
      }
    }
  }
}

// Refactored with early return:
function process(user) {
  if (!user || !user.loggedIn || user.role !== "admin") return;
  // main logic
}

--------------------------------------------------
Best Practices with Early Return
--------------------------------------------------
- Place guard clauses (early returns) at the top of your function.
- Each guard clause should handle one "error" or "bail" condition.
- After early returns, the remaining block is your main logic ("happy path").
- Don't overuse early returns in the middle of complex business logic (can reduce clarity if abused); generally, use at top for input validation/edge cases.

--------------------------------------------------
Summary Table: Early Return Pattern
--------------------------------------------------
| Benefit           | Example                                    |
|-------------------|--------------------------------------------|
| Input Validation  | if (!input) return ...                     |
| Permission Check  | if (!user.allowed) return ...              |
| Avoid Nesting     | main logic is not inside "if" blocks       |
| Efficient Exit    | function returns before unnecessary work   |

--------------------------------------------------
Further Reading:
- MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#return
- Clean Code (by Robert C. Martin): Encourages guard clauses.
- https://refactoring.guru/simplify-conditional/guard-clauses

In short, the early return pattern leads to more readable, maintainable, and robust JavaScript code!
*/
