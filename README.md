# Express.js Learning Progress

This repository tracks my learning journey with Express.js. I will use this README to check off the topics I've covered and make notes of my progress.

## Basics

- [X] What is Express.js?
- [ ] Setting up an Express Application
  - [X] Installing Express
  - [ ] Creating a Basic Server
  - [ ] Hello World Example
- [ ] Routing
  - [ ] Handling GET Requests
  - [ ] Handling POST Requests
- [ ] Middleware
  - [ ] Introduction to Middleware
  - [ ] Built-in Middleware
  - [ ] Custom Middleware
- [ ] Route Parameters
- [ ] Handling Errors
- [ ] Static Files and Assets
- [ ] Template Engines
- [ ] Working with Forms
- [ ] Cookies and Sessions
- [ ] File Uploads
- [ ] RESTful APIs

## Intermediate

- [ ] Express Router
- [ ] Handling PUT and DELETE Requests
- [ ] Request and Response Objects
- [ ] Middleware Execution Order
- [ ] Error Handling Middleware
- [ ] Authentication and Authorization
- [ ] JSON Web Tokens (JWT)
- [ ] Working with Databases
- [ ] Connecting to MongoDB
- [ ] Mongoose ODM
- [ ] Validating User Input
- [ ] Passport.js for Authentication

## Advanced

- [ ] Unit Testing with Express
- [ ] Integration Testing
- [ ] WebSockets with Express
- [ ] Real-Time Applications
- [ ] Microservices with Express
- [ ] Performance Optimization
- [ ] Production Deployment
- [ ] Security Best Practices
- [ ] API Documentation (Swagger, etc.)
- [ ] Serverless with Express.js
- [ ] GraphQL with Express

## Additional Topics

- [ ] Express Middleware Libraries
- [ ] Express Generators
- [ ] Advanced Routing Techniques
- [ ] Express with Web Frameworks (e.g., Angular, React)
- [ ] Building RESTful APIs Best Practices
- [ ] Scaling Express Applications

## Projects

- [ ] Mini Project 1
- [ ] Mini Project 2
- [ ] Final Project

## Resources

- [ ] Express.js Documentation
- [ ] Online Tutorials
- [ ] Books
- [ ] Courses
- [ ] Forums and Communities

## Notes

- [ ] Notes on Basics
- [ ] Notes on Intermediate Topics
- [ ] Notes on Advanced Topics

## Conclusion

This checklist will help me keep track of my learning progress with Express.js. I'll continue to update it as I explore more topics and work on projects.

Happy Learning!
---

# Express Middleware Types

This Node.js application demonstrates different types of middleware in Express.js, a popular web framework. Middleware plays a crucial role in processing incoming HTTP requests and can be used for various purposes like authentication, logging, error handling, and more.

## Table of Contents

- [Middleware Types](#middleware-types)
  - [Application-level Middleware](#application-level-middleware)
  - [Router-level Middleware](#router-level-middleware)
  - [3rd Party Middleware](#3rd-party-middleware)
  - [Built-in Middleware](#built-in-middleware)
  - [Error-handling Middleware](#error-handling-middleware)

### Application-level Middleware

Application-level middleware is executed for every request made to the application. In this example, we use `express.json()`, `express.urlencoded()`, and serve static files as application-level middleware.

#### Code Example

```javascript
// Express Setup
const express = require('express');
const app = express();

// JSON and URL-encoded form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/static', express.static(__dirname + '/public'));
```

### Router-level Middleware

Router-level middleware is used within specific routes. In this example, we apply `fakeAuth` middleware to the `/api/users` route to simulate user authentication.

#### Code Example

```javascript
// Router-level Middleware
const router = express.Router();

// Fake Authorization Middleware
const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log(`Auth status of user is ${authStatus}`);
        next();
    } else {
        res.status(401);
        throw new Error("User is not authorised");
    }
};

// Apply fakeAuth middleware to /api/users route
router.use(fakeAuth);
```

### 3rd Party Middleware

3rd party middleware includes external packages like `morgan` for logging. Here, we use `morgan('dev')` for request logging.

#### Code Example

```javascript
// 3rd Party Middleware (Morgan for logging)
const logger = require('morgan');
app.use(logger('dev'));
```

### Built-in Middleware

Built-in middleware is part of the Express.js framework and can be used directly. Examples include `express.json()` and `express.urlencoded()` for request body parsing.

### Error-handling Middleware

Error-handling middleware is used to handle errors and provide meaningful responses to clients. It is defined with four parameters (err, req, res, next). In this example, we define an error handler that handles 401, 404, and 500 errors.

#### Code Example

```javascript
// Error-handling Middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    
    const errorResponse = {
        title: "Server error",
        message: err.message
    };

    if (statusCode === 401) {
        errorResponse.title = "Unauthorised user";
    } else if (statusCode === 404) {
        errorResponse.title = "Not found";
    }

    res.json(errorResponse);
};

app.use(errorHandler);
```

## Running the Application

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server with `npm start`.

## API Endpoints

- `/api/users`
  - `GET /api/users` - Get all users (Requires authentication)
  - `POST /api/users` - Create a new user (Requires authentication)

## Testing the Error Handling

To test the error handling middleware, you can make API requests with various HTTP status codes (e.g., 401, 404, 500) to see how the error responses are handled.

---

This README.md provides an overview of the different types of middleware used in the Express.js application, along with code examples and usage instructions. Feel free to adapt and expand upon this documentation to suit your specific project's needs.
