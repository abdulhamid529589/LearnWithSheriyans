/*
==============================================
Advanced Real-World Function Example with ES6+
==============================================

-- Topic: Debouncing with Closures, Higher-Order Functions, and Arrow Functions --
(Real-world use: Prevent overfiring of search/API on user typing)

----------------------------------------------------------------------------------
Debounce: A "debounce" function ensures that a function (e.g., API call) is not called too often. Specifically, it delays the execution until a certain amount of time has passed *without* the event occurring again.
This is commonly used with events like "keyup" in search bars, resize, or scroll.

--- Why Advanced? ---
- Uses closures to maintain internal state between calls
- Returns a new function (higher-order function)
- Embraces ES6 arrow functions, rest parameters, and default arguments

----------------------------------------------------------------------------------
*/

function debounce(fn, delay = 300) {
  let timeoutId = null; // Closure variable to persist across calls
  // Return a debounced version of the function
  return (...args) => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Example: Real API call simulator with logging (could be a search, etc.)
const fetchSuggestions = (query) => {
  console.log(
    `Fetching suggestions for "${query}" at ${new Date().toLocaleTimeString()}`
  );
};

// Get a debounced version of fetchSuggestions (only triggers after 500ms of inactivity)
const debouncedFetch = debounce(fetchSuggestions, 500);

// Simulate user typing sequence
const queries = ["A", "Ap", "App", "Appl", "Apple"];
let i = 0;
const interval = setInterval(() => {
  if (i >= queries.length) {
    clearInterval(interval);
    return;
  }
  debouncedFetch(queries[i]);
  i++;
}, 200);

/*
=================================
First-Class Functions in JavaScript
=================================

--- What does "First-Class" mean? ---
A programming language supports "first-class functions" if functions are treated like any other variable or value:
- You can assign them to variables.
- You can pass them as arguments to other functions.
- You can return them from functions.

JavaScript treats functions as *first-class citizens*.

-----------------------
1. Assigning a function to a variable
-----------------------
*/
const sayHello = function (name) {
  return `Hello, ${name}!`;
};
console.log(sayHello("Mona")); // Output: Hello, Mona!

/*
-----------------------
2. Passing functions as arguments
-----------------------
This ability lets us create powerful patterns like callbacks and higher-order functions.
*/
function doMath(a, b, operation) {
  // operation is a function!
  return operation(a, b);
}
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(doMath(4, 5, add)); // 9
console.log(doMath(4, 5, multiply)); // 20

/*
-----------------------
3. Returning functions from functions
-----------------------
This means functions can *generate new functions*.
*/
function greeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}
const hiGreeter = greeter("Hi");
console.log(hiGreeter("Sam")); // Hi, Sam!

/*
---------------------------------
Summary Table: First-Class Functions
---------------------------------
| Action                            | Example                                    |
|------------------------------------|--------------------------------------------|
| Assign to variable                 | const f = function() {}                    |
| Pass as argument                   | setTimeout(f, 1000)                        |
| Return from function               | function outer() { return function(){} }   |
| Store in data structure            | const arr = [f1, f2]                       |

Because of these properties, JavaScript enables callbacks, closures, higher-order functions, event handlers, and much more. This makes it a flexible and expressive language for modern programming!
*/

/*
--- Output Explanation ---
Although debouncedFetch is invoked 5 times (every 200ms), the fetchSuggestions function
only executes ONCE, 500ms after the last call ("Apple"), preventing repeated API/query calls.

--- Modern ES6 Features Used ---
- Arrow functions
- Rest parameters (...args)
- Default parameters (delay = 300)
- Closures (timeoutId is private to inner function)
- Higher-order functions (debounce returns a new function)

--- Real-World Use Case ---
Attach the debouncedFetch function to an input's onkeyup:
inputElement.addEventListener('keyup', e => debouncedFetch(e.target.value));

This way, network/expensive calls only trigger once the user pauses typing, improving efficiency and UX.

----------------------------------------------------------------------------------
*/

// ------------------------------------------------------------
// More Real-World Advanced Function Practice Examples
// ------------------------------------------------------------

// 1. Throttle Function (frequency limiting)
// Sometimes, you want a function to execute at most once every N milliseconds (e.g. scroll/resize listeners)
function throttle(fn, limit = 300) {
  let inThrottle = false;
  let lastArgs;
  return function throttled(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          // Optionally handle trailing call
          throttled(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      // Optionally store the last arguments to call at the end of throttle
      lastArgs = args;
    }
  };
}

// Demo: Log window size, but only every 500ms even if resize fires rapidly
// Uncomment next lines to try in browser
// window.addEventListener('resize', throttle(() => {
//   console.log("Window size:", window.innerWidth, window.innerHeight);
// }, 500));

// 2. Event Listener System (custom pub-sub, often used in games/UIs)
function createEventBus() {
  const listeners = {};
  return {
    on(event, handler) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
    },
    emit(event, ...args) {
      (listeners[event] || []).forEach((fn) => fn(...args));
    },
    off(event, handler) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter((fn) => fn !== handler);
    },
  };
}

// Example usage:
const bus = createEventBus();
function logMove(dir) {
  console.log(`Player moved: ${dir}`);
}
bus.on("move", logMove);
bus.emit("move", "left");
bus.emit("move", "right");
bus.off("move", logMove);

// 3. Practice Game Mechanic: Simple Turn-Based Game Engine
function createTurnGame(player1, player2) {
  let turn = 0;
  const players = [player1, player2];

  return function nextMove(moveDesc) {
    const current = players[turn % 2];
    console.log(`[Turn ${turn + 1}] ${current}'s move: ${moveDesc}`);
    turn++;
  };
}

const play = createTurnGame("Alice", "Bob");
play("attack with sword"); // Alice's move
play("defend"); // Bob's move
play("cast fireball"); // Alice's move

// 4. Functional Pipeline (compose functions, great for data or game state processing)
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);
const double = (n) => n * 2;
const inc = (n) => n + 1;
const toStr = (n) => `Score: ${n}`;
// Example: increment, double, then string-ify
console.log(compose(toStr, double, inc)(5)); // "Score: 12"

// 5. Random Quiz/Flashcard Practice (returns closure for checking answers)
function createFlashcard(question, answer) {
  return function check(userAnswer) {
    if (userAnswer.trim().toLowerCase() === answer.trim().toLowerCase()) {
      console.log("Correct!");
    } else {
      console.log(`Nope, answer is: ${answer}`);
    }
  };
}
const card = createFlashcard("Capital of France?", "Paris");
card("paris"); // Correct!
card("London"); // Nope, answer is: Paris

// 6. Real-World: Memoization (cache expensive function, e.g., calculating fibonacci)
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args.join(",");
    if (cache[key] !== undefined) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}
const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});
console.log("fib(10):", fib(10)); // 55

// Further practice: Try making your own debounce, throttle, pub-sub, or a functional pipeline for a game scoring system!

/*
==========================================================
Pure vs Impure Functions in Depth (With Realistic Examples)
==========================================================

A. Pure Function
----------------
- The function output depends only on its input values.
- No side effects: Does NOT modify/global variables, I/O, DOM, etc.
- For same inputs, always gives same output.
- Easiest to test! Enables better reasoning, caching/memoization, parallelism.

Example 1: Pure Function for Math Calculation
*/
function pureSum(a, b) {
  return a + b;
}
console.log("pureSum(2,3):", pureSum(2, 3)); // Always 5

/*
Example 2: Pure Function with Array/Objects (Shallow Copying)
- Returns new array, doesn't modify original.
*/
function pureArrayAppend(arr, value) {
  return [...arr, value];
}
const arr1 = [1, 2];
const arr2 = pureArrayAppend(arr1, 3);
console.log("Original:", arr1); // [1,2]
console.log("After pure append:", arr2); // [1,2,3]

/*
Example 3: Pure Function for String Transformation
*/
function toTitle(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
console.log('toTitle("heLLo"):', toTitle("heLLo")); // "Hello"

/*
-----------------------------------------------------------
B. Impure Function
-----------------------------------------------------------
- May use or modify variables outside its own scope (external state)
- May change input data, do logging, network/Disk/DOM/etc.
- Output can vary for same input.

Example 1: Impure - Modifies Outer Variable (Side Effect)
*/
let impureCount = 0;
function impureIncrement() {
  impureCount++;
  return impureCount;
}
console.log("impureIncrement():", impureIncrement()); // 1
console.log("impureIncrement():", impureIncrement()); // 2

/*
Example 2: Impure - Modifies Array in Place
*/
function impurePush(arr, value) {
  arr.push(value); // changes original array!
  return arr;
}
const nums = [10, 20];
impurePush(nums, 30);
console.log("After impurePush:", nums); // [10, 20, 30]

/*
Example 3: Impure - Reads System State (Non-deterministic)
*/
function impureRandomPlus(x) {
  return x + Math.random();
}
console.log("impureRandomPlus(5):", impureRandomPlus(5)); // Different every call!

/*
Example 4: Impure - Prints/Logs (Side Effect)
*/
function impureLogger(msg) {
  console.log("LOG:", msg); // Side effect: console output
}

/*
C. Real-World Comparison: Pure vs Impure - For Testing!
---------------------------------------------------------
Suppose you need to write a discount function.
*/

// Pure (easy to test, no state outside)
function applyDiscountPure(total, percentage) {
  return total - (total * percentage) / 100;
}
console.log(applyDiscountPure(100, 10)); // Always 90

// Impure (reads value from outside world)
let currentDiscount = 15;
function applyDiscountImpure(total) {
  return total - (total * currentDiscount) / 100;
}
console.log(applyDiscountImpure(100)); // Output depends on currentDiscount

// Changing the value outside changes the result unpredictably
currentDiscount = 25;
console.log(applyDiscountImpure(100)); // Now 75

/*
Summary Table:
| Feature            | Pure Function      | Impure Function                    |
|--------------------|-------------------|-------------------------------------|
| Depends only input | Yes               | No (may use outside state)          |
| Side effects?      | No                | Yes (logs/mutate/global/DOM/random) |
| Testable           | Easy              | Hard (needs state/context setup)    |
| Memoizable         | Yes               | Usually not                         |
| Parallelizable     | Safe              | Risky (race conditions)             |

Best practice: Prefer pure functions when possible for maintainable, robust software. Use impure for necessary effects (logging, IO, etc)—but isolate them!
*/

/*
=========================================
Closures in JavaScript – Deep Dive
=========================================

What is a Closure?
----------------------
A *closure* is a fundamental JavaScript concept, describing the combination of a function and its surrounding (lexical) environment. This allows a function to "remember" the variables from where it was created, even after that outer function has finished executing.

In other words:
- When a function is declared inside another function, the inner function forms a closure with all variables in the outer function's scope.

Why are Closures Useful?
---------------------------
- Data privacy ("private variables"): Hide state from other code.
- Maintain state between function calls.
- Work with asynchronous code (timers, event handlers).
- Enable powerful patterns: factory functions, currying, partial application, memoization.

How Does a Closure Work?
-----------------------------
When a function is created, it "captures" variables from its surrounding environment (scope chain). Even after the outer function finishes, as long as the inner function is referenced, those variables stay alive!

-----------------------------------------
Classic Example: Counter With Closure
-----------------------------------------
*/
// Counter using closure for private state
function createCounter() {
  let count = 0; // This variable is "private"—not accessible from outside
  return function () {
    count++; // Inner function has access to 'count', even after createCounter() is done!
    return count;
  };
}

const counterA = createCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2

const counterB = createCounter();
console.log(counterB()); // 1 (independent from counterA)

console.log(counterA()); // 3

/*
What’s Happening Internally?

- When createCounter() is called, it creates a new scope with its own 'count'.
- It returns an inner function. That inner function "closes over" the variable 'count'.
- Even after createCounter() is long finished, 'count' lives, attached to the returned function.
- Each returned counter has its own, isolated 'count' variable.

-----------------------------------------
Another Example: Parameterized Greeting
-----------------------------------------
*/
function makeGreeter(greeting) {
  return function (name) {
    // 'greeting' is closed over!
    return `${greeting}, ${name}!`;
  };
}

const helloGreeter = makeGreeter("Hello");
console.log(helloGreeter("Nina")); // "Hello, Nina!"
const heyGreeter = makeGreeter("Hey");
console.log(heyGreeter("Lucas")); // "Hey, Lucas!"

/*
-----------------------------------------
Real-World Use: "Once" Function Utility
-----------------------------------------
Run a function only ONCE and ignore subsequent calls:
*/
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
      return result;
    }
    return result;
  };
}

const init = once(() => {
  console.log("Initialized!");
  return 42;
});

console.log(init()); // "Initialized!", 42
console.log(init()); // 42, does *not* log "Initialized!" again

/*
-----------------------------------------
Closures and Asynchronous Operations
-----------------------------------------
Closures are *crucial* with timers and async code:
*/
function delayedPrinter(msg, delay) {
  setTimeout(function () {
    // Inner function "remembers" msg and delay, even after delayedPrinter returns!
    console.log(`After ${delay}ms: ${msg}`);
  }, delay);
}
delayedPrinter("Closure keeps variables alive!", 500);

/*
-----------------------------------------
Key Points and Gotchas
-----------------------------------------
- The closed-over variables are *not re-copied* on each function call; the inner function sees the actual variable (which can change).
- Each closure gets its *own* environment/scope when the outer function is called.
- If not careful, accidental closure over mutable variables can cause bugs (e.g., in loops).

-----------------------------------------
Summary Diagram:

function outer() {
  let secret = 123;
  function inner() {
    // inner has access to: secret (from outer), arguments, global scope...
    return secret;
  }
  return inner;
}
const fn = outer();
console.log(fn()); // 123 -- secret is REMEMBERED!

-----------------------------------------
Closures are everywhere in JavaScript! They're the foundation of modern frameworks, state management, event handlers, and data privacy patterns.
*/
