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

---

# 📚 DSA — Advanced Arrays: Logic Notes (Part 2)

> Based on Shyam Coding School — DSA Series | Advanced Arrays & Named Algorithms

---

## 🔁 Left Rotation by One Element

### Problem:

Shift every element one position to the left. The first element wraps around to the last position.

`[1, 2, 3, 4, 5]` → `[2, 3, 4, 5, 1]`

### Logic:

- The first element (`arr[0]`) will be lost during shifting → **save a copy of it first**.
- For every index `i`, place the element from `i+1` into index `i`.
- Stop at index `length - 2` (second last), because the last element has no `i+1` to pull from.
- After the loop, place the saved copy at the **last index**.

```
Step 1: copy = arr[0]
Step 2: Loop i from 0 to length - 2:
            arr[i] = arr[i + 1]
Step 3: arr[length - 1] = copy
```

---

## 🔁 Right Rotation by One Element

### Problem:

Shift every element one position to the right. The last element wraps to the first position.

`[1, 2, 3, 4, 5]` → `[5, 1, 2, 3, 4]`

### Logic:

- The last element will be lost → **save a copy of it first**.
- Traverse from the **last index backwards** to index 1.
- For every index `i`, place the element from `i-1` into index `i`.
- Stop at index `1` (we never go to index 0 because `i-1` would be `-1` — out of bounds).
- After the loop, place the saved copy at **index 0**.

```
Step 1: copy = arr[length - 1]
Step 2: Loop i from length - 1 down to 1:
            arr[i] = arr[i - 1]
Step 3: arr[0] = copy
```

---

## 🔢 Nested Loops (Concept)

### What is it?

A loop inside another loop. Used when you have a **repeated task that itself contains a repeated sub-task**.

### How it works:

- The **outer loop** runs its full count.
- For **each iteration** of the outer loop, the **inner loop** runs its full count from scratch.
- Inner loop variables reset on every new outer loop iteration.

```
Outer loop runs 4 times
  → Each time, Inner loop runs 3 times
  → Total executions = 4 × 3 = 12
```

---

## 🔁 Left Rotation by K Elements (Brute Force — O(n²))

### Problem:

Rotate every element left by `k` steps (user-defined).

### Logic:

- Reuse the **Left Rotation by One** logic, but run it `k` times using an outer loop.
- The inner loop does one full left rotation.
- The outer loop runs it `k` times.

### ⚠️ Important Edge Case — Modulo:

If `k >= array length`, some rotations cancel out. E.g., rotating a 5-element array 5 times = no change.

```
k = k % arr.length   ← normalize k before starting
```

```
Step 1: k = k % arr.length
Step 2: Outer loop runs k times:
            (perform one full left rotation by 1 step)
```

> **Why O(n²)?** Inner loop (length n) runs inside outer loop (k times) → n × k.

---

## 🔁 Left Rotation by K Elements (Efficient — O(n), With Extra Space)

### Logic:

Use the formula: **element at index `i` should go to index `(i + k) % length`** in a new temporary array.

```
Step 1: Create temp array of same length
Step 2: Loop i from 0 to length - 1:
            temp[i] = arr[(i + k) % arr.length]
Step 3: temp is your answer
```

### Dry Run (arr = [1,2,3,4,5], k = 2):

- `temp[0]` = `arr[(0+2)%5]` = `arr[2]` = **3**
- `temp[1]` = `arr[(1+2)%5]` = `arr[3]` = **4**
- `temp[2]` = `arr[(2+2)%5]` = `arr[4]` = **5**
- `temp[3]` = `arr[(3+2)%5]` = `arr[0]` = **1**
- `temp[4]` = `arr[(4+2)%5]` = `arr[1]` = **2**

**Result: [3, 4, 5, 1, 2]** ✅

> **Downside:** Uses O(n) extra space.

---

## 🔁 Left Rotation by K Elements (Most Efficient — O(n), No Extra Space)

### Algorithm: Reverse Block Swap (Named Algorithm)

### Idea:

For `arr = [1,2,3,4,5]` with `k = 2`, answer is `[3,4,5,1,2]`.
Notice: the first 2 elements moved to the end. Use 3 reverse operations.

```
Step 1: Reverse arr[0 to k-1]       → [2, 1, 3, 4, 5]
Step 2: Reverse arr[k to length-1]  → [2, 1, 5, 4, 3]
Step 3: Reverse entire array        → [3, 4, 5, 1, 2] ✅
```

> **For Right Rotation:** Same idea, just apply the full reverse first, then sub-reverses.
> Right rotation steps: Reverse all → Reverse [0 to k-1] → Reverse [k to length-1]

---

## 🗑️ Remove Duplicates from Sorted Array (LeetCode 26)

### Problem:

Given a **sorted** array, remove duplicates **in-place** so each unique element appears only once. Return the count of unique elements.

### Logic (Two Pointer):

- `j` starts at index 1 → marks where the **next unique element should be placed**.
- `i` starts at index 0 → scans every element.
- When `arr[i] !== arr[i+1]` → a new unique element is found at `i+1`. Place it at `arr[j]`, then `j++`.
- Stop loop at `length - 2` (last element has no `i+1` to compare).
- Return `j` (which equals the count of unique elements).

```
Step 1: j = 1
Step 2: Loop i from 0 to length - 2:
            if arr[i] !== arr[i + 1]:
                arr[j] = arr[i + 1]
                j++
Step 3: return j
```

---

## 🔀 Merge Two Sorted Arrays

### Problem:

Given two sorted arrays, merge them into one sorted array.

### Logic (Two Pointer):

- Create a `merged` array of combined length.
- Use `i` (pointer for arr1), `j` (pointer for arr2), `k` (pointer for merged).
- **While both are in range:** compare `arr1[i]` and `arr2[j]`, place the smaller into `merged[k]`, advance the used pointer and `k`.
- **Leftover:** if `i` exhausted, copy remaining `arr2` elements; if `j` exhausted, copy remaining `arr1` elements.

```
Step 1: i = 0, j = 0, k = 0
Step 2: While i < arr1.length AND j < arr2.length:
            if arr1[i] <= arr2[j]:
                merged[k] = arr1[i]; i++; k++
            else:
                merged[k] = arr2[j]; j++; k++
Step 3: While i < arr1.length: merged[k] = arr1[i]; i++; k++
Step 4: While j < arr2.length: merged[k] = arr2[j]; j++; k++
```

---

## 📈 Best Time to Buy and Sell Stock (LeetCode 121)

### Problem:

Given an array of prices (price on each day), find the **maximum profit** from one buy-sell transaction. Return 0 if no profit possible.

### Key Insight:

Maximum profit = (highest future price) − (lowest past price). So track the **running minimum** as you scan forward, and compute profit at each step.

### Logic:

```
Step 1: maxProfit = 0
Step 2: minElement = prices[0]
Step 3: Loop i from 0 to length - 1:
            if prices[i] < minElement:
                minElement = prices[i]     ← found a cheaper buy price
            profit = prices[i] - minElement
            if profit > maxProfit:
                maxProfit = profit         ← update best profit seen so far
Step 4: return maxProfit
```

### Dry Run (prices = [7,1,5,3,6,4]):

| i   | price | minElement | profit | maxProfit |
| --- | ----- | ---------- | ------ | --------- |
| 0   | 7     | 7          | 0      | 0         |
| 1   | 1     | 1          | 0      | 0         |
| 2   | 5     | 1          | 4      | 4         |
| 3   | 3     | 1          | 2      | 4         |
| 4   | 6     | 1          | 5      | 5         |
| 5   | 4     | 1          | 3      | 5         |

**Answer: 5** ✅

---

## 🎨 Sort Colors / Dutch National Flag (LeetCode 75)

### Problem:

Array contains only `0`, `1`, and `2`. Sort in-place so all 0s come first, then 1s, then 2s. No library sort allowed.

### Logic (Three Pointer):

- `i` → scanner (checks every element)
- `j` → "zero placer" (starts at 0, marks where next 0 should go)
- `k` → "two placer" (starts at last index, marks where next 2 should go)

| Current `arr[i]` | Action                                                   |
| ---------------- | -------------------------------------------------------- |
| `0`              | Swap `arr[i]` with `arr[j]`, then `i++` and `j++`        |
| `1`              | Do nothing, just `i++`                                   |
| `2`              | Swap `arr[i]` with `arr[k]`, then `k--` only (NOT `i++`) |

### ⚠️ Why not increment `i` when swapping with `k`?

Because the element swapped from `k` to `i` is unknown — it might be a `0` that still needs to be moved left. So `i` stays and re-checks.

```
Step 1: i = 0, j = 0, k = length - 1
Step 2: While i <= k:
            if arr[i] == 0: swap(arr[i], arr[j]); i++; j++
            else if arr[i] == 2: swap(arr[i], arr[k]); k--
            else: i++
```

---

## ➕ Maximum Subarray — Kadane's Algorithm (LeetCode 53)

### Problem:

Find the subarray (contiguous part of array) with the **largest sum**. Return that sum.

### Key Concept — Subarray:

A **subarray** is a contiguous, ordered slice of the array (not random elements).

### Algorithm: Kadane's Algorithm (Named)

```
Step 1: sum = 0
Step 2: max = -Infinity   ← NOT zero (handles all-negative arrays)
Step 3: Loop through each element:
            a) sum = sum + currentElement     ← add current to running sum
            b) if sum > max: max = sum        ← update max if better
            c) if sum < 0: sum = 0            ← reset sum to 0 if negative
Step 4: return max
```

### Why reset sum to 0 when negative?

If running sum goes negative, carrying it forward only **reduces** future sums. Start fresh from 0 so any upcoming positive element gives the full benefit.

### Why `max = -Infinity` (not 0)?

If all elements are negative, the answer is also negative. Starting with 0 would give a wrong answer.

### Dry Run (arr = [-2,1,-3,4,-1,2,1,-5,4]):

Best subarray is `[4,-1,2,1]` with sum **6** ✅

---

## 🗳️ Majority Element — Moore's Voting Algorithm (LeetCode 169)

### Problem:

Find the element that appears **more than n/2 times** in the array. Guaranteed to exist.

### Algorithm: Moore's Voting Algorithm (Named)

### Key Insight:

The majority element "survives" cancellation. Every time it appears, count goes up. Every time a different element appears, count goes down. When count hits 0, reset the candidate.

```
Step 1: answer = arr[0], count = 1
Step 2: Loop i from 1 to length - 1:
            if count == 0:
                answer = arr[i]    ← new candidate
                count = 1
            else if arr[i] == answer:
                count++            ← same element, strengthen
            else:
                count--            ← different element, weaken
Step 3: return answer
```

### Dry Run (arr = [2,2,1,1,1,2,2]):

| i   | arr[i] | answer | count |
| --- | ------ | ------ | ----- |
| -   | -      | 2      | 1     |
| 1   | 2      | 2      | 2     |
| 2   | 1      | 2      | 1     |
| 3   | 1      | 2      | 0     |
| 4   | 1      | 1      | 1     |
| 5   | 2      | 1      | 0     |
| 6   | 2      | 2      | 1     |

**Answer: 2** ✅

---

## 🌧️ Trapping Rain Water (LeetCode 42)

### Problem:

Given an array of bar heights (each width = 1), calculate how much water can be trapped after rain.

### Key Insight:

Water above any single bar = `min(maxLeft, maxRight) - currentHeight`

Where `maxLeft` = highest bar to the left (including self), `maxRight` = highest bar to the right (including self).

If this value is negative, no water sits on that bar (it's taller than its boundaries).

### Logic (Precompute Left/Right Max Arrays):

```
Step 1: Build leftMax[] array:
        leftMax[0] = height[0]
        Loop i from 1 to length - 1:
            leftMax[i] = max(leftMax[i-1], height[i])

Step 2: Build rightMax[] array:
        rightMax[length-1] = height[length-1]
        Loop i from length-2 down to 0:
            rightMax[i] = max(rightMax[i+1], height[i])

Step 3: ans = 0
        Loop i from 0 to length - 1:
            water = min(leftMax[i], rightMax[i]) - height[i]
            ans += water

Step 4: return ans
```

### Dry Run (height = [4, 2, 0, 3, 2, 5]):

| i   | height | leftMax | rightMax | min(L,R) | water |
| --- | ------ | ------- | -------- | -------- | ----- |
| 0   | 4      | 4       | 5        | 4        | 0     |
| 1   | 2      | 4       | 5        | 4        | 2     |
| 2   | 0      | 4       | 5        | 4        | 4     |
| 3   | 3      | 4       | 5        | 4        | 1     |
| 4   | 2      | 4       | 5        | 4        | 2     |
| 5   | 5      | 5       | 5        | 5        | 0     |

**Total: 0+2+4+1+2+0 = 9** ✅

---

## 📌 Summary of All Algorithms — Part 2

| Problem                    | Algorithm / Technique                 |
| -------------------------- | ------------------------------------- |
| Left/Right Rotation by 1   | Save copy, shift elements, place copy |
| Rotation by K (Brute)      | Nested loop — O(n²)                   |
| Rotation by K (With Space) | Formula: `(i + k) % length`           |
| Rotation by K (Optimal)    | Reverse Block Swap — O(n), O(1) space |
| Remove Duplicates          | Two Pointer (sorted array)            |
| Merge Sorted Arrays        | Two Pointer merge                     |
| Best Time to Buy/Sell      | Running minimum + max profit          |
| Sort Colors                | Dutch National Flag (3 pointers)      |
| Maximum Subarray           | **Kadane's Algorithm**                |
| Majority Element           | **Moore's Voting Algorithm**          |
| Trapping Rain Water        | Precompute leftMax + rightMax arrays  |

---

> 🏠 **Homework from this lecture:**
>
> 1. Right Rotation by K steps — O(n²) version
> 2. Right Rotation by K steps — Reverse Block Swap version
> 3. Right Rotation by K steps — with extra space (formula-based)
> 4. Sort Colors — implement from the pseudocode (no code was given)
> 5. LeetCode 122: Best Time to Buy and Sell Stock II
> 6. LeetCode 88: Merge Sorted Array (in-place, no extra array)

---

_Notes prepared from: Shyam Coding School — DSA Series (Advanced Arrays)_
