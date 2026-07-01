/*
----------------------------------------
JavaScript Loops: Detailed Explanation
----------------------------------------

A **loop** allows you to repeat a block of code as long as a certain condition is true.
Loops are fundamental in programming for processing collections, repeating actions, or performing tasks a specific number of times.

Types of Loops in JavaScript:
-----------------------------
1. for      - Runs for a known number of iterations
2. while    - Runs while a certain condition is true
3. do...while - Like while, but runs at least once
4. for...of - Iterates over array or iterable objects
5. for...in - Iterates over properties of an object

for loop => kaha se jaana hai, kaha tak jaana hai, kaise jaana hai
1 - 50 tak
1 se jaana hai, 50 tak jaana hai, 1-1 karke jaana hai

while loop => kaha se jaana hai, pata nehi kab rukna hai, kaise jaana hai
tab tak jaou jab tak mai hello na bool du

---------------------------------------------------------
1. for Loop (When you KNOW how many times you want to loop)
---------------------------------------------------------
Syntax:
for (initialization; condition; increment) {
    // code to execute
}

Example: Print numbers from 1 to 5
*/
for (let i = 1; i <= 5; i++) {
  console.log("for loop, i =", i);
}
/*
OUTPUT:
for loop, i = 1
for loop, i = 2
for loop, i = 3
for loop, i = 4
for loop, i = 5
*/

/*
------------------------------------------------------
2. while Loop (When you DON'T KNOW how many times)
------------------------------------------------------
Executes as long as the condition is true.
*/
let count = 1;
while (count <= 3) {
  console.log("while loop, count =", count);
  count++;
}
/*
OUTPUT:
while loop, count = 1
while loop, count = 2
while loop, count = 3
*/

/*
------------------------------------------------------
3. do...while Loop (Executes at least ONCE, THEN checks)
------------------------------------------------------
*/
let j = 1;
do {
  console.log("do...while loop, j =", j);
  j++;
} while (j <= 2);
/*
OUTPUT:
do...while loop, j = 1
do...while loop, j = 2
*/

/*
----------------------------------------------
4. for...of Loop (Loops over ARRAY or ITERABLE)
----------------------------------------------
*/
const fruits = ["apple", "banana", "mango"];
for (const fruit of fruits) {
  console.log("for...of loop:", fruit);
}
/*
OUTPUT:
for...of loop: apple
for...of loop: banana
for...of loop: mango
*/

/*
-----------------------------------------------
5. for...in Loop (Loops over OBJECT properties)
-----------------------------------------------
*/
const person = { name: "Alice", age: 30, city: "Delhi" };
for (const key in person) {
  console.log(`for...in loop: ${key} = ${person[key]}`);
}
/*
OUTPUT:
for...in loop: name = Alice
for...in loop: age = 30
for...in loop: city = Delhi
*/

/*
===========================
Real World Program Examples
===========================

Example 1: Summing All Numbers in an Array (using for loop)
*/
function sumArray(numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}
console.log("Sum of [10, 20, 30]:", sumArray([10, 20, 30])); // 60

/*
Example 2: Printing "FizzBuzz" for Numbers 1 to 15
If the number is divisible by 3, print "Fizz", by 5 print "Buzz", by both print "FizzBuzz".
*/
for (let n = 1; n <= 15; n++) {
  if (n % 3 === 0 && n % 5 === 0) {
    console.log("FizzBuzz");
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(n);
  }
}

/*
Example 3: Looping Over an Array of Users and Greeting Each
*/
const users = ["Neha", "Raj", "Priya"];
for (let user of users) {
  console.log("Hello,", user + "!");
}

/*
Example 4: Real World - Counting Occurrences of Words in a Text
*/
function wordCount(text) {
  const words = text.toLowerCase().split(/\W+/);
  const counts = {};
  for (let word of words) {
    if (!word) continue;
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  return counts;
}
console.log(
  wordCount("The sky is blue. The sun is bright and the sky is blue.")
);
/*
OUTPUT (object):
{ the: 3, sky: 2, is: 2, blue: 2, sun: 1, bright: 1, and: 1 }
*/

/*
Recap:
------
- Loops are used to automate repetitive tasks.
- Choose the loop that best fits your data and use case.
- Break and continue can alter loop execution:
    - break; exits the loop early.
    - continue; skips to the next iteration.

Example: break and continue
*/
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue; // skip number 3
  if (i === 5) break; // exit loop when i is 5
  console.log("i =", i);
}
