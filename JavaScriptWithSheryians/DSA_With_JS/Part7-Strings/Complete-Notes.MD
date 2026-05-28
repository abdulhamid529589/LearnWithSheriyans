# DSA Series — Strings: Complete Notes

> Based on lecture by Ali Ansari | Sheri's Coding School

---

## 📌 What is a String?

- A **string** is a **sequence/collection/combination of characters** wrapped inside **double quotes** (or single quotes in JavaScript).
- Without quotes, JS treats the word as a variable name → `ReferenceError: not defined`.
- A string **behaves like an array** (can be indexed), but it is **NOT an array**.
  - ❌ String does NOT have `.push()`, `.pop()` → proves it's not an array.
  - ✅ String CAN be accessed via index: `s[0]`, `s[1]` → proves array-like behavior.

---

## 📌 Immutability of Strings

- Strings are **immutable** — you **cannot change a character in place**.
- Example: `s[2] = 'y'` → does nothing, original string stays the same.
- Arrays are **mutable** — `arr[2] = 100` → works fine.
- To "change" a string, you must **reassign** it (which creates a **new string** in memory):
  ```js
  s = s + ' world' // new string created, original was never changed
  ```

---

## 📌 String Methods Overview

| Method                   | Type          | Purpose                                     |
| ------------------------ | ------------- | ------------------------------------------- |
| `.length`                | Property      | Count of characters                         |
| `.slice(start, end)`     | Method        | Extract substring (supports negative index) |
| `.substring(start, end)` | Method        | Extract substring (positive index only)     |
| `.toUpperCase()`         | Method        | Convert all to capital letters              |
| `.toLowerCase()`         | Method        | Convert all to small letters                |
| `.concat()`              | Method        | Join strings together                       |
| `.trim()`                | Method        | Remove leading/trailing spaces              |
| `.indexOf()`             | Method        | First occurrence index of a char            |
| `.lastIndexOf()`         | Method        | Last occurrence index of a char             |
| `.includes()`            | Method        | Check if substring exists                   |
| `.startsWith()`          | Method        | Check if string starts with value           |
| `.endsWith()`            | Method        | Check if string ends with value             |
| `.replace()`             | Method        | Replace first match                         |
| `.replaceAll()`          | Method        | Replace all matches                         |
| `.split()`               | Method        | Split string into array                     |
| `.charAt(i)`             | Method        | Get character at index `i`                  |
| `.charCodeAt(i)`         | Method        | Get ASCII value of character at index `i`   |
| `String.fromCharCode(n)` | Static Method | Convert ASCII value back to character       |

> **Note:** All string methods return a **new value** — they do NOT mutate the original string.

---

## 📌 Key Concepts

### `charAt(i)` vs `s[i]`

Both give the character at index `i`. They work the same way.

```js
s[2] // 'e'
s.charAt(2) // 'e'
```

### `charCodeAt(i)`

Returns the **ASCII (Unicode) value** of the character at index `i`.

```js
s.charCodeAt(2) // returns integer ASCII value
```

### `String.fromCharCode(n)`

Converts an ASCII integer back into a character.

```js
String.fromCharCode(97) // 'a'
String.fromCharCode(65) // 'A'
```

### Important ASCII Values to Remember

| Character       | ASCII Value |
| --------------- | ----------- |
| `'A'`           | 65          |
| `'Z'`           | 90          |
| `'a'`           | 97          |
| `'z'`           | 122         |
| `'0'` (as char) | 48          |
| `'1'` (as char) | 49          |

> 💡 **Key insight:** Difference between uppercase and lowercase ASCII = **32**
> `'a'(97) - 'A'(65) = 32`

---

## 🔢 Problem 1 — Print Each Character on a New Line

### Logic

- A string behaves like an array, so use a `for` loop from index `0` to `length - 1`.
- Access each character using `s[i]` or `s.charAt(i)`.

```
Loop i from 0 to s.length - 1:
    print s[i]
```

### Why it works

- Just like iterating an array of numbers, iterating a string gives each character one by one.

---

## 🔢 Problem 2 — Print String in Reverse Order (as a single reversed string)

### Logic — Naive Approach (not optimal)

- Create an empty string `reverse = ""`.
- Loop from `i = s.length - 1` down to `i = 0`.
- At each step: `reverse = reverse + s.charAt(i)` (concatenate character).
- Print `reverse` after the loop.

```
reverse = ""
Loop i from (s.length - 1) down to 0:
    reverse = reverse + s.charAt(i)
print reverse
```

### ⚠️ Why this is NOT optimal

- Each iteration **reassigns** the string → creates a **new string in memory** every time.
- For a string of length `n`, you create `n` new strings → high memory cost.

---

## 🔢 Problem 3 — Check if String is a Palindrome

### What is a Palindrome?

A string that reads the **same forward and backward**.

- `"madam"` ✅ | `"naman"` ✅ | `"abba"` ✅ | `"start"` ❌

---

### Approach 1 — Using Reverse (Naive, not optimal)

- Reverse the string using the approach from Problem 2.
- Compare `reverse === s`.
- If equal → palindrome. Else → not palindrome.

```
reverse = ""
Loop i from (s.length - 1) down to 0:
    reverse = reverse + s.charAt(i)

if (reverse === s) → "Palindrome"
else → "Not Palindrome"
```

### ⚠️ Problem: Same memory issue as Problem 2 (string reassignment `n` times).

---

### Approach 2 — Two Pointer Algorithm (Optimal ✅)

#### Core Idea

- Place one pointer `i` at the **start** (index `0`).
- Place one pointer `j` at the **end** (index `s.length - 1`).
- Move them toward each other, comparing characters.
- If any mismatch → **not a palindrome**, break immediately.
- If all characters matched → **palindrome**.

#### Step-by-step Logic

```
i = 0
j = s.length - 1
isPalindrome = true

while (i < j):
    if s[i] !== s[j]:
        isPalindrome = false
        break          ← stop immediately, no need to check further
    i++
    j--

if (isPalindrome) → print "Palindrome"
else → print "Not Palindrome"
```

#### Why this is Optimal

- **No extra string/array created** → O(1) space.
- Stops as soon as a mismatch is found → early exit.
- Time complexity: O(n/2) → effectively **O(n)**.

#### Dry Run Example — `"abcba"`

```
i=0, j=4 → s[0]='a', s[4]='a' ✅ → i++, j--
i=1, j=3 → s[1]='b', s[3]='b' ✅ → i++, j--
i=2, j=2 → i is NOT less than j → loop ends
→ isPalindrome = true ✅
```

#### Dry Run Example — `"abuda"`

```
i=0, j=4 → s[0]='a', s[4]='a' ✅ → i++, j--
i=1, j=3 → s[1]='b', s[3]='d' ❌ → isPalindrome = false, break
→ Not a Palindrome ✅
```

---

## 🔢 Problem 4 — Toggle Each Character (Uppercase ↔ Lowercase)

### What is Toggle?

- Every **uppercase** letter → convert to **lowercase**
- Every **lowercase** letter → convert to **uppercase**
- Example: `"AaBbCc"` → `"aAbBcC"`

### Logic — Using ASCII Values

#### Step 1: Identify if character is Uppercase or Lowercase

- If `charCodeAt(i) >= 65 && charCodeAt(i) <= 90` → **Uppercase**
- If `charCodeAt(i) >= 97 && charCodeAt(i) <= 122` → **Lowercase**

#### Step 2: Convert using ASCII arithmetic

- **Uppercase → Lowercase:** Add `32` to the ASCII value
  - `'A'(65) + 32 = 97 = 'a'` ✅
- **Lowercase → Uppercase:** Subtract `32` from the ASCII value
  - `'a'(97) - 32 = 65 = 'A'` ✅

#### Step 3: Convert ASCII integer back to character

- Use `String.fromCharCode(asciiValue)`

### Full Logic

```
toggle = ""
Loop i from 0 to s.length - 1:
    asciiVal = s.charCodeAt(i)

    if (asciiVal >= 65 AND asciiVal <= 90):        ← it's Uppercase
        toggle += String.fromCharCode(asciiVal + 32)  ← convert to lowercase

    else if (asciiVal >= 97 AND asciiVal <= 122):  ← it's Lowercase
        toggle += String.fromCharCode(asciiVal - 32)  ← convert to uppercase

print toggle
```

### Why ASCII Arithmetic Works

```
Capital A = 65    Small a = 97    Difference = 32
Capital B = 66    Small b = 98    Difference = 32
Capital Z = 90    Small z = 122   Difference = 32
```

The difference is always **32** between any uppercase and its lowercase counterpart.

---

## 🔢 Problem 5 — Frequency of Each Character

### Goal

Given a string, find **how many times each character appears**.

- Example: `"hello"` → h:1, e:1, l:2, o:1

### Logic — Bitmap / Frequency Array Approach

#### Core Idea

- Create an integer array `arr` of length **128** (to cover all ASCII characters — both uppercase 65–90 and lowercase 97–122).
- Initialize all values to `0`.
- For each character in the string:
  - Get its **ASCII value** → use it as an **index** in `arr`.
  - Increment that index: `arr[asciiValue]++`
- After processing the full string, traverse `arr`:
  - If `arr[i] > 0` → character at ASCII `i` appeared `arr[i]` times.
  - Convert index back to character using `String.fromCharCode(i)`.

#### Step-by-Step Logic

```
arr = new Array(128).fill(0)

// Step 1: Count frequencies
Loop i from 0 to s.length - 1:
    asciiVal = s.charCodeAt(i)
    arr[asciiVal] = arr[asciiVal] + 1

// Step 2: Print results
Loop i from 0 to 127:
    if arr[i] > 0:
        print String.fromCharCode(i) + " appears " + arr[i] + " times"
```

#### Dry Run — `"abcab"`

```
Initial arr: all 0s

'a' → ASCII 97 → arr[97] = 0+1 = 1
'b' → ASCII 98 → arr[98] = 0+1 = 1
'c' → ASCII 99 → arr[99] = 0+1 = 1
'a' → ASCII 97 → arr[97] = 1+1 = 2
'b' → ASCII 98 → arr[98] = 1+1 = 2

Result:
arr[97] = 2 → 'a' appears 2 times
arr[98] = 2 → 'b' appears 2 times
arr[99] = 1 → 'c' appears 1 time
```

### Why length 128?

- Uppercase letters: ASCII 65–90
- Lowercase letters: ASCII 97–122
- Both ranges fit inside 0–127 → so a 128-length array covers all cases.

### ⚠️ Homework (from lecture)

The current approach prints in **sorted ASCII order**, not in the order characters first appeared in the string.
**Your task:** Modify the logic so frequency is printed in the **order of first appearance** in the original string.

---

## 📌 Homework from Lecture

1. **Unicode / ASCII Characters** — Research what Unicode/ASCII character codes are, why they are needed, and comment your findings.
2. **Frequency in original order** — Modify Problem 5 so characters are printed in the order they first appear in the string.
3. **Practice all string methods** — Implement and test every method listed in the table above on your own.

---

## 💡 Key Takeaways

| Concept                   | Remember                                                |
| ------------------------- | ------------------------------------------------------- |
| String is immutable       | You can't change a character in place                   |
| String behaves like array | Indexing works: `s[0]`, `s[1]` etc.                     |
| ASCII gap: upper ↔ lower  | Always **32**                                           |
| Two Pointer               | Best for palindrome, reverse checks — O(n), O(1) space  |
| Bitmap/Freq Array         | Use ASCII value as index to count character occurrences |
| `charCodeAt(i)`           | Char → ASCII number                                     |
| `String.fromCharCode(n)`  | ASCII number → Char                                     |
