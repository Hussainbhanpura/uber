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
- **Content**:
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Condition**: If validation fails (e.g., firstname too short, invalid email)
  - **Content**:
  ```json
  {
    "errors": [
      {
        "param": "firstname",
        "msg": "First name must be at least 3 characters long",
        "location": "body"
      }
    ]
  }
  ```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error during registration
  - **Content**:
  ```json
  {
    "message": "Error message details"
  }
  ```

**Notes**:
- The password is hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- The password field is not included in the returned user object
