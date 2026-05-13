// Spread Operator Example
// Used to expand elements of an array or object

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Spread arr1 and arr2 to combine them into a new array
const combinedArr = [...arr1, ...arr2];
console.log("Combined Array using Spread:", combinedArr); // [1, 2, 3, 4, 5, 6]

// Spread operator with objects
const obj1 = { a: 10, b: 20 };
const obj2 = { c: 30, d: 40 };

const mergedObj = { ...obj1, ...obj2 };
console.log("Merged Object using Spread:", mergedObj); // { a: 10, b: 20, c: 30, d: 40 }

// -----------------------------------------------

// Rest Operator Example
// Used to collect remaining elements into an array

function sum(...numbers) {
  // 'numbers' is an array of all passed arguments
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum using Rest:", sum(1, 2, 3, 4, 5)); // 15

// Rest operator in object destructuring

const user = {
  id: 1,
  name: "John",
  age: 25,
  country: "USA",
};

const { id, ...restInfo } = user;

console.log("ID:", id); // 1
console.log("Rest of the user info:", restInfo); // { name: 'John', age: 25, country: 'USA' }

// Explanations:
// - The spread operator (...) is used to expand arrays or objects, e.g., combining arrays/objects.
// - The rest operator (...) is used to gather/collect remaining elements or properties into a new array or object, e.g., function arguments or destructuring.
