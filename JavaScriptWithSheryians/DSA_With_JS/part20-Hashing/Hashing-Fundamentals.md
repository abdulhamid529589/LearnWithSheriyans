# 🗂️ DSA Lecture 18 — Hashing Fundamentals

> **Sheriyans Coding School** | What hashing is, why it matters, how it works at an upper level, and the two key data structures it powers: **Set** and **Map**.

---

## Table of Contents

1. [What Is Hashing?](#1-what-is-hashing)
2. [Why Do We Need Hashing?](#2-why-do-we-need-hashing)
3. [How Hashing Works (Upper Level)](#3-how-hashing-works-upper-level)
4. [What Uses Hashing?](#4-what-uses-hashing)
5. [Set — The Data Structure](#5-set--the-data-structure)
6. [Map — The Data Structure](#6-map--the-data-structure)
7. [Map vs Object — Key Differences](#7-map-vs-object--key-differences)
8. [Quick Reference Cheat Sheet](#8-quick-reference-cheat-sheet)

---

## 1. What Is Hashing?

> **Hashing** is a technique of converting a value into a unique short code (called a **hash code**) for the purpose of storing and accessing data quickly.

The key word is **technique** — hashing is not a data structure like an array or linked list. It's a method, the same way recursion is a method. The purpose of the technique is to let you store and retrieve data extremely fast.

### Analogy: Gym Lockers

Think of a gym where every member gets a key to their own locker. That key is a **hash code** — it directly maps to one specific locker. You don't search through all the lockers one by one; you use your key and go straight to yours. Hashing works the same way: every value gets a hash code, and that code points directly to where the data lives in memory.

---

## 2. Why Do We Need Hashing?

Compare what happens with an **array** vs **hashing** for the three fundamental operations:

| Operation  | Array (unsorted)                                   | Hashing          |
| ---------- | -------------------------------------------------- | ---------------- |
| **Search** | O(n) — visit each element one by one in worst case | **O(1) average** |
| **Insert** | O(n) — may need to shift elements                  | **O(1) average** |
| **Delete** | O(n) — may need to shift elements after removal    | **O(1) average** |

> **Why "average" O(1) and not always O(1)?** Hashing can have collisions (two values mapping to the same hash code), which adds overhead. The deeper mechanics of this are an advanced topic, but for DSA problem-solving purposes, treat hashing operations as constant time.

### The Space-Time Tradeoff

A recurring theme in DSA:

```
Want to reduce TIME?  → Spend more SPACE (use a hash structure)
Want to reduce SPACE? → Spend more TIME (use arrays/loops)
```

Hashing gives you blazing-fast time complexity at the cost of using extra memory for the hash structure.

### One More Reason: Uniqueness Enforcement

Hashing data structures like `Set` automatically prevent duplicate entries — something arrays don't do. Many problems require tracking unique elements, and a Set handles that natively.

---

## 3. How Hashing Works (Upper Level)

Behind the scenes, every key you store gets converted to a hash code. That hash code acts as a direct address in memory where the value is stored. When you retrieve the value later, the key is converted to the same hash code, and the value is fetched directly from that address — no searching needed.

### JavaScript Objects Use Hashing

You may not have realized it, but JavaScript `Object` already uses hashing internally:

```javascript
const student = {
  name: 'Ravi Gupta',
  age: 19,
  contact: '9876543210',
}
```

When you write `student.name`, JavaScript converts the string `"name"` to a hash code (something like `1x2B`), looks up that address in memory, and retrieves `"Ravi Gupta"` directly. That's why property access on objects is O(1).

The difference between objects and dedicated hash data structures (`Map`, `Set`) is explored in section 7.

---

## 4. What Uses Hashing?

In JavaScript, three constructs use hashing:

| Construct  | Key type              | Duplicate keys? | Notes                             |
| ---------- | --------------------- | --------------- | --------------------------------- |
| **Object** | String or Symbol only | No (updates)    | Best for static/known keys        |
| **Map**    | Any type              | No (updates)    | Best for dynamic key-value pairs  |
| **Set**    | (values only)         | No (ignored)    | Best for unique-value collections |

---

## 5. Set — The Data Structure

### What Is a Set?

A **Set** is a linear data structure that stores multiple values, just like an array — with one crucial difference:

> **A Set always contains only unique data. Duplicates are silently ignored.**

It also maintains **insertion order** (the order you add elements is the order you get them back).

### Declaration

```javascript
let set = new Set()
```

### Core Methods

```javascript
// Adding elements
set.add(19)
set.add(20)
set.add(13)
set.add(18)
set.add(19) // ← duplicate, silently ignored

console.log(set) // Set { 19, 20, 13, 18 }  — 19 appears only once

// Deleting an element
set.delete(20)
console.log(set) // Set { 19, 13, 18 }

// Checking existence — returns true or false
console.log(set.has(19)) // true
console.log(set.has(100)) // false

// Size (it's a property, not a method — no parentheses)
console.log(set.size) // 3

// Clear all elements
set.clear()
```

### Iterating a Set

```javascript
let set = new Set()
set.add(10)
set.add(20)
set.add(30)

for (let a of set) {
  console.log(a)
}
// Output: 10, 20, 30  (insertion order preserved)
```

### Shortcut: Remove All Duplicates from an Array

If you pass an array directly to the `Set` constructor, it filters out all duplicates automatically:

```javascript
let arr = [10, 20, 10, 30, 20, 10]
let set = new Set(arr)
console.log(set) // Set { 10, 20, 30 }
```

This is one of the most common one-liner tricks in JavaScript DSA problems.

### Set Methods Summary

| Method / Property   | What it does                              |
| ------------------- | ----------------------------------------- |
| `set.add(value)`    | Adds value (ignored if already present)   |
| `set.delete(value)` | Removes the value                         |
| `set.has(value)`    | Returns `true` / `false`                  |
| `set.size`          | Number of elements (property, not method) |
| `set.clear()`       | Removes all elements                      |
| `for...of` loop     | Iterates in insertion order               |

---

## 6. Map — The Data Structure

### What Is a Map?

A **Map** is a linear data structure that stores data as **key-value pairs**, just like a JavaScript Object — with more flexibility and better performance for dynamic use cases.

> **Keys are always unique** in a Map. Values can be duplicates.

If you try to add a key that already exists, the value is **updated** (not duplicated):

```javascript
map.set('name', 'Ravi')
map.set('name', 'Amit') // updates, doesn't duplicate
// Result: "name" → "Amit"
```

### Declaration

```javascript
let map = new Map()
```

### Core Methods

```javascript
// set(key, value) — adds or updates
map.set('name', 'Ali')
map.set('age', 19)
map.set('isPassed', true)
map.set('contact', ['9876543210', '9123456789'])

// get(key) — retrieves value by key
console.log(map.get('name')) // "Ali"
console.log(map.get('age')) // 19

// has(key) — returns true / false
console.log(map.has('name')) // true
console.log(map.has('salary')) // false

// delete(key) — removes entry
map.delete('age')

// size — number of key-value pairs (property, not method)
console.log(map.size) // 3

// clear — removes everything
map.clear()
```

> **Note:** `has`, `delete`, and `get` all take a **key**, not a value. You always work through the key to reach the value.

### Iterating a Map

```javascript
// Iterate entries (key-value pairs)
for (let [key, value] of map) {
  console.log(key, value)
}

// Iterate only keys
for (let key of map.keys()) {
  console.log(key)
}

// Iterate only values
for (let value of map.values()) {
  console.log(value)
}
```

### The Frequency Counter Pattern (Most Common Map Use)

This is the most important Map pattern in DSA — counting how many times each element appears:

```javascript
let arr = [10, 3, 5, 6, 10, 1, 3, 3, 5, 5, 7]
let map = new Map()

for (let i = 0; i < arr.length; i++) {
  map.set(arr[i], (map.get(arr[i]) || 0) + 1)
}

console.log(map)
// Map { 10 → 2, 3 → 3, 5 → 3, 6 → 1, 1 → 1, 7 → 1 }
```

**How the one-liner works:**

- `map.get(arr[i])` → returns current frequency, or `undefined` if first time
- `|| 0` → treats `undefined` as `0` (default frequency)
- `+ 1` → increment by 1
- `map.set(arr[i], ...)` → write back the updated frequency

---

## 7. Map vs Object — Key Differences

Both store key-value pairs, but they behave differently in important ways:

| Feature         | Object                                                     | Map                                                      |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| **Key types**   | String or Symbol only                                      | **Any type** (objects, functions, numbers, `null`, etc.) |
| **Key order**   | Not guaranteed in older JS; mostly insertion order now     | **Always insertion order**                               |
| **Iteration**   | Needs `for...in` or `Object.keys()`                        | Direct `for...of` on the map itself                      |
| **Size**        | No direct property — `Object.keys(obj).length`             | Direct `.size` property                                  |
| **Performance** | Optimized for static, known keys                           | Better for **frequent additions/deletions**              |
| **Prototype**   | Inherits from `Object.prototype` (potential key conflicts) | Pure data container, no prototype chain issues           |

### When to Use Which

```
Use Object when:
  - Key names are known, simple strings
  - Data is relatively static
  - You need JSON serialization

Use Map when:
  - Keys are dynamic or non-string types
  - Frequent insertions/deletions expected
  - Need guaranteed insertion order
  - Need .size without extra calculation
  - DSA problems (Map is almost always better for algorithmic work)
```

---

## 8. Quick Reference Cheat Sheet

```
╔════════════════════════════════════════════════════════════╗
║                  HASHING CHEAT SHEET                        ║
╠════════════════════════════════════════════════════════════╣
║ WHY USE HASHING?                                            ║
║   Search / Insert / Delete: O(n) → O(1) average            ║
║   Trade: more memory, much faster time                      ║
║                                                              ║
║ SET — for unique values                                      ║
║   new Set()           create                                 ║
║   set.add(v)          add (duplicate = ignored)              ║
║   set.delete(v)       remove                                 ║
║   set.has(v)          true/false                             ║
║   set.size            count (property)                       ║
║   set.clear()         remove all                             ║
║   for (let x of set)  iterate                                ║
║   new Set(array)      instant dedup shortcut                 ║
║                                                              ║
║ MAP — for key-value pairs                                    ║
║   new Map()           create                                 ║
║   map.set(k, v)       add/update                             ║
║   map.get(k)          retrieve value                         ║
║   map.has(k)          true/false                             ║
║   map.delete(k)       remove entry                           ║
║   map.size            count (property)                       ║
║   map.clear()         remove all                             ║
║   for (let [k,v] of map) iterate entries                     ║
║   map.keys()          iterate keys only                      ║
║   map.values()        iterate values only                    ║
║                                                              ║
║ FREQUENCY COUNTER (most common pattern):                    ║
║   map.set(x, (map.get(x) || 0) + 1)                         ║
║                                                              ║
║ MAP vs OBJECT:                                               ║
║   Object → static keys, strings only                        ║
║   Map    → any key type, dynamic, better for DSA            ║
╚════════════════════════════════════════════════════════════╝
```

---

_End of Lecture 18 — Hashing Fundamentals. Next: Lecture 19 covers the first batch of hashing problems — finding the unique element using even-frequency logic, removing duplicates, pangram check, frequency printing, and sorting people by height._
