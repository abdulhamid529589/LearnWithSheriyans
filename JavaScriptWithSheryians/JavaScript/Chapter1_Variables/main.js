// All About JavaScript and React in Great Detail

// JavaScript Overview:
// - JavaScript is a high-level, interpreted programming language commonly used for web development.
// - It enables interactive web pages and is an essential part of web applications.
// - JavaScript was initially created by Brendan Eich in 1995 while working at Netscape Communications.
// - Standardized under the name ECMAScript by ECMA International.
// - JavaScript supports multiple programming paradigms such as object-oriented, imperative, and functional programming.
// - Popular for frontend development, but also widely used on the backend with Node.js.

// Key Authors and Contributors:
// - Brendan Eich: Inventor of JavaScript.
// - ECMA International: Maintains the ECMAScript standards (TC39 committee).

// Fun Fact: Despite its name, JavaScript is not related to Java. Netscape named it to capitalize on Java’s popularity in the 1990s.

// Popular JavaScript Libraries and Frameworks:
// - React, Vue.js, Angular, jQuery, Lodash, D3.js, etc.

// --- React Overview ---

// React is a popular JavaScript library for building user interfaces, especially for single-page applications where data changes over time without requiring a page reload.
// - Developed and maintained by Facebook (now Meta), with contributions from a vast community.
// - Originally created by Jordan Walke, a software engineer at Facebook, and released in 2013 as open source.
// - React is component-based and uses a declarative approach to building UIs.

// Key Features of React:
// - Declarative UI: Describe what you want and React will update and render the right components.
// - Component-Based: Build encapsulated components that manage their own state.
// - Virtual DOM: A lightweight JS representation of the real DOM, which allows React to optimize updates efficiently.
// - JSX: A syntax extension that looks similar to HTML and is used to write React components.

// Main React Authors and Contributors:
// - Jordan Walke: Creator of React.
// - Facebook (Meta) Engineering Team: Main maintainers and contributors.

// Popular projects powered by React:
// - Facebook, Instagram, WhatsApp Web, Airbnb, Uber, Netflix, and thousands more.

// Related Technologies:
// - React Native: For building mobile apps using React.
// - Redux, React Router, Next.js, etc.

// Where to Learn More:
// - Official JavaScript documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript
// - Official React documentation: https://react.dev/
// - ECMAScript spec: https://tc39.es/ecma262/

// Fun Fact: React’s component model and virtual DOM inspired other frameworks and revolutionized frontend development!

// Main Differences between Scripting Language, Programming Language, and Markup Language:

// 1. Scripting Language:
// - Designed primarily for automating tasks, writing small programs ("scripts") that control other programs, or adding interactivity to environments.
// - Examples: JavaScript, Python (can be used both as scripting and general-purpose), Bash, Perl.
// - Generally interpreted (code runs line-by-line at runtime).
// - Often used for web development, automation, and quick software solutions.
// - JavaScript is a classic example—a scripting language that runs in browsers to control web page behavior.

// 2. Programming Language:
// - Broad term for any language used to write computer programs.
// - Can include both scripting and compiled languages.
// - Typically refers to general-purpose languages for creating complex software and applications.
// - May be either compiled (like C, C++, Java) or interpreted (like Python, JavaScript).
// - Allows for building large and complex systems (OS, applications, etc.).
// - Example: C++ is a programming language used to build operating systems, browsers, games, etc.

// 3. Markup Language:
// - Not for writing logic or algorithms, but for describing the structure and presentation of data.
// - Uses tags to define elements.
// - Not executed/interpreted as code – it is processed/rendered by other programs (browsers, parsers, etc.).
// - Examples: HTML (structures web pages), XML (data storage and transport), Markdown (formatting documents).
// - HTML is the most popular markup language for web development.

// In summary:
// - Scripting languages add logic, automation, or functionality (often interpreted).
// - Programming languages can build comprehensive software solutions (may be compiled or interpreted).
// - Markup languages structure and describe data and content (no logic or algorithms).

// Table Overview:
// | Category             | Examples             | Purpose                                | Execution         |
// |----------------------|---------------------|----------------------------------------|-------------------|
// | Scripting Language   | JavaScript, Python  | Automate tasks, add interactivity      | Usually interpreted|
// | Programming Language | C, Java, JS, Python | Build software/applications            | Compiled or interpreted|
// | Markup Language      | HTML, XML, Markdown | Describe structure and formatting      | Not "run", but rendered/parsing|

// Part 1: Temporal Dead Zone (TDZ)
// console.log(myName);
// console.log(age);
// let myName = "John";
// var age = 20;

// Part 2: Block Scope
// {
//   let myName = "John";
//   var age = 20;
// }
// console.log(myName);
// console.log(age);

// Part 3: Hoisting
// Hoisting => ek variable ko jab javascript mein banaate hai to wo variable do hisso mein toot jaata hey, and uska declare part upar chala jaata hai and uska initialization part neeche reh jata hai
// console.log(myName);
// console.log(age);
// let myName = "John";
// var age = 20;

// All About Variables and Declaration in JavaScript

// 1. Declaring Variables

// Using var (function-scoped or global, can be re-declared and re-assigned)
var username = "alice";
console.log("var username:", username);

// Using let (block-scoped, cannot be re-declared in the same scope but can be re-assigned)
let age = 25;
console.log("let age:", age);

// Using const (block-scoped, cannot be re-declared or re-assigned, value is constant)
const pi = 3.14159;
console.log("const pi:", pi);

// 2. Re-declaration & Re-assignment

// var can be re-declared and re-assigned
var x = 10;
var x = 20; // No error
x = 30;
console.log("var x:", x); // Output: 30

// let cannot be re-declared in the same scope, but can be re-assigned
let y = 50;
// let y = 60; // SyntaxError: Identifier 'y' has already been declared
y = 70; // This is fine
console.log("let y:", y); // Output: 70

// const cannot be re-declared or re-assigned
const z = 100;
// const z = 200; // SyntaxError: Identifier 'z' has already been declared
// z = 150; // TypeError: Assignment to constant variable
console.log("const z:", z);

// 3. Scope Example

function scopeTest() {
  if (true) {
    var a = "I am var"; // Function scoped
    let b = "I am let"; // Block scoped
    const c = "I am const"; // Block scoped
    console.log("Inside block:", a, b, c);
  }
  console.log("Outside block:", a); // 'a' accessible
  // console.log(b); // ReferenceError: b is not defined
  // console.log(c); // ReferenceError: c is not defined
}
scopeTest();

// 4. Hoisting

// var is hoisted (declared at the top but initialized as 'undefined')
console.log("Hoisted var:", hoistedVar); // Output: undefined
var hoistedVar = "Now defined!";
console.log("After assignment:", hoistedVar);

// let and const are hoisted but NOT initialized (Temporal Dead Zone)
// Uncommenting the following lines will throw ReferenceError
// console.log(hoistedLet);
// let hoistedLet = "This will error out!";

// 5. Best Practices

// - Prefer 'let' and 'const' over 'var' for block-level scoping and to avoid accidental bugs.
// - Use 'const' by default unless you have to re-assign.
// - Use meaningful variable names.

const userProfile = {
  name: "Alice",
  age: 26,
  country: "India",
};
console.log("User Profile:", userProfile);

// Even though 'userProfile' is declared with const, you can still modify its properties (const only prevents re-assignment!)
userProfile.age = 27;
console.log("Updated User Profile:", userProfile);

// const does not make the object immutable; it only makes the variable binding immutable
// userProfile = { name: "Bob", age: 30 }; // TypeError

// 6. Multiple Declarations

let m,
  n = 5;
console.log("m:", m); // Output: undefined
console.log("n:", n); // Output: 5

// 7. Variable Declaration without Initialization

let notInitialized;
console.log("notInitialized:", notInitialized); // Output: undefined

// Summary Table:
// | Keyword | Scope         | Redeclarable | Re-assignable | Hoisted | Temporal Dead Zone |
// |---------|--------------|--------------|---------------|---------|--------------------|
// | var     | function/global | Yes       | Yes           | Yes     | No                 |
// | let     | block          | No        | Yes           | Yes     | Yes                |
// | const   | block          | No        | No            | Yes     | Yes                |
