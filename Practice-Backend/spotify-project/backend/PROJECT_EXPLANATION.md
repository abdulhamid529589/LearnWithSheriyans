# Spotify-like Backend Project Explained

This document explains the backend of the project in detail, for beginners. It covers architecture, routes, middleware, models, controllers, services, environment setup, request flows, and Postman testing.

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Architecture and File Layout](#2-architecture-and-file-layout)
- [3. Startup Flow](#3-startup-flow)
  - [3.1 `server.js`](#31-serverjs)
  - [3.2 `src/db/db.js`](#32-srcdbdbjs)
- [4. Express Application Setup](#4-express-application-setup)
  - [4.1 `src/app.js`](#41-srcappjs)
- [5. Models and Data Structure](#5-models-and-data-structure)
  - [5.1 `src/models/user.model.js`](#51-srcmodelsusermodeljs)
  - [5.2 `src/models/music.model.js`](#52-srcmodelsmusicmodeljs)
  - [5.3 `src/models/album.model.js`](#53-srcmodelsalbummodeljs)
- [6. Authentication and Authorization](#6-authentication-and-authorization)
  - [6.1 `src/controllers/auth.controller.js`](#61-srccontrollersauthcontrollerjs)
  - [6.2 `src/middlewares/auth.middleware.js`](#62-srcmiddlewaresauthmiddlewarejs)
- [7. Music and Album Routes](#7-music-and-album-routes)
- [8. Controllers and Business Logic](#8-controllers-and-business-logic)
- [9. File Upload Service](#9-file-upload-service)
- [10. Request Flow Examples](#10-request-flow-examples)
- [11. Environment Variables](#11-environment-variables)
- [12. Running the Backend](#12-running-the-backend)
- [13. Testing Guide with Postman](#13-testing-guide-with-postman)
- [14. Important Notes for Beginners](#14-important-notes-for-beginners)
- [15. Potential Improvements](#15-potential-improvements)
- [16. Summary of Each File](#16-summary-of-each-file)

---

## 1. Project Overview

The backend is a Node.js/Express application that provides a simple music platform with authentication, file upload, music listing, and album management.

Key features:

- User registration and login
- JWT authentication via cookies
- Role-based access control: `user` and `artist`
- Music upload through `ImageKit`
- Album creation with a list of music IDs
- Fetch all music and album details

The backend code lives under `backend/`.

---

## 2. Architecture and File Layout

The project is structured with separation of concerns:

- `server.js` - application entry point
- `src/app.js` - configures Express, middleware, and routes
- `src/db/db.js` - connects to MongoDB
- `src/routes/*.js` - HTTP API route definitions
- `src/controllers/*.js` - request handlers and business logic
- `src/models/*.js` - Mongoose schemas and database models
- `src/middlewares/auth.middleware.js` - authentication and authorization checks
- `src/services/storage.service.js` - external file upload service

There is also a `.env.example` file defining required environment variables.

---

## 3. Startup Flow

### 3.1 `server.js`

This is the initial file executed by Node.

```js
require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

What happens:

1. `dotenv` loads environment variables from `.env` into `process.env`.
2. `connectDB()` establishes a MongoDB connection.
3. The Express app starts listening on port `3000`.

### 3.2 `src/db/db.js`

This file uses Mongoose to connect to the MongoDB server.

```js
const mongoose = require('mongoose')

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

module.exports = connectDB
```

Important environment variables:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret used to sign JSON Web Tokens
- `IMAGEKIT_PRIVATE_KEY` - private key for ImageKit uploads

---

## 4. Express Application Setup

### 4.1 `src/app.js`

This file configures Express and connects routers.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)

module.exports = app
```

What it does:

- Enables parsing JSON request bodies with `express.json()`.
- Enables cookie parsing so the app can read JWT tokens from cookies.
- Mounts authentication routes under `/api/auth`.
- Mounts music routes under `/api/music`.

---

## 5. Models and Data Structure

This app uses Mongoose models to define how data is stored in MongoDB.

### 5.1 `src/models/user.model.js`

This model stores application users.

Fields:

- `username` - string, required, unique
- `email` - string, required, unique
- `password` - string, required (stored as a hash)
- `role` - string, either `user` or `artist`

A user may be a regular listener (`user`) or a music uploader (`artist`).

### 5.2 `src/models/music.model.js`

This model stores uploaded music tracks.

Fields:

- `uri` - string URL where the uploaded file is stored
- `title` - music title
- `artist` - reference to a `user` document

The `artist` field is a MongoDB ObjectId that points to the user who uploaded it.

### 5.3 `src/models/album.model.js`

This model stores albums.

Fields:

- `title` - album title
- `musics` - array of ObjectIds referencing `music` documents
- `artist` - reference to a `user` document

An album is owned by an artist and can contain multiple music track references.

---

## 6. Authentication and Authorization

### 6.1 `src/controllers/auth.controller.js`

Responsible for user registration, login, and logout.

#### Register flow

1. Read `username`, `email`, `password`, and optional `role` from request body.
2. Check if a user already exists with the same username or email.
3. Hash the password using `bcrypt.hash(password, 10)`.
4. Create a new user in MongoDB.
5. Create a JWT token with `id` and `role`.
6. Send the token back as a cookie and return user data.

#### Login flow

1. Read `username`, `email`, and `password` from request body.
2. Find a user where either `username` or `email` matches.
3. Compare the password with the stored hash using `bcrypt.compare`.
4. If valid, sign a JWT and set it in a cookie.
5. Return login success and user info.

#### Logout flow

- Clears the `token` cookie.
- Returns a success message.

### 6.2 `src/middlewares/auth.middleware.js`

This file contains middleware for protecting routes.

#### `authArtist`

- Reads `token` from cookies.
- Verifies the JWT with `JWT_SECRET`.
- If the token is missing or invalid, returns `401 Unauthorized`.
- If the decoded user role is not `artist`, returns `403 Forbidden`.
- Attaches `decoded` user info to `req.user` and calls `next()`.

#### `authUser`

- Similar to `authArtist`, but checks the role is `user`.
- Only regular users can access these routes.

This means:

- `artist` routes require the user to be an artist.
- `user` routes require the user to be a normal listener.

---

## 7. Music and Album Routes

### 7.1 `src/routes/auth.routes.js`

Defines authentication endpoints:

- `POST /api/auth/register` -> register a new user
- `POST /api/auth/login` -> login existing user
- `POST /api/auth/logout` -> logout user

### 7.2 `src/routes/music.routes.js`

Defines music-related endpoints:

- `POST /api/music/upload`
  - Requires `authArtist` middleware.
  - Accepts one file field named `music`.
  - Calls `musicController.createMusic`.
- `POST /api/music/album`
  - Requires `authArtist` middleware.
  - Creates an album.
- `GET /api/music/`
  - Requires `authUser` middleware.
  - Returns a list of music tracks.
- `GET /api/music/albums`
  - Requires `authUser` middleware.
  - Returns album summaries.
- `GET /api/music/albums/:albumId`
  - Requires `authUser` middleware.
  - Returns one album with its tracks populated.

The upload route uses `multer` with `memoryStorage()`, so the file is kept in RAM and then handled by the upload service.

---

## 8. Controllers and Business Logic

### 8.1 `src/controllers/music.controller.js`

This controller handles music and album operations.

#### `createMusic(req, res)`

1. Reads `title` from `req.body`.
2. Reads uploaded file from `req.file`.
3. Converts the file buffer to Base64 and uploads via `uploadFile()`.
4. Stores the returned `result.url` as `uri` in the `music` document.
5. Sets `artist` to `req.user.id` from JWT.
6. Returns the created music data.

#### `createAlbum(req, res)`

1. Reads `title` and `musics` from the body.
2. Creates an album document with the artist from `req.user.id`.
3. Returns created album info.

#### `getAllMusics(req, res)`

1. Fetches music tracks from the database.
2. Uses `.skip(1).limit(5)` to return up to 5 music records, skipping the first one.
3. Uses `.populate('artist', 'username email')` to include artist details.
4. Returns the music list.

> Note: The `.skip(1)` call means the first music record is intentionally skipped. This is unusual for a listing endpoint and may be a bug or design choice.

#### `getAllAlbums(req, res)`

1. Fetches all albums.
2. Uses `.select('title artist')` to only return title and artist.
3. Populates the artist fields.

#### `getAlbumById(req, res)`

1. Reads `albumId` from route params.
2. Finds the album by ID.
3. Populates `artist` and `musics` references.
4. Returns full album details.

---

## 9. File Upload Service

### 9.1 `src/services/storage.service.js`

This service uploads files to ImageKit.

```js
const { ImageKit } = require('@imagekit/nodejs')

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: 'music_' + Date.now(),
    folder: 'backendwithsheriyans/music',
  })
  return result
}

module.exports = { uploadFile }
```

How it works:

- The controller converts the uploaded file buffer to Base64.
- It passes the Base64 string to ImageKit.
- ImageKit stores the file and returns a URL.
- The backend saves that URL in the `music` model.

This means the backend does not store the music file itself, only the link.

---

## 10. Request Flow Examples

### 10.1 Register a user

Request:

- `POST /api/auth/register`
- Body: `{ "username": "john", "email": "john@test.com", "password": "123456", "role": "artist" }`

Flow:

1. `authController.registerUser` checks duplicates.
2. Hashes password.
3. Saves user in MongoDB.
4. Sends a JWT token cookie.
5. Returns success and user info.

### 10.2 Login

Request:

- `POST /api/auth/login`
- Body: `{ "email": "john@test.com", "password": "123456" }`

Flow:

1. Finds user by username or email.
2. Verifies password.
3. Creates JWT.
4. Sets `token` cookie.
5. Returns user info.

### 10.3 Upload music as artist

Request:

- `POST /api/music/upload`
- Cookie: `token` from login
- Form data: `music` file and `title`

Flow:

1. `authArtist` verifies JWT and role.
2. `multer` parses the file into `req.file`.
3. `createMusic` uploads file to ImageKit.
4. Stores music record in database.
5. Returns created music metadata.

### 10.4 Create an album as artist

Request:

- `POST /api/music/album`
- Cookie: `token` from login
- Body: `{ "title": "First Album", "musics": ["<musicId1>", "<musicId2>"] }`

Flow:

1. `authArtist` checks permissions.
2. The album is created with the given music IDs.
3. Returns album info.

### 10.5 Fetch available music as user

Request:

- `GET /api/music/`
- Cookie: `token` for a `user`

Flow:

1. `authUser` verifies JWT and role.
2. Fetches music list and populates artist details.
3. Returns the list.

### 10.6 Fetch albums as user

Request:

- `GET /api/music/albums`
- Cookie: `token` for a `user`

Flow:

1. `authUser` verifies JWT and role.
2. Returns album summaries with artist info.

### 10.7 Fetch album details

Request:

- `GET /api/music/albums/:albumId`
- Cookie: `token` for a `user`

Flow:

1. `authUser` verifies JWT and role.
2. Finds the album by ID.
3. Populates artist and music references.
4. Returns the album and track list.

---

## 11. Environment Variables

The `.env.example` file shows what is required:

```txt
MONGO_URI= YOUR VALUE
JWT_SECRET= YOUR VALUE
IMAGEKIT_PRIVATE_KEY=  YOUR VALUE
```

You must provide real values in a `.env` file at the root of `backend/` before running the app.

---

## 12. Running the Backend

From the `backend/` folder:

- Install dependencies:
  ```bash
  npm install
  ```
- Start in development mode:
  ```bash
  npm run dev
  ```
- Start normally:
  ```bash
  npm start
  ```

The server listens on `http://localhost:3000`.

---

## 13. Testing Guide with Postman

This section explains how to test the backend API in Postman using industry-standard practices.

### 13.1 Setup Postman

1. Open Postman.
2. Create a new collection named `Spotify Backend` or similar.
3. Create a new environment named `Local`.
4. Add an environment variable:
   - `baseUrl` = `http://localhost:3000`
5. Enable `Send cookies automatically` in Postman settings so the `token` cookie is stored and sent on subsequent requests.
6. Add authorization and headers only when needed; most requests use cookies, not Bearer tokens.

### 13.2 Run the Auth Flow

#### 13.2.1 Register a new user or artist

Request:

- Method: `POST`
- URL: `{{baseUrl}}/api/auth/register`
- Body: `raw` JSON

Example body for an artist:

```json
{
  "username": "artist1",
  "email": "artist1@example.com",
  "password": "Password123",
  "role": "artist"
}
```

Example body for a regular user:

```json
{
  "username": "listener1",
  "email": "listener1@example.com",
  "password": "Password123",
  "role": "user"
}
```

Expected behavior:

- Response status `201`
- JSON message `User registered successfully`
- Response contains `id`, `username`, `email`, and `role`
- Postman stores the `token` cookie in the Cookie Jar

#### 13.2.2 Login

Request:

- Method: `POST`
- URL: `{{baseUrl}}/api/auth/login`
- Body: `raw` JSON

Example body:

```json
{
  "email": "artist1@example.com",
  "password": "Password123"
}
```

Expected behavior:

- Response status `200`
- JSON message `User logged in successfully`
- Response contains user info
- `token` cookie is set by the server

#### 13.2.3 Logout

Request:

- Method: `POST`
- URL: `{{baseUrl}}/api/auth/logout`

Expected behavior:

- Response status `200`
- JSON message `User logged out successfully`
- Cookie named `token` should be cleared in the browser

### 13.3 Run Artist Actions

These actions require an account with `role: artist`.

#### 13.3.1 Upload music

Request:

- Method: `POST`
- URL: `{{baseUrl}}/api/music/upload`
- Body: `form-data`
- Add fields:
  - `title` = `My Song`
  - `music` = choose a file from disk (type `File`)

Expected behavior:

- Response status `201`
- JSON message `Music created successfully`
- Response returns the created music object with `uri`, `title`, and `artist`

Notes:

- `multipart/form-data` is required because the backend expects a file upload.
- Postman will send the file as `req.file` to the backend.
- The backend converts the file into Base64 and uploads it to ImageKit.

#### 13.3.2 Create an album

Request:

- Method: `POST`
- URL: `{{baseUrl}}/api/music/album`
- Body: `raw` JSON

Example body:

```json
{
  "title": "My First Album",
  "musics": ["<musicId1>", "<musicId2>"]
}
```

Expected behavior:

- Response status `201`
- JSON message `Album created successfully`
- Response returns album object with `id`, `title`, `artist`, and `musics`

How to use it:

- Copy the `id` values from previously created music items.
- Add them to the `musics` array.

### 13.4 Run User Actions

These actions require an account with `role: user`.

#### 13.4.1 Fetch all music

Request:

- Method: `GET`
- URL: `{{baseUrl}}/api/music/`

Expected behavior:

- Response status `200`
- JSON message `Musics fetched successfully`
- Response contains an array of music records
- Each record includes populated `artist` details

#### 13.4.2 Fetch all albums

Request:

- Method: `GET`
- URL: `{{baseUrl}}/api/music/albums`

Expected behavior:

- Response status `200`
- JSON message `Albums fetched successfully`
- Response contains an array of albums with `title` and `artist`

#### 13.4.3 Fetch album details by ID

Request:

- Method: `GET`
- URL: `{{baseUrl}}/api/music/albums/<albumId>`

Expected behavior:

- Response status `200`
- JSON message `Album fetched successfully`
- Response includes populated `artist` and `musics`

### 13.5 Common Errors and Validation

When testing, the most common problems are:

- Missing or invalid cookies:
  - If the token cookie is not sent, the server returns `401 Unauthorized`.
- Incorrect role permissions:
  - Artists cannot access `user` routes if the role check is strict.
  - Users cannot access `/api/music/upload` or `/api/music/album`.
- Invalid request body:
  - `POST /api/auth/register` and `POST /api/auth/login` expect JSON.
  - `POST /api/music/upload` expects `multipart/form-data`.
- Server errors from ImageKit:
  - If the ImageKit private key is missing or invalid, upload will fail.

Industry standard testing tips:

- Save each request in the Postman collection.
- Group requests by feature: Authentication, Artist, User.
- Use environment variables like `{{baseUrl}}` so you can change the server address easily.
- Use descriptive request names.
- Validate both success and failure cases:
  - Valid login
  - Invalid login
  - Unauthorized access to protected routes
  - Missing required body fields
- Inspect the `Cookies` tab in Postman for the `token` cookie.
- Inspect response `status` and `body` carefully.

### 13.6 Recommended Postman Workflow

1. Start by registering or logging in as an artist.
2. Upload one or more music files.
3. Create an album using music IDs.
4. Register or log in as a user.
5. Fetch the music list and albums.
6. Test unauthorized routes by switching roles.

---

## 14. Important Notes for Beginners

### Roles matter

- `artist` can upload music and create albums.
- `user` can only view music and albums.

### Cookies and JWTs

- Authentication is stored in a cookie called `token`.
- The backend reads this cookie to know who is making the request.
- The token contains the user ID and role.

### File uploads

- The actual music file is not stored in MongoDB.
- The file is uploaded to ImageKit and the returned URL is saved.

### MongoDB references

- `music.artist` references a user document.
- `album.artist` references a user document.
- `album.musics` is an array of music document IDs.

---

## 15. Potential Improvements

These are not required for the explanation, but a senior engineer would note them as next steps:

- Add validation on request bodies.
- Fix `.skip(1)` in `getAllMusics` if it is not intended.
- Add proper error handling in controllers.
- Add route protection for `artist` and `user` roles more flexibly.
- Add API documentation and tests.
- Add support for `artist` and `user` roles within the same route if desired.

---

## 16. Summary of Each File

- `backend/server.js` - app startup and DB connection.
- `backend/src/app.js` - Express application configuration.
- `backend/src/db/db.js` - connects to MongoDB.
- `backend/src/routes/auth.routes.js` - register/login/logout endpoints.
- `backend/src/routes/music.routes.js` - music and album endpoints.
- `backend/src/controllers/auth.controller.js` - auth logic and JWT creation.
- `backend/src/controllers/music.controller.js` - music and album business logic.
- `backend/src/middlewares/auth.middleware.js` - JWT verification and role checks.
- `backend/src/models/user.model.js` - user schema.
- `backend/src/models/music.model.js` - music schema.
- `backend/src/models/album.model.js` - album schema.
- `backend/src/services/storage.service.js` - uploads files to ImageKit.

---

This file is meant to help you understand how the backend works end-to-end, even if you are new to backend development. If you want, I can also walk through one API request step-by-step with exact example values.
