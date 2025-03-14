# Uber Backend API Documentation

## User Registration Endpoint

### POST /user/register

Register a new user in the system.

**URL**: `/user/register`

**Method**: `POST`

**Authentication required**: No

**Request Body**:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Data Constraints**:
- `firstname`: String, minimum 3 characters (required)
- `lastname`: String, minimum 3 characters (required)
- `email`: Valid email format (required)
- `password`: String, minimum 6 characters (required)

**Success Response**:
- **Code**: 201 Created
- **Content Example**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA1NjRhM2JiZjgxMjM0NTY3ODkwMTIiLCJpYXQiOjE3MTU2NzU4NzV9.aBcDeFgHiJkLmNoPqRsTuVwXyZ-1234567890",
  "user": {
    "_id": "660564a3bbf8123456789012",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Condition**: If validation fails (e.g., firstname too short, invalid email)
  - **Content Example**:
  ```json
  {
    "errors": [
      {
        "type": "field",
        "value": "jo",
        "msg": "First name must be at least 3 characters long",
        "path": "firstname",
        "location": "body"
      },
      {
        "type": "field",
        "value": "test",
        "msg": "Email must be a valid email",
        "path": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error during registration
  - **Content Example**:
  ```json
  {
    "message": "E11000 duplicate key error collection: uber.users index: email_1 dup key: { email: \"john.doe@example.com\" }"
  }
  ```

**Notes**:
- The password is hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- The password field is not included in the returned user object
