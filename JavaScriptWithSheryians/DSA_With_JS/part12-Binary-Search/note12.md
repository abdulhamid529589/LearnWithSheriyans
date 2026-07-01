# 📘 DSA Series — Lecture 12

# 🔍 Binary Search — The Fastest Searching Algorithm

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 12 — Binary Search

---

## 📌 Table of Contents

1. [What is Binary Search?](#1-what-is-binary-search)
2. [Prerequisite — Sorted Data](#2-prerequisite--sorted-data)
3. [Core Idea — How Binary Search Works](#3-core-idea--how-binary-search-works)
4. [Finding the Mid Element](#4-finding-the-mid-element)
5. [The Three Conditions](#5-the-three-conditions)
6. [Full Algorithm Walkthrough — Step by Step](#6-full-algorithm-walkthrough--step-by-step)
   - [Case 1: Element Found](#case-1-element-found-target--67)
   - [Case 2: Search on Left Half](#case-2-target-on-left-side-target--25)
   - [Case 3: Element Not Found](#case-3-element-not-found)
7. [Termination Condition](#7-termination-condition)
8. [Code Implementation](#8-code-implementation)
9. [Mid Formula — Best Practice](#9-mid-formula--best-practice)
10. [Time & Space Complexity](#10-time--space-complexity)
11. [Linear Search vs Binary Search — Comparison](#11-linear-search-vs-binary-search--comparison)
12. [Real-World Use Cases](#12-real-world-use-cases)
13. [Complete Cheat Sheet](#13-complete-cheat-sheet)

---

## 1. What is Binary Search?

> **Binary Search** is a **searching algorithm** that works on **sorted data** and finds a target element in **O(log N)** time by repeatedly halving the search space.

**Key properties:**

- Works only on **sorted** data (ascending or descending)
- Eliminates **half** of the remaining search space at each step
- Much faster than Linear Search for large datasets

---

## 2. Prerequisite — Sorted Data

Binary Search **requires** the data to be sorted.

```
Sorted (Ascending):  [2, 5, 8, 9, 12, 18, 20, 25, 67, 100, 125]  ✅
Sorted (Descending): [125, 100, 67, 25, 20, 18, 12, 9, 8, 5, 2]  ✅
Unsorted:            [9, 2, 25, 8, 100, 5, 67]                    ❌
```

> 💡 **Advanced Note:** In future lectures, you'll encounter problems where the data appears unsorted but Binary Search still applies — because the answer space itself is sorted. The key is identifying when to apply it.

---

## 3. Core Idea — How Binary Search Works

Binary Search works by maintaining a **window** (a range of the array) where the target might exist. It narrows this window by half in each step.

**The Search Window:**

```
Initially:
┌─────────────────────────────────────────────────────┐
│  2 │ 5 │ 8 │ 9 │ 12 │ 18 │ 20 │ 25 │ 67 │ 100 │ 125│
└─────────────────────────────────────────────────────┘
  ↑                                                 ↑
first (index 0)                           last (index 10)
```

In each step:

1. Find the **middle element** of the current window
2. Compare it with the **target**
3. Based on comparison, **shrink the window** by moving either `first` or `last`

---

## 4. Finding the Mid Element

To find the middle element, we need two endpoints: `first` and `last`.

**Formula:**

```
mid = Math.floor((first + last) / 2)
```

**Example with first=0, last=10:**

```
mid = Math.floor((0 + 10) / 2) = Math.floor(5) = 5

arr[5] = 18  ← this is the mid element
```

> 💡 `mid` stores an **index**, not the element itself.
> To get the element: `arr[mid]`

---

## 5. The Three Conditions

After finding `arr[mid]`, compare it with `target`. Only **three cases** are possible:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Case 1: arr[mid] == target  → FOUND! Return mid index  │
│                                                         │
│  Case 2: arr[mid] > target   → Target is on LEFT side   │
│                                 Move: last = mid - 1    │
│                                                         │
│  Case 3: arr[mid] < target   → Target is on RIGHT side  │
│                                 Move: first = mid + 1   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Why Case 2 moves `last` to `mid - 1`?

```
Array (sorted ascending): [... elements ... | mid | ... elements ...]
                            ← smaller          ↑       larger →
                                            mid=50
Target = 25 (smaller than mid)

Since array is sorted:
→ All elements to the RIGHT of mid are ≥ mid = 50 > 25
→ Target (25) CANNOT be on the right side
→ Eliminate right half: last = mid - 1
```

### Why Case 3 moves `first` to `mid + 1`?

```
Array (sorted ascending): [... elements ... | mid | ... elements ...]
                            ← smaller          ↑       larger →
                                            mid=10
Target = 67 (larger than mid)

Since array is sorted:
→ All elements to the LEFT of mid are ≤ mid = 10 < 67
→ Target (67) CANNOT be on the left side
→ Eliminate left half: first = mid + 1
```

---

## 6. Full Algorithm Walkthrough — Step by Step

**Array:** `[2, 5, 8, 9, 12, 18, 20, 25, 67, 100, 125]`

```
Index:  0   1   2   3   4    5   6   7   8    9   10
Value:  2   5   8   9  12   18  20  25  67  100  125
```

---

### Case 1: Element Found (Target = 67)

#### Step 1 — Initial Window

```
first = 0 (index), last = 10 (index)
mid = floor((0 + 10) / 2) = 5
arr[mid] = arr[5] = 18

   f              m                   l
   ↓              ↓                   ↓
[  2,  5,  8,  9, 12, 18, 20, 25, 67, 100, 125]
```

**Check:**

- arr[5] = 18 == 67? ❌ No
- arr[5] = 18 > 67? ❌ No
- arr[5] = 18 < 67? ✅ Yes → **move first to mid+1 = 6**

#### Step 2 — Window Shrunk to Right Half

```
first = 6, last = 10
mid = floor((6 + 10) / 2) = floor(8) = 8
arr[mid] = arr[8] = 67

               f       m       l
               ↓       ↓       ↓
[  2,  5,  8,  9, 12, 18, 20, 25, 67, 100, 125]
```

**Check:**

- arr[8] = 67 == 67? ✅ **FOUND at index 8!** → Return 8

**Result:** Found at index 8 in just **2 steps** (Linear search would need 9 steps in worst case).

---

### Case 2: Target on Left Side (Target = 25)

#### Step 1 — Initial Window

```
first = 0, last = 10
mid = 5, arr[5] = 18

18 < 25? ✅ → move first = mid+1 = 6
```

#### Step 2

```
first = 6, last = 10
mid = floor((6+10)/2) = 8, arr[8] = 67

67 > 25? ✅ → target is on LEFT → move last = mid-1 = 7
```

#### Step 3

```
first = 6, last = 7
mid = floor((6+7)/2) = floor(6.5) = 6, arr[6] = 20

20 < 25? ✅ → target is on RIGHT → move first = mid+1 = 7
```

#### Step 4

```
first = 7, last = 7
mid = floor((7+7)/2) = 7, arr[7] = 25

25 == 25? ✅ FOUND at index 7!
```

---

### Case 3: Element Not Found

**Target = 22** (not in array)

#### Step 1

```
first=0, last=10, mid=5, arr[5]=18
18 < 22 → first = 6
```

#### Step 2

```
first=6, last=10, mid=8, arr[8]=67
67 > 22 → last = 7
```

#### Step 3

```
first=6, last=7, mid=6, arr[6]=20
20 < 22 → first = 7
```

#### Step 4

```
first=7, last=7, mid=7, arr[7]=25
25 > 22 → last = mid-1 = 6
```

#### Step 5 — Termination

```
first = 7, last = 6
first > last → VIOLATION → STOP → return -1 (not found)
```

---

## 7. Termination Condition

**Continue searching while:** `first <= last`

**Stop when:** `first > last` (first crosses last)

```
Normal:      first ─────────────── last
             (window has elements, keep searching)

Termination: last ─── first
             (first crossed last = entire array searched, element not found)
```

This termination means we've exhausted all possibilities without finding the target. Return **-1** to indicate "not found."

---

## 8. Code Implementation

### Iterative Version

```javascript
let arr = [2, 5, 8, 9, 12, 18, 20, 25, 67, 100, 125]

function binarySearch(arr, first, last, target) {
  // Loop while the window is valid
  while (first <= last) {
    // Step 1: Find mid index
    let mid = Math.floor((first + last) / 2)

    // Step 2: Check the three conditions
    if (arr[mid] === target) {
      return mid // Case 1: Found — return the index
    } else if (arr[mid] > target) {
      last = mid - 1 // Case 2: Mid too big — search LEFT half
    } else {
      first = mid + 1 // Case 3: Mid too small — search RIGHT half
    }
  }

  return -1 // Element not found
}

let target = 67
let index = binarySearch(arr, 0, arr.length - 1, target)

if (index === -1) {
  console.log('Not Found')
} else {
  console.log(`Target found at index ${index}`)
}

// Output: Target found at index 8
```

### Recursive Version

```javascript
function binarySearchRecursive(arr, first, last, target) {
  // Base Case: window is invalid → element not found
  if (first > last) {
    return -1
  }

  let mid = Math.floor((first + last) / 2)

  if (arr[mid] === target) {
    return mid // Found
  } else if (arr[mid] > target) {
    return binarySearchRecursive(arr, first, mid - 1, target) // Search left
  } else {
    return binarySearchRecursive(arr, mid + 1, last, target) // Search right
  }
}

let index = binarySearchRecursive(arr, 0, arr.length - 1, 67)
console.log(index) // Output: 8
```

> **Why `return` with recursive calls here?**
> Because the caller needs the **index value** from the recursive call to pass it further up. Each frame waits for the final index result from below. (Recall from Recursion lecture: when previous stack waits for a value → use `return`)

---

## 9. Mid Formula — Best Practice

### Two Formulas

| Formula              | Code                                           |
| -------------------- | ---------------------------------------------- |
| Simple               | `mid = Math.floor((first + last) / 2)`         |
| **Safe (Preferred)** | `mid = first + Math.floor((last - first) / 2)` |

### Why the Safe Formula?

In **statically typed languages** like Java and C++, data types have fixed ranges:

```
Java byte:  -128 to 127
Java int:   -2,147,483,648 to 2,147,483,647
```

**Integer Overflow Problem:**

```
Example: first = 122, last = 125

Simple formula: (122 + 125) / 2 = 247 / 2
                But 247 EXCEEDS byte range (max = 127)!
                → Integer Overflow Error ❌

Safe formula:   122 + (125 - 122) / 2
              = 122 + 3/2
              = 122 + 1
              = 123 ✅ (no overflow)
```

**The safe formula avoids overflow** because `last - first` is always a small number (just the window size), never large enough to overflow.

### Which to Use in JavaScript?

JavaScript uses 64-bit floating point numbers with no fixed overflow concern, so both work. However:

> ✅ **Always use the safe formula as best practice**, regardless of language.
> It also performs faster bit-level operations internally.

```javascript
// Best practice — use this always
let mid = first + Math.floor((last - first) / 2)
```

---

## 10. Time & Space Complexity

### Time Complexity

**How many steps does Binary Search take?**

```
N = 100 elements:
Step 1: 100 elements → check mid → 50 remain
Step 2: 50  elements → check mid → 25 remain
Step 3: 25  elements → check mid → 12 remain
Step 4: 12  elements → check mid → 6  remain
Step 5: 6   elements → check mid → 3  remain
Step 6: 3   elements → check mid → 1  remain
Step 7: 1   element  → check → Found or Not found

Total: 7 steps for 100 elements (vs 100 steps for Linear Search)
```

```
N = 2000 elements:
2000 → 1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1
= 11 steps!
```

**Pattern:** Each step **halves** the remaining elements → logarithmic behavior

**Time Complexity: O(log N)**

> **Why log N?** The number of times you can halve N before reaching 1 is log₂(N).
> For N=2000: log₂(2000) ≈ 11 → matches our count above ✅

### Space Complexity

**Iterative:** O(1) — only `first`, `last`, `mid` variables. No extra array.

**Recursive:** O(log N) — call stack depth = log N (one frame per recursive call)

```
╔══════════════════╦═══════════════════╦══════════════════╗
║ Version          ║ Time Complexity   ║ Space Complexity ║
╠══════════════════╬═══════════════════╬══════════════════╣
║ Iterative        ║ O(log N)          ║ O(1)             ║
║ Recursive        ║ O(log N)          ║ O(log N)         ║
╚══════════════════╩═══════════════════╩══════════════════╝
```

---

## 11. Linear Search vs Binary Search — Comparison

```
╔══════════════════════╦══════════════════╦══════════════════╗
║ Feature              ║ Linear Search    ║ Binary Search    ║
╠══════════════════════╬══════════════════╬══════════════════╣
║ Sorted Data Required ║ ❌ No            ║ ✅ Yes           ║
║ Time Complexity      ║ O(N)             ║ O(log N)         ║
║ Space Complexity     ║ O(1)             ║ O(1) iterative   ║
║ Steps for N=100      ║ 100 (worst)      ║ 7                ║
║ Steps for N=2000     ║ 2000 (worst)     ║ 11               ║
║ Steps for N=1M       ║ 1,000,000        ║ 20               ║
║ Steps for N=1B       ║ 1,000,000,000    ║ 30               ║
╚══════════════════════╩══════════════════╩══════════════════╝
```

**For N = 1 billion elements:**

- Linear Search (worst case): 1,000,000,000 operations
- Binary Search: log₂(1,000,000,000) ≈ **30 operations**

> 💡 **This is why Binary Search is the fastest searching algorithm** — it turns a billion operations into 30.

---

## 12. Real-World Use Cases

### 1. Database Lookup (Mntra / E-commerce Example)

```
Problem: Find customer with ID = 89 from 10 million records

With Linear Search: Check each record one by one → up to 10M comparisons
With Binary Search (on sorted IDs): log₂(10,000,000) ≈ 23 comparisons!

How it works:
1. Keep IDs sorted in database (they usually are — auto-increment)
2. Apply Binary Search on the sorted IDs
3. Find the record in ~23 steps regardless of size
```

### 2. Name-Based Search

```
If search is by NAME:
1. First sort records alphabetically by name
2. Then apply Binary Search
→ Find any name in log N steps
```

### 3. Dictionary / Phone Book

```
Looking up a word in a dictionary:
- You don't start from 'A' every time (Linear Search)
- You open to the middle → too far forward? go left → too far back? go right
- This IS Binary Search intuitively!
```

### 4. Git Bisect

```
Finding which commit introduced a bug in a codebase:
- Tests each midpoint commit (pass/fail)
- Halves the suspect range each time
- Binary Search on commit history
```

### 5. Finding Square Root

```
Find √x without using Math.sqrt():
- Binary search on the range [0, x]
- Check if mid² == x, or go left/right
- O(log N) approach
```

---

## 13. Complete Cheat Sheet

### Algorithm Summary

```
┌──────────────────────────────────────────────────────────────┐
│                    BINARY SEARCH                             │
│                                                              │
│  Prerequisite: Array must be SORTED                         │
│                                                              │
│  Setup:                                                      │
│    first = 0                                                 │
│    last  = arr.length - 1                                    │
│                                                              │
│  Loop condition:  while (first <= last)                      │
│                                                              │
│  Each iteration:                                             │
│    mid = first + Math.floor((last - first) / 2)             │
│                                                              │
│    if arr[mid] == target → return mid (FOUND)               │
│    if arr[mid] >  target → last  = mid - 1 (go LEFT)        │
│    if arr[mid] <  target → first = mid + 1 (go RIGHT)       │
│                                                              │
│  After loop: return -1 (NOT FOUND)                          │
└──────────────────────────────────────────────────────────────┘
```

### Pointer Movement Rules

```
╔══════════════════════════════╦═════════════════════════════════╗
║ Condition                    ║ Action                          ║
╠══════════════════════════════╬═════════════════════════════════╣
║ arr[mid] == target           ║ FOUND → return mid              ║
║ arr[mid] > target            ║ Search LEFT → last = mid - 1   ║
║ arr[mid] < target            ║ Search RIGHT → first = mid + 1 ║
║ first > last                 ║ NOT FOUND → return -1           ║
╚══════════════════════════════╩═════════════════════════════════╝
```

### Why Each Pointer Moves Where It Does

```
arr[mid] > target:
  "mid is too big. Target must be SMALLER."
  "Since array is sorted, target is to the LEFT of mid."
  "Ignore everything from mid onwards: last = mid - 1"

arr[mid] < target:
  "mid is too small. Target must be BIGGER."
  "Since array is sorted, target is to the RIGHT of mid."
  "Ignore everything up to mid: first = mid + 1"
```

### Complexity Quick Reference

```
╔════════════════════╦══════════════╦══════════════╗
║ Algorithm          ║ Time         ║ Space        ║
╠════════════════════╬══════════════╬══════════════╣
║ Linear Search      ║ O(N)         ║ O(1)         ║
║ Binary Search      ║ O(log N)     ║ O(1)         ║
║ Binary (recursive) ║ O(log N)     ║ O(log N)     ║
╚════════════════════╩══════════════╩══════════════╝
```

### Full Code (Clean)

```javascript
// Iterative Binary Search — O(log N) time, O(1) space
function binarySearch(arr, target) {
  let first = 0
  let last = arr.length - 1

  while (first <= last) {
    let mid = first + Math.floor((last - first) / 2) // safe formula

    if (arr[mid] === target) {
      return mid // Found — return index
    } else if (arr[mid] > target) {
      last = mid - 1 // Search left half
    } else {
      first = mid + 1 // Search right half
    }
  }

  return -1 // Not found
}

// Usage
let arr = [2, 5, 8, 9, 12, 18, 20, 25, 67, 100, 125]
console.log(binarySearch(arr, 67)) // 8
console.log(binarySearch(arr, 9)) // 3
console.log(binarySearch(arr, 22)) // -1 (not found)
```

```javascript
// Recursive Binary Search — O(log N) time, O(log N) space
function binarySearchRec(arr, first, last, target) {
  if (first > last) return -1 // Base case: not found

  let mid = first + Math.floor((last - first) / 2)

  if (arr[mid] === target) return mid
  else if (arr[mid] > target) return binarySearchRec(arr, first, mid - 1, target)
  else return binarySearchRec(arr, mid + 1, last, target)
}

// Usage
let arr = [2, 5, 8, 9, 12, 18, 20, 25, 67, 100, 125]
console.log(binarySearchRec(arr, 0, arr.length - 1, 67)) // 8
```

---

## Common Mistakes to Avoid

```
❌ Mistake 1: Using Binary Search on UNSORTED data
   Fix: Sort first, then apply Binary Search

❌ Mistake 2: Wrong loop condition (using < instead of <=)
   Wrong:  while (first < last)  → misses single-element windows
   Correct: while (first <= last)

❌ Mistake 3: Wrong pointer update
   Wrong:  last = mid  (can cause infinite loop when first == last)
   Correct: last = mid - 1

❌ Mistake 4: Using simple mid formula in Java/C++
   Wrong:  mid = (first + last) / 2  → integer overflow risk
   Correct: mid = first + (last - first) / 2

❌ Mistake 5: Returning wrong value on not found
   Should return -1 (or throw exception) to clearly indicate absence
```

---

## Practice Problems

### LeetCode (in order of difficulty)

| #   | Problem                              | Note                                 |
| --- | ------------------------------------ | ------------------------------------ |
| 704 | Binary Search                        | Direct application — start here      |
| 374 | Guess Number Higher or Lower         | Classic binary search variant        |
| 69  | Sqrt(x)                              | Binary search on answer space        |
| 278 | First Bad Version                    | Modified binary search               |
| 33  | Search in Rotated Sorted Array       | Advanced — binary search on unsorted |
| 153 | Find Minimum in Rotated Sorted Array | Advanced                             |

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 12_
_📌 Instructor: Ali Ansari_
_🔗 LeetCode: Problem 704 (Binary Search) — start here_
