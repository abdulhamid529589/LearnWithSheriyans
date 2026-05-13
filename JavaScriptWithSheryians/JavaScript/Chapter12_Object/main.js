/*
=========================================================
Objects in JavaScript: The Complete Guide With Examples
=========================================================

What is an Object?
-------------------
An object is one of the most fundamental data structures in JavaScript. 
Objects allow you to group related data and functionality together in a single variable.
Objects store properties (key-value pairs) and can include functions (called methods).

Think of objects as "things" in real life:
- A `car` has properties (color, brand, speed) and methods (drive, honk).
- A `student` has name, roll number, grade, and methods (attendClass(), getReport()).

How to Create Objects
---------------------

// 1. Object literal syntax (most common)
const person = {
  name: "Alice",
  age: 30,
  isStudent: false,
};

console.log(person.name); // "Alice"

// 2. Using the Object constructor (rarely used)
const obj2 = new Object();
obj2.brand = "Nike";
obj2.type = "Shoes";

// 3. Using a function to create objects ("factory function")
function makeUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
}
const userA = makeUser("Bob", 25);
userA.greet(); // Hello, my name is Bob

// 4. Using class syntax (for blueprints—see below)

Accessing and Modifying Object Properties
------------------------------------------

console.log(person.age); // 30
person.age = 31;          // Update property
person.city = "Delhi";    // Add new property
delete person.isStudent;  // Remove property

console.log(person);

// Bracket notation (when property names have spaces or are dynamic)
const prop = "name";
console.log(person[prop]); // "Alice"

const weirdObj = { "likes sport": true };
console.log(weirdObj["likes sport"]); // true

Objects as Dictionaries/Maps
------------------------------

You can use objects to map keys to values.

const scores = {
  Amit: 90,
  Neha: 85,
  Ravi: 77,
};
console.log(scores["Neha"]); // 85

Property Shorthand, Computed Properties
----------------------------------------

let language = "Hindi";
let proficiency = "Fluent";

const profile = {
  name: "Sam",
  language,          // same as language: language
  [proficiency]: true // computed property key
};
console.log(profile); // { name: "Sam", language: "Hindi", Fluent: true }

Object Methods (Functions on Objects)
--------------------------------------

const dog = {
  name: "Tommy",
  breed: "Labrador",
  bark() {
    console.log(`${this.name} says: Woof!`);
  },
};
dog.bark(); // Tommy says: Woof!

The `this` keyword refers to the current object inside a method.

REAL WORLD: Modeling with Objects
----------------------------------

Consider an E-commerce Product Example:

const product = {
  id: 101,
  name: "Smartphone",
  price: 29999,
  inStock: true,
  features: ["Camera", "GPS", "Bluetooth"],
  details: {
    brand: "Techno",
    warranty: "1 year",
  },
  displayInfo() {
    console.log(`${this.name} by ${this.details.brand} - Rs.${this.price}`);
  },
};

product.displayInfo(); // Smartphone by Techno - Rs.29999
console.log(product.features[0]); // "Camera"
console.log(product.details.warranty); // "1 year"

Looping Through Objects
------------------------

for...in loop:
for (let key in product) {
  console.log(key, ":", product[key]);
}

Object.keys, Object.values, Object.entries:
console.log(Object.keys(product));   // array of keys
console.log(Object.values(product)); // array of values
console.log(Object.entries(product)); // array of [key, value] pairs

Nested Objects and Arrays
--------------------------

Objects can contain arrays and other objects.

const classroom = {
  teacher: { name: "Mrs. Mehta", subject: "Math" },
  students: [
    { name: "Amit", roll: 1 },
    { name: "Neha", roll: 2 },
  ],
};

console.log(classroom.teacher.name); // "Mrs. Mehta"
console.log(classroom.students[1].name); // "Neha"

Checking Property Existence
----------------------------

console.log("price" in product); // true
console.log(product.hasOwnProperty("id")); // true

Object Destructuring
----------------------

const { name, price } = product;
console.log(name, price); // "Smartphone" 29999

// Nested destructuring
const {
  details: { brand },
} = product;
console.log(brand); // "Techno"

Spread and Rest with Objects
----------------------------

const base = { x: 1, y: 2 };
const copy = { ...base, z: 3 }; // Copy and add property
console.log(copy); // { x: 1, y: 2, z: 3 }

// Rest: extract properties
const { x, ...coords } = copy;
console.log(x); // 1
console.log(coords); // { y: 2, z: 3 }

Immutability and Cloning
-------------------------

// Shallow copy (copies top-level props only)
const productCopy = { ...product };

// Deep copy (for nested objects, see JSON method, but be careful with functions/dates)
const deepClone = JSON.parse(JSON.stringify(product));

Object Utility Methods
-----------------------

Object.assign(target, ...sources): Copies properties
Object.keys(obj): Array of keys
Object.values(obj): Array of values
Object.entries(obj): Array of [key, value] pairs

Comparing Objects
-------------------

Two objects are only equal if they reference the same object in memory.

const a = { foo: 1 };
const b = { foo: 1 };
console.log(a == b); // false

const c = a;
console.log(a === c); // true

Object as Function Parameter (Destructuring, Defaults)
-------------------------------------------------------

function createAccount({ username, email, isAdmin = false }) {
  return {
    username,
    email,
    role: isAdmin ? "admin" : "user",
  };
}
const acc1 = createAccount({ username: "Sam", email: "sam@mail.com" });
console.log(acc1);

Classes: The Modern Way to Make Object Blueprints
----------------------------------------------------

class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  speak() {
    console.log(`${this.name} the ${this.type} makes a sound.`);
  }
}
const doggy = new Animal("Bruno", "Dog");
doggy.speak(); // Bruno the Dog makes a sound.

REAL WORLD EXAMPLE: Modeling a Bank Account
----------------------------------------------
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.transactions = [];
  }
  deposit(amount) {
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount });
  }
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({ type: "withdraw", amount });
    } else {
      console.log("Insufficient funds.");
    }
  }
  getSummary() {
    return `${this.owner} has balance: ₹${this.balance}`;
  }
}

const acct = new BankAccount("Neha", 5000);
acct.deposit(2000);
acct.withdraw(1000);
console.log(acct.getSummary()); // Neha has balance: ₹6000
console.log(acct.transactions);

Dynamic Property Names & Computed Properties
---------------------------------------------
const field = "email";
const user = {
  name: "Amit",
  [field]: "amit@gmail.com",
};
console.log(user.email); // "amit@gmail.com"

Practical: Managing a Student Directory with Objects
-------------------------------------------------------

const students = {
  101: { name: "Amit", grade: "A" },
  102: { name: "Neha", grade: "B" },
  103: { name: "Ravi", grade: "C" },
};

// Add a student
students[104] = { name: "Sara", grade: "B+" };

// Update grade
students[102].grade = "A";

// Remove student
delete students[103];

// Loop through directory
for (const roll in students) {
  const s = students[roll];
  console.log(`Roll: ${roll}, Name: ${s.name}, Grade: ${s.grade}`);
}

/*
=========================================================
KEY POINTS SUMMARY:
=========================================================

- Objects hold properties (key: value pairs).
- Properties can be any type, including arrays, objects, and functions ("methods").
- Use dot or bracket notation to access/modify.
- Use objects for modeling: products, users, students, etc.
- Destructure for convenient access.
- Use ...spread to combine/copy objects.
- Loop using for...in and Object.keys/values/entries.
- Use classes or factory functions for templates/blueprints.
- Objects are the foundation for everything from state management to API data, and OOP patterns in JavaScript!

=========================================================
Objects = The backbone of JavaScript programming!
Master them to model ANY real world thing in code.
=========================================================
*/

/*
Deep Copy of Objects in JavaScript
-------------------------------------

A "deep copy" of an object means making a new object that recursively copies all levels of nested objects or arrays.
This way, changes to the clone will NOT affect the original, even for nested data.
A *shallow copy* (like {...obj} or Object.assign) only copies the top-level properties; nested objects are still *shared*.

Example: Shallow vs Deep Copy
-------------------------------

const original = {
  name: "Alice",
  address: { city: "Delhi", pin: 110001 }
};

// Shallow copy:
const shallow = { ...original };
shallow.address.city = "Mumbai";
console.log(original.address.city); // "Mumbai" (oops! Changed original too)

// Deep copy: (simple but only works for JSON-safe objects)
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Bangalore";
console.log(original.address.city); // "Mumbai" (unchanged, deep copy is independent)

// Limitations:
// - JSON method ignores functions, Dates, undefined, special types
// For complex objects, use libraries like lodash.cloneDeep or write custom recursive functions.
*/

/*
Optional Chaining (?.) in JavaScript
--------------------------------------

Optional chaining is a syntax feature (introduced in ES2020) that lets you safely access deeply nested properties, methods, or array elements *without* having to check if each reference in the chain exists.

Why use it?
------------
When working with objects from dynamic sources (APIs, user data, etc.), some properties may be missing or undefined. Traditionally, you needed to check each level:

const city = user && user.address && user.address.city;
// If anything in the chain is undefined, this avoids runtime errors

Optional chaining simplifies this:

const city = user?.address?.city;
// If user or address is undefined/null, result is undefined (no error)

How does it work?
-------------------
- It "short-circuits" and returns undefined if any reference in the chain is nullish (null or undefined).
- Works for property access, method calls, and array access.

Examples:
-----------

// Example object:
const user = {
  name: "Alice",
  address: {
    city: "Delhi",
    zip: 110001
  }
};

console.log(user.address.city); // "Delhi"
console.log(user.office?.city); // undefined, no error!
console.log(user.address?.street); // undefined

// Safe access with arrays:
const students = [
  { name: "Raj", marks: { math: 90 } },
  { name: "Priya" } // marks is missing!
];
console.log(students[1]?.marks?.math); // undefined, won't throw error

// Calling a possibly-missing method:
const result = user.getProfile?.(); // If getProfile exists, it's called; else, result is undefined

// Dynamic property optional chaining:
const prop = "address";
console.log(user[prop]?.zip); // 110001

How is this different from normal dot access?
---------------------------------------------
- With plain dot (.), accessing a missing property on undefined/null throws an error.
- Optional chaining stops at the first null/undefined and returns undefined—never throws.

Use cases & caveats:
----------------------
* Use when property/method/array may not exist, but you want to avoid runtime errors.
* Returns undefined if short-circuited; you can combine with nullish coalescing (??) for defaults:

  const zip = user.address?.zip ?? "Not Provided";
  // If zip is missing, zip will be "Not Provided"

* DO NOT overuse. If missing properties mean your data is corrupt, check them explicitly.

Summary Table:
---------------
| Expression                 | Result                       |
|----------------------------|------------------------------|
| obj?.prop                  | undefined if obj missing     |
| obj?.[expr]                | undefined if obj missing     |
| arr?.[i]                   | undefined if arr missing     |
| obj.func?.()               | undefined if func missing    |

Optional chaining makes code robust, concise, and easier to read when dealing with uncertain object structures!
*/
