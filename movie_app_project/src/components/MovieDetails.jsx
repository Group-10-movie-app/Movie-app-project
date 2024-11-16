import React, { useEffect, useState } from 'react';

// Component to display detailed information about a selected movie
const MovieDetails = ({ movie }) => {
    const [details, setDetails] = useState(null); 

    useEffect(() => {
         // Fetch movie details from the backend API
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/details/${movie.id}`);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error.message);
            }
        };

        fetchMovieDetails();
    }, [movie]);// Re-run effect when the movie prop changes

    if (!details) return <p>Loading details...</p>;

    return (
        <div>
            <h2>{details.title}</h2>
            <p><i>{details.tagline}</i></p>
            <p>{details.overview}</p>
            <p>Release Date: {details.release_date}</p>
            <p>Popularity: {details.popularity}</p>
            <p>Status: {details.status}</p>
            <p>Rating: {details.vote_average}/10 ({details.vote_count} votes)</p>
            <p>Runtime: {details.runtime} minutes</p>
            <p>Language: {details.original_language}</p>
            <p>Genres: {details.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Production Companies: {details.production_companies.map((company) => company.name).join(', ')}</p>
            {details.backdrop_path && (
                <img
                    src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                    alt={`${details.title} backdrop`}
                    style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }}
                />
            )}
        </div>
    );
};

export default MovieDetails;
