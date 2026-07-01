# 📘 DSA Series — Lecture 11

# 🔢 Math Algorithms — GCD, Factors, Sieve of Eratosthenes & Power(x,n)

> **Instructor:** Ali Ansari — Sheryians Coding School
> **Series:** DSA (Data Structures & Algorithms)
> **Lecture:** 11 — Mathematical Algorithms

---

## 📌 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [GCD — Greatest Common Divisor](#2-gcd--greatest-common-divisor)
   - [What is GCD?](#21-what-is-gcd)
   - [Approach 1: Brute Force](#22-approach-1-brute-force)
   - [Approach 2: Euclidean Subtraction Method](#23-approach-2-euclidean-subtraction-method)
   - [Approach 3: Euclidean Modulo Method (Optimal)](#24-approach-3-euclidean-modulo-method-optimal)
   - [Recursive GCD](#25-recursive-gcd)
   - [Time Complexity Comparison](#26-time-complexity-comparison)
3. [Factors of a Number — Optimized](#3-factors-of-a-number--optimized)
   - [Why √N Works](#31-why-n-works)
   - [Code — Sorted Factors in O(√N)](#32-code--sorted-factors-in-on)
4. [Count of Primes — Sieve of Eratosthenes](#4-count-of-primes--sieve-of-eratosthenes)
   - [Core Observation](#41-core-observation)
   - [Algorithm Walkthrough](#42-algorithm-walkthrough)
   - [Code Implementation](#43-code-implementation)
   - [Time Complexity](#44-time-complexity)
5. [Power(x, n) — LeetCode 50](#5-powerx-n--leetcode-50)
   - [Brute Force](#51-brute-force)
   - [Fast Power (Binary Exponentiation)](#52-fast-power-binary-exponentiation)
   - [Call Stack Visualization](#53-call-stack-visualization)
   - [LeetCode Solution](#54-leetcode-solution)
6. [Complete Cheat Sheet](#6-complete-cheat-sheet)

---

## 1. Prerequisites

Before this lecture, make sure you've completed:

- ✅ **Loops lecture** — factors, prime numbers, √N optimization
- ✅ **Recursion Level 1 lecture** — stack memory, backtracking, return keyword

Both are heavily used here. If you haven't done them, go back first — otherwise you'll waste time coming back.

---

## 2. GCD — Greatest Common Divisor

### 2.1 What is GCD?

**GCD (Greatest Common Divisor)** = also called **HCF (Highest Common Factor)**

> Given two numbers A and B, find the **largest number** that **completely divides both** (remainder = 0).

**Example:**

```
A = 20,  B = 32

Factors of 20: 1, 2, 4, 5, 10, 20
Factors of 32: 1, 2, 4, 8, 16, 32

Common factors: 1, 2, 4
Highest Common Factor = 4 ← GCD
```

### Key Insight — Why Check from Smaller Number?

We want the **highest** common factor. If we search from the largest downward, the first number that divides both is our answer.

We iterate up to `min(A, B)` because:

- Factors of the **smaller** number might also be factors of the **larger** one ✅
- Factors of the **larger** number that exceed the smaller number **can't be** factors of the smaller one ❌

```
Example: A=20, B=32
- 20 might divide 32? No (32/20 = 1.6), but 4 divides both ✅
- 32 can never divide 20 (32 > 20) ❌
```

---

### 2.2 Approach 1: Brute Force

```javascript
function gcdBrute(a, b) {
  let min = Math.min(a, b)

  // Start from min and go down to 1
  // First number that divides both = GCD
  for (let i = min; i >= 1; i--) {
    if (a % i === 0 && b % i === 0) {
      return i // return immediately — this is the highest
    }
  }
}

console.log(gcdBrute(20, 32)) // Output: 4
```

**Time Complexity:** O(min(A, B)) — worst case scans all numbers down to 1

---

### 2.3 Approach 2: Euclidean Subtraction Method

**Insight by Euclid:** Repeatedly subtract the smaller number from the larger. When both are equal, that value is the GCD.

**Dry Run with A=32, B=20:**

```
Step 1: A=32, B=20 → 32 > 20 → A = 32-20 = 12  → [A=12, B=20]
Step 2: A=12, B=20 → 20 > 12 → B = 20-12 = 8   → [A=12, B=8]
Step 3: A=12, B=8  → 12 > 8  → A = 12-8  = 4   → [A=4, B=8]
Step 4: A=4,  B=8  → 8 > 4   → B = 8-4   = 4   → [A=4, B=4]
Step 5: A == B → STOP. Answer = 4 ✅
```

#### Iterative Code

```javascript
let a = 32,
  b = 20

while (a !== b) {
  if (a > b) {
    a = a - b // reduce the bigger one
  } else {
    b = b - a // reduce the bigger one
  }
}

console.log(a) // Output: 4
```

#### Recursive Code

```javascript
function gcd(a, b) {
  // Base Case: when both are equal → that's the GCD
  if (a === b) {
    return a // or return b — they're the same
  }

  if (a > b) {
    return gcd(a - b, b) // return IS needed — caller waits for value
  } else {
    return gcd(a, b - a)
  }
}

console.log(gcd(32, 20)) // Output: 4
```

> **Why `return` with recursive call?**
> Because the caller needs the final GCD value from the recursive call to return it further up the chain.

**Time Complexity (Subtraction Method):** O(max(A, B))

**Worst Case Example:** A=1000, B=1

```
1000-1=999, 999-1=998, ..., 1-1=0
→ 999 iterations! Very slow when numbers differ greatly.
```

---

### 2.4 Approach 3: Euclidean Modulo Method (Optimal)

**Key Insight:** Instead of subtracting one-by-one, use **modulo** to skip all those subtractions at once.

**Why Modulo is Better:**

```
A % B is equivalent to subtracting B from A repeatedly until remainder < B

Example: 14 % 2
= 14 - 2 - 2 - 2 - 2 - 2 - 2 - 2 = 0   (7 subtractions in 1 step!)

Instead of 7 subtraction steps → 1 modulo operation
```

**The Modulo Trick — Swapping:**

```
Goal: Always keep the LARGER number in the dividend position
      so that modulo gives a SMALLER result.

Key rule:
  bigger % smaller = something SMALLER than smaller ✅ (fast reduction)
  smaller % bigger = the smaller itself ❌ (no reduction — wasteful)

Example:
  14 % 2 = 0  (reduced to 0 quickly)
  2 % 14 = 2  (no reduction at all)
```

**Algorithm:**

- In each step: move `B` to `A`, move `A % B` to `B`
- This effectively **swaps** so the bigger value gets modulo'd by the smaller
- When B becomes 0, the answer is A

**Dry Run with A=16, B=14:**

```
Start: A=16, B=14

Step 1: new_A = B = 14,   new_B = A % B = 16 % 14 = 2   → [A=14, B=2]
Step 2: new_A = B = 2,    new_B = A % B = 14 % 2  = 0   → [A=2,  B=0]
Step 3: B === 0 → STOP. Answer = A = 2 ✅
```

**Compare with subtraction method for the same input:**

```
Subtraction: 16→2, 14→14, 12→14, ... (many steps)
Modulo: Done in 2 steps!
```

**Dry Run with A=233, B=144 (Fibonacci-like numbers — worst case):**

```
Step 1: A=233, B=144 → A%B = 233%144 = 89  → [144, 89]
Step 2: A=144, B=89  → A%B = 144%89  = 55  → [89, 55]
Step 3: A=89,  B=55  → A%B = 89%55   = 34  → [55, 34]
Step 4: A=55,  B=34  → A%B = 55%34   = 21  → [34, 21]
Step 5: A=34,  B=21  → A%B = 34%21   = 13  → [21, 13]
Step 6: A=21,  B=13  → A%B = 21%13   = 8   → [13, 8]
Step 7: A=13,  B=8   → A%B = 13%8    = 5   → [8, 5]
Step 8: A=8,   B=5   → A%B = 8%5     = 3   → [5, 3]
Step 9: A=5,   B=3   → A%B = 5%3     = 2   → [3, 2]
Step 10: A=3,  B=2   → A%B = 3%2     = 1   → [2, 1]
Step 11: A=2,  B=1   → A%B = 2%1     = 0   → [1, 0]
Step 12: B=0 → Answer = 1
```

**Why does it shrink so fast?**

- Every 2 steps, the smaller number becomes **less than half** of its previous value
- This halving every 2 steps → **logarithmic** behavior

---

### 2.5 Recursive GCD

```javascript
function gcd(a, b) {
  // Base Case: when b becomes 0, a is the GCD
  if (b === 0) {
    return a
  }

  // Recursive: pass b as new a, and (a % b) as new b
  return gcd(b, a % b)
}

console.log(gcd(16, 40)) // Output: 8
console.log(gcd(20, 32)) // Output: 4
```

**Recursive Call Trace for gcd(16, 40):**

```
gcd(16, 40): b≠0 → gcd(40, 16%40) = gcd(40, 16)
gcd(40, 16): b≠0 → gcd(16, 40%16) = gcd(16, 8)
gcd(16, 8) : b≠0 → gcd(8, 16%8)  = gcd(8, 0)
gcd(8, 0)  : b=0  → return 8 ✅
```

---

### 2.6 Time Complexity Comparison

```
╔══════════════════════════╦═══════════════════════╦══════════════╗
║ Approach                 ║ Time Complexity        ║ Notes        ║
╠══════════════════════════╬═══════════════════════╬══════════════╣
║ Brute Force (loop down)  ║ O(min(A, B))           ║ Slow         ║
║ Euclidean (subtraction)  ║ O(max(A, B))           ║ Worst: 1000  ║
║                          ║                        ║ iterations   ║
║                          ║                        ║ for A=1000,  ║
║                          ║                        ║ B=1          ║
║ Euclidean (modulo)       ║ O(log(max(A, B)))      ║ BEST ✅       ║
╚══════════════════════════╩═══════════════════════╩══════════════╝
```

**Why O(log(max(A,B))) for modulo method?**

- Every 2 steps, the smaller number reduces to less than half
- Repeatedly halving = logarithmic number of steps

---

## 3. Factors of a Number — Optimized

### 3.1 Why √N Works

If `i` divides `n`, then `n/i` also divides `n`. They come in **pairs**.

```
Example: Factors of 100

  1 × 100 = 100
  2 × 50  = 100
  4 × 25  = 100
  5 × 20  = 100
 10 × 10  = 100  ← √100 = 10 (middle pair, both equal)
```

```
Pair Structure:
   i  →  n/i
   1  →  100
   2  →  50
   4  →  25
   5  →  20
  10  →  10   ← √n boundary

Every factor ≤ √n has a corresponding factor ≥ √n
→ We only need to check up to √n, and we get both factors!
```

**Why not go beyond √n?**

- The "large" factors (20, 25, 50, 100) are already found as the pair `n/i` of the small factors
- Iterating beyond √n would just give duplicates

**Time Complexity Comparison:**
| Approach | Complexity |
|---|---|
| Loop 1 to N | O(N) |
| Loop 1 to N/2 | O(N) — constants ignored |
| Loop 1 to **√N** | **O(√N)** ← Best |

---

### 3.2 Code — Sorted Factors in O(√N)

```javascript
let n = 100

// Part 1: Print factors from 1 to √n (small factors)
for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
  if (n % i === 0) {
    process.stdout.write(i + ' ') // print the factor i
  }
}

// Part 2: Print factors from √n down to 1 (large factors = n/i)
for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
  if (n % i === 0) {
    if (n / i !== i) {
      // avoid duplicate when i = √n (perfect square)
      process.stdout.write(n / i + ' ')
    }
  }
}

// Output: 1 2 4 5 10 20 25 50 100  (sorted!)
```

**Why two loops?**

Loop 1 prints small factors in ascending order: `1, 2, 4, 5, 10`
Loop 2 iterates backward through small factors and prints `n/i` — which gives large factors in ascending order: `20, 25, 50, 100`

Together = all factors in sorted order.

**Edge Case — Perfect Square (√n is an integer):**

```
n=100, √n=10
When i=10: n/i = 100/10 = 10 = i
→ 10 would be printed TWICE (once from loop 1, once from loop 2)
→ Check: if (n/i !== i) before printing in loop 2
```

**Total Time Complexity:** O(√N) + O(√N) = O(2√N) = **O(√N)**

---

## 4. Count of Primes — Sieve of Eratosthenes

### 4.1 Core Observation

**Definition of Prime:** A number that is divisible only by 1 and itself (exactly 2 divisors).

**Key Mathematical Insight:**

> If a number `p` is prime, then **all multiples of `p`** are NOT prime.
> (Because they're divisible by p — a third divisor.)

```
p = 2 (prime) → 4, 6, 8, 10, 12, ... are NOT prime
p = 3 (prime) → 9, 15, 21, 27, ... are NOT prime
p = 5 (prime) → 25, 35, ... are NOT prime (10,15,20,25... already marked by 2 and 3)
```

**Second Key Insight (from Loop Lecture):**

> If no number from 2 to √n divides n, then n is prime.
> (Factors beyond √n are just the pair counterparts of factors ≤ √n)

So we only need to **process up to √n**.

---

### 4.2 Algorithm Walkthrough

**Task:** Find all primes from 1 to N=30.

#### Step 1: Create a boolean array of size N+1

```
Index:  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
Value: true true true true true true true true true true true true true true true true
                                                                     ...
Index: 16   17   18   19   20   21   22   23   24   25   26   27   28   29   30
Value: true true true true true true true true true true true true true true true
```

**Why N+1 size?** So index 30 exists. If we used size N=30, last index would be 29.

**Meaning:** `arr[i] = true` means "i is prime" (initially assume all are prime).

#### Step 2: Process from 2 to √30 ≈ 5

**i=2 (arr[2]=true → 2 is prime):**
Mark all multiples of 2 as NOT prime, starting from 2²=4:

```
4→false, 6→false, 8→false, 10→false, 12→false, 14→false,
16→false, 18→false, 20→false, 22→false, 24→false, 26→false, 28→false, 30→false
```

**i=3 (arr[3]=true → 3 is prime):**
Mark all multiples of 3, starting from 3²=9:

```
9→false, 15→false, 21→false, 27→false
(6, 12, 18, 24, 30 already false from step i=2)
```

**i=4 (arr[4]=false → 4 is NOT prime):**
Skip! If 4 is not prime, its multiples are already marked (they're also multiples of 2).

**i=5 (arr[5]=true → 5 is prime):**
Mark multiples of 5, starting from 5²=25:

```
25→false
(10, 15, 20, 30 already false)
```

**i > √30, so STOP.**

#### Step 3: Print all indices where arr[i] = true (from 2 onward)

```
Remaining true indices: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
These are all primes from 1 to 30 ✅
```

#### Why Start Marking from i² (not from 2i)?

When processing prime `p`:

- Multiples 2p, 3p, 4p, ..., (p-1)p are **already marked** by smaller primes
  - 2p marked when processing 2
  - 3p marked when processing 3
  - etc.
- **First unmarked multiple** is always p² (since all smaller multiples already handled)
- So start inner loop at j = i\*i, incrementing by i each time

---

### 4.3 Code Implementation

```javascript
let n = 30

// Step 1: Create array of size n+1, fill all with true
let arr = new Array(n + 1).fill(true)

// Step 2: Process from 2 to √n
for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
  // Only process if i is still marked prime
  if (arr[i] === true) {
    // Mark all multiples of i as NOT prime, starting from i²
    for (let j = i * i; j <= n; j += i) {
      arr[j] = false
    }
  }
}

// Step 3: Print all primes (indices with true, starting from 2)
for (let i = 2; i < arr.length; i++) {
  if (arr[i] === true) {
    process.stdout.write(i + ' ')
  }
}

// Output for n=30: 2 3 5 7 11 13 17 19 23 29
// Output for n=100: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

### 4.4 Time Complexity

| Component                       | Complexity                        |
| ------------------------------- | --------------------------------- |
| Outer loop                      | O(√N)                             |
| Inner loop (total across all i) | ≈ O(N) (harmonic series argument) |
| Final print loop                | O(N)                              |

**Overall:** **O(N log log N)**

This comes from the harmonic series of primes. It's remarkably fast — the most efficient algorithm for finding all primes up to N.

> **Note:** The exact derivation involves the sum of 1/p for all primes p ≤ N, which equals log(log(N)). This is an advanced mathematical result — acceptable to just know the final complexity.

---

## 5. Power(x, n) — LeetCode 50

**Problem:** Implement `pow(x, n)` — compute x raised to the power n.

**Constraints:** n can be up to 2³¹ (≈ 2 billion) — brute force will TLE.

### 5.1 Brute Force

```javascript
// Multiply x by itself n times
function powBrute(x, n) {
  let answer = 1
  for (let i = 1; i <= n; i++) {
    answer *= x
  }
  return answer
}
```

**Time Complexity:** O(N) — for n = 2³¹ ≈ 2 billion operations. **TLE ❌**

---

### 5.2 Fast Power (Binary Exponentiation)

**Core Insight — Divide the exponent:**

```
x^10 = x^5 × x^5         ← split into 2 halves
x^5  = x^2 × x^2 × x     ← half of 5 = 2, with one extra x (odd)
x^2  = x^1 × x^1
x^1  = x^0 × x^0 × x     ← odd exponent
x^0  = 1                  ← BASE CASE
```

**Two Cases:**

```
If n is EVEN:
  x^n = x^(n/2) × x^(n/2)
  → Only need to compute x^(n/2) ONCE, then square it

If n is ODD:
  x^n = x^(n/2) × x^(n/2) × x
  → Compute x^(n/2) once, square it, multiply by x once more
```

**Why this is O(log N):**

```
n=10 → n=5 → n=2 → n=1 → n=0
Each step halves n → log₂(10) ≈ 4 steps for n=10
For n = 2³¹ → log₂(2³¹) = 31 steps!
```

**Recursive Structure:**

```javascript
function helper(x, n) {
  // Base Case
  if (n === 0) return 1

  let answer = helper(x, Math.floor(n / 2)) // compute x^(n/2)

  // Backtracking — use the result
  if (n % 2 === 0) {
    return answer * answer // even: square it
  } else {
    return answer * answer * x // odd: square it, multiply by x once more
  }
}
```

**Dry Run for x=2, n=10:**

```
Forward Phase (going down):
helper(2, 10) → calls helper(2, 5)   [on hold: check if 10 is even]
helper(2, 5)  → calls helper(2, 2)   [on hold: check if 5 is odd]
helper(2, 2)  → calls helper(2, 1)   [on hold: check if 2 is even]
helper(2, 1)  → calls helper(2, 0)   [on hold: check if 1 is odd]
helper(2, 0)  → BASE CASE → returns 1

Backtracking Phase (coming up):
helper(2, 0) returns 1
helper(2, 1): n=1 is ODD  → answer=1  → return 1*1*2 = 2     → returns 2
helper(2, 2): n=2 is EVEN → answer=2  → return 2*2   = 4     → returns 4
helper(2, 5): n=5 is ODD  → answer=4  → return 4*4*2 = 32    → returns 32
helper(2,10): n=10 is EVEN → answer=32 → return 32*32 = 1024 → returns 1024 ✅
```

**Total steps: 5 (not 10!)**

---

### 5.3 Call Stack Visualization

```
┌──────────────────────────────┐
│ helper(2, 10)                │  ← waiting: check n=10 (even) → ans²
├──────────────────────────────┤
│ helper(2, 5)                 │  ← waiting: check n=5 (odd) → ans²×x
├──────────────────────────────┤
│ helper(2, 2)                 │  ← waiting: check n=2 (even) → ans²
├──────────────────────────────┤
│ helper(2, 1)                 │  ← waiting: check n=1 (odd) → ans²×x
├──────────────────────────────┤
│ helper(2, 0)                 │  ← BASE CASE: returns 1
└──────────────────────────────┘

Unwinding:
helper(2,0): 1
helper(2,1): 1×1×2 = 2
helper(2,2): 2×2   = 4
helper(2,5): 4×4×2 = 32
helper(2,10): 32×32 = 1024
```

> 💡 **This is backtracking in action!** The `if (n%2===0)` check and the multiplication happen **after** the recursive call returns — on the way back up.

---

### 5.4 LeetCode Solution

```javascript
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  // Handle negative exponent: x^(-n) = 1 / x^n
  let answer = helper(x, Math.abs(n))
  return n < 0 ? 1 / answer : answer
}

function helper(x, n) {
  // Base Case: any number to the power 0 = 1
  if (n === 0) return 1

  let answer = helper(x, Math.floor(n / 2)) // compute x^(n/2)

  if (n % 2 === 0) {
    return answer * answer // even exponent
  } else {
    return answer * answer * x // odd exponent
  }
}

// Test cases
console.log(myPow(2, 10)) // 1024
console.log(myPow(2, -2)) // 0.25
console.log(myPow(2.1, 3)) // 9.261
```

**Handling Negative Exponents:**

```
x^(-n) = 1 / x^n

Example: 2^(-3) = 1 / 2^3 = 1/8 = 0.125
```

**Time Complexity:** O(log N) — halving the exponent each time
**Space Complexity:** O(log N) — call stack depth = log N

---

## 6. Complete Cheat Sheet

### Algorithm Summary

```
╔══════════════════════════════════════════════════════════════════╗
║                    GCD (Euclidean Modulo)                        ║
╠══════════════════════════════════════════════════════════════════╣
║ Rule: gcd(a, b) = gcd(b, a % b)                                 ║
║ Base: if b === 0, return a                                       ║
║ Time: O(log(max(A, B)))                                          ║
║                                                                  ║
║ function gcd(a, b) {                                             ║
║   if (b === 0) return a;                                         ║
║   return gcd(b, a % b);                                          ║
║ }                                                                ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║                    FACTORS OF N (Optimal)                        ║
╠══════════════════════════════════════════════════════════════════╣
║ Key: factors come in pairs (i, n/i)                              ║
║ Insight: only check i from 1 to √n                               ║
║ Time: O(√N)                                                      ║
║                                                                  ║
║ for i from 1 to √n:                                              ║
║   if n % i === 0:                                                ║
║     print i                                                      ║
║     if n/i !== i: print n/i   ← avoid dup for perfect squares   ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║                  SIEVE OF ERATOSTHENES                           ║
╠══════════════════════════════════════════════════════════════════╣
║ Key: if p is prime → all multiples of p are NOT prime            ║
║ Create bool array of size n+1, fill true                         ║
║ For i from 2 to √n:                                              ║
║   if arr[i] is true (i is prime):                               ║
║     for j from i² to n, step i:                                  ║
║       arr[j] = false                                             ║
║ Print all indices i≥2 where arr[i] = true                        ║
║ Time: O(N log log N)                                             ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║              FAST POWER (Binary Exponentiation)                  ║
╠══════════════════════════════════════════════════════════════════╣
║ Key: x^n = x^(n/2) × x^(n/2)  (if n is even)                   ║
║      x^n = x^(n/2) × x^(n/2) × x  (if n is odd)                ║
║ Base: x^0 = 1                                                    ║
║ Negative: x^(-n) = 1 / x^n                                      ║
║ Time: O(log N)    Space: O(log N)                                ║
╚══════════════════════════════════════════════════════════════════╝
```

### Time Complexity Comparison Table

```
╔═══════════════════════════╦══════════════════════╦═══════════════╗
║ Algorithm                 ║ Time Complexity      ║ Key Trick     ║
╠═══════════════════════════╬══════════════════════╬═══════════════╣
║ GCD (brute force)         ║ O(min(A,B))          ║ Loop backward ║
║ GCD (subtract)            ║ O(max(A,B))          ║ Euclid sub    ║
║ GCD (modulo)              ║ O(log max(A,B))      ║ a%b swap ✅   ║
╠═══════════════════════════╬══════════════════════╬═══════════════╣
║ Factors (1 to N)          ║ O(N)                 ║ Loop to N     ║
║ Factors (1 to N/2)        ║ O(N)                 ║ Constant drop ║
║ Factors (1 to √N)         ║ O(√N)                ║ Pair trick ✅ ║
╠═══════════════════════════╬══════════════════════╬═══════════════╣
║ Prime check (loop to N)   ║ O(N)                 ║               ║
║ Prime check (loop to √N)  ║ O(√N)                ║ Factor pair   ║
║ Sieve (count in range)    ║ O(N log log N)       ║ Mark multiple ║
╠═══════════════════════════╬══════════════════════╬═══════════════╣
║ Power (brute)             ║ O(N)                 ║ Multiply N×   ║
║ Power (fast)              ║ O(log N)             ║ Half each ✅  ║
╚═══════════════════════════╩══════════════════════╩═══════════════╝
```

### Key Formulas to Remember

```
GCD Recurrence:          gcd(a, b) = gcd(b, a % b)   [stop when b=0]

Factor Pair:             if i divides n, then n/i also divides n

Prime Marking:           start marking at i*i (not 2*i)
                         because 2*i, 3*i ... (i-1)*i are already marked

Fast Power:              n even: answer²
                         n odd:  answer² × x
                         n=0:    1

Negative Power:          x^(-n) = 1 / x^n
```

### Pattern Recognition — When to Use Which

```
╔══════════════════════════════════════╦══════════════════════╗
║ Problem                              ║ Algorithm            ║
╠══════════════════════════════════════╬══════════════════════╣
║ Find GCD of two numbers              ║ Euclidean Modulo     ║
║ Find all factors of N                ║ Loop to √N           ║
║ Check if N is prime                  ║ Loop to √N           ║
║ Find all primes in range 1 to N      ║ Sieve of Eratosthenes║
║ Count primes up to N                 ║ Sieve of Eratosthenes║
║ Compute x^n (n is large)            ║ Fast Power (Binary)  ║
╚══════════════════════════════════════╩══════════════════════╝
```

---

## Practice Problems

### Suggested LeetCode Problems

| Problem                     | Approach                         |
| --------------------------- | -------------------------------- |
| LeetCode 50 — Pow(x,n)      | Fast Power                       |
| LeetCode 69 — Sqrt(x)       | Binary search or Newton's method |
| LeetCode 204 — Count Primes | Sieve of Eratosthenes            |
| Any GCD problem             | Euclidean Modulo                 |

### Self-Exercise

1. Implement GCD iteratively using the modulo method
2. Find all prime factors of a number N
3. Check if a number is a perfect square in O(log N)
4. Modify the Sieve to return a list (not just print) of all primes ≤ N
5. Implement fast power iteratively (without recursion)

---

_📝 Notes prepared from: DSA Series — Sheryians Coding School, Lecture 11_
_📌 Instructor: Ali Ansari_
_🔗 LeetCode: Problem 50 (Power), Problem 204 (Count Primes), Problem 69 (Sqrt)_
