# 🔀 DSA Lecture 17 — Search in Rotated Sorted Array

> **Sheriyans Coding School** | LeetCode 33. A Binary Search variant for an array that _was_ sorted but got rotated at some unknown pivot point — and is no longer fully sorted overall.

> **Prerequisite:** This builds on the standard Binary Search lecture and the Search Insert Position lecture. Watch those first if you haven't.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [What Does "Rotated" Mean?](#2-what-does-rotated-mean)
3. [Identifying This as a Binary Search Problem](#3-identifying-this-as-a-binary-search-problem)
4. [The Core Idea — Find the Sorted Half](#4-the-core-idea--find-the-sorted-half)
5. [The Full Decision Tree](#5-the-full-decision-tree)
6. [Walkthrough — Complete Example](#6-walkthrough--complete-example)
7. [Full Code Implementation](#7-full-code-implementation)
8. [Time & Space Complexity](#8-time--space-complexity)
9. [Quick Reference Cheat Sheet](#9-quick-reference-cheat-sheet)

---

## 1. Problem Statement

> **LeetCode 33 — Search in Rotated Sorted Array** (Difficulty: Medium — but conceptually simpler than it sounds)
>
> There is an integer array `nums` sorted in ascending order with **distinct values**. Prior to being passed to a function, `nums` is **possibly rotated** at an unknown pivot index `k`.
>
> So the array `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]` after rotating at pivot index 3.
>
> Given the rotated array `nums` and an integer `target`, return the index of `target` if it exists in `nums`, or `-1` if it does not.
>
> You must write an algorithm with **O(log n)** runtime complexity.

### Example

```
Original (sorted):  [0, 1, 2, 4, 5, 6, 7]
Rotated at pivot 3:  [4, 5, 6, 7, 0, 1, 2]

target = 0  →  found at index 4
target = 3  →  not in array → return -1
```

> **What is a "pivot"?** The pivot is the point around which all elements got rotated. Imagine grabbing the array at index 3 and rotating everything around that point — that's exactly what happened in the example above.

---

## 2. What Does "Rotated" Mean?

This is the **new concept** in this lecture: the array is **not fully sorted overall**, yet Binary Search can still be applied — just not blindly across the whole array.

```
Fully sorted array:        [0, 1, 2, 4, 5, 6, 7]
                             ↑ entirely ascending

Rotated sorted array:      [4, 5, 6, 7, 0, 1, 2]
                             ↑sorted↑  ↑sorted↑
                             (left half)  (right half)
```

**The critical observation:** even though the _whole_ array isn't sorted, it always breaks into **two sorted halves** at the rotation point. This is the key fact the entire algorithm is built on.

---

## 3. Identifying This as a Binary Search Problem

Same identification process as the previous lecture:

```
Clue 1: The array WAS sorted before rotation
        → suggests some sorted-array technique applies

Clue 2: "must write an algorithm with O(log n) runtime"
        → THE deciding clue. Only Binary Search achieves O(log n).
```

> Even though the array looks unsorted at first glance, the O(log n) requirement tells you Binary Search must somehow still work here. The "how" is what this lecture explains.

---

## 4. The Core Idea — Find the Sorted Half

### The Strategy in One Sentence

> **At every step of Binary Search, one of the two halves (left of mid, or right of mid) is guaranteed to be fully sorted. Identify which half that is, then check if the target could exist there.**

### Why This Works

```
Since the array was sorted and rotated at exactly ONE point,
that rotation point can only be in ONE of the two halves
created by splitting at "mid". The OTHER half must be
completely sorted (no rotation point inside it).
```

### How to Tell Which Half Is Sorted

```javascript
if (nums[first] <= nums[mid]) {
  // left half (first ... mid) is sorted
} else {
  // right half (mid+1 ... last) is sorted
}
```

**Why does this check work?** If the element at `first` is smaller than or equal to the element at `mid`, that segment must be in ascending order with no rotation break inside it — meaning it's the clean, sorted half.

---

## 5. The Full Decision Tree

Once you know which half is sorted, you still need to check **whether the target could be hiding inside that sorted half**. Just finding a sorted half doesn't guarantee your target is there.

```
┌─────────────────────────────────────────────────────────┐
│                     AT EVERY STEP:                        │
├─────────────────────────────────────────────────────────┤
│ 1. Calculate mid = floor((first + last) / 2)              │
│                                                             │
│ 2. Check: is nums[mid] === target?                        │
│    YES → return mid                                       │
│                                                             │
│ 3. Determine which half is sorted:                        │
│    IF nums[first] <= nums[mid]:                            │
│         → LEFT half (first to mid) is sorted               │
│                                                              │
│         Check: is target within [nums[first], nums[mid]]? │
│           YES → target must be in left half                │
│                 → last = mid                                │
│           NO  → target must be in right half                │
│                 → first = mid + 1                            │
│                                                              │
│    ELSE:                                                    │
│         → RIGHT half (mid+1 to last) is sorted              │
│                                                              │
│         Check: is target within [nums[mid+1], nums[last]]? │
│           YES → target must be in right half                │
│                 → first = mid + 1                            │
│           NO  → target must be in left half                 │
│                 → last = mid                                 │
└─────────────────────────────────────────────────────────┘
```

> **Why `last = mid` and not `last = mid - 1`?** Because we haven't yet ruled out `mid` itself as a potential match in this branch — being careful with boundaries here avoids accidentally skipping over the target. (Note: this is a subtle implementation detail worth testing carefully against edge cases.)

---

## 6. Walkthrough — Complete Example

```
nums = [4, 5, 6, 7, 0, 1, 2]
Index:  0  1  2  3  4  5  6
target = 0
```

**Step 1:**

```
first = 0, last = 6
mid = floor((0 + 6) / 2) = 3
nums[mid] = 7

Is nums[mid] === target?  7 === 0? NO

Which half is sorted?
Is nums[first] <= nums[mid]?  nums[0]=4 <= nums[3]=7?  YES
→ LEFT half (index 0 to 3) is sorted: [4, 5, 6, 7]

Is target within [nums[first], nums[mid]] = [4, 7]?
Is 0 >= 4 AND 0 <= 7?  NO (0 is not >= 4)
→ target is NOT in the left half
→ search the right half: first = mid + 1 = 4
```

**Step 2:**

```
first = 4, last = 6
mid = floor((4 + 6) / 2) = 5
nums[mid] = 1

Is nums[mid] === target?  1 === 0? NO

Which half is sorted?
Is nums[first] <= nums[mid]?  nums[4]=0 <= nums[5]=1?  YES
→ LEFT half (index 4 to 5) is sorted: [0, 1]

Is target within [nums[first], nums[mid]] = [0, 1]?
Is 0 >= 0 AND 0 <= 1?  YES!
→ target IS in the left half
→ last = mid = 5
```

**Step 3:**

```
first = 4, last = 5
mid = floor((4 + 5) / 2) = 4
nums[mid] = 0

Is nums[mid] === target?  0 === 0? YES!
→ return mid = 4
```

**Answer: `4`** ✅

---

## 7. Full Code Implementation

```javascript
function search(nums, target) {
  let first = 0
  let last = nums.length - 1

  while (first <= last) {
    const mid = Math.floor((first + last) / 2)

    // Check 1: direct hit
    if (nums[mid] === target) {
      return mid
    }

    // Check 2: which half is sorted?
    if (nums[first] <= nums[mid]) {
      // LEFT half (first...mid) is sorted

      if (target >= nums[first] && target <= nums[mid]) {
        // target lives in the sorted left half
        last = mid
      } else {
        // target must be in the right half
        first = mid + 1
      }
    } else {
      // RIGHT half (mid+1...last) is sorted

      if (target >= nums[mid + 1] && target <= nums[last]) {
        // target lives in the sorted right half
        first = mid + 1
      } else {
        // target must be in the left half
        last = mid
      }
    }
  }

  // Loop ended without finding target
  return -1
}
```

### Breaking Down the Two Branches

```
BRANCH A — Left half is sorted (nums[first] <= nums[mid]):

    nums[first] ≤ ... ≤ nums[mid]   ← guaranteed sorted

    If target falls inside [nums[first], nums[mid]]:
        → it MUST be in this half (since this half is sorted
          and contiguous, no rotation breaks can hide it elsewhere)
        → shrink search to: last = mid

    Else:
        → target must be in the messier right half
        → shrink search to: first = mid + 1


BRANCH B — Right half is sorted (nums[first] > nums[mid]):

    nums[mid+1] ≤ ... ≤ nums[last]   ← guaranteed sorted

    If target falls inside [nums[mid+1], nums[last]]:
        → it MUST be in this half
        → shrink search to: first = mid + 1

    Else:
        → target must be in the messier left half
        → shrink search to: last = mid
```

### Submission Result (as shown in the lecture)

The lecture confirms this approach runs and submits successfully on LeetCode once the small implementation typos (mixing up variable names like `mid` vs `m`) are fixed.

---

## 8. Time & Space Complexity

```
Time Complexity:  O(log n)
Space Complexity: O(1)
```

**Why O(log n)?** Despite the added complexity of checking which half is sorted, the search space is still **halved on every iteration** — exactly like standard Binary Search. The extra checks (determining the sorted half, checking target range) are all O(1) operations that don't affect the overall logarithmic behavior.

**Why O(1) space?** Only pointer variables (`first`, `last`, `mid`) are used — no extra arrays or recursive call stacks (assuming an iterative implementation, as shown above).

---

## 9. Quick Reference Cheat Sheet

```
╔════════════════════════════════════════════════════════════════╗
║         SEARCH IN ROTATED SORTED ARRAY — CHEAT SHEET            ║
╠════════════════════════════════════════════════════════════════╣
║ Identification signal:                                           ║
║   "sorted array, possibly rotated" + "O(log n) required"         ║
║   → Modified Binary Search                                       ║
║                                                                     ║
║ THE BIG IDEA:                                                     ║
║   A rotated sorted array always splits into exactly              ║
║   TWO sorted halves around the pivot. At every step of           ║
║   binary search, identify which half (left of mid, or            ║
║   right of mid) is the clean sorted one.                          ║
║                                                                     ║
║ How to detect the sorted half:                                   ║
║   if (nums[first] <= nums[mid])                                   ║
║         → LEFT half is sorted                                     ║
║   else                                                              ║
║         → RIGHT half is sorted                                    ║
║                                                                     ║
║ Then, check if target falls inside that sorted half's range:     ║
║   If YES → search inside that half                                 ║
║   If NO  → search the OTHER half                                  ║
║                                                                     ║
║ Loop ends without a match → return -1                             ║
║                                                                     ║
║ Complexity:                                                        ║
║   Time:  O(log n)                                                  ║
║   Space: O(1)                                                      ║
╚════════════════════════════════════════════════════════════════╝
```

### Mental Model

```
Think of the rotated array as TWO sorted "ramps" placed
back-to-back, with a sudden DROP at the rotation point:

  [4, 5, 6, 7 | 0, 1, 2]
   ramp 1 ↗      ramp 2 ↗
              ↑
        sudden drop here (the pivot)

Whichever side of "mid" you're looking at, ONE side will
always be a clean uninterrupted ramp (no drop inside it).
That's your sorted half — and standard range-checking logic
tells you whether to dig into it or skip to the other side.
```

### Common Mistake to Avoid

```javascript
// ❌ Don't assume nums[first] < nums[last] means the WHOLE
//    array is sorted just because you're inside a sub-range —
//    always re-check sortedness for the CURRENT first/mid/last
//    window on every iteration, since the window shrinks each time.

// ✅ Always recompute: is nums[first] <= nums[mid] for THIS
//    iteration's first, mid, and last values.
```

---

## Practice Recommendation

Implement this from scratch using only the cheat sheet, then test against:

1. A target that exists in the "left sorted half" of the first split
2. A target that exists in the "right sorted half"
3. A target that doesn't exist at all (confirm you get `-1`)
4. An edge case: an array with **no rotation at all** (pivot = 0) — confirm the algorithm still works correctly since technically the entire array is the "sorted half" in that case

---

_End of Lecture 17 notes — Search in Rotated Sorted Array. The key lesson here: Binary Search doesn't strictly require a fully sorted array — it requires the ability to reliably eliminate half the search space at every step. Once you find ANY reliable way to do that (like identifying a sorted half), Binary Search's O(log n) guarantee still holds._
