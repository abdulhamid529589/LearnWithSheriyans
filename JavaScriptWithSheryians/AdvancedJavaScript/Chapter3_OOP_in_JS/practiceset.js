// Constructor Function

function CreatePencil(name, price, color, company) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.company = company;
}

CreatePencil.prototype.author = "Abdul Hamid";
CreatePencil.prototype.write = function (text) {
  let h1 = document.createElement("h1");
  h1.textContent = text;
  h1.style.color = this.color;
  document.body.append(h1);
};

let pencil1 = new CreatePencil("Good Luck", 10, "White", "Good Luck");
let pencil2 = new CreatePencil("fountain", 150, "blue", "fountain");

// Class in js
class MyPencil {
  constructor(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
  }

  erase() {
    document.body.querySelectorAll("h1").forEach((element) => {
      if (element.style.color === this.color) {
        element.remove();
      }
    });
  }

  write(text) {
    let h1 = document.createElement("h1");
    h1.textContent = text;
    h1.style.color = this.color;
    document.body.append("h1");
  }
}

let p1 = new MyPencil("Good Luck", 10, "blue");
let p2 = new MyPencil("Good Luck", 10, "yellow");

class User {
  constructor(name, address, username, email, color) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.email = email;
    this.role = "user";
    this.color = color;
  }

  write(text) {
    let h1 = document.createElement("h1");
    h1.textContent = `${this.name} : ${text}`;
    h1.style.color = this.color;
    document.body.append(h1);
  }
}

class Admin extends User {
  constructor(name, address, username, email) {
    super(name, address, username, email);
    this.role = "admin";
  }

  remove() {
    document.querySelectorAll("h1").forEach(function (element) {
      element.remove();
    });
  }
}

let user1 = new User(
  "Abdul Hamid",
  "Chottogram",
  "abdul529589",
  "fake@gmail.com",
  "blue"
);
let user2 = new User(
  "Abdul Hamid",
  "Chottogram",
  "abdul529589",
  "fake@gmail.com",
  "yellow"
);

let admin = new Admin(
  "admin1",
  "Dhaka",
  "admin529589",
  "fakeadmin@gmail.com",
  "gray"
);

// Classical Inheritance vs Prototypal Inheritance in JavaScript

/*
====================================================
Classical Inheritance (as in Java/C++/C#)
----------------------------------------------------
- Core Concept: Classes define blueprints for objects. 
  Objects are instantiated from classes using "constructors."
- Inheritance is established by extending classes.
- Typical OOP languages (Java, C++, C#) use this model:
    class Animal {
      ...
    }
    class Dog extends Animal {
      ...
    }

- All methods/properties come from parent classes (static structure).
- Instances are "copies" of a class template.

----------------
Example (Classical/EcmaScript 2015+):
----------------
*/

class Vehicle {
  constructor(make) {
    this.make = make;
  }
  drive() {
    console.log(this.make + " drives!");
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make);
    this.model = model;
  }
  honk() {
    console.log(this.make + " " + this.model + " says beep!");
  }
}

const car1 = new Car("Toyota", "Corolla");
car1.drive(); // Output: Toyota drives!
car1.honk(); // Output: Toyota Corolla says beep!

/*
====================================================
Prototypal Inheritance (Native JavaScript)
----------------------------------------------------
- Core Concept: Objects inherit directly from other objects.
- There are no class blueprints (pre-ES6). Any object can serve as a prototype.
- Methods/properties are resolved via **prototype chain** at runtime.
- More dynamic & flexible than classical inheritance.

----------------
Example (Prototypal):
----------------
*/

const vehicleProto = {
  drive: function () {
    console.log(this.make + " drives!");
  },
};

const carProto = Object.create(vehicleProto);
carProto.honk = function () {
  console.log(this.make + " " + this.model + " says beep!");
};

const car2 = Object.create(carProto);
car2.make = "Honda";
car2.model = "Civic";
car2.drive(); // Output: Honda drives!
car2.honk(); // Output: Honda Civic says beep!

/*
====================================================
Key Differences:
----------------------------------------------------
1. **Syntax**:
    - Classical: Uses `class`, `extends`, and `constructor`.
    - Prototypal: Uses `Object.create()`, and objects directly as prototypes.

2. **Inheritance Model**:
    - Classical: Instances inherit from classes.
    - Prototypal: Objects inherit from other objects.

3. **Instantiation**:
    - Classical: Uses `new` keyword on a class.
    - Prototypal: You clone or delegate to existing objects.

4. **Flexibility**:
    - Prototypal inheritance enables behaviors to be added/changed at runtime.
    - Classical is more rigid (like blueprints).

NOTE: 
- Modern JavaScript (ES6+) supports *syntactic sugar* classes, but underneath, all inheritance is still prototype-based!
- Understanding this helps you better reason about JS code and prototypes.

*/
