// --- Using .map() in JavaScript: Example and Explanation ---

// Suppose we have an array of user objects and want to create an array of their email addresses

const users = [
  { id: 1, name: "Alice", email: "alice@email.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@email.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@email.com", age: 28 },
];

// The map() method creates a new array by calling a function on every element of the original array
const emails = users.map((user) => user.email);

console.log("User Emails:", emails);
// Output: User Emails: [ 'alice@email.com', 'bob@email.com', 'charlie@email.com' ]

// --- Explanation ---
// 1. users.map(...) goes through each user object in the users array.
// 2. For every user, it extracts user.email and puts it into a new array.
// 3. The original users array is NOT changed; map() always returns a new array.

// More Example: Transforming data using map()

// Let's say we want to create an array of user summaries:
const summaries = users.map((user) => {
  return `${user.name} (${user.age} years old)`;
});
console.log("User Summaries:", summaries);
// Output: User Summaries: [ 'Alice (25 years old)', 'Bob (30 years old)', 'Charlie (28 years old)' ]

// Key Points:
// - .map() is best when you want to TRANSFORM each item in an array into something else (new value, new object, etc).
// - The length of the returned array will always equal the original array length.
// - It does NOT modify the original array.
