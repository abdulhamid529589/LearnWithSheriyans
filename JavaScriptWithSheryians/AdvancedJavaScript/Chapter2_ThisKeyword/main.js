/*
  The `this` keyword in JavaScript is a fundamental concept that refers 
  to the context in which a function is executed—specifically, it refers 
  to the "object" that is executing the current function. Its value 
  varies depending on how and where a function is called. Let's explore 
  its behavior in detail:

1. Global Context (Outside of any function)
   - In the global execution context (outside of any function), 
     `this` refers to the global object:
       - In browsers: `window`
       - In Node.js: `global`

   Example:
   ```
   console.log(this === window); // true (in browsers)
   ```

2. Function Context (Regular Functions)
   - When used inside a regular function, `this` refers to the global 
     object (in non-strict mode), or is `undefined` (in strict mode).

   Example:
   ```
   function show() {
     console.log(this);
   }
   show(); // window (non-strict), undefined (strict)
   ```

3. Method Context (Object Methods)
   - When a function is used as an object method, `this` refers to 
     the object which owns the method.

   Example:
   ```
   const obj = {
     name: "Alice",
     greet: function() {
       console.log(this.name);
     }
   };
   obj.greet(); // "Alice" ; 'this' refers to 'obj'
   ```

4. Constructor Functions (`new` keyword)
   - When a function is invoked as a constructor with the `new` keyword,
     `this` refers to the newly created instance.

   Example:
   ```
   function Person(name) {
     this.name = name;
   }
   const p = new Person("Bob");
   console.log(p.name); // "Bob"
   ```

5. Explicit Binding (`call`, `apply`, `bind`)
   - You can explicitly set the value of `this` using `call`, `apply`, or `bind`.

   Example:
   ```
   function sayHello() {
     console.log(this.name);
   }
   const user = { name: "Charlie" };
   sayHello.call(user); // "Charlie"
   ```

6. Arrow Functions
   - Arrow functions do not have their own `this`. They inherit `this` 
     from the surrounding (lexical) scope.

   Example:
   ```
   const obj = {
     value: 42,
     method: function() {
       const arrow = () => {
         console.log(this.value);
       };
       arrow();
     }
   };
   obj.method(); // 42
   ```

   In contrast, if `arrow` was a regular function, `this.value` 
   would be `undefined` or refer to the global object.

7. Event Handlers (DOM Elements)
   - In DOM event handlers, `this` refers to the element that 
     received the event.

   Example:
   ```
   document.querySelector("button").onclick = function() {
     console.log(this); // The button element
   };
   ```

8. Class Methods
   - Inside a class method, `this` refers to the class instance.

   Example:
   ```
   class Dog {
     constructor(name) {
       this.name = name;
     }
     bark() {
       console.log(this.name + " barks!");
     }
   }
   const d = new Dog("Max");
   d.bark(); // "Max barks!"
   ```

**Summary Table:**
| Situation                         | Value of `this`                           |
|------------------------------------|-------------------------------------------|
| Global scope (non-strict)          | Global object (window/global)             |
| Function (non-strict)              | Global object (window/global)             |
| Function (strict mode)             | undefined                                 |
| Method of object                   | The object                                |
| Constructor function (`new`)       | The new instance                          |
| Arrow function                     | Inherited (lexical) from parent context   |
| `call` / `apply` / `bind`          | Explicitly specified object               |
| DOM event handler                  | The target DOM element                    |
| Class method                       | The instance of the class                 |

**Best Practice:**
- Always be conscious of the context in which a function is called if your code depends on `this`.
- Prefer arrow functions when you want to inherit the `this` value from the surrounding scope.
- Use `.bind`, `.call`, or `.apply` to explicitly specify `this` where necessary.

global => Window
function => Window
method with es5 func => object
method with es6 arrow function => window
es5 function inside es5 method => window
arrow func inside es5 method => object
with event handler => element
class => blank object

Reference:
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
*/
