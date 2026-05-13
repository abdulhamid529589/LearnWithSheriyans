// --- Using .forEach() in JavaScript: Example and Explanation ---

// Suppose we have an array of numbers and want to print each number with its index
const numbers = [100, 200, 300, 400, 500];

// The forEach() method executes a provided function once for each array element
numbers.forEach((number, index) => {
  console.log(`Element at index ${index}: ${number}`);
});
// Output:
// Element at index 0: 100
// Element at index 1: 200
// Element at index 2: 300
// Element at index 3: 400
// Element at index 4: 500

// --- Real World Example: Summing values in an array using forEach ---
let sum = 0;

numbers.forEach((num) => {
  sum += num;
});

console.log("Sum of all elements:", sum); // Sum of all elements: 1500

// --- forEach with objects in an array ---
// Let's process an array of user objects and print a greeting for each
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

users.forEach((user) => {
  console.log(`Hello, ${user.name}!`);
});
// Output:
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!

// --- Explanation ---
// 1. .forEach() is best when you want to perform a side effect (like logging or accumulating) for each item in an array.
// 2. It executes a function for every element, passing (element, index, array) as arguments.
// 3. It does NOT return a new array (unlike .map()), and it does NOT change the original array unless you modify the elements inside the callback.

// --- Best Practice ---
// Use .forEach() when you need to loop through an array but do NOT need to transform or filter the data.
