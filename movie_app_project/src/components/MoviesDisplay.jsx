import React from 'react';

// Component to display a list of movies
const MoviesDisplay = ({ movies, loading, error, onSelect }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;// Show error message
    if (!movies.length) return <p>No movies found</p>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    onClick={() => onSelect(movie)}
                    style={{
                        cursor: 'pointer',
                        width: '200px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '10px',
                        textAlign: 'center',
                    }}
                >
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                            style={{ borderRadius: '8px', width: '100%', marginBottom: '10px' }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '300px', backgroundColor: '#ccc', borderRadius: '8px' }}>
                            No Image
                        </div>
                    )}
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{movie.title}</h3>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Genres:</strong> {movie.genre_names.length > 0 ? movie.genre_names.join(', ') : 'N/A'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MoviesDisplay;
