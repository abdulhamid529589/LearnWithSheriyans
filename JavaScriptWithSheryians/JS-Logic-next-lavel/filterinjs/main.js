// --- Using .filter() in JavaScript: Example and Explanation ---

// Suppose we have an array of users and we want to find all users who are active and above 25 years old

const users = [
  { id: 1, name: "Alice", isActive: true, age: 28 },
  { id: 2, name: "Bob", isActive: false, age: 22 },
  { id: 3, name: "Charlie", isActive: true, age: 24 },
  { id: 4, name: "Diana", isActive: true, age: 32 },
  { id: 5, name: "Eve", isActive: false, age: 30 },
];

// The filter() method creates a new array with *only* the elements that pass the given test
const activeAbove25 = users.filter((user) => user.isActive && user.age > 25);

console.log("Active users above 25:", activeAbove25);
// Output:
// Active users above 25: [
//   { id: 1, name: 'Alice', isActive: true, age: 28 },
//   { id: 4, name: 'Diana', isActive: true, age: 32 }
// ]

// --- Explanation ---
// 1. .filter() loops over each item in the array (here, each user object).
// 2. For every user, it runs the given function (user.isActive && user.age > 25).
// 3. If the function returns true, that user is included in the *new* array.
// 4. The original array is NOT changed. .filter() returns a new array containing only the items that passed the test.
// 5. Use .filter() when you want to SELECT a subset of elements from an array based on a condition.

// --- Another Example: Filtering even numbers from an array ---
const numbers = [10, 21, 32, 43, 54, 65];

const evens = numbers.filter((n) => n % 2 === 0);
console.log("Even numbers:", evens); // Output: Even numbers: [ 10, 32, 54 ]
