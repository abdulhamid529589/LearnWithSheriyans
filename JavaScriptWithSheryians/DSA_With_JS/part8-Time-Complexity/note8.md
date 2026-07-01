# 📘 DSA Series — Lecture 08

# ⏱️ Time & Space Complexity — Complete Notes

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 08 — Time & Space Complexity

---

## 📌 Table of Contents

1. [What is Complexity?](#1-what-is-complexity)
2. [What is Time Complexity?](#2-what-is-time-complexity)
3. [Key Rule — Always Consider Worst Case](#3-key-rule--always-consider-worst-case)
4. [Time Complexity is for Large Inputs Only](#4-time-complexity-is-for-large-inputs-only)
5. [Complexity Representations — Notations](#5-complexity-representations--notations)
6. [Types of Time Complexity — In Detail](#6-types-of-time-complexity--in-detail)
7. [Complexity Graph — Visual Order](#7-complexity-graph--visual-order)
8. [Generating Time Complexity from Code](#8-generating-time-complexity-from-code)
9. [TLE — Time Limit Exceeded](#9-tle--time-limit-exceeded)
10. [Space Complexity — In Detail](#10-space-complexity--in-detail)
11. [Practice Questions with Detailed Solutions](#11-practice-questions-with-detailed-solutions)
12. [Complete Cheat Sheet](#12-complete-cheat-sheet)
13. [How to Practice Going Forward](#13-how-to-practice-going-forward)

---

## 1. What is Complexity?

Before diving into Time or Space Complexity, we need to understand what **Complexity** itself means.

### 🔑 Definition

> **Complexity** = Measuring or expressing **how difficult / complicated a task is**.
> It is the **level of a task** — easy, medium, hard, very hard.

### 🎯 Real-Life Examples

| Task                              | Complexity Level |
| --------------------------------- | ---------------- |
| Solving a Sudoku puzzle           | Easy / Medium    |
| Solving a Rubik's Cube            | Hard             |
| Impressing a single person        | Maybe Easy       |
| Impressing a girlfriend/boyfriend | Hard 😄          |
| Making a single sandwich          | Easy             |
| Making a 5-course meal            | Hard             |

### 💻 Programming Examples

| Task                                                           | Complexity |
| -------------------------------------------------------------- | ---------- |
| Find factors of a number N (e.g., factors of 10 = 1, 2, 5, 10) | Medium     |
| Find all prime numbers from 1 to N                             | Harder     |

So whenever you **measure or represent the difficulty level** of any task, that behavior is called **Complexity**.

---

## 2. What is Time Complexity?

### ❌ The Biggest Myth — BUST IT FIRST

> **Time Complexity has absolutely NOTHING to do with actual time (seconds, milliseconds).**

Many people and even some instructors get this wrong. Let's understand why.

### 🖥️ The Supercomputer vs 4GB Laptop Example

Imagine two people:

- **Person A** — Rich kid with a **Supercomputer**
- **Person B** — Normal person with a **4GB RAM laptop**

Both are given the same task:

> _Find the sum of numbers from 1 to N._

Both write the **exact same logic:**

```js
let sum = 0
for (let i = 1; i <= n; i++) {
  sum += i
}
```

**Results:**

- Supercomputer finishes in `0.0001 ms`
- 4GB laptop finishes in `2 seconds`

**Question:** Did Person A write a better algorithm than Person B?

**Answer: NO!** They wrote the **exact same algorithm**. The difference in speed is because of **hardware**, not the algorithm.

So if Time Complexity measured actual time in seconds, the same algorithm would have different complexity on different machines — which makes NO sense.

### ✅ The Real Definition

```
Time Complexity = Amount of operations taken, as a function of input size N
```

Let's break this down:

| Part                              | Meaning                                           |
| --------------------------------- | ------------------------------------------------- |
| **Amount of operations taken**    | How many steps/operations your code performs      |
| **As a function of input size N** | How those operations grow as N (input size) grows |

### 🔢 What is an "Operation"?

An operation is any single executable step:

- `a + b` → 1 operation
- One loop iteration → 1 operation
- Comparing two values → 1 operation
- Accessing an array index → 1 operation

### 📈 How Operations Grow with N — Linear Search Example

Suppose you have an array and want to search for an element (Linear Search):

```
Array: [10, 3, 78, 7, 18, ...]   →   Search for last element (worst case)
```

| Array Length (N) | Operations Needed (Worst Case) |
| ---------------- | ------------------------------ |
| 100              | 100                            |
| 500              | 500                            |
| 2000             | 2000                           |
| 10,000           | 10,000                         |

**Observation:** As N grows, operations grow proportionally.
**This behavior of operations growing with input size → That is Time Complexity.**

---

## 3. Key Rule — Always Consider Worst Case

### 🎯 Why Worst Case?

We always analyze Time Complexity considering the **worst case scenario** — the absolute maximum operations your algorithm can take.

**Why not best case or average case?**

- Best case is too optimistic (lucky scenario)
- Average case is complex to calculate
- Worst case gives you a **guarantee** — "my algorithm will NEVER be slower than this"

### Linear Search Example

```
Array: [10, 3, 78, 7, 18, 55, 42]
Target: Find 42
```

| Case           | Where element is found  | Operations           |
| -------------- | ----------------------- | -------------------- |
| Best Case      | Index 0 (first)         | 1                    |
| Average Case   | Somewhere in the middle | N/2                  |
| **Worst Case** | Index N-1 (last)        | **N** ✅ We use this |

> ✅ **Rule:** Always assume the element is at the **last position**.
> Always assume the task takes the **maximum possible steps**.

---

## 4. Time Complexity is for Large Inputs Only

### 📦 The Company Analogy

| Company Size        | What you need                        |
| ------------------- | ------------------------------------ |
| 1 employee          | Remember in your head                |
| 10 employees        | Write in a notebook                  |
| 1000 employees      | Need a proper software system        |
| Billions of records | Need optimized database + algorithms |

When N is small (like 5 or 10), **any algorithm works** — even slow ones. The difference is negligible.

When N is **large** (thousands, millions, billions), a bad algorithm can take **hours or crash entirely**, while a good algorithm finishes in **milliseconds**.

> 💡 **Takeaway:** Time Complexity only matters when dealing with **large input sizes**. For small inputs, even O(N²) or O(N³) is fine.

---

## 5. Complexity Representations — Notations

Just like we represent:

- Weight in **kilograms (kg)**
- Distance in **kilometers (km)**
- Liquid in **liters (L)**

We represent **Time Complexity** using mathematical notations.

### The 3 Notations

| Symbol | Name  | Represents            | Scenario                     |
| ------ | ----- | --------------------- | ---------------------------- |
| **O**  | Big O | Upper Bound           | **Worst Case** ← We use this |
| **Θ**  | Theta | Tight / Average Bound | Average Case                 |
| **Ω**  | Omega | Lower Bound           | Best Case                    |

### Detailed Explanation

#### O — Big O (Upper Bound / Worst Case)

> "My algorithm will take **AT MOST** this many operations."

Example: "Travelling from point A to B takes **at most 10 minutes**."

- Could be less (5 min, 7 min), but **never more than 10**.
- This is a **guarantee of the maximum**.

#### Θ — Theta (Average Case)

> "My algorithm takes **around** this many operations on average."

Example: "Travelling from A to B usually takes **6-7 minutes**."

#### Ω — Omega (Lower Bound / Best Case)

> "My algorithm will take **AT LEAST** this many operations."

Example: "Travelling from A to B takes **at minimum 10 minutes**."

- Could be more (30 min, 1 hour), but never less than 10.

### Why We Only Use Big O

- Interviews, competitive programming, LeetCode → **always Big O**
- We always care about **worst case** behavior
- Omega (best case) is too optimistic — tells us nothing about how bad it can get
- Theta (average) is harder to calculate and less commonly needed
- Big O gives the **safety guarantee** — worst case upper bound

> ✅ **Remember:** Throughout this entire DSA journey, whenever someone says "what is the time complexity?", they mean **Big O — Worst Case**.

---

## 6. Types of Time Complexity — In Detail

Here are all the major types, from **best (fastest)** to **worst (slowest)**:

---

### 🟢 Type 1: O(1) — Constant Time Complexity

**What it means:** The task completes in a **fixed, constant number of steps**, regardless of input size N.

**Two scenarios where O(1) applies:**

#### Scenario A — Task done in literally one step

```js
// Sum of N numbers using formula — ONE operation regardless of N
function sumOfN(n) {
  return (n * (n + 1)) / 2 // just one calculation
}
```

vs.

```js
// Loop approach — N operations (NOT O(1))
function sumOfN(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i // runs N times
  }
  return sum
}
```

The formula version is O(1). The loop version is O(N).

#### Scenario B — N is a fixed, exact, constant value

```js
// Question says: "N is always exactly 40"
for (let i = 0; i < n; i++) {
  // n = 40 (fixed)
  console.log(i)
}
// This runs EXACTLY 40 times always → O(1)
```

**Why is this O(1)?**

- If N = 40 always, then 40 operations always. That's constant.
- The algorithm doesn't "grow" with anything — N is fixed.

**What is NOT O(1):**

```js
// N is dynamic — could be 20, 50, 100, 500...
// The problem says: "Given N, find..."
for (let i = 0; i < n; i++) {
  // n is unknown/dynamic
  console.log(i)
}
// This is O(N) — grows with N
```

**Key Insight:**

- N = fixed constant → O(1)
- N = dynamic / unknown → could be O(N), O(N²), etc.

**Real examples of O(1):**

- Accessing an array element: `arr[5]`
- Getting array length: `arr.length`
- Push/pop from a stack
- Math formula calculations

---

### 🟡 Type 2: O(N) — Linear Time Complexity

**What it means:** Operations grow **linearly** with N. If N doubles, operations double.

**Pattern:** A single loop running from 1 to N where N is **not fixed (dynamic)**.

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // runs N times
    if (arr[i] === target) return i
  }
  return -1
}
// Worst case: target is at last index → N operations → O(N)
```

```js
// Sum of N numbers using loop
function sumOfN(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    // runs N times
    sum += i
  }
  return sum
}
// O(N)
```

**Visual growth:**

| N         | Operations |
| --------- | ---------- |
| 10        | 10         |
| 100       | 100        |
| 1,000     | 1,000      |
| 1,000,000 | 1,000,000  |

**Real examples of O(N):**

- Linear Search
- Traversing an array once
- Finding max/min in unsorted array
- Printing all elements

---

### 🟠 Type 3: O(N²) — Quadratic Time Complexity

**What it means:** Operations grow as the **square of N**. If N doubles, operations quadruple.

**Pattern:** Two **nested** loops, each running up to N.

```js
// Two nested loops — classic O(N²)
for (let i = 0; i < n; i++) {
  // outer: runs N times
  for (let j = 0; j < n; j++) {
    // inner: runs N times FOR EACH i
    console.log(i, j)
  }
}
// Total: N × N = N² operations
```

**Why multiply for nested loops?**

- For each value of `i` (N values), the inner loop runs N times.
- i=0: inner runs N times
- i=1: inner runs N times
- i=2: inner runs N times
- ...
- i=N-1: inner runs N times
- **Total = N + N + N + ... (N times) = N × N = N²**

**Three nested loops → O(N³):**

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      console.log(i, j, k)
    }
  }
}
// N × N × N = N³ → O(N³)
```

**Real-world example — Strong Number:**

```
Strong Number check for 145:
- Separate digits: 1, 4, 5  → outer loop runs (number of digits) times
- For each digit, calculate factorial → inner loop runs (digit value) times
- Nested loops → O(N²)
```

**Real examples of O(N²):**

- Bubble Sort
- Selection Sort
- Insertion Sort
- Printing all patterns (star patterns, number patterns)
- Checking all pairs in an array

**Visual growth:**

| N      | N² Operations  |
| ------ | -------------- |
| 10     | 100            |
| 100    | 10,000         |
| 1,000  | 1,000,000      |
| 10,000 | 100,000,000 😱 |

---

### 🔵 Type 4: O(log N) — Logarithmic Time Complexity

**What it means:** Operations grow very slowly as N grows. Even for very large N, the number of operations is tiny.

**Pattern:** Input size **reduces drastically** (usually halves) after each operation.

```
N = 500:
Step 1: N = 500
Step 2: N = 250   (halved)
Step 3: N = 125   (halved)
Step 4: N = 62    (halved)
Step 5: N = 31    (halved)
Step 6: N = 15    (halved)
Step 7: N = 7     (halved)
Step 8: N = 3     (halved)
Step 9: N = 1     (halved)

N = 500 → Only 9 operations! Compare with O(N) which would be 500 operations.
```

**The key pattern:** N doesn't need to reduce to exactly half. It just needs to reduce **drastically** each step.

```js
// Example: i halves each iteration
function logExample(n) {
  let i = n
  while (i > 1) {
    console.log(i)
    i = Math.floor(i / 2) // i halves → drastically reduces
  }
}
// Runs: log₂(N) times → O(log N)
```

**Binary Search — Classic O(log N) Example:**
Binary Search searches a sorted array by always checking the middle element and eliminating half the array each step.

```
Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]   N = 10
Search: 17

Step 1: Check middle (index 4) → 9.  17 > 9 → look right half → [11, 13, 15, 17, 19]
Step 2: Check middle (index 7) → 15. 17 > 15 → look right half → [17, 19]
Step 3: Check middle (index 8) → 17. FOUND! ✅

3 steps for N = 10 (vs 10 steps for Linear Search)
```

**Why log N?**

- After each step, remaining elements = N/2, N/4, N/8...
- How many times can you divide N by 2 until you get 1? → log₂(N) times
- That's where log N comes from

**Visual growth:**

| N             | log₂(N) Operations |
| ------------- | ------------------ |
| 8             | 3                  |
| 64            | 6                  |
| 1,024         | 10                 |
| 1,000,000     | 20                 |
| 1,000,000,000 | 30                 |

> 💡 **O(log N) is extremely powerful.** For 1 billion elements, only ~30 operations!

**Real examples of O(log N):**

- Binary Search
- Finding element in a BST (balanced)
- Divide and conquer (dividing step)

---

### 🟣 Type 5: O(N log N) — Linearithmic Time Complexity

**What it means:** A combination of linear and logarithmic — slightly worse than O(N) but much better than O(N²).

**Pattern:** A loop running N times, and **inside** that loop, a log N operation is performed.

```js
// Outer loop: O(N)
for (let i = 0; i < n; i++) {
  binarySearch(sortedArr, target) // inner: O(log N)
}
// Total: N × log N = O(N log N)
```

**Another way to think:**

- Outer loop: N iterations
- Each iteration calls Binary Search: log N steps
- Together: N × log N

**Real examples of O(N log N):**

- Merge Sort
- Heap Sort
- Quick Sort (average case)

**Visual growth:**

| N         | N log N Operations |
| --------- | ------------------ |
| 10        | ~33                |
| 100       | ~664               |
| 1,000     | ~9,966             |
| 1,000,000 | ~19,931,568        |

---

### 🔴 Type 6: O(2^N) — Exponential Time Complexity

**What it means:** Operations double with every increase in N. Grows **extremely fast**.

**Pattern:** Usually seen in recursive solutions that branch into 2 recursive calls.

```
N = 5:  2⁵ = 32 operations
N = 10: 2¹⁰ = 1,024 operations
N = 20: 2²⁰ = 1,048,576 operations (1 million!)
N = 30: 2³⁰ = 1,073,741,824 operations (1 billion!)
```

**Example — Generating all subsets (Power Set):**

```
Array: [1, 2, 3]   N = 3
All subsets: [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]
Total = 2³ = 8 subsets → O(2^N)
```

**When does O(2^N) appear?**

- Generating all subsets of an array
- Recursive Fibonacci (naive implementation)
- Some dynamic programming problems (before optimization)

> ⚠️ **Warning:** O(2^N) is practical only for very small N (≤ 20-25). For N = 50, it's impossible.

---

### ⚫ Type 7: O(N!) — Factorial Time Complexity

**What it means:** The absolute slowest. Operations grow as the factorial of N.

```
N = 5:  5! = 120 operations
N = 10: 10! = 3,628,800 operations (3.6 million!)
N = 15: 15! = 1,307,674,368,000 operations (1.3 trillion!)
```

**Example — Generating all permutations:**

```
Array: [1, 2, 3]
All permutations: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
Total = 3! = 6 → O(N!)
```

**When does O(N!) appear?**

- Generating all permutations
- Brute-force solutions for NP-hard problems (Travelling Salesman, etc.)

> ⚠️ **Warning:** O(N!) is only feasible for N ≤ 10-12. Beyond that, completely impractical.

---

## 7. Complexity Graph — Visual Order

**From BEST (fewest operations) → WORST (most operations):**

```
O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(N³) < O(2^N) < O(N!)
```

```
Operations
    ↑
    |                                                        O(N!)
    |
    |                                              O(2^N)
    |
    |                                    O(N³)
    |
    |                          O(N²)
    |
    |                   O(N log N)
    |
    |            O(N)
    |
    |      O(log N)
    |
    |  O(1) ─────────────────────────────────────────────
    |
    └─────────────────────────────────────────────────────→
                              Input Size N
```

**What the graph tells us:**

- O(1) is a flat horizontal line — doesn't grow at all
- O(log N) grows very slowly — almost flat
- O(N) is a straight diagonal line — grows linearly
- O(N log N) is slightly above O(N) — slightly curved
- O(N²) curves upward sharply
- O(2^N) and O(N!) shoot up almost vertically — catastrophic for large N

---

## 8. Generating Time Complexity from Code

This is the **most important skill** for interviews — looking at code and determining its Time Complexity.

### Rule 1: Single Loop → O(N)

```js
for (let i = 0; i < n; i++) {
  // any constant work here
}
// O(N)
```

```js
// Even if loop variable changes differently, count the iterations
for (let i = 0; i < n; i += 2) {
  // runs N/2 times → N/2 → drop constant → O(N)
}
```

---

### Rule 2: Parallel (Sequential) Loops → ADD, then simplify

```js
for (let i = 0; i < n; i++) {} // N operations
for (let j = 0; j < n; j++) {} // N operations
for (let k = 0; k < n; k++) {} // N operations

// Total: N + N + N = 3N
// Drop constant: O(N)
```

```js
for (let i = 0; i < n; i++) {} // N
for (let j = 0; j < n * n; j++) {} // N²

// Total: N + N² → Keep highest degree → O(N²)
```

---

### Rule 3: Nested Loops → MULTIPLY

```js
for (let i = 0; i < n; i++) {
  // N
  for (let j = 0; j < n; j++) {
    // N (for each i)
    // work
  }
}
// N × N = O(N²)
```

```js
for (let i = 0; i < n; i++) {
  // N
  for (let j = 0; j < m; j++) {
    // M (different variable!)
    // work
  }
}
// N × M = O(N × M) — two different variables, can't simplify further
```

---

### Rule 4: Nested + Parallel Together

```js
// Nested part
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // This block: O(N²)
    // work
  }
}

// Parallel part
for (let k = 0; k < n; k++) {
  // This block: O(N)
  // work
}

// Total: N² + N → Keep highest degree → O(N²)
```

---

### Rule 5: Drop Constants Always

| Raw Expression | After Dropping Constants | Final |
| -------------- | ------------------------ | ----- |
| `5N`           | `N`                      | O(N)  |
| `3N²`          | `N²`                     | O(N²) |
| `N²/2`         | `N²`                     | O(N²) |
| `100`          | `1`                      | O(1)  |
| `7N + 3`       | `N`                      | O(N)  |

---

### Rule 6: Drop Lower Degree Terms

| Raw Expression | Keep Highest | Final      |
| -------------- | ------------ | ---------- |
| `N² + N`       | `N²`         | O(N²)      |
| `N³ + N² + N`  | `N³`         | O(N³)      |
| `N log N + N`  | `N log N`    | O(N log N) |
| `2^N + N²`     | `2^N`        | O(2^N)     |

---

### Rule 7: Equation Simplification Practice

```
Given: 3N²/2 + N log N + N
Step 1: Drop lower terms (N log N and N are smaller than N²)
Step 2: Keep: 3N²/2
Step 3: Drop constant (3/2): N²
Answer: O(N²)
```

```
Given: N log N + log N + N
Step 1: Compare: N log N > N > log N
Step 2: Keep highest: N log N
Answer: O(N log N)
```

---

### Rule 8: The Special Case — Inner Loop starts from i (not 0)

```js
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    // j starts from i, not 0!
    console.log(i, j)
  }
}
```

**How many iterations does the inner loop do?**

- When i = 0: inner runs N times
- When i = 1: inner runs N-1 times
- When i = 2: inner runs N-2 times
- ...
- When i = N-1: inner runs 1 time

**Total = N + (N-1) + (N-2) + ... + 1**

This is the **sum of first N natural numbers** = N(N-1)/2

```
N(N-1)/2 = N²/2 - N/2
→ Drop lower term (N/2): N²/2
→ Drop constant (1/2): N²
→ O(N²)
```

> ✅ **Even when inner loop starts from `i`, the Time Complexity is still O(N²).**
> You commonly see this in **pattern programs**.

---

### Rule 9: Logarithmic Loop

```js
// i halves each time
let i = n
while (i > 1) {
  // work
  i = Math.floor(i / 2)
}
// O(log N)
```

```js
// i doubles each time — also O(log N)
for (let i = 1; i < n; i *= 2) {
  // work
}
// runs log₂(N) times → O(log N)
```

---

## 9. TLE — Time Limit Exceeded

### What is TLE?

When you submit code on LeetCode / HackerRank / Codeforces and get:

```
Time Limit Exceeded ❌
```

It means your algorithm is **too slow** for the given input size. The platform allows a maximum time (usually 1-2 seconds), and your code exceeded it.

### Why Does TLE Happen?

Every problem has a **Constraints** section that tells you the input size limits. Based on those constraints, there is a **maximum complexity** your algorithm should have. If you write something slower → TLE.

### How to Read Constraints

On LeetCode, every problem has something like:

```
Constraints:
- 1 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
```

The key value: **`nums.length <= 10^4`** → N can be up to 10,000.

This tells you: **You can use at most O(N²)** algorithm for this problem.

### 📊 The Master Constraint Table — Memorize This

| N (Input Size)        | Maximum Complexity Allowed | Why                               |
| --------------------- | -------------------------- | --------------------------------- |
| N ≤ 10 – 12           | **O(N!)**                  | Very small input, any algo works  |
| N ≤ 20 – 25           | **O(2^N)**                 | Still very small                  |
| N ≤ 100               | **O(N³)**                  | Small enough for cubic            |
| N ≤ 500 – 2000        | **O(N²)** or **O(N³)**     | Medium input                      |
| N ≤ 10⁴ (10,000)      | **O(N²)**                  | Common — bubble sort range        |
| N ≤ 10⁵ (100,000)     | **O(N log N)** or **O(N)** | Large input — sorting algos       |
| N ≤ 10⁶ (1,000,000)   | **O(N)** or **O(N log N)** | Very large input                  |
| N ≤ 10⁸ (100,000,000) | **O(N)** or **O(log N)**   | Huge input                        |
| N > 10⁸               | **O(log N)** or **O(1)**   | Extreme — only math/binary search |

### Simplified Mental Model

```
Constraint Says      →    Max Algorithm You Can Write
─────────────────────────────────────────────────────
N ≤ 10⁴             →    O(N²)     ← bubble sort ok
N ≤ 10⁵ or 10⁶      →    O(N)      ← linear scan ok
N ≤ 10⁸             →    O(log N)  ← binary search
N > 10⁸             →    O(1)      ← formula only
```

### The Core Principle

```
Bigger N   →   Need BETTER (faster) algorithm
Smaller N  →   Can use SLOWER algorithm
```

**Why?**

- Larger input = more data = more chances of TLE with slow algorithm
- Smaller input = fewer operations even with slow algorithm = no TLE

### Practical Example — Two Sum (LeetCode #1)

```
Constraints: 2 <= nums.length <= 10^4
```

- N ≤ 10⁴ → We can use **O(N²)** at most
- Brute force (two nested loops) = O(N²) → **Acceptable ✅**
- Hash map approach = O(N) → **Even better ✅**
- O(N³) approach → **TLE ❌**

### How to Approach a New Problem

```
Step 1: Read the constraints → Find N
Step 2: Look up the table → Find max allowed complexity
Step 3: Design your algorithm to stay within that complexity
Step 4: If your algorithm exceeds → think of a better approach
```

---

## 10. Space Complexity — In Detail

### What is Space Complexity?

> **Space Complexity** = The amount of **extra memory (space)** your algorithm uses, as a function of input size N.

Note: We're measuring **auxiliary space** — the extra memory you allocate, not counting the input itself.

### O(1) — Constant Space

Your algorithm uses a **fixed amount of extra memory**, regardless of N.

**Simple variables** (no matter how many) = O(1) space:

```js
// Even 1000 variables = O(1) space
let a = 1
let b = 2
let temp = 0
let count = 0
// These are a fixed number of variables, they don't grow with N
```

**Loop with reused variable = O(1) space:**

```js
for (let i = 0; i < n; i++) {
  let temp = arr[i] // temp is created and destroyed each iteration
  // At any moment, only ONE temp exists in memory
}
// Space Complexity: O(1) — only ONE variable exists at a time
```

**Why O(1)?** Even though the loop runs N times, at any point in time, only **one** `temp` variable exists. Memory is reused, not accumulated.

> 💡 **Key Insight:** It's not about how many times a variable is created; it's about how many exist **simultaneously** in memory.

---

### O(N) — Linear Space

A new data structure of size N is created:

```js
// Reversing an array using a new array
function reverse(arr) {
  let n = arr.length
  let reversed = new Array(n) // ← NEW array of size N allocated

  for (let i = 0; i < n; i++) {
    reversed[i] = arr[n - 1 - i]
  }

  return reversed
}
// Space Complexity: O(N) — created one array of size N
```

```js
// Storing results
function getDoubles(arr) {
  let result = [] // starts empty, grows to size N
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2) // pushes N elements
  }
  return result
}
// Space Complexity: O(N)
```

---

### O(N²) — Quadratic Space

A 2D array or matrix of size N×N is created:

```js
// Creating a 2D matrix
function create2DMatrix(n) {
  let matrix = []
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n)) // N arrays, each of size N
  }
  return matrix
}
// Space Complexity: O(N²) — N × N total elements stored
```

```js
// Array of arrays
let result = []
for (let i = 0; i < n; i++) {
  let inner = []
  for (let j = 0; j < n; j++) {
    inner.push(i * j)
  }
  result.push(inner) // storing N arrays each of size N
}
// Space Complexity: O(N²)
```

---

### Space Complexity Summary Table

| What You Create              | Example                  | Space Complexity |
| ---------------------------- | ------------------------ | ---------------- |
| Just variables (any count)   | `let a, b, temp;`        | **O(1)**         |
| One new array of size N      | `let res = new Array(n)` | **O(N)**         |
| N new arrays each of size N  | 2D matrix                | **O(N²)**        |
| Recursive calls (call stack) | Recursion depth N        | **O(N)**         |

---

### Time vs Space Trade-off

In real-world programming, there's often a trade-off:

```
Better Time Complexity  ←→  Worse Space Complexity
Worse Time Complexity   ←→  Better Space Complexity
```

Example:

- Reverse array **in-place** (swap elements) → O(N) time, **O(1) space**
- Reverse array **with new array** → O(N) time, **O(N) space**

Both are O(N) time, but different space. In-place is more memory efficient.

### Which Matters More?

> In interviews and competitive programming:
>
> - **Time Complexity is asked ~90% of the time**
> - **Space Complexity is asked ~10% of the time**
> - But knowing both is important — always mention both when analyzing your code

---

## 11. Practice Questions with Detailed Solutions

### Question 1

```js
function test(n) {
  for (let i = 0; i < n; i++) {
    console.log(i)
  }
}
```

**Analysis:**

- One loop, runs from 0 to N → **N iterations**
- No extra arrays or data structures created

**Time Complexity: O(N)**
**Space Complexity: O(1)**

---

### Question 2

```js
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      // j starts from i
      console.log(i, j)
    }
  }
}
```

**Analysis:**

- Inner loop runs: N, N-1, N-2, ..., 1 times (AP series)
- Sum = N(N+1)/2 ≈ N²/2 → drop constant → **N²**
- No extra arrays

**Time Complexity: O(N²)**
**Space Complexity: O(1)**

---

### Question 3

```js
function test(n) {
  let result = [] // new array!

  for (let i = 0; i < n; i++) {
    result.push(i * 2)
  }

  return result
}
```

**Analysis:**

- One loop → N iterations → O(N) time
- `result` array grows to size N → O(N) space

**Time Complexity: O(N)**
**Space Complexity: O(N)**

---

### Question 4

```js
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // j < i (not j < n)
      console.log(i, j)
    }
  }
}
```

**Analysis:**

- Inner loop runs: 0, 1, 2, ..., N-1 times
- Sum = 0 + 1 + 2 + ... + (N-1) = N(N-1)/2 ≈ N²/2 → **O(N²)**
- No extra arrays

**Time Complexity: O(N²)**
**Space Complexity: O(1)**

---

### Question 5

```js
function test(n) {
  let result = [] // new array!

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result.push(i * j) // pushes N² elements total
    }
  }

  return result
}
```

**Analysis:**

- Two nested loops → N × N = N² iterations → O(N²) time
- `result` array gets N² elements pushed → O(N²) space

**Time Complexity: O(N²)**
**Space Complexity: O(N²)**

---

### Question 6

```js
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        console.log(i, j, k)
      }
    }
  }
}
```

**Analysis:**

- Three nested loops → N × N × N = N³ iterations
- No extra arrays

**Time Complexity: O(N³)**
**Space Complexity: O(1)**

---

### Question 7

```js
function test(n) {
  let i = n
  while (i > 1) {
    console.log(i)
    i = Math.floor(i / 2) // i halves each time
  }
}
```

**Analysis:**

- i: N → N/2 → N/4 → ... → 1
- Number of steps = log₂(N) ← how many times can you halve N before reaching 1
- No extra arrays

**Time Complexity: O(log N)**
**Space Complexity: O(1)**

---

### Question 8 — 2D Matrix Creation

```js
function test(n) {
  let matrix = []

  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      row.push(i * j)
    }
    matrix.push(row) // pushing N arrays of size N
  }

  return matrix
}
```

**Analysis:**

- Two nested loops → N × N iterations → O(N²) time
- `matrix` contains N rows each of size N → N² elements total → O(N²) space

**Time Complexity: O(N²)**
**Space Complexity: O(N²)**

---

### Question 9 — Mixed Loops

```js
function test(n) {
  // Block 1: Nested loops
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j) // O(N²)
    }
  }

  // Block 2: Single loop (parallel to Block 1)
  for (let k = 0; k < n; k++) {
    console.log(k) // O(N)
  }
}
```

**Analysis:**

- Block 1 (nested): O(N²)
- Block 2 (parallel): O(N)
- Total: N² + N → keep highest degree → **O(N²)**
- No extra arrays

**Time Complexity: O(N²)**
**Space Complexity: O(1)**

---

### Question 10 — Equation Simplification

**Given equation:** `3N²/2 + N log N + N + 7`

**Step-by-step simplification:**

1. Identify all terms: `3N²/2`, `N log N`, `N`, `7`
2. Find highest degree term: `3N²/2` (degree 2 beats N log N, N, and constant)
3. Drop all lower terms: remove `N log N`, `N`, `7`
4. Drop constants from remaining: `3N²/2` → `N²`

**Answer: O(N²)**

---

**Given equation:** `N log N + log N + N`

**Step-by-step simplification:**

1. Terms: `N log N`, `log N`, `N`
2. Order: `N log N > N > log N`
3. Keep highest: `N log N`
4. No constant to drop

**Answer: O(N log N)**

---

## 12. Complete Cheat Sheet

### Time Complexity Types

```
╔══════════════════╦══════════════════════╦═══════════════════════════╦════════════════════╗
║ Notation         ║ Name                 ║ Pattern in Code           ║ Example            ║
╠══════════════════╬══════════════════════╬═══════════════════════════╬════════════════════╣
║ O(1)             ║ Constant             ║ Formula / fixed N         ║ Array access       ║
║ O(log N)         ║ Logarithmic          ║ N halves each step        ║ Binary Search      ║
║ O(N)             ║ Linear               ║ Single loop (1 to N)      ║ Linear Search      ║
║ O(N log N)       ║ Linearithmic         ║ Loop + log N inside       ║ Merge Sort         ║
║ O(N²)            ║ Quadratic            ║ Two nested loops          ║ Bubble Sort        ║
║ O(N³)            ║ Cubic                ║ Three nested loops        ║ Matrix multiply    ║
║ O(2^N)           ║ Exponential          ║ Recursion (subsets)       ║ Power Set          ║
║ O(N!)            ║ Factorial            ║ Recursion (permutations)  ║ All Permutations   ║
╚══════════════════╩══════════════════════╩═══════════════════════════╩════════════════════╝
```

### Constraint → Max Complexity Table

```
╔═════════════════════╦════════════════════════════╦═══════════════════════════════╗
║ Constraint (N ≤)    ║ Max Complexity Allowed     ║ Notes                         ║
╠═════════════════════╬════════════════════════════╬═══════════════════════════════╣
║ 10 – 12             ║ O(N!)                      ║ Permutations ok               ║
║ 20 – 25             ║ O(2^N)                     ║ Subsets ok                    ║
║ 100                 ║ O(N³)                      ║ Cubic ok                      ║
║ 500 – 2000          ║ O(N²)                      ║ Bubble/Selection sort ok      ║
║ 10⁴ (10,000)        ║ O(N²)                      ║ Most common LeetCode range    ║
║ 10⁵ (100,000)       ║ O(N log N) or O(N)         ║ Need efficient sorting        ║
║ 10⁶ (1,000,000)     ║ O(N) or O(N log N)         ║ Linear or near-linear only    ║
║ 10⁸ (100,000,000)   ║ O(N) or O(log N)           ║ Only simple scans             ║
║ > 10⁸               ║ O(log N) or O(1)           ║ Only math/binary search       ║
╚═════════════════════╩════════════════════════════╩═══════════════════════════════╝
```

### Rules for Calculating Complexity

```
╔═══════════════════════════════╦══════════════════════════════════════════╗
║ Situation                     ║ Rule                                     ║
╠═══════════════════════════════╬══════════════════════════════════════════╣
║ Parallel loops                ║ ADD their complexities                   ║
║ Nested loops                  ║ MULTIPLY their complexities              ║
║ Parallel + Nested mixed       ║ Multiply nested, add parallel            ║
║ Constants                     ║ ALWAYS drop (3N → N)                    ║
║ Multiple terms                ║ Keep HIGHEST degree only                 ║
║ Loop halves each iteration    ║ O(log N)                                 ║
║ Two loops, one inside other   ║ O(N²)                                    ║
║ Fixed N in problem            ║ O(1) regardless of loop count            ║
╚═══════════════════════════════╩══════════════════════════════════════════╝
```

### Space Complexity Reference

```
╔═════════════════════════════════╦══════════════════╗
║ What You Allocate               ║ Space Complexity  ║
╠═════════════════════════════════╬══════════════════╣
║ Only simple variables           ║ O(1)              ║
║ One array of size N             ║ O(N)              ║
║ 2D array of size N × N          ║ O(N²)             ║
║ Recursive call stack depth N    ║ O(N)              ║
║ Recursive call stack depth logN ║ O(log N)          ║
╚═════════════════════════════════╩══════════════════╝
```

### Order of Magnitude (Best to Worst)

```
O(1)  →  O(log N)  →  O(N)  →  O(N log N)  →  O(N²)  →  O(N³)  →  O(2^N)  →  O(N!)
BEST                                                                           WORST
```

---

## 13. How to Practice Going Forward

### Step-by-Step Approach

```
1. Pick any problem you've already solved (e.g., array problems from earlier lectures)
2. Look at your solution code
3. Try to determine its Time Complexity yourself using the rules above
4. Also determine its Space Complexity
5. Then verify:
   - Paste your code into ChatGPT
   - Ask: "What is the time and space complexity of this algorithm? Explain step by step."
   - Compare your answer with ChatGPT's answer
6. If different, ask: "Why did I get N and you got N²? What did I miss?"
7. Repeat with every problem you solve going forward
```

### What to Do for Every New Problem You Solve

```
After solving any DSA problem:
✅ Identify Time Complexity
✅ Identify Space Complexity
✅ Write both in a comment at the top of your solution
✅ Check constraints and verify your complexity is acceptable
✅ Ask: "Can I do better? Is there a more efficient approach?"
```

### Recommended Practice Resources

- **Launch School** — Has dedicated Time Complexity exercises with explanations
- **LeetCode** — Check the "Solution" tab, they always show Time & Space complexity
- **NeetCode.io** — Great video explanations with complexity analysis

### The Key Mindset

> Every time you write a loop, ask yourself:
>
> - "How many times does this run?"
> - "What is N here?"
> - "How does this grow as N grows?"

> Every time you allocate memory (arrays, objects), ask:
>
> - "How much memory am I using relative to N?"

This habit will make Time & Space Complexity second nature over time.

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 08_
_📌 Instructor: Ali Ansari_
_🔗 Practice Site: Launch School | LeetCode | NeetCode.io_
