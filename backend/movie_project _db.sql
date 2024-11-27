-- Users Table
CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   first_name VARCHAR NOT NULL,
   last_name VARCHAR NOT NULL,
   email VARCHAR UNIQUE NOT NULL,
   password VARCHAR NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Groups Table
CREATE TABLE groups (
   group_id SERIAL PRIMARY KEY,
   owner_id INTEGER REFERENCES users(user_id),
   group_name VARCHAR NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group_Users Table
CREATE TABLE group_users (
   group_id INTEGER REFERENCES groups(group_id),
   user_id INTEGER REFERENCES users(user_id),
   joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (group_id, user_id)
);

-- Movies Table
CREATE TABLE movies (
   movie_id SERIAL PRIMARY KEY,            -- Internal unique ID
   tmdb_id INT UNIQUE NOT NULL,            -- TMDB movie ID for reference
   title VARCHAR NOT NULL,                 -- Movie title
   description TEXT,                       -- Movie description
   release_date DATE,                      -- Release date
   genre VARCHAR,                          -- Genre(s)
   rating DECIMAL NOT NULL DEFAULT 0.0,    -- Average rating
   poster_url TEXT,                        -- URL for movie poster
   last_updated TIMESTAMP DEFAULT NOW(),   -- Last cache update
   created_at TIMESTAMP DEFAULT NOW()      -- When the movie was first cached
);

-- Favorites Table 
CREATE TABLE favorites (
   favorite_id SERIAL PRIMARY KEY,
   user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
   tmdb_id INT NOT NULL,                   -- Reference TMDB movie ID
   UNIQUE (user_id, tmdb_id)
);

-- Reviews Table
CREATE TABLE reviews (
   review_id SERIAL PRIMARY KEY,                -- Unique identifier for each review
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,-- Foreign key to the users table Cascade delete reviews if user is deleted
    tmdb_id INT NOT NULL,                        -- TMDB movie ID
    review_text TEXT NOT NULL,                   -- The actual review text
    rating NUMERIC(3, 1) NOT NULL,               -- Rating with one decimal place
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Review creation timestamp
    updated_at TIMESTAMP                         -- Timestamp for when the review is updated
);