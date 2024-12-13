## Groups API Documentation

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


### Create a Group
**POST** `/groups/create`

**Description:** Create a new group.

#### Request Body:
```json
{
  "name": "string",
  "description": "string",
  "is_public": "boolean" // Optional, defaults to true
}
```

#### Response:
**Success (201):**
```json
{
  "message": "Group created successfully",
  "group": {
    "id": "number",
    "name": "string",
    "description": "string",
    "is_public": "boolean",
    "created_at": "string"
  }
}
```

**Error (400):**
```json
{
  "error": "Group name is required"
}
```

---

### Get All Groups
**GET** `/groups/`

**Description:** Fetch all groups.

#### Response:
**Success (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "is_public": "boolean",
    "created_at": "string"
  }
]
```

**Error (500):**
```json
{
  "error": "Failed to fetch groups"
}
```

---

### Get Group Details
**GET** `/groups/:id`

**Description:** Fetch details of a specific group.

#### Path Parameters:
- `id` (required): The ID of the group.

#### Response:
**Success (200):**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "is_public": "boolean",
  "members": [
    {
      "user_id": "number",
      "username": "string",
      "joined_at": "string"
    }
  ],
  "created_at": "string"
}
```

**Error (404):**
```json
{
  "error": "Group not found"
}
```

---

### Delete a Group
**DELETE** `/groups/:id`

**Description:** Delete a group by its ID.

#### Path Parameters:
- `id` (required): The ID of the group.

#### Response:
**Success (200):**
```json
{
  "message": "Group deleted successfully"
}
```

**Error (404):**
```json
{
  "error": "Group not found"
}
```

---

### Request to Join a Group
**POST** `/groups/:id/join`

**Description:** Send a request to join a group.

#### Path Parameters:
- `id` (required): The ID of the group.

#### Response:
**Success (200):**
```json
{
  "message": "Join request sent successfully"
}
```

**Error (404):**
```json
{
  "error": "Group not found"
}
```

---

### Handle Join Request
**POST** `/groups/requests/:request_id`

**Description:** Accept or reject a join request for a group.

#### Request Body:
```json
{
  "action": "accept" // or "reject"
}
```

#### Response:
**Success (200):**
```json
{
  "message": "Request handled successfully"
}
```

**Error (404):**
```json
{
  "error": "Request not found"
}
```

---

### Remove a Member from Group
**DELETE** `/groups/:group_id/members/:user_id`

**Description:** Remove a member from a group.

#### Path Parameters:
- `group_id` (required): The ID of the group.
- `user_id` (required): The ID of the user to be removed.

#### Response:
**Success (200):**
```json
{
  "message": "Member removed successfully"
}
```

**Error (404):**
```json
{
  "error": "Member not found in group"
}
```

---

### Leave a Group
**DELETE** `/groups/:id/leave`

**Description:** Leave a group.

#### Path Parameters:
- `id` (required): The ID of the group.

#### Response:
**Success (200):**
```json
{
  "message": "You have left the group"
}
```

**Error (404):**
```json
{
  "error": "You are not a member of this group"
}
```

---

### Fetch Pending Join Requests
**GET** `/groups/:id/requests`

**Description:** Fetch pending join requests for a group.

#### Response:
**Success (200):**
```json
{
  "requests": [
    {
      "request_id": "number",
      "user_id": "number",
      "username": "string",
      "requested_at": "string"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "Group not found or no pending requests"
}
```

---

### Add a Movie to Group
**POST** `/groups/:group_id/movies`

**Description:** Add a movie to the group's movie list.

#### Request Body:
```json
{
  "tmdb_id": "number",
  "title": "string",
  "poster_url": "string"
}
```

#### Response:
**Success (201):**
```json
{
  "message": "Movie added to group successfully",
  "movie": {
    "tmdb_id": "number",
    "title": "string",
    "poster_url": "string"
  }
}
```

**Error (400):**
```json
{
  "error": "Movie data is incomplete"
}
```

---

### Fetch Group's Movies
**GET** `/groups/:id/movies`

**Description:** Fetch movies associated with a group.

#### Response:
**Success (200):**
```json
{
  "movies": [
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
  "error": "Group not found"
}
```

---

### Remove a Movie from Group
**DELETE** `/groups/:group_id/movies/:movie_id`

**Description:** Remove a movie from the group's movie list.

#### Path Parameters:
- `group_id` (required): The ID of the group.
- `movie_id` (required): The TMDB ID of the movie to be removed.

#### Response:
**Success (200):**
```json
{
  "message": "Movie removed from group successfully"
}
```

**Error (404):**
```json
{
  "error": "Movie not found in group"
}
```

---

### Add a Showtime to Group
**POST** `/groups/:group_id/showtimes`

**Description:** Add a showtime to the group.

#### Request Body:
```json
{
  "date": "string",
  "time": "string",
  "movie_id": "number"
}
```

#### Response:
**Success (201):**
```json
{
  "message": "Showtime added to group successfully",
  "showtime": {
    "id": "number",
    "date": "string",
    "time": "string",
    "movie_id": "number"
  }
}
```

**Error (400):**
```json
{
  "error": "Invalid showtime data"
}
```

---

### Fetch Group's Showtimes
**GET** `/groups/:id/showtimes`

**Description:** Fetch all showtimes for a group.

#### Response:
**Success (200):**
```json
{
  "showtimes": [
    {
      "id": "number",
      "date": "string",
      "time": "string",
      "movie_id": "number"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "Group not found"
}
```

---

### Remove a Showtime from Group
**DELETE** `/groups/:group_id/showtimes/:showtime_id`

**Description:** Remove a showtime from the group.

#### Path Parameters:
- `group_id` (required): The ID of the group.
- `showtime_id` (required): The ID of the showtime to be removed.

#### Response:
**Success (200):**
```json
{
  "message": "Showtime removed from group successfully"
}
```

**Error (404):**
```json
{
  "error": "Showtime not found in group"
}
```

