/*
===============================================
Practice Project: Library Book Management System
===============================================

Let's build a simple Library Book Management System using objects in JavaScript. This real-world program demonstrates how you can use objects to model actual entities and manage data.

We will:
- Represent each book as an object (with properties like title, author, ISBN, available, etc.)
- Use another object (or array) to act as the library's catalog of books
- Provide functions to:
    - Add new books
    - Borrow and return books
    - Search for books by different properties

-------------------------------------------------
Step 1: Book Object Structure
-------------------------------------------------
*/
function createBook(title, author, isbn) {
  return {
    title,
    author,
    isbn,
    available: true,
    borrow() {
      if (this.available) {
        this.available = false;
        console.log(`You have borrowed "${this.title}".`);
      } else {
        console.log(`Sorry, "${this.title}" is already borrowed.`);
      }
    },
    returnBook() {
      if (!this.available) {
        this.available = true;
        console.log(`Thank you for returning "${this.title}".`);
      } else {
        console.log(`"${this.title}" was not borrowed.`);
      }
    },
  };
}

/*
-------------------------------------------------
Step 2: Library Catalog as Object
-------------------------------------------------
We'll use an object where each property is an ISBN and the value is the book object.
*/
const library = {};

// Add books to library
function addBookToLibrary(book) {
  if (library[book.isbn]) {
    console.log(`Book with ISBN ${book.isbn} already exists.`);
    return;
  }
  library[book.isbn] = book;
  console.log(`Book "${book.title}" added to library.`);
}

// Example books:
const bk1 = createBook("Clean Code", "Robert C. Martin", "9780132350884");
const bk2 = createBook(
  "The Pragmatic Programmer",
  "Andrew Hunt",
  "9780201616224"
);
const bk3 = createBook(
  "Eloquent JavaScript",
  "Marijn Haverbeke",
  "9781593279509"
);

addBookToLibrary(bk1);
addBookToLibrary(bk2);
addBookToLibrary(bk3);

/*
-------------------------------------------------
Step 3: Borrowing and Returning Books
-------------------------------------------------
*/
function borrowBook(isbn) {
  const book = library[isbn];
  if (!book) {
    console.log("Book not found in library.");
    return;
  }
  book.borrow();
}

function returnBook(isbn) {
  const book = library[isbn];
  if (!book) {
    console.log("Book not found in library.");
    return;
  }
  book.returnBook();
}

/*
-------------------------------------------------
Step 4: Searching Books in the Library
-------------------------------------------------
*/

// Search by Title or Author (case-insensitive)
function searchBooks(query) {
  query = query.toLowerCase();
  const results = Object.values(library).filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );
  if (results.length === 0) {
    console.log("No books found matching your search.");
  } else {
    console.log("Search results:");
    results.forEach((b) => {
      console.log(
        `"${b.title}" by ${b.author} (ISBN:${b.isbn}) - ${
          b.available ? "Available" : "Borrowed"
        }`
      );
    });
  }
}

/*
-------------------------------------------------
Step 5: Demo of the Library System
-------------------------------------------------
*/
console.log("\n--- Library Demo ---\n");
searchBooks("programmer"); // Should show The Pragmatic Programmer
borrowBook("9780201616224"); // Borrow The Pragmatic Programmer
borrowBook("9780201616224"); // Try borrowing again
searchBooks("programmer"); // Show status changed
returnBook("9780201616224"); // Return the book
returnBook("9780201616224"); // Try returning again
searchBooks("martin"); // Search by author's name

/*
-------------------------------------------------
Explanation:
-------------------------------------------------

- Every book is its own object, bundling together all relevant data (title, author, ISBN, available) and actions (borrow, returnBook).
- The library is an object used as a catalog — fast lookup by ISBN for real-world efficiency.
- Functions let you add to the catalog, borrow/return, and search by title/author.
- We use methods on book objects to encapsulate the behavior: each book "knows" how to be borrowed/returned.
- This pattern models a real library! You could extend this to have users, late fees, categories, and more.

Objects are perfect for modeling real-world programs!
*/

/*
-------------------------------------------------
More Project Ideas Using Objects for Real-world Scenarios
-------------------------------------------------

Here are some practical project examples where objects play a key role and will help you build foundations for large, real-world applications:

1. **E-commerce Shopping Cart System**
   - Model products as objects with id, name, price, stock.
   - A cart is an object with keys as product ids and values as quantity.
   - Support adding/removing items, calculating totals, applying coupons.

2. **User Management & Authentication**
   - Store users as objects with properties like username, email, roles, permissions.
   - Implement registration, login (simple password match), and role checking functions.

3. **Task & Project Management Board**
   - Each task is an object (id, title, description, status, assignee).
   - Projects contain arrays or objects of tasks.
   - Support functions for updating status, assigning users, listing tasks by status.

4. **Inventory Management System**
   - Manage warehouses (objects) containing products (objects).
   - Track stock levels, locations, restocking needs.
   - Functions to transfer inventory, update quantities.

5. **Quiz/Test Application**
   - Questions are objects (questionText, options, correctAnswer).
   - The quiz is an array/object of questions.
   - Record user answers, check correctness, and generate reports.

6. **Budget Tracker**
   - Transactions are objects (date, type, category, amount).
   - Budgets/object models for each category.
   - Functions to add expenses, calculate monthly spending, alert on budget limits.

7. **Recipe Book**
   - Each recipe is an object (name, ingredients array, steps array, tags).
   - Store all recipes as an array or object (lookup by id).
   - Search by ingredient, tag, or title.

8. **Student Grading System**
   - Students as objects with id, name, classes, grades.
   - Class objects keep track of enrolled students and grade records.
   - Functions to add students, enter grades, compute averages.

9. **Social Media Mini App**
   - Users as objects.
   - Posts/comments as objects referencing users.
   - Like/follow system using arrays/objects of ids.

10. **Simple Banking System**
    - Accounts as objects (accountNo, name, balance).
    - Record transactions, deposit/withdrawal logic as methods.
    - Generate account statements.

*For all of these, focus on:*
- Using objects to store and organize data.
- Writing functions/methods that change/query your data.
- Thinking how you'd scale—could you swap arrays for objects with ids for faster lookups in large data sets?
- Use nested/complex objects for more realistic modeling.

Building even a basic prototype of any of these will teach you patterns key to managing complexity in big, real-world codebases!
*/

// 1. Create an object for a book (title, author, price)
const book = {
  title: "JavaScript Essentials",
  author: "R. Sharma",
  price: 499,
};

// 2. Access properties using both dot and bracket
console.log("Book Title (dot):", book.title); // Using dot notation
console.log("Book Price (bracket):", book["price"]); // Using bracket notation

// 3. Write a nested object (user with address and location)
const user = {
  name: "Amit",
  age: 28,
  address: {
    street: "45MG Road",
    city: "Pune",
    location: {
      lat: 18.5204,
      long: 73.8567,
    },
  },
};
console.log("User City:", user.address.city);
console.log("User Latitude:", user.address.location.lat);

// 4. Destructure name and age from a student object
const student = {
  name: "Neha",
  age: 21,
  course: "CS",
};

const { name, age } = student;
console.log("Student Name:", name);
console.log("Student Age:", age);

// 5. Loop through keys and values of an object
const car = {
  brand: "Honda",
  model: "City",
  year: 2022,
};

console.log("Car properties:");
for (const key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(`${key}: ${car[key]}`);
  }
}

// 6. Convert object to array using Object.entries()
const entries = Object.entries(car);
console.log("Car entries as array:", entries);

// 7. Copy an object using spread operator (shallow copy)
const shallowCopyBook = { ...book };
shallowCopyBook.price = 599; // Changing copy does not affect original's price property
console.log("Original Book Price:", book.price);
console.log("Shallow Copy Book Price:", shallowCopyBook.price);

// 8. Create a deep copy of an object with nested structure
const originalObj = {
  user: "Raj",
  details: {
    marks: {
      math: 95,
      science: 88,
    },
  },
};

const deepCopyObj = JSON.parse(JSON.stringify(originalObj));
deepCopyObj.details.marks.math = 100;
// originalObj is NOT changed because deep copy
console.log("Original Math Marks:", originalObj.details.marks.math);
console.log("Deep Copy Math Marks:", deepCopyObj.details.marks.math);

// 9. Use optional chaining to safely access deep values
const employee = {
  name: "Priya",
  department: {
    name: "Engineering",
    manager: {
      name: "Sunil",
    },
  },
};

console.log("Manager Name:", employee.department.manager?.name); // "Sunil"
console.log("Manager Email:", employee.department.manager?.email); // undefined, no error
console.log("Remote Info:", employee.remote?.location?.city); // undefined, no error

// 10. Use a variable as key using computed properties
const propName = "mobile";
const contact = {
  [propName]: "+91-9876543210",
  email: "priya@mail.com",
};
console.log("Mobile Number (computed property):", contact.mobile);

// === Explanation Summary (In Comments) ===

/*
1. Book Object: Simple object with key-value pairs.
2. Dot vs Bracket: Dot for static properties, bracket for dynamic or special chars.
3. Nested Object: Objects can contain other objects; access via chaining.
4. Destructuring: Extract multiple properties into variables in one step.
5. Looping: for...in iterates keys, use hasOwnProperty to avoid inherited props.
6. Object.entries: Creates array of [key, value] pairs for easy iteration or transformation.
7. Spread Copy: {...obj} copies top-level (shallow); changes to top-level don't affect original.
8. Deep Copy: JSON.parse(JSON.stringify(obj)) clones all levels—original unaffected by nested changes.
9. Optional Chaining: ?. safely reads deeply nested values, returning undefined if any reference is missing (instead of error).
10. Computed Property: [] lets you set property with a variable as its key when creating an object.
*/
