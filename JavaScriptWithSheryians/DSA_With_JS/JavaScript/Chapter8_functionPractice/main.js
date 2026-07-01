/*
=======================================
BMI Calculator Function with Explanation
=======================================

BMI (Body Mass Index) is a measure to assess if a person has a healthy body weight for a given height.
Formula: BMI = weight (kg) / [height (m)]²

Typical BMI Categories:
- Underweight: < 18.5
- Normal weight: 18.5–24.9
- Overweight: 25–29.9
- Obese: ≥ 30

The function below calculates BMI and returns a string with the BMI value and its health category.
*/

function calculateBMI(weightKg, heightMeters) {
  // Calculate BMI using the formula
  const bmi = weightKg / (heightMeters * heightMeters);

  // Determine the BMI category
  let category;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  // Return a nicely formatted result
  return `BMI: ${bmi.toFixed(2)} (${category})`;
}

// Example usage:
console.log(calculateBMI(68, 1.75)); // Normal weight
console.log(calculateBMI(50, 1.6)); // Underweight
console.log(calculateBMI(85, 1.7)); // Overweight
console.log(calculateBMI(105, 1.7)); // Obese

/*
Explanation:
- The function takes weight (in kilograms) and height (in meters) as inputs.
- It computes BMI, categorizes it, and returns a readable string result.
- '.toFixed(2)' ensures only 2 decimals are shown for the BMI value.
*/

/*
=========================================
Greet Function with Default Name Explained
=========================================

Often, we want to greet a user by name, but sometimes the name may not be provided.
To handle this, we can use a default parameter value in our function.

Key Concepts:
- "Default parameter": If the argument is not supplied, the default value is used.
- Template literals: Allow for easy string interpolation in JavaScript (using backticks).

Below is a greet function that greets the user by name, defaulting to "Guest" if no name is specified.
*/

function greet(name = "Guest") {
  return `Hello, ${name}! Welcome!`;
}

// Example usage:
console.log(greet("Alice")); // Output: Hello, Alice! Welcome!
console.log(greet()); // Output: Hello, Guest! Welcome!

/*
Explanation:
- The function takes an argument 'name'.
- If 'name' is not provided (i.e., function is called as greet()), it defaults to "Guest".
- Returns a friendly greeting using a template literal.
Useful for login pages, generic user interfaces, or whenever user data might be optional.
*/

/*
=========================================
Sum All Numbers Using Rest Parameters
=========================================

The "rest parameter" syntax (`...numbers`) allows a function to accept any number of arguments as an array.
This is extremely useful when you want to sum an unknown quantity of numbers.

Key Concepts:
- Rest parameter (`...numbers`): Collects all remaining arguments into a real array called "numbers".
- Array methods: We can use `reduce()` to sum up all the elements.

Below is a function that takes any number of numerical arguments and returns their sum.
*/

function sumAll(...numbers) {
  // numbers is a real array of all arguments passed to the function
  return numbers.reduce((total, n) => total + n, 0);
}

// Example usage:
console.log(sumAll(1, 2, 3)); // Output: 6
console.log(sumAll(10, 20, 30, 40, 50)); // Output: 150
console.log(sumAll()); // Output: 0

/*
Explanation:
- The `...numbers` collects ALL arguments into an array (even if zero).
- `reduce()` adds up each number, with an initial total of 0.
- You can call sumAll with as many numbers as you like—or none!
This pattern is very powerful for flexible numeric operations.
*/

/*
=======================================
Counter Function with Closures (Detailed)
=======================================

A closure allows a function to "remember" variables from its containing (outer) scope, even after the outer function has finished executing.

Below is a classic counter example using closures. Each counter made with createCounter() maintains its own private state.

Key Concepts:
- The outer function (createCounter) initializes a "count" variable.
- The inner function (that is returned) increments and returns "count".
- Because the returned function "closes over" the count variable, it can access and update it on each call, even after createCounter() has finished running.
- Each call to createCounter() returns a NEW independent counter.

*/

// Factory function: returns a function with private state
function createCounter(start = 0) {
  let count = start; // This variable is "private"—not accessible from outside
  return function () {
    count++;
    return count;
  };
}

// Example usage:
const counterA = createCounter(); // Starts at 0 by default
console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterA()); // 3

const counterB = createCounter(10); // Starts at 10
console.log(counterB()); // 11
console.log(counterB()); // 12

/*
Explanation:
- Each counter (counterA, counterB) maintains its own independent "count" variable.
- The variable "count" lives on because it is referenced by the returned function.
- This is a closure in action—you have data privacy, and isolated state per instance!

Real-World Use Cases:
- UI click counters ("Likes", "Upvotes", etc.)
- Keep track of attempts (form tries, login attempts)
- Generating unique incremental values

Closures are a powerful and essential part of JavaScript.
*/

/*
===============================
Function That Returns a Function
===============================

Let's design a detailed example showing a function that returns another function—a real demonstration of JavaScript's "first-class functions" concept and closures.

Example: Personalized Logger Factory

Suppose you want to create loggers that automatically prefix every message with a particular tag (e.g., "INFO", "ERROR", or a custom module name). You want a flexible way to make as many specialized loggers as you like with their own tag/prefix.

- The outer function (createLogger) takes a "tag" parameter.
- It returns an inner function that will, when called, print a tagged message.
- The returned function "remembers" the tag from when it was created.

*/

function createLogger(tag) {
  // The "tag" is captured by the closure and lives inside the returned function
  return function (message) {
    // This inner function can access "tag", even after createLogger has finished
    const time = new Date().toLocaleTimeString(); // For illustrative detail
    console.log(`[${tag}] ${time}: ${message}`);
  };
}

// Example Usage:
const infoLogger = createLogger("INFO");
const errorLogger = createLogger("ERROR");

infoLogger("System started."); // [INFO] 12:34:56 PM: System started.
infoLogger("User logged in."); // [INFO] 12:34:57 PM: User logged in.
errorLogger("Something failed!"); // [ERROR] 12:34:58 PM: Something failed!

/*

Details:
- Each call to createLogger returns a new function (e.g., infoLogger, errorLogger) that "remembers" the tag it was created with.
- That tag is private and cannot be changed from outside.
- Multiple logger functions can coexist independently, each with their own tag state.
- This pattern is very common in building utility factories, middleware, test stubs, and more.

Takeaway:
A function returning another function—especially when the inner one uses variables from the outer scope—is an idiomatic and powerful JS pattern for abstraction, code reuse, and encapsulation.
*/

// Function to log even numbers in an array with detailed information
function logEvenNumbersDetailed(arr) {
  if (!Array.isArray(arr)) {
    console.log("Provided value is not an array.");
    return;
  }
  let evenCount = 0;
  arr.forEach((num, idx) => {
    if (typeof num !== "number") {
      console.log(`Skipping index ${idx}: not a number ("${num}").`);
      return;
    }
    if (num % 2 === 0) {
      evenCount++;
      console.log(
        `Even Number Found: ${num} at index ${idx} (Array: [${arr.join(", ")}])`
      );
    }
  });
  if (evenCount === 0) {
    console.log("No even numbers were found in the array.");
  } else {
    console.log(`Total even numbers found: ${evenCount}`);
  }
}

// Example usage:
logEvenNumbersDetailed([3, 8, 2, 7, "hi", 10, 13, 4]);
