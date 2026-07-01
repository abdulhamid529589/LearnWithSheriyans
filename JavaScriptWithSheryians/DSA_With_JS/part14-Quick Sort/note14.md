# 📘 DSA Series — Lecture 14

# ⚡ Quick Sort — Pivot & Partition Based Algorithm

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 14 — Quick Sort

---

## 📌 Table of Contents

1. [What is Quick Sort?](#1-what-is-quick-sort)
2. [Core Intuition — Pivot & Partition](#2-core-intuition--pivot--partition)
3. [Choosing a Pivot](#3-choosing-a-pivot)
4. [The Algorithm — Finding Pivot Index](#4-the-algorithm--finding-pivot-index)
   - [Two Pointer Approach](#41-two-pointer-approach)
   - [Step-by-Step Dry Run](#42-step-by-step-dry-run)
   - [Edge Cases to Handle](#43-edge-cases-to-handle)
5. [Partition — Recursive Splitting](#5-partition--recursive-splitting)
6. [Complete Algorithm Flow](#6-complete-algorithm-flow)
7. [Full Code](#7-full-code)
8. [Time Complexity Analysis](#8-time-complexity-analysis)
   - [Average & Best Case: O(N log N)](#81-average--best-case-on-log-n)
   - [Worst Case: O(N²)](#82-worst-case-on²)
9. [Quick Sort vs Merge Sort](#9-quick-sort-vs-merge-sort)
10. [Real-World Usage](#10-real-world-usage)
11. [Complete Cheat Sheet](#11-complete-cheat-sheet)

---

## 1. What is Quick Sort?

> **Quick Sort** is a **Divide and Conquer** based sorting algorithm also known as **Pivot and Partition** algorithm.

```
Input:  [19, 3, 17, 24, 1, 87, 22]
Output: [1, 3, 17, 19, 22, 24, 87]
```

**Key properties:**

- Also called **Pivot and Partition** algorithm
- Sorts **in-place** — no extra array needed
- **O(N log N)** average and best case
- **O(N²)** worst case (when array is already sorted)
- **Space complexity: O(1)** (no auxiliary array)

**Difference from Merge Sort:**

- Merge Sort: always O(N log N), but uses O(N) extra space
- Quick Sort: O(1) extra space, but worst case O(N²)

---

## 2. Core Intuition — Pivot & Partition

### What is a Pivot?

> **Pivot** = A reference element around which all other elements are arranged.
> Elements **smaller** than pivot → go to **LEFT**
> Elements **larger** than pivot → go to **RIGHT**

Once a pivot is placed at its correct final position in a sorted array, it **never moves again**. That position is called the **pivot index**.

### Visual Intuition

```
Original: [8, 2, 1, 9, 5, 12, 4, 20]
Pivot = 8 (first element)

After processing:
[2, 1, 5, 4, | 8 | 9, 12, 20]
 ← smaller   pivot  larger →

Now pivot (8) is at its CORRECT final position (index 4)
```

Then recursively sort the left and right parts:

- Left: `[2, 1, 5, 4]` → sort independently
- Right: `[9, 12, 20]` → sort independently

Eventually: `[1, 2, 4, 5, 8, 9, 12, 20]`

---

## 3. Choosing a Pivot

Multiple strategies exist:

| Strategy          | Description                                |
| ----------------- | ------------------------------------------ |
| **First element** | `arr[first]` — used in this lecture        |
| Last element      | `arr[last]`                                |
| Middle element    | `arr[mid]`                                 |
| Random element    | Random index each time (avoids worst case) |

> In this lecture, we use the **first element as pivot**.

---

## 4. The Algorithm — Finding Pivot Index

The main task: given an array segment, place the pivot at its correct position such that:

- All elements to its **left are smaller**
- All elements to its **right are larger**

Return the **index** where pivot was placed.

### 4.1 Two Pointer Approach

```
Setup:
  pivot = arr[first]    ← the element we're placing
  i = first + 1         ← starts just after pivot, moves RIGHT
  j = last              ← starts at end, moves LEFT
```

**Rules:**

- Move `i` rightward while `arr[i] <= pivot` (skip elements already on correct side)
- Move `j` leftward while `arr[j] > pivot` (skip elements already on correct side)
- When **both i and j stop**: swap `arr[i]` and `arr[j]` (they're in wrong positions)
- **Stop everything** when `i > j` (pointers have crossed)
- After crossing: swap `pivot` (at `arr[first]`) with `arr[j]`
- Return `j` — that's the pivot's correct index

### 4.2 Step-by-Step Dry Run

**Array:** `[8, 2, 1, 9, 5, 12, 4, 20]`
**first=0, last=7, pivot=arr[0]=8**

```
Initial state:
[ 8,  2,  1,  9,  5, 12,  4, 20]
  P   i                         j
pivot=8, i=1, j=7
```

**Iteration 1:**

- Move i while `arr[i] <= 8`: arr[1]=2 ≤ 8 → i++; arr[2]=1 ≤ 8 → i++; arr[3]=9 > 8 → STOP at i=3
- Move j while `arr[j] > 8`: arr[7]=20 > 8 → j--; arr[6]=4 ≤ 8 → STOP at j=6
- i=3 < j=6, so **SWAP arr[3] and arr[6]**

```
[ 8,  2,  1,  4,  5, 12,  9, 20]
  P         i           j
```

**Iteration 2:**

- Move i while `arr[i] <= 8`: arr[4]=5 ≤ 8 → i++; arr[5]=12 > 8 → STOP at i=5
- Move j while `arr[j] > 8`: arr[6]=9 > 8 → j--; arr[5]=12 > 8 → j--; arr[4]=5 ≤ 8 → STOP at j=4
- i=5 > j=4 → **CROSSED! Stop loop**

**After crossing:**

- Swap pivot `arr[first]=arr[0]=8` with `arr[j]=arr[4]=5`

```
[ 5,  2,  1,  4,  8, 12,  9, 20]
                   ↑
               pivot index = 4 (j=4)
```

**Verify:** pivot=8 is at index 4

- Left side [5,2,1,4]: all < 8 ✅
- Right side [12,9,20]: all > 8 ✅
- **Sorted array would have 8 at index 4** ✅ → Correct pivot index!

### 4.3 Edge Cases to Handle

#### Edge Case 1: i must not go beyond last

```javascript
while (i <= last && arr[i] <= pivot) {
  i++
}
```

If i goes beyond `last`, we'd access out-of-bounds memory.

#### Edge Case 2: j must not go below first

```javascript
while (j >= first && arr[j] > pivot) {
  j--
}
```

If j goes below `first`, we'd access out-of-bounds memory.

#### Edge Case 3: Only swap arr[i] and arr[j] when i < j (not crossed)

```javascript
if (i < j) {
  swap(arr, i, j)
}
```

After crossing, we only swap pivot with arr[j].

---

## 5. Partition — Recursive Splitting

After getting `pivotIndex` from `findPivotIndex()`:

- **Recursively sort left part**: `[first ... pivotIndex - 1]`
- **Recursively sort right part**: `[pivotIndex + 1 ... last]`

```
quickSort(arr, first, last):
  if first >= last: return    ← base case: 1 or 0 elements

  pivotIndex = findPivotIndex(arr, first, last)

  quickSort(arr, first, pivotIndex - 1)    ← sort left
  quickSort(arr, pivotIndex + 1, last)     ← sort right
```

**Difference from Merge Sort:**

- Merge Sort: divide FIRST, then merge on backtrack
- Quick Sort: find pivot index FIRST (doing real work), THEN divide

---

## 6. Complete Algorithm Flow

```
quickSort([8, 2, 1, 9, 5, 12, 4, 20], first=0, last=7)
    ↓
findPivotIndex → pivot=8, returns pivotIndex=4
Array becomes: [5, 2, 1, 4, 8, 12, 9, 20]
    ↓
quickSort([5, 2, 1, 4], first=0, last=3)    quickSort([12, 9, 20], first=5, last=7)
    ↓                                              ↓
findPivotIndex → pivot=5, pivotIndex=3       findPivotIndex → pivot=12, pivotIndex=6
Array: [4, 2, 1, 5, ...]                     Array: [..., 9, 12, 20]
    ↓
quickSort([4, 2, 1], 0, 2)  quickSort([], 4, 3) ← empty, return
    ...continues recursively

Final: [1, 2, 4, 5, 8, 9, 12, 20]
```

**Stop condition:** `first >= last` — means partition has 0 or 1 elements (already sorted)

---

## 7. Full Code

```javascript
// Helper: swap two elements in array
function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// Find the correct index for the pivot (first element)
// and rearrange: smaller left, larger right
function findPivotIndex(arr, first, last) {
  let pivot = arr[first] // choose first element as pivot

  let i = first + 1 // left pointer (starts after pivot)
  let j = last // right pointer (starts at end)

  while (i <= j) {
    // Move i right while arr[i] is <= pivot (already on correct side)
    while (i <= last && arr[i] <= pivot) {
      i++
    }

    // Move j left while arr[j] is > pivot (already on correct side)
    while (j >= first && arr[j] > pivot) {
      j--
    }

    // If i and j haven't crossed, swap (both on wrong side)
    if (i < j) {
      swap(arr, i, j)
    }
  }

  // Pointers crossed: place pivot at its correct position
  // j is where pivot belongs — swap pivot with arr[j]
  swap(arr, first, j)

  return j // j is now the pivot's correct index
}

// Main Quick Sort function
function quickSort(arr, first, last) {
  // Base case: 0 or 1 element → already sorted
  if (first >= last) {
    return
  }

  // Find pivot's correct position and rearrange
  let pivotIndex = findPivotIndex(arr, first, last)

  // Recursively sort elements before and after pivot
  quickSort(arr, first, pivotIndex - 1) // sort left part
  quickSort(arr, pivotIndex + 1, last) // sort right part
}

// Usage
let arr = [19, 3, 17, 24, 1, 87, 22]
quickSort(arr, 0, arr.length - 1)
console.log(arr) // [1, 3, 17, 19, 22, 24, 87]
```

### Code Walkthrough

```
findPivotIndex(arr, first, last):
  1. pivot = arr[first]          → save pivot value
  2. i = first + 1, j = last     → set up two pointers
  3. while i <= j:
       advance i while arr[i] <= pivot  → find element > pivot
       retreat j while arr[j] > pivot   → find element <= pivot
       if i < j: swap arr[i] and arr[j] → fix wrong-side elements
  4. swap arr[first] with arr[j]  → place pivot at correct position
  5. return j                     → pivot's final index

quickSort(arr, first, last):
  1. if first >= last: return     → base case
  2. p = findPivotIndex(...)      → find & place pivot
  3. quickSort left of p          → sort smaller elements
  4. quickSort right of p         → sort larger elements
```

---

## 8. Time Complexity Analysis

### 8.1 Average & Best Case: O(N log N)

**How many operations in `findPivotIndex`?**

```
i moves right  →  i pointer crosses the array once
j moves left   →  j pointer crosses the array once
Total: N operations total (both i and j cover N elements between them)
→ findPivotIndex is O(N)
```

**How many times is `findPivotIndex` called?**

In the best/average case, each pivot split is roughly half:

```
Level 0: 1 call  on N elements
Level 1: 2 calls on N/2 elements each = N total work
Level 2: 4 calls on N/4 elements each = N total work
...
Levels: log₂N
```

Each level does O(N) work × O(log N) levels = **O(N log N)**

### 8.2 Worst Case: O(N²)

**When does worst case happen?**

When the array is **already sorted** (ascending OR descending).

```
Array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Pivot = 1 (first element, smallest)
After processing: pivot goes to index 0 (already correct!)
  → Left part: empty
  → Right part: [2, 3, 4, 5, 6, 7, 8, 9] — still 8 elements!
```

Each step only places one element:

```
findPivotIndex on 9 elements  → N-1 operations
findPivotIndex on 8 elements  → N-2 operations
findPivotIndex on 7 elements  → N-3 operations
...
findPivotIndex on 1 element   → 1 operation

Total = (N-1) + (N-2) + ... + 1 = N(N-1)/2 ≈ N²/2 → O(N²)
```

This is the same AP series we saw in Bubble Sort!

**Why does sorted array cause worst case?**

- First element (pivot) is always the minimum (in ascending array)
- After finding pivot index, right part has n-1 elements, left has 0
- No halving happens → linear recursion depth → O(N²)

**How to fix worst case?**

- Use random pivot selection instead of always picking first element
- Then the probability of consistently bad pivots becomes extremely low

---

## 9. Quick Sort vs Merge Sort

```
╔══════════════════════╦══════════════════════╦══════════════════════╗
║ Feature              ║ Merge Sort           ║ Quick Sort           ║
╠══════════════════════╬══════════════════════╬══════════════════════╣
║ Strategy             ║ Divide & Conquer     ║ Pivot & Partition    ║
║ Best Case            ║ O(N log N)           ║ O(N log N)           ║
║ Average Case         ║ O(N log N)           ║ O(N log N)           ║
║ Worst Case           ║ O(N log N)           ║ O(N²)                ║
║ Space Complexity     ║ O(N) (temp arrays)   ║ O(1) (in-place)      ║
║ Stable?              ║ ✅ Yes               ║ ❌ No                ║
║ Extra Array?         ║ Yes                  ║ No                   ║
║ Worst Case Trigger   ║ None                 ║ Already sorted array ║
╚══════════════════════╩══════════════════════╩══════════════════════╝
```

### When to Use Which?

```
Use MERGE SORT when:
  → Time efficiency is critical (no worst case risk)
  → You have enough memory (O(N) extra space is OK)
  → You need a stable sort (equal elements keep relative order)
  → Sorting linked lists

Use QUICK SORT when:
  → Memory is constrained (O(1) space is needed)
  → You know data is not already sorted
  → Average case performance is acceptable
  → General-purpose in-memory sorting
```

---

## 10. Real-World Usage

### `Array.sort()` Uses Quick Sort

> JavaScript's `arr.sort()`, Java's `Arrays.sort()` for primitives — behind the scenes, it uses a variant of Quick Sort (often Dual-Pivot Quick Sort or Introsort).

```javascript
// This uses Quick Sort internally:
let arr = [5, 2, 8, 1, 9]
arr.sort((a, b) => a - b)
// Output: [1, 2, 5, 8, 9]
```

### Why is Quick Sort Preferred in Practice?

1. **Cache-friendly**: Operates on contiguous memory with sequential access → CPU cache works efficiently
2. **In-place**: No extra memory allocation needed
3. **Fast in practice**: Despite O(N²) worst case, average case is very fast with good pivot selection
4. **Can be randomized**: Adding random pivot selection makes O(N²) case practically impossible

---

## 11. Complete Cheat Sheet

### Algorithm Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                      QUICK SORT                                 │
│                                                                 │
│  quickSort(arr, first, last):                                   │
│    if first >= last: return         ← Base case                │
│    pivotIndex = findPivotIndex(arr, first, last)               │
│    quickSort(arr, first, pivotIndex - 1)   ← left              │
│    quickSort(arr, pivotIndex + 1, last)    ← right             │
│                                                                 │
│  findPivotIndex(arr, first, last):                              │
│    pivot = arr[first]                                           │
│    i = first + 1,  j = last                                     │
│    while (i <= j):                                              │
│      advance i while arr[i] <= pivot AND i <= last              │
│      retreat j while arr[j] > pivot AND j >= first             │
│      if i < j: swap(arr, i, j)                                  │
│    swap(arr, first, j)    ← place pivot at correct position    │
│    return j               ← pivot's final index                │
└─────────────────────────────────────────────────────────────────┘
```

### Pointer Rules

```
╔═══════════════════════════════════════════════════════════════╗
║ POINTER i (left, moves right):                                ║
║   Move while: arr[i] <= pivot AND i <= last                   ║
║   Stop when:  arr[i] > pivot (found element > pivot)          ║
║   Meaning:    arr[i] is on the wrong side (should be right)   ║
╠═══════════════════════════════════════════════════════════════╣
║ POINTER j (right, moves left):                                ║
║   Move while: arr[j] > pivot AND j >= first                   ║
║   Stop when:  arr[j] <= pivot (found element <= pivot)        ║
║   Meaning:    arr[j] is on the wrong side (should be left)    ║
╠═══════════════════════════════════════════════════════════════╣
║ WHEN BOTH STOP AND i < j:                                     ║
║   swap(arr[i], arr[j])  ← both in wrong places, fix them     ║
╠═══════════════════════════════════════════════════════════════╣
║ WHEN i > j (CROSSED):                                         ║
║   swap(arr[first], arr[j])  ← place pivot at j               ║
║   return j                  ← pivot index                    ║
╚═══════════════════════════════════════════════════════════════╝
```

### Time Complexity

```
╔══════════════╦══════════════╦═══════════════════════════════╗
║ Case         ║ Complexity   ║ When it occurs                ║
╠══════════════╬══════════════╬═══════════════════════════════╣
║ Best         ║ O(N log N)   ║ Pivot always splits equally    ║
║ Average      ║ O(N log N)   ║ Typical random input           ║
║ Worst        ║ O(N²)        ║ Array already sorted (asc/desc)║
╠══════════════╬══════════════╬═══════════════════════════════╣
║ Space        ║ O(1)         ║ In-place, no extra array       ║
╚══════════════╩══════════════╩═══════════════════════════════╝
```

### Key Differences from Merge Sort

```
Merge Sort:  DIVIDE first → MERGE on backtrack (work done coming up)
Quick Sort:  WORK first (findPivotIndex) → DIVIDE after (work done going down)

Merge Sort:  needs O(N) extra space (temp arrays)
Quick Sort:  needs O(1) extra space (in-place swaps)

Merge Sort:  always O(N log N)
Quick Sort:  O(N log N) average, O(N²) worst (sorted input)
```

### Common Mistakes

```
❌ Mistake 1: Not checking i <= last in inner while loop
   → i can go out of bounds if all elements < pivot

❌ Mistake 2: Not checking j >= first in inner while loop
   → j can go out of bounds if all elements > pivot

❌ Mistake 3: Swapping arr[i] and arr[j] when i >= j
   → Should only swap when i < j (not crossed)

❌ Mistake 4: Forgetting to swap pivot with arr[j] after loop
   → Pivot needs to go to its correct position

❌ Mistake 5: Returning i instead of j as pivot index
   → j is where the pivot belongs (not i)
```

---

## Practice Problems

### Must-Solve on LeetCode

| #   | Problem                             | Connection to Quick Sort        |
| --- | ----------------------------------- | ------------------------------- |
| —   | Quick Sort (implement from scratch) | Core                            |
| 215 | Kth Largest Element in Array        | Uses partition (QuickSelect)    |
| 75  | Sort Colors (Dutch National Flag)   | Partition-like logic            |
| 912 | Sort an Array                       | Implement and submit Quick Sort |

### Self-Exercise

1. Implement Quick Sort with **last element as pivot** instead of first
2. Implement Quick Sort with **random element as pivot** (avoids worst case)
3. Trace through `[5, 4, 3, 2, 1]` (reverse sorted) — count total comparisons
4. Verify that after each `findPivotIndex` call, the pivot is at its correct sorted position

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 14_
_📌 Instructor: Ali Ansari_
_🔗 Previous: Lecture 13 (Merge Sort) | Related: Binary Search (two pointer idea)_
