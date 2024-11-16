const axios = require('axios');
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN;

// Utility Function to Fetch Data from TMDB API
async function fetchFromTMDB(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${tmdbAccessToken}`, // Authenticate with TMDB API
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error making TMDB API call: ${error.message}`);
        throw new Error('Failed to fetch data from TMDB');
    }
}

// GENRE CACHE :-

// In-memory cache for storing genre mappings
let genreMap = {};

// Function to Load Genres from TMDB API
async function loadGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;

    try {
        const data = await fetchFromTMDB(url);
        genreMap = data.genres.reduce((map, genre) => {
            map[genre.name.toLowerCase()] = genre.id; // Map genre name to ID
            return map;
        }, {});
        console.log('Loaded genres:', genreMap); // Debug log for loaded genres
    } catch (error) {
        console.error('Error loading genres:', error.message);
    }
}

// Load genres on server startup
loadGenres();


// Controller: Search Movies
exports.searchMovies = async (req, res) => {
    const { title, genre, year } = req.query; // Extract search parameters from query

    let url; // Construct the appropriate TMDB API URL based on search type

    // Handle search by genre
    if (genre) {
        const genreId = genreMap[genre.toLowerCase()]; // Convert genre name to genre ID
        if (!genreId) {
            return res.status(400).json({ message: `Invalid genre name: ${genre}` }); 
        }
        url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
    }
    // Handle search by year
    else if (year) {
        url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}`;
    }
    // Handle search by title
    else if (title) {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`;
    }
    // Handle invalid search query
    else {
        return res.status(400).json({ message: 'Invalid search query. Please provide title, genre, or year.' });
    }

    try {
        // Fetch data from TMDB
        const data = await fetchFromTMDB(url);
        let movies = data.results || []; // Fallback to an empty array if no results

        // Additional filtering for movies by year
        if (year) {
            movies = movies.filter(movie => movie.release_date && movie.release_date.startsWith(year));
        }

        // Handle case when no movies match the criteria
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for the given criteria' });
        }

        res.json(movies); // Send matching movies as JSON response
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
    }
};

// Controller: Fetch Genres
exports.getGenres = async (req, res) => {
    try {
        // Convert the genreMap object into an array of genres
        const genres = Object.keys(genreMap).map((key) => ({
            name: key,
            id: genreMap[key],
        }));

        res.json(genres); // Send the genre list as JSON
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        res.status(500).json({ message: 'Error fetching genres' });
    }
};
