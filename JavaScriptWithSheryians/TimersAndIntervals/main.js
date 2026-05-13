/*
    Timers and Intervals in JavaScript - Deep Dive with Real Project Example
    -----------------------------------------------------------------------

    JavaScript provides two powerful browser/Web APIs for scheduling code to run at a specific time or repeatedly:
      - setTimeout(fn, delay)
      - setInterval(fn, delay)
    ...and their corresponding "clear" functions.

    Use Cases:
    ----------
      - Delaying actions (e.g., show popup after X seconds)
      - Polling servers for updates in the background
      - Animations and countdowns
      - Auto-saving drafts periodically
      - Debounce user input events
*/

// ---- Basics ----

// Run something ONCE after a delay:
setTimeout(() => {
  console.log("2 seconds passed!");
}, 2000); // 2 seconds

let clear = setTimeout(() => {
  console.log("2 seconds passed!");
}, 2000); // 2 seconds
clearTimeout(clear);

// Run something REPEATEDLY at given interval:
const intervalId = setInterval(() => {
  console.log("Tick! (Every second)");
}, 1000);

// Later, stop the interval:
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Stopped ticking!");
}, 5500);

// ----- Real World Example Project: Countdown Timer App -----
// Let's build a simple countdown timer for a quiz app or sales offer.
// User sets seconds, hits "Start", and sees a live countdown. At 0: show message and sound alarm.

const timerDisplay = document.createElement("div");
timerDisplay.style.fontSize = "2em";
timerDisplay.style.margin = "20px 0";
timerDisplay.id = "timerDisplay";

const input = document.createElement("input");
input.type = "number";
input.placeholder = "Enter seconds";
input.min = "1";
input.style.marginRight = "10px";

const startBtn = document.createElement("button");
startBtn.textContent = "Start Countdown";

const stopBtn = document.createElement("button");
stopBtn.textContent = "Stop";
stopBtn.style.marginLeft = "10px";

document.body.appendChild(timerDisplay);
document.body.appendChild(input);
document.body.appendChild(startBtn);
document.body.appendChild(stopBtn);

let countdownInterval = null;
let remaining = 0;

function updateDisplay() {
  timerDisplay.textContent =
    remaining > 0 ? `Time left: ${remaining} sec` : "⏰ Time's up!";
}

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  remaining = parseInt(input.value, 10);
  if (isNaN(remaining) || remaining <= 0) {
    alert("Please enter a positive number");
    return;
  }
  updateDisplay();

  countdownInterval = setInterval(() => {
    remaining--;
    updateDisplay();
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      // Play 'ding' - using alert for demo (or you could play Audio)
      alert("Time's up!");
    }
  }, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  timerDisplay.textContent = "Countdown stopped.";
}

startBtn.addEventListener("click", startCountdown);
stopBtn.addEventListener("click", stopCountdown);

// ----- Further Explanation & Best Practices -----
// 1. setTimeout vs setInterval
//    - use setTimeout for one-off delays (recursive setTimeout for precise repeated tasks)
//    - use setInterval for simple repetitive jobs

// 2. Cancel timers:
//    - Always clearInterval() or clearTimeout() when no longer needed, for memory and logic safety

// 3. Beware of "delay drift":
//    - setInterval can drift in long/frequent runs due to code execution time, use recursive setTimeout for precision

// 4. Common Patterns: Debouncing user input
let debounceTimer;
input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    timerDisplay.textContent = `You've paused typing at: ${input.value}s`;
  }, 800); // waits for 800ms pause in typing
});

/*
    Summary:
    --------
    - Use setTimeout for scheduled, one-time events.
    - Use setInterval (or recursive setTimeout) for repeating actions.
    - Always clear intervals/timeouts you started!
    - Example covered: live countdown timer, debounce input, canceling intervals.
    - These are foundational for games, live dashboards, notifications, and much more in web development.
*/

// --- Example 1: setTimeout for Delayed Execution ---
// Let's say you want to display a message 2 seconds after a button is clicked:

const delayBtn = document.createElement("button");
delayBtn.textContent = "Say Hello in 2 seconds";
document.body.appendChild(delayBtn);

delayBtn.addEventListener("click", () => {
  timerDisplay.textContent = "Waiting...";
  setTimeout(() => {
    timerDisplay.textContent = "Hello after 2 seconds!";
  }, 2000); // 2000 ms = 2 seconds
});

/*
  Explanation:
  - setTimeout schedules a one-off task after a specific delay.
  - Here, after clicking, you get "Waiting...", then "Hello after 2 seconds!" appears after 2s.
*/

// --- Example 2: Polling with setInterval and stopping with clearInterval ---
// Imagine polling for data every second, but you want to stop after 5 tries.

const pollBtn = document.createElement("button");
pollBtn.textContent = "Poll 5 times";
document.body.appendChild(pollBtn);

pollBtn.addEventListener("click", () => {
  let count = 0;
  timerDisplay.textContent = "";
  const poller = setInterval(() => {
    count++;
    timerDisplay.textContent = `Polling server... attempt ${count}`;
    // Here you could put fetch() or AJAX logic.
    if (count === 5) {
      clearInterval(poller);
      timerDisplay.textContent = "Polling stopped after 5 tries.";
    }
  }, 1000);
});

/*
  Explanation:
  - setInterval runs a function repeatedly every N ms.
  - We keep a counter to know when to stop (after 5 times), then clearInterval() stops it.
  - This is useful for polling or repeating checks on a schedule.
*/

// --- Example 3: Basic Throttle (limit a function firing rate) ---
// Useful when you want to limit events like window resizing or scrolling.

let lastCall = 0;
window.addEventListener("resize", () => {
  const now = Date.now();
  if (now - lastCall > 500) {
    lastCall = now;
    timerDisplay.textContent = `Window resized at ${new Date().toLocaleTimeString()}`;
  }
});

/*
  Explanation:
  - Throttling makes sure a function only runs at most once every X ms, even if events trigger rapidly.
  - This example updates display with the current time if the window is resized, but no more than every 500ms.
  - Good for performance when handling expensive operations (like layout or AJAX) on window events.
*/

// --- Example 4: Recursive setTimeout for precise intervals (less drift) ---
// For periodic tasks where timing accuracy matters more than with setInterval.

const preciseBtn = document.createElement("button");
preciseBtn.textContent = "Start precise ticks";
document.body.appendChild(preciseBtn);

let running = false;
preciseBtn.addEventListener("click", () => {
  if (running) return; // Avoid double start
  running = true;
  let ticks = 0;
  function tick() {
    if (!running) return;
    ticks++;
    timerDisplay.textContent = `Precise tick: ${ticks}`;
    if (ticks === 5) {
      running = false;
      timerDisplay.textContent = "Finished 5 precise ticks.";
      return;
    }
    setTimeout(tick, 1000); // Schedule for next second
  }
  tick();
});
// Button to stop precise ticking early
const stopPreciseBtn = document.createElement("button");
stopPreciseBtn.textContent = "Stop Precise Tick";
document.body.appendChild(stopPreciseBtn);
stopPreciseBtn.addEventListener("click", () => {
  running = false;
});

/*
  Explanation:
  - By using setTimeout recursively (calling itself after each run), you avoid time drift caused by setInterval.
  - Each "tick" runs only after the previous has completed, so it's more precise for workloads that may take time.
  - Press "Start precise ticks" — you get 5 ticks, 1 second apart. You can stop early using "Stop Precise Tick".
*/

// --- Example 5: Animation using setInterval ---
// Animate a simple box moving across the screen.

const box = document.createElement("div");
box.style.width = "50px";
box.style.height = "50px";
box.style.background = "#4ab";
box.style.position = "absolute";
box.style.top = "240px";
box.style.left = "0px";
box.style.borderRadius = "8px";
box.style.transition = "background .20s";
document.body.appendChild(box);

const animateBtn = document.createElement("button");
animateBtn.textContent = "Animate Box";
document.body.appendChild(animateBtn);

let boxAnimation;
animateBtn.addEventListener("click", () => {
  clearInterval(boxAnimation);
  let pos = 0;
  box.style.left = "0px";
  boxAnimation = setInterval(() => {
    pos += 5;
    box.style.left = `${pos}px`;
    box.style.background = pos % 30 < 15 ? "#4ab" : "#4fa";
    if (pos >= 400) {
      clearInterval(boxAnimation);
      box.style.background = "#4ab";
    }
  }, 20); // every 20ms, for a smooth animation
});

/*
  Explanation:
  - We move the box by increasing its 'left' CSS property every 20ms.
  - When the box reaches a certain position, the animation stops.
  - This pattern is the basis for manual animations, but in production, use requestAnimationFrame for smoother animation!
*/
