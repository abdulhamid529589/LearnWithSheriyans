// // 1. Rock-Paper-Scissors Game (Console)
function RockPaperScissors() {
  const choices = ["rock", "paper", "scissors"];
  const user = prompt("Rock, Paper, or Scissors?").toLowerCase();
  const computer = choices[Math.floor(Math.random() * 3)];

  if (!choices.includes(user)) {
    alert("Invalid Choice!");
    return;
  }

  alert(`Computer chose: ${computer}`);

  switch (true) {
    case user === computer:
      alert("It's a tie!");
      break;
    case (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock"):
      alert("You win!");
      break;
    default:
      alert("You lose!");
  }
}
// RockPaperScissors();

// 2. Number Guessing Game
function playSmartGuessingGame() {
  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const history = [];

  alert(
    "🎯 Welcome to the Smart Guessing Game!\nGuess a number between 1 and 100."
  );

  while (true) {
    const input = prompt("Enter your guess (1–100):");

    // ❌ Cancel pressed
    if (input === null) {
      alert("Game cancelled. 👋");
      break;
    }

    const guess = Number(input);

    // ⚠️ Input validation
    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert("⚠️ Please enter a valid number between 1 and 100.");
      continue;
    }

    attempts++;
    history.push(guess);

    const difference = Math.abs(target - guess);

    // 💡 Provide hint based on distance
    let hint = "";
    if (difference === 0) {
      hint = "🎉 Perfect guess!";
    } else if (difference <= 5) {
      hint = "🔥 Very close!";
    } else if (difference <= 10) {
      hint = "😊 Close!";
    } else if (difference <= 20) {
      hint = "🙂 Not too far!";
    } else {
      hint = "🥶 Way off!";
    }

    // 🧠 Compare guess with target
    if (guess > target) {
      alert(`📈 Too high! ${hint}`);
    } else if (guess < target) {
      alert(`📉 Too low! ${hint}`);
    } else {
      alert(
        `🎉 Correct! The number was ${target}.\nIt took you ${attempts} attempts.`
      );
      alert(`📜 Your guesses: ${history.join(", ")}`);
      break;
    }
  }
}

// ▶ Start the game
// playSmartGuessingGame();

// 3. Simple Calculator
function advancedCalculator() {
  alert("🧮 Welcome to the Advanced Calculator!");

  const first = parseFloat(prompt("Enter the first number:"));
  const operator = prompt(
    "Enter an operator:\n+  ➕ Addition\n-  ➖ Subtraction\n*  ✖️ Multiplication\n/  ➗ Division\n%  Modulus (remainder)\n^  Power (exponent)\nsqrt  🧠 Square Root\n"
  ).trim();
  let second = null;
  let result;

  // ✅ Validate first number
  if (isNaN(first)) {
    alert("⚠️ Invalid first number!");
    return;
  }

  // 🧮 Handle square root (unary operation)
  if (operator === "sqrt") {
    result = Math.sqrt(first);
    alert(`✅ √${first} = ${result}`);
    return;
  }

  // For all binary operations (need two numbers)
  second = parseFloat(prompt("Enter the second number:"));
  if (isNaN(second)) {
    alert("⚠️ Invalid second number!");
    return;
  }

  // 🧠 Perform calculation
  switch (operator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "/":
      result =
        second !== 0 ? first / second : "❌ Division by zero is not allowed!";
      break;
    case "%":
      result = first % second;
      break;
    case "^":
      result = Math.pow(first, second);
      break;
    default:
      alert("⚠️ Invalid operator!");
      return;
  }

  // 🧾 Show formatted result
  alert(`✅ Result: ${first} ${operator} ${second} = ${result}`);
}

// advancedCalculator();

// 4. To-Do List in Console (Array Only)
function todoList() {
  // ✅ Load saved tasks or start fresh
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let choice;

  // 🧠 Helper: Save to localStorage
  function saveTasks() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // 🧠 Helper: Show all tasks
  function viewTasks(filter = "") {
    if (todos.length === 0) {
      alert("📭 No tasks yet!");
      return;
    }

    const filtered = todos.filter((t) =>
      t.text.toLowerCase().includes(filter.toLowerCase())
    );

    const list = filtered
      .map((t, i) => `${i + 1}. ${t.text} ${t.done ? "✅" : "❌"}`)
      .join("\n");

    const total = todos.length;
    const doneCount = todos.filter((t) => t.done).length;

    alert(
      `🧾 Your Tasks:\n\n${list}\n\n✅ Done: ${doneCount} | 📋 Total: ${total}`
    );
  }

  // 🔁 Main Menu Loop
  do {
    choice = prompt(
      "To-Do List Menu:\n" +
        "1️⃣ Add Task\n" +
        "2️⃣ View Tasks\n" +
        "3️⃣ Delete Task\n" +
        "4️⃣ Edit Task\n" +
        "5️⃣ Mark Done/Undone\n" +
        "6️⃣ Search Task\n" +
        "7️⃣ Exit\n\n" +
        "Enter your choice (1-7):"
    );

    switch (choice) {
      // ➕ Add Task
      case "1": {
        const text = prompt("Enter new task:");
        if (text && text.trim() !== "") {
          todos.push({ text: text.trim(), done: false });
          saveTasks();
          alert("✅ Task added successfully!");
        } else {
          alert("⚠️ Task cannot be empty.");
        }
        break;
      }

      // 👀 View All Tasks
      case "2":
        viewTasks();
        break;

      // 🗑️ Delete Task
      case "3": {
        if (todos.length === 0) {
          alert("⚠️ No tasks to delete!");
          break;
        }
        viewTasks();
        const del = parseInt(prompt("Enter task number to delete:"));
        if (Number.isNaN(del) || del < 1 || del > todos.length) {
          alert("❌ Invalid task number.");
        } else {
          const removed = todos.splice(del - 1, 1);
          saveTasks();
          alert(`🗑️ Deleted: "${removed[0].text}"`);
        }
        break;
      }

      // ✏️ Edit Task
      case "4": {
        if (todos.length === 0) {
          alert("⚠️ No tasks to edit!");
          break;
        }
        viewTasks();
        const idx = parseInt(prompt("Enter task number to edit:"));
        if (Number.isNaN(idx) || idx < 1 || idx > todos.length) {
          alert("❌ Invalid task number.");
          break;
        }
        const newText = prompt("Enter new text:", todos[idx - 1].text);
        if (newText && newText.trim() !== "") {
          todos[idx - 1].text = newText.trim();
          saveTasks();
          alert("✏️ Task updated successfully!");
        } else {
          alert("⚠️ Task cannot be empty.");
        }
        break;
      }

      // ✅ Toggle Done / Undone
      case "5": {
        if (todos.length === 0) {
          alert("⚠️ No tasks to mark!");
          break;
        }
        viewTasks();
        const num = parseInt(prompt("Enter task number to mark done/undone:"));
        if (Number.isNaN(num) || num < 1 || num > todos.length) {
          alert("❌ Invalid task number.");
        } else {
          todos[num - 1].done = !todos[num - 1].done;
          saveTasks();
          alert(
            todos[num - 1].done
              ? "✅ Marked as Done!"
              : "❌ Marked as Not Done!"
          );
        }
        break;
      }

      // 🔍 Search Tasks
      case "6": {
        const keyword = prompt("Enter keyword to search:");
        if (keyword && keyword.trim() !== "") {
          viewTasks(keyword.trim());
        } else {
          alert("⚠️ Please enter a search term.");
        }
        break;
      }

      // 🚪 Exit
      case "7":
        alert("👋 Goodbye! Have a productive day!");
        break;

      default:
        alert("⚠️ Invalid choice. Please select between 1-7.");
    }
  } while (choice !== "7");
}

//   todoList();
