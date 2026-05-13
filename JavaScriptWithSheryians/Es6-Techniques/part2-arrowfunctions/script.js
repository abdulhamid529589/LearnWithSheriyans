// Arrow Functions in JavaScript

// 1. What is an Arrow Function?
// ----------------------------------------------
// An arrow function is a concise way to write function expressions introduced in ES6.
// It uses the '=>' syntax (called "fat arrow").
// Arrow functions do not have their own 'this', 'arguments', 'super', or 'new.target'.
// They are best used for non-method functions and callbacks.

// Traditional Function Expression:
function add(a, b) {
  return a + b
}

// Equivalent Arrow Function:
const addArrow = (a, b) => {
  return a + b
}

// 2. Fat Arrow Function
// ----------------------------------------------
// The '=>' is often called the "fat arrow" to distinguish from the '->' (thin arrow) in other languages.
// Syntax: (parameters) => { function body }

// Example:
const multiply = (x, y) => {
  return x * y
}
console.log(multiply(2, 3)) // Output: 6

// 3. Arrow Function with One Parameter
// ----------------------------------------------
// If the arrow function has exactly one parameter, you can omit the parentheses.

// Example:
const square = (x) => {
  return x * x
}
console.log(square(5)) // Output: 25

// 4. Arrow Function with Implicit Return
// ----------------------------------------------
// If the function body is a single expression, you can omit the curly braces '{ }'
// and the 'return' keyword. The result of the expression is implicitly returned.

// Example with parentheses for multiple parameters:
const subtract = (a, b) => a - b

console.log(subtract(10, 4)) // Output: 6

// Example with one parameter and implicit return (parentheses can be omitted):
const double = (x) => x * 2
console.log(double(7)) // Output: 14

// More Examples:
// Mapping an array to its squares:
const nums = [1, 2, 3, 4]
const squares = nums.map((n) => n * n)
console.log(squares) // Output: [1, 4, 9, 16]

// 5. Key Characteristics of Arrow Functions
// ----------------------------------------------
// - No own 'this': Arrow functions capture 'this' from the surrounding context.
const person = {
  name: 'Alice',
  greet: function () {
    setTimeout(() => {
      // Here 'this' correctly refers to the person object
      console.log('Hello, ' + this.name)
    }, 1000)
  },
}
person.greet() // Output after 1 sec: Hello, Alice

// - Cannot be used as constructors (cannot use 'new').
// - Do not have their own 'arguments' object.

// 6. Summary Table
// ----------------------------------------------
// | Use Case                        | Syntax                         |
// |----------------------------------|--------------------------------|
// | No Params, Explicit Return       | () => { ... }                  |
// | One Param, Explicit Return       | param => { ... }               |
// | Multiple Params, Explicit Return | (a, b) => { ... }              |
// | One Param, Implicit Return       | param => expr                  |
// | Multiple Params, Implicit Return | (a, b) => expr                 |
//
// Arrow functions provide a shorter syntax and lexical 'this' binding, making them
// ideal for callbacks, array methods, and situations where you want to use the parent scope's 'this'.
