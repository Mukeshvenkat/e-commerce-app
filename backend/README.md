# Node Auth PostgreSQL App

This project is a simple Node.js application that implements user authentication using PostgreSQL as the database. It provides APIs for user registration and login.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-auth-postgres-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your PostgreSQL database connection details:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

5. Run the application:
   ```
   npm start
   ```

## Usage

You can use tools like Postman or curl to interact with the API endpoints.

## API Endpoints

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `201 Created` - User created successfully.
  - `400 Bad Request` - Invalid input.

### Login User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK` - Successful login with user details and token.
  - `401 Unauthorized` - Invalid credentials.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Sequelize (or pg)
- dotenv
- Swagger (for API documentation)

## License

This project is licensed under the MIT License.