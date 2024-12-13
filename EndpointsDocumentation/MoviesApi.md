## Movies API Documentation

### Base URL
The base URL for API requests:
http://localhost:5000/api

and TMDB_API_KEY

### Get Genres
**GET** `/movies/genres`

**Description:** Retrieve a list of movie genres.

#### Response:
**Success (200):**
```json
[
  {
    "id": "number",
    "name": "string"
  }
]
```

**Error (500):**
```json
{
  "error": "Failed to fetch genres"
}
```

---

### Get Movies with Filters
**GET** `/movies`

**Description:** Fetch movies based on filters like title, genre, or year.

#### Query Parameters:
- `title` (optional): Filter movies by title.
- `genre` (optional): Filter movies by genre ID.
- `year` (optional): Filter movies by release year.

#### Response:
**Success (200):**
```json
[
  {
    "id": "number",
    "title": "string",
    "overview": "string",
    "release_date": "string",
    "poster_path": "string"
  }
]
```

**Error (500):**
```json
{
  "error": "Failed to fetch movies"
}
```

---

### Get Movie Details
**GET** `/movies/details/:id`

**Description:** Fetch detailed information about a specific movie, including cast details.

#### Path Parameters:
- `id` (required): The TMDB ID of the movie.

#### Response:
**Success (200):**
```json
{
  "movie": {
    "id": "number",
    "title": "string",
    "overview": "string",
    "release_date": "string",
    "genres": [
      {
        "id": "number",
        "name": "string"
      }
    ],
    "poster_path": "string"
  },
  "cast": [
    {
      "id": "number",
      "name": "string",
      "character": "string",
      "profile_path": "string"
    }
  ]
}
```

**Error (500):**
```json
{
  "error": "Failed to fetch movie details"
}
```

