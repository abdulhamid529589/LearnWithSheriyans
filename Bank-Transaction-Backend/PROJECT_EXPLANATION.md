# Bank Transaction Backend - Full Project Explanation

---

## 1. What is this project?

This is a simple backend service for a digital ledger/banking-style application.

It allows users to:

- create an account
- log in and log out securely
- transfer money between accounts
- check account balance
- receive email notifications for registration and transactions

In simple words, this project is a mini version of a banking backend.

---

## 2. What technologies are used?

This project uses:

- Node.js as the runtime environment
- Express.js as the web framework
- MongoDB as the database
- Mongoose as the MongoDB object modeling tool
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- cookie-parser to read cookies
- nodemailer to send emails

---

## 3. High-level architecture

This project follows a very common backend structure:

1. Client sends an HTTP request
2. Express routes the request to the correct controller
3. Controller talks to the database using Mongoose models
4. Middleware may check authentication or authorization
5. Response is sent back to the client

Think of it like this:

Client -> Routes -> Controllers -> Models/Database -> Response

---

## 4. Folder structure and what each folder does

### Root files

- server.js
  - Starts the server and connects the app to the database
- package.json
  - Contains project dependencies and scripts

### src/

- app.js
  - Creates the Express app and registers all routes
- config/
  - Database connection setup
- controllers/
  - Contains request handlers for each feature
- middleware/
  - Contains logic that runs before controller logic
- models/
  - Defines database schemas and business logic for data
- routes/
  - Defines API endpoints and maps them to controllers
- services/
  - External services like email

---

## 5. How the app starts

The application starts from server.js.

### What happens in server.js?

1. It loads environment variables using dotenv
2. It imports the Express app from src/app.js
3. It calls the database connection function
4. It starts the server on port 3000

### Important idea

A backend server does not just “run.” It must:

- connect to the database
- listen for incoming requests
- route requests to the correct handler

---

## 6. How Express app is created

In src/app.js:

- Express is initialized
- JSON body parsing is enabled using express.json()
- Cookie parsing is enabled using cookie-parser()
- Routes are mounted under different URL prefixes

### Why is this important?

Because the app needs to understand request data sent as JSON and cookies.

### Main routes registered

- /api/auth -> authentication routes
- /api/accounts -> account routes
- /api/transactions -> transaction routes

---

## 7. Database connection flow

The file src/config/db.js handles MongoDB connection.

### What it does

- Calls mongoose.connect(process.env.MONGO_URI)
- If connected successfully, logs a success message
- If connection fails, logs the error and exits the process

### Why this matters

Without a database connection, the app cannot save users, accounts, transactions, or ledger entries.

---

## 8. Authentication system explained simply

This app has a basic authentication system based on JWT.

### JWT means

JSON Web Token is a small secure token that the server creates after a user logs in.

The server can later verify the token and know:

- who the user is
- whether the token is valid
- whether the token has been revoked

### How the auth flow works

#### 1. Register

A user sends email, password, and name.
The server:

- checks whether the email already exists
- creates a new user in the database
- creates a JWT token
- stores the token in a cookie
- returns the user info and token

#### 2. Login

A user sends email and password.
The server:

- finds the user by email
- checks if the password is correct
- creates a new JWT token
- stores it in a cookie
- returns the user info and token

#### 3. Logout

The user logs out.
The server:

- takes the token from the cookie or authorization header
- saves it in a blacklist collection
- clears the cookie
- returns a success message

### Why blacklist is used

If a user logs out, their old token should no longer work. Blacklisting helps implement that.

---

## 9. User model explained

The file src/models/user.model.js defines the user schema.

### What fields does a user have?

- email: unique, required, trimmed, lowercase
- name: required
- password: hashed before saving
- systemUser: boolean, default false
- timestamps: createdAt and updatedAt automatically

### Important concept: password hashing

The app does not save the password directly as plain text.
It hashes it using bcrypt before storing it.

Why?
Because storing plaintext passwords is unsafe.

### ComparePassword method

This method compares the password the user typed during login with the hashed password stored in the database.

---

## 10. Authentication middleware explained

The file src/middleware/auth.middleware.js contains middleware functions.

### What is middleware?

Middleware is code that runs before the actual controller logic.

It checks things like:

- is the token present?
- is the token blacklisted?
- is the token valid?
- what user is attached to this token?

### authMiddleware

This middleware protects routes.
If the token is missing or invalid, the request is rejected with 401 Unauthorized.

### authSystemUserMiddleware

This is a stricter middleware.
It checks whether the user is a system user.
This is used for initial-funds transactions.

### Why this is useful

It prevents unauthorized access to sensitive routes.

---

## 11. Auth routes explained

The file src/routes/auth.routes.js defines these endpoints:

### POST /api/auth/register

Creates a new user account.

### POST /api/auth/login

Logs in an existing user.

### POST /api/auth/logout

Logs out a user and invalidates their token.

---

## 12. Account feature explained

The account feature is about creating and managing user accounts inside the ledger system.

### Account model

The file src/models/account.model.js defines the account schema.

### Fields in account

- user: the owner of the account
- status: ACTIVE, FROZEN, or CLOSED
- currency: default is INR
- timestamps

### Why accounts are needed

Each transfer happens between accounts.
So the app needs a way to represent bank accounts in the database.

---

## 13. Account routes explained

### POST /api/accounts/

Creates a new account for the logged-in user.

### GET /api/accounts/

Returns all accounts owned by the current user.

### GET /api/accounts/balance/:accountId

Returns the balance of a specific account for the current user.

### Important security detail

Each account is tied to a user.
So a user cannot view or access another user’s account unless the app explicitly allows it.

---

## 14. How account balance is calculated

The account balance is not stored as a simple number directly in the account document.
Instead, the app calculates it from ledger entries.

### Why this design is used

The system wants an auditable record of every movement.
That means every debit and credit is recorded separately.

### Ledger model

The file src/models/ledger.model.js stores every transfer as a ledger entry.

Each ledger entry contains:

- account: which account the entry belongs to
- amount: how much money moved
- transaction: which transaction caused this movement
- type: DEBIT or CREDIT

### Balance formula

The balance is computed as:

Credit total - Debit total

If the account has only credits, balance increases.
If the account has debits, balance decreases.

---

## 15. Transaction feature explained

The transaction feature is the most important part of the project.

A transaction means money moving from one account to another.

### Example

If Alice sends 100 INR to Bob:

- Alice’s account gets a DEBIT entry
- Bob’s account gets a CREDIT entry
- A transaction record is created to represent the transfer

---

## 16. Transaction flow step by step

The controller in src/controllers/transaction.controller.js handles money transfer logic.

Here is the full flow.

### Step 1: Validate user input

The server checks that the request includes:

- fromAccount
- toAccount
- amount
- idempotencyKey

If any of these are missing, it returns a bad request error.

### Step 2: Check if the accounts exist

The server looks up the sender and receiver accounts in the database.
If either account does not exist, transfer fails.

### Step 3: Check idempotency key

An idempotency key is a unique value used to prevent duplicate transactions.
If the same key is used again, the server can detect that the transaction was already processed.

This is very important because network issues can cause clients to retry unintentionally.

### Step 4: Check account status

Both accounts must be ACTIVE.
If either account is FROZEN or CLOSED, the transfer is rejected.

### Step 5: Check sender balance

The server calculates the sender’s current balance from the ledger.
If the sender does not have enough money, the transfer fails.

### Step 6: Start a database transaction

A MongoDB session is started.
This ensures all database changes happen together.
If something fails, the system can roll back everything.

### Step 7: Create a transaction record

The system creates a transaction record with status PENDING.

### Step 8: Create a debit ledger entry

A DEBIT ledger entry is created for the sender’s account.

### Step 9: Wait briefly

There is a deliberate 15-second delay in the code before the next step.
This simulates a processing delay.

### Step 10: Create a credit ledger entry

A CREDIT ledger entry is created for the receiver’s account.

### Step 11: Mark the transaction as completed

The transaction status changes from PENDING to COMPLETED.

### Step 12: Commit the database transaction

All changes are saved permanently.

### Step 13: Send an email notification

An email is sent to the user informing them that the transaction was successful.

---

## 17. Why the project uses idempotency

Imagine a client sends a transfer request twice because the first request timed out.
Without idempotency, the system might process the transfer twice.

The app prevents this by requiring an idempotencyKey.
If the same key is used again:

- the system can detect the duplicate request
- it can return the original result instead of creating a second transfer

This is a great backend pattern.

---

## 18. Why the project uses database transactions

A database transaction ensures that all related changes succeed or fail together.

For example, when transferring money:

- the transaction record must be saved
- the debit ledger entry must be saved
- the credit ledger entry must be saved

If one of these fails, the others should not remain half-saved.
That is exactly what transactions help prevent.

---

## 19. Transaction model explained

The file src/models/transaction.model.js defines the transaction schema.

### Fields

- fromAccount: sender account
- toAccount: receiver account
- status: PENDING, COMPLETED, FAILED, REVERSED
- amount: transfer amount
- idempotencyKey: unique key to prevent duplicate transaction processing

### Why this model matters

It stores the business event of transfer money from one account to another.

---

## 20. Ledger model explained

The ledger is the historical record of money movement.

This is a very important backend design idea.

### Why the ledger is separate from the account model

The account model represents the account itself.
The ledger model represents the history of what happened to that account.

That means you can answer questions like:

- what happened to this account?
- how much money was received?
- how much money was sent?
- what is the balance today?

---

## 21. How initial funds transaction works

The route POST /api/transactions/system/initial-funds is meant for a system user.

### What it does

It credits an account with an initial amount.

### Why it exists

In a banking-style system, a system account may be used to seed funds into a user account.

### Flow

1. Check that the target account exists
2. Find the system user’s account
3. Create a debit entry in the system account
4. Create a credit entry in the target account
5. Mark the transaction as completed

---

## 22. Email service explained

The file src/services/email.service.js uses nodemailer to send emails.

### What it does

- sends welcome emails after registration
- sends transaction success emails
- can also send failure emails

### Important note

The email service depends on environment variables like:

- EMAIL_USER
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN

If those are not configured, email sending may fail.

---

## 23. Request lifecycle example: user registration

Let’s walk through registration step by step.

### Request

A client sends:

- POST /api/auth/register
- JSON body with email, password, and name

### What happens

1. Express receives the request
2. The route sends it to the register controller
3. The controller checks if the email already exists
4. If not, it creates the user in MongoDB
5. It creates a JWT token
6. It stores the token in a cookie
7. It returns a JSON response to the client
8. It sends a welcome email in the background

### Response example

The response includes:

- user information
- token

---

## 24. Request lifecycle example: money transfer

Now let’s walk through a transfer.

### Request

A client sends:

- POST /api/transactions/
- JSON body with fromAccount, toAccount, amount, idempotencyKey

### What happens

1. Authentication middleware checks the token
2. The controller checks that the accounts exist
3. It validates the idempotency key
4. It confirms both accounts are ACTIVE
5. It calculates the sender balance
6. It starts a database transaction
7. It creates the transaction record
8. It creates ledger entries for debit and credit
9. It marks the transaction completed
10. It commits the transaction
11. It sends a success email

### Why this is a good backend flow

Because it handles both correctness and reliability.

---

## 25. Security concepts used in this project

This project already uses some important security principles.

### Password hashing

Passwords are hashed before saving.

### JWT authentication

Users must present a valid token to access protected routes.

### Token blacklisting

Logged-out tokens are invalidated.

### Authorization by ownership

A user can only access their own accounts.

### Input validation

The server checks required fields and account existence.

---

## 26. Important beginner lessons from this project

If you are a beginner, these are the main things to learn from this project:

### 1. How routes work

Routes define the API endpoints.

### 2. How controllers work

Controllers handle the request logic.

### 3. How models work

Models define how data is structured in MongoDB.

### 4. How middleware works

Middleware runs before business logic and protects routes.

### 5. How transactions work

Transactions help keep data consistent.

### 6. How ledger systems work

A ledger gives you a history of every change.

### 7. Why idempotency matters

It prevents duplicate processing of the same operation.

---

## 27. What this project does well

This project demonstrates several solid backend concepts:

- authentication
- protected routes
- database modeling
- transaction handling
- balance calculation
- email integration

---

## 28. Possible improvements for production

This project is a great learning project, but in a real production system, you would likely also add:

- proper validation libraries like Joi or Zod
- role-based access control
- request rate limiting
- better error handling
- tests
- pagination for accounts and transactions
- audit logs
- more robust transaction failure handling

---

## 29. Postman testing guide

Testing a backend API in Postman is not just about clicking Send. In industry practice, you test the API in a structured way so that each endpoint is verified for correctness, reliability, and security.

### 29.1 Prerequisites

Before testing, make sure:

- the application is running locally
- MongoDB is running and reachable
- the environment variables are configured
- Postman is installed

### 29.2 Start the application

Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

If everything is correct, you should see a message similar to:

```bash
Server is running on port 3000
```

and the database connection message.

### 29.3 Recommended Postman setup

Create a Postman collection named:

```text
Bank Transaction Backend
```

Create an environment with these variables:

- baseUrl = http://localhost:3000
- token = empty
- userEmail = testuser@example.com
- userPassword = password123
- name = Test User
- fromAccount = empty
- toAccount = empty
- idempotencyKey = empty

### 29.4 HTTP status code expectations

Use these status codes as your quality standard:

- 200 OK -> successful read or successful operation
- 201 Created -> resource successfully created
- 400 Bad Request -> invalid input or business rule failure
- 401 Unauthorized -> missing or invalid token
- 403 Forbidden -> valid token but not allowed for this route
- 404 Not Found -> resource does not exist
- 422 Unprocessable Entity -> duplicate or invalid business data

### 29.5 Test flow in the correct order

A good tester follows the flow of the application in the same sequence a real user would.

#### Step 1: Register a user

Method: POST

URL:

```text
{{baseUrl}}/api/auth/register
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "{{userEmail}}",
  "password": "{{userPassword}}",
  "name": "{{name}}"
}
```

Expected result:

- status code 201
- response contains user info
- a token is returned
- the server sets a cookie containing the token

Important note:

- Save the returned token in the Postman environment variable called token.

#### Step 2: Login the same user

Method: POST

URL:

```text
{{baseUrl}}/api/auth/login
```

Body:

```json
{
  "email": "{{userEmail}}",
  "password": "{{userPassword}}"
}
```

Expected result:

- status code 200
- valid user object returned
- token returned again

#### Step 3: Create the first account

Method: POST

URL:

```text
{{baseUrl}}/api/accounts/
```

Headers:

```text
Authorization: Bearer {{token}}
```

Expected result:

- status code 201
- response contains an account object
- save the created account id in the Postman variable fromAccount

#### Step 4: Create the second account

Method: POST

URL:

```text
{{baseUrl}}/api/accounts/
```

Headers:

```text
Authorization: Bearer {{token}}
```

Expected result:

- status code 201
- second account created successfully
- save this account id in the Postman variable toAccount

#### Step 5: Get all accounts for the user

Method: GET

URL:

```text
{{baseUrl}}/api/accounts/
```

Headers:

```text
Authorization: Bearer {{token}}
```

Expected result:

- status code 200
- response contains an array of accounts belonging to this user

#### Step 6: Check account balance

Method: GET

URL:

```text
{{baseUrl}}/api/accounts/balance/{{fromAccount}}
```

Headers:

```text
Authorization: Bearer {{token}}
```

Expected result:

- status code 200
- balance returned as a number
- initially it should be 0 if no transactions have happened yet

#### Step 7: Transfer money between accounts

Method: POST

URL:

```text
{{baseUrl}}/api/transactions/
```

Headers:

```text
Authorization: Bearer {{token}}
Content-Type: application/json
```

Body:

```json
{
  "fromAccount": "{{fromAccount}}",
  "toAccount": "{{toAccount}}",
  "amount": 100,
  "idempotencyKey": "transfer-001"
}
```

Expected result:

- status code 201
- transaction completed successfully
- response contains the transaction details

Important note:

- The system uses idempotency keys, so reusing the same key should not create duplicate transfers.

#### Step 8: Test duplicate transfer safety

Repeat the same transfer request with the same idempotencyKey.

Expected result:

- the API should return a response indicating the transaction was already processed

#### Step 9: Check balance again

Method: GET

URL:

```text
{{baseUrl}}/api/accounts/balance/{{fromAccount}}
```

Expected result:

- status code 200
- the balance should decrease according to the transferred amount

#### Step 10: Logout

Method: POST

URL:

```text
{{baseUrl}}/api/auth/logout
```

Headers:

```text
Authorization: Bearer {{token}}
```

Expected result:

- status code 200
- message says user logged out successfully

### 29.6 Additional security tests

A professional tester should also verify negative scenarios.

#### Test invalid token

Call any protected endpoint without a valid token.

Expected result:

- status code 401 Unauthorized

#### Test wrong password

Use the wrong password during login.

Expected result:

- status code 401 Unauthorized

#### Test insufficient balance

Attempt a transfer with amount greater than the current balance.

Expected result:

- status code 400 Bad Request
- message should mention insufficient balance

#### Test missing fields

Send a transfer request without fromAccount, toAccount, amount, or idempotencyKey.

Expected result:

- status code 400 Bad Request

### 29.7 How to validate responses properly

Do not only check whether the request returns 200 or 201. Also verify:

- response body structure
- status codes
- proper error messages
- whether the database state changed correctly
- whether protected routes reject unauthenticated users

### 29.8 Recommended Postman habits for industry-standard testing

- use environment variables instead of hardcoding values
- organize requests into folders such as Auth, Accounts, Transactions
- name requests clearly
- save examples of successful and failed responses
- test both happy path and negative path
- verify both API response and database state

### 29.9 Suggested collection structure

A clean Postman collection can look like this:

- Auth
  - Register User
  - Login User
  - Logout User
- Accounts
  - Create Account
  - Get All Accounts
  - Get Account Balance
- Transactions
  - Transfer Funds
  - Duplicate Transfer Check

### 29.10 Important note about initial-funds testing

The route for initial funds is meant for a system user. In a real application, this kind of operation should be performed by a trusted internal service or admin process, not by a normal public user.

If you want to test that route, you will likely need a database record for a system user. In many real systems, this is seeded through a migration or admin script.

---

## 30. Final summary

This backend project is a mini ledger/banking system.

It works like this:

1. Users sign up or log in
2. They create accounts
3. They transfer money between accounts
4. The system records every movement in a ledger
5. The system calculates balances from ledger history
6. The system protects routes using authentication
7. The system sends emails for important events

If you understand this project well, you already understand many core concepts of backend development.

---

## 31. Simple mental model

If you want to remember this project easily, think of it like this:

- User = person using the app
- Account = a wallet or bank account
- Transaction = a money movement event
- Ledger = the history book of all money changes
- Middleware = security guard before access
- Controller = manager handling the request
- Model = blueprint of data

That is the whole idea behind this backend.
