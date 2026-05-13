// ---------------------------------------------
// JavaScript Operators: A Comprehensive Overview
// ---------------------------------------------

// Operators are special symbols or keywords in JavaScript used to perform operations on operands (values/variables).
// Categories include: Arithmetic, Assignment, Comparison, Logical, Bitwise, String, Conditional (Ternary), Type, Spread/Rest, and more.

// ----------------------
// 1. Arithmetic Operators
// ----------------------
let a = 10,
  b = 3;
console.log("a + b =", a + b); // Addition         => 13
console.log("a - b =", a - b); // Subtraction      => 7
console.log("a * b =", a * b); // Multiplication   => 30
console.log("a / b =", a / b); // Division         => 3.333...
console.log("a % b =", a % b); // Modulus          => 1 (remainder)
console.log("a ** b =", a ** b); // Exponentiation   => 1000

// Increment and Decrement
let x = 5;
console.log("x++ =", x++); // Outputs 5, then x becomes 6 (post-increment)
console.log("++x =", ++x); // Outputs 7 (pre-increment)

// -------------------------
// 2. Assignment Operators
// -------------------------
let c = 5;
c += 2; // c = c + 2
console.log("c after += 2:", c); // 7
c -= 1; // c = c - 1
console.log("c after -= 1:", c); // 6
c *= 3; // c = c * 3
console.log("c after *= 3:", c); // 18
c /= 6; // c = c / 6
console.log("c after /= 6:", c); // 3
c %= 2; // c = c % 2
console.log("c after %= 2:", c); // 1
c **= 4; // c = c ** 4
console.log("c after **= 4:", c); // 1

// -------------------------
// 3. Comparison Operators
// -------------------------
console.log("3 == '3':", 3 == "3"); // true (loose equality, type coercion)
console.log("3 === '3':", 3 === "3"); // false (strict equality, no type coercion)
console.log("4 != '5':", 4 != "5"); // true
console.log("4 !== 4:", 4 !== 4); // false
console.log("5 > 3:", 5 > 3); // true
console.log("5 < 3:", 5 < 3); // false
console.log("5 >= 5:", 5 >= 5); // true
console.log("3 <= 2:", 3 <= 2); // false

// ----------------------
// 4. Logical Operators
// ----------------------
console.log(true && false); // false (AND)
console.log(true || false); // true (OR)
console.log(!false); // true (NOT)

// Short-circuit behavior:
let loggedIn = false;
let userName = "guest";
console.log(loggedIn && userName); // false (stops at false)
console.log(loggedIn || userName); // "guest" (returns first truthy)

// ---------------------
// 5. Bitwise Operators
// ---------------------
console.log("5 & 3:", 5 & 3); // 1 (0101 & 0011 => 0001)
console.log("5 | 3:", 5 | 3); // 7 (0101 | 0011 => 0111)
console.log("5 ^ 3:", 5 ^ 3); // 6 (0101 ^ 0011 => 0110)
console.log("~5:", ~5); // -6 (bitwise NOT, inverts all bits)
console.log("5 << 1:", 5 << 1); // 10 (left shift: 0101 -> 1010)
console.log("5 >> 1:", 5 >> 1); // 2 (right shift: 0101 -> 0010)
console.log("-5 >>> 1:", -5 >>> 1); // 2147483645 (unsigned right shift)

// ---------------------
// 6. String Operators
// ---------------------
let str1 = "Hello, ";
let str2 = "world!";
console.log(str1 + str2); // "Hello, world!"
let s = "10" + 1; // Number 1 is coerced to string
console.log(s); // "101"

// --------------------------
// 7. Conditional (Ternary) Operator
// --------------------------
let age = 18;
let canVote = age >= 18 ? "yes" : "no";
console.log("Can vote?", canVote); // "yes"

// ----------------------
// 8. Type Operators
// ----------------------
console.log(typeof 123); // "number"
console.log(typeof "abc"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof Symbol("x")); // "symbol"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof null); // "object" (JS quirk)
console.log(typeof undefined); // "undefined"
console.log(typeof function () {}); // "function"

// instanceof: checks prototype inheritance
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true
console.log("abc" instanceof String); // false (primitive !== object)

// ----------------------
// 9. Spread and Rest Operators (...)
// ----------------------

// Spread (expands arrays/objects):
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2); // [1,2,3,4,5]

// Merging objects
let objA = { x: 1 };
let objB = { y: 2 };
let objC = { ...objA, ...objB };
console.log(objC); // {x: 1, y: 2}

// Rest (collects values into an array)
function sum(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ---------------------
// 10. Other Notable Operators
// ---------------------

// 1. Comma Operator (,)
let t = (1, 2, 3); // evaluates all, returns last: t = 3
console.log(t);

// 2. Optional Chaining (?.)
let user = { profile: { name: "Alice" } };
console.log(user.profile?.name); // "Alice"
console.log(user.account?.email); // undefined (does not throw!)

// 3. Nullish Coalescing Operator (??)
let value = null;
let fallback = value ?? "default";
console.log(fallback); // "default"
let zero = 0;
console.log(zero ?? 100); // 0 (nullish means null/undefined only, NOT falsy)

// 4. Delete Operator
let person = { name: "Alice", age: 22 };
delete person.age;
console.log(person); // { name: "Alice" }

// 5. In Operator (checks property existence)
console.log("name" in person); // true
console.log("age" in person); // false

// 6. Void Operator
console.log(void 0); // undefined

// ---------------------
// Example: Operator Precedence
// ---------------------
let result = 2 + 3 * 4; // Multiplication first: 2 + (3*4) = 14
console.log(result);

result = (2 + 3) * 4; // Parentheses first: (2+3)*4 = 20
console.log(result);

// -------------
// Short Summary Table
// -------------

/*
| Operator Type         | Example/Operator | Notes                               |
|---------------------- |-----------------|-------------------------------------|
| Arithmetic            | +, -, *, /, %, ** | Basic math, exponentiation         |
| Assignment            | =, +=, -=, etc.   | Compound/standard assignments      |
| Comparison            | ==, ===, !=, <, > | Loose/strict equality, ordering    |
| Logical               | &&, ||, !         | "And", "Or", "Not"                 |
| Bitwise               | &, |, ^, ~, <<    | Rare for general JS                |
| String                | +                 | Concatenation                      |
| Conditional (ternary) | ? :               | Shorthand if-else                  |
| Type                  | typeof, instanceof| Type checks                        |
| Spread/Rest           | ...               | Expands/collects values            |
| Optional Chaining     | ?.                | Safe property access               |
| Nullish Coalescing    | ??                | Fallback for null/undefined        |
| Delete, in, void      | delete, in, void  | Object/property manipulation       |
| Comma                 | ,                 | Evaluate multiple expressions      |
|

- Operator precedence chart: 
  See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

- Always use '===' and '!==' for predictable equality checks!

- Parentheses can clarify and override precedence.
*/

// ---
// Detailed Explanation: The `typeof` Operator in JavaScript
// ---

/*
The `typeof` operator is a unary operator in JavaScript used to determine the *type* of a given operand (value, variable, or expression). 
It is commonly used for debugging, input validation, and writing type-safe code in a dynamically typed environment.

----------------------------
Basic Syntax:
----------------------------
typeof operand
typeof (operand) // parenthesis optional

----------------------------
What does `typeof` return?
----------------------------

The result of `typeof` is always a string, describing the type of the operand.
Here are its possible results (as of modern ECMAScript):

| Type of value         | Example                      | `typeof` result   |
|---------------------- |-----------------------------|-------------------|
| Number                | 42, NaN, Infinity           | "number"          |
| BigInt                | 10n                         | "bigint"          |
| String                | "hello", '', `template`     | "string"          |
| Boolean               | true, false                 | "boolean"         |
| Undefined             | undefined, missing var      | "undefined"       |
| Symbol                | Symbol("x")                 | "symbol"          |
| Function              | function() {}, ()=>{}, etc. | "function"        |
| Object (including arrays, null) | {}, [], new Date() | "object"          |

----------------------------
Examples:
----------------------------

console.log(typeof 42);               // "number"
console.log(typeof NaN);              // "number"  (NaN: Not-a-Number, but classified as number)
console.log(typeof "hi");             // "string"
console.log(typeof true);             // "boolean"
console.log(typeof undefined);        // "undefined"
console.log(typeof { a: 1 });         // "object"
console.log(typeof [1, 2, 3]);        // "object"   (arrays are object type)
console.log(typeof null);             // "object"   (historical quirk!)
console.log(typeof function() {});    // "function"
console.log(typeof Symbol("foo"));    // "symbol"
console.log(typeof 10n);              // "bigint"

----------------------------
Special Cases and Pitfalls:
----------------------------

// 1. `typeof null` returns "object":
console.log(typeof null); // "object"
// This is a well-known bug in JavaScript for legacy reasons. 
// Null is NOT actually an object, but typeof reports "object".

// 2. Arrays and objects are both "object":
console.log(typeof [1,2,3]); // "object"
console.log(typeof { a: 1 }); // "object"
// To distinguish arrays, use Array.isArray(arr).

// 3. Functions get special treatment:
function foo() {}
console.log(typeof foo); // "function"
// Functions are technically objects, but typeof presents "function" for convenience.

----------------------------
Use Cases:
----------------------------

// Checking variable types at runtime:
let x = "hello";
if (typeof x === "string") {
  console.log("x is a string!");
}

// Checking for undefined variables (safe way):
if (typeof someVar === "undefined") {
  console.log("someVar is not defined or has value undefined");
}

----------------------------
Typeof and Undeclared Variables:
----------------------------

// `typeof` is *safe* on undeclared variables (it does not throw):
console.log(typeof notDeclaredVar); // "undefined"

// But direct access would throw:
// console.log(notDeclaredVar); // ReferenceError

----------------------------
Summary Table:
----------------------------
| Value                  | typeof result  |
|------------------------|---------------|
| 123, NaN, Infinity     |  "number"     |
| "hello"                |  "string"     |
| true, false            |  "boolean"    |
| undefined              |  "undefined"  |
| Symbol()               |  "symbol"     |
| 10n                    |  "bigint"     |
| function(){}           |  "function"   |
| null                   |  "object"     |  (historical bug!)
| []                     |  "object"     |
| {}                     |  "object"     |
| new Date()             |  "object"     |
|

----------------------------
Best Practices:
----------------------------
- Use `typeof` for checks against primitive types ("number", "string", "boolean", etc.).
- For arrays, prefer `Array.isArray(value)`.
- For distinguishing null vs. object, explicitly compare against `null`.
- Don't rely on typeof for fine-grained object distinctions (e.g., class instances).
- Remember the `"object"` result for `null` is a quirk.

----------------------------
Further Reading:
----------------------------
- MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

*/

// Example Section (feel free to test these)
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof false); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof { a: 1 }); // "object"
console.log(typeof [1, 2, 3]); // "object"
console.log(typeof function () {}); // "function"
console.log(typeof null); // "object"
console.log(typeof Symbol("x")); // "symbol"
console.log(typeof 123n); // "bigint"
/*
----------------------------------------------
The `instanceof` Operator in JavaScript
----------------------------------------------

What is `instanceof`?
---------------------
- The `instanceof` operator checks whether a particular object is an instance of a specific constructor (class or function) or its prototype chain.
- It is used to determine the inheritance relationship between an object and a constructor's `prototype`.
- Syntax:
    object instanceof Constructor

How does it work?
-----------------
- `instanceof` walks up the prototype chain of the object and returns `true` if it finds the `Constructor.prototype`.
- Otherwise, it returns `false`.
- It's used primarily for distinguishing custom class instances, arrays, built-in types, etc.

Basic Examples:
---------------
function Animal() {}
function Dog() {}

Dog.prototype = Object.create(Animal.prototype);

const a = new Animal();
const d = new Dog();

console.log(d instanceof Dog);     // true
console.log(d instanceof Animal);  // true (Dog extends Animal)
console.log(a instanceof Dog);     // false
console.log(a instanceof Animal);  // true
console.log(d instanceof Object);  // true (all objects' root prototype is Object)
console.log(Dog instanceof Function); // true (all functions are Function objects)

Built-in Examples:
------------------
console.log([] instanceof Array);          // true
console.log([] instanceof Object);         // true
console.log({} instanceof Object);         // true
console.log("hello" instanceof String);    // false (string literal primitive, not String object)
console.log(new String("test") instanceof String); // true (String object wrapper)

Edge Cases:
-----------
- Works only on objects. For primitives (number, boolean, string, null, undefined), always returns false.
console.log(42 instanceof Number);      // false
console.log(new Number(42) instanceof Number); // true
console.log(null instanceof Object);    // false
console.log(undefined instanceof Object); // false

Custom Class Example:
---------------------
class Person {}
class Student extends Person {}

const p = new Person();
const s = new Student();

console.log(s instanceof Student); // true
console.log(s instanceof Person);  // true (Student extends Person)
console.log(p instanceof Student); // false
console.log(p instanceof Person);  // true

How is it Different from `typeof`?
----------------------------------
- `typeof` is for primitive types and basic distinctions (e.g., "object", "string").
- `instanceof` checks objects’ prototype chain relationships.

Example:
console.log(typeof []);            // "object"
console.log([] instanceof Array);  // true

Best Practices & Limitations:
-----------------------------
- For arrays, `Array.isArray(obj)` is usually more robust.
- `instanceof` can be affected if an object is created in a different execution context (like in an iframe), as the prototype chains may differ.

iframe example (in browser environments):
-----------------------------------------
let arr = window.frames[0].Array();
console.log(arr instanceof Array); // false (different global context)

Summary Table:
--------------
| Use             | Works On   | Checks               | Example                     |
|-----------------|------------|----------------------|-----------------------------|
| typeof          | primitives | value type           | typeof 123                 |
| instanceof      | objects    | prototype chain      | obj instanceof MyClass      |

References:
-----------
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

*/

// Proper Example: Using instanceof to distinguish class instances

class Vehicle {}
class Car extends Vehicle {}
class Bike extends Vehicle {}

const myCar = new Car();
const myBike = new Bike();
const randomObj = {};

console.log(myCar instanceof Car); // true
console.log(myCar instanceof Vehicle); // true
console.log(myBike instanceof Vehicle); // true
console.log(myBike instanceof Car); // false
console.log(randomObj instanceof Vehicle); // false

// With built-in types:
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
// console.log(() => {} instanceof Function);   // true
console.log(new Date() instanceof Date); // true
console.log(new Date() instanceof Object); // true

// With primitive values:
console.log("test" instanceof String); // false (primitive string)
console.log(new String("test") instanceof String); // true (String object wrapper)
