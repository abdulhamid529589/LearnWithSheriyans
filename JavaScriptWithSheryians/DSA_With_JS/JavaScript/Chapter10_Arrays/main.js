/*
====================================================
Arrays in JavaScript — The Complete Guide With Examples
====================================================

What is an Array?
------------------
An array is a special variable, which can hold more than one value at a time. 
Arrays let you store lists of items (of any type: numbers, strings, objects, etc.) in a single variable.

How to Create Arrays:
---------------------
*/
// 1. Using literal notation (most common)
const fruits = ["Apple", "Banana", "Orange"];
console.log(fruits); // ["Apple", "Banana", "Orange"]

// 2. Using Array constructor (rare, not recommended unless necessary)
const numbers = new Array(1, 2, 3, 4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

// 3. Empty array and fill later:
let emptyArr = [];
emptyArr[0] = "First";
emptyArr[1] = "Second";
console.log(emptyArr); // ["First", "Second"]

/*
------------------------
Accessing and Modifying Elements
------------------------
Arrays use zero-based indexing:
*/
console.log(fruits[0]); // "Apple"
fruits[1] = "Blueberry"; // Change value
console.log(fruits); // ["Apple", "Blueberry", "Orange"]

/*
------------------------
Length of Array
------------------------
*/
console.log(fruits.length); // 3

/*
------------------------
Adding and Removing Elements
------------------------
*/

// At the end:
fruits.push("Grape");
console.log(fruits); // ["Apple", "Blueberry", "Orange", "Grape"]

// From the end:
const last = fruits.pop();
console.log(last); // "Grape"
console.log(fruits); // ["Apple", "Blueberry", "Orange"]

// At the start:
fruits.unshift("Mango");
console.log(fruits); // ["Mango", "Apple", "Blueberry", "Orange"]

// From the start:
const first = fruits.shift();
console.log(first); // "Mango"
console.log(fruits); // ["Apple", "Blueberry", "Orange"]

/*
------------------------
Iterating Over Arrays
------------------------
*/

// 1. Simple for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(`Fruit at index ${i} is ${fruits[i]}`);
}

// 2. for...of loop
for (const fruit of fruits) {
  console.log("Fruit:", fruit);
}

// 3. forEach method
fruits.forEach((item, index) => {
  console.log(`At index ${index}: ${item}`);
});

/*
------------------------
Array Methods — Examples
------------------------
*/

// map(): Apply a function to every element, return new array.
const uppercased = fruits.map((fruit) => fruit.toUpperCase());
console.log(uppercased); // [ "APPLE", "BLUEBERRY", "ORANGE" ]

// filter(): Filter items based on a condition.
const bFruits = fruits.filter((fruit) => fruit.startsWith("B"));
console.log(bFruits); // ["Blueberry"]

// find(): Find the first value matching condition.
const over5 = fruits.find((fruit) => fruit.length > 5);
console.log(over5); // "Blueberry"

// some(), every(): Test if some/all elements match a condition.
console.log(fruits.some((fruit) => fruit === "Apple")); // true
console.log(fruits.every((fruit) => fruit.includes("e"))); // true

// reduce(): Reduce to a single value (e.g., sum, multiplication, etc.)
const numbers2 = [2, 3, 4];
const total = numbers2.reduce((sum, val) => sum + val, 0);
console.log(total); // 9

/*
------------------------
Multi-dimensional Arrays
------------------------
*/
const grid = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(grid[1][2]); // 6

/*
------------------------
Array Destructuring (Unpacking)
------------------------
*/
const [firstFruit, secondFruit] = fruits;
console.log(firstFruit, secondFruit); // "Apple" "Blueberry"

// Swap two values
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// Skipping values
const arr = [10, 20, 30, 40];
const [x, , y] = arr;
console.log(x, y); // 10 30

/*
------------------------
Spread and Rest Operators with Arrays
------------------------
*/
// Spread: Expand elements
const merged = [...fruits, ...numbers2];
console.log(merged);

// Rest: Gather values
function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

/*
------------------------
Common Array Pitfalls
------------------------
*/

// Checking if something is an Array:
console.log(Array.isArray(fruits)); // true

// Copying arrays (beware reference!):
const copy = fruits.slice();
copy.push("Kiwi");
console.log(fruits); // original unchanged
console.log(copy); // has "Kiwi"

/*
------------------------
Other Useful Array Methods
------------------------
*/
console.log(fruits.includes("Orange")); // true
console.log(fruits.indexOf("Blueberry")); // 1

// reverse()
let letters = ["a", "b", "c"];
letters.reverse();
console.log(letters); // ["c", "b", "a"]

// sort()
const nums3 = [42, 23, 16, 15, 8, 4];
nums3.sort(); // DEFAULT: sorts as strings!
console.log(nums3); // [15, 16, 23, 4, 42, 8] <---- WRONG for numbers!
nums3.sort((a, b) => a - b); // Correct numeric sort
console.log(nums3); // [4, 8, 15, 16, 23, 42]

// Sorting an array in ascending order
const arrAsc = [7, 2, 4, 1, 9];
arrAsc.sort((a, b) => a - b);
console.log("Ascending:", arrAsc); // [1, 2, 4, 7, 9]

// Sorting an array in descending order
const arrDesc = [7, 2, 4, 1, 9];
arrDesc.sort((a, b) => b - a);
console.log("Descending:", arrDesc); // [9, 7, 4, 2, 1]

/*
------------------------
Array of Objects — Practical Example
------------------------
*/
const students = [
  { name: "Amit", marks: 75 },
  { name: "Neha", marks: 88 },
  { name: "Ravi", marks: 62 },
];

// Get names of students who scored above 70
const toppers = students.filter((s) => s.marks > 70).map((s) => s.name);
console.log("Toppers:", toppers); // ["Amit", "Neha"]

/*
------------------------
Sparse Arrays and 'length'
------------------------
*/
const sparse = [];
sparse[3] = "X";
console.log(sparse); // [ <3 empty items>, 'X' ]
console.log(sparse.length); // 4

/*
------------------------
Array Creation Tricks
------------------------
*/

// Array of N elements, all zeros
const zeros = Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// Array of 1—10
const tenNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(tenNumbers);

// Array.from() with mapping
const doubled = Array.from([1, 2, 3], (x) => x * 2);
console.log(doubled); // [2, 4, 6]

/*
------------------------
Joining and Splitting Arrays
------------------------
*/
const joined = fruits.join(" | ");
console.log(joined); // "Apple | Blueberry | Orange"
const splitArr = "a,b,c".split(",");
console.log(splitArr); // ["a", "b", "c"]

/*
------------------------
Removing/Adding Elements Anywhere: splice
------------------------
*/
// Remove 2 items starting from index 1
let nums = [1, 2, 3, 4, 5];
nums.splice(1, 2);
console.log(nums); // [1, 4, 5]
// Add at index 2 (no removal)
nums.splice(2, 0, 99);
console.log(nums); // [1, 4, 99, 5]
// Replace at index 0
nums.splice(0, 1, 111);
console.log(nums); // [111, 4, 99, 5]

/*
------------------------
Flat and Flattening Arrays
------------------------
*/
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat()); // [1, 2, [3, [4]]]
console.log(nested.flat(2)); // [1, 2, 3, [4]]

/*
------------------------
Array Methods: Chaining Example
------------------------
*/
// Get squares of even numbers from 1-10
const squaresOfEvens = Array.from({ length: 10 }, (_, i) => i + 1)
  .filter((n) => n % 2 === 0)
  .map((n) => n * n);
console.log(squaresOfEvens); // [4, 16, 36, 64, 100]

/*
------------------------
Advanced: findIndex, filter, map, etc.
------------------------
*/
const arr2 = [5, 12, 8, 130, 44];
const foundIdx = arr2.findIndex((x) => x > 10);
console.log(foundIdx); // 1 (index of 12)
console.log(arr2[foundIdx]); // 12

/*
=========================
Summary Table: Array Methods
=========================
| Method       | Use/Result                                 | Returns         |
|--------------|--------------------------------------------|-----------------|
| push(val)    | Add at end                                 | New length      |
| pop()        | Remove last, returns it                    | Removed value   |
| unshift(val) | Add at start                               | New length      |
| shift()      | Remove first, returns it                   | Removed value   |
| forEach(fn)  | Run fn for each element                    | undefined       |
| map(fn)      | Transform each element, new array          | New array       |
| filter(fn)   | Select matching elements                   | New array       |
| find(fn)     | First match or undefined                   | Value or undef. |
| some(fn)     | Any match? (boolean)                       | true/false      |
| every(fn)    | All match? (boolean)                       | true/false      |
| reduce(fn)   | Reduce to one value                        | Result          |
| includes(x)  | Is value present? (boolean)                | true/false      |
| indexOf(x)   | Index of value, or -1                      | Number          |
| concat(arr)  | Merge arrays                               | New array       |
| join(sep)    | Join as string with separator              | String          |
| slice(a,b)   | Get subarray (non-mutating)                | New array       |
| splice(a,b,x)| Remove/insert (mutating)                   | Removed array   |
| sort(fn)     | Sort (mutating!)                           | Sorted array    |
| reverse()    | Reverse (mutating!)                        | Reversed array  |
| flat(n)      | Flatten depth-n nested arrays              | New array       |

-------------------------
REMEMBER: Arrays are incredibly flexible and powerful!
They can hold any value type—including other arrays, objects, even functions!
Explore and practice these patterns to master arrays in JavaScript.
*/
