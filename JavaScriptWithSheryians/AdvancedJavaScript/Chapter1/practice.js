/*
----------------------------------------
Encapsulation with Closures (In-Depth Explanation)
----------------------------------------

**Encapsulation** is one of the core principles in software engineering, referring to the practice of bundling data (variables) and the methods that operate on that data together, restricting direct access to some of the object's components. This hides internal implementation details and exposes only what is necessary—a key aspect of building robust, modular code.

In JavaScript, encapsulation is commonly achieved using **closures**.

----------------------------------------
How Closures Enable Encapsulation
----------------------------------------

A closure allows an inner function to access variables defined in its outer (enclosing) function, even after the outer function has finished execution. By leveraging this, we can make certain variables "private" to the outside world—only accessible to functions defined within the same scope.

**Example: Encapsulating Data with Closures**
*/
function Counter() {
  // Private variable; can't be accessed directly from outside
  let count = 0;
  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
    // 'count' is not exposed directly!
  };
}

const myCounter = Counter();

console.log(myCounter.getCount()); // 0
myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // 2
myCounter.decrement();
console.log(myCounter.getCount()); // 1

// Direct access to 'count' is not possible:
// console.log(myCounter.count);      // undefined

/*
Here:
- The variable `count` is enclosed (closed over) by the returned object’s functions.
- `count` is truly private; only the methods provided by the returned object (`increment`, `decrement`, `getCount`) can see or modify it.
- External code cannot directly alter or read `count`, protecting the state from accidental or malicious tampering.

----------------------------------------
Benefits of Encapsulation with Closures:
----------------------------------------
1. **Data Privacy**: Hide sensitive variables from outside scope.
2. **API Control**: Expose only those methods intended for the public interface.
3. **Stateful Functions**: Keep state in memory without exposing it globally.

----------------------------------------
Another Example: Private State in a Module Pattern
----------------------------------------
*/
function createPerson(name) {
  let _name = name; // the underscore signals private intention

  return {
    getName: function () {
      return _name;
    },
    setName: function (newName) {
      if (typeof newName === "string" && newName.length > 0) {
        _name = newName;
      }
    },
  };
}

const person = createPerson("Alice");
console.log(person.getName()); // Alice
person.setName("Bob");
console.log(person.getName()); // Bob
// console.log(person._name);  // undefined (cannot directly access _name)

function ClickLimiter() {
  let click = 0;
  return function () {
    if (click < 3) {
      click++;
      console.log(`Clicked : ${click} times`);
    } else {
      console.log("LIMIT EXCEEDED, TRY AFTER SOME TIMEM");
    }
  };
}

let func = ClickLimiter();
console.log(func());
console.log(func());
console.log(func());
console.log(func());
console.log(func());

/*
Summary:
- Closures enable "object privacy" by retaining access to variables in their lexical scope, even after the outer function ends.
- This pattern is widely used for creating modules, singletons, and objects with private state in JavaScript—allowing you to encapsulate data and control how it is accessed or modified.
*/
