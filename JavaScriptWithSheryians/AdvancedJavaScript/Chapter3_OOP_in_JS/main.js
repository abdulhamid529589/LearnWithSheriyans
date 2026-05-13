/*
==========================================
Object-Oriented Programming (OOP) in JavaScript
==========================================

OOP is a programming paradigm organized around objects rather than actions, and data rather than logic.
JavaScript uses prototypes (not classical classes by default) for inheritance, but ES6 introduced [class] syntax
to provide a more familiar OOP style. Let's explore OOP in JavaScript step by step.

------------------------------------------
1. Object Literals (Basic OOP in JS)
------------------------------------------
*/

const personLiteral = {
  name: "Alice",
  age: 25,
  greet: function () {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  },
};
personLiteral.greet(); // Hi, I'm Alice and I'm 25 years old.

/*
- This creates an object with properties and methods directly.
- Drawback: cannot easily create multiple similar objects (not DRY).
------------------------------------------
2. Factory Functions
------------------------------------------
*/

function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    },
  };
}

const bob = createPerson("Bob", 30);
bob.greet(); // Hi, I'm Bob and I'm 30 years old.

/*
Benefits:
- You can generate many similar objects.
Drawbacks:
- Each object gets its own copy of methods—wastes memory if many objects.
*/

console.log(bob instanceof Object); // true

/*
------------------------------------------
3. Constructor Functions (Pre-ES6 "Classes")
------------------------------------------
*/

function Animal(species, sound) {
  this.species = species;
  this.sound = sound;
}
// Methods are added to the prototype:
Animal.prototype.speak = function () {
  console.log(`The ${this.species} says ${this.sound}`);
};

const dog = new Animal("dog", "woof");
const cat = new Animal("cat", "meow");
dog.speak(); // The dog says woof
cat.speak(); // The cat says meow

/*
------------------------------------------
4. Prototypes and Inheritance
------------------------------------------
- Every function (including constructors) has a prototype property.
- Objects have an internal [[Prototype]] reference (via __proto__ or Object.getPrototypeOf).
- Inheritance allows one type to "inherit" properties and methods.
*/

// Parent constructor
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.describe = function () {
  console.log(`This is a vehicle of type: ${this.type}`);
};

// Child constructor
function Car(brand, model) {
  Vehicle.call(this, "car"); // Call parent constructor
  this.brand = brand;
  this.model = model;
}

// Inherit prototype
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Add/override methods
Car.prototype.honk = function () {
  console.log(`${this.brand} ${this.model} goes beep!`);
};

const myCar = new Car("Toyota", "Corolla");
myCar.describe(); // This is a vehicle of type: car
myCar.honk(); // Toyota Corolla goes beep!

/*
------------------------------------------
5. ES6 Classes (Syntactic Sugar)
------------------------------------------
- Introduced in ES6—provides a more conventional and clear OOP syntax.
- Underneath, uses prototypes as before.
*/

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}.`);
  }
}

const alice = new Person("Alice", 22);
alice.greet(); // Hello, I'm Alice.

/*
------------------------------------------
6. Class Inheritance (extends, super)
------------------------------------------
*/

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age); // Calls the parent (Person) constructor
    this.job = job;
  }

  work() {
    console.log(`${this.name} is working as a ${this.job}.`);
  }

  // Overriding greet
  greet() {
    super.greet(); // Call parent greet
    console.log(`I work as a ${this.job}.`);
  }
}

const john = new Employee("John", 28, "Engineer");
john.greet();
// Hello, I'm John.
// I work as a Engineer.
john.work(); // John is working as a Engineer.

/*
------------------------------------------
7. Encapsulation: Public, Private Fields
------------------------------------------
- JS (as of ES2022+) allows private fields & methods with # syntax.
*/

class Counter {
  #count = 0; // Private property

  increment() {
    this.#count++;
    return this.#count;
  }

  get value() {
    return this.#count;
  }
}

const c = new Counter();
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.value); // 2
// console.log(c.#count);   // SyntaxError: Private field '#count' must be declared in an enclosing class

/*
------------------------------------------
8. Static Methods & Properties
------------------------------------------
- Belong to the class, not the instance.
*/

class MathUtil {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtil.add(10, 20)); // 30
console.log(MathUtil.PI); // 3.14159

/*
------------------------------------------
9. Polymorphism
------------------------------------------
- Child classes can override parent methods, supporting different "forms".
*/

class Shape {
  area() {
    return 0;
  }
}
class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() {
    return this.side * this.side;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

const s = new Square(4);
const cr = new Circle(3);
console.log(s.area()); // 16
console.log(cr.area()); // 28.27433...

/*
------------------------------------------
10. Abstract Classes (Simulated)
------------------------------------------
- JS does not have abstract classes, but you can simulate:
*/

class AbstractAnimal {
  constructor() {
    if (new.target === AbstractAnimal) {
      throw new Error("Cannot instantiate abstract class directly");
    }
  }
  makeSound() {
    throw new Error("Must override makeSound");
  }
}
class Dog extends AbstractAnimal {
  makeSound() {
    console.log("Woof!");
  }
}
// const a = new AbstractAnimal(); // Error
const rex = new Dog();
rex.makeSound(); // Woof!

/*
------------------------------------------
Summary: OOP in JS supports:
- Encapsulation: via private fields, closures
- Inheritance: via prototype chain and `extends` in ES6
- Polymorphism: via method overrides
- Abstraction: by convention (not enforced in language)
------------------------------------------
*/

/*
Useful Resources:
- MDN OOP in JS: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
- ES6 Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- "You Don't Know JS" book series
*/
