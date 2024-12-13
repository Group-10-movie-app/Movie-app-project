## Reviews API Documentation

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

### Add a Review
**POST** `/reviews/add`

**Description:** Add a review for a movie.

#### Request Body:
```json
{
  "tmdb_id": "number",
  "movie_title": "string",
  "review_text": "string",
  "rating": "number"
}
```

#### Response:
**Success (201):**
```json
{
  "review": {
    "review_id": "number",
    "user_id": "number",
    "tmdb_id": "number",
    "movie_title": "string",
    "review_text": "string",
    "rating": "number"
  }
}
```

**Error (400):**
```json
{
  "error": "Invalid input data"
}
```

---

### Update a Review
**PUT** `/reviews/:id`

**Description:** Update an existing review.

#### Request Body:
```json
{
  "review_text": "string",
  "rating": "number"
}
```

#### Response:
**Success (200):**
```json
{
  "review": {
    "review_id": "number",
    "user_id": "number",
    "tmdb_id": "number",
    "review_text": "string",
    "rating": "number"
  }
}
```

**Error (404):**
```json
{
  "message": "Review not found or you do not have permission to update this review."
}
```

---

### Delete a Review
**DELETE** `/reviews/:id`

**Description:** Delete an existing review.

#### Response:
**Success (200):**
```json
{
  "message": "Review deleted successfully"
}
```

**Error (404):**
```json
{
  "message": "Review not found or you do not have permission to delete this review."
}
```

---

### Get All Reviews
**GET** `/reviews/all`

**Description:** Fetch all reviews from the database.

#### Response:
**Success (200):**
```json
{
  "reviews": [
    {
      "review_id": "number",
      "tmdb_id": "number",
      "review_text": "string",
      "rating": "number",
      "movie_title": "string",
      "created_at": "string"
    }
  ]
}
```

**Error (500):**
```json
{
  "error": "Failed to fetch reviews."
}
```

---

### Get Reviews for a Movie
**GET** `/reviews/:id`

**Description:** Fetch reviews for a specific movie.

#### Response:
**Success (200):**
```json
{
  "reviews": [
    {
      "review_id": "number",
      "review_text": "string",
      "rating": "number",
      "created_at": "string"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "No reviews found for this movie."
}
```

---

### Get Reviews by a Specific User
**GET** `/reviews/`

**Description:** Fetch all reviews made by the authenticated user.

#### Response:
**Success (200):**
```json
{
  "reviews": [
    {
      "review_id": "number",
      "tmdb_id": "number",
      "review_text": "string",
      "rating": "number",
      "created_at": "string"
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