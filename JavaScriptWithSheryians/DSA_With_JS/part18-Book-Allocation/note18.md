# 📚 DSA Lecture 18 — Allocate Minimum Pages

> **Sheriyans Coding School** | A MAANG-level Binary Search problem — the hardest category of Binary Search questions. Covers the "Binary Search on Answer" pattern, the "Minimize the Maximum" identification signal, and the Greedy validation function.

> **Prerequisite:** Lectures 16 and 17 (Binary Search). This is the advanced culmination of that series.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Understanding the Problem — Worked Example](#2-understanding-the-problem--worked-example)
3. [Why Binary Search? How to Identify This Pattern](#3-why-binary-search-how-to-identify-this-pattern)
4. [Finding the Search Space (First & Last Pointers)](#4-finding-the-search-space-first--last-pointers)
5. [The IsValid Function — Greedy Checker](#5-the-isvalid-function--greedy-checker)
6. [Full Algorithm Walkthrough](#6-full-algorithm-walkthrough)
7. [Full Code Implementation](#7-full-code-implementation)
8. [Time & Space Complexity](#8-time--space-complexity)
9. [Related Problems (Same Pattern)](#9-related-problems-same-pattern)
10. [Quick Reference Cheat Sheet](#10-quick-reference-cheat-sheet)

---

## 1. Problem Statement

> **Allocate Minimum Pages** (GFG — Medium difficulty label, but MAANG-hard in practice)
>
> You are given an array `arr` of integers where `arr[i]` represents the **number of pages** in the i-th book. You also have an integer `k` representing the **number of students**.
>
> Allocate books to each student such that:
>
> 1. **Every student receives at least one book**
> 2. **Each student is assigned a contiguous sequence of books** (no skipping around)
> 3. **No book is assigned to more than one student**
>
> **Objective:** Minimize the maximum number of pages assigned to any single student.
>
> Return `-1` if a valid assignment is not possible.

### When Is It Impossible?

If the number of students `k` is greater than the number of books `n`, it's impossible — every student needs at least one book, but there aren't enough books to go around. Return `-1`.

### Key Phrase

> **"Minimize the Maximum"** — out of all possible book allocations, find the one where the student who gets the most pages still gets the fewest pages possible.

---

## 2. Understanding the Problem — Worked Example

### Setup

```
arr = [2, 5, 7, 3]   (4 books with 2, 5, 7, 3 pages respectively)
k = 2                 (2 students)
```

All possible ways to split 4 books between 2 students (contiguous only):

```
Split        Student A           Student B       Max pages
─────────────────────────────────────────────────────────
[2] | [5,7,3]    → 2           →  15            → 15
[2,5] | [7,3]    → 7           →  10            → 10   ← candidate
[2,5,7] | [3]    → 14          →  3             → 14
[2,5,7,3] | []   → INVALID (student B gets nothing)
```

For each split, find the **maximum pages** assigned to any student:

- Split 1: max = 15
- Split 2: max = 10
- Split 3: max = 14

**Out of all these maximums, which is the smallest?** → **10**

So the answer is `10`. This is what "minimize the maximum" means.

### Why Does This Matter Intuitively?

Think of it as a workload distribution problem. If you give one student all the heavy books, that's unfair — they're overloaded. You want to distribute books so the most-burdened student still has as light a load as possible.

---

## 3. Why Binary Search? How to Identify This Pattern

The problem never says "use Binary Search." The array isn't sorted. So how do we know?

### The Three Identification Signals

When you see **all three** of these in a problem, apply Binary Search on Answer:

```
Signal 1: "Minimize the Maximum" phrasing
          → out of all possible maximum values, find the minimum one

Signal 2: Contiguous / adjacent allocation required
          → you must pick consecutive elements, not random ones

Signal 3: Some distribution happening
          → distributing tasks/books/packages/loads among workers/students
```

This specific pattern is called **Binary Search on Answer** — you don't binary search on the array itself, you binary search on the **possible range of answers**.

### The Key Insight

> No matter what valid allocation you make, the student with the most books will always have at least as many pages as the single largest book in the array. That's your lower bound.
>
> The worst case is if one student reads everything — that's the total sum of all pages. That's your upper bound.
>
> The answer must lie somewhere in `[max element, sum of all elements]`.

---

## 4. Finding the Search Space (First & Last Pointers)

Instead of searching through the array, you search through **possible answer values**:

```
first = max(arr)          ← minimum possible answer
                            (the most-pages book MUST be assigned to someone)

last  = sum(arr)          ← maximum possible answer
                            (worst case: one student reads everything)
```

### For the Example

```
arr = [2, 5, 7, 3]

first = max(2, 5, 7, 3) = 7
last  = 2 + 5 + 7 + 3   = 17

Search space: [7, 17]
```

The answer lies somewhere between 7 and 17. Binary search this range.

### Why `max(arr)` as the Lower Bound?

The book with the most pages will definitely be assigned to _some_ student. No student can avoid it. So the maximum any student reads is **at least** as much as the largest book. Any answer below `max(arr)` is impossible.

### Why `sum(arr)` as the Upper Bound?

If we only had 1 student (or k = 1), they'd read every book. The total pages is the absolute worst case. Any valid answer is `≤ sum(arr)`.

---

## 5. The IsValid Function — Greedy Checker

For each `mid` (candidate maximum pages limit) produced by Binary Search, we need to check: **"Can I distribute all books among exactly k students, such that no student reads more than `mid` pages?"**

This is the core helper function.

### Algorithm

```
Given: arr, mid (upper page limit per student), k (number of students)

1. Start with student count = 1, running sum = 0
2. For each book:
   a. If adding this book to the current student's load would EXCEED mid:
      → This book starts the NEXT student's allocation
      → numStudents++
      → New running sum = this book's pages alone
   b. Else:
      → Add this book to current student's running sum
3. If numStudents > k at any point → return false (not feasible)
4. If we finish all books with numStudents ≤ k → return true
```

### Why Greedy?

We greedily assign as many consecutive books as possible to each student (without exceeding the limit). This is optimal because:

- Giving a student fewer books than they can handle would force the next student to take more
- The greedy approach maximally packs each student before moving on

### Walkthrough: arr = [2,5,7,3], mid = 12, k = 2

```
numStudents = 1, sum = 0

Book 2: sum + 2 = 2 ≤ 12 → sum = 2
Book 5: sum + 5 = 7 ≤ 12 → sum = 7
Book 7: sum + 7 = 14 > 12 → OVERFLOW
         numStudents = 2, sum = 7 (book 7 starts new student)
Book 3: sum + 3 = 10 ≤ 12 → sum = 10

numStudents = 2, k = 2 → 2 ≤ 2 → VALID ✅ return true
```

### Walkthrough: arr = [2,5,7,3], mid = 9, k = 2

```
numStudents = 1, sum = 0

Book 2: sum + 2 = 2 ≤ 9 → sum = 2
Book 5: sum + 5 = 7 ≤ 9 → sum = 7
Book 7: sum + 7 = 14 > 9 → OVERFLOW
         numStudents = 2, sum = 7
Book 3: sum + 3 = 10 > 9 → OVERFLOW
         numStudents = 3, k = 2 → 3 > 2 → INVALID ✅ return false
```

---

## 6. Full Algorithm Walkthrough

```
arr = [2, 5, 7, 3],  k = 2
first = 7,  last = 17,  answer = -1
```

**Iteration 1:**

```
mid = floor((7 + 17) / 2) = 12
isValid([2,5,7,3], 12, 2)?

  sum=2 → sum=7 → overflow(7+7=14>12) → student 2, sum=7
  → sum=10 → end. numStudents=2 ≤ k=2 → TRUE

Possible answer found! answer = 12
Try to minimize → last = mid - 1 = 11
```

**Iteration 2:**

```
mid = floor((7 + 11) / 2) = 9
isValid([2,5,7,3], 9, 2)?

  sum=2 → sum=7 → overflow(7+7=14>9) → student 2, sum=7
  → overflow(7+3=10>9) → student 3, numStudents=3 > k=2 → FALSE

Not valid. Need to increase page limit.
first = mid + 1 = 10
```

**Iteration 3:**

```
mid = floor((10 + 11) / 2) = 10
isValid([2,5,7,3], 10, 2)?

  sum=2 → sum=7 → overflow(7+7=14>10) → student 2, sum=7
  → sum=10 → end. numStudents=2 ≤ k=2 → TRUE

Possible answer found! answer = 10
Try to minimize → last = mid - 1 = 9
```

**Iteration 4:**

```
first = 10, last = 9
first > last → STOP
```

**Final Answer: 10** ✅

### The Greedy "Lalaach" (Greed) Logic

```
When isValid returns TRUE:
  → We found a valid answer. Store it.
  → But can we do BETTER? Try a smaller page limit.
  → last = mid - 1  (search left / smaller values)

When isValid returns FALSE:
  → This limit is too small; not enough pages per student.
  → We need to increase the page limit.
  → first = mid + 1  (search right / larger values)
```

This greedy optimization keeps tightening the answer until we find the minimum feasible maximum.

---

## 7. Full Code Implementation

```javascript
function isValid(arr, mid, k) {
  let numStudents = 1
  let sum = 0

  for (let i = 0; i < arr.length; i++) {
    if (sum + arr[i] > mid) {
      // This book overflows → assign to next student
      numStudents++
      sum = arr[i] // new student starts with this book

      // Early exit: too many students needed
      if (numStudents > k) return false
    } else {
      sum += arr[i]
    }
  }

  return true
}

function findPages(arr, k) {
  // Edge case: more students than books
  if (k > arr.length) return -1

  // Define the search space
  let first = 0
  let last = 0

  for (let i = 0; i < arr.length; i++) {
    first = Math.max(first, arr[i]) // max element
    last += arr[i] // sum of all elements
  }

  let answer = -1

  while (first <= last) {
    const mid = Math.floor((first + last) / 2)

    if (isValid(arr, mid, k)) {
      answer = mid // valid → store and try smaller
      last = mid - 1
    } else {
      first = mid + 1 // not valid → need bigger limit
    }
  }

  return answer
}
```

### Why the Edge Case Check Comes First?

```javascript
if (k > arr.length) return -1
```

If there are more students than books, some student would get zero books — violating constraint 1. We catch this before computing `first` and `last` to avoid wasted work.

---

## 8. Time & Space Complexity

```
Time Complexity:  O(n log n)

  Breakdown:
  - Computing first and last:  O(n)
  - Binary search iterations:  O(log(sum - max))  ≈  O(log n)
    (the search space is bounded by n * max_value)
  - Each isValid call:          O(n)
  - Total for while loop:       O(n) * O(log n) = O(n log n)
  - Overall:                    O(n) + O(n log n) = O(n log n)

Space Complexity: O(1)
  No extra data structures used — only a few variables.
```

**Compared to brute force:** A naive approach checking all possible allocations is exponential. Binary Search on Answer reduces it to O(n log n).

---

## 9. Related Problems (Same Pattern)

These problems share the **exact same skeleton**. The only difference is what you're distributing and what the "validity" check looks like:

| Problem                                                 | Search Space                 | isValid checks                                              |
| ------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| **Allocate Minimum Pages** (this)                       | [max(arr), sum(arr)]         | Can k students read all books with ≤ mid pages each?        |
| **Capacity to Ship Packages in D Days** (LeetCode 1011) | [max(weights), sum(weights)] | Can you ship all packages in D days with ship capacity mid? |
| **Koko Eating Bananas** (LeetCode 875)                  | [1, max(piles)]              | Can Koko eat all bananas in H hours at rate mid?            |
| **Minimum Threshold**                                   | varies                       | Similar greedy validation                                   |
| **Split Array Largest Sum** (LeetCode 410)              | [max(arr), sum(arr)]         | Can you split into k parts with max part sum ≤ mid?         |

> **Homework:** Solve LeetCode 1011 (Capacity to Ship Packages). The code from this lecture works with minimal changes — the isValid function just needs to check "days needed" instead of "students needed."

---

## 10. Quick Reference Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║           ALLOCATE MINIMUM PAGES — CHEAT SHEET                   ║
╠══════════════════════════════════════════════════════════════════╣
║ IDENTIFICATION SIGNALS (Binary Search on Answer):                 ║
║   1. "Minimize the Maximum" (or "Maximize the Minimum")           ║
║   2. Contiguous/adjacent allocation required                       ║
║   3. Distribution among workers/students/days                     ║
║                                                                     ║
║ EDGE CASE:                                                         ║
║   k > n (more students than books) → return -1                    ║
║                                                                     ║
║ SEARCH SPACE:                                                       ║
║   first = max(arr)    ← largest single book (lower bound)          ║
║   last  = sum(arr)    ← everyone reads everything (upper bound)    ║
║                                                                     ║
║ BINARY SEARCH LOOP:                                                ║
║   mid = floor((first + last) / 2)                                  ║
║   if isValid(arr, mid, k):                                         ║
║       answer = mid                                                  ║
║       last = mid - 1     ← try smaller (greedy: minimize)          ║
║   else:                                                             ║
║       first = mid + 1    ← need bigger limit                       ║
║                                                                     ║
║ ISVALID FUNCTION:                                                   ║
║   numStudents = 1, sum = 0                                         ║
║   for each book:                                                    ║
║       if sum + book > mid:                                          ║
║           numStudents++                                             ║
║           sum = book                                                ║
║           if numStudents > k: return false                          ║
║       else:                                                         ║
║           sum += book                                               ║
║   return true                                                       ║
║                                                                     ║
║ COMPLEXITY:                                                         ║
║   Time:  O(n log n)                                                 ║
║   Space: O(1)                                                       ║
╚══════════════════════════════════════════════════════════════════╝
```

### Mental Model

```
Think of Binary Search here as searching for the RIGHT ANSWER VALUE,
not for an element in an array.

        [7 ......... 12 ......... 17]
         ↑            ↑            ↑
       too         valid?        valid but
       small      (try it)      too big

Each mid value is a CANDIDATE MAXIMUM PAGE LIMIT.
isValid() checks: "If I cap each student at mid pages,
                   can I serve all k students?"

TRUE  → valid answer, try smaller  → last = mid - 1
FALSE → limit too tight, need more → first = mid + 1
```

---

_End of Lecture 18 — Allocate Minimum Pages. This is the hardest Binary Search pattern — "Binary Search on Answer." Once this clicks, problems like Koko Eating Bananas, Ship Packages, and Split Array Largest Sum all reduce to the same three-step template: define the search space, write isValid, binary search with greedy direction._
