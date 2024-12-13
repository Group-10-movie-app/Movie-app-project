## Users API Documentation

### Base URL
The base URL for API requests:
http://localhost:5000/api

---

### **Authentication**
All secured endpoints require an `Authorization` header with a Bearer token:
```
Authorization: Bearer <token>
```
Replace `<token>` with the actual token obtained after successful login.


### User Signup
**POST** `/user/signup`

**Description:** Register a new user.

#### Request Body:
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "username": "string" // Optional
}
```

#### Response:
**Success (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "is_public": "boolean"
  },
  "token": "string"
}
```

**Error (400):**
```json
{
  "error": "All fields are required"
}
```

---

### User Login
**POST** `/user/login`

**Description:** Login a user to obtain an authentication token.

#### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Response:
**Success (200):**
```json
{
  "message": "Login successful",
  "user": {
    "user_id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "is_public": "boolean"
  },
  "token": "string"
}
```

**Error (400):**
```json
{
  "error": "Invalid credentials"
}
```

---

### User Logout
**POST** `/user/logout`

**Description:** Log out the authenticated user.

#### Response:
**Success (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Error (401):**
```json
{
  "error": "Authorization token is missing or invalid"
}
```

---

### Update Profile
**PATCH** `/user/update-profile`

**Description:** Update the user's profile information.

#### Request Body:
```json
{
  "first_name": "string",
  "last_name": "string",
  "is_public": "boolean" // Optional
}
```

#### Response:
**Success (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "is_public": "boolean"
  }
}
```

**Error (400):**
```json
{
  "message": "First name and last name are required."
}
```

---

### Delete User Account
**DELETE** `/user/delete`

**Description:** Deletes the authenticated user's account.

#### Response:
**Success (200):**
```json
{
  "message": "User with email <email> has been deleted"
}
```

**Error (404):**
```json
{
  "error": "No account found to delete"
}
```

---