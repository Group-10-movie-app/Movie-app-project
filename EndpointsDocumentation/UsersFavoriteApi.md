## Favorites API 

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

### Add to Favorites
**POST** `/favorites/add`

**Description:** Add a movie to the user's favorites list.

#### Request Body:
```json
{
  "tmdb_id": "number"
}
```

#### Response:
**Success (201):**
```json
{
  "message": "Movie added to favorites",
  "favorite": {
    "user_id": "number",
    "tmdb_id": "number",
    "title": "string",
    "poster_url": "string"
  }
}
```

**Error (400):**
```json
{
  "error": "TMDB ID is required"
}
```

---

### Remove from Favorites
**DELETE** `/favorites/remove`

**Description:** Remove a movie from the user's favorites list.

#### Request Body:
```json
{
  "tmdb_id": "number"
}
```

#### Response:
**Success (200):**
```json
{
  "message": "Movie removed from favorites"
}
```

**Error (404):**
```json
{
  "error": "Movie not found in favorites"
}
```

---

### Get Favorites
**GET** `/favorites`

**Description:** Retrieve all favorite movies for the authenticated user.

#### Response:
**Success (200):**
```json
{
  "favorites": [
    {
      "tmdb_id": "number",
      "title": "string",
      "poster_url": "string"
    }
  ]
}
```

**Error (401):**
```json
{
  "error": "Unauthorized"
}
```

---

### Get Public Favorites
**GET** `/favorites/public/:username`

**Description:** Retrieve public favorites for a specific username.

#### Path Parameters:
- `username` (required): The username of the user whose public favorites you want to view.

#### Response:
**Success (200):**
```json
{
  "user": {
    "first_name": "string",
    "last_name": "string",
    "username": "string"
  },
  "favorites": [
    {
      "tmdb_id": "number",
      "title": "string",
      "poster_url": "string"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

**Error (403):**
```json
{
  "error": "User's favorites are not public"
}
```

---
