# 📘 DSA Series — Lecture 10

# 🔁 Recursion Level 1 — Stack Memory, Call Stack, Backtracking & Problems

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 10 — Recursion Level 1

---

## 📌 Table of Contents

1. [Stack Memory & Call Stack](#1-stack-memory--call-stack)
   - [What is Stack?](#11-what-is-stack)
   - [Stack Memory vs Heap Memory](#12-stack-memory-vs-heap-memory)
   - [How Function Calls Work in Memory](#13-how-function-calls-work-in-memory)
2. [The `return` Keyword — Deep Dive](#2-the-return-keyword--deep-dive)
3. [Why We Need Recursion](#3-why-we-need-recursion)
4. [What is Recursion?](#4-what-is-recursion)
5. [Recursion Syntax & Base Case](#5-recursion-syntax--base-case)
6. [Common Pitfall — Post/Pre Decrement in Recursive Calls](#6-common-pitfall--postpre-decrement-in-recursive-calls)
7. [Backtracking — The Most Important Concept](#7-backtracking--the-most-important-concept)
8. [When to Use `return` with Recursive Calls](#8-when-to-use-return-with-recursive-calls)
9. [Practice Problems with Full Solutions](#9-practice-problems-with-full-solutions)
   - [Problem 1: Print "Hello World" N Times](#problem-1-print-hello-world-n-times)
   - [Problem 2: Print N to 1](#problem-2-print-n-to-1)
   - [Problem 3: Print 1 to N (Backtracking)](#problem-3-print-1-to-n-backtracking)
   - [Problem 4: Sum of N Natural Numbers](#problem-4-sum-of-n-natural-numbers)
   - [Problem 5: Factorial of N](#problem-5-factorial-of-n)
   - [Problem 6: Fibonacci — Print N Terms (Iterative + Recursive)](#problem-6-fibonacci--print-n-terms-iterative--recursive)
   - [Problem 7: Fibonacci — Nth Term (Recursive Tree)](#problem-7-fibonacci--nth-term-recursive-tree)
10. [Complete Cheat Sheet](#10-complete-cheat-sheet)

---

## 1. Stack Memory & Call Stack

### 1.1 What is Stack?

**Stack** is a data structure that works on the **LIFO principle**:

> **LIFO = Last In, First Out**
> The element inserted **last** is removed **first**.

### Real-Life LIFO Examples

| Example                     | What's LIFO about it                             |
| --------------------------- | ------------------------------------------------ |
| Stack of books              | You take the top book first — the one added last |
| Stack of plates at a buffet | You pick the topmost plate (added last)          |
| Stack of chairs             | Remove the top chair first                       |
| **Ctrl+Z (Undo)**           | The last action you did is undone first          |

### Stack Operations

| Operation | Meaning                                            |
| --------- | -------------------------------------------------- |
| **Push**  | Insert an element into the stack (add to top)      |
| **Pop**   | Remove an element from the stack (remove from top) |
| **Peek**  | View the top element without removing it           |

---

### 1.2 Stack Memory vs Heap Memory

Our computer's memory is divided into two main sections:

```
┌───────────────────────────────┐
│         STACK MEMORY          │
│    (Static — Limited Size)    │
│    ~5% of total memory        │
│                               │
│  • Function calls             │
│  • Primitive variables        │
│    (number, string, boolean,  │
│     undefined, null, bigint)  │
└───────────────────────────────┘

┌───────────────────────────────┐
│         HEAP MEMORY           │
│   (Dynamic — Large Size)      │
│   ~95% of total memory        │
│                               │
│  • Objects                    │
│  • Arrays                     │
│  • User-defined structures    │
└───────────────────────────────┘
```

| Feature           | Stack Memory                         | Heap Memory                     |
| ----------------- | ------------------------------------ | ------------------------------- |
| **Size**          | Small, limited (static)              | Large, flexible (dynamic)       |
| **What's stored** | Function calls + primitive variables | Objects, arrays, non-primitives |
| **Speed**         | Fast                                 | Slower                          |
| **Management**    | Automatic (push/pop)                 | Managed by garbage collector    |

### Why is Stack Memory Limited?

Stack is **static** — its size is fixed at program start. This is why you get **"Maximum call stack size exceeded"** errors when recursion goes too deep (infinite recursion fills the entire stack → Stack Overflow).

---

### 1.3 How Function Calls Work in Memory

The stack memory is also called **Call Stack** because it stores **function calls**.

**Rule:**

- Every time a function is **called** → it gets **pushed** onto the call stack
- Every time a function **terminates** → it gets **popped** off the call stack

### Example Code

```javascript
function greet() {
  console.log('Good Morning Pineapple')
  enjoy() // calls enjoy before greet finishes
}

function enjoy() {
  console.log('Enjoying guys')
  temp() // calls temp before enjoy finishes
}

function temp() {
  // doing something
}

greet() // start here
```

### Call Stack Visualization

```
Step 1: greet() is called
┌─────────┐
│  greet  │ ← pushed (currently executing)
└─────────┘

Step 2: enjoy() is called from inside greet() (greet hasn't finished yet)
┌─────────┐
│  enjoy  │ ← pushed
├─────────┤
│  greet  │ ← still waiting (not finished)
└─────────┘

Step 3: temp() is called from inside enjoy() (enjoy hasn't finished yet)
┌─────────┐
│  temp   │ ← pushed (currently executing)
├─────────┤
│  enjoy  │ ← waiting
├─────────┤
│  greet  │ ← waiting
└─────────┘

Step 4: temp() finishes → popped
┌─────────┐
│  enjoy  │ ← resumes execution
├─────────┤
│  greet  │ ← still waiting
└─────────┘

Step 5: enjoy() finishes → popped
┌─────────┐
│  greet  │ ← resumes execution
└─────────┘

Step 6: greet() finishes → popped
(Call stack is now empty)
```

> 📌 **LIFO in action:** `temp` was pushed last → it got popped first.
> The call stack always executes from **top to bottom**.

### What Gets Stored in Each Stack Frame?

Every function that gets pushed onto the call stack has its own **dedicated memory block** (called a stack frame) that stores:

- All operations/statements the function is executing
- All **primitive variables** declared inside that function (number, string, boolean, etc.)

```javascript
function greet() {
  let a = 10 // ← this 'a' is stored in greet's stack frame
  console.log('Hello')
}
```

> 💡 **Key Insight:** Each stack frame's state is **preserved** while other functions run on top of it. When we come back to that frame, all its variables are still there exactly as we left them.

---

## 2. The `return` Keyword — Deep Dive

### Primary Purpose of `return`

> **`return` = STOP the function immediately and go back to where it was called from.**

Most people think `return` means "give back a value." That's its **secondary** purpose. The **primary** purpose is to **terminate the function**.

### Demonstration

```javascript
function term(val) {
  if (val === 0) {
    return // STOP here. Lines below will NOT execute.
  }
  console.log('Hello World') // ← this line is skipped if val === 0
}

term(10) // Output: "Hello World"  (val is 10, not 0, so return not hit)
term(0) // Output: nothing        (val is 0, return fires immediately)
```

### What Happens in Memory When `return` Fires

```javascript
function term(val) {
  if (val === 0) {
    return // ← return fires here
  }
  console.log('Hello World')
}
```

```
Before return:          After return fires:
┌──────────────┐        (function is popped)
│  term (val=0)│  →     Stack frame removed
└──────────────┘        Execution returns to caller
```

> ✅ **`return` = pop the function off the call stack.**

### Return with a Value

`return` can optionally carry a value back to the caller:

```javascript
function add(a, b) {
  return a + b // terminates AND sends the result back
}

let result = add(3, 4) // result = 7
```

The value isn't lost — it's passed back to whoever called the function and can be stored or used.

---

## 3. Why We Need Recursion

### Two Ways to Do Repeated Tasks

| Approach                  | Name      | Tool                       |
| ------------------------- | --------- | -------------------------- |
| **Loop-based**            | Iterative | `for`, `while`, `do-while` |
| **Self-calling function** | Recursive | Recursion                  |

### The Core Power of Recursion

> **Recursion breaks a BIG problem into smaller sub-problems, solves each sub-problem, and combines them to solve the original big problem.**

### Real-Life Analogy — Teacher with 100 Papers

```
Teacher has 100 exam papers to check in one day.
  ↓
Divides into 4 assistants × 25 papers each
  ↓
Each assistant checks their 25 papers
  ↓
Results combined → all 100 papers checked
```

This is exactly what recursion does: delegates sub-problems and combines results.

### Programming Analogy — Sum of 1 to N

Instead of looping from 1 to N:

```
f(5) says: "I'll add myself (5) to whatever f(4) gives me"
f(4) says: "I'll add myself (4) to whatever f(3) gives me"
f(3) says: "I'll add myself (3) to whatever f(2) gives me"
f(2) says: "I'll add myself (2) to whatever f(1) gives me"
f(1) says: "I return 1" ← Base case
```

```
f(1) → 1
f(2) → 2 + 1 = 3
f(3) → 3 + 3 = 6
f(4) → 4 + 6 = 10
f(5) → 5 + 10 = 15
```

This is called **Recursive Leap of Faith** — each level trusts the level below to solve its sub-problem.

### Real-Life Software Analogy — Project Delivery

```
Client → asks Manager for project
Manager → "If Senior Developer gives me the project, I'll give it to you"
Senior Dev → "If my Backend + Frontend teams finish, I'll give it to you"
Backend + Frontend → complete their parts
Senior Dev → delivers to Manager
Manager → delivers to Client
```

Same idea: each level delegates to the level below, trusts it to deliver, and passes the result up.

---

## 4. What is Recursion?

### Complete Definition

> **"A function calling itself again and again UNTIL it reaches a stopping point (base case)."**

The **half-definition** many people know: "A function calling itself again and again."
The **full definition** adds: "...until it reaches a stopping point (base case condition)."

### Why the Base Case is Critical

Without a base case:

- The function calls itself forever
- Each call pushes a new frame onto the call stack
- The call stack fills up completely
- **Stack Overflow Error:** `Maximum call stack size exceeded`

> ✅ **Every recursive function MUST have a base case** — the condition that stops the recursion.

### Comparison with Loops

| Loops                                        | Recursion                              |
| -------------------------------------------- | -------------------------------------- |
| Has a stopping condition in `for`/`while`    | Has a base case condition              |
| Uses iteration                               | Uses self-calls                        |
| Explicit counter/increment                   | Implicit through parameters            |
| Generally faster (no function call overhead) | Naturally expresses divide-and-conquer |

---

## 5. Recursion Syntax & Base Case

### General Structure

```javascript
function recursive(n) {
  // Step 1: Base Case — when to STOP
  if (n === 0) {
    return // Stop here. Don't call again.
  }

  // Step 2: Do some work
  console.log('something')

  // Step 3: Recursive Call — call yourself with a SMALLER input
  recursive(n - 1) // MUST move toward the base case
}

recursive(5) // initial call
```

### Rules for Writing Recursive Functions

```
1. ALWAYS define the base case first (at the top)
2. Base case = the stopping condition
3. Each recursive call MUST bring you closer to the base case
4. The parameter must change with each call (e.g., n-1, n/2)
```

### Visual Pattern

```
Call with n=5: do work → call with n=4
Call with n=4: do work → call with n=3
Call with n=3: do work → call with n=2
Call with n=2: do work → call with n=1
Call with n=1: do work → call with n=0
Call with n=0: BASE CASE → return (stop)
```

---

## 6. Common Pitfall — Post/Pre Decrement in Recursive Calls

### The Mistake: Using `n--` (Post-Decrement)

```javascript
function temp(n) {
  if (n === 0) return
  console.log('Hello World')
  temp(n--) // ❌ WRONG — causes infinite recursion
}

temp(5) // Error: Maximum call stack size exceeded
```

**Why this fails:**

Post-decrement (`n--`) means:

1. **First:** Use the current value (n = 5)
2. **Then:** Decrement (n becomes 4)

But step 1 already fired the function call with `n = 5` before step 2 could happen. So the function is called with `5` every single time — never reaches `0`.

```
Call: temp(5) → uses 5, then decrements → but too late, already called temp(5)
Call: temp(5) → uses 5, then decrements → but too late, already called temp(5)
...forever
```

### The Fix Option 1: Use `n - 1` (Correct)

```javascript
function temp(n) {
  if (n === 0) return
  console.log('Hello World')
  temp(n - 1) // ✅ CORRECT — passes n-1 as a new value
}
```

**Why this works:**

- `n - 1` evaluates to a new value (e.g., 4) **before** the call
- The call receives `4` correctly

### The Fix Option 2: Use `--n` (Pre-Decrement) — Also Correct

```javascript
function temp(n) {
  if (n === 0) return
  console.log('Hello World')
  temp(--n) // ✅ CORRECT — decrements first, then uses value
}
```

**Why this works:**

- Pre-decrement (`--n`) means:
  1. **First:** Decrement (n becomes 4)
  2. **Then:** Use the value (passes 4)
- So the call receives `4` correctly

### Summary Table

| Expression  | Order                         | Result when n=5    |
| ----------- | ----------------------------- | ------------------ |
| `temp(n--)` | Use first (5), then decrement | Calls `temp(5)` ❌ |
| `temp(--n)` | Decrement first (4), then use | Calls `temp(4)` ✅ |
| `temp(n-1)` | Evaluates to new value (4)    | Calls `temp(4)` ✅ |

> ✅ **Best practice:** Use `n - 1` for clarity. Avoids confusion entirely.

---

## 7. Backtracking — The Most Important Concept

### What is Backtracking?

> **Backtracking = code that executes as the function is RETURNING (unwinding), not as it's calling.**

When functions pop off the call stack one by one, **any code placed after the recursive call** executes during this "unwinding" phase.

### How to Identify Backtracking Code

```javascript
function recursive(n) {
  if (n === 0) return

  // This runs on the WAY DOWN (while calling)
  recursive(n - 1)

  // This runs on the WAY UP (while returning / backtracking)
  console.log(n) // ← THIS IS BACKTRACKING CODE
}
```

**Rule:**

- Code **before** the recursive call → executes during the **forward phase** (going deeper)
- Code **after** the recursive call → executes during the **backward phase** (backtracking / unwinding)

### Visualization

```javascript
function recursive(n) {
  if (n === 0) return
  recursive(n - 1) // call first
  console.log(n) // then print on the way back up
}

recursive(3)
```

**Call Stack Going Down:**

```
recursive(3) → calls recursive(2) → [log 3 is on HOLD]
recursive(2) → calls recursive(1) → [log 2 is on HOLD]
recursive(1) → calls recursive(0) → [log 1 is on HOLD]
recursive(0) → base case → RETURN
```

**Unwinding / Backtracking:**

```
recursive(0) returns → recursive(1) resumes → prints 1
recursive(1) returns → recursive(2) resumes → prints 2
recursive(2) returns → recursive(3) resumes → prints 3

Output: 1 2 3
```

> 💡 **Key Memory Insight:**
> Each stack frame **preserves its state** while functions above it execute.
> When you come back to a frame, all its variables are exactly as you left them.
> This is how `n = 3` still knows it's `3` when we return to that frame.

---

## 8. When to Use `return` with Recursive Calls

This is one of the most important subtleties in recursion that most tutorials skip.

### Rule

```
If the PREVIOUS stack frame needs a VALUE from the CURRENT stack frame → use return

If the previous stack frame does NOT need any value from below → don't use return
```

### Case 1: No Return Needed — Independent Work

```javascript
// Each call independently prints and moves on
// Previous calls don't wait for a value from below
function printHello(n) {
  if (n === 0) return
  console.log('Hello World')
  printHello(n - 1) // ← no return here
}
```

**Stack behavior:**

```
printHello(5): prints, calls printHello(4), doesn't wait for anything back
printHello(4): prints, calls printHello(3), doesn't wait for anything back
...
```

No frame is waiting for a **computed value** from the frame below it.

### Case 2: Return Needed — Dependent Computation

```javascript
// Each call needs the SUM from below to compute its own answer
function sum(n) {
  if (n === 1) return 1
  return n + sum(n - 1) // ← return IS needed here
}
```

**Stack behavior:**

```
sum(5) is waiting for sum(4) to give a value before it can compute 5 + ?
sum(4) is waiting for sum(3) to give a value before it can compute 4 + ?
sum(3) is waiting for sum(2) to give a value before it can compute 3 + ?
sum(2) is waiting for sum(1) to give a value before it can compute 2 + ?
sum(1) → returns 1 (base case)
```

Here `sum(2)` can't compute `2 + sum(1)` until `sum(1)` gives back a value. So we **must** use `return` with the recursive call so the value propagates upward.

### Decision Flowchart

```
Does the current stack frame need a computed result
from the recursion below to finish its own work?
          │
    YES   │   NO
     ↓    │    ↓
Use return│  Don't use return
with      │  with recursive call
recursive │
call      │
```

---

## 9. Practice Problems with Full Solutions

### Problem 1: Print "Hello World" N Times

**Task:** Print "Hello World" exactly N times using recursion.

#### Code

```javascript
function printHello(n) {
  // Base Case: if n reaches 0, stop
  if (n === 0) {
    return
  }

  console.log('Hello World') // do the work

  printHello(n - 1) // recursive call with n-1
}

printHello(5)
// Output:
// Hello World
// Hello World
// Hello World
// Hello World
// Hello World
```

#### Call Stack Trace

```
printHello(5) → prints "Hello World" → calls printHello(4)
printHello(4) → prints "Hello World" → calls printHello(3)
printHello(3) → prints "Hello World" → calls printHello(2)
printHello(2) → prints "Hello World" → calls printHello(1)
printHello(1) → prints "Hello World" → calls printHello(0)
printHello(0) → BASE CASE → return
(All frames pop off, nothing left to do on the way back up)
```

---

### Problem 2: Print N to 1

**Task:** Print numbers from N down to 1.

#### Code

```javascript
function printDesc(n) {
  // Base Case: stop when n reaches 0
  if (n === 0) {
    return
  }

  console.log(n) // print BEFORE the recursive call (forward phase)

  printDesc(n - 1) // call with n-1
}

printDesc(10)
// Output: 10 9 8 7 6 5 4 3 2 1
```

#### Why This Works

```
printDesc(5) → prints 5 → calls printDesc(4)
printDesc(4) → prints 4 → calls printDesc(3)
printDesc(3) → prints 3 → calls printDesc(2)
printDesc(2) → prints 2 → calls printDesc(1)
printDesc(1) → prints 1 → calls printDesc(0)
printDesc(0) → BASE CASE → return
```

The `console.log(n)` happens **before** the recursive call = **forward phase** = prints in descending order (5, 4, 3, 2, 1).

---

### Problem 3: Print 1 to N (Backtracking)

**Task:** Print numbers from 1 up to N — using recursion only.

**Key insight:** Move `console.log(n)` to **after** the recursive call. Now it runs during backtracking.

#### Code

```javascript
function printAsc(n) {
  // Base Case
  if (n === 0) {
    return
  }

  printAsc(n - 1) // recursive call FIRST

  console.log(n) // print AFTER (backtracking phase)
}

printAsc(10)
// Output: 1 2 3 4 5 6 7 8 9 10
```

#### Call Stack Visualization — Why It Prints 1 to N

```
Forward Phase (going down):
printAsc(5): calls printAsc(4)  → log 5 is ON HOLD
printAsc(4): calls printAsc(3)  → log 4 is ON HOLD
printAsc(3): calls printAsc(2)  → log 3 is ON HOLD
printAsc(2): calls printAsc(1)  → log 2 is ON HOLD
printAsc(1): calls printAsc(0)  → log 1 is ON HOLD
printAsc(0): BASE CASE → returns

Backtracking Phase (coming up):
printAsc(0) returns → printAsc(1) resumes → prints 1
printAsc(1) returns → printAsc(2) resumes → prints 2
printAsc(2) returns → printAsc(3) resumes → prints 3
printAsc(3) returns → printAsc(4) resumes → prints 4
printAsc(4) returns → printAsc(5) resumes → prints 5

Final output: 1 2 3 4 5 ✅
```

> 💡 **This IS backtracking!** The print happens on the **way back up** — each frame was holding onto its `n` value, waiting. When it gets to "execute," it prints. Because frames unwind in reverse order (5,4,3,2,1), the prints come out 1,2,3,4,5.

#### Side by Side Comparison

| Position of `console.log` | Output                      |
| ------------------------- | --------------------------- |
| **Before** recursive call | N to 1 (forward phase)      |
| **After** recursive call  | 1 to N (backtracking phase) |

---

### Problem 4: Sum of N Natural Numbers

**Task:** Find 1 + 2 + 3 + ... + N using recursion.

#### Approach — Recurrence Relation

```
sum(5) = 5 + sum(4)
sum(4) = 4 + sum(3)
sum(3) = 3 + sum(2)
sum(2) = 2 + sum(1)
sum(1) = 1              ← base case
```

#### Code

```javascript
function sum(n) {
  // Base Case
  if (n === 1) {
    return 1 // return 1 (not just return) because the value matters
  }

  // Recursive case: n + sum of everything below
  return n + sum(n - 1) // return IS needed (previous frame waits for this value)
}

console.log(sum(5)) // Output: 15
```

> **Note:** We use `return` with the recursive call because `sum(5)` can't compute `5 + ?` until it gets the result from `sum(4)`. Each frame is **waiting** for its sub-result.

#### Call Stack + Backtracking Visualization

```
Forward (going down):
sum(5): waiting for sum(4)... on hold: 5 + ?
sum(4): waiting for sum(3)... on hold: 4 + ?
sum(3): waiting for sum(2)... on hold: 3 + ?
sum(2): waiting for sum(1)... on hold: 2 + ?
sum(1): BASE CASE → returns 1

Backtracking (coming up):
sum(1) returns 1 → sum(2) gets 1 → 2 + 1 = 3 → returns 3
sum(2) returns 3 → sum(3) gets 3 → 3 + 3 = 6 → returns 6
sum(3) returns 6 → sum(4) gets 6 → 4 + 6 = 10 → returns 10
sum(4) returns 10 → sum(5) gets 10 → 5 + 10 = 15 → returns 15

Final answer: 15 ✅
```

---

### Problem 5: Factorial of N

**Task:** Find N! = 1 × 2 × 3 × ... × N using recursion.

#### Recurrence Relation

```
fact(5) = 5 × fact(4)
fact(4) = 4 × fact(3)
fact(3) = 3 × fact(2)
fact(2) = 2 × fact(1)
fact(1) = 1             ← base case
```

#### Code

```javascript
function fact(n) {
  // Base Case
  if (n === 1) {
    return 1
  }

  // One line change from sum: × instead of +
  return n * fact(n - 1)
}

console.log(fact(5)) // Output: 120
console.log(fact(6)) // Output: 720
```

#### Call Stack Trace

```
fact(5): 5 × fact(4) → waiting...
fact(4): 4 × fact(3) → waiting...
fact(3): 3 × fact(2) → waiting...
fact(2): 2 × fact(1) → waiting...
fact(1): returns 1 (base case)

Backtracking:
1 → fact(2): 2 × 1 = 2
2 → fact(3): 3 × 2 = 6
6 → fact(4): 4 × 6 = 24
24 → fact(5): 5 × 24 = 120 ✅
```

---

### Problem 6: Fibonacci — Print N Terms (Iterative + Recursive)

**Fibonacci Series:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

**Rule:** Each term = sum of previous two terms.

```
Term 0 = 0 (defined)
Term 1 = 1 (defined)
Term 2 = 0 + 1 = 1
Term 3 = 1 + 1 = 2
Term 4 = 1 + 2 = 3
...
```

#### Iterative Solution (to understand the logic)

```javascript
let n = 10 // print 10 terms
let first = 0
let second = 1

// Print first two terms (they're predefined)
process.stdout.write(first + ' ')
process.stdout.write(second + ' ')

// Print remaining n-2 terms
for (let i = 1; i <= n - 2; i++) {
  let third = first + second // new term = sum of previous two
  process.stdout.write(third + ' ')

  first = second // shift: old second becomes new first
  second = third // shift: old third becomes new second
}

// Output: 0 1 1 2 3 5 8 13 21 34
```

#### Understanding the Shift Logic

```
Initial: first=0, second=1
Print: 0 1

Iteration 1:
  third = 0 + 1 = 1    (print 1)
  first = 1             (old second)
  second = 1            (old third)

Iteration 2:
  third = 1 + 1 = 2    (print 2)
  first = 1             (old second)
  second = 2            (old third)

Iteration 3:
  third = 1 + 2 = 3    (print 3)
  first = 2
  second = 3

...and so on
```

#### Recursive Solution

```javascript
function fiboPrintN(n, first, second) {
  // Base Case: stop when we've printed all terms
  if (n === 0) {
    return
  }

  let third = first + second
  process.stdout.write(third + ' ')

  // Shift: new first = old second, new second = old third
  fiboPrintN(n - 1, second, third) // no return — previous frames don't depend on result
}

// Print first two terms
process.stdout.write(0 + ' ')
process.stdout.write(1 + ' ')

// Print remaining n-2 terms
fiboPrintN(10 - 2, 0, 1)

// Output: 0 1 1 2 3 5 8 13 21 34
```

> **Why no `return` on the recursive call?**
> Each call independently prints its term. The previous frame doesn't need a **value** from the current frame — it just needs it to do its job. No dependency = no `return`.

---

### Problem 7: Fibonacci — Nth Term (Recursive Tree)

**Task:** Given N, return the value of the Nth Fibonacci term.

```
N = 0 → 0
N = 1 → 1
N = 2 → 1
N = 5 → 5
N = 6 → 8
N = 7 → 13
```

#### Recurrence Relation

```
fibo(n) = fibo(n-1) + fibo(n-2)

Base cases:
fibo(0) = 0
fibo(1) = 1
```

#### Code

```javascript
function fibo(n) {
  // Base Cases
  if (n === 0) return 0
  if (n === 1) return 1

  // Two recursive calls — both need return (result depends on both)
  return fibo(n - 1) + fibo(n - 2)
}

console.log(fibo(7)) // Output: 13
console.log(fibo(6)) // Output: 8
```

#### Recursive Tree for fibo(5)

```
                    fibo(5)
                  /         \
            fibo(4)         fibo(3)
           /       \        /     \
       fibo(3)  fibo(2) fibo(2)  fibo(1)
       /    \   /    \   /    \     |
    fibo(2)fibo(1)f(1)f(0)f(1)f(0) 1
    /   \    |
  f(1) f(0) 1
   1    0
```

**Working backward:**

```
fibo(1) = 1, fibo(0) = 0
fibo(2) = 1 + 0 = 1
fibo(3) = fibo(2) + fibo(1) = 1 + 1 = 2
fibo(4) = fibo(3) + fibo(2) = 2 + 1 = 3
fibo(5) = fibo(4) + fibo(3) = 3 + 2 = 5 ✅
```

#### Important: Two Recursive Calls Work Sequentially, NOT Parallel

```
fibo(5) calls fibo(4) first.
While fibo(4) is running, fibo(3) is ON HOLD.
fibo(4) must complete entirely before fibo(3) starts.

This means:
→ The LEFT branch goes all the way down first
→ Then backtracks
→ Then the RIGHT branch runs
→ Then backtracks
→ Final addition happens
```

This is called a **Recursive Tree** / **Binary Recursion** — each call spawns two sub-calls.

> ⚠️ **Time Complexity:** This naive recursive Fibonacci is **O(2^N)** — exponential! For fibo(40), it makes billions of calls. This is fixed with **Dynamic Programming** (memoization) covered in later lectures.

---

## 10. Complete Cheat Sheet

### Recursion Mental Model

```
┌──────────────────────────────────────────────────────┐
│                  RECURSIVE FUNCTION                  │
│                                                      │
│  function solve(n) {                                 │
│    // 1. BASE CASE — ALWAYS FIRST                    │
│    if (n === stopping_condition) {                   │
│      return [value];   // stop here                 │
│    }                                                 │
│                                                      │
│    // 2. FORWARD PHASE (runs while going deeper)     │
│    doSomethingBefore();                              │
│                                                      │
│    // 3. RECURSIVE CALL (move toward base case)      │
│    [return] solve(n - 1);                            │
│                                                      │
│    // 4. BACKTRACKING PHASE (runs while unwinding)   │
│    doSomethingAfter();                               │
│  }                                                   │
└──────────────────────────────────────────────────────┘
```

### Forward Phase vs Backtracking Phase

```
╔══════════════════════╦════════════════════════════════╗
║ Forward Phase        ║ Backtracking Phase             ║
╠══════════════════════╬════════════════════════════════╣
║ Code BEFORE          ║ Code AFTER                     ║
║ recursive call       ║ recursive call                 ║
╠══════════════════════╬════════════════════════════════╣
║ Executes while       ║ Executes while                 ║
║ going DEEPER         ║ coming BACK UP                 ║
╠══════════════════════╬════════════════════════════════╣
║ Example:             ║ Example:                       ║
║ Print N to 1         ║ Print 1 to N                   ║
╚══════════════════════╩════════════════════════════════╝
```

### When to Use Return with Recursive Call

```
╔══════════════════════════════════════════════════╗
║        return recursiveCall(n-1)                 ║
║  ↑ USE THIS WHEN:                                ║
║  Previous frame WAITS for a value from below     ║
║  Example: sum, factorial, fibonacci nth term     ║
╠══════════════════════════════════════════════════╣
║        recursiveCall(n-1)    (no return)         ║
║  ↑ USE THIS WHEN:                                ║
║  Previous frame does NOT need a value from below ║
║  Example: print hello N times, print N to 1     ║
╚══════════════════════════════════════════════════╝
```

### Common Recursion Patterns

```
╔═══════════════════════╦══════════════════════╦═══════════╗
║ Pattern               ║ Code Structure        ║ Example   ║
╠═══════════════════════╬══════════════════════╬═══════════╣
║ Simple repeat         ║ log → recurse         ║ Hello N   ║
║ Countdown             ║ log → recurse         ║ N to 1    ║
║ Countup (backtrack)   ║ recurse → log         ║ 1 to N    ║
║ Accumulation          ║ return n op recurse   ║ sum, fact ║
║ Two-branch (tree)     ║ recurse(n-1)+recurse  ║ fibonacci ║
║                       ║ (n-2)                 ║           ║
╚═══════════════════════╩══════════════════════╩═══════════╝
```

### Stack Memory Summary

```
╔══════════════════════════════════════════════════════╗
║               STACK MEMORY (Call Stack)              ║
╠══════════════════════════════════════════════════════╣
║  • Works on LIFO principle                           ║
║  • Stores: function calls + primitive variables      ║
║  • Function called → PUSHED onto stack               ║
║  • Function returns → POPPED off stack               ║
║  • return keyword = pop the current function         ║
║  • Each frame's state is PRESERVED while others run  ║
║  • Stack is STATIC and LIMITED in size               ║
║  • Too many calls → Stack Overflow error             ║
╚══════════════════════════════════════════════════════╝
```

### Problem Solutions Reference

```
╔═══════════════════════════╦════════════════════╦════════════╗
║ Problem                   ║ Base Case          ║ Recursive  ║
╠═══════════════════════════╬════════════════════╬════════════╣
║ Hello World N times       ║ n === 0 → return   ║ f(n-1)     ║
║ Print N to 1              ║ n === 0 → return   ║ f(n-1)     ║
║ Print 1 to N              ║ n === 0 → return   ║ f(n-1)     ║
║ Sum of 1 to N             ║ n === 1 → return 1 ║ n+f(n-1)   ║
║ Factorial of N            ║ n === 1 → return 1 ║ n*f(n-1)   ║
║ Fibonacci Nth term        ║ n==0→0, n==1→1     ║ f(n-1)+    ║
║                           ║                    ║ f(n-2)     ║
╚═══════════════════════════╩════════════════════╩════════════╝
```

### Time Complexity of Recursive Solutions

```
╔══════════════════════════╦════════════════════╗
║ Algorithm                ║ Time Complexity    ║
╠══════════════════════════╬════════════════════╣
║ Print N times            ║ O(N)               ║
║ Print N to 1             ║ O(N)               ║
║ Print 1 to N             ║ O(N)               ║
║ Sum of N numbers         ║ O(N)               ║
║ Factorial of N           ║ O(N)               ║
║ Fibonacci Nth (naive)    ║ O(2^N) ⚠️ Very slow║
╚══════════════════════════╩════════════════════╝
```

---

## How to Practice Recursion

```
Step 1: VISUALIZE
  → Draw the call stack on paper
  → Trace every push and pop
  → Mark which values are "on hold"

Step 2: IDENTIFY
  → What is the base case? (when to stop?)
  → What is the recursive sub-problem? (smaller version of original)
  → Is this forward phase or backtracking?

Step 3: CONNECT TO ITERATIVE
  → Think: how would I solve this with a loop?
  → The loop's stopping condition = your base case
  → The loop body = your recursive call logic
  → Converting iterative to recursive becomes mechanical

Step 4: IDENTIFY RETURN PATTERN
  → Does the previous stack frame need a value from below?
  → YES → use return with recursive call
  → NO  → just call recursively without return

Step 5: CODE IT
  → Start with base case (always!)
  → Add recursive call
  → Add any forward/backtracking code

Step 6: VERIFY
  → Trace through manually on paper
  → Check: does it reach the base case?
  → Check: does output match expected?
```

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 10_
_📌 Instructor: Ali Ansari_
_🔗 Next: Recursion Level 2 — Advanced problems with recursion_
