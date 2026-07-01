// All about data types in JavaScript with detailed examples

// JavaScript has two main categories of data types:
// 1. Primitive Data Types
// 2. Reference (Non-Primitive) Data Types

// Primitives => aisi saari values jinko copy karne par tumhe ek real copy mil jaaye

// reference => inko copy karne par real copy nahi milegi but aapko reference milega --parent ka

// 1. Primitive Data Types
// These are data types that store single value and are immutable.

// a. String
let myString = "Hello, World!";
console.log("String Example:", myString); // Output: Hello, World!
console.log("Type:", typeof myString); // Output: string

// b. Number (includes both integer and floating-point numbers)
let myInt = 42;
let myFloat = 3.14;
console.log("Integer Example:", myInt); // Output: 42
console.log("Float Example:", myFloat); // Output: 3.14
console.log("Type (int):", typeof myInt); // Output: number
console.log("Type (float):", typeof myFloat); // Output: number

// c. Boolean (true/false)
let isActive = true;
let isLoggedOut = false;
console.log("Boolean Example (true):", isActive); // Output: true
console.log("Boolean Example (false):", isLoggedOut); // Output: false
console.log("Type:", typeof isActive); // Output: boolean

// d. Undefined (variable declared but not assigned any value)
let notAssigned;
console.log("Undefined Example:", notAssigned); // Output: undefined
console.log("Type:", typeof notAssigned); // Output: undefined

// e. Null (intentional absence of any value)
let emptyValue = null;
console.log("Null Example:", emptyValue); // Output: null
console.log("Type:", typeof emptyValue); // Output: object (this is a known JS quirk!)

// f. Symbol (unique and immutable value, ES6+)
let uniqueId1 = Symbol("id");
let uniqueId2 = Symbol("id");
console.log("Symbol Example:", uniqueId1); // Output: Symbol(id)
console.log("Are uniqueId1 and uniqueId2 equal?", uniqueId1 === uniqueId2); // Output: false
console.log("Type:", typeof uniqueId1); // Output: symbol

// g. BigInt (for integers larger than 2^53 - 1, ES2020+)
let bigNumber = 1234567890123456789012345678901234567890n;
console.log("BigInt Example:", bigNumber);
console.log("Type:", typeof bigNumber); // Output: bigint

// 2. Reference (Non-Primitive) Data Types
// These hold collections of values and are mutable.

// a. Object
let person = {
  name: "Alice",
  age: 25,
};
console.log("Object Example:", person);
console.log("Type:", typeof person); // Output: object

// b. Array (technically an object, used to store ordered lists)
let fruits = ["apple", "banana", "cherry"];
console.log("Array Example:", fruits); // Output: ["apple", "banana", "cherry"]
console.log("Type:", typeof fruits); // Output: object

// c. Function (also an object)
function greet(name) {
  return "Hello, " + name + "!";
}
console.log("Function Example:", greet("Bob")); // Output: Hello, Bob!
console.log("Type:", typeof greet); // Output: function

// d. Date, RegExp, Map, Set, etc. (special objects)
let today = new Date();
console.log("Date Example:", today);
console.log("Type:", typeof today); // Output: object

let regex = /abc/;
console.log("RegExp Example:", regex);
console.log("Type:", typeof regex); // Output: object

let map = new Map();
map.set("key", "value");
console.log("Map Example:", map);
console.log("Type:", typeof map); // Output: object

let set = new Set([1, 2, 3]);
console.log("Set Example:", set);
console.log("Type:", typeof set); // Output: object

// Summary Table:
// | Type       | Example                           | typeof result  |
// | ---------- | --------------------------------- | --------------|
// | String     | "Hello"                           | "string"      |
// | Number     | 42, 3.14                          | "number"      |
// | Boolean    | true, false                       | "boolean"     |
// | Undefined  | let x;                            | "undefined"   |
// | Null       | null                              | "object"      | (JS quirk)
// | Symbol     | Symbol("id")                      | "symbol"      |
// | BigInt     | 123n                              | "bigint"      |
// | Object     | { name: "Alice" }                 | "object"      |
// | Array      | [1, 2, 3]                         | "object"      |
// | Function   | function() { }                    | "function"    |
// | Date       | new Date()                        | "object"      |
// | RegExp     | /abc/                             | "object"      |
// | Map        | new Map()                         | "object"      |
// | Set        | new Set()                         | "object"      |

// Note:
// - Primitives are compared by value, Objects by reference.
let str1 = "hello";
let str2 = "hello";
console.log("Primitive Comparison (strings):", str1 === str2); // true

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log("Reference Comparison (arrays):", arr1 === arr2); // false

let arr3 = arr1;
console.log("Reference Comparison (arrays):", arr1 === arr3); // true

// --- Dynamic Typing in JavaScript ---

// JavaScript is a dynamically typed language, meaning variable types are determined at runtime and can be changed after assignment.

// Example: Assigning different types to the same variable
let dynamicVar = "I am a string";
console.log("Type (string):", typeof dynamicVar); // Output: string

dynamicVar = 42;
console.log("Type (number):", typeof dynamicVar); // Output: number

dynamicVar = true;
console.log("Type (boolean):", typeof dynamicVar); // Output: boolean

dynamicVar = { name: "Alice" };
console.log("Type (object):", typeof dynamicVar); // Output: object

dynamicVar = null;
console.log("Type (null):", typeof dynamicVar); // Output: object (quirk)

dynamicVar = undefined;
console.log("Type (undefined):", typeof dynamicVar); // Output: undefined

// The same variable can hold different types at different times in your program.
// This flexibility is both powerful and potentially risky, so be mindful of unexpected type changes.

// --- JavaScript Type Quirks in Great Detail ---

// 1. typeof null === "object"
// This is a well-known bug in JavaScript.
// The type of null should intuitively be "null", but typeof null returns "object".
console.log("typeof null:", typeof null); // "object"
// Historical reason: In the early JS implementation, values were represented as type tags
// and an object was represented as 0, and null was also encoded as 0.

// 2. NaN: "Not-a-Number" IS a number
console.log("typeof NaN:", typeof NaN); // "number"
console.log("NaN === NaN:", NaN === NaN); // false
// NaN means "Not a Number", but its type is "number".
// Also, NaN is not equal to itself; use isNaN() or Number.isNaN() to check.

// 3. typeof function === "function"
// This is a special case in JavaScript.
function testFunc() {}
console.log("typeof testFunc:", typeof testFunc); // "function"
// Technically, functions are objects, but typeof distinguishes them as "function".

// 4. typeof Array === "object", but Array.isArray()
// Arrays are objects, so typeof returns "object".
let ar = [1, 2, 3];
console.log("typeof [1,2,3]:", typeof ar); // "object"
// To check for arrays, use Array.isArray()
console.log("Array.isArray([1,2,3]):", Array.isArray(ar)); // true

// 5. typeof Symbol and typeof BigInt
let someSym = Symbol("foo");
let someBigInt = 9007199254740991n;
console.log("typeof Symbol():", typeof someSym); // "symbol"
console.log("typeof BigInt:", typeof someBigInt); // "bigint"
// These are ES6+ types, supported in modern JS.

// 6. typeof undeclaredVariable
// Using typeof on an undeclared variable does NOT throw an error
// It returns "undefined"
console.log("typeof missingVar:", typeof missingVar); // "undefined"

// 7. typeof with null vs. undefined
let n = null;
let u;
console.log("typeof null:", typeof n); // "object"
console.log("typeof undefined:", typeof u); // "undefined"

// 8. typeof RegExp/Date/Map/Set
console.log("typeof new RegExp():", typeof new RegExp("ab")); // "object"
console.log("typeof new Date():", typeof new Date()); // "object"
console.log("typeof new Map():", typeof new Map()); // "object"
console.log("typeof new Set():", typeof new Set()); // "object"
// All return "object", so you need extra checks (like instanceof or Object.prototype.toString.call)

// 9. Wrapper Objects vs. Primitives
let str = "hello";
let objStr = new String("hello");
// typeof for a string primitive is "string", but for a String object is "object"
console.log("typeof 'hello':", typeof str); // "string"
console.log("typeof new String():", typeof objStr); // "object"
console.log("'hello' === new String('hello'):", str === objStr); // false

// 10. Boolean Object Quirk
console.log("typeof true:", typeof true); // "boolean"
console.log("typeof new Boolean(true):", typeof new Boolean(true)); // "object"
console.log("Boolean(new Boolean(false)):", Boolean(new Boolean(false))); // true!
// A Boolean object is always truthy, even if its value is false.

// 11. typeof null, arrays, objects all return "object"
// To distinguish, use Object.prototype.toString:
console.log("{}.toString():", Object.prototype.toString.call({})); // [object Object]
console.log("[].toString():", Object.prototype.toString.call([])); // [object Array]
console.log(
  "new Date().toString():",
  Object.prototype.toString.call(new Date())
); // [object Date]
console.log("null.toString():", Object.prototype.toString.call(null)); // [object Null]
console.log("undefined.toString():", Object.prototype.toString.call(undefined)); // [object Undefined]

// --- Summary Table: typeof Results ---
/*
| Value                | typeof          |
|----------------------|----------------|
| "hello"              | "string"       |
| 123                  | "number"       |
| 123n                 | "bigint"       |
| true                 | "boolean"      |
| undefined            | "undefined"    |
| null                 | "object" (quirk)|
| Symbol("id")         | "symbol"       |
| [1,2,3]              | "object"       |
| {a:1}                | "object"       |
| function(){}         | "function"     |
| new Date()           | "object"       |
| new String("hi")     | "object"       |
| new Boolean(false)   | "object"       |
| new Number(1)        | "object"       |
*/

// --- Be careful! ---
// It's important to know these quirks to avoid subtle bugs in JavaScript type handling.

// --------------------------------------------
// Type Coercion in JavaScript (Automatic Type Conversion)
// --------------------------------------------

// JavaScript is a loosely typed (dynamically typed) language. This means values can be automatically "coerced" (converted) from one type to another when necessary.

// 1. Implicit (Automatic) Type Coercion
console.log("5" + 2); // "52"   (number 2 is coerced to string "2", then concatenated)
console.log("5" - 2); // 3      (string "5" is coerced to number 5, then subtraction)
console.log(true + 1); // 2      (true is coerced to 1)
console.log(false + 1); // 1      (false is coerced to 0)
console.log(null + 1); // 1      (null coerced to 0)
console.log(undefined + 1); // NaN  (undefined becomes NaN in numeric context)
console.log("10" * "2"); // 20     (both strings coerced to numbers)
console.log("foo" * 2); // NaN    ("foo" can't be coerced to a number)

// Operators which trigger coercion:
// - '+' (addition/concatenation): if any operand is a string, concatenation happens
// - '-', '*', '/', '%', comparisons: operands are coerced to numbers
// - '==' (loose equality): type coercion happens, see below

// 2. Explicit Type Coercion (Manual Conversion)
console.log(Number("42")); // 42 (string to number)
console.log(String(42)); // "42" (number to string)
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true

// Using the unary + operator also coerces values to numbers:
console.log(+"123"); // 123
console.log(+false); // 0
console.log(+null); // 0
console.log(+undefined); // NaN

// 3. Equality (== vs ===) and Coercion

console.log(2 == "2"); // true  (string coerced to number, 2 == 2)
console.log(2 === "2"); // false (strict equality, no coercion, different types)
console.log(null == undefined); // true  (special rule)
console.log(null === undefined); // false
console.log(false == 0); // true  (false coerced to 0)
console.log(false === 0); // false
console.log("" == 0); // true  ("" coerced to 0)
console.log("" === 0); // false

// Always prefer '===' (strict equality) to avoid bugs with coercion!

// --- Coercion Conversion Table Highlights (Loose Equality ==) ---
// true  == 1           // true
// false == 0           // true
// ""    == 0           // true
// null  == undefined   // true
// "0"   == false       // true
// []    == false       // true
// []    == ""          // true
// [0]   == false       // true
// [0]   == 0           // true
// {}    == false       // false

// To check type conversion behavior for various values:
function logCoercionDemo() {
  const values = [
    undefined,
    null,
    false,
    true,
    0,
    1,
    "",
    "0",
    "hello",
    [],
    [0],
    [1, 2],
    {},
    function () {},
    NaN,
  ];
  values.forEach((v) => {
    console.log(
      `Value:`,
      v,
      " | typeof:",
      typeof v,
      " | Boolean():",
      Boolean(v),
      " | Number():",
      Number(v),
      " | String():",
      String(v)
    );
  });
}
logCoercionDemo();

// ---------------------------------------------
// Truthy vs Falsy Values in JavaScript
// ---------------------------------------------
// - 'Falsy' values are those that coerce to false when converted to a Boolean
// - 'Truthy' values are those that coerce to true

// There are only 6 falsy values in JavaScript:

console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false  (BigInt zero)
console.log(Boolean("")); // false (empty string)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Everything else (including empty objects and arrays!) is truthy:
console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean(function () {})); // true
console.log(Boolean(" ")); // true (string with space)
console.log(Boolean(Infinity)); // true

// Use Boolean(...) or !!value to convert to a Boolean (double negation idiom):

let val = "hello";
if (val) {
  // implicit coercion (val is truthy)
  console.log("val is truthy!");
}
if (!0) {
  // 0 is falsy, !0 is true --> this will run
  console.log("This runs because 0 is falsy.");
}

// Useful for default values
function getName(name) {
  // If name is falsy, default to "Anonymous"
  return name || "Anonymous";
}
console.log(getName("Alice")); // Alice
console.log(getName("")); // Anonymous
console.log(getName(undefined)); // Anonymous

// --- Example: Filtering Truthy Values ---
const arr = [0, 1, "", "foo", null, undefined, false, true];
const onlyTruthy = arr.filter(Boolean);
console.log("Truthy values only:", onlyTruthy); // [1, "foo", true]

// -------------
// Summary Table: Truthy vs Falsy
// -------------

/*
| Falsy values      | Description                  |
|-------------------|-----------------------------|
| false             | Boolean false                |
| 0                 | Number zero                  |
| -0                | Negative zero                |
| 0n                | BigInt zero                  |
| ""                | Empty string                 |
| null              | Null value                   |
| undefined         | Undefined value              |
| NaN               | Not a Number                 |

- Everything else is truthy!

| Examples          | Truthy/Falsy | Notes                |
|-------------------|-------------|----------------------|
| []                | truthy      | Empty array          |
| {}                | truthy      | Empty object         |
| " "               | truthy      | String with space    |
| function(){}      | truthy      | Function             |
| Infinity          | truthy      |                      |
*/

// Start Generation Here
