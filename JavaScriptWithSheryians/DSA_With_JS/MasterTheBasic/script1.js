/*
  ============================================================================
  Type Casting (Explicit Conversion) & Type Coercion (Implicit Conversion) in JavaScript
  ============================================================================

  JavaScript is a dynamically typed language, which means variables can hold any type of value at any time.
  To work with different data types, JS frequently needs to convert (aka "cast" or "coerce") values from one
  type to another. Understanding the difference between ***type casting*** and ***type coercion*** is crucial
  for writing bug-free, predictable code!

  ============================================================================

  1. TYPE CASTING (EXPLICIT TYPE CONVERSION)
  ------------------------------------------
    - **Definition:** Type casting (also called explicit conversion) is when the developer
      *directly and intentionally* converts a value from one data type to another using built-in
      functions, constructors, or methods.
    - **Why use it?** To guarantee a certain type for a value, increase code clarity, and
      avoid unpredictable bugs due to JavaScript's automatic type coercion.

    --------------------------------------------------------------------------

    A. Converting TO A STRING

      // Using String()
      String(123)          // "123"
      String(false)        // "false"
      String(null)         // "null"
      String([1,2,3])      // "1,2,3"

      // Using .toString() method (only on objects, numbers, booleans, arrays)
      (456).toString()     // "456"
      true.toString()      // "true"
      [1,2,3].toString()   // "1,2,3"

      // Implicitly, with template strings:
      `${42}`              // "42"

    --------------------------------------------------------------------------

    B. Converting TO A NUMBER

      // Using Number()
      Number("42")         // 42
      Number(true)         // 1
      Number(false)        // 0
      Number("foo")        // NaN

      // parseInt(), parseFloat() (convert strings to numbers, partial match allowed)
      parseInt("12px")     // 12
      parseInt("101", 2)   // 5 -- (binary to base10)
      parseFloat("3.14159hello") // 3.14159

      // Unary + operator (quick coercion)
      +"120"               // 120
      +true                // 1

    --------------------------------------------------------------------------

    C. Converting TO BOOLEAN

      // Using Boolean()
      Boolean(0)           // false
      Boolean("")          // false
      Boolean("hello")     // true
      Boolean([])          // true
      Boolean(null)        // false

      // Double NOT (shorthand)
      !!"js"               // true
      !!0                  // false

      // Falsy values in JS: 0, "", null, undefined, NaN, false

    --------------------------------------------------------------------------

    D. Example: Explicit Casting for Reliability

      let str = "123";
      let num = Number(str);      // 123     (string → number)
      let bool = Boolean(str);    // true    (non-empty strings are truthy)
      let strAgain = String(num); // "123"   (number → string)

      console.log(typeof num, typeof bool, typeof strAgain);
      // Output: "number" "boolean" "string"

  ============================================================================

  2. TYPE COERCION (IMPLICIT TYPE CONVERSION)
  -------------------------------------------
    - **Definition:** Type coercion is the *automatic* or implicit conversion of values
      from one data type to another by JavaScript itself, mainly during operations involving
      mixed types, such as arithmetic or comparisons.
    - **Why does JS do it?** Because JS tries to be "helpful", accommodating variables
      of any type in flexible operations.

    --------------------------------------------------------------------------

    A. Coercion in ARITHMETIC OPERATIONS

      // Multiplication, Division, Subtraction
      "10" * 2            // 20   ("10" → 10, 10*2)
      "10" / 2            // 5    ("10" → 10)
      "10" - 3            // 7

      // Concatenation (the + operator)
      "10" + 2            // "102"   (if either operand is string, the other is coerced to string!)
      2 + "10"            // "210"

      // Boolean in math
      true + 2            // 3    (true → 1)
      false * 10          // 0    (false → 0)

      // Null, undefined, arrays, objects
      null + 1            // 1      (null → 0)
      undefined + 1       // NaN    (undefined → NaN)
      [] + 1              // "1"    ([] → "", "" + 1 → "1")
      [2] * 3             // 6      ("2" * 3)

      // Objects ({}), Arrays, Functions create very odd coercion results due to their own .toString/.valueOf.

    --------------------------------------------------------------------------

    B. Coercion in COMPARISONS

      // == triggers coercion, === does NOT
      0 == false          // true
      "42" == 42          // true
      "" == 0             // true
      null == undefined   // true
      [] == false         // true   ([] → "" → 0)
      [0] == false        // true   ([0] → "0" → 0)
      [] == ''            // true
      [1,2] == "1,2"      // true

      // === checks both value & type
      0 === false         // false
      "42" === 42         // false

      // Comparisons always convert strings and numbers accordingly
      "5" < 10            // true
      "5" > 10            // false
      NaN == NaN          // false (trivia: NaN is never equal to anything, even itself!)

    --------------------------------------------------------------------------

    C. Coercion and LOGICAL OPERATIONS

      // Logical operators (||, &&, !) coerce operands to Boolean for decision-making,
      // but can also return the *actual value* (not just true/false).
      let name = "";
      let user = name || "Anonymous";    // "Anonymous" ("" is falsy)

      // Short-circuiting relies on coercion:
      let loggedIn = false;
      loggedIn && doSecret();            // (does not call doSecret)

      // The ! operator (NOT) converts to Boolean first!
      !0                    // true
      !"test"               // false

  ============================================================================

  3. HOW COERCION WORKS: Conversion Algorithms (ToPrimitive, ToString, ToNumber, ToBoolean)
  ----------------------------------------------------------------------------------------
      JavaScript uses internal algorithms (ECMAScript spec) for how to convert a value from type X to type Y:

      - ToString: (null → "null", number 12 → "12", array [1,2] → "1,2")
      - ToNumber: ("" → 0, true → 1, false → 0, null → 0, undefined → NaN, "5.2" → 5.2)
      - ToBoolean: (falsy: false, 0, "", null, undefined, NaN; everything else: true)
      - Objects and Arrays are first converted to primitives by valueOf() or toString().

      Example:
      [1,2] + 3
      //    [1,2] → "1,2", then "1,2" + "3" → "1,23"

      {} + []   // tricky: sometimes 0, sometimes "[object Object]" depending on context!

  ============================================================================

  4. DETAILED TABLE OF COERCION CASES

  | Expression           | Result            | Why? (Explanation)                                    |
  |----------------------|------------------|-------------------------------------------------------|
  | "5" + 2              | "52"             | 2 becomes "2", string concatenation                   |
  | "5" - 2              | 3                | "5"→5, 5-2=3                                         |
  | false + true         | 1                | false→0, true→1                                      |
  | null + 1             | 1                | null→0                                               |
  | undefined + 1        | NaN              | undefined→NaN                                        |
  | true == 1            | true             | true→1                                               |
  | [] == ""             | true             | []→""                                                |
  | [1] == 1             | true             | [1]→"1"→1                                            |
  | [1,2] == "1,2"       | true             | [1,2]→"1,2"                                          |
  | 0 == false           | true             | 0==0                                                 |
  | "" == 0              | true             | ""→0                                                 |
  | null == undefined    | true             | Special rule                                         |
  | NaN == NaN           | false            | NaN is not equal to itself                           |

  ============================================================================

  5. STRICT VS LOOSE COMPARISON

    - ==  (Loose)      → Performs coercion if necessary (dangerous if unsure about types!)
    - === (Strict)     → NO coercion. Both type and value must be the same.

      Example:
        0 == false      // true
        0 === false     // false
        "2" == 2        // true
        "2" === 2       // false

    - **Best Practice:** Always use === and !== for predictable comparison!

  ============================================================================

  6. HOW TO DETECT TYPES CORRECTLY

      - typeof value       // Returns "number", "string", "boolean", "undefined", "object" (for arrays, null, objects), "function", etc.
      - Array.isArray([])  // true
      - value === null     // true if value is null
      - Number.isNaN(x)    // true if value is actually NaN

      Example:
        typeof "abc"            // "string"
        typeof null             // "object" (historical bug!)
        typeof undefined        // "undefined"
        typeof [1,2]            // "object"
        Array.isArray([1,2])    // true

  ============================================================================

  7. REAL-WORLD EXAMPLES: Pitfalls and Best Practices

    // Pitfall: expecting number, getting string
    let qty = "8" + 1;         // "81" (string)
    let result = "5" * "3";    // 15 (number)

    // Defensive coding:
    let score = Number(prompt("Enter score:"));
    if (isNaN(score)) {
      alert("Not a number!");
    }

    // Safer comparisons:
    let x = 0;
    if (x === false) {
      // will NOT run, because (0 === false) is false!
    }
    if (x == false) {
      // runs, because (0 == false) is true via coercion
    }

  ============================================================================

  8. SUMMARY RECOMMENDATIONS

    - Always be aware of whether you are dealing with a string, number, boolean, array, object, etc.
    - Prefer **explicit casting** for clarity: Number(x), String(y), Boolean(z), etc.
    - Use **strict comparison** (=== and !==) to avoid bugs caused by unwanted coercion.
    - Be cautious with empty values (null, undefined, "", 0, NaN) — know what is truthy/falsy!

  ============================================================================

  9. REFERENCES & FURTHER READING

    - MDN on Type Conversion:
      https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#type_conversions

    - JavaScript types at a glance:
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

    - "You Don't Know JS" Book Series – *Types & Grammar* for deep dives.


  ---------------------------------------------------
  // In summary:
  // - "Type casting" is when YOU, the developer, intentionally convert types (explicit).
  // - "Type coercion" is when JavaScript silently tries to convert for you (implicit).
  // - Understand and control both to write robust JS code!
*/
