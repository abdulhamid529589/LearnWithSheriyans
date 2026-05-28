# 🌟 Pattern Programming — Detailed Logic Notes

> **DSA study notes** from Sheriyans Coding School — Ali Ansari. Focus: the _observing and thinking logic_ behind every pattern. **Do not memorize patterns — learn to observe them.**

---

## Table of Contents

1. [Setup — Tools Needed for Pattern Programming](#1-setup--tools-needed-for-pattern-programming)
2. [The Base Pattern — Foundation of All Patterns](#2-the-base-pattern--foundation-of-all-patterns)
3. [How Nested Loops Work — Detailed Execution](#3-how-nested-loops-work--detailed-execution)
4. [The Golden Rule of Pattern Observation](#4-the-golden-rule-of-pattern-observation)
5. [Pattern 1 — Right Angle Triangle (Stars)](#5-pattern-1--right-angle-triangle-stars)
6. [Pattern 2 — Right Angle Triangle (Numbers 1 2 3)](#6-pattern-2--right-angle-triangle-numbers-1-2-3)
7. [Pattern 3 — Right Angle Triangle (Alphabets A B C)](#7-pattern-3--right-angle-triangle-alphabets-a-b-c)
8. [Pattern 4 — Inverted Right Angle Triangle](#8-pattern-4--inverted-right-angle-triangle)
9. [Pattern 5 — Mirror Right Angle Triangle](#9-pattern-5--mirror-right-angle-triangle)
10. [Pattern 6 — X Pattern](#10-pattern-6--x-pattern)
11. [Pattern 7 — V Pattern](#11-pattern-7--v-pattern)
12. [Homework Patterns](#12-homework-patterns)
13. [Universal Approach to Any Pattern](#13-universal-approach-to-any-pattern)

---

## 1. Setup — Tools Needed for Pattern Programming

### Why `console.log` Is Not Enough

`console.log` always moves to the **next line** after printing. You cannot print things side-by-side (horizontally) using `console.log` alone.

For pattern programming, you need two tools:

### Tool 1 — `process.stdout.write` (Print Without New Line)

```javascript
process.stdout.write('hello')
process.stdout.write(' world')
// Output: hello world  (same line!)
```

**Important:** This is a **Node.js** function, NOT a browser window function. It will NOT work in the browser console. You must run your code via Node.

**vs console.log:**

```javascript
console.log('hello')
console.log('world')
// Output:
// hello
// world   ← always goes to next line

process.stdout.write('hello')
process.stdout.write('world')
// Output:
// helloworld  ← stays on same line
```

### Tool 2 — `prompt-sync` (Take Input in Terminal)

The `prompt()` function is a browser function. To take input in the Node terminal:

```bash
# Install once
npm install prompt-sync
```

```javascript
// At top of your file
const prompt = require('prompt-sync')
const pr = prompt()

// Use it
let n = Number(pr('Enter a number: '))
```

### Running Your File

```bash
node app.js
```

### How to Move to the Next Line

Use an **empty `console.log()`** — it prints nothing but moves the cursor to the next line:

```javascript
process.stdout.write('* ')
process.stdout.write('* ')
console.log() // ← go to next line
process.stdout.write('* ')
// Output:
// * *
// *
```

---

## 2. The Base Pattern — Foundation of All Patterns

Before learning any pattern, understand the **base pattern**: N rows × N columns of stars.

```
* * * * *
* * * * *
* * * * *
* * * * *
* * * * *
```

### The Logic

```
Outer loop → controls ROWS (runs N times)
Inner loop → controls COLUMNS (runs N times per row)
After inner loop → console.log() to go to next line
```

### The Equation

```
i = row number (1 to N)
j = column number (1 to N)

For every (i, j) combination → print one star
After every row (j loop ends) → new line
```

### Two Key Truths (Memorize These)

```
1. ROWS are always controlled by the OUTER loop (i)
2. COLUMNS are always controlled by the INNER loop (j)
```

---

## 3. How Nested Loops Work — Detailed Execution

This is the most important concept to understand deeply before solving any pattern.

### Step-by-Step Execution (N = 5, Base Pattern)

```
Outer loop starts: i = 1 (First row begins)
  Inner loop: j = 1 → print * (j ≤ 5? Yes)
  Inner loop: j = 2 → print * (j ≤ 5? Yes)
  Inner loop: j = 3 → print * (j ≤ 5? Yes)
  Inner loop: j = 4 → print * (j ≤ 5? Yes)
  Inner loop: j = 5 → print * (j ≤ 5? Yes)
  Inner loop: j = 6 → STOP (j ≤ 5? No)
  console.log() → move to next line

Outer loop: i = 2 (Second row begins)
  Inner loop RESTARTS: j = 1 again (declared fresh!)
  Inner loop: j = 1 → print *
  Inner loop: j = 2 → print *
  ... continues same way ...
  Inner loop ends → console.log()

Outer loop: i = 3 → same process
...
Outer loop: i = 6 → STOP (i ≤ 5? No)
```

### Critical Insight — Inner Loop Resets Every Row

Each time the outer loop completes one iteration and comes back, the inner loop is **declared fresh**. `j` starts from 1 again. This happens because `let j = 1` is inside the outer loop's scope — it gets re-created every time.

```
i = 1: j goes 1 → 5, then resets
i = 2: j goes 1 → 5 again, then resets
i = 3: j goes 1 → 5 again, then resets
```

**This reset behavior is what makes pattern programming work.**

---

## 4. The Golden Rule of Pattern Observation

> "Don't memorize patterns. Learn to observe patterns."

### The Observation Method (Apply to Every Pattern)

**Step 1 — Count the Rows**
Always count how many rows the pattern has. The answer is always **N rows** (where N is the user input). This confirms: **outer loop runs from 1 to N**.

**Step 2 — Observe Each Row's Columns**
For every row (i = 1, 2, 3...), count how many elements (stars, spaces, numbers) appear. Find the relationship between the row number (i) and the column count.

**Step 3 — Find the i-j Relationship**
Ask: "For row i, when should a star print? When should a space print?" Express this as a condition using i and j.

**Step 4 — Identify If It's a Combination**
Some patterns are two simpler patterns combined. Recognize which two.

---

## 5. Pattern 1 — Right Angle Triangle (Stars)

### Visual (N = 5)

```
*
* *
* * *
* * * *
* * * * *
```

### Observation

| Row (i) | Stars (j goes up to) |
| ------- | -------------------- |
| 1       | 1                    |
| 2       | 2                    |
| 3       | 3                    |
| 4       | 4                    |
| 5       | 5                    |

**Pattern discovered:** In row i, there are exactly i stars.
So the inner loop runs from `j = 1` to `j = i` (not `j = n`).

### The Key Insight

Base pattern has inner loop go up to `N`. Here, inner loop goes up to `i` (the current row number). This single change creates the triangle.

```
Base pattern:    j from 1 to N  → rectangle
This pattern:    j from 1 to i  → right angle triangle
```

### Logic

```
Outer loop: i from 1 to N
  Inner loop: j from 1 to i    ← i instead of n
    print "* "
  End inner loop
  console.log()   ← next line
End outer loop
```

---

## 6. Pattern 2 — Right Angle Triangle (Numbers 1 2 3)

### Visual (N = 5)

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

### Observation

Same shape as Pattern 1 (right angle triangle). BUT instead of a star, we print `j` (the column counter).

**Key observation:** Every row starts from 1. When does j start? Always from 1 (re-declared fresh every row). So printing j automatically gives 1, 2, 3... for each row.

### The Key Insight

The only change from Pattern 1: instead of printing `"*"`, print `j`.

```
Pattern 1:  print "* "
Pattern 2:  print j + " "
```

That's the entire difference. The loop structure is identical.

### Logic

```
Outer loop: i from 1 to N
  Inner loop: j from 1 to i
    print j (the column number itself)
  End inner loop
  console.log()
End outer loop
```

---

## 7. Pattern 3 — Right Angle Triangle (Alphabets A B C)

### Visual (N = 5)

```
A
A B
A B C
A B C D
A B C D E
```

### Observation

Same triangle shape. But now we need A, B, C instead of 1, 2, 3.

### The Challenge — Characters Can't Be Incremented in JavaScript

In Java: `char ch = 'A'; ch++;` → gives B. Works!
In JavaScript: `ch++` on a character → gives NaN. Doesn't work!

### The Solution — ASCII Values

Every character has a numeric ASCII value:

- 'A' = 65, 'B' = 66, 'C' = 67... 'Z' = 90

**Plan:**

1. Start with number 65 (ASCII of 'A')
2. In the inner loop, add (j-1) to 65 to get the ASCII of the current letter
3. Convert ASCII number back to a character using `String.fromCharCode()`

```javascript
// ASCII to character conversion
String.fromCharCode(65) // → "A"
String.fromCharCode(66) // → "B"
String.fromCharCode(67) // → "C"
```

### Logic

```
Outer loop: i from 1 to N
  asciiCode = 65    ← start at 'A' every row
  Inner loop: j from 1 to i
    print String.fromCharCode(asciiCode)
    asciiCode++     ← move to next letter
  End inner loop
  console.log()
End outer loop
```

**Why does asciiCode reset each row?** Because it's declared inside the outer loop, so it's re-initialized to 65 (A) at the start of every new row.

---

## 8. Pattern 4 — Inverted Right Angle Triangle

### Visual (N = 5)

```
* * * * *
* * * *
* * *
* *
*
```

### Observation

| Row (i) | Stars     |
| ------- | --------- |
| 1       | 5 (= N)   |
| 2       | 4 (= N-1) |
| 3       | 3 (= N-2) |
| 4       | 2 (= N-3) |
| 5       | 1 (= N-4) |

**Pattern discovered:** Row i has `N - i + 1` stars.

When i = 1: N - 1 + 1 = N ✅
When i = 2: N - 2 + 1 = N-1 ✅
When i = 5: N - 5 + 1 = 1 ✅

### Logic

```
Outer loop: i from 1 to N
  Inner loop: j from 1 to (N - i + 1)   ← key formula
    print "* "
  End inner loop
  console.log()
End outer loop
```

### Alternative Approach (Also Valid)

Instead of `j from 1 to (N-i+1)`, you can do `j from N down to i`:

```
Inner loop: j starts at N, goes while j >= i, j--
```

Both give the same output. Multiple correct approaches exist for every pattern.

**Key lesson:** There's no single "correct" code. The output must be correct, the approach can vary.

---

## 9. Pattern 5 — Mirror Right Angle Triangle

### Visual (N = 5)

```
        *
      * *
    * * *
  * * * *
* * * * *
```

### Observation — This is a Combination!

Recognize that this is **TWO patterns combined in one row**:

```
Row contains:  [SPACES] [STARS]
                   ↑        ↑
           Inverted  +  Normal right
           triangle     angle triangle
```

### The Combination Strategy

**Total elements per row = N** (always)

- Row 1: 4 spaces + 1 star = 5 ✅
- Row 2: 3 spaces + 2 stars = 5 ✅
- Row 3: 2 spaces + 3 stars = 5 ✅
- Row 4: 1 space + 4 stars = 5 ✅
- Row 5: 0 spaces + 5 stars = 5 ✅

**Spaces in row i:** `N - i` spaces
**Stars in row i:** `i` stars

### Logic

```
Outer loop: i from 1 to N

  Part 1 — Print spaces (Inverted triangle logic)
  Inner loop: j from 1 to (N - i)   ← NOT N-i+1, because we need one less
    print " "  (space)
  End inner loop

  Part 2 — Print stars (Normal triangle logic)
  Inner loop: j from 1 to i
    print "* "
  End inner loop

  console.log()  ← next line after full row
End outer loop
```

### Dry Run Verification

```
i = 1:
  Spaces: j from 1 to (5-1) = 4 → prints 4 spaces
  Stars:  j from 1 to 1     = 1 → prints 1 star
  Total: 4 spaces + 1 star ✅

i = 2:
  Spaces: j from 1 to (5-2) = 3 → prints 3 spaces
  Stars:  j from 1 to 2     = 2 → prints 2 stars
  Total: 3 spaces + 2 stars ✅

i = 5:
  Spaces: j from 1 to (5-5) = 0 → prints nothing
  Stars:  j from 1 to 5     = 5 → prints 5 stars
  Total: 5 stars ✅
```

---

## 10. Pattern 6 — X Pattern

### Visual (N = 5, odd N only)

```
*       *
  *   *
    *
  *   *
*       *
```

### Observation — Finding the Conditions

Start with the base pattern (N×N grid). In this grid, identify which (i, j) cells should have a star.

**Left diagonal:** Stars where i = j

```
(1,1), (2,2), (3,3), (4,4), (5,5)
→ Condition: i === j
```

**Right diagonal:** Stars where i + j = N + 1

```
(1,5): 1+5 = 6 = 5+1 ✅
(2,4): 2+4 = 6 ✅
(3,3): 3+3 = 6 ✅
(4,2): 4+2 = 6 ✅
(5,1): 5+1 = 6 ✅
→ Condition: i + j === N + 1
```

**Combined condition:** Print star if `i === j` OR `i + j === N + 1`. Otherwise print space.

### Logic

```
Outer loop: i from 1 to N
  Inner loop: j from 1 to N   ← base pattern (N columns every row)
    if (i === j) OR (i + j === N + 1):
      print "*"
    else:
      print " "   ← space to maintain alignment
  End inner loop
  console.log()
End outer loop
```

### Important Constraint

**X pattern only works for ODD values of N.**

Why? For even N, the two diagonals clash at the center — there's no single center cell where both conditions can be satisfied simultaneously. The pattern becomes distorted.

```
N = 5 (odd):  Center is (3,3) → works perfectly
N = 10 (even): No single center cell → X pattern breaks
```

---

## 11. Pattern 7 — V Pattern

### Visual (N = 5)

```
*       *
* *   * *
* * * * *   ← wait, this is wrong
```

Actually:

```
*       *
  *   *
    *
```

### Observation — Similar to X Pattern

The V pattern is the **top half of the X pattern**. It uses the same two conditions.

**Left diagonal:** `i === j` → star
**Right diagonal:** `i + j === 2*N` → star (because we expand the grid to 2\*N-1 columns)

### Building the Logic

Total columns = `2*N - 1` (to fit the full V width)

**Why 2\*N - 1?** Consider N = 5:

- The V's widest point needs columns 1 to 9
- 2\*5 - 1 = 9 ✅

**Finding the right diagonal condition:**

```
Row 1: star at column 9  → i=1, j=9 → 1+9 = 10 = 2×5
Row 2: star at column 8  → i=2, j=8 → 2+8 = 10 = 2×5
Row 3: star at column 7  → i=3, j=7 → 3+7 = 10 = 2×5
Row 4: star at column 6  → i=4, j=6 → 4+6 = 10 = 2×5
Row 5: star at column 5  → i=5, j=5 → 5+5 = 10 = 2×5
```

**Condition:** `i + j === 2 * N`

### Logic

```
Outer loop: i from 1 to N
  Inner loop: j from 1 to (2*N - 1)
    if (i === j) OR (i + j === 2 * N):
      print "*"
    else:
      print " "
  End inner loop
  console.log()
End outer loop
```

### How It Differs from X Pattern

|                | X Pattern       | V Pattern       |
| -------------- | --------------- | --------------- |
| Rows           | N               | N               |
| Columns        | N               | 2\*N - 1        |
| Left diagonal  | `i === j`       | `i === j`       |
| Right diagonal | `i + j === N+1` | `i + j === 2*N` |

---

## 12. Homework Patterns

### Homework 1 — Triangle Pattern

```
    *
   * *
  * * *
 * * * *
* * * * *
```

**Hint:** This is the mirror of Pattern 5. Spaces decrease as stars increase. Think about which combination of the patterns you've already seen creates this.

### Homework 2 — Inverted Triangle (or similar)

Attempt the pattern on paper first. Count rows, count columns per row, find the i-j relationship, then code.

**For both homework patterns:**

1. Draw the pattern on paper for N = 4
2. Write the i value for each row and the j count for each row
3. Find the formula connecting i and j count
4. Write the code

---

## 13. Universal Approach to Any Pattern

Use this exact process for every new pattern you encounter:

### Step 1 — Draw It on Paper

Draw the pattern for N = 4 or N = 5 on paper. Label each row with its `i` value and each column with its `j` value.

### Step 2 — Ask the Row Question

"How many rows does this pattern have?"
Answer is always: **N rows** → outer loop from 1 to N (this is constant for ALL patterns).

### Step 3 — Ask the Column Question

"For row i, how many columns are there? What elements (star/space/number) appear?"

Fill in this table:

| Row (i) | Count of stars | Count of spaces | Pattern? |
| ------- | -------------- | --------------- | -------- |
| 1       | ?              | ?               |          |
| 2       | ?              | ?               |          |
| 3       | ?              | ?               |          |
| N       | ?              | ?               |          |

### Step 4 — Find the i-j Condition

"When should a star print (vs a space)?"

Express the answer as one of these forms:

- `j <= i` (growing triangle)
- `j <= N-i+1` (shrinking triangle)
- `i === j` (diagonal)
- `i + j === N+1` (anti-diagonal)
- Some combination of the above with OR

### Step 5 — Identify Combinations

If the pattern is complex, ask: "Is this TWO simpler patterns combined in one row?"

If yes, write TWO inner loops (one for each part).

### Step 6 — Code It

```
Outer loop: i from 1 to N
  [Inner loop(s) based on what you observed]
  console.log()   ← end of row
End outer loop
```

### Step 7 — Dry Run Verification

Before running, trace through for i=1, i=2, i=N manually. Verify the output matches the expected pattern.

---

## Observation Pattern Summary Table

| Pattern               | Inner Loop Range  | Condition / Key Logic                     |
| --------------------- | ----------------- | ----------------------------------------- |
| Base (rectangle)      | `j: 1 to N`       | Always stars                              |
| Right triangle        | `j: 1 to i`       | Stars = row number                        |
| Number triangle       | `j: 1 to i`       | Print j instead of star                   |
| Alphabet triangle     | `j: 1 to i`       | Print `String.fromCharCode(65 + j - 1)`   |
| Inverted triangle     | `j: 1 to N-i+1`   | Stars decrease each row                   |
| Mirror right triangle | Two loops per row | Spaces: `j: 1 to N-i`, Stars: `j: 1 to i` |
| X pattern             | `j: 1 to N`       | Star if `i===j` OR `i+j===N+1`            |
| V pattern             | `j: 1 to 2*N-1`   | Star if `i===j` OR `i+j===2*N`            |

---

## The Core Philosophy

> "Pattern programming is not about memorizing. It's about observing. Every time you look at a pattern, find the relationship between the row number (i) and the column count. That relationship IS the code."

**Practice builds observation.** The more patterns you solve, the faster you see the i-j relationship in any new pattern. There is no shortcut — only consistent practice.

**Multiple approaches are valid.** Any code that produces the correct output is correct. The loop can be written differently, the conditions can be expressed differently. What matters is the result.

---

_Study notes from Sheriyans Coding School — DSA Series. Always dry run on paper before and after coding._
