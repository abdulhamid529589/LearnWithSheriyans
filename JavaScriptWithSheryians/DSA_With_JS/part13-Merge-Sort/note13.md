# 📘 DSA Series — Lecture 13
# 🔀 Merge Sort — Divide & Conquer Algorithm

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 13 — Merge Sort

---

## 📌 Table of Contents

1. [What is Merge Sort?](#1-what-is-merge-sort)
2. [Prerequisites](#2-prerequisites)
3. [The Big Picture — Divide & Conquer](#3-the-big-picture--divide--conquer)
4. [Step 1: Conquer (Merging) — Learn This First](#4-step-1-conquer-merging--learn-this-first)
   - [Core Merging Logic](#41-core-merging-logic)
   - [Full Merging Dry Run](#42-full-merging-dry-run)
   - [Merging Code (conquer function)](#43-merging-code-conquer-function)
5. [Step 2: Divide — Recursive Splitting](#5-step-2-divide--recursive-splitting)
   - [How Dividing Works](#51-how-dividing-works)
   - [When to Stop Dividing](#52-when-to-stop-dividing)
   - [Divide Code](#53-divide-code)
6. [Full Algorithm Visualization](#6-full-algorithm-visualization)
7. [Complete Code](#7-complete-code)
8. [Time & Space Complexity](#8-time--space-complexity)
9. [Why Merge Sort is Preferred in Tech Companies](#9-why-merge-sort-is-preferred-in-tech-companies)
10. [Comparison with Other Sorting Algorithms](#10-comparison-with-other-sorting-algorithms)
11. [Complete Cheat Sheet](#11-complete-cheat-sheet)

---

## 1. What is Merge Sort?

> **Merge Sort** is a **Divide and Conquer** based sorting algorithm that:
> 1. **Divides** the array into two halves recursively until each part has 1 element
> 2. **Conquers** by merging those sorted halves back together in sorted order

```
Input:  [8, 2, 1, 9, 5, 12, 4, 20]
Output: [1, 2, 4, 5, 8, 9, 12, 20]
```

**Key properties:**
- Works on the **Divide and Conquer** principle
- Uses **recursion** to split the problem
- Uses **backtracking** to merge
- **O(N log N)** time complexity — in ALL cases (best, average, worst)
- **Stable sort** — equal elements maintain their relative order

---

## 2. Prerequisites

Before studying Merge Sort, make sure these are clear:

| Prerequisite | Why Needed |
|---|---|
| **Merge Two Sorted Arrays** | The core merging logic comes directly from this |
| **Recursion + Backtracking** | Divide uses recursion; Merge happens during backtracking |
| **Binary Search (mid formula)** | We use the same `first + (last - first) / 2` to find mid |

> ⚠️ If "Merge Two Sorted Arrays" isn't clear, go back and study it first. Merge Sort is literally that problem applied recursively.

---

## 3. The Big Picture — Divide & Conquer

### The Strategy

```
DIVIDE:   Split the array in half recursively → until single elements
CONQUER:  Merge sorted halves back together → building sorted result
```

### Why Learn Merging FIRST?

Most tutorials teach Divide first, then Conquer. **This lecture reverses it** — and for good reason:

> If you understand merging, dividing is a 1-minute concept.
> If you try to understand dividing first, you'll get confused about what the end goal is.

**Mental model:**
- Assume you have two sorted partitions of the same array
- Your job: merge them into one sorted result
- Once merging makes sense → add recursion to handle the dividing automatically

---

## 4. Step 1: Conquer (Merging) — Learn This First

### 4.1 Core Merging Logic

**Setup:**
- You have ONE array (not two separate arrays)
- The array has two "partitions" — both are already sorted
- You need to merge them into a single sorted result within the same array

```
Same array, two sorted partitions:
[1, 2, 8, 9 | 4, 5, 12, 20]
 ←left part→  ←right part→
 (sorted)      (sorted)

Goal: [1, 2, 4, 5, 8, 9, 12, 20]
```

**Three pointers:**
```
first    = start of left partition
mid      = end of left partition
mid + 1  = start of right partition
last     = end of right partition
```

**How many elements to process?**

Formula: `last - first + 1`

```
Example: first=1, last=4
Elements between them: 1, 2, 3, 4 → count = 4 - 1 + 1 = 4 ✅
```

### 4.2 Full Merging Dry Run

**Input array:** `[1, 2, 8, 9, 4, 5, 12, 20]`
**first=0, mid=3, last=7**

```
Left partition:  arr[0..3] = [1, 2, 8, 9]  (sorted)
Right partition: arr[4..7] = [4, 5, 12, 20] (sorted)
```

**Step 1: Create temporary array**
```javascript
let temp = new Array(last - first + 1);   // size = 7 - 0 + 1 = 8
// temp = [_, _, _, _, _, _, _, _]
```

**Step 2: Set up three pointers**
```
i = first = 0    (left partition pointer)
j = mid + 1 = 4  (right partition pointer)
k = 0            (temp array pointer)
```

**Step 3: Compare and fill temp**

```
State: [1, 2, 8, 9, 4, 5, 12, 20]
        i=0        j=4

Compare arr[i]=1 vs arr[j]=4 → 1 < 4 → place arr[i] in temp
temp = [1, _, _, _, _, _, _, _]
i=1, k=1

Compare arr[i]=2 vs arr[j]=4 → 2 < 4 → place arr[i] in temp
temp = [1, 2, _, _, _, _, _, _]
i=2, k=2

Compare arr[i]=8 vs arr[j]=4 → 8 > 4 → place arr[j] in temp
temp = [1, 2, 4, _, _, _, _, _]
j=5, k=3

Compare arr[i]=8 vs arr[j]=5 → 8 > 5 → place arr[j] in temp
temp = [1, 2, 4, 5, _, _, _, _]
j=6, k=4

Compare arr[i]=8 vs arr[j]=12 → 8 < 12 → place arr[i] in temp
temp = [1, 2, 4, 5, 8, _, _, _]
i=3, k=5

Compare arr[i]=9 vs arr[j]=12 → 9 < 12 → place arr[i] in temp
temp = [1, 2, 4, 5, 8, 9, _, _]
i=4, k=6

Now i=4 > mid=3 → LEFT partition exhausted!
```

**Step 4: Handle remaining elements**

```
Left exhausted, but right still has: arr[j]=12, arr[7]=20
Copy remaining right elements to temp:

temp = [1, 2, 4, 5, 8, 9, 12, 20]
```

**Step 5: Copy temp back to original array**

```javascript
// t = first = 0 (start of where we need to place in original arr)
// p = 0 (temp array pointer)
for p from 0 to temp.length:
    arr[t] = temp[p]
    t++, p++

Original arr: [1, 2, 4, 5, 8, 9, 12, 20] ✅
```

### 4.3 Merging Code (conquer function)

```javascript
function conquer(arr, first, mid, last) {
  // Step 1: Create temporary array of the exact size needed
  let temp = new Array(last - first + 1);

  // Step 2: Set up pointers
  let i = first;       // left partition pointer (starts at first)
  let j = mid + 1;     // right partition pointer (starts at mid+1)
  let k = 0;           // temp array pointer

  // Step 3: Compare elements from both partitions
  // Continue as long as BOTH partitions have elements
  while (i <= mid && j <= last) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i];   // left element is smaller → place it
      k++;
      i++;
    } else {
      temp[k] = arr[j];   // right element is smaller → place it
      k++;
      j++;
    }
  }

  // Step 4a: Left partition has remaining elements
  while (i <= mid) {
    temp[k] = arr[i];
    k++;
    i++;
  }

  // Step 4b: Right partition has remaining elements
  while (j <= last) {
    temp[k] = arr[j];
    k++;
    j++;
  }

  // Step 5: Copy sorted temp back to original array
  let t = first;   // start from 'first' in original array
  let p = 0;       // start from 0 in temp array
  while (p < temp.length) {
    arr[t] = temp[p];
    t++;
    p++;
  }
}
```

**Why copy back?**
> The merging is done in a temporary array to avoid overwriting values we still need. Once merging is complete, we paste the result back into the original array at the correct positions (starting from `first`, not from 0).

---

## 5. Step 2: Divide — Recursive Splitting

### 5.1 How Dividing Works

Once merging is understood, dividing is simple:

```
Given an array segment [first ... last]:
1. Find mid = first + Math.floor((last - first) / 2)
2. Recursively call divide for left half:  [first ... mid]
3. Recursively call divide for right half: [mid+1 ... last]
4. After BOTH recursive calls return → call conquer (merge)
```

**Key insight — same array, different pointers:**
```
Original array: [8, 2, 1, 9, 5, 12, 4, 20]
                 ↑                        ↑
               first=0                 last=7

After finding mid=3:
Left call:  divide(arr, 0, 3)   → works on indices 0-3
Right call: divide(arr, 4, 7)   → works on indices 4-7

Both operate on the SAME array — just different sections!
```

### 5.2 When to Stop Dividing

**Stop condition:** `first >= last`

This means the partition has only **one element** (or is invalid). A single element is trivially sorted.

```
first=3, last=3 → only arr[3] exists → already sorted → STOP (return)
```

**Why `>=` instead of `==`?**
- `first > last` shouldn't normally happen but is a safety net
- `first == last` means exactly one element → stop

### 5.3 Divide Code

```javascript
function divide(arr, first, last) {
  // Base Case: one element or invalid → already sorted → stop
  if (first >= last) {
    return;
  }

  // Find the middle point
  let mid = first + Math.floor((last - first) / 2);

  // Recursively divide left half
  divide(arr, first, mid);

  // Recursively divide right half
  divide(arr, mid + 1, last);

  // BACKTRACKING: after both halves are sorted, merge them
  conquer(arr, first, mid, last);
}
```

**The flow explained:**
```
divide(arr, first, last):
  → divide left half  (goes all the way down to single elements)
  → divide right half (goes all the way down to single elements)
  → conquer (merge)   ← runs on the way BACK UP (backtracking!)
```

This is classic **backtracking** from the Recursion lecture:
- Code **before** recursive calls → runs going down (but here there's nothing)
- Code **after** recursive calls → runs coming back up → this is where merging happens

---

## 6. Full Algorithm Visualization

**Input:** `[8, 2, 1, 9, 5, 12, 4, 20]`

### Phase 1: DIVIDE (going down)

```
Level 0:  [8, 2, 1, 9, 5, 12, 4, 20]
                      ↓ split at mid=3
Level 1:  [8, 2, 1, 9]      [5, 12, 4, 20]
               ↓ mid=1           ↓ mid=5
Level 2:  [8, 2]  [1, 9]   [5, 12]  [4, 20]
            ↓        ↓        ↓         ↓
Level 3:  [8][2]  [1][9]   [5][12]  [4][20]
          ← single elements → STOP DIVIDING
```

### Phase 2: CONQUER/MERGE (coming back up — backtracking)

```
Level 3 → Level 2:
  [8][2]  → merge → [2, 8]
  [1][9]  → merge → [1, 9]
  [5][12] → merge → [5, 12]
  [4][20] → merge → [4, 20]

Level 2 → Level 1:
  [2, 8] + [1, 9]   → merge → [1, 2, 8, 9]
  [5, 12] + [4, 20] → merge → [4, 5, 12, 20]

Level 1 → Level 0:
  [1, 2, 8, 9] + [4, 5, 12, 20] → merge → [1, 2, 4, 5, 8, 9, 12, 20] ✅
```

### Recursive Tree

```
                divide(0, 7)
               /            \
        divide(0,3)        divide(4,7)
        /        \          /        \
  divide(0,1)  divide(2,3)  divide(4,5)  divide(6,7)
  /      \     /      \     /      \     /      \
d(0,0) d(1,1) d(2,2) d(3,3) d(4,4) d(5,5) d(6,6) d(7,7)
  ↑ base case (single elements — stop here)

Then on the way BACK UP:
conquer(0,0,1) → merges [8][2]   → [2,8]
conquer(2,2,3) → merges [1][9]   → [1,9]
conquer(0,1,3) → merges [2,8]+[1,9] → [1,2,8,9]
...and so on
```

---

## 7. Complete Code

```javascript
// CONQUER (MERGE) — merges two sorted partitions of arr
function conquer(arr, first, mid, last) {
  // Create temp array for the partition being merged
  let temp = new Array(last - first + 1);

  let i = first;     // pointer for left partition [first..mid]
  let j = mid + 1;   // pointer for right partition [mid+1..last]
  let k = 0;         // pointer for temp array

  // Merge: compare left and right elements, place smaller in temp
  while (i <= mid && j <= last) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }

  // Copy remaining left elements (if any)
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  // Copy remaining right elements (if any)
  while (j <= last) {
    temp[k++] = arr[j++];
  }

  // Copy sorted temp back to original array
  let t = first;
  let p = 0;
  while (p < temp.length) {
    arr[t++] = temp[p++];
  }
}

// DIVIDE — recursively splits the array, then merges on backtrack
function divide(arr, first, last) {
  // Base Case: 1 element (or invalid) → already sorted
  if (first >= last) {
    return;
  }

  // Find midpoint
  let mid = first + Math.floor((last - first) / 2);

  divide(arr, first, mid);       // sort left half
  divide(arr, mid + 1, last);    // sort right half
  conquer(arr, first, mid, last); // merge both halves (BACKTRACKING)
}

// Main
let arr = [8, 2, 1, 9, 5, 12, 4, 20];
divide(arr, 0, arr.length - 1);
console.log(arr);  // [1, 2, 4, 5, 8, 9, 12, 20]
```

---

## 8. Time & Space Complexity

### Time Complexity

#### Divide Part

```
At each level, we split by half:
Level 0: 1 array of 8 elements
Level 1: 2 arrays of 4 elements
Level 2: 4 arrays of 2 elements
Level 3: 8 arrays of 1 element

Number of levels = log₂(N) → O(log N)
```

#### Conquer (Merge) Part

```
At each level, we process ALL N elements total:
Level 3: 8 merges of 1 element each  = 8 operations
Level 2: 4 merges of 2 elements each = 8 operations
Level 1: 2 merges of 4 elements each = 8 operations
Level 0: 1 merge of 8 elements       = 8 operations

Each level processes N elements total → O(N) per level
```

#### Total

```
Levels: O(log N)
Work per level: O(N)
Total: O(N log N)
```

**Time Complexity: O(N log N) — for ALL cases (best, average, worst)**

> Unlike Quick Sort (which can be O(N²) in worst case), Merge Sort guarantees O(N log N) always.

### Space Complexity

At each recursive call, we create a temp array. The total extra space used at any point = O(N).

**Space Complexity: O(N)**

```
╔═══════════════╦═══════════════╦════════════════╗
║ Case          ║ Time          ║ Space          ║
╠═══════════════╬═══════════════╬════════════════╣
║ Best Case     ║ O(N log N)    ║ O(N)           ║
║ Average Case  ║ O(N log N)    ║ O(N)           ║
║ Worst Case    ║ O(N log N)    ║ O(N)           ║
╚═══════════════╩═══════════════╩════════════════╝
```

---

## 9. Why Merge Sort is Preferred in Tech Companies

### 1. Guaranteed O(N log N) — No Worst Case Trap

```
Bubble Sort:    O(N²)      always slow on large data
Quick Sort:     O(N log N) average, but O(N²) worst case (bad pivot)
Merge Sort:     O(N log N) ALWAYS — no bad cases possible
```

### 2. Stable Sort

**Stable** means equal elements maintain their original relative order.

```
Input:  [(Alice, 25), (Bob, 30), (Carol, 25)]
Sorted by age:

Stable sort:   [(Alice, 25), (Carol, 25), (Bob, 30)]  ← Alice before Carol (original order)
Unstable sort: [(Carol, 25), (Alice, 25), (Bob, 30)]  ← order might flip
```

This matters in databases, multi-key sorting, etc.

### 3. Efficient for Linked Lists

Merge Sort works naturally on linked lists without needing random access (unlike Quick Sort which benefits from arrays).

### 4. External Sorting (Large Datasets)

When data is too large to fit in RAM (like sorting 1TB of data), Merge Sort is used to sort chunks on disk and merge them. This is called **External Merge Sort** — used by databases everywhere.

---

## 10. Comparison with Other Sorting Algorithms

```
╔═══════════════════╦═══════════╦═══════════╦═══════════╦══════════╦══════════╗
║ Algorithm         ║ Best      ║ Average   ║ Worst     ║ Space    ║ Stable?  ║
╠═══════════════════╬═══════════╬═══════════╬═══════════╬══════════╬══════════╣
║ Bubble Sort       ║ O(N)      ║ O(N²)     ║ O(N²)     ║ O(1)     ║ ✅ Yes   ║
║ Selection Sort    ║ O(N²)     ║ O(N²)     ║ O(N²)     ║ O(1)     ║ ❌ No    ║
║ Insertion Sort    ║ O(N)      ║ O(N²)     ║ O(N²)     ║ O(1)     ║ ✅ Yes   ║
║ Merge Sort        ║ O(N logN) ║ O(N logN) ║ O(N logN) ║ O(N)     ║ ✅ Yes   ║
║ Quick Sort        ║ O(N logN) ║ O(N logN) ║ O(N²)     ║ O(log N) ║ ❌ No    ║
╚═══════════════════╩═══════════╩═══════════╩═══════════╩══════════╩══════════╝
```

**Key takeaway:** Merge Sort is the only sort here that is **both stable AND O(N log N) in worst case**.

---

## 11. Complete Cheat Sheet

### Algorithm Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      MERGE SORT                                 │
│                                                                 │
│  divide(arr, first, last):                                      │
│    if first >= last: return      ← Base case (1 element)       │
│    mid = first + floor((last-first)/2)                          │
│    divide(arr, first, mid)       ← Sort left half              │
│    divide(arr, mid+1, last)      ← Sort right half             │
│    conquer(arr, first, mid, last) ← Merge (BACKTRACKING)       │
│                                                                 │
│  conquer(arr, first, mid, last):                                │
│    temp = new Array(last - first + 1)                           │
│    i = first, j = mid+1, k = 0                                  │
│    while i<=mid AND j<=last:                                    │
│      place smaller of arr[i], arr[j] in temp; advance pointers │
│    copy remaining left elements to temp                         │
│    copy remaining right elements to temp                        │
│    copy temp back to arr[first..last]                           │
└─────────────────────────────────────────────────────────────────┘
```

### Key Rules to Remember

```
╔═══════════════════════════════════════════════════════════════╗
║ DIVIDE                                                        ║
║   mid = first + Math.floor((last - first) / 2)               ║
║   Left partition:  [first ... mid]                            ║
║   Right partition: [mid+1 ... last]                           ║
║   Stop when:       first >= last (single element)             ║
╠═══════════════════════════════════════════════════════════════╣
║ CONQUER (MERGE)                                               ║
║   Temp array size: last - first + 1                           ║
║   i starts at: first (left partition)                         ║
║   j starts at: mid + 1 (right partition)                      ║
║   k starts at: 0 (temp array)                                 ║
║   Copy temp back: starting at index 'first' in original arr  ║
╠═══════════════════════════════════════════════════════════════╣
║ WHEN DOES MERGING HAPPEN?                                     ║
║   During BACKTRACKING — after both recursive calls return     ║
║   Code after recursive calls = backtracking phase             ║
╚═══════════════════════════════════════════════════════════════╝
```

### Complexity Quick Reference

```
Time:   O(N log N) — ALL cases (best, average, worst)
Space:  O(N) — temporary arrays during merging
Stable: YES — equal elements maintain original order
```

### Common Mistakes

```
❌ Copying temp back starting from index 0 (wrong)
   Should start from index 'first' — only that segment was merged

❌ Using arr.length for temp size (wrong)
   Should use last - first + 1 — only that window's size

❌ Merging BEFORE recursive calls (wrong)
   Conquer must come AFTER both divide calls (backtracking)

❌ Using simple mid formula (risky in Java/C++)
   Wrong:   mid = (first + last) / 2   (overflow risk)
   Correct: mid = first + (last - first) / 2
```

---

## How to Study Merge Sort (Practice Guide)

```
Step 1: Understand "Merge Two Sorted Arrays" problem first
        → This is the exact logic used in conquer()

Step 2: Understand the merging (conquer) step alone
        → Dry run manually on paper with [1,2,8,9 | 4,5,12,20]

Step 3: Understand the dividing (divide) step
        → Trace the recursion tree on paper

Step 4: Connect them: divide goes DOWN, conquer happens coming BACK UP

Step 5: Write the full code from memory (without looking at notes)

Step 6: Test with:
        - Already sorted array     → should still work
        - Reverse sorted array     → should work
        - Single element array     → should return immediately
        - Array with duplicates    → should work (stable)

Repeat steps 5-6 at least 2-4 times until it flows naturally.
```

---

*📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 13*
*📌 Instructor: Ali Ansari*
*🔗 Related: Merge Two Sorted Arrays, Recursion + Backtracking, Binary Search (mid formula)*