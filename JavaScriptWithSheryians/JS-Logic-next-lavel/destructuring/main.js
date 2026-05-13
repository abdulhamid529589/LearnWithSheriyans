// --- JavaScript Destructuring: Best Examples and Explanations ---

// --- Array Destructuring ---
const numbers = [10, 20, 30, 40];

// Extract values into variables
const [a, b, c] = numbers;
console.log("a:", a); // 10
console.log("b:", b); // 20
console.log("c:", c); // 30

// Skipping elements and using rest
const [first, , third, ...rest] = numbers;
// first = 10, third = 30, rest = [40]
console.log("first:", first);
console.log("third:", third);
console.log("rest:", rest);

// --- Swapping variables using destructuring ---
let x = 1,
  y = 2;
[x, y] = [y, x];
console.log("x:", x, "y:", y); // x: 2 y: 1

// --- Object Destructuring ---
const user = {
  id: 101,
  name: "Alice",
  age: 26,
  country: "Canada",
};

const { name, age } = user; // Extract name and age
console.log("name:", name); // Alice
console.log("age:", age); // 26

// Assign to new variable names
const { country: nation } = user;
console.log("nation:", nation); // Canada

// --- Nested Object Destructuring ---
const company = {
  ceo: {
    firstName: "Bob",
    lastName: "Smith",
  },
  location: "New York",
};

const {
  ceo: { firstName, lastName },
} = company;

console.log("CEO:", firstName, lastName); // CEO: Bob Smith

// --- Destructuring Function Parameters ---
function introduce({ name, age }) {
  console.log(`Hi, I'm ${name} and I'm ${age} years old.`);
}

introduce(user); // Hi, I'm Alice and I'm 26 years old.

// --- Default Values in Destructuring ---
const arr = [1];
// d will get default value 99 if not present in array
const [d = 99, e = 100] = arr;
console.log("d:", d, "e:", e); // d: 1 e: 100

// --- Destructuring with Rest Operator ---
const team = ["Alice", "Bob", "Charlie", "Diana"];
const [leader, ...members] = team;
console.log("leader:", leader); // Alice
console.log("members:", members); // [ 'Bob', 'Charlie', 'Diana' ]

// --- Explanations ---
// 1. Destructuring lets you unpack arrays or objects into distinct variables concisely.
// 2. You can skip values, grab the rest of values or use default values.
// 3. Works great in function parameters for readable code.
// 4. Is useful in complex/nested data structures.

// --- Best Practice ---
// Use destructuring when you need to extract values from arrays or objects into variables.
// It makes your code more readable and concise.
