// Variables in JavaScript: var, let, and const

// 1. var
// ------
/*
- Introduced in ES5 (older JavaScript versions).
- Function-scoped: Accessible within the function it is declared, or globally if declared outside any function.
- Can be re-declared and updated within its scope.
- Is hoisted to the top of its scope (but only the declaration, not the value).
- Loosely scoped and can lead to bugs due to accidental re-declaration and hoisting.
*/

function varExample() {
  if (true) {
    var x = 10
    console.log('Inside block, x (var):', x) // 10
  }
  console.log('Outside block, x (var):', x) // 10 (Still accessible)
}
varExample()

// Redeclaration is allowed
var y = 5
var y = 20 // No error
console.log('Redeclared y (var):', y)

// 2. let
// ------
/*
- Introduced in ES6 (2015).
- Block-scoped: Only accessible within the block (e.g., {}, if, for) it's declared.
- Can be updated, but not re-declared within the same scope.
- Not hoisted in the same way as var: Cannot access before declaration (Temporal Dead Zone).
- Preferred when a variable's value will change.
*/

function letExample() {
  if (true) {
    let z = 15
    console.log('Inside block, z (let):', z) // 15
  }
  // console.log(z); // Error: z is not defined
}
letExample()

// let x = 100; // Error: x has already been declared if x is already declared in this scope

let m = 50
m = 60 // Allowed: update
console.log('Updated m (let):', m)

// 3. const
// --------
/*
- Introduced in ES6 (2015).
- Block-scoped (like let).
- Must be initialized at declaration.
- Cannot be updated or re-declared within the same scope.
- The value it holds cannot be changed *if primitive*, but for objects and arrays, the contents *can* be mutated.
- Best used for variables that should remain constant.
*/

const PI = 3.14159
// PI = 3.15; // Error: Assignment to constant variable.
console.log('Value of PI (const):', PI)

const arr = [1, 2, 3]
arr.push(4) // Allowed: Array content is mutable
console.log('Modified arr (const):', arr) // [1, 2, 3, 4]

// arr = [5, 6]; // Error: Assignment to constant variable.

const obj = { name: 'Alice' }
obj.name = 'Bob' // Allowed: Object property can be changed
console.log('Modified obj (const):', obj)

// Summary Table
// --------------
// | Feature      | var              | let             | const                   |
// |--------------|------------------|-----------------|-------------------------|
// | Scope        | Function         | Block           | Block                   |
// | Hoisting     | Yes (initialized | Yes (not        | Yes (not initialized)   |
// |              | as undefined)    | initialized)    |                         |
// | Re-declare   | Yes              | No              | No                      |
// | Re-assign    | Yes              | Yes             | No                      |
// | Temporal     | No               | Yes             | Yes                     |
// | Dead Zone    |                  |                 |                         |

// Best Practices
// --------------
// - Use const by default for variables you don't plan to reassign.
// - Use let for variables whose values will change.
// - Avoid using var; it's mostly for legacy code and can introduce bugs.
