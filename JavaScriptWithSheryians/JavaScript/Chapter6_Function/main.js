/*
=======================================
All About Functions in JavaScript (In-depth)
=======================================

A **function** is a reusable block of code that performs a specific task, optionally accepts inputs (parameters), and may return an output (return value).

Why Functions?
--------------
- DRY principle: Don't Repeat Yourself.
- Modular, reusable, maintainable code.
- Abstract complexity.

-------------------------------------------------
1. Function Declaration (a.k.a. Function Statement)
-------------------------------------------------
Syntax:
function functionName(parameter1, parameter2, ...) {
  // function body
  // optional: return result;
}

Example:
*/
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alice"); // Output: Hello, Alice!

/*
- Function hoisted: can be called before it's defined in code.
*/
sayHi("Raj"); // works due to hoisting
function sayHi(person) {
  console.log("Hi " + person);
}

/*
-------------------------
2. Function Expression
-------------------------
Assigning a function to a variable. Not hoisted.
*/
const add = function (a, b) {
  return a + b;
};
console.log("2 + 3 =", add(2, 3)); // Output: 5

/*
You can also name function expressions (for recursion/debugging):
*/
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
console.log("factorial(5):", factorial(5)); // 120

/*
-------------------------------
3. Arrow Functions (ES6+)
-------------------------------
Shorter syntax, no own 'this', 'arguments', or 'super'.
Syntax:
const fn = (parameters) => { body }
If one parameter and one return expression:
const sq = x => x * x;
*/
const multiply = (a, b) => a * b;
console.log("Arrow multiply:", multiply(4, 5));

/*
- Useful for short, callback-style functions.
- No 'arguments' object, no own 'this' ("lexical this").

Compare:
*/
const classic = {
  value: 10,
  regularFn: function () {
    return this.value;
  },
  arrowFn: () => {
    return this.value;
  },
};
console.log("regularFn:", classic.regularFn()); // 10
console.log("arrowFn:", classic.arrowFn()); // undefined (or window.value if global)

/*
-----------------------------------------------
4. Parameters and Arguments
-----------------------------------------------
- Parameters: variables listed in function definition.
- Arguments: values passed to function when called.

Default Parameters (ES6+):
*/
function greetUser(name = "Guest") {
  console.log("Hello,", name);
}
greetUser("Mona"); // Hello, Mona
greetUser(); // Hello, Guest

/*
Rest Parameters (`...args`):
- Collects all remaining arguments into an array.
*/
function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log("SumAll:", sumAll(1, 2, 3, 4, 5)); // 15

/*
Arguments Object:
- Inside *traditional* functions, 'arguments' is array-like.
*/
function howManyArgs() {
  console.log("Number of arguments:", arguments.length);
}
howManyArgs(1, 2, 3); // 3

/*
----------------------------------------
5. Return Value
----------------------------------------
- Use 'return' to send data back from a function.
- If omitted, returns 'undefined'.
*/
function square(x) {
  return x * x;
}
let squared = square(6); // 36

/*
---------------------------
6. Anonymous Functions
---------------------------
Functions without a name, often used as callbacks.
*/
setTimeout(function () {
  console.log("This runs after 1 second");
}, 1000);

/*
---------------------------
7. Callback Functions
---------------------------
A function passed as an argument to another function.
*/
function processUserInput(callback) {
  const name = "Amit";
  callback(name);
}
processUserInput(function (nm) {
  console.log("User is", nm);
});

/*
------------------------------------
8. Higher-Order Functions
------------------------------------
A function that takes another function as argument, or returns one.
*/
function operate(a, b, operation) {
  return operation(a, b);
}
console.log(
  "operate with add:",
  operate(5, 3, (x, y) => x + y)
); // 8

/*
--- Example: Array's map is a higher-order function ---
*/
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
console.log("Doubled:", doubled);

/*
----------------------------------
9. Pure vs Impure Functions
----------------------------------
Pure: No side-effects, output only depends on input.
Impure: May modify state outside or use non-input variables.

Pure:
*/
function addPure(a, b) {
  return a + b;
}

/*
Impure:
*/
let counter = 0;
function incrementImpure() {
  counter++;
  return counter;
}

/*
-------------------------------
10. Closures (VERY IMPORTANT!)
-------------------------------
An inner function remembers variables from its outer scope even after the outer function has finished.
*/
function makeCounter() {
  let count = 0; // "Private" variable
  return function () {
    count++;
    return count;
  };
}
const myCounter = makeCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2

/*
Closures are used for data privacy, currying, partial application, etc.
*/

// Real World Example: Create personalized greeter
function makeGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}
const heyGreet = makeGreeter("Hey");
console.log(heyGreet("Shreya")); // Hey, Shreya!

/*
---------------------
11. Recursive Functions
---------------------
A function that calls itself (with a base/exit case).
*/
function factorialRec(n) {
  if (n <= 1) return 1;
  return n * factorialRec(n - 1);
}
console.log(factorialRec(5)); // 120

/*
---------
12. IIFE
---------
Immediately Invoked Function Expression: Used to create a new scope.
*/
(function () {
  var message = "Immediately invoked!";
  console.log(message);
})();
/*
Output: Immediately invoked!
*/

/*
---------------------------
13. Function Constructor
---------------------------
Rarely used. Dynamically creates functions. Not recommended.
*/
const func = new Function("a", "b", "return a * b;");
console.log(func(3, 4)); // 12

/*
-------------------------------
14. Named vs Anonymous Functions
-------------------------------
Named: Better stack traces, recursion. Anonymous: More concise, but harder to debug.

------------------------------------
15. Functions are First-Class Objects
------------------------------------
- Can be assigned to variables, passed as arguments, returned, have properties.

*/
function sayHello() {}
sayHello.prop = "I am a function property";
console.log(sayHello.prop);

/*
===========================
Real World Program Examples
===========================

Example 1: Calculate Average Age of Users
-----------------------------------------
*/
const usersArr = [
  { name: "Anil", age: 25 },
  { name: "Riya", age: 30 },
  { name: "Priya", age: 29 },
];
function averageAge(arr) {
  const sum = arr.reduce((acc, user) => acc + user.age, 0);
  return sum / arr.length;
}
console.log("Average Age:", averageAge(usersArr));

/*
Example 2: Debouncing a Function (for Web, UX)
When a function is called many times in quick succession (e.g., window resizing, typing), you want to "debounce" it so it only runs after the user stops the rapid event firing.
*/
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Usage: (simulate)
const logResize = debounce(() => console.log("Resized!"), 500);

/*
Example 3: Caching Results with Closures (Memoization)
-------------------------------------------
*/
function memoizedAdd() {
  const cache = {};
  return function (n) {
    if (n in cache) {
      console.log("from cache");
      return cache[n];
    }
    const result = n + 10;
    cache[n] = result;
    return result;
  };
}
const addMemo = memoizedAdd();
console.log(addMemo(5)); // 15
console.log(addMemo(5)); // from cache, 15

/*
Example 4: Function Currying
-----------------------------
*/
function multiplyCurry(a) {
  return function (b) {
    return a * b;
  };
}
const double = multiplyCurry(2);
console.log("Double of 7:", double(7)); // 14

/*
==============
SUMMARY TABLE
==============
| Feature        | Declaration           | Expression           | Arrow          |
|----------------|----------------------|----------------------|----------------|
| Syntax         | function fn(){}      | const fn = function | const fn = () => |
| Hoisted        | Yes                  | No                   | No             |
| 'this' binding | Dynamic              | Dynamic              | Lexical        |
| new.target     | Supported            | Supported            | Not supported  |
| arguments obj  | Yes                  | Yes                  | No             |
| Prototype      | Yes                  | Yes                  | No             |

-------------------------------
Recap & Best Practices
-------------------------------
- Use functions for code reuse and organization.
- Arrow functions are great for short, no-this code (array methods, callbacks).
- Use named functions for recursion and stack trace clarity.
- Leverage closures for data privacy and modularity.
- Use default/rest parameters for flexibility.

For much more:  
- MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

*/

/*
===============================
Real-world Examples with Functions and ES6 Features
===============================
Let's demonstrate various function forms (declaration, expression, arrow) and related concepts using real-world ES6 examples.

-------------------------------------------------------------------------------
Example 1: Shopping Cart (Functions vs Arrow Functions, Default/Rest Parameters)
-------------------------------------------------------------------------------
// Function Declaration: adding item to cart
function addItemToCart(cart, item, qty = 1) {
  return [...cart, { ...item, quantity: qty }];
}

// Arrow Function: calculating total
const calculateTotal = cart =>
  cart.reduce((total, item) => total + item.price * item.quantity, 0);

// Rest Parameter: Apply discounts
function applyDiscounts(cart, ...discountFns) {
  let total = calculateTotal(cart);
  for (const fn of discountFns) {
    total = fn(total);
  }
  return total;
}

// Usage
let cart = [];
cart = addItemToCart(cart, { name: "Apple", price: 30 });
cart = addItemToCart(cart, { name: "Orange", price: 20 }, 2);

console.log("Cart Items:", cart); // List of items

console.log("Total Price:", calculateTotal(cart)); // 70

const tenPercentOff = t => t * 0.9;
const minus5 = t => t - 5;

console.log("Discounted Total:", applyDiscounts(cart, tenPercentOff, minus5)); // e.g. (70*0.9)-5 = 58

//------------------------------------------------------
Example 2: User Greeting (Anonymous/Callback/Arrow Functions, Default Params)
------------------------------------------------------
// Arrow function in setTimeout (anonymous)
setTimeout(() => {
  console.log("Processing completed! (simulated delay)");
}, 800);

// Callback Function: greet user
function greetUserES6(name, formatter = n => n.toUpperCase()) {
  console.log("Hello,", formatter(name));
}

greetUserES6("sara");                  // Hello, SARA
greetUserES6("tom", n => `Mr. ${n}`);  // Hello, Mr. tom

//------------------------------------------------------
Example 3: Function Expression & Closures for Bank Account
------------------------------------------------------
const createBankAccount = function (owner, balance = 0) {
  return {
    deposit: amount => (balance += amount),
    withdraw: amount => (balance -= amount),
    getBalance: () => balance,
    getOwner: () => owner
  };
};

const acc = createBankAccount("John Doe", 100);
acc.deposit(50);
acc.withdraw(30);
console.log(`${acc.getOwner()}'s balance:`, acc.getBalance()); // John Doe's balance: 120

//------------------------------------------------------
Example 4: Currying for Logger Utility
------------------------------------------------------
// Arrow function + Currying
const makeLogger = category => msg =>
  console.log(`[${category.toUpperCase()}]: ${msg}`);

const infoLogger = makeLogger("info");
const errorLogger = makeLogger("error");

infoLogger("App started.");   // [INFO]: App started.
errorLogger("Something went wrong!"); // [ERROR]: Something went wrong!

//------------------------------------------------------
Example 5: Using arguments object (Classic Function) vs. Rest parameter (Arrow)
------------------------------------------------------
// Classic: arguments object (not in arrow functions)
function logAllArgs() {
  console.log("arguments:", arguments); // Array-like object
}
logAllArgs(1, 2, 3, "hi");

// ES6: with arrow + rest parameter
const logAllArgsES6 = (...args) => {
  console.log("args (real array):", args);
};
logAllArgsES6(1, 2, "foo", true);



// SUMMARY TABLE - Real World Usage
/*
| Use Case              | Function Type    | Syntax Example                                  |
|-----------------------|------------------|-------------------------------------------------|
| Named operation       | Declaration      | function sum(a,b) { return a+b; }               |
| Callback/short logic  | Arrow            | arr.map(x => x*2)                               |
| Recursion             | Named Expression | const fac = function fact(n){...};              |
| Closures (privacy)    | Any, often Expr  | const c = (() => {...})();                      |
| Many/untyped args     | Classic/rest     | function f(...args){...}                        |
| No this/lexical this  | Arrow            | btn.onclick = () => {...}                       |

--- Best Practice ---
- Use declarations for main reusable logic and hoisting needs.
- Use arrow functions for callbacks, array methods, and keeping lexical this.
- Use expressions for closures or private state.

For more advanced real-world code, always consider readability and maintainability.
*/
