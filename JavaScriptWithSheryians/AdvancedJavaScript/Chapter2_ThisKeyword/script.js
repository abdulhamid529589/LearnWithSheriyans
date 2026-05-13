// Arrow functions are a concise way to write functions in JavaScript.
// They do not have their own 'this' context; instead, they use the 'this' value from their surrounding (lexical) scope.

const obj = {
  name: "ArrowFunctionExample",
  regularFunc: function () {
    console.log("'regularFunc' this.name:", this.name);
  },
  arrowFunc: () => {
    // In an arrow function, 'this' is not bound to the object
    console.log("'arrowFunc' this.name:", this.name);
  },
  testArrowInsideMethod: function () {
    // Here 'this' refers to the object 'obj'
    setTimeout(function () {
      // In a regular function, 'this' inside setTimeout is the global object or undefined (in strict mode)
      console.log("setTimeout regular function 'this.name':", this.name);
    }, 100);
    setTimeout(() => {
      // In an arrow function, 'this' is inherited from the containing function, which is 'testArrowInsideMethod'
      console.log("setTimeout arrow function 'this.name':", this.name);
    }, 100);
  },
};

obj.regularFunc(); // 'regularFunc' this.name: ArrowFunctionExample
obj.arrowFunc(); // 'arrowFunc' this.name: undefined (or window.name in browser global scope)

obj.testArrowInsideMethod();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Manual Binding: bind, call, apply

// In JavaScript, 'this' can be explicitly set using the methods: call, apply, and bind.

// Example object
const person = {
  name: "Alice",
  greet: function (greeting) {
    console.log(greeting + ", " + this.name);
  },
};

const anotherPerson = { name: "Bob" };

// --- call ---
// Invokes the function immediately, passing arguments one by one, and sets 'this' to anotherPerson
person.greet.call(anotherPerson, "Hello"); // Output: Hello, Bob

// --- apply ---
// Invokes the function immediately, passing arguments as an array, and sets 'this' to anotherPerson
person.greet.apply(anotherPerson, ["Hi"]); // Output: Hi, Bob

// --- bind ---
// Returns a new function with 'this' permanently set to anotherPerson
const boundGreet = person.greet.bind(anotherPerson);
boundGreet("Hey"); // Output: Hey, Bob

// ~~~~~~~~~~~ Another example ~~~~~~~~~~~~~~~~~~~~~~

let object = {
  name: "Abdul Hamid",
  age: 21,
};

function func() {
  console.log(this.age);
}

func.call(object);

// Summary:
// - call : fn.call(thisArg, arg1, arg2, ...)
// - apply: fn.apply(thisArg, [args])
// - bind : const newFn = fn.bind(thisArg); newFn(args)
//
// They are useful for setting the 'this' value manually, regardless of how or where a function is called.
