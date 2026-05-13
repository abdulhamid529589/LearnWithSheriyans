/*
=========================================
Understanding Scope in JavaScript
=========================================

Scope in JavaScript defines the accessibility (visibility) of variables and functions at various parts of your code. Proper understanding of scope is crucial for writing reliable, secure, and bug-free code.

----------------------------------------
1. Global Scope
----------------------------------------
- Variables declared outside of any function or block have *global scope*.
- They can be accessed and modified from anywhere in the code.

Example:
*/
var globalVar = "I'm global!";

function showGlobal() {
  console.log(globalVar); // Accessible here
}
showGlobal();
console.log(globalVar); // Also accessible here

/*
----------------------------------------
2. Function (Local) Scope
----------------------------------------
- Variables declared within a function using 'var', 'let', or 'const' are in *local function scope*.
- They can only be accessed from within the function.

Example:
*/
function localScopeExample() {
  var localVar = "I'm local to the function!";
  console.log(localVar); // OK
}
localScopeExample();
// console.log(localVar); // Error: localVar is not defined

/*
----------------------------------------
3. Block Scope
----------------------------------------
- Introduced with ES6 ('let' and 'const').
- Variables declared using 'let' or 'const' are limited to the block ({ ... }) in which they are defined.

Example:
*/
if (true) {
  let blockLet = "Block scope using let";
  const blockConst = "Block scope using const";
  var functionVar = "Function-scoped with var";
  console.log(blockLet); // OK
  console.log(blockConst); // OK
}
// console.log(blockLet);  // Error
// console.log(blockConst); // Error
console.log(functionVar); // OK: Because var is function-scoped, not block-scoped

/*
----------------------------------------
4. Lexical Scope (Static Scope)
----------------------------------------
- *Lexical scope* means that the accessibility of variables is determined by the physical structure (layout) of the code, as written by the programmer.
- JavaScript uses lexical scoping: functions are executed using the scope in which they were defined, not where they are called.

How it works:
- When you nest functions, the inner function has access to variables of its outer functions, based on where the code is written.
- Scope is established at function creation time, not at runtime.

Example:
*/
var outerVar = "I'm outside!";

function outerFunction() {
  var innerVar = "I'm inside!";
  function innerFunction() {
    console.log(outerVar); // Accessible: defined in outer (global) scope
    console.log(innerVar); // Accessible: defined in parent function's scope
  }
  innerFunction();
}

outerFunction();
// innerFunction(); // Error: innerFunction is not defined in global scope

/*
In the example above, `innerFunction` has access to both `outerVar` (global scope) and `innerVar` (its parent function's scope), because of lexical scope: access is based on where `innerFunction` is written.

Key point:
- If you move `innerFunction` elsewhere, it will only have access to variables that are in the scope where it is *written*, not where it is *called*.
*/

/*
----------------------------------------
5. Scope Chain
----------------------------------------
- When trying to access a variable, JavaScript starts searching in the current scope, then moves outward to parent scopes (up the chain) until it finds the variable or reaches global scope.

Example:
*/
var a = "global";
function firstFunc() {
  var b = "first";
  function secondFunc() {
    var c = "second";
    console.log(a, b, c); // All are accessible here
  }
  secondFunc();
  // console.log(c); // Error: c not defined in firstFunc
}
firstFunc();

/*
----------------------------------------
6. Variable Shadowing
----------------------------------------
- An inner variable can have the same name as an outer variable; the inner variable "shadows" the outer one within its scope.

Example:
*/
let shadowVar = "outer";
function shadowTest() {
  let shadowVar = "inner";
  console.log(shadowVar); // "inner"
}
shadowTest();
console.log(shadowVar); // "outer"

/*
----------------------------------------
7. Closures in JavaScript (In-Depth)
----------------------------------------

- A **closure** is a function that "remembers" the environment in which it was created.
- More precisely, a closure gives you access to an outer function's scope from an inner function even after the outer function has finished executing.
- Closures are fundamental to JavaScript and are created every time a function is created, at function creation time.

----------------------------------------
How Closures Work
----------------------------------------
- When you define a function inside another function, the inner function has access to:
  - Its own scope (its local variables)
  - The scope of the outer function
  - The global scope

- The inner function *closes over* the variables from its containing (outer) function—even after that outer function has returned.

----------------------------------------
Basic Example of a Closure
----------------------------------------
*/
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter2 = makeCounter();
console.log(counter2());
console.log(counter2());
console.log(counter2());

/*
In this example:
- `makeCounter` is called, creating a local variable `count`.
- The inner function returned has access to `count` because it closes over the `count` variable.
- Even after `makeCounter` has finished executing, the returned function still has access to `count`,
  each call to `counter()` increments and returns the updated value.
*/

/*
----------------------------------------
Closures in Practice: Data Privacy
----------------------------------------

- Closures are commonly used for *data encapsulation*—keeping certain data private and exposing only what's necessary.

Example: Private variable with closure
*/
function secretHolder(secret) {
  return {
    getSecret: function () {
      return secret;
    },
    setSecret: function (newSecret) {
      secret = newSecret;
    },
  };
}

const holder = secretHolder("mySecret");
console.log(holder.getSecret()); // "mySecret"
holder.setSecret("newSecret");
console.log(holder.getSecret()); // "newSecret"

/*
Here, `secret` is only accessible through `getSecret` and `setSecret`. 
There's no direct way to access `secret` itself from outside - it is "private".
*/

/*
----------------------------------------
Closures and Loops (Common Pitfall)
----------------------------------------

- Before ES6 ('var' scope), closures in loops could create confusing bugs because all functions shared the same variable binding.

Example:
*/
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function () {
    console.log(i);
  });
}
funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3

/*
All the functions log 3, not 0, 1, and 2. Why? 
Because by the time they're called, the loop has finished, so `i` is 3.

With let (block scope):
*/
let funcs2 = [];
for (let j = 0; j < 3; j++) {
  funcs2.push(function () {
    console.log(j);
  });
}
funcs2[0](); // 0
funcs2[1](); // 1
funcs2[2](); // 2

/*
Here, each closure captures a separate `j` due to block scope from `let`.
*/

/*
----------------------------------------
Closures and Asynchronous Code (setTimeout Example)
----------------------------------------
*/
for (var k = 0; k < 3; k++) {
  setTimeout(function () {
    console.log("Timeout with var:", k);
  }, 100 * k);
}
// Output: "Timeout with var: 3" three times

// Using IIFE to capture the right value in closure:
for (var m = 0; m < 3; m++) {
  (function (n) {
    setTimeout(function () {
      console.log("Timeout with IIFE:", n);
    }, 100 * n);
  })(m);
}
// Output: "Timeout with IIFE: 0", "Timeout with IIFE: 1", "Timeout with IIFE: 2"

/*
With ES6 'let', this issue is solved more easily:
*/
for (let p = 0; p < 3; p++) {
  setTimeout(function () {
    console.log("Timeout with let:", p);
  }, 100 * p);
}

/*
----------------------------------------
Why Are Closures Important?
----------------------------------------
- Enable powerful patterns: function factories, partial application, currying.
- Allow for data privacy and defining APIs.
- Fundamental for asynchronous and callback-based programming.
- Underpin many JavaScript frameworks and libraries.

----------------------------------------
Summary
----------------------------------------
- A closure is a function that retains access to the lexical scope in which it was created, even when executed outside of that scope.
- Closures are everywhere in JavaScript—understanding them is key for writing effective, modular, and bug-free code.
*/

/*
----------------------------------------
8. Hoisting and Scope
----------------------------------------
- Variable declarations (using 'var') and function declarations are hoisted to the top of their scope, but only 'var' declarations (not initializations) are hoisted.
- 'let' and 'const' are hoisted but not initialized, causing a Temporal Dead Zone.

Example:
*/
console.log(hoistedVar); // undefined (declaration hoisted, initialization isn't)
var hoistedVar = 5;
// console.log(hoistedLet); // ReferenceError
let hoistedLet = 10;

/*
----------------------------------------
Best Practices
----------------------------------------
- Use 'let' and 'const' instead of 'var' for predictable block scoping.
- Minimize usage of the global scope to avoid name collisions.
- Be careful with closures and loops in asynchronous code.
*/

/*
----------------------------------------
9. Execution Context (in detail)
----------------------------------------
- **Execution context** is the environment in which JavaScript code is evaluated and executed. It is a critical concept for understanding how variables, functions, scope, and the call stack work in JavaScript.

There are several types of execution contexts:

1. **Global Execution Context**
   - This is the default context in which your code runs initially.
   - It creates a global object (`window` in browsers, `global` in Node.js) and binds `this` to that object.
   - All global variables and functions are defined in this context.

2. **Function Execution Context**
   - Each time a function is invoked, a new execution context is created for that function call.
   - A function execution context has its own variable environment, scope chain, and value of `this`.

3. **Eval Execution Context**
   - Code executed inside an `eval()` function also gets its own context, but `eval` is rarely used due to security and performance reasons.

**Phases of Execution Context:**
1. **Creation Phase (aka Memory Creation Phase)**
   - The scope chain is established.
   - Variables, functions, and arguments are created and set up in memory. 
   - For variables declared with `var`, the declarations are hoisted and initialized with `undefined`.
   - For `let` and `const`, the declarations are hoisted, but *not* initialized (they are in the Temporal Dead Zone).
   - Function declarations are hoisted and set up in memory.

2. **Execution Phase**
   - The code of the function or global context is executed line by line.
   - Variable initializations and functions are assigned their actual values.

**Example (step by step):**
```js
var x = 10;
function foo() {
  var y = 20;
  function bar() {
    console.log(x, y);
  }
  bar();
}
foo();
```
- **Global Execution Context is created:**
  - Sets up `x` and `foo` in memory.
- **foo Execution Context is created when `foo()` is called:**
  - Sets up `y` and `bar` in memory.
- **bar Execution Context is created when `bar()` is called:**
  - Has access to `x` from global scope and `y` from `foo`'s scope due to the scope chain.

**Call Stack and Context Stack:**
- JavaScript uses a *call stack* to keep track of execution contexts.
- When a function is called, its execution context is pushed onto the stack.
- When the function finishes, its context is popped from the stack.
- Only the context at the top of the call stack is currently running.

**Visualizing the context stack for the above example:**
```
| bar execution context      |  // top of stack, runs console.log(x, y)
| foo execution context      |  // after calling foo()
| global execution context   |  // always at the bottom
```

**Summary:**
- Execution context forms the foundation for how JavaScript executes code, manages scopes, and preserves the state during runtime via the call stack. Understanding this concept is fundamental for mastering advanced topics like closures, hoisting, and asynchronous code.
*/
