# 🧩 DSA Lecture 19 — Hashing Problems (Part 1)

> **Sheriyans Coding School** | Five Set and Map problems: finding the unique element, removing duplicates, pangram check, frequency counter, and sorting people by height.

> **Prerequisite:** Read Lecture 18 (Hashing Fundamentals) for Set and Map method references.

---

## Table of Contents

1. [Problem 1 — Find the Unique Element (Even-Frequency Trick)](#1-problem-1--find-the-unique-element-even-frequency-trick)
2. [Problem 2 — Remove Duplicates from Array](#2-problem-2--remove-duplicates-from-array)
3. [Problem 3 — Check if Sentence is a Pangram (LeetCode 1832)](#3-problem-3--check-if-sentence-is-a-pangram-leetcode-1832)
4. [Problem 4 — Print Frequency of Each Number](#4-problem-4--print-frequency-of-each-number)
5. [Problem 5 — Sort People by Height (LeetCode 2418)](#5-problem-5--sort-people-by-height-leetcode-2418)
6. [Pattern Recognition Guide](#6-pattern-recognition-guide)

---

## 1. Problem 1 — Find the Unique Element (Even-Frequency Trick)

### Problem Statement

> Given an array where every element appears an **even** number of times (2, 4, 6, ... times) **except one** element which appears exactly once, find and return that unique element.

```
arr = [45, 18, 10, 9, 9, 10, 45, 10, 10, 18]
         ↑ appears 2x    ↑ appears 4x    ↑ 2x
      9 appears 2x

What's unique? → 18... wait, 18 appears twice too.
Let's recheck: 45 (2x), 10 (4x), 9 (2x), 18 (2x) → all even.
The "one" unique element (appearing once) is whatever is left
after all duplicates cancel out.
```

### The Set Trick — Logic

The key insight: use `set.has()` to toggle elements in and out of the Set.

- If the element is **NOT yet in the Set** → add it (`set.add`)
- If the element **IS already in the Set** → it's a duplicate → remove it (`set.delete`)

After processing the full array, the Set will contain exactly **one element** — the unique one — because every duplicate pair gets added then immediately removed, cancelling itself out.

### Walkthrough

```
arr = [45, 18, 10, 9, 9, 10, 45, 10, 10, 18]
set = {}  (empty)

Process 45:  not in set → add       → set = {45}
Process 18:  not in set → add       → set = {45, 18}
Process 10:  not in set → add       → set = {45, 18, 10}
Process 9:   not in set → add       → set = {45, 18, 10, 9}
Process 9:   IN set     → delete    → set = {45, 18, 10}
Process 10:  IN set     → delete    → set = {45, 18}
Process 45:  IN set     → delete    → set = {18}
Process 10:  not in set → add       → set = {18, 10}
Process 10:  IN set     → delete    → set = {18}
Process 18:  IN set     → delete    → set = {}

Hmm — nothing left. The example above has no single unique element.
That means our example array was all even-frequency.

Correct example:
arr = [10, 45, 19, 9, 10, 45, 9]
After processing: set = {19}   ← the unique element ✅
```

### Code

```javascript
let arr = [10, 45, 19, 9, 10, 45, 9]
let set = new Set()

for (let i = 0; i < arr.length; i++) {
  if (set.has(arr[i])) {
    set.delete(arr[i]) // duplicate found — cancel it out
  } else {
    set.add(arr[i]) // first time seen — add it
  }
}

console.log(set) // Set { 19 }
```

### Why This Works

Every element with **even frequency** eventually cancels itself out (added then deleted the same number of times it appears, in pairs). The element with **odd frequency** (appearing once) gets added and never deleted — it's the survivor.

> **Note:** This problem is a classic, also solvable via XOR (where all duplicates cancel to 0, leaving the unique element). Both approaches are O(n) time, O(n) space for the Set approach vs O(1) space for XOR. The Set approach is shown here to build Set proficiency.

### Complexity

```
Time:  O(n)
Space: O(n)  — the Set stores at most all unique elements
```

---

## 2. Problem 2 — Remove Duplicates from Array

### Problem Statement

> Given an array with duplicate elements, return only the unique elements (each appearing exactly once). Order doesn't matter.

```
arr = [10, 10, 20, 30, 10, 20]
Output: [10, 20, 30]
```

### The One-Liner Solution

Pass the array directly to the `Set` constructor. The Set filters out all duplicates automatically, keeping only unique values in insertion order:

```javascript
let arr = [10, 10, 20, 30, 10, 20]
let set = new Set(arr)
console.log(set) // Set { 10, 20, 30 }
```

If you need the result back as an array (for further processing):

```javascript
let arr = [10, 10, 20, 30, 10, 20]
let uniqueArr = [...new Set(arr)]
console.log(uniqueArr) // [10, 20, 30]
```

### Why This Is Different from Problem 1

| Problem 1                                                  | Problem 2                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| All elements appear an even number of times **except one** | Elements appear any number of times                           |
| Goal: find the **survivor** after all pairs cancel         | Goal: get one copy of **every element**, discard extra copies |
| Toggle in/out of Set                                       | Pass array directly to Set constructor                        |

### Complexity

```
Time:  O(n)
Space: O(n)
```

---

## 3. Problem 3 — Check if Sentence is a Pangram (LeetCode 1832)

### Problem Statement

> A **pangram** is a sentence where every letter of the English alphabet appears **at least once**. Given a string `sentence` containing only lowercase English letters, return `true` if it is a pangram, `false` otherwise.

```
"thequickbrownfoxjumpsoverthelazydog"  →  true   (contains all 26 letters)
"leetcode"                              →  false  (missing many letters)
```

### The Set Insight

If you put every character of the sentence into a Set, the Set automatically deduplicates. If the sentence is a pangram, the Set will contain all 26 lowercase letters → `set.size === 26`.

### Code

```javascript
function checkIfPangram(sentence) {
  let set = new Set()

  for (let i = 0; i < sentence.length; i++) {
    set.add(sentence[i])
  }

  return set.size === 26
}
```

### Why 26?

There are 26 lowercase English letters. If all 26 appear at least once in the sentence, the Set (which keeps only unique values) will have exactly 26 entries. If any letter is missing, `set.size < 26`.

### Alternative (without hashing)

This problem can also be solved with a **bitmap array** — create a frequency array of size 26, mark each letter's position, then check all are marked. The Set approach is shown here to build hashing instincts; both are O(n).

### Complexity

```
Time:  O(n)   — one pass through the sentence
Space: O(1)   — Set holds at most 26 entries (constant, not dependent on input size)
```

---

## 4. Problem 4 — Print Frequency of Each Number

### Problem Statement

> Given an array of integers, print the frequency of each element (how many times each number appears).

```
arr = [10, 3, 5, 6, 10, 1, 3, 3, 5, 5, 7]

Output:
10 → 2
3  → 3
5  → 3
6  → 1
1  → 1
7  → 1
```

### The Map Approach

Use a Map where:

- **Key** = the element value
- **Value** = how many times it has appeared (frequency)

For each element: if the key already exists, increment its value; if not, initialize to 1.

### Code

```javascript
let arr = [10, 3, 5, 6, 10, 1, 3, 3, 5, 5, 7]
let map = new Map()

for (let i = 0; i < arr.length; i++) {
  map.set(arr[i], (map.get(arr[i]) || 0) + 1)
}

// Print the frequencies
for (let [key, value] of map) {
  console.log(`${key} → ${value}`)
}
```

### The One-Liner Logic Explained

```javascript
map.set(arr[i], (map.get(arr[i]) || 0) + 1)
```

Breaking this down step by step:

```
map.get(arr[i])      → gets current frequency (or undefined if first time)
|| 0                 → replaces undefined with 0 (default)
+ 1                  → increments by 1
map.set(arr[i], ...) → writes back the new frequency
```

This handles both cases (first occurrence and subsequent occurrences) in one line, replacing the longer if/else pattern:

```javascript
// Equivalent but longer:
if (map.has(arr[i])) {
  map.set(arr[i], map.get(arr[i]) + 1)
} else {
  map.set(arr[i], 1)
}
```

### This Pattern Applies to Everything

The frequency counter pattern works for any input type — numbers, characters, strings, objects. It's the **most commonly used Map pattern** in DSA and appears as a subproblem in many advanced problems.

### Complexity

```
Time:  O(n)
Space: O(n)  — Map stores at most n unique elements
```

---

## 5. Problem 5 — Sort People by Height (LeetCode 2418)

### Problem Statement

> You are given two arrays of equal length `n`:
>
> - `names` — array of strings (person names)
> - `heights` — array of positive integers (corresponding heights)
>
> The i-th name corresponds to the i-th height. Return the `names` array **sorted in descending order by height**.

```
names   = ["Mary", "John", "Emma"]
heights = [180,    165,    170]

Sorted by height descending (180 > 170 > 165):
Output: ["Mary", "Emma", "John"]
```

### The Key Insight — What Goes in the Map?

> **Rule:** Whatever you need to **output** should be the **value** in the Map. The other data becomes the key.

Here you need to output **names**, so:

- **Key** = height (what you'll sort by)
- **Value** = name (what you need to return)

### Algorithm

1. Build a Map pairing each height (key) to its corresponding name (value)
2. Sort the `heights` array in **descending order**
3. Build the output array by retrieving the name for each sorted height via `map.get(height)`

```
Map built:
  180 → "Mary"
  165 → "John"
  170 → "Emma"

Heights sorted descending: [180, 170, 165]

Output array:
  map.get(180) = "Mary"
  map.get(170) = "Emma"
  map.get(165) = "John"

Result: ["Mary", "Emma", "John"] ✅
```

### Code

```javascript
function sortPeople(names, heights) {
  let map = new Map()

  // Step 1: build height → name mapping
  for (let i = 0; i < names.length; i++) {
    map.set(heights[i], names[i])
  }

  // Step 2: sort heights descending
  heights.sort((a, b) => b - a)

  // Step 3: build output by looking up names from sorted heights
  for (let i = 0; i < heights.length; i++) {
    names[i] = map.get(heights[i])
  }

  return names
}
```

### Why Reuse the `names` Array?

The problem says to return the sorted names. Instead of creating a new output array, we overwrite the `names` array in place since all the data we need is already safely stored in the Map. The Map ensures the original name-to-height relationship is never lost.

### The "Output = Value" Heuristic

Whenever you're unsure which piece of data should be the key and which should be the value in a Map:

```
ASK: "What does the problem ask me to RETURN or OUTPUT?"
→ That thing becomes the VALUE in the Map.
→ The other related piece of data becomes the KEY.
```

This heuristic works for virtually every Map-based problem.

### Complexity

```
Time:  O(n log n)  — dominated by the sort step
Space: O(n)        — the Map
```

---

## 6. Pattern Recognition Guide

```
╔══════════════════════════════════════════════════════════════╗
║         WHEN TO USE SET vs MAP (PROBLEMS GUIDE)              ║
╠══════════════════════════════════════════════════════════════╣
║ USE SET WHEN:                                                  ║
║   • Need to track which elements EXIST (yes/no)               ║
║   • Need to deduplicate                                        ║
║   • Toggling elements in/out (unique element problem)          ║
║   • Checking presence efficiently                              ║
║                                                                 ║
║ USE MAP WHEN:                                                  ║
║   • Need to associate data with data (key → value)             ║
║   • Counting frequencies                                        ║
║   • Storing relationships (height → name, value → index)       ║
║   • Output = one type of data, lookup = another                 ║
║                                                                 ║
║ THE KEY HEURISTIC FOR MAP PROBLEMS:                            ║
║   "What do I need to OUTPUT?"  → that's the VALUE              ║
║   "What do I search by?"       → that's the KEY                ║
╚══════════════════════════════════════════════════════════════╝
```

### Problems Covered This Lecture

| Problem               | Structure | Core Trick                                |
| --------------------- | --------- | ----------------------------------------- |
| Find unique element   | Set       | Toggle add/delete — duplicates cancel out |
| Remove duplicates     | Set       | `new Set(array)` constructor shortcut     |
| Pangram check         | Set       | `set.size === 26` after adding all chars  |
| Frequency counter     | Map       | `map.set(x, (map.get(x) \|\| 0) + 1)`     |
| Sort people by height | Map       | Sort heights, look up names via Map       |

---

_End of Lecture 19 — Hashing Problems Part 1. Next: Lecture 20 covers the harder Map problems — Two Sum (brute force + optimized), intersection of two arrays, subarray sum = k, longest subarray with sum k, and longest consecutive sequence._
