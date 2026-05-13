/*
=============================================
Callbacks, Promises, and Async/Await in JavaScript
=============================================

JavaScript is single-threaded, but often needs to handle asynchronous operations (e.g., HTTP requests, timers, file reading). To deal with this, JS provides several mechanisms. Let's explore them in detail:

-----------------------------------------------------------
1. CALLBACKS
-----------------------------------------------------------
A callback is a function passed as an argument to another function, to be executed after some operation finishes. Callbacks are the foundation of async programming in JS.

Example: Simulating an asynchronous task with setTimeout and a callback.
*/

function fetchDataCallback(url, callback) {
  console.log("Starting fetch (with Callback)...");
  setTimeout(() => {
    // Simulate network delay
    const data = { message: "Data from " + url };
    callback(null, data); // Convention: callback(error, result)
  }, 1000);
}

// Usage
fetchDataCallback("https://example.com/api/data", function (err, result) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Callback Result:", result);
  }
});

/*
**Drawbacks of Callbacks:**
- Callback Hell (Pyramid of Doom): Nested callbacks become hard to read and maintain
- Error handling can get messy

Example of Callback Hell:
*/
function step1(val, cb) {
  setTimeout(() => {
    cb(val + 1);
  }, 500);
}
function step2(val, cb) {
  setTimeout(() => {
    cb(val * 2);
  }, 500);
}

step1(1, (result1) => {
  step2(result1, (result2) => {
    step1(result2, (result3) => {
      console.log("Callback Hell result:", result3);
    });
  });
});

/*
-----------------------------------------------------------
2. PROMISES
-----------------------------------------------------------
A Promise is an object representing the eventual completion or failure of an asynchronous task. They vastly improve readability, composability, and error-handling.

**States of a Promise:**
- Pending
- Fulfilled
- Rejected

Example: Wrapping the same logic above using Promise.
*/

function fetchDataPromise(url) {
  return new Promise((resolve, reject) => {
    console.log("Starting fetch (with Promise)...");
    setTimeout(() => {
      const data = { message: "Data from " + url };
      if (url) {
        resolve(data);
      } else {
        reject("URL not provided!");
      }
    }, 1000);
  });
}

// Usage
fetchDataPromise("https://example.com/api/data")
  .then((result) => {
    console.log("Promise Result:", result);
    return result.message;
  })
  .then((msg) => {
    console.log("Chained .then():", msg);
  })
  .catch((error) => {
    console.error("Promise Error:", error);
  });

/*
Promises allow us to chain asynchronous tasks in a readable way, and error handling is easy with `.catch()`.

Example: Flattening our previous example with Promises
*/

function step1P(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val + 1);
    }, 500);
  });
}
function step2P(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val * 2);
    }, 500);
  });
}

step1P(1)
  .then(step2P)
  .then(step1P)
  .then((result) => {
    console.log("Promise chain result:", result);
  });

/*
-----------------------------------------------------------
3. ASYNC / AWAIT
-----------------------------------------------------------
Async/await is modern JavaScript 'syntactic sugar' on top of Promises, making asynchronous code look like synchronous code! Async/await dramatically improves readability and error handling.

- `async` keyword: Declares an async function, which always returns a Promise.
- `await` keyword: Pauses function execution until the awaited Promise settles.

Example: Clean, linear-looking async code.
*/

async function fetchProcessData(url) {
  try {
    console.log("Starting fetch (with async/await)...");
    // Wait for the Promise to resolve (just like above)
    const data = await fetchDataPromise(url); // from above
    console.log("Async/Await Result:", data);

    // Chained logic, also using Promise-based steps
    let result1 = await step1P(1);
    let result2 = await step2P(result1);
    let result3 = await step1P(result2);
    console.log("Async/Await chain result:", result3);
  } catch (err) {
    console.error("Async/Await Error:", err);
  }
}

fetchProcessData("https://example.com/api/data");

/*
-----------------------------------------------------------
SUMMARY TABLE
-----------------------------------------------------------

| Mechanism     | Syntax Style                | Readability   | Error Handling           | Chaining        |
|---------------|----------------------------|---------------|-------------------------|-----------------|
| Callbacks     | Nested callbacks           | Low           | callback(err, data)     | Manual/nested   |
| Promises      | .then()/.catch() chains    | Medium        | .catch()                | Easy            |
| Async/Await   | Synchronous-like (await)   | High          | try/catch               | Very easy       |

**Pro Tips/Notes:**
- Promises can be created out of old-style callback functions using `new Promise` or utility functions like `util.promisify` (Node.js).
- Async functions ALWAYS return a Promise.
- Don't mix callbacks and Promises in the same function signature.
- Await only works inside `async` functions.
- Use try/catch with async/await for robust error handling.

-----------------------------------------------------------
Real World Example: Fetching Data from a Real API using Fetch
-----------------------------------------------------------

(async function realFetchExample() {
  try {
    // The Fetch API returns a Promise!
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const post = await response.json(); // response.json() is async
    console.log("Fetched Post:", post);
  } catch (err) {
    console.error("Failed to fetch post:", err);
  }
})();

/*
-----------------------------------------------------------
Conclusion
-----------------------------------------------------------
- Callbacks are a foundation, but lead to messy code for complex async flows.
- Promises dramatically improve composability and error handling.
- Async/Await makes asynchronous code clean, readable, and robust.
- Under the hood, even async/await works with Promises.
- Modern JavaScript (>ES2017) prefers Promises and async/await for asynchronous programming.
*/
