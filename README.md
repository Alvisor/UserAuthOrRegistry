# UserAuthRegistry Project
A Node.js, Express, and TypeScript project designed to provide user registration and login services, including Google OAuth2 authentication. This project follows SOLID principles and a Clean Architecture approach to separate concerns and ensure scalability.

Table of Contents
- Overview
- Project Structure
- Requirements
- Installation and Setup
- Environment Variables
- Running the Project
  - API Endpoints
  - Register
  - Login
  - Google OAuth2 Flow
- Possible Responses
- Key Imports and Dependencies
- Architecture Highlights
- Future Improvements
- License


## Overview 

This project provides a robust, maintainable user authentication service. Users can:

1. Register with email and password.
2. Login with email and password (JWT-based).
3. Sign in with Google using OAuth2 (via Passport or an equivalent library).

It follows best practices:

- SOLID principles: Single Responsibility, Open/Closed, etc.
- Clean Architecture: clear separation of concerns between domain, application, infrastructure, and interfaces.

## Project Structure

The project is structured as follows:

```
my-project/
├─ src/
│  ├─ domain/            # Domain entities and interfaces
│  │   └─ User.ts
│  │   └─ UserRepository.ts
│  ├─ application/       # Business logic and use cases
│  │   └─ AuthService.ts
│  ├─ infrastructure/    # External services, DB, Google, etc.
│  │   ├─ repositories/
│  │   │   └─ UserRepositoryImpl.ts
│  │   └─ google/
│  │       └─ PassportGoogleStrategy.ts
│  └─ interfaces/        # Controllers, routes, middlewares
│      ├─ controllers/
│      │   └─ AuthController.ts
│      ├─ routes/
│      │   └─ AuthRoutes.ts
│      └─ middlewares/
├─ tests/
│  └─ ... (unit & integration tests)
├─ .env
├─ package.json
├─ tsconfig.json
└─ README.md
```

- domain: Contains pure domain models (User.ts) and repository interfaces (UserRepository.ts).
- application: Encapsulates the core business logic, like AuthService.ts.
- infrastructure: Holds concrete implementations to connect with real-world systems (databases, Google OAuth).
- interfaces: Exposes the application via HTTP routes, controllers, and middlewares.

## Requirements

- Node.js +18.x
- npm or yarn
- TypeScript (installed globally or as a dev dependency)

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/Alvisor/UserAuthOrRegistry.git
cd UserAuthOrRegistry
```

2. Install dependencies

```bash
npm install
```

3. Initialize TypeScript

```bash
npx tsc --init
```


## Environment Variables

In the root directory, create a .env file (ensure it is NOT committed to version control). Include the following (adjust according to your environment):

```
PORT=3000
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

- PORT: The port number to run the application on.
- JWT_SECRET: The secret key used to sign and verify JWT tokens.
- GOOGLE_CLIENT_ID: The client ID for your Google OAuth2 application.
- GOOGLE_CLIENT_SECRET: The client secret for your Google OAuth2 application.

## Running the Project 


1. Build the project

```bash
npm run build
```

2. Start the server

```bash
npm start
```
The server will run on the port specified in your .env file (default is 3000).

3. Development mode 

```bash
npm run dev
```

## API Endpoints

All routes are prefixed with /api/auth by default (see AuthRoutes.ts).

### Register

- Endpoint: POST /api/auth/register

- Request body

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

- Response

```json
{
  "token": "your-jwt-token"
}
```

### Login

- Endpoint: POST /api/auth/login

- Request body

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

- Response

```json
{
  "token": "your-jwt-token"
}
```

### Google OAuth2 Flow

1. Endpoint: GET /api/auth/google
    - Redirects the user to Google for consent (Google login page).

2. Endpoint: GET /api/auth/google/callback
    - Handles the callback from Google after the user grants consent.
    - Exchanges the authorization code for an access token.
    - Saves the access token to the user's session.
    - Redirects the user to the home page.

## Key Imports and Dependencies

- express: HTTP server and routing.
- bcrypt: Password hashing.
- jsonwebtoken: JWT creation and validation.
- passport & passport-google-oauth20: For Google OAuth2 flow.
- dotenv: Loads environment variables from .env.
- typescript (dev dependency): Type checking.
- @types/* (dev dependencies): Type definitions for Node.js, Express, etc.


## Architecture Highlights

1.  SOLID Principles 
    - Single Responsibility: Each class (Service, Controller, Repository) has one clear purpose.
    - Open/Closed: Easily extend new authentication methods without modifying existing code significantly.
    - Liskov Substitution: Different UserRepository implementations should behave identically from the app’s perspective.
    - Interface Segregation: UserRepository focuses on just the user-related database operations.
    - Dependency Inversion: AuthService depends on the UserRepository interface, not a concrete implementation.

2. Clean Architecture

    - Domain: Contains pure business models/logic.
    - Application: Houses use-case logic (e.g., AuthService).
    - Infrastructure: External integrations, DB, OAuth, etc.
    - Interfaces: Controllers, routes, and HTTP input/output.


## Future Improvements

- Database Integration: Implement a real database (MongoDB, PostgreSQL, etc.) in UserRepositoryImpl.
- Advanced Validation: Add request body validation via tools like class-validator or Joi.
- Error Handling Middleware: Centralize error handling for clearer code.
- Testing: Add unit and integration tests with frameworks like Jest or Mocha.
- CI/CD: Configure continuous integration for automated testing and deployments.

## License

This project is licensed under the MIT License. See the LICENSE file for details.