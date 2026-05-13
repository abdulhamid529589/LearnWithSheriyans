/*
==========================
   SWAPPING IN JAVASCRIPT
==========================

let a= 10
let b = 20
let c;

c = a;
a = b;
b = c

console.log(a)
console.log(b)

Swapping is the operation of exchanging values between two variables.
This is essential in algorithms (like sorting) and reveals a lot about how variables work!

========================================
1. Classic Swap: Temporary Variable
========================================
// The standard, type-safe way. Works for all variable types.

let a = "apple";
let b = "banana";
console.log("Before swap: a =", a, ", b =", b); // "apple", "banana"

let temp = a;
a = b;
b = temp;

console.log("After swap: a =", a, ", b =", b); // "banana", "apple"


========================================
2. Swapping Numbers (Arithmetic method)
========================================
// No extra variable, numbers only!

let x = 3;
let y = 7;
console.log("Before swap: x =", x, ", y =", y); // 3, 7

x = x + y; // x = 10
y = x - y; // y = 3
x = x - y; // x = 7

console.log("After swap: x =", x, ", y =", y); // 7, 3

// NOTE: This only works safely for numbers and may cause overflow for large numbers.


========================================
3. Swapping with Destructuring Assignment (ES6+)
========================================
// The clean, modern way. Works for any variable types.

let first = "John", second = "Doe";
console.log("Before swap: first =", first, ", second =", second); // John Doe

[first, second] = [second, first];

console.log("After swap: first =", first, ", second =", second); // Doe John

let a = 10
let b = 20
[a, b] = [b, a]
console.log(a, b)


========================================
4. Swapping Array Elements
========================================

let arr = [10, 20, 30, 40];
console.log("Before swap:", arr); // [10, 20, 30, 40]

// Swap the 1st and 3rd elements (indices 0 and 2)
[arr[0], arr[2]] = [arr[2], arr[0]];

console.log("After swap:", arr); // [30, 20, 10, 40]


========================================
5. Swapping Properties in Objects
========================================

let obj = { a: 1, b: 2 };
console.log("Before swap:", obj); // { a: 1, b: 2 }

[obj.a, obj.b] = [obj.b, obj.a];

console.log("After swap:", obj); // { a: 2, b: 1 }


========================================
6. Swapping with XOR (Numbers only, rarely used)
========================================
// Generally for integers, not recommended for clarity.

let i = 42, j = 99;
console.log("Before swap: i =", i, ", j =", j);

i = i ^ j;
j = i ^ j;
i = i ^ j;

console.log("After swap: i =", i, ", j =", j);


========================================
7. Swapping Arguments in a Function: Pitfall!
========================================
/*
You cannot swap SIMPLE variables by passing them to functions in JS.  
Because JavaScript passes primitives by value!
*/

function swapPrimitive(a, b) {
  let temp = a;
  a = b;
  b = temp;
  // only swaps "inside" this function
}
let num1 = 11,
  num2 = 22;
swapPrimitive(num1, num2);
console.log("Outside after swapPrimitive: num1 =", num1, ", num2 =", num2); // 11 22

// To swap outside, use an object or array:
function swapObjectKeys(obj, k1, k2) {
  [obj[k1], obj[k2]] = [obj[k2], obj[k1]];
}

let person = { first: "Alice", last: "Smith" };
swapObjectKeys(person, "first", "last");
console.log("After object swap:", person); // { first: "Smith", last: "Alice" }

/*
========================================
8. Swapping in Sorting Algorithms (Bubble Sort Example)
========================================

let numbers = [5, 3, 8, 2];
console.log("Before sort:", numbers);
for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = 0; j < numbers.length - 1 - i; j++) {
    if (numbers[j] > numbers[j + 1]) {
      // Swap adjacent elements
      [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
    }
  }
}
console.log("After bubble sort:", numbers); // [2, 3, 5, 8]


========================================
Summary Table

Technique                  | Works For           | Example Code                      | Notes
---------------------------|---------------------|------------------------------------|-----------------
Temporary Variable         | All types           | let t=a;a=b;b=t;                   | Safest, readable
Arithmetic                 | Numbers only        | x=x+y;y=x-y;x=x-y;                 | May overflow!
Destructuring Assignment   | All ES6+            | [a,b]=[b,a];                       | Modern, clean
Object/Array properties    | All (inside struct) | [obj.k1,obj.k2]=[obj.k2,obj.k1];   | For data structures
XOR                        | Integers only       | x^=y;y^=x;x^=y;                    | Rare, cryptic

***Best Practice:*** Use destructuring for modern code. Use a temporary variable if you want maximum clarity and compatibility.

========================================
Try these techniques out and observe the results!
========================================
*/
