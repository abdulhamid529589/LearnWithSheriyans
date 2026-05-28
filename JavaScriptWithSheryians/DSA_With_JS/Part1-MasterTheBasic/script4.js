/**
 * Deep explanation and examples of all commonly used Math methods in JavaScript.
 */

// 1. Math.abs(x)
// Returns the absolute (non-negative) value of a number.
console.log("Math.abs Examples:");
console.log(Math.abs(-5)); // 5
console.log(Math.abs(3)); // 3

// 2. Math.ceil(x)
// Returns the smallest integer greater than or equal to a number (rounds up).
console.log("\nMath.ceil Examples:");
console.log(Math.ceil(4.2)); // 5
console.log(Math.ceil(-1.8)); // -1

// 3. Math.floor(x)
// Returns the largest integer less than or equal to a number (rounds down).
console.log("\nMath.floor Examples:");
console.log(Math.floor(4.7)); // 4
console.log(Math.floor(-2.3)); // -3

// 4. Math.round(x)
// Returns the value of a number rounded to the nearest integer.
console.log("\nMath.round Examples:");
console.log(Math.round(4.5)); // 5
console.log(Math.round(4.49)); // 4

// 5. Math.trunc(x)
// Returns the integer part of a number by removing any fractional digits.
console.log("\nMath.trunc Examples:");
console.log(Math.trunc(13.37)); // 13
console.log(Math.trunc(-0.123)); // 0

// 6. Math.max([value1[, value2[, ...]]])
// Returns the largest of the given numbers.
console.log("\nMath.max Examples:");
console.log(Math.max(10, 5, 20)); // 20
console.log(Math.max(-2, -1)); // -1

// 7. Math.min([value1[, value2[, ...]]])
// Returns the smallest of the given numbers.
console.log("\nMath.min Examples:");
console.log(Math.min(10, 5, 20)); // 5
console.log(Math.min(-2, -1)); // -2

// 8. Math.sqrt(x)
// Returns the positive square root of a number.
console.log("\nMath.sqrt Examples:");
console.log(Math.sqrt(9)); // 3
console.log(Math.sqrt(2)); // 1.4142135623730951

// 9. Math.cbrt(x)
// Returns the cube root of a number.
console.log("\nMath.cbrt Examples:");
console.log(Math.cbrt(27)); // 3
console.log(Math.cbrt(-8)); // -2

// 10. Math.pow(x, y)
// Returns base x to the exponent y (x^y).
console.log("\nMath.pow Examples:");
console.log(Math.pow(2, 3)); // 8
console.log(Math.pow(5, 2)); // 25

// 11. Math.random()
// Returns a pseudorandom number between 0 (inclusive) and 1 (exclusive).
console.log("\nMath.random Examples:");
console.log(Math.random()); // e.g., 0.349273747... (random output location each time)
console.log(Math.trunc(Math.random() * 9000) + 1000);
let a = 20.348923;
console.log(a.toFixed(3)); //20.348

// 12. Math.sign(x)
// Returns the sign of a number: 1 (positive), -1 (negative), 0, -0, NaN.
console.log("\nMath.sign Examples:");
console.log(Math.sign(7)); // 1
console.log(Math.sign(-0)); // -0
console.log(Math.sign(-14.5)); // -1

// 13. Math.exp(x)
// Returns E^x, where E is Euler's number (approx. 2.718).
console.log("\nMath.exp Examples:");
console.log(Math.exp(1)); // 2.718281828459045
console.log(Math.exp(0)); // 1

// 14. Math.expm1(x)
// Returns E^x - 1. Useful for small values of x.
console.log("\nMath.expm1 Examples:");
console.log(Math.expm1(1)); // 1.718281828459045
console.log(Math.expm1(0)); // 0

// 15. Math.log(x)
// Returns the natural logarithm (base E) of a number.
console.log("\nMath.log Examples:");
console.log(Math.log(Math.E)); // 1
console.log(Math.log(1)); // 0

// 16. Math.log10(x)
// Returns the base-10 logarithm of a number.
console.log("\nMath.log10 Examples:");
console.log(Math.log10(100)); // 2
console.log(Math.log10(1)); // 0

// 17. Math.log2(x)
// Returns the base-2 logarithm of a number.
console.log("\nMath.log2 Examples:");
console.log(Math.log2(8)); // 3
console.log(Math.log2(1)); // 0

// 18. Math.log1p(x)
// Returns the natural logarithm of 1 + x. Accurate for small x.
console.log("\nMath.log1p Examples:");
console.log(Math.log1p(1)); // 0.6931471805599453
console.log(Math.log1p(0)); // 0

// 19. Math.sin(x), Math.cos(x), Math.tan(x)
// Trigonometric functions; angle x is in radians.
console.log("\nTrigonometric Functions Examples:");
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(0)); // 1
console.log(Math.tan(Math.PI / 4)); // 1

// 20. Math.asin(x), Math.acos(x), Math.atan(x)
// Inverse trigonometric functions; result is in radians.
console.log("\nInverse Trigonometric Functions Examples:");
console.log(Math.asin(1)); // 1.5707963267948966 (π/2)
console.log(Math.acos(0)); // 1.5707963267948966 (π/2)
console.log(Math.atan(1)); // 0.7853981633974483 (π/4)

// 21. Math.atan2(y, x)
// Returns the angle in radians between the positive x-axis to the point (x, y).
console.log("\nMath.atan2 Examples:");
console.log(Math.atan2(1, 1)); // 0.7853981633974483
console.log(Math.atan2(-1, 1)); // -0.7853981633974483

// 22. Math.hypot([value1[, value2[, ...]]])
// Returns the square root of the sum of squares of its arguments — Euclidean distance.
console.log("\nMath.hypot Examples:");
console.log(Math.hypot(3, 4)); // 5

// 23. Math.sinh(x), Math.cosh(x), Math.tanh(x)
// Hyperbolic trigonometric functions.
console.log("\nHyperbolic Trigonometric Functions Examples:");
console.log(Math.sinh(0)); // 0
console.log(Math.cosh(0)); // 1
console.log(Math.tanh(0)); // 0

// 24. Math.asinh(x), Math.acosh(x), Math.atanh(x)
// Inverse hyperbolic trigonometric functions.
console.log("\nInverse Hyperbolic Functions Examples:");
console.log(Math.asinh(1)); // 0.881373587019543
console.log(Math.acosh(2)); // 1.3169578969248166
console.log(Math.atanh(0.5)); // 0.5493061443340548

// 25. Math.fround(x)
// Returns the nearest 32-bit single precision float representation of a number.
console.log("\nMath.fround Examples:");
console.log(Math.fround(1.337)); // 1.3370000123977661

// 26. Math.imul(a, b)
// Performs 32-bit integer multiplication.
console.log("\nMath.imul Examples:");
console.log(Math.imul(2, 4)); // 8
console.log(Math.imul(-1, 8)); // -8

// 27. Math.clz32(x)
// Returns the number of leading zero bits in the 32-bit binary representation of x.
console.log("\nMath.clz32 Examples:");
console.log(Math.clz32(1)); // 31 (only 1 bit needed for '1')
console.log(Math.clz32(1000)); // 22

// Special Math constants:
console.log("\nMath Constants:");
console.log(Math.PI); // 3.141592653589793
console.log(Math.E); // 2.718281828459045
console.log(Math.LN10); // 2.302585092994046 (Natural log of 10)
console.log(Math.LOG10E); // 0.4342944819032518 (Base 10 log of E)

/**
 * For full details and edge cases, you should refer to:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
