# 🔄 DSA Lecture 15 — Cyclic Sort

> **Sheriyans Coding School** | A clever sorting algorithm for arrays where elements fall within a known range (1 to n, or 0 to n-1). Covers the algorithm, pattern identification, two LeetCode problems, and edge cases.

---

## Table of Contents

1. [What Is Cyclic Sort?](#1-what-is-cyclic-sort)
2. [The Core Observation](#2-the-core-observation)
3. [The Algorithm — Step by Step Walkthrough](#3-the-algorithm--step-by-step-walkthrough)
4. [Full Code Implementation](#4-full-code-implementation)
5. [Variant: 0 to n-1 Range](#5-variant-0-to-n-1-range)
6. [Time & Space Complexity](#6-time--space-complexity)
7. [How to Identify Cyclic Sort Problems](#7-how-to-identify-cyclic-sort-problems)
8. [Problem 1 — Missing Number (LeetCode 268)](#8-problem-1--missing-number-leetcode-268)
9. [Problem 2 — Find All Numbers Disappeared in an Array](#9-problem-2--find-all-numbers-disappeared-in-an-array)
10. [Common Pitfalls and Edge Cases](#10-common-pitfalls-and-edge-cases)
11. [Quick Reference Cheat Sheet](#11-quick-reference-cheat-sheet)

---

## 1. What Is Cyclic Sort?

Cyclic Sort is a sorting technique that applies in one very specific situation:

> **Your array contains n numbers, and those numbers fall within a known, limited range** — typically `1 to n` or `0 to n-1`.

### When It Applies

```
Example array:  n = 8 elements
Range:          1 to 8  (every number from 1 to 8 appears exactly once)
Array:          [4, 2, 7, 1, 6, 3, 8, 5]   ← unsorted, but all values are 1-8

Goal: Sort this array efficiently
```

This is different from a generic "sort any array of any numbers" problem. Here, the **range constraint is the hint** that tells you cyclic sort is the right tool.

**Two common variants:**
| Variant | Range | Correct index for element `x` |
|---------|-------|-------------------------------|
| 1 to n | `[1, 2, 3, ..., n]` | `x - 1` |
| 0 to n-1 | `[0, 1, 2, ..., n-1]` | `x` (itself) |

---

## 2. The Core Observation

This is the single most important insight behind the entire algorithm:

> **If the array were sorted, every element would sit at index `element - 1` (for the 1-to-n case).**

### Visualizing It

```
If array is SORTED (1 to n, n=8):
Index:    0  1  2  3  4  5  6  7
Value:    1  2  3  4  5  6  7  8

Notice: value at index i = i + 1
        OR equivalently: correct index for value v = v - 1
```

**Example:** if the element is `5`, its correct index is `5 - 1 = 4`.

This single formula — `correctIndex = element - 1` — drives the entire algorithm. You don't need to fully sort with comparisons like other algorithms (merge sort, quick sort). You just need to **place every element where it belongs**, using direct index math.

---

## 3. The Algorithm — Step by Step Walkthrough

### The Rule

For each position `i` starting from `0`:

1. Look at the current element `arr[i]`
2. Calculate its correct index: `correctIdx = arr[i] - 1`
3. Check: is `arr[i]` already equal to `arr[correctIdx]`?
   - **If YES** → this element is in the right place (or a duplicate sits there) → move `i` forward
   - **If NO** → swap `arr[i]` and `arr[correctIdx]` → **do NOT move `i` forward** — recheck the same position

### Walkthrough Example

```
Array: [4, 2, 7, 1, 6, 3, 8, 5]
Index:  0  1  2  3  4  5  6  7
```

**Step 1:** `i=0`, current element = `4`. Correct index = `4-1 = 3`.
Is `arr[3]` already `4`? `arr[3] = 1`. No → **swap** `arr[0]` and `arr[3]`.

```
[1, 2, 7, 4, 6, 3, 8, 5]   (i stays at 0)
```

**Step 2:** `i=0`, current element = `1`. Correct index = `1-1 = 0`.
Is `arr[0]` already `1`? Yes! → **move on**, `i++`

```
[1, 2, 7, 4, 6, 3, 8, 5]   (i = 1)
```

**Step 3:** `i=1`, current element = `2`. Correct index = `2-1 = 1`.
Is `arr[1]` already `2`? Yes! → `i++`

```
(i = 2)
```

**Step 4:** `i=2`, current element = `7`. Correct index = `7-1 = 6`.
Is `arr[6]` already `7`? `arr[6] = 8`. No → **swap**

```
[1, 2, 8, 4, 6, 3, 7, 5]   (i stays at 2)
```

**Step 5:** `i=2`, current element = `8`. Correct index = `8-1 = 7`.
Is `arr[7]` already `8`? `arr[7] = 5`. No → **swap**

```
[1, 2, 5, 4, 6, 3, 7, 8]   (i stays at 2)
```

**Step 6:** `i=2`, current element = `5`. Correct index = `5-1 = 4`.
Is `arr[4]` already `5`? `arr[4] = 6`. No → **swap**

```
[1, 2, 6, 4, 5, 3, 7, 8]   (i stays at 2)
```

**Step 7:** `i=2`, current element = `6`. Correct index = `6-1 = 5`.
Is `arr[5]` already `6`? `arr[5] = 3`. No → **swap**

```
[1, 2, 3, 4, 5, 6, 7, 8]   (i stays at 2)
```

**Step 8:** `i=2`, current element = `3`. Correct index = `3-1 = 2`.
Is `arr[2]` already `3`? Yes! → `i++`

From here, every remaining element is already at its correct index, so `i` keeps incrementing until it reaches the end.

```
FINAL RESULT: [1, 2, 3, 4, 5, 6, 7, 8]   ✅ Sorted!
```

### The Key Behavioral Rule

```
┌─────────────────────────────────────────────────┐
│  Only increment i when EITHER:                  │
│    (a) the element is already at its correct     │
│        index, OR                                 │
│    (b) [for range-limited variants] the element  │
│        is out of valid bounds                    │
│                                                    │
│  Otherwise — SWAP and recheck the SAME position  │
└─────────────────────────────────────────────────┘
```

This is what makes the algorithm efficient — every swap places at least one element into its final correct position, so the total number of swaps never exceeds `n`.

---

## 4. Full Code Implementation

```javascript
// Cyclic Sort — for elements in range 1 to n

let arr = [6, 5, 8, 1, 2, 4, 3, 7]

let i = 0

while (i < arr.length) {
  // Calculate where this element SHOULD be
  const correctIdx = arr[i] - 1

  if (arr[i] !== arr[correctIdx]) {
    // Not in correct position — swap and recheck same i
    let temp = arr[i]
    arr[i] = arr[correctIdx]
    arr[correctIdx] = temp
  } else {
    // Already correct — move forward
    i++
  }
}

console.log(arr)
// Output: [1, 2, 3, 4, 5, 6, 7, 8]
```

### Why `!==` Instead of Checking Index Directly?

We check `arr[i] !== arr[correctIdx]` rather than checking positions directly, because we care about **values matching at the target position**, not abstract index bookkeeping. This naturally handles the swap-and-recheck logic cleanly.

### Why No `i++` After Swap?

> **Critical rule:** After a swap, the value that just landed at index `i` might _also_ be out of place. You must recheck it before moving on. Incrementing `i` immediately would skip validating the newly placed element.

---

## 5. Variant: 0 to n-1 Range

If the problem states elements are in range **0 to n-1** instead of 1 to n, there's only **one change**:

```
1 to n variant:    correctIdx = element - 1
0 to n-1 variant:  correctIdx = element        ← no subtraction!
```

**Why?** If elements start from 0, then element `0` belongs at index `0`, element `5` belongs at index `5`, and so on. The element **is** its own correct index.

```javascript
// Cyclic Sort — for elements in range 0 to n-1

let arr = [6, 3, 1, 5, 4, 2, 0]
let i = 0

while (i < arr.length) {
  const correctIdx = arr[i] // ← no "- 1" here

  if (arr[i] !== arr[correctIdx]) {
    let temp = arr[i]
    arr[i] = arr[correctIdx]
    arr[correctIdx] = temp
  } else {
    i++
  }
}
```

---

## 6. Time & Space Complexity

```
Time Complexity:  O(n)
Space Complexity: O(1)
```

**Why O(n) time?** Even though it looks like nested logic (swap-and-recheck), every swap places at least one element into its permanently correct position. Across the whole array, the total number of swaps can never exceed `n`. So overall work is linear.

**Why O(1) space?** No extra arrays or data structures are created — sorting happens in-place using only a temp variable for swapping.

---

## 7. How to Identify Cyclic Sort Problems

This is the most valuable skill from this lecture: **recognizing when to apply cyclic sort**, since problems never explicitly say "use cyclic sort."

### The Signal to Look For

> **"n distinct numbers in the range [X, Y]"** — any phrasing implying the array's values fall within a bounded range tied to the array's length.

### The Reasoning Process

```
1. Read problem statement
2. Notice: "array of n integers in range 1 to n" (or similar)
3. Ask: "If I imagine this array fully sorted, what would each
         element's correct index be?"
4. That hypothetical sorted-position rule IS your cyclic sort key
5. Apply swap-based placement to enforce that rule
```

### Important Clarification

Cyclic sort is **never mandatory** — it's a choice based on efficiency. Many of these problems are also solvable with:

- A `Set` / hashing approach
- A normal traversal with a frequency array
- Standard sort algorithms (merge sort, quick sort)

But cyclic sort is often the **most elegant and efficient** choice precisely _because_ the range constraint exists — it's like choosing a train over a bicycle when you need to travel 400km. Using a sorting algorithm that ignores the range constraint (like merge sort/quick sort) still works, but doesn't take advantage of the special structure of the problem.

---

## 8. Problem 1 — Missing Number (LeetCode 268)

### Problem Statement

> Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

### Recognizing the Pattern

```
Range given: [0, n]
Array length: n
```

**Important subtlety:** the range is `0` to `n` (inclusive), but the array only has `n` elements (indices `0` to `n-1`). This means it's **mathematically impossible** for all numbers `0` to `n` to fit — exactly **one number is always missing**. That's the guarantee built into the problem.

### Example

```
nums = [3, 0, 1]
n = 3 (array length)
Range: 0 to 3

Expected numbers: 0, 1, 2, 3
Present in array: 3, 0, 1
Missing: 2
```

### The Intuition

If the array were "sorted" under the hypothetical assumption that all of `0` to `n` exist, every element's correct index would be **itself** (the 0-to-n-1 variant rule).

After applying cyclic sort, scan through the array: wherever `index !== arr[index]`, that index is the missing number. If no mismatch is found during the scan, the missing number must be the one beyond the array's bounds — `n` itself (the array's length).

### Algorithm Steps

```
1. Apply cyclic sort, BUT add a guard condition:
   Only process element if it's within array bounds (0 to length-1)
   (Because range is 0 to n, but valid indices are only 0 to n-1 —
    the value "n" itself has nowhere to go in the array)

2. After sorting, do a simple traversal:
   For each index j, check if arr[j] !== j
   If found → j is the missing number, return it

3. If loop completes with no mismatch found:
   The missing number is nums.length (the upper bound itself)
```

### Full Code

```javascript
function missingNumber(nums) {
  let i = 0

  while (i < nums.length) {
    const correctIdx = nums[i]

    // Guard: only swap if the element actually has a valid
    // home inside this array (handles the "n" edge case)
    if (nums[i] < nums.length && nums[i] !== nums[correctIdx]) {
      let temp = nums[i]
      nums[i] = nums[correctIdx]
      nums[correctIdx] = temp
    } else {
      i++
    }
  }

  // Scan for the mismatch
  for (let j = 0; j < nums.length; j++) {
    if (j !== nums[j]) {
      return j
    }
  }

  // No mismatch found — missing number is n itself
  return nums.length
}
```

### Why the Bounds Guard Matters

```javascript
if (nums[i] < nums.length && nums[i] !== nums[correctIdx])
```

Without `nums[i] < nums.length`, if an element's value equals `n` (e.g., value `3` in a length-3 array), trying to access `nums[correctIdx]` (i.e., `nums[3]`) would be **out of bounds** — that index doesn't exist in the array. The guard skips processing for any element that can't have a "home" inside the current array.

### Walkthrough Example

```
nums = [3, 0, 1],  length = 3

i=0: nums[0]=3. Is 3 < 3? NO (3 is not less than length 3)
     → skip swap, i++  (i=1)

i=1: nums[1]=0. correctIdx = 0. Is nums[1] === nums[0]? 0 === 3? NO
     → swap: nums = [0, 3, 1]  (i stays at 1)

i=1: nums[1]=3. Is 3 < 3? NO → skip swap, i++  (i=2)

i=2: nums[2]=1. correctIdx = 1. Is nums[2] === nums[1]? 1 === 3? NO
     → swap: nums = [0, 1, 3]  (i stays at 2)

i=2: nums[2]=3. Is 3 < 3? NO → skip swap, i++  (i=3, loop ends)

Final array: [0, 1, 3]

Scan: j=0, nums[0]=0 ✓ match
      j=1, nums[1]=1 ✓ match
      j=2, nums[2]=3 ✗ MISMATCH! → return 2

Answer: 2 ✅
```

### Time & Space Complexity

```
Time:  O(n)
Space: O(1)
```

---

## 9. Problem 2 — Find All Numbers Disappeared in an Array

### Problem Statement (LeetCode)

> Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return **an array** of all the integers in the range `[1, n]` that do **not** appear in `nums`.

### Recognizing the Pattern

```
Range: [1, n]   ← this is the 1-to-n variant, correctIdx = element - 1
Array length: n
Possibly MULTIPLE missing numbers (not just one)
Duplicates exist where missing numbers should have been
```

### Example

```
nums = [4, 3, 2, 7, 8, 2, 3, 1]
n = 8

Expected numbers: 1-8
Present:          1, 2, 2, 3, 3, 4, 7, 8
Missing:           5 and 6

Note: 2 and 3 appear TWICE — they "took over" the spots
where 5 and 6 should have appeared.
```

> **Key observation:** when numbers disappear, _other_ numbers duplicate in their place. The array always has exactly `n` elements — duplicates fill the gaps left by missing numbers.

### Algorithm Steps

```
1. Apply cyclic sort using the 1-to-n rule: correctIdx = element - 1

2. After sorting, traverse the array checking:
   For each index j (0-indexed), the value SHOULD be j + 1
   If arr[j] !== j + 1, then (j + 1) is a missing number
   → push it to a results array

3. Return the results array
```

### Why `j + 1` Instead of `j`?

Because the range starts at `1`, not `0`. Index `0` should hold value `1`, index `1` should hold value `2`, and so on. So the expected value at index `j` is always `j + 1`.

### Full Code

```javascript
function findDisappearedNumbers(nums) {
  let i = 0

  while (i < nums.length) {
    const correctIdx = nums[i] - 1

    if (nums[i] !== nums[correctIdx]) {
      let temp = nums[i]
      nums[i] = nums[correctIdx]
      nums[correctIdx] = temp
    } else {
      i++
    }
  }

  const missing = []
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      missing.push(j + 1)
    }
  }

  return missing
}
```

### Walkthrough Example

```
nums = [4, 3, 2, 7, 8, 2, 3, 1]
Index:  0  1  2  3  4  5  6  7

After full cyclic sort, array becomes:
nums = [1, 2, 3, 4, 3, 6, 7, 8]
Index:   0  1  2  3  4  5  6  7

(Note: index 4 still has "3" and index 5 still has "6" because
 those are duplicate values with nowhere unique to go — they
 simply settle wherever the swap chain leaves them)

Scan:
j=0: nums[0]=1, expected 0+1=1  ✓
j=1: nums[1]=2, expected 1+1=2  ✓
j=2: nums[2]=3, expected 2+1=3  ✓
j=3: nums[3]=4, expected 3+1=4  ✓
j=4: nums[4]=3, expected 4+1=5  ✗ → push 5
j=5: nums[5]=6, expected 5+1=6  ✓
j=6: nums[6]=7, expected 6+1=7  ✓
j=7: nums[7]=8, expected 7+1=8  ✓

Result: [5]
```

> Note: in the lecture's worked example, the speaker intentionally demonstrated a case with **two** missing numbers (`4` and others depending on the exact array used) to show the algorithm naturally handles **multiple missing values**, not just one — this is the key difference from Problem 1.

### Time & Space Complexity

```
Time:  O(n)          — cyclic sort + one linear scan
Space: O(n)          — the output array storing missing numbers
                        (the sort itself is still O(1) auxiliary space)
```

---

## 10. Common Pitfalls and Edge Cases

### Pitfall 1 — Forgetting the Bounds Guard

When the range includes a value that's **outside** valid array indices (like `n` in Problem 1's `[0, n]` range), always guard against accessing `arr[correctIdx]` when `correctIdx` would be out of bounds.

```javascript
// ❌ WRONG — will crash if nums[i] === nums.length
if (nums[i] !== nums[nums[i]]) { ... }

// ✅ CORRECT — guard first
if (nums[i] < nums.length && nums[i] !== nums[nums[i]]) { ... }
```

### Pitfall 2 — Incrementing `i` After a Swap

```javascript
// ❌ WRONG — skips validating the newly swapped-in element
if (arr[i] !== arr[correctIdx]) {
  swap(arr, i, correctIdx)
  i++ // ← BUG: don't do this
}

// ✅ CORRECT — only increment when NOT swapping
if (arr[i] !== arr[correctIdx]) {
  swap(arr, i, correctIdx)
  // no i++ here
} else {
  i++
}
```

### Pitfall 3 — Using the Wrong Correct-Index Formula

```javascript
// For range [1, n]:    correctIdx = element - 1
// For range [0, n-1]:  correctIdx = element

// Mixing these up causes incorrect placements or infinite loops
```

### Edge Case — Missing Number at the Very End

In "Missing Number" (Problem 1), if the array scan finds **no mismatch at all**, it means the missing number must be `nums.length` (the upper bound of the range itself, which has no valid index inside the array).

```
Example: nums = [0, 1, 2]   (n=3, range is [0,3])
After sort: [0, 1, 2]  — every index matches its value perfectly
Scan finds no mismatch → missing number is nums.length = 3
```

---

## 11. Quick Reference Cheat Sheet

```
╔══════════════════════════════════════════════════════════╗
║                    CYCLIC SORT CHEAT SHEET                ║
╠══════════════════════════════════════════════════════════╣
║ When to use:                                              ║
║   Array of n elements, values fall in a known range       ║
║   tied to n (e.g., "1 to n" or "0 to n-1")                ║
║                                                            ║
║ Correct index formula:                                    ║
║   Range [1, n]    →  correctIdx = element - 1              ║
║   Range [0, n-1]  →  correctIdx = element                  ║
║                                                            ║
║ Core loop pattern:                                        ║
║   while (i < arr.length) {                                ║
║       correctIdx = <formula above>                        ║
║       if (arr[i] !== arr[correctIdx]) {                   ║
║           swap(arr[i], arr[correctIdx])                   ║
║           // do NOT increment i                           ║
║       } else {                                            ║
║           i++                                             ║
║       }                                                    ║
║   }                                                         ║
║                                                            ║
║ Complexity:                                                ║
║   Time:  O(n)                                              ║
║   Space: O(1)  (excluding any output array required)      ║
║                                                            ║
║ Common follow-up patterns after sorting:                  ║
║   - Find ONE missing number → scan for first mismatch,    ║
║     fallback to array length if no mismatch found         ║
║   - Find ALL missing numbers → scan fully, collect every  ║
║     mismatched expected value into a result array         ║
║   - Find duplicates → similar scan, but check for values  ║
║     that appear where they shouldn't                      ║
╚══════════════════════════════════════════════════════════╝
```

### Decision Flowchart

```
Does the problem mention "n distinct numbers in range X to Y"?
        │
        ├─ NO  → Cyclic sort doesn't apply; use other techniques
        │
        └─ YES → Is the range tied to array length (1-to-n or 0-to-n-1)?
                    │
                    ├─ NO  → Probably not cyclic sort
                    │
                    └─ YES → ✅ Cyclic sort is a strong candidate!
                              Determine correctIdx formula and apply
                              the swap-based placement algorithm.
```

---

## Practice Recommendations

Both problems covered in this lecture (Missing Number, Find All Disappeared Numbers) are LeetCode problems worth solving independently before checking the provided code:

1. **LeetCode 268 — Missing Number**
2. **LeetCode 448 — Find All Numbers Disappeared in an Array**

Try implementing both from scratch using only the cheat sheet above, then compare against the walkthroughs in this document. Pay special attention to:

- Getting the bounds guard right in Problem 1
- Not incrementing `i` prematurely after swaps
- Correctly computing missing numbers using the `j + 1` offset in Problem 2

---

_End of Lecture 15 notes — Cyclic Sort. Next topics typically build on this foundation: recursion, subsets, and permutations, where similar range-based reasoning patterns reappear with exponential and factorial time complexities._
