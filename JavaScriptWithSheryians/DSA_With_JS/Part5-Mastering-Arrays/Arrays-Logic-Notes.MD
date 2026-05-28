# 📚 DSA — Arrays: Logic Notes

> Based on Shyam Coding School — Data Structures & Algorithms Series

---

## 🧱 What is an Array?

An array is a **linear data structure** that stores **multiple values in a continuous manner**.

- **Linear** → Elements are arranged one after another (like a queue/line). You can only go from one element to the next sequentially.
- **Continuous** → Elements are stored in **consecutive memory locations**. Think of benches in a classroom — all 4 benches are side by side, not scattered.
- **Non-continuous example** → A Linked List is also linear, but its nodes can be at random memory addresses (e.g., 10 at address `0xAA`, 20 at `0xEF`).

```
Array in memory:
[ 10 | 20 | 30 | 40 | 50 ]
   0    1    2    3    4     ← Index (always starts from 0)
```

### Key Points:

- Represented using **square brackets** `[]` in JavaScript.
- Index always starts from **0**, not 1.
- `arr[0]` → 1st element, `arr[1]` → 2nd element, and so on.
- Each index is like a **container/box** that holds a value.
- JavaScript arrays are **dynamic** — no fixed size. You can always add more elements beyond the declared length.

---

## 📥 Taking Input into an Array using a Loop

### Problem:

Take `N` values from the user (via prompt) and store them in an array.

### Logic:

- Manually copying the same line 5 times (with different indices) is repetitive and unscalable for large arrays (e.g., 10,000 elements).
- Instead, use a **for loop** — the index `i` acts as the changing variable.

```
Step 1: Create an empty array → arr = new Array(n)
Step 2: Run a loop from i = 0 to i < arr.length
Step 3: Inside loop → take input via prompt and store at arr[i]
```

```js
let arr = new Array(5)
for (let i = 0; i < arr.length; i++) {
  arr[i] = Number(prompt('Enter a value'))
}
console.log(arr)
```

### Why loop from 0?

Because array indices start at 0, and we want to fill every slot from `arr[0]` to `arr[n-1]`.

---

## ➕ Sum of N Elements in an Array

### Problem:

Find the sum of all elements in an array.

### Logic (The "Garbage Box" Analogy):

- A robot enters a room, picks up garbage (one element), drops it in a box, exits, and repeats.
- If the box is **inside the loop** → it resets to empty every time the loop runs. ❌
- The box must be **outside the loop** → so it **accumulates** values across iterations. ✅

### Core Equation:

```
sum = sum + arr[i]
```

This means: **new sum = old sum + current element**

```
Step 1: Declare sum = 0 (outside the loop)
Step 2: Loop from i = 0 to i < arr.length
Step 3: Inside loop → sum = sum + arr[i]
Step 4: After loop ends → print sum
```

```js
let sum = 0
for (let i = 0; i < arr.length; i++) {
  sum = sum + arr[i]
}
console.log(sum)
```

### Why initialize sum = 0?

Because `0 + firstElement = firstElement` — adding zero doesn't change the value. It's the **identity element** for addition.

### Dry Run (arr = [10, 20, 30, 40, 50]):

| i   | arr[i] | sum (before) | sum (after) |
| --- | ------ | ------------ | ----------- |
| 0   | 10     | 0            | 10          |
| 1   | 20     | 10           | 30          |
| 2   | 30     | 30           | 60          |
| 3   | 40     | 60           | 100         |
| 4   | 50     | 100          | 150         |

**Final Answer: 150** ✅

---

## 🔍 Find Maximum Element in an Array

### Problem:

Find the largest element **without sorting** the array.

### Logic (Robot Analogy):

- A robot walks through paper strips of different heights.
- It picks up the first strip and assumes it's the tallest.
- It compares each next strip with the current "max" — if taller, it replaces the max.

### Key Insight:

> Since we can't see all elements at once (like in real coding platforms), **assume the first element is the maximum**, then keep updating if a bigger one is found.

```
Step 1: max = arr[0]  (assume first element is max)
Step 2: Loop from i = 1 (skip index 0, already used)
Step 3: If arr[i] > max → update max = arr[i]
Step 4: After loop → print max
```

```js
let max = arr[0]
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i]
  }
}
console.log(max)
```

### Why start loop from index 1?

Because index 0 is already stored as `max`. Comparing it with itself is unnecessary.

> 🏠 **Homework:** Find the **Minimum Element** using the same logic (just flip `>` to `<`).

---

## 🥈 Find Second Maximum Element in an Array

### Problem:

Find the 2nd largest element without sorting.

### Logic:

- Maintain **two variables**: `max` and `secondMax`.
- Initialize both using the **first two elements** of the array:
  - `max = Math.max(arr[0], arr[1])`
  - `secondMax = Math.min(arr[0], arr[1])`
- Start loop from **index 2** (since first two are already used).

### For each element:

1. **If current element > max** → the old `max` becomes the new `secondMax`, and current becomes the new `max`.
2. **Else if current element > secondMax AND current element ≠ max** → update `secondMax`.

### ⚠️ Critical Bug to Avoid:

**Never update `max` before updating `secondMax`.**

```js
// WRONG ❌
max = arr[i] // max is now updated
secondMax = max // secondMax gets the NEW max value, not the old one!

// CORRECT ✅
secondMax = max // save old max first
max = arr[i] // then update max
```

### ⚠️ Corner Case — Duplicate Maximum:

If array = `[10, 30, 40, 40, 40]`:

- `max = 40` (correct)
- Without the `arr[i] !== max` check, `secondMax` would also become `40` ❌
- Add condition: `arr[i] > secondMax && arr[i] !== max` ✅

```
Step 1: max = Math.max(arr[0], arr[1])
Step 2: secondMax = Math.min(arr[0], arr[1])
Step 3: Loop from i = 2 to i < arr.length
Step 4:   if arr[i] > max:
              secondMax = max
              max = arr[i]
          else if arr[i] > secondMax && arr[i] !== max:
              secondMax = arr[i]
Step 5: print secondMax
```

> 🏠 **Homework:** Find the **Second Minimum Element** using the same logic.

---

## 🔄 Reverse an Array

### Approach 1: With Extra Space (Not Recommended)

### Logic:

- Create a new array `temp` of the same length.
- Loop from the **last index to 0** of original array.
- Fill `temp` from index 0 onward.

```
Step 1: Create temp = new Array(arr.length)
Step 2: i = arr.length - 1 (starts from last), j = 0 (temp starts from first)
Step 3: temp[j] = arr[i]
Step 4: i--, j++
Step 5: Repeat until i < 0
```

### ❌ Why it's not recommended:

If the array has 1 million elements, you're creating **another 1 million slots** in memory — wasteful.

---

### Approach 2: Without Extra Space ✅ (Two Pointer)

### Logic:

- Use two pointers: `i` (start) and `j` (end).
- **Swap** `arr[i]` and `arr[j]`.
- Move `i` forward and `j` backward.
- Stop when `i >= j` (they meet or cross).

```
Step 1: i = 0, j = arr.length - 1
Step 2: While i < j:
            swap arr[i] and arr[j]
            i++
            j--
Step 3: Array is now reversed in-place
```

```js
let i = 0,
  j = arr.length - 1
while (i < j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  i++
  j--
}
```

### Dry Run (arr = [1, 2, 3, 4, 5]):

| Step | i   | j   | Array State     |
| ---- | --- | --- | --------------- |
| 1    | 0   | 4   | [5, 2, 3, 4, 1] |
| 2    | 1   | 3   | [5, 4, 3, 2, 1] |
| 3    | 2   | 2   | i == j → Stop   |

**Final: [5, 4, 3, 2, 1]** ✅

### ✅ Why this is better:

No extra memory needed. All swapping happens **inside the original array**.

---

## 0️⃣1️⃣ Move All Zeros to Left, All Ones to Right

### Problem:

Given an array of only `0`s and `1`s, rearrange so all `0`s are on the left and all `1`s are on the right.

### Logic (Two Pointer Algorithm):

- `i` → scans every element (the "checker")
- `j` → marks where the **next zero should go** (the "placer")
- Both `i` and `j` start at index 0.

### Rules:

| Situation     | Action                                                              |
| ------------- | ------------------------------------------------------------------- |
| `arr[i] == 1` | Do nothing, just move `i` forward                                   |
| `arr[i] == 0` | Swap `arr[i]` with `arr[j]`, then move **both** `i` and `j` forward |

### Key Rule:

> `j` only moves forward **when a swap happens**. `i` always moves forward every iteration.

```
Step 1: i = 0, j = 0
Step 2: While i < arr.length:
            if arr[i] == 0:
                swap arr[i] and arr[j]
                j++
            i++
```

```js
let i = 0,
  j = 0
while (i < arr.length) {
  if (arr[i] === 0) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    j++
  }
  i++
}
```

### Dry Run (arr = [1, 1, 0, 1, 0, 1, 1, 0]):

- i=0: `1` → skip, i++
- i=1: `1` → skip, i++
- i=2: `0` → swap arr[2] & arr[0] → `[0,1,1,1,0,1,1,0]`, j=1, i++
- i=3: `1` → skip, i++
- i=4: `0` → swap arr[4] & arr[1] → `[0,0,1,1,1,1,1,0]`, j=2, i++
- ... and so on

**Final: [0, 0, 0, 1, 1, 1, 1, 1]** ✅

---

> 🏠 **Homework:** Move all **negative numbers to the left** and all **positive numbers to the right** using the same Two Pointer logic.

---

## 📌 Summary of Algorithms Used

| Problem                     | Algorithm / Technique                             |
| --------------------------- | ------------------------------------------------- |
| Sum of array                | Accumulator variable outside loop                 |
| Find Maximum                | Linear scan + track running max                   |
| Find Second Maximum         | Linear scan + two tracked variables + corner case |
| Reverse Array (extra space) | Two pointers, new array                           |
| Reverse Array (in-place)    | Two pointers, swap from both ends                 |
| Move 0s left, 1s right      | Two Pointer (i = checker, j = placer)             |

---

_Notes prepared from: Shyam Coding School — DSA Series (Arrays)_
