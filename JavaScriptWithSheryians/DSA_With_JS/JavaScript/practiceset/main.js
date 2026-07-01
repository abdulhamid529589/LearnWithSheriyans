// ============================
// JavaScript Real-World Practice Mini-Programs
// ============================

// 1. Rock-Paper-Scissors Game (Console)
// -------------------------------------
function playRockPaperScissors() {
  const choices = ["rock", "paper", "scissors"];
  const user = prompt("Rock, Paper, or Scissors?").toLowerCase();
  const computer = choices[Math.floor(Math.random() * 3)];
  if (!choices.includes(user)) {
    alert("Invalid choice!");
    return;
  }
  alert(`Computer chose: ${computer}`);
  if (user === computer) {
    alert("It's a tie!");
  } else if (
    (user === "rock" && computer === "scissors") ||
    (user === "scissors" && computer === "paper") ||
    (user === "paper" && computer === "rock")
  ) {
    alert("You win!");
  } else {
    alert("You lose!");
  }
}
// Uncomment below to play in browser
// playRockPaperScissors();

// 2. Number Guessing Game
// -----------------------
function numberGuessingGame() {
  const number = Math.floor(Math.random() * 100) + 1;
  let guess,
    attempts = 0;
  do {
    guess = parseInt(prompt("Guess a number between 1 and 100:"));
    attempts++;
    if (guess > number) {
      alert("Too high!");
    } else if (guess < number) {
      alert("Too low!");
    } else if (guess === number) {
      alert(`Correct! It took you ${attempts} tries.`);
    }
  } while (guess !== number);
}
// Uncomment below to play in browser
// numberGuessingGame();

// 3. Simple Calculator
// --------------------------
function simpleCalculator() {
  const op = prompt("Enter operator (+, -, *, /):");
  const a = parseFloat(prompt("Enter first number:"));
  const b = parseFloat(prompt("Enter second number:"));
  let result;
  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b !== 0 ? a / b : "undefined (division by zero)";
      break;
    default:
      alert("Invalid operator!");
      return;
  }
  alert(`Result: ${result}`);
}
// Uncomment below to use in browser
// simpleCalculator();

// 4. To-Do List in Console (Array Only)
// --------------------------------------
function todoList() {
  const todos = [];
  let choice;
  do {
    choice = prompt(
      "To-Do List:\n1. Add\n2. View\n3. Delete\n4. Exit\nChoose an option:"
    );
    switch (choice) {
      case "1":
        const task = prompt("Enter a new task:");
        todos.push(task);
        alert("Task added!");
        break;
      case "2":
        alert(
          "Your tasks:\n" + todos.map((t, i) => i + 1 + ". " + t).join("\n")
        );
        break;
      case "3":
        const idx = parseInt(prompt("Enter task number to delete:")) - 1;
        if (todos[idx]) {
          todos.splice(idx, 1);
          alert("Deleted!");
        } else {
          alert("Invalid task number.");
        }
        break;
      case "4":
        alert("Goodbye!");
        break;
      default:
        alert("Invalid option.");
    }
  } while (choice !== "4");
}
// Uncomment below to use in browser
// todoList();

// 5. Palindrome Checker
// ----------------------
function palindromeChecker() {
  const str = prompt("Enter a string:")
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
  const isPalindrome = str === str.split("").reverse().join("");
  alert(isPalindrome ? "Palindrome!" : "Not a palindrome.");
}
// Uncomment below to use in browser
// palindromeChecker();

// 6. FizzBuzz
// -------------
function fizzBuzz(n = 100) {
  for (let i = 1; i <= n; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(out || i);
  }
}
// Run in console:
// fizzBuzz(30);

// 7. Simple Timer/Stopwatch
// ---------------------------
function simpleStopwatch() {
  alert("Press OK to start timer.");
  const start = Date.now();
  alert("Press OK to stop timer.");
  const end = Date.now();
  alert(`Elapsed: ${((end - start) / 1000).toFixed(2)} seconds`);
}
// Uncomment below to use in browser
// simpleStopwatch();

// 8. Temperature Converter (Celsius/Fahrenheit)
// ---------------------------------------------
function temperatureConverter() {
  const c = parseFloat(prompt("Enter temp in Celsius:"));
  const f = (c * 9) / 5 + 32;
  alert(`Fahrenheit: ${f}`);
}
// Uncomment below to use in browser
// temperatureConverter();

// 9. Random Password Generator
// -----------------------------
function passwordGenerator(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  alert("Generated password: " + password);
}
// Uncomment below to use in browser
// passwordGenerator(10);

// 10. Word Counter
// -----------------
function wordCounter() {
  const text = prompt("Enter your text:");
  const wordCount = text.trim().split(/\s+/).length;
  alert(`Word count: ${wordCount}`);
}
// Uncomment below to use in browser
// wordCounter();

// =========================
// Add more scenarios to practice:
// - BMI Calculator
// - Quiz app
// - Currency/Money Converter
// - Hangman Game
// - Flashcard Trainer
// - Tip Calculator
// - Calendar generator
// - Dice roller
// - Tic-Tac-Toe
// =========================

// 11. BMI Calculator
// -------------------
function bmiCalculator() {
  const weight = parseFloat(prompt("Enter your weight in kg:"));
  const height = parseFloat(prompt("Enter your height in meters:"));
  if (isNaN(weight) || isNaN(height) || height <= 0) {
    alert("Invalid input. Please enter positive numbers.");
    return;
  }
  const bmi = weight / (height * height);
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obese";
  alert(`Your BMI: ${bmi.toFixed(2)} (${category})`);
}
// Uncomment below to use in browser
// bmiCalculator();

// 12. Simple Quiz App
// --------------------
function quizApp() {
  const questions = [
    {
      q: "What is the capital of France?",
      a: "paris",
    },
    {
      q: "2 + 2 = ?",
      a: "4",
    },
    {
      q: "JS stands for?",
      a: "javascript",
    },
  ];
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const ans = prompt(questions[i].q).trim().toLowerCase();
    if (ans === questions[i].a) {
      alert("Correct!");
      score++;
    } else {
      alert("Wrong. Correct answer: " + questions[i].a);
    }
  }
  alert(`Quiz finished! Your score: ${score}/${questions.length}`);
}
// Uncomment below to use in browser
// quizApp();

// 13. Currency Converter
// -----------------------
function currencyConverter() {
  // Rates are fictitious; in real-world, use an API!
  const rates = {
    USD: 1,
    EUR: 0.92,
    INR: 83,
    GBP: 0.78,
    JPY: 155,
  };
  const amount = parseFloat(prompt("Enter amount (in USD):"));
  if (isNaN(amount) || amount < 0) {
    alert("Invalid amount.");
    return;
  }
  let result = `USD ${amount}\n`;
  for (const [currency, rate] of Object.entries(rates)) {
    if (currency !== "USD") {
      result += `${currency}: ${(amount * rate).toFixed(2)}\n`;
    }
  }
  alert(result.trim());
}
// Uncomment below to use in browser
// currencyConverter();

// 14. Hangman Mini Game
// ----------------------
function hangmanGame() {
  const words = ["javascript", "hangman", "coding", "developer", "browser"];
  const word = words[Math.floor(Math.random() * words.length)];
  let guessed = Array(word.length).fill("_");
  let attempts = 6;
  let tried = [];
  while (attempts > 0 && guessed.includes("_")) {
    const guess = prompt(
      `Word: ${guessed.join(" ")}\nAttempts: ${attempts}\nTried: ${tried.join(
        ", "
      )}\nGuess a letter:`
    )
      .toLowerCase()
      .trim();
    if (!guess || guess.length !== 1 || tried.includes(guess)) {
      alert("Invalid or repeated guess. Try a single new letter.");
      continue;
    }
    tried.push(guess);
    if (word.includes(guess)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) guessed[i] = guess;
      }
      alert("Good guess!");
    } else {
      attempts--;
      alert("Wrong guess.");
    }
  }
  if (!guessed.includes("_")) {
    alert(`Congrats! You guessed the word: ${word}`);
  } else {
    alert(`Out of attempts! The word was: ${word}`);
  }
}
// Uncomment below to use in browser
// hangmanGame();

// 15. Flashcard Trainer
// ----------------------
function flashcardTrainer() {
  const cards = [
    { q: "Capital of Germany?", a: "berlin" },
    { q: "3 x 4 = ?", a: "12" },
    { q: "Largest planet?", a: "jupiter" },
    { q: "HTML stands for?", a: "hypertext markup language" },
  ];
  for (let i = 0; i < cards.length; i++) {
    const ans = prompt(cards[i].q).trim().toLowerCase();
    if (ans === cards[i].a) alert("Correct!");
    else alert(`Wrong. Answer: ${cards[i].a}`);
  }
  alert("Flashcard session done!");
}
// Uncomment below to use in browser
// flashcardTrainer();

// 16. Tip Calculator
// --------------------
function tipCalculator() {
  const bill = parseFloat(prompt("Enter bill amount:"));
  if (isNaN(bill) || bill <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  const percent = parseFloat(prompt("Enter tip percentage (e.g., 15):"));
  if (isNaN(percent) || percent < 0) {
    alert("Invalid percentage.");
    return;
  }
  const tip = (bill * percent) / 100;
  const total = bill + tip;
  alert(`Tip: $${tip.toFixed(2)}\nTotal Bill: $${total.toFixed(2)}`);
}
// Uncomment below to use in browser
// tipCalculator();

// 17. Calendar Generator (Text Version)
// --------------------------------------
function calendarGenerator() {
  const year = parseInt(prompt("Enter year (e.g., 2024):"));
  const month = parseInt(prompt("Enter month (1-12):"));
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    alert("Invalid input.");
    return;
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  let calendar = `Calendar for ${year}-${month}\n`;
  for (let d = 1; d <= daysInMonth; d++) {
    calendar += d + (d % 7 === 0 ? "\n" : "\t");
  }
  alert(calendar);
}
// Uncomment below to use in browser
// calendarGenerator();

// 18. Dice Roller
// -----------------
function diceRoller() {
  const sides = parseInt(prompt("Number of sides on dice (default 6):")) || 6;
  if (isNaN(sides) || sides < 1) {
    alert("Invalid number of sides.");
    return;
  }
  const roll = Math.floor(Math.random() * sides) + 1;
  alert(`You rolled: ${roll} (1-${sides})`);
}
// Uncomment below to use in browser
// diceRoller();

// 19. Tic-Tac-Toe (Text-based, 2 players)
// -----------------------------------------
function ticTacToe() {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let player = "X";
  let moves = 0;
  function printBoard() {
    return board
      .map((row) => row.map((cell) => cell || ".").join(" "))
      .join("\n");
  }
  function checkWin() {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      )
        return true;
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      )
        return true;
    }
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    )
      return true;
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    )
      return true;
    return false;
  }
  while (moves < 9) {
    const inp = prompt(
      `Player ${player}, make move (row,col: 1-3)\n\n${printBoard()}`
    );
    if (!inp) break;
    const [r, c] = inp.split(",").map((x) => parseInt(x.trim()) - 1);
    if ([r, c].some((x) => isNaN(x) || x < 0 || x > 2) || board[r][c]) {
      alert("Invalid move. Try again.");
      continue;
    }
    board[r][c] = player;
    moves++;
    if (checkWin()) {
      alert(`Player ${player} wins!\n\n${printBoard()}`);
      return;
    }
    player = player === "X" ? "O" : "X";
  }
  alert(`Draw!\nFinal board:\n${printBoard()}`);
}
// Uncomment below to use in browser
// ticTacToe();

// 20. Palindrome Checker
// ------------------------
function palindromeChecker() {
  const text = prompt("Enter a string to check for palindrome:");
  const cleaned = text.replace(/[\W_]/g, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  if (cleaned === reversed) {
    alert("Palindrome!");
  } else {
    alert("Not a palindrome.");
  }
}
// Uncomment below to use in browser
// palindromeChecker();

// 21. Debounce Function: Limit the rate a function can fire (used with UI events)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Example: window resizing
// window.addEventListener('resize', debounce(() => console.log('Resized!'), 300));

// 22. Deep Clone an Object (safe for simple objects, *not* functions/DOM/etc)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 23. Generate a Random Hex Color
function randomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}
// Example: console.log(randomHexColor());

// 24. Copy to Clipboard (with async/await, modern browsers)
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch {
    alert("Clipboard copy failed.");
  }
}
// Example: copyToClipboard("Hello World!");

// 25. Format Date as YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
// Example: console.log(formatDate(new Date()));

// 26. Capitalize Every Word in a String
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
// Example: console.log(capitalizeWords("hello world from js"));

// 27. Download Data as a File (e.g., CSV/JSON)
function downloadFile(filename, content) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
// Example: downloadFile("data.txt", "Hello world!");

// 28. Get URL Query Parameters as Object
function getQueryParams(url = window.location.href) {
  return Object.fromEntries(new URL(url).searchParams.entries());
}
// Example: ?name=Alice&age=30 => {name:"Alice", age:"30"}

// 29. Throttle Function (limit function to execute at most every X ms)
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
// Example: window.addEventListener('scroll', throttle(() => console.log('Scroll!'), 200));

// 30. Scroll to Top Button
function addScrollToTopBtn() {
  const btn = document.createElement("button");
  btn.innerText = "↑ Top";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.display = "none";
  btn.style.zIndex = "1000";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}
// Uncomment below to enable in browser environments
// addScrollToTopBtn();

// These are just a few practical utilities and patterns you'll use often as a developer!

// 31. Debounce Function (run function after X ms of no calls)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Example: window.addEventListener('resize', debounce(() => console.log('Resized!'), 300));

// 32. Copy Text to Clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}
// Example: copyToClipboard("Hello World!");

// 33. Generate a UUID v4
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// Example: let id = uuidv4();

// 34. Deep Clone an Object (simple, for JSON-safe data)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// Note: Doesn't handle functions, Dates, etc. For complex objects, consider structuredClone or lodash.cloneDeep

// 35. Group By Key (Array of Objects)
function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const v = obj[key];
    acc[v] = acc[v] || [];
    acc[v].push(obj);
    return acc;
  }, {});
}
// Example: groupBy([{type:'a'}, {type:'b'}, {type:'a'}], 'type');

// 36. Shuffle Array (Fisher-Yates)
function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Example: let newArr = shuffle([1,2,3,4]);

// 37. Wait (async sleep)
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Example: await wait(1000);

// 38. Toggle Class Utility
function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    // fallback
    const classes = el.className.split(" ");
    const idx = classes.indexOf(className);
    if (idx >= 0) classes.splice(idx, 1);
    else classes.push(className);
    el.className = classes.join(" ");
  }
}
// Example: toggleClass(document.body, 'dark-mode');

// 39. Capitalize Words in a String
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
// Example: capitalizeWords("hello world!") // "Hello World!"

// 40. Remove Duplicates from Array
function uniqueArray(arr) {
  return [...new Set(arr)];
}
// Example: uniqueArray([1,2,2,3,4,4]) // [1,2,3,4]

// 41. Generate a Range of Numbers
function range(start, end, step = 1) {
  const arr = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    arr.push(i);
  }
  return arr;
}
// Example: range(0, 5) // [0,1,2,3,4]

// 42. Flatten an Array (single level)
function flatten(arr) {
  return [].concat(...arr);
}
// Example: flatten([1, [2, 3], [4]]) // [1,2,3,4]

// 43. Get the Intersection of Two Arrays
function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter((x) => set2.has(x));
}
// Example: intersection([1,2,3], [2,3,4]) // [2,3]

// 44. Find the Difference of Two Arrays
function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter((x) => !set2.has(x));
}
// Example: difference([1,2,3], [2,4]) // [1,3]

// 45. Chunk Array into Smaller Arrays
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
// Example: chunk([1,2,3,4,5], 2) // [[1,2],[3,4],[5]]

// 46. Reverse String
function reverseString(str) {
  return str.split("").reverse().join("");
}
// Example: reverseString("hello") // "olleh"

// 47. Pluralize Word (simple)
function pluralize(word, count) {
  return count === 1 ? word : word + "s";
}
// Example: pluralize("dog", 2); // "dogs"

// 48. Get Random Element from Array
function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// Example: randomElement([5,6,7]);

// 49. Get Average of Number Array
function average(arr) {
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}
// Example: average([1,2,3,4]) // 2.5

// 50. Clamp Number Between Min and Max
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
// Example: clamp(10, 0, 5) // 5

// 51. Pad Number with Zeros
function pad(num, size) {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
}
// Example: pad(5, 3); // "005"

// 52. Escape HTML
function escapeHTML(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[m])
  );
}
// Example: escapeHTML('<div>"Hi"</div>')

// 53. Parse JSON Safely
function safeJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
// Example: safeJSON('{"a":1}')  // {a:1}
// Example: safeJSON('bad')      // null

// -------------------------------------
// React Developer Utilities
// -------------------------------------

// 54. Capitalize First Letter of Each Word (Useful for Display Labels)
function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
// Example: titleCase("hello react developer"); // "Hello React Developer"

// 55. Debounce Function (UI Performance - e.g., search inputs)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Example: const handleInput = debounce(val => ..., 300);

// 56. Shallow Compare (React shouldComponentUpdate-like)
function shallowEqual(objA, objB) {
  if (objA === objB) return true;
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}
// Example: shallowEqual({a:1}, {a:1}); // true

// 57. Create a List of Unique Keys for React Lists
function uniqueKey(prefix = "key") {
  let i = 0;
  return () => `${prefix}_${i++}`;
}
// Example: const getKey = uniqueKey("item"); getKey(); // "item_0", getKey(); // "item_1"

// 58. Scroll to Top (Browser Window)
function scrollToTop(smooth = true) {
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}
// Example: scrollToTop();

// 59. Copy Text to Clipboard (Async)
function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return Promise.resolve();
  }
}
// Example: copyToClipboard("Copied!");

// -------------------------------------
// Backend Developer Utilities
// -------------------------------------

// 60. Generate a Secure Random Token (e.g. for API keys)
// (Node.js: use crypto.randomBytes if available)
function randomToken(length = 32) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
// Example: randomToken(16);

// 61. Sanitize String for SQL Injection Prevention (simple demo, use parameterized queries in production!)
function sqlEscape(str) {
  return String(str).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (c) => {
    switch (c) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + c;
    }
  });
}
// Example: sqlEscape("O'Reilly"); // "O\'Reilly"

// 62. Validate Email Address
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Example: isValidEmail("test@example.com");

// 63. Hash String (SHA-256, browser only; for Node use require('crypto'))
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
// Usage: sha256("your string").then(console.log);

// 64. Parse Cookies (from document.cookie)
function parseCookies(cookieString) {
  return cookieString
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
}
// Example: parseCookies("name=alice; theme=dark");

// 65. Generate UUID v4 (RFC4122 compliant)
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// Example: uuidv4();

// -------------------------------------
// Node.js/Backend Practice Mini-Programs
// -------------------------------------

// 66. Simple HTTP Server (Node.js)
function simpleHTTPServer(port = 3000) {
  const http = require("http");
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Node.js server!\n");
  });
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
// Usage: simpleHTTPServer(4000);

// 67. Read a File Synchronously (Node.js)
function readFileSync(path) {
  const fs = require("fs");
  return fs.readFileSync(path, "utf-8");
}
// Example: readFileSync("./package.json");

// 68. Write JSON to File (Node.js)
function writeJSONFile(path, obj) {
  const fs = require("fs");
  fs.writeFileSync(path, JSON.stringify(obj, null, 2), "utf-8");
}
// Example: writeJSONFile("data.json", {a:123});

// 69. Read and Parse JSON File (Node.js)
function readJSONFile(path) {
  const fs = require("fs");
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
// Example: readJSONFile("data.json");

// 70. Check if File Exists (Node.js)
function fileExists(path) {
  const fs = require("fs");
  return fs.existsSync(path);
}
// Example: fileExists("README.md");

// 71. Log with Timestamp
function logWithTimestamp(...args) {
  console.log(new Date().toISOString(), ...args);
}
// Example: logWithTimestamp("Server started");

// 72. Create a Random Token (hex, backend-safe)
function randomToken(length = 32) {
  return require("crypto").randomBytes(length).toString("hex");
}
// Example: randomToken(16);

// 73. Express.js: Simple API Endpoint (GET /hello)
function expressHelloServer(port = 3000) {
  const express = require("express");
  const app = express();
  app.get("/hello", (req, res) => res.json({ message: "Hello World" }));
  app.listen(port, () => console.log("Listening on", port));
}
// Usage: expressHelloServer(3000);

// 74. Hash Password with bcrypt (Node.js)
async function hashPassword(password) {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
// Usage: hashPassword("mypassword").then(console.log);

// 75. Verify Password with bcrypt (Node.js)
async function verifyPassword(password, hash) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(password, hash);
}
// Usage: verifyPassword("userinput", storedHash).then(console.log);

// 76. JWT Sign and Verify (using jsonwebtoken)
function signJWT(payload, secret, expiresIn = "1h") {
  const jwt = require("jsonwebtoken");
  return jwt.sign(payload, secret, { expiresIn });
}
function verifyJWT(token, secret) {
  const jwt = require("jsonwebtoken");
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
// Example:
// const token = signJWT({userId:1}, "mysecret");
// const payload = verifyJWT(token, "mysecret");

// 77. Compose/Send E-Mail (Nodemailer, async)
async function sendMail({ from, to, subject, text }, smtpOptions) {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport(smtpOptions);
  return await transporter.sendMail({ from, to, subject, text });
}
// Usage: sendMail({from,to,subject,text}, {service:'gmail',auth:{user,pass}});

// 78. Simple REST Error Handling Middleware (Express)
function errorMiddleware(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Server Error" });
}
// Example: app.use(errorMiddleware);

// 79. Rate Limiting Middleware (memory, Express.js)
function rateLimiter({ windowMs = 60000, max = 60 } = {}) {
  const hits = {};
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    hits[ip] = (hits[ip] || []).filter((ts) => now - ts < windowMs);
    if (hits[ip].length >= max) {
      res.status(429).send("Too many requests.");
    } else {
      hits[ip].push(now);
      next();
    }
  };
}
// Usage: app.use(rateLimiter({windowMs:60000,max:100}));

// 80. Parse Environment Variables
function getEnvVar(key, defaultValue = undefined) {
  return process.env[key] || defaultValue;
}
// Example: getEnvVar("NODE_ENV", "development");

// 81. Deep Clone Object (safe for backend)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// Example: deepClone({x:1, y:[2,3]})

// 82. Generate Slug from String (for URLs, backend)
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
// Example: slugify("Hello Express.js World!") // "hello-express-js-world"

// 83. Get Client IP from Express Request
function getClientIP(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  );
}
// Usage: getClientIP(req);

// 84. Validate MongoDB ObjectId
function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}
// Example: isValidObjectId("507f1f77bcf86cd799439011")

// 85. Delay Utility (backend async sleep)
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
// Usage: await delay(1000);
