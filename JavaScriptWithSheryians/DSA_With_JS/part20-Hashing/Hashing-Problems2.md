# 🔬 DSA Lecture 20 — Hashing Problems (Part 2)

> **Sheriyans Coding School** | Five advanced Map/Set problems: Two Sum, intersection of arrays, subarray sum = k, longest subarray with sum k, and longest consecutive sequence.

> **Prerequisite:** Lectures 18 and 19. These problems build heavily on the frequency counter and Set-membership patterns.

---

## Table of Contents

1. [Problem 1 — Two Sum (LeetCode 1)](#1-problem-1--two-sum-leetcode-1)
2. [Problem 2 — Intersection of Two Arrays (LeetCode 349)](#2-problem-2--intersection-of-two-arrays-leetcode-349)
3. [Problem 3 — Subarray Sum Equals K (GFG / LeetCode 560)](#3-problem-3--subarray-sum-equals-k-gfg--leetcode-560)
4. [Problem 4 — Longest Subarray with Sum K (GFG)](#4-problem-4--longest-subarray-with-sum-k-gfg)
5. [Problem 5 — Longest Consecutive Sequence (LeetCode 128)](#5-problem-5--longest-consecutive-sequence-leetcode-128)
6. [Algorithm Comparison Table](#6-algorithm-comparison-table)

---

## 1. Problem 1 — Two Sum (LeetCode 1)

### Problem Statement

> Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to `target`. Each input has exactly one solution, and you may not use the same element twice.

```
nums = [2, 7, 11, 15],  target = 9
Output: [0, 1]     (nums[0] + nums[1] = 2 + 7 = 9)

nums = [15, 2, 11, 7],  target = 9
Output: [1, 3]     (nums[1] + nums[3] = 2 + 7 = 9)
```

---

### Approach 1 — Brute Force (O(n²))

Check every pair (i, j) where j > i. If `nums[i] + nums[j] === target`, return `[i, j]`.

```javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
```

This works and submits on LeetCode, but O(n²) is slow for large inputs.

---

### Approach 2 — Optimized with Map (O(n))

**The Core Insight:**

If `x + y = target`, then `y = target - x`.

For each element `x` we encounter, we just need to check whether `target - x` already exists somewhere earlier in the array. A Map lets us do that in O(1).

**Map structure:**

- **Key** = element value (what we search by)
- **Value** = element index (what we need to return)

> Using the "output = value" heuristic: we need to return **indices**, so indices are the values.

**Algorithm:**

For each element `nums[i]`:

1. Check if `target - nums[i]` exists as a key in the Map
   - If YES → we found our pair. Return `[i, map.get(target - nums[i])]`
   - If NO → store `nums[i]` as key and `i` as value, then continue
2. If no pair found during the loop, the problem guarantees one always exists

### Walkthrough

```
nums = [15, 2, 11, 7],  target = 9
map = {}  (empty)

i=0: nums[0]=15. target - 15 = -6. Is -6 in map? No.
     Store: map = { 15→0 }

i=1: nums[1]=2.  target - 2 = 7.  Is 7 in map? No.
     Store: map = { 15→0, 2→1 }

i=2: nums[2]=11. target - 11 = -2. Is -2 in map? No.
     Store: map = { 15→0, 2→1, 11→2 }

i=3: nums[3]=7.  target - 7 = 2.  Is 2 in map? YES! map.get(2) = 1
     Return [3, 1]  ✅
```

### Code

```javascript
function twoSum(nums, target) {
  let map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]

    if (map.has(complement)) {
      return [i, map.get(complement)]
    }

    map.set(nums[i], i)
  }

  return [-1, -1] // problem guarantees this never runs
}
```

### The Space-Time Tradeoff in Action

```
Brute force:  Time O(n²),  Space O(1)
Map approach: Time O(n),   Space O(n)

We spent extra space (the Map) to save time.
This is the classic hashing tradeoff.
```

### Complexity

```
Time:  O(n)
Space: O(n)
```

---

## 2. Problem 2 — Intersection of Two Arrays (LeetCode 349)

### Problem Statement

> Given two integer arrays `nums1` and `nums2`, return an array of their **intersection** — elements that appear in **both** arrays. Each element in the result must be **unique** (no duplicates in output), and you may return the result in any order.

```
nums1 = [1, 2, 1],  nums2 = [2, 2]
Output: [2]

nums1 = [4, 9, 5],  nums2 = [9, 4, 9, 8, 4]
Output: [9, 4]
```

### The Set Approach

1. Put all elements of `nums1` into a Set (automatically deduplicates `nums1`)
2. For each element in `nums2`, check if it exists in the Set AND isn't already in the result
3. If both conditions are true, add it to the result array

The "not already in result" check prevents duplicate entries in the output.

### Walkthrough

```
nums1 = [1, 2, 1],  nums2 = [2, 2]

Step 1: set = new Set(nums1) → Set { 1, 2 }
        answer = []

Step 2: traverse nums2:
  nums2[0] = 2: in set? YES. in answer? NO  → push 2. answer = [2]
  nums2[1] = 2: in set? YES. in answer? YES → skip (already there)

Output: [2] ✅
```

### Code

```javascript
function intersection(nums1, nums2) {
  let set = new Set(nums1) // dedup nums1
  let answer = []

  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i]) && !answer.includes(nums2[i])) {
      answer.push(nums2[i])
    }
  }

  return answer
}
```

### Homework: Intersection II (LeetCode 350)

The same problem but output may contain duplicates (each element appears as many times as it appears in both arrays). Hint: use a Map with frequency counts instead of a Set. Work it out yourself and paste the solution in the comments.

### Complexity

```
Time:  O(n)   — building Set is O(n), traversing nums2 is O(m)
Space: O(n)   — Set stores nums1's unique elements
```

---

## 3. Problem 3 — Subarray Sum Equals K (GFG / LeetCode 560)

### Problem Statement

> Given an unsorted array of integers and an integer `k`, find the **count** of subarrays (contiguous portions of the array) whose elements sum to exactly `k`.

```
arr = [10, 2, -2, -20, 10],  k = -10
Output: 3

Subarrays with sum = -10:
  [10, 2, -2, -20]           (indices 0-3)
  [2, -2, -20, 10]           (indices 1-4)
  [-20, 10]                  (indices 3-4)
```

### Brute Force (O(n²)) — Understand First

```javascript
function subarraySum(arr, k) {
  let count = 0
  let sum = 0

  for (let i = 0; i < arr.length; i++) {
    sum = 0
    for (let j = i; j < arr.length; j++) {
      sum += arr[j]
      if (sum === k) count++
    }
  }

  return count
}
```

This works but is O(n²). For n = 10⁵, this likely causes TLE.

---

### Optimized Approach — Prefix Sum + Map (O(n))

**The Big Idea — Prefix Sum:**

A **prefix sum** at index `i` is the sum of all elements from index `0` to `i`. If we know the prefix sum at two different indices, their difference tells us the sum of the subarray between those indices.

```
If prefixSum[j] - prefixSum[i] = k
Then the subarray from index (i+1) to j has sum = k
```

**Rearranging:** `prefixSum[j] - k = prefixSum[i]`

So for each current `sum`, we check: **has `sum - k` appeared before as a prefix sum?** If yes, there's a valid subarray ending at the current index.

**Map structure:**

- **Key** = prefix sum value
- **Value** = how many times this prefix sum has appeared

**The Initialization Rule:** Before traversing, insert `{0: 1}` into the Map. This handles the case where a subarray starting at index 0 sums to exactly `k`.

### Algorithm

```
1. Initialize: map = { 0: 1 },  sum = 0,  count = 0
2. For each element:
   a. Add current element to sum (running prefix sum)
   b. Check if (sum - k) exists in map
      → If YES: count += map.get(sum - k)
   c. Add/update current sum in map (increment frequency)
3. Return count
```

### Walkthrough

```
arr = [10, 2, -2, -20, 10],  k = -10
map = { 0: 1 },  sum = 0,  count = 0

i=0: sum = 0 + 10 = 10
     sum - k = 10 - (-10) = 20. Is 20 in map? No.
     map = { 0:1, 10:1 }

i=1: sum = 10 + 2 = 12
     sum - k = 12 - (-10) = 22. Is 22 in map? No.
     map = { 0:1, 10:1, 12:1 }

i=2: sum = 12 + (-2) = 10
     sum - k = 10 - (-10) = 20. Is 20 in map? No.
     10 already in map → frequency becomes 2.
     map = { 0:1, 10:2, 12:1 }

i=3: sum = 10 + (-20) = -10
     sum - k = -10 - (-10) = 0. Is 0 in map? YES! count += map.get(0) = 1
     count = 1
     map = { 0:1, 10:2, 12:1, -10:1 }

i=4: sum = -10 + 10 = 0
     sum - k = 0 - (-10) = 10. Is 10 in map? YES! count += map.get(10) = 2
     count = 3
     0 already in map → frequency becomes 2.
     map = { 0:2, 10:2, 12:1, -10:1 }

Final count: 3 ✅
```

### Code

```javascript
function subarraySum(arr, k) {
  let map = new Map()
  map.set(0, 1) // crucial initialization
  let sum = 0
  let count = 0

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]

    if (map.has(sum - k)) {
      count += map.get(sum - k)
    }

    map.set(sum, (map.get(sum) || 0) + 1)
  }

  return count
}
```

### Why `map.set(0, 1)` at the Start?

Consider `arr = [1, 2, 3], k = 6`. The entire array sums to 6.

At i=2, `sum = 6`. We check `sum - k = 0`. If we hadn't pre-loaded `{0: 1}`, this check would fail and we'd miss the valid subarray `[1, 2, 3]`.

The `{0: 1}` represents: "before we start, we've seen a prefix sum of 0 exactly once (the empty prefix before index 0)."

### Complexity

```
Time:  O(n)
Space: O(n)
```

---

## 4. Problem 4 — Longest Subarray with Sum K (GFG)

### Problem Statement

> Given an array of integers and an integer `k`, find the **length** of the longest subarray whose elements sum to exactly `k`. If no such subarray exists, return 0.

```
arr = [10, 5, 2, 7, 1, -10],  k = 15
Output: 6     (the entire array: 10+5+2+7+1-10 = 15)

arr = [10, 5, 2, 7, 1, -10],  k = 15
Subarrays with sum 15:
  [10, 5]           length 2
  [5, 2, 7, 1]      length 4
  [10, 5, 2, 7, 1, -10]  length 6  ← LONGEST
```

### How This Differs from Problem 3

| Problem 3                                    | Problem 4                                                  |
| -------------------------------------------- | ---------------------------------------------------------- |
| **Count** of subarrays with sum k            | **Length** of longest subarray with sum k                  |
| Map value = **frequency** of each prefix sum | Map value = **first index** where each prefix sum appeared |

### The Index-Based Approach

The same prefix sum logic applies, but instead of tracking _frequency_, we track the **first index** at which each prefix sum occurred. Knowing two indices lets us calculate subarray length: `length = current_index - stored_index`.

**Critical Rule:** If a prefix sum appears more than once, **do NOT update the stored index**. We always want the **earliest** index so we get the longest possible subarray.

> If we updated on a repeat, we'd get a shorter subarray. Keeping the first occurrence maximizes the distance.

**Initialization:** `map.set(0, -1)` — the prefix sum 0 exists at virtual index -1 (before the array starts), so a subarray from index 0 to `i` has length `i - (-1) = i + 1`.

### Algorithm

```
1. Initialize: map = { 0: -1 },  sum = 0,  longest = 0
2. For each element at index i:
   a. sum += arr[i]  (running prefix sum)
   b. If (sum - k) exists in map:
      → length = i - map.get(sum - k)
      → longest = max(longest, length)
   c. If sum is NOT already in map:
      → map.set(sum, i)      ← only store FIRST occurrence
      (if already in map, do nothing — keep earliest index)
3. Return longest
```

### Walkthrough

```
arr = [10, 5, 2, 7, 1, -10],  k = 15
map = { 0: -1 },  sum = 0,  longest = 0

i=0: sum = 10.  sum-k = 10-15 = -5. In map? No.
     10 not in map → map.set(10, 0). map = {0:-1, 10:0}

i=1: sum = 15.  sum-k = 15-15 = 0.  In map? YES!
     length = 1 - (-1) = 2.  longest = max(0, 2) = 2
     15 not in map → map.set(15, 1). map = {0:-1, 10:0, 15:1}

i=2: sum = 17.  sum-k = 17-15 = 2.  In map? No.
     map.set(17, 2). map = {..., 17:2}

i=3: sum = 24.  sum-k = 24-15 = 9.  In map? No.
     map.set(24, 3).

i=4: sum = 25.  sum-k = 25-15 = 10. In map? YES! map.get(10) = 0
     length = 4 - 0 = 4.  longest = max(2, 4) = 4
     25 not in map → map.set(25, 4).

i=5: sum = 15.  sum-k = 15-15 = 0.  In map? YES! map.get(0) = -1
     length = 5 - (-1) = 6.  longest = max(4, 6) = 6
     15 ALREADY in map → DO NOT update (keep index 1, the first occurrence)

Final longest: 6 ✅
```

### Code

```javascript
function longestSubarrayWithSumK(arr, k) {
  let map = new Map()
  map.set(0, -1) // crucial initialization
  let sum = 0
  let longest = 0

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]

    if (map.has(sum - k)) {
      const length = i - map.get(sum - k)
      longest = Math.max(longest, length)
    }

    // Only store FIRST occurrence of each prefix sum
    if (!map.has(sum)) {
      map.set(sum, i)
    }
  }

  return longest
}
```

### The Key Difference from Problem 3

```javascript
// Problem 3 (count): update frequency every time
map.set(sum, (map.get(sum) || 0) + 1)

// Problem 4 (longest length): only store first occurrence
if (!map.has(sum)) {
  map.set(sum, i)
}
```

This single-line difference is what distinguishes counting subarrays from finding the longest subarray.

### Complexity

```
Time:  O(n)
Space: O(n)
```

---

## 5. Problem 5 — Longest Consecutive Sequence (LeetCode 128)

### Problem Statement

> Given an unsorted array of integers `nums`, return the length of the **longest consecutive elements sequence**. Must run in O(n) time.

```
nums = [100, 4, 200, 1, 3, 2]
Output: 4   (sequence: 1, 2, 3, 4)

nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9   (sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8)
```

"Consecutive" means integers that follow each other with no gaps (like 5, 6, 7, 8).

---

### Approach 1 — Sort-Based (O(n log n))

Sort the array, then scan for consecutive elements (where `arr[i] === arr[i-1] + 1`). Handle duplicates by skipping elements equal to the previous.

```javascript
function longestConsecutive(nums) {
  if (nums.length === 0) return 0
  nums.sort((a, b) => a - b)

  let longest = 1
  let count = 1

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue // skip duplicates
    if (nums[i] === nums[i - 1] + 1) {
      count++
    } else {
      longest = Math.max(longest, count)
      count = 1
    }
  }

  return Math.max(longest, count)
}
```

This passes LeetCode (n = 10⁵, so n log n is fine). But the problem asks for O(n), so let's go further.

---

### Approach 2 — Set-Based (O(n))

**The Core Insight:**

For each element, only start counting a sequence if that element is the **sequence's starting point** — meaning `element - 1` does NOT exist in the array.

Why? If `element - 1` exists, some earlier element already started a sequence that includes our current element. We'd be double-counting.

**Algorithm:**

1. Put all elements into a Set (for O(1) lookup, and automatic deduplication)
2. Traverse the Set. For each element `x`:
   - If `x - 1` is in the Set → skip (not a sequence start)
   - If `x - 1` is NOT in the Set → `x` is a sequence start
     - Count forward: while `x + count` exists in the Set, increment `count`
     - Update `longest = max(longest, count)`
3. Return `longest`

### Why Is This O(n) Despite the While Loop?

Each element is visited at most twice: once during the outer traversal (as a potential sequence start), and once during the inner while loop (as part of exactly one sequence's counting). No element is ever processed twice in the while loop because we skip non-starting elements in the outer loop.

Total work = O(n) + O(n) = O(n).

### Walkthrough

```
nums = [100, 4, 200, 1, 3, 2]
set = {100, 4, 200, 1, 3, 2}   (unordered)
longest = 0

Check 100: Is 99 in set? No. → 100 is a start.
           Is 101 in set? No. count = 1. longest = 1.

Check 4:   Is 3 in set? Yes. → SKIP (not a start).

Check 200: Is 199 in set? No. → 200 is a start.
           Is 201 in set? No. count = 1. longest = 1.

Check 1:   Is 0 in set? No. → 1 is a start.
           Is 2 in set? Yes → count = 2
           Is 3 in set? Yes → count = 3
           Is 4 in set? Yes → count = 4
           Is 5 in set? No  → stop. longest = 4.

Check 3:   Is 2 in set? Yes. → SKIP.

Check 2:   Is 1 in set? Yes. → SKIP.

Final longest: 4 ✅  (sequence: 1, 2, 3, 4)
```

### Code

```javascript
function longestConsecutive(nums) {
  let set = new Set(nums)
  let longest = 0

  for (let x of set) {
    // Only process sequence starts
    if (!set.has(x - 1)) {
      let count = 1

      // Count forward through consecutive elements
      while (set.has(x + count)) {
        count++
      }

      longest = Math.max(longest, count)
    }
  }

  return longest
}
```

**Note:** We iterate over the `set`, not the original `nums` array. This avoids redundant processing of duplicate elements. If `nums` has four copies of `5`, iterating over the set means we process `5` only once.

### Key Insight Summary

```
The algorithm's efficiency comes from one rule:
  "Only process an element if it's the START of its sequence."

How to check if x is a start: set.has(x - 1) === false

This ensures each consecutive chain is counted exactly once,
starting from its minimum element, giving O(n) overall.
```

### Complexity

```
Approach 1 (sort):  Time O(n log n),  Space O(1)
Approach 2 (Set):   Time O(n),        Space O(n)
```

---

## 6. Algorithm Comparison Table

| Problem                | Data Structure | Map Key       | Map Value       | Core Check            | Complexity |
| ---------------------- | -------------- | ------------- | --------------- | --------------------- | ---------- |
| Two Sum                | Map            | Element value | Element index   | `map.has(target - x)` | O(n)       |
| Intersection of Arrays | Set            | —             | —               | `set.has(nums2[i])`   | O(n)       |
| Subarray Sum = k       | Map            | Prefix sum    | **Frequency**   | `map.has(sum - k)`    | O(n)       |
| Longest Subarray Sum k | Map            | Prefix sum    | **First index** | `map.has(sum - k)`    | O(n)       |
| Longest Consecutive    | Set            | —             | —               | `!set.has(x - 1)`     | O(n)       |

### The Prefix Sum Family (Problems 3 and 4)

These two problems share the same skeleton — they're distinguished by what the Map stores as a value:

```
Count subarrays  → store FREQUENCY  → count += map.get(sum - k)
Longest subarray → store FIRST INDEX → length = i - map.get(sum - k)
                                        update map only if key is new
```

Master this distinction and you can solve the entire prefix sum family of problems.

---

## Closing Notes

These five problems represent the most common hashing patterns you'll encounter at the interview/competitive programming level:

- **Two Sum** → the canonical "complement lookup" pattern, appears everywhere
- **Intersection** → Set membership check pattern
- **Subarray sum count / longest subarray** → prefix sum + Map (very important family of problems)
- **Longest consecutive sequence** → sequence start detection with Set

None of these algorithms are something you'd invent from scratch in a contest — they're learned, internalized, and applied. The goal is to recognize which pattern fits a new problem. Work through each one on paper (copy-pen), then implement from the cheat sheet without looking at the code.

---

_End of Lecture 20 — Hashing Problems Part 2. This completes the Hashing series (Lectures 18–20). The next series in the course continues with recursion-based topics where some of these hashing patterns will reappear as subproblems._
