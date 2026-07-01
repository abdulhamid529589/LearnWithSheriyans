# 🔍 DSA Lecture 16 — Search Insert Position

> **Sheriyans Coding School** | LeetCode 35. A Binary Search variant: find a target's index, or the index where it _would_ be inserted if it doesn't exist.

> **Prerequisite:** This lecture assumes you've already watched the dedicated Binary Search lecture. If you haven't, watch that first — this builds directly on it.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Identifying This as a Binary Search Problem](#2-identifying-this-as-a-binary-search-problem)
3. [The Core Idea](#3-the-core-idea)
4. [Walkthrough — Target Exists in Array](#4-walkthrough--target-exists-in-array)
5. [Walkthrough — Target Does NOT Exist (Case 1)](#5-walkthrough--target-does-not-exist-case-1)
6. [Walkthrough — Target Does NOT Exist (Case 2: Beyond Array)](#6-walkthrough--target-does-not-exist-case-2-beyond-array)
7. [Full Code Implementation](#7-full-code-implementation)
8. [Time & Space Complexity](#8-time--space-complexity)
9. [Quick Reference Cheat Sheet](#9-quick-reference-cheat-sheet)

---

## 1. Problem Statement

> **LeetCode 35 — Search Insert Position** (Difficulty: Easy)
>
> Given a **sorted array of distinct integers** and a **target value**, return the index if the target is found. If not, return the index where it would be **if it were inserted in order**.
>
> You must write an algorithm with **O(log n)** runtime complexity.

### Examples

```
Example 1:
nums = [1, 3, 5, 6],  target = 5
Output: 2
(5 exists in the array, at index 2)

Example 2:
nums = [1, 3, 5, 6],  target = 2
Output: 1
(2 doesn't exist, but if inserted, it would sit between
 index 0 (value 1) and index 1 (value 3) → at index 1)
```

**Key term: "distinct"** means all values are unique — no duplicates to worry about.

---

## 2. Identifying This as a Binary Search Problem

The problem statement never explicitly says "use Binary Search." You have to deduce it from the clues given:

```
Clue 1: "sorted array"
        → Could be Linear Search OR Binary Search at this point

Clue 2: "must write an algorithm with O(log n) runtime"
        → This is the DECIDING clue.
        → Among searching algorithms, ONLY Binary Search
          achieves O(log n) time complexity.
        → Linear Search is O(n) — too slow to satisfy this constraint.
```

> **Rule of thumb:** Whenever a problem explicitly demands logarithmic time complexity for a search-type task, Binary Search is almost always the required tool.

---

## 3. The Core Idea

This problem is **standard Binary Search**, with one twist added at the very end.

### Standard Binary Search Recap

```
first = 0
last  = nums.length - 1

while (first <= last) {
    mid = floor((first + last) / 2)

    if (nums[mid] === target)      → found it! return mid
    else if (nums[mid] < target)   → target must be to the RIGHT
                                       → first = mid + 1
    else                           → target must be to the LEFT
                                       → last = mid - 1
}
```

### The Twist — What Happens When Target Isn't Found?

In standard Binary Search, when the loop ends without finding the target, you'd typically return `-1` (not found).

**This problem asks for something different:** instead of `-1`, return the **index where the target _would_ sit** if it were inserted into the array, keeping it sorted.

> **The key insight:** When the loop naturally terminates (because `first` crosses past `last`), the position where `first` ends up **is exactly** the correct insertion index.

```
┌──────────────────────────────────────────────────┐
│  Why does this work?                              │
│                                                    │
│  Binary Search always narrows down the search     │
│  space until first and last cross. At that exact  │
│  moment, "first" lands precisely at the boundary  │
│  between "everything smaller than target" and     │
│  "everything larger than target" — which is       │
│  exactly where target belongs if inserted.        │
└──────────────────────────────────────────────────┘
```

---

## 4. Walkthrough — Target Exists in Array

```
nums = [1, 3, 5, 6]
Index:  0  1  2  3
target = 5
```

**Step 1:**

```
first = 0, last = 3
mid = floor((0 + 3) / 2) = 1
nums[1] = 3

Is nums[mid] === target?  3 === 5? NO
Is nums[mid] < target?    3 < 5?   YES → target is to the right
first = mid + 1 = 2
```

**Step 2:**

```
first = 2, last = 3
mid = floor((2 + 3) / 2) = 2
nums[2] = 5

Is nums[mid] === target?  5 === 5? YES!
→ return mid = 2
```

**Answer: `2`** ✅ (matches Example 1)

---

## 5. Walkthrough — Target Does NOT Exist (Case 1)

```
nums = [1, 3, 5, 6]
Index:  0  1  2  3
target = 2
```

**Step 1:**

```
first = 0, last = 3
mid = floor((0 + 3) / 2) = 1
nums[1] = 3

Is nums[mid] === target?  3 === 2? NO
Is nums[mid] < target?    3 < 2?   NO  → so target is to the LEFT
last = mid - 1 = 0
```

**Step 2:**

```
first = 0, last = 0
mid = floor((0 + 0) / 2) = 0
nums[0] = 1

Is nums[mid] === target?  1 === 2? NO
Is nums[mid] < target?    1 < 2?   YES → target is to the right
first = mid + 1 = 1
```

**Step 3 — Loop Check:**

```
first = 1, last = 0
Is first <= last?  1 <= 0?  NO → loop ends
```

**Why this makes sense:** `first` stopped at index `1`. Looking at the array, `2` should logically sit right after `1` (at index 0) and before `3` (at index 1) — which is exactly index `1`.

**Answer: `1`** ✅ (matches Example 2)

---

## 6. Walkthrough — Target Does NOT Exist (Case 2: Beyond Array)

```
nums = [1, 3, 5, 6]
Index:  0  1  2  3
target = 7   (larger than every element)
```

**Step 1:**

```
first = 0, last = 3
mid = floor((0 + 3) / 2) = 1
nums[1] = 3

Is nums[mid] === target?  3 === 7? NO
Is nums[mid] < target?    3 < 7?   YES → target is to the right
first = mid + 1 = 2
```

**Step 2:**

```
first = 2, last = 3
mid = floor((2 + 3) / 2) = 2
nums[2] = 5

Is nums[mid] === target?  5 === 7? NO
Is nums[mid] < target?    5 < 7?   YES → target is to the right
first = mid + 1 = 3
```

**Step 3:**

```
first = 3, last = 3
mid = floor((3 + 3) / 2) = 3
nums[3] = 6

Is nums[mid] === target?  6 === 7? NO
Is nums[mid] < target?    6 < 7?   YES → target is to the right
first = mid + 1 = 4
```

**Step 4 — Loop Check:**

```
first = 4, last = 3
Is first <= last?  4 <= 3?  NO → loop ends
```

**Answer: `4`** — meaning the target would be inserted at the very end of the array (right after the last element), which makes perfect sense since `7` is bigger than everything.

---

## 7. Full Code Implementation

```javascript
function searchInsert(nums, target) {
  let first = 0
  let last = nums.length - 1

  while (first <= last) {
    const mid = Math.floor((first + last) / 2)

    if (nums[mid] === target) {
      return mid // found exactly
    } else if (nums[mid] < target) {
      first = mid + 1 // search right half
    } else {
      last = mid - 1 // search left half
    }
  }

  // Loop ended without finding target —
  // "first" now holds the correct insertion index
  return first
}
```

### Why Return `first` (Not `last`) at the End?

When the loop terminates, `first` has always moved past `last` by exactly one step in the "insertion direction." Tracing through both walkthrough examples above confirms: wherever `first` finally rests is precisely the index where target belongs to keep the array sorted.

### Submission Results (as shown in the lecture)

```
Runtime:  0 ms      (beats 100% of submissions)
Memory:   Beats 100%
```

---

## 8. Time & Space Complexity

```
Time Complexity:  O(log n)
Space Complexity: O(1)
```

**Why O(log n)?** Classic Binary Search behavior — the search space is halved on every iteration, regardless of whether the target exists or not. Even in the "not found" cases walked through above, the loop still terminates in `log n` steps because the same halving logic applies until `first` and `last` cross.

**Why O(1) space?** No extra data structures are used — only a few pointer variables (`first`, `last`, `mid`).

---

## 9. Quick Reference Cheat Sheet

```
╔════════════════════════════════════════════════════════════╗
║              SEARCH INSERT POSITION CHEAT SHEET             ║
╠════════════════════════════════════════════════════════════╣
║ Identification signal:                                      ║
║   "sorted array" + "O(log n) runtime required"               ║
║   → Binary Search (only search algorithm achieving log n)   ║
║                                                                ║
║ Standard Binary Search Loop:                                 ║
║   first = 0, last = nums.length - 1                          ║
║   while (first <= last) {                                    ║
║       mid = floor((first + last) / 2)                        ║
║       if (nums[mid] === target)   return mid                ║
║       else if (nums[mid] < target) first = mid + 1           ║
║       else                         last = mid - 1            ║
║   }                                                            ║
║                                                                ║
║ THE TWIST for this problem:                                  ║
║   When loop ends without a match,                            ║
║   return "first" — NOT -1.                                   ║
║   "first" naturally lands at the correct insertion point.    ║
║                                                                ║
║ Complexity:                                                  ║
║   Time:  O(log n)                                             ║
║   Space: O(1)                                                 ║
╚════════════════════════════════════════════════════════════╝
```

### Mental Model — Why `first` Equals the Insertion Index

```
Think of "first" and "last" as two fingers closing in on each other.

While searching, every comparison either:
  - confirms target is found (return immediately), or
  - pushes "first" rightward (target is bigger than current mid), or
  - pushes "last" leftward (target is smaller than current mid)

The MOMENT first crosses last, "first" is standing exactly at
the boundary: everything before it is smaller than target,
everything from it onward is bigger than (or equal to, but
target wasn't found) target.

That boundary IS the correct sorted insertion point.
```

---

## Practice Recommendation

Try re-implementing this from scratch using only the cheat sheet, then test it against all three scenarios covered in this document:

1. Target exists in the middle of the array
2. Target doesn't exist but fits within the array's range
3. Target doesn't exist and is larger than every element (insertion at the end)

Also test the edge case of target being **smaller than every element** — trace through it yourself and confirm `first` ends up at index `0`.

---

_End of Lecture 16 notes — Search Insert Position. This is a great example of how a small twist on a classic algorithm (Binary Search) creates a new problem — recognizing the underlying pattern (here: O(log n) requirement) is the real skill being tested._
