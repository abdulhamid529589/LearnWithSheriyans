# 📘 DSA Series — Lecture 09

# 🔃 Sorting Algorithms — Bubble Sort, Selection Sort & Insertion Sort

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 09 — Sorting Algorithms

---

## 📌 Table of Contents

1. [What is Sorting?](#1-what-is-sorting)
2. [Bubble Sort](#2-bubble-sort)
   - [Core Concept](#21-core-concept)
   - [Step-by-Step Dry Run](#22-step-by-step-dry-run)
   - [Code Implementation](#23-code-implementation)
   - [Time & Space Complexity](#24-time--space-complexity)
3. [Selection Sort](#3-selection-sort)
   - [Core Concept](#31-core-concept)
   - [Step-by-Step Dry Run](#32-step-by-step-dry-run)
   - [Code Implementation](#33-code-implementation)
   - [Time & Space Complexity](#34-time--space-complexity)
4. [Insertion Sort](#4-insertion-sort)
   - [Core Concept](#41-core-concept)
   - [Step-by-Step Dry Run](#42-step-by-step-dry-run)
   - [Code Implementation](#43-code-implementation)
   - [Time & Space Complexity](#44-time--space-complexity)
5. [Comparison of All Three](#5-comparison-of-all-three)
6. [Complete Cheat Sheet](#6-complete-cheat-sheet)
7. [Practice Exercises](#7-practice-exercises)

---

## 1. What is Sorting?

**Sorting** = Arranging elements of an array in a specific order (ascending or descending).

### What can be sorted?

- Array of Integers: `[10, 5, 1, 12, 3]` → `[1, 3, 5, 10, 12]`
- Array of Strings: `["banana", "apple", "cherry"]` → `["apple", "banana", "cherry"]`
- Array of Characters, Floats, Objects — basically anything comparable

### Sorting Orders

| Order          | Meaning            | Example             |
| -------------- | ------------------ | ------------------- |
| **Ascending**  | Smallest → Largest | `[1, 3, 5, 10, 12]` |
| **Descending** | Largest → Smallest | `[12, 10, 5, 3, 1]` |

> 📌 **Default throughout these notes:** We sort in **Ascending Order** unless stated otherwise.

### Why Learn These Basic Sorting Algorithms?

1. **Interview questions** — Interviewers directly ask: "How does Insertion Sort work?"
2. **Foundation** — Concepts from these algorithms are used in advanced DSA problems
3. **Understanding complexity** — These clearly demonstrate O(N²) behavior
4. **In-place sorting** — They sort without needing extra arrays

---

## 2. Bubble Sort

### 2.1 Core Concept

> **Bubble Sort** works by repeatedly pushing the **largest unsorted element** to its correct position at the **end** of the array — one element per pass (phase).

### Key Terminology

| Term               | Meaning                                          |
| ------------------ | ------------------------------------------------ |
| **Bubble Element** | The element currently being compared and moved   |
| **Phase / Pass**   | One complete scan of the unsorted portion        |
| **Swap**           | Exchange two adjacent elements                   |
| **Pass**           | Move the bubble element forward without swapping |

### The Fundamental Rule

```
At each step, compare the bubble element with its RIGHT neighbor:
  ↓
  If bubble element > right neighbor  →  SWAP them
  If bubble element < right neighbor  →  PASS (move bubble forward, no swap)
```

### How Many Phases?

- If array has **N elements** → we need **N-1 phases**
- **Why N-1?** If you correctly place N-1 elements, the last one is automatically in place
- Each phase places exactly **one element** at its correct final position (always the largest of the remaining unsorted portion)

### Connection to Pattern Programming

Think of it like a **right-angle triangle pattern** in reverse:

```
Phase 1:  ■ ■ ■ ■   (N-1 operations)
Phase 2:  ■ ■ ■     (N-2 operations)
Phase 3:  ■ ■       (N-3 operations)
Phase 4:  ■         (N-4 operations)
```

- **Outer loop** → controls the **phases** (like rows in pattern)
- **Inner loop** → controls the **operations** within each phase (like columns)

---

### 2.2 Step-by-Step Dry Run

**Input Array:** `[10, 5, 1, 12, 3]`
**Goal:** Sort in ascending order

---

#### 🔁 Phase 1 (i = 0): Place the largest element at the end

Start with bubble at index 0 (element = 10):

```
[10, 5, 1, 12, 3]
  ↑
  Bubble = 10
```

**Step 1:** Compare 10 vs 5 → 10 > 5 → **SWAP**

```
[10, 5, 1, 12, 3]
 ↓
[5, 10, 1, 12, 3]
```

**Step 2:** Compare 10 vs 1 → 10 > 1 → **SWAP**

```
[5, 10, 1, 12, 3]
     ↓
[5, 1, 10, 12, 3]
```

**Step 3:** Compare 10 vs 12 → 10 < 12 → **PASS** (no swap, bubble moves forward)

```
[5, 1, 10, 12, 3]
         → no swap
```

**Step 4:** Compare 12 vs 3 → 12 > 3 → **SWAP**

```
[5, 1, 10, 12, 3]
              ↓
[5, 1, 10, 3, 12]
```

✅ **Phase 1 complete:** `12` is now at its correct position (index 4)

```
After Phase 1: [5, 1, 10, 3, | 12]
                               ↑ sorted
```

---

#### 🔁 Phase 2 (i = 1): Place the 2nd largest element

Work only on `[5, 1, 10, 3]` (ignore `12` — already sorted):

**Step 1:** Compare 5 vs 1 → 5 > 1 → **SWAP** → `[1, 5, 10, 3, 12]`
**Step 2:** Compare 5 vs 10 → 5 < 10 → **PASS**
**Step 3:** Compare 10 vs 3 → 10 > 3 → **SWAP** → `[1, 5, 3, 10, 12]`

✅ **Phase 2 complete:** `10` is at its correct position (index 3)

```
After Phase 2: [1, 5, 3, | 10, 12]
                            ↑  ↑ sorted
```

---

#### 🔁 Phase 3 (i = 2): Work on `[1, 5, 3]`

**Step 1:** Compare 1 vs 5 → 1 < 5 → **PASS**
**Step 2:** Compare 5 vs 3 → 5 > 3 → **SWAP** → `[1, 3, 5, 10, 12]`

✅ **Phase 3 complete:** `5` is at correct position (index 2)

```
After Phase 3: [1, 3, | 5, 10, 12]
```

---

#### 🔁 Phase 4 (i = 3): Work on `[1, 3]`

**Step 1:** Compare 1 vs 3 → 1 < 3 → **PASS**

✅ **Phase 4 complete:** `3` is at correct position (index 1), `1` is automatically at index 0

```
Final Array: [1, 3, 5, 10, 12] ✅
```

---

### 2.3 Code Implementation

```javascript
let arr = [10, 5, 12, 1, 3]
let n = arr.length

// Outer loop: controls phases (N-1 phases total)
for (let i = 0; i < n - 1; i++) {
  // Inner loop: controls comparisons within each phase
  // Each phase does one fewer comparison than the previous
  for (let j = 0; j < n - 1 - i; j++) {
    // If current element is greater than next → SWAP
    if (arr[j] > arr[j + 1]) {
      // Swap using temp variable
      let temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp
    }
    // If arr[j] <= arr[j+1] → do nothing, j++ moves to next comparison
  }
}

console.log(arr) // [1, 3, 5, 10, 12]
```

### Code Explanation

```
Outer loop: for (let i = 0; i < n - 1; i++)
  ↳ i = 0  →  Phase 1  →  inner loop runs (n-1) times
  ↳ i = 1  →  Phase 2  →  inner loop runs (n-2) times
  ↳ i = 2  →  Phase 3  →  inner loop runs (n-3) times
  ↳ i = 3  →  Phase 4  →  inner loop runs (n-4) times

Inner loop: for (let j = 0; j < n - 1 - i; j++)
  ↳ Decreases by 1 each phase because last i elements are already sorted
  ↳ n - 1 - i ensures we don't compare with already-sorted elements
```

### Why `j < n - 1 - i`?

| Phase (i)   | Inner Loop Condition | Runs how many times?  |
| ----------- | -------------------- | --------------------- |
| 0 (Phase 1) | `j < 5-1-0 = 4`      | 4 times (j = 0,1,2,3) |
| 1 (Phase 2) | `j < 5-1-1 = 3`      | 3 times (j = 0,1,2)   |
| 2 (Phase 3) | `j < 5-1-2 = 2`      | 2 times (j = 0,1)     |
| 3 (Phase 4) | `j < 5-1-3 = 1`      | 1 time (j = 0)        |

> ✅ Each phase does exactly one fewer comparison — because one more element is sorted.

---

### 2.4 Time & Space Complexity

#### Time Complexity Calculation

```
Phase 1 inner loop runs:  N-1 times
Phase 2 inner loop runs:  N-2 times
Phase 3 inner loop runs:  N-3 times
...
Phase N-1 inner loop runs: 1 time

Total operations = (N-1) + (N-2) + (N-3) + ... + 1
                 = Sum of first (N-1) natural numbers
                 = N(N-1)/2
                 = N²/2 - N/2
```

**Simplification:**

```
N²/2 - N/2
→ Drop lower degree term: -N/2
→ Drop constant: 1/2
→ Final: N²
```

| Case                       | Time Complexity          |
| -------------------------- | ------------------------ |
| Best Case (already sorted) | O(N) ← with optimization |
| Average Case               | O(N²)                    |
| **Worst Case**             | **O(N²)**                |

#### Space Complexity

```
Only a temp variable used for swapping → No extra array → O(1)
```

| Metric               | Value                                        |
| -------------------- | -------------------------------------------- |
| **Time Complexity**  | **O(N²)**                                    |
| **Space Complexity** | **O(1)**                                     |
| **Sorting Type**     | In-place                                     |
| **Stable**           | Yes (equal elements maintain relative order) |

---

## 3. Selection Sort

### 3.1 Core Concept

> **Selection Sort** works by dividing the array into two parts: a **sorted part** (left) and an **unsorted part** (right). In each pass, it **selects the minimum element** from the unsorted part and **swaps it** with the first element of the unsorted part — growing the sorted section by one each time.

### Key Idea Visualized

```
Initially:
[ 10 | 5 | 1 | 12 | 9 ]
  unsorted part = entire array
  sorted part   = empty

After pass 1 (placed minimum=1 at front):
[ 1 | 5 | 10 | 12 | 9 ]
  ↑     ↑
sorted  unsorted

After pass 2 (placed minimum=5 at position 1):
[ 1 | 5 | 10 | 12 | 9 ]
  ↑   ↑    ↑
sorted(2)  unsorted

...and so on
```

### The Algorithm — Step by Step

```
1. i pointer starts at index 0
2. Assume arr[i] is the minimum (minIndex = i)
3. j pointer starts at i+1 and scans the rest (unsorted part)
4. If arr[j] < arr[minIndex] → update minIndex = j
5. After j finishes scanning: if minIndex ≠ i → SWAP arr[i] and arr[minIndex]
6. i++ (sorted part grows by 1)
7. Repeat until i reaches n-1
```

### Critical Insight — Work with Index, Not Element

> ⚠️ We don't carry the element around — we **track the INDEX** of the minimum.
> Why? Because to swap, you need the **position (index)**, not just the value.

```
minIndex = i          ← start by assuming arr[i] is minimum
for j from i+1 to n:
    if arr[j] < arr[minIndex]:
        minIndex = j  ← update: j is the new minimum index

swap(arr[i], arr[minIndex])  ← uses indices to swap
```

---

### 3.2 Step-by-Step Dry Run

**Input Array:** `[10, 5, 1, 12, 9]`

---

#### 🔁 Pass 1 (i = 0)

```
Sorted:   []
Unsorted: [10, 5, 1, 12, 9]
```

- Assume `minIndex = 0` (element = 10)
- j = 1: arr[1] = 5 < arr[0] = 10 → update `minIndex = 1`
- j = 2: arr[2] = 1 < arr[1] = 5 → update `minIndex = 2`
- j = 3: arr[3] = 12 > arr[2] = 1 → no change
- j = 4: arr[4] = 9 > arr[2] = 1 → no change
- j finished. `minIndex = 2`, `i = 0` → `minIndex ≠ i` → **SWAP arr[0] and arr[2]**

```
[10, 5, 1, 12, 9]
  ↕        ↕
[1, 5, 10, 12, 9]

After Pass 1: [1 | 5, 10, 12, 9]
               ↑ sorted
```

---

#### 🔁 Pass 2 (i = 1)

```
Sorted:   [1]
Unsorted: [5, 10, 12, 9]
```

- Assume `minIndex = 1` (element = 5)
- j = 2: arr[2] = 10 > 5 → no change
- j = 3: arr[3] = 12 > 5 → no change
- j = 4: arr[4] = 9 > 5 → no change
- j finished. `minIndex = 1 = i` → **No swap needed** (already minimum)

```
After Pass 2: [1, 5 | 10, 12, 9]
                  ↑ sorted
```

---

#### 🔁 Pass 3 (i = 2)

```
Sorted:   [1, 5]
Unsorted: [10, 12, 9]
```

- Assume `minIndex = 2` (element = 10)
- j = 3: arr[3] = 12 > 10 → no change
- j = 4: arr[4] = 9 < 10 → update `minIndex = 4`
- j finished. `minIndex = 4`, `i = 2` → **SWAP arr[2] and arr[4]**

```
[1, 5, 10, 12, 9]
        ↕       ↕
[1, 5, 9, 12, 10]

After Pass 3: [1, 5, 9 | 12, 10]
```

---

#### 🔁 Pass 4 (i = 3)

```
Sorted:   [1, 5, 9]
Unsorted: [12, 10]
```

- Assume `minIndex = 3` (element = 12)
- j = 4: arr[4] = 10 < 12 → update `minIndex = 4`
- j finished. **SWAP arr[3] and arr[4]**

```
[1, 5, 9, 12, 10]
           ↕   ↕
[1, 5, 9, 10, 12]

Final: [1, 5, 9, 10, 12] ✅
```

Last element (12) is automatically at its correct position.

---

### 3.3 Code Implementation

```javascript
let arr = [10, 5, 1, 12, 9]
let n = arr.length

// Outer loop: i represents the boundary of sorted/unsorted parts
// Runs N-1 times (last element automatically sorted)
for (let i = 0; i < n - 1; i++) {
  // Assume current position has the minimum element
  let minIndex = i

  // Inner loop: scan the entire unsorted part (i+1 to end)
  for (let j = i + 1; j < n; j++) {
    // If a smaller element found, update minIndex
    if (arr[minIndex] > arr[j]) {
      minIndex = j
    }
  }

  // Only swap if minimum is not already at position i
  if (minIndex !== i) {
    let temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
}

console.log(arr) // [1, 5, 9, 10, 12]
```

### Code Explanation

```
Outer loop (i): moves the sorted/unsorted boundary
  ↳ i = 0: find minimum in [0..4], place at index 0
  ↳ i = 1: find minimum in [1..4], place at index 1
  ↳ i = 2: find minimum in [2..4], place at index 2
  ↳ i = 3: find minimum in [3..4], place at index 3
  ↳ i = 4: only one element left → automatically sorted (loop stops at n-1)

Inner loop (j): starts at i+1 to scan unsorted portion
  ↳ Finds the INDEX of the minimum element in unsorted portion

if (minIndex !== i): avoids unnecessary swap when minimum is already at i
```

> 💡 **Why start j at i+1?**
> Because we already assumed arr[i] is the minimum. No need to compare with itself.

---

### 3.4 Time & Space Complexity

#### Time Complexity Calculation

```
Pass 1 (i=0): j scans [1..n-1] → N-1 comparisons
Pass 2 (i=1): j scans [2..n-1] → N-2 comparisons
Pass 3 (i=2): j scans [3..n-1] → N-3 comparisons
...
Pass N-1:                        → 1 comparison

Total = (N-1) + (N-2) + ... + 1 = N(N-1)/2 ≈ N²
```

| Case           | Time Complexity                         |
| -------------- | --------------------------------------- |
| Best Case      | O(N²) ← always scans full unsorted part |
| Average Case   | O(N²)                                   |
| **Worst Case** | **O(N²)**                               |

> ⚠️ **Selection Sort has NO best-case optimization** — it always scans the full unsorted portion, even if already sorted. This is different from Bubble Sort (which can be optimized for sorted arrays).

| Metric               | Value                                    |
| -------------------- | ---------------------------------------- |
| **Time Complexity**  | **O(N²)**                                |
| **Space Complexity** | **O(1)**                                 |
| **Sorting Type**     | In-place                                 |
| **Stable**           | No (swapping can disturb relative order) |

---

## 4. Insertion Sort

### 4.1 Core Concept

> **Insertion Sort** builds a sorted array **one element at a time** by taking each element from the unsorted part and **inserting it into its correct position** in the sorted part — by shifting elements to the right to make room.

### Real-Life Analogy — Playing Cards 🃏

Imagine you're picking up cards one by one:

- Your hand is the **sorted part**
- The deck is the **unsorted part**
- Each time you pick a new card, you slide it into the right position in your hand

```
Hand (sorted): [2, 7, 10]
Pick new card: 5
→ 10 > 5: shift 10 right  → [2, 7, ?, 10]
→  7 > 5: shift 7 right   → [2, ?, 7, 10]
→  2 < 5: STOP. Insert 5  → [2, 5, 7, 10]
```

### Key Terminology

| Term          | Meaning                                                      |
| ------------- | ------------------------------------------------------------ |
| **Key**       | The current element being inserted (`arr[i]`)                |
| **i pointer** | Starts at index 1, moves right (picks next unsorted element) |
| **j pointer** | Starts at i-1, moves left (scans sorted part)                |
| **Shift**     | Moving arr[j] to arr[j+1] to make space                      |

### The Algorithm — Step by Step

```
1. Start i at index 1 (index 0 is trivially sorted)
2. key = arr[i]  (element to be inserted)
3. j = i - 1    (start comparing from the end of sorted part)
4. While (j >= 0 AND arr[j] > key):
      arr[j + 1] = arr[j]   ← shift arr[j] one position right
      j--                    ← move j left
5. arr[j + 1] = key         ← insert key at correct position
6. i++  →  repeat
```

### Why Two Stop Conditions for the While Loop?

```
while (j >= 0 AND arr[j] > key)
```

**Condition 1: `j >= 0`**

- Prevents going to index -1 (which doesn't exist → crash)
- Stop when we've scanned the entire sorted portion

**Condition 2: `arr[j] > key`**

- The sorted part is in order; once we find an element ≤ key, we've found the correct insertion point
- No need to go further left

### After the While Loop

When the loop exits, `j + 1` is always the correct position for `key`:

- Either j reached -1 (key is smallest → insert at index 0 = j+1 = 0)
- Or arr[j] ≤ key (found the right neighbor → insert at j+1)

---

### 4.2 Step-by-Step Dry Run

**Input Array:** `[10, 5, 1, 8, 13, 7]`

---

#### 🔁 Pass 1 (i = 1): Insert arr[1] = 5 into sorted part [10]

```
Sorted part: [10]     Key: 5
j = 0
```

- j >= 0 ✅ AND arr[0] = 10 > key = 5 ✅ → **Shift**: arr[1] = arr[0] = 10
  ```
  [10, 10, 1, 8, 13, 7]
  ```
- j-- → j = -1
- j >= 0 ❌ → **STOP**
- `arr[j+1] = arr[0] = key = 5` → **Insert 5 at index 0**
  ```
  [5, 10, 1, 8, 13, 7]
  ```

✅ Sorted part: `[5, 10]`

---

#### 🔁 Pass 2 (i = 2): Insert arr[2] = 1 into sorted part [5, 10]

```
Sorted part: [5, 10]     Key: 1
j = 1
```

- j=1: arr[1]=10 > 1 ✅ → **Shift**: arr[2] = 10 → `[5, 10, 10, 8, 13, 7]`, j=0
- j=0: arr[0]=5 > 1 ✅ → **Shift**: arr[1] = 5 → `[5, 5, 10, 8, 13, 7]`, j=-1
- j=-1 ❌ → **STOP**
- Insert: arr[0] = 1 → `[1, 5, 10, 8, 13, 7]`

✅ Sorted part: `[1, 5, 10]`

---

#### 🔁 Pass 3 (i = 3): Insert arr[3] = 8 into sorted part [1, 5, 10]

```
Sorted part: [1, 5, 10]     Key: 8
j = 2
```

- j=2: arr[2]=10 > 8 ✅ → **Shift**: arr[3] = 10 → `[1, 5, 10, 10, 13, 7]`, j=1
- j=1: arr[1]=5 > 8 ❌ (5 is NOT > 8) → **STOP**
- Insert: arr[j+1] = arr[2] = 8 → `[1, 5, 8, 10, 13, 7]`

✅ Sorted part: `[1, 5, 8, 10]`

---

#### 🔁 Pass 4 (i = 4): Insert arr[4] = 13 into sorted part [1, 5, 8, 10]

```
Sorted part: [1, 5, 8, 10]     Key: 13
j = 3
```

- j=3: arr[3]=10 > 13 ❌ (10 is NOT > 13) → **STOP immediately**
- Insert: arr[j+1] = arr[4] = 13 → no shift needed, 13 stays in place

✅ Sorted part: `[1, 5, 8, 10, 13]`

---

#### 🔁 Pass 5 (i = 5): Insert arr[5] = 7 into sorted part [1, 5, 8, 10, 13]

```
Sorted part: [1, 5, 8, 10, 13]     Key: 7
j = 4
```

- j=4: arr[4]=13 > 7 ✅ → **Shift**: arr[5] = 13, j=3
- j=3: arr[3]=10 > 7 ✅ → **Shift**: arr[4] = 10, j=2
- j=2: arr[2]=8 > 7 ✅ → **Shift**: arr[3] = 8, j=1
- j=1: arr[1]=5 > 7 ❌ → **STOP**
- Insert: arr[j+1] = arr[2] = 7

```
After: [1, 5, 7, 8, 10, 13] ✅
```

**Final Sorted Array: `[1, 5, 7, 8, 10, 13]`** ✅

---

### 4.3 Code Implementation

```javascript
let arr = [10, 5, 1, 8, 13, 7]
let n = arr.length

// Outer loop: i starts at 1 (index 0 is trivially a sorted array of 1 element)
for (let i = 1; i < n; i++) {
  let key = arr[i] // element to be inserted into sorted part
  let j = i - 1 // start from the end of the sorted portion

  // Shift elements that are greater than key one position to the right
  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j] // shift arr[j] right by 1
    j-- // move j left
  }

  // j+1 is now the correct position for key
  arr[j + 1] = key
}

console.log(arr) // [1, 5, 7, 8, 10, 13]
```

### Code Explanation — Detailed

```
Outer loop: i goes from 1 to n-1
  ↳ i=1: take arr[1], insert into [arr[0]]
  ↳ i=2: take arr[2], insert into [arr[0]..arr[1]]
  ↳ i=3: take arr[3], insert into [arr[0]..arr[2]]
  ↳ ...

key = arr[i]:
  ↳ Save current element before it gets overwritten by shifts
  ↳ This is the element we're "holding in our hand"

j = i - 1:
  ↳ Start from the last element of the sorted portion

while (j >= 0 && arr[j] > key):
  ↳ j >= 0   : don't go out of bounds (stop at index 0)
  ↳ arr[j] > key : stop when we find an element <= key (correct position found)

arr[j + 1] = arr[j]:
  ↳ Shift element right to make room
  ↳ Note: this OVERWRITES arr[j+1], but we saved the original in 'key'

j--:
  ↳ Move pointer left to compare next element

arr[j + 1] = key:
  ↳ After loop exits, j+1 is the correct insert position
  ↳ Place the key there
```

### The `j+1` Is Always Correct — Why?

```
Case 1: Loop exited because j < 0
  → j = -1, so j+1 = 0
  → key is the smallest → place at index 0 ✅

Case 2: Loop exited because arr[j] <= key
  → Found an element smaller than or equal to key
  → key should go RIGHT AFTER it → position j+1 ✅
```

---

### 4.4 Time & Space Complexity

| Case             | Condition                                        | Time Complexity |
| ---------------- | ------------------------------------------------ | --------------- |
| **Best Case**    | Array already sorted — while loop never executes | **O(N)**        |
| **Average Case** | Random order                                     | **O(N²)**       |
| **Worst Case**   | Array sorted in reverse                          | **O(N²)**       |

> 💡 **Insertion Sort's Best Case is O(N)** — better than Bubble Sort and Selection Sort in best case!
> When the array is already sorted, each element is already in the right place. The while loop immediately exits (because arr[j] <= key always), and the outer loop just runs N times doing nothing significant.

#### Worst Case Calculation

```
Pass 1: j shifts 1 time
Pass 2: j shifts 2 times
Pass 3: j shifts 3 times
...
Pass N-1: j shifts N-1 times

Total shifts = 1 + 2 + 3 + ... + (N-1) = N(N-1)/2 ≈ N²
```

| Metric                          | Value                                        |
| ------------------------------- | -------------------------------------------- |
| **Time Complexity (Worst/Avg)** | **O(N²)**                                    |
| **Time Complexity (Best)**      | **O(N)**                                     |
| **Space Complexity**            | **O(1)**                                     |
| **Sorting Type**                | In-place                                     |
| **Stable**                      | Yes (equal elements maintain relative order) |

---

## 5. Comparison of All Three

### Side-by-Side Algorithm Comparison

| Feature           | Bubble Sort                       | Selection Sort                   | Insertion Sort                       |
| ----------------- | --------------------------------- | -------------------------------- | ------------------------------------ |
| **Strategy**      | Repeatedly swap adjacent elements | Select minimum, place at front   | Insert element into correct position |
| **Passes**        | N-1                               | N-1                              | N-1                                  |
| **Key Operation** | Adjacent comparison & swap        | Find min index in unsorted, swap | Shift & insert                       |
| **Inner Loop**    | Shrinks each phase                | Always scans full unsorted       | Shrinks (best case exits early)      |
| **Worst TC**      | O(N²)                             | O(N²)                            | O(N²)                                |
| **Best TC**       | O(N) ← with flag                  | O(N²)                            | **O(N)** ← natural                   |
| **Avg TC**        | O(N²)                             | O(N²)                            | O(N²)                                |
| **Space**         | O(1)                              | O(1)                             | O(1)                                 |
| **Stable?**       | ✅ Yes                            | ❌ No                            | ✅ Yes                               |
| **Adaptive?**     | ✅ Yes (with flag)                | ❌ No                            | ✅ Yes                               |

### Visual Strategy Comparison

```
BUBBLE SORT — pushes large elements to the right:
[10, 5, 1, 12, 3]
 →  →  →  →  ← (10 bubbles to end)
     →  →  ← (5 bubbles toward end)

SELECTION SORT — pulls small elements to the left:
[10, 5, 1, 12, 9]
      ↑ (find min=1, swap with arr[0])
         ↑ (find min=5, swap with arr[1])

INSERTION SORT — inserts from left, shifting right:
[10 | 5, 1, 12, 3]
     ↑ take 5, shift 10 right, insert 5
[5, 10 | 1, 12, 3]
          ↑ take 1, shift 10,5 right, insert 1
```

### When to Use Which?

| Situation                         | Best Choice             | Reason                                                           |
| --------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| Nearly sorted array               | **Insertion Sort**      | O(N) best case — exits early                                     |
| Small array (N < 20)              | Any of the three        | Difference negligible                                            |
| Need stable sort                  | **Bubble or Insertion** | Selection Sort is not stable                                     |
| Teaching/learning                 | **Bubble Sort**         | Most intuitive to understand                                     |
| All three are basically equal for | **Large N**             | All O(N²) — use better algorithms (Merge/Quick Sort) for large N |

---

## 6. Complete Cheat Sheet

### Algorithm Summary Cards

```
╔══════════════════════════════════════════════════════════════════╗
║                        BUBBLE SORT                               ║
╠══════════════════════════════════════════════════════════════════╣
║  Strategy:   Push largest element to end each pass              ║
║  Rule:       if arr[j] > arr[j+1] → SWAP                        ║
║  Outer loop: i from 0 to n-2  (n-1 passes)                      ║
║  Inner loop: j from 0 to n-2-i  (shrinks by 1 each pass)        ║
║  Time:       O(N²)    Space: O(1)    Stable: Yes                 ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║                      SELECTION SORT                              ║
╠══════════════════════════════════════════════════════════════════╣
║  Strategy:   Find minimum in unsorted part, swap to front        ║
║  Rule:       if arr[j] < arr[minIndex] → minIndex = j            ║
║  Outer loop: i from 0 to n-2  (n-1 passes)                      ║
║  Inner loop: j from i+1 to n-1  (scan full unsorted part)       ║
║  Extra var:  minIndex (tracks index of minimum found so far)     ║
║  Time:       O(N²)    Space: O(1)    Stable: No                  ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║                      INSERTION SORT                              ║
╠══════════════════════════════════════════════════════════════════╣
║  Strategy:   Insert each element into correct place in sorted   ║
║  Rule:       while arr[j] > key → shift arr[j] to arr[j+1]      ║
║  Outer loop: i from 1 to n-1                                     ║
║  Inner:      while loop with j = i-1 going left                  ║
║  Stop when:  j < 0  OR  arr[j] <= key                            ║
║  Insert:     arr[j+1] = key                                      ║
║  Time:       O(N²) worst, O(N) best    Space: O(1)    Stable: Yes║
╚══════════════════════════════════════════════════════════════════╝
```

### Complexity Summary Table

```
╔═══════════════════╦═══════════╦═══════════╦═══════════╦═════════╗
║ Algorithm         ║ Best      ║ Average   ║ Worst     ║ Space   ║
╠═══════════════════╬═══════════╬═══════════╬═══════════╬═════════╣
║ Bubble Sort       ║ O(N)      ║ O(N²)     ║ O(N²)     ║ O(1)    ║
║ Selection Sort    ║ O(N²)     ║ O(N²)     ║ O(N²)     ║ O(1)    ║
║ Insertion Sort    ║ O(N)      ║ O(N²)     ║ O(N²)     ║ O(1)    ║
╚═══════════════════╩═══════════╩═══════════╩═══════════╩═════════╝
```

### Quick Memory Aid

```
Bubble Sort:
  "Adjacent swap — bubble the max to the right"
  if arr[j] > arr[j+1] → swap

Selection Sort:
  "Select the minimum — place it at front"
  minIndex → scan → swap(arr[i], arr[minIndex])

Insertion Sort:
  "Pick a card — slide it into your hand"
  key = arr[i] → shift bigger elements right → insert key
```

---

## 7. Practice Exercises

### Exercise 1 — Dry Run Practice

Manually trace through each algorithm with this array:

```
arr = [64, 25, 12, 22, 11]
```

Write each step, showing the array state after every comparison/swap.

**Expected Final Result:** `[11, 12, 22, 25, 64]`

---

### Exercise 2 — Code from Memory

Without looking at the notes, write:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort

Then verify by running with `arr = [5, 3, 8, 1, 9, 2]`.
**Expected:** `[1, 2, 3, 5, 8, 9]`

---

### Exercise 3 — Descending Order

Modify each sorting algorithm to sort in **descending order** instead of ascending.

> **Hint:** Change one comparison operator.
>
> - Bubble: `arr[j] > arr[j+1]` → `arr[j] < arr[j+1]`
> - Selection: find max instead of min
> - Insertion: `arr[j] > key` → `arr[j] < key`

---

### Exercise 4 — Count Swaps

Modify Bubble Sort to count the **total number of swaps** made and print it.

```javascript
// Starter:
let arr = [64, 34, 25, 12, 22, 11, 90]
let swapCount = 0
// ... your bubble sort code with swap counter
console.log('Total swaps:', swapCount)
```

---

### Exercise 5 — Optimized Bubble Sort

Bubble Sort can be optimized: if no swap is made during a full pass, the array is already sorted — stop early.

```javascript
// Implement with a flag:
let arr = [1, 2, 3, 4, 5] // already sorted

for (let i = 0; i < n - 1; i++) {
  let swapped = false
  for (let j = 0; j < n - 1 - i; j++) {
    if (arr[j] > arr[j + 1]) {
      // swap
      swapped = true
    }
  }
  if (!swapped) break // No swaps = already sorted → exit early
}
```

Test with `[1, 2, 3, 4, 5]` — should finish in just 1 pass!
This gives Bubble Sort its **O(N) best case**.

---

### Exercise 6 — Interview Questions

Practice answering these out loud (common interview questions):

1. "Explain how Bubble Sort works step by step."
2. "What is the time complexity of Selection Sort and why?"
3. "Why is Insertion Sort O(N) in the best case?"
4. "Which is more efficient — Bubble Sort or Selection Sort?"
5. "Is Insertion Sort stable? What does stable mean?"
6. "What happens in Insertion Sort when the array is already sorted?"
7. "Explain the difference between Selection Sort and Insertion Sort."

---

### Exercise 7 — Sort Strings

Apply Selection Sort to sort an array of strings alphabetically:

```javascript
let fruits = ['banana', 'apple', 'cherry', 'date', 'elderberry']
// Modify Selection Sort to work with strings
// Hint: Use comparison operators (< and >) — they work on strings too
```

---

## How to Study These Algorithms

```
Step 1: Understand the CONCEPT without code
        → Dry run on paper with a small array (5 elements)
        → Trace every comparison and swap by hand

Step 2: Map to CODE structure
        → Identify: what does outer loop control? inner loop?
        → Identify: what is the key variable? (minIndex, key, etc.)

Step 3: Write the CODE from scratch
        → Don't copy. Close the notes and type it.
        → Test with multiple arrays including edge cases

Step 4: Verify with a dry run
        → Run mentally through your code with the input
        → Match your mental output to actual output

Step 5: Analyze complexity
        → Count outer loop iterations
        → Count inner loop iterations per outer iteration
        → Calculate total using N(N-1)/2 formula
```

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 09_
_📌 Instructor: Ali Ansari_
_🔗 Practice: LeetCode | NeetCode.io | GeeksForGeeks_
