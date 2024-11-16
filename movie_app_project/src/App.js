import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import MoviesDisplay from './components/MoviesDisplay';
import MovieDetails from './components/MovieDetails.jsx';

const App = () => {
const [movies, setMovies] = useState([]); // State to store the list of movies
    const [selectedMovie, setSelectedMovie] = useState(null); // State to store the selected movie
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [error, setError] = useState(''); // State to store error messages
    const [genres, setGenres] = useState({}); // State to store the list of genres
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

     // Fetch genres from the backend API when the component mounts
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/movies/genres`);
                if (!response.ok) throw new Error('Failed to fetch genres');
                const data = await response.json();
    
                // Create a map of genre ID to genre name
                const map = data.reduce((acc, genre) => {
                    acc[genre.id] = genre.name;
                    return acc;
                }, {});
    
                setGenres(map);
            } catch (error) {
                console.error('Error fetching genres:', error.message);
            }
        };
    
        fetchGenres();
    }, [backendUrl]);
    
    // Fetch movies based on the search query and type
    const fetchMovies = async (query, searchType) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${backendUrl}/api/movies/search?${searchType}=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
            
            const data = await response.json();
    
            // Map genre IDs to genre names
            const moviesWithGenres = data.map((movie) => ({
                ...movie,
                genre_names: movie.genre_ids.map((id) => genres[id] || 'Unknown'), // Map genre_ids to names
            }));
    
            setMovies(moviesWithGenres);
            setSelectedMovie(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };    

     // Handle movie selection
    const selectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    // Handle going back to the search results
    const goBackToSearch = () => {
        setSelectedMovie(null);
    };

    return (
        <div>
            <SearchForm onSearch={fetchMovies} />
            {selectedMovie ? (
                <MovieDetails movie={selectedMovie} goBack={goBackToSearch} />
            ) : (
                <MoviesDisplay movies={movies} loading={loading} error={error} onSelect={selectMovie} />
            )}
        </div>
    );
};

export default App;
