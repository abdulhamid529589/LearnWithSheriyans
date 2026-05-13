/*
==============================
     OPERATORS IN DSA (JS)
==============================

Operators are fundamental in Data Structures & Algorithms (DSA), since almost every logic step—counting, searching, splitting, combining—uses them. Below, you'll find a detailed, example-rich guide, especially for division (/).

----------------------------------------------------------------------
// 1. ARITHMETIC OPERATORS (with Examples)
//----------------------------------------------------------------------
- Used to manipulate numbers.

let a = 15, b = 4;

console.log("a + b =", a + b);   // Addition → 19
console.log("a - b =", a - b);   // Subtraction → 11
console.log("a * b =", a * b);   // Multiplication → 60
console.log("a / b =", a / b);   // Division → 3.75
console.log("a % b =", a % b);   // Modulo → 3 (remainder after division)
console.log("a ** b =", a ** b); // Exponentiation → 15^4 = 50625

//------------------------------------------------------------
// 2. DIVISION (/) - DEEP DIVE FOR DSA
//------------------------------------------------------------

**How does division work in JavaScript?**  
  - Always returns a floating-point (decimal) number—even if evenly divisible.
  - JavaScript doesn't have built-in integer division like Python (//) or Java/C++ (/ of ints).

**A. Basic Division**
```js
let x = 9, y = 3;
console.log(x / y);         // 3
console.log(7 / 2);         // 3.5
```

**B. Flooring Division (get the largest integer ≤ answer)**
  - Often needed in array splits: binary search, tree building, chunking, etc.

```js
let n = 7, d = 2;
let result = Math.floor(n / d);
console.log("Math.floor(7/2):", result);   // 3
```
**C. Truncating Toward Zero**
  - Useful for negative numbers!  
  - `Math.trunc` just chops off the decimal:

```js
console.log(Math.trunc(7 / 2));    // 3
console.log(Math.trunc(-7 / 2));   // -3
```

**D. Negative Division**
```js
console.log(Math.floor(-7 / 2));   // -4 (goes more negative)
console.log(Math.trunc(-7 / 2));   // -3 (towards zero)
```
  - Important distinction:  
    In DSA, picking floor vs trunc matters in e.g. binary search on negative-indexed ranges.

**E. Modulo with Division**
  - Remainder is often as important as the result:
```js
console.log("7 % 2 =", 7 % 2);   // 1
console.log("-7 % 2 =", -7 % 2); // -1
```

**F. Division by Zero/Edge Cases**
```js
console.log("5 / 0 =", 5 / 0);    // Infinity
console.log("0 / 0 =", 0 / 0);    // NaN
if (!isFinite(5 / 0)) {
    console.log("Division by zero detected!");
}
```

**G. Typical DSA Usage Examples**

1. **Finding the Midpoint (Binary Search)**
```js
let left = 0, right = 9;
let mid = Math.floor((left + right) / 2);
console.log("Mid index:", mid); // 4
```

2. **Splitting an Array in Two**
```js
let arr = [10, 20, 30, 40, 50, 60];
let mid = Math.floor(arr.length / 2); // position
let leftHalf = arr.slice(0, mid);
let rightHalf = arr.slice(mid);
console.log(leftHalf);  // [10, 20, 30]
console.log(rightHalf); // [40, 50, 60]
```

3. **Counting How Many 'Full Groups' Fit**
```js
let items = 17, groupSize = 4;
let fullGroups = Math.floor(items / groupSize); // 4
let leftovers = items % groupSize;              // 1
console.log(`We have ${fullGroups} full groups and ${leftovers} leftover`);
```

4. **Single Value, Test for Even/Odd with Division/Modulo**
```js
let n = 15;
console.log(n % 2 === 0 ? "Even" : "Odd"); // Odd
```

//------------------------------------------------------------------
// 3. OTHER IMPORTANT OPERATOR FAMILIES (with brief examples)
//------------------------------------------------------------------

// Assignment
let v = 5;    // assigns 5
v += 2;       // v = 7
v /= 3;       // v ≈ 2.333...

// Comparison
console.log(5 === "5");   // false (strict comparison)
console.log(5 < 7);       // true

// Logical
let ok = (a > 5 && b < 10);  // AND, returns true if both true

// Bitwise (often in DSA for sets/masks but less for division!)
// [1,2,3,4].forEach(x => console.log(x & 1)); // Print if each is odd (1) or even (0)

//------------------------------------------------------------------
// KEY TIPS FOR DSA: Division & Operators
//------------------------------------------------------------------
// - Always use Math.floor/Math.trunc when you need an integer index!
// - Watch out for negative division vs what your algorithm expects!
// - Use modulo (%) for cyclical/periodic choices, or for odd/even testing.
// - Division by zero returns Infinity or NaN—always check if needed.

***Mastering division and related arithmetic in JavaScript lets you write correct, robust, and high-performance DSA code. Test your edge cases!***

*/
