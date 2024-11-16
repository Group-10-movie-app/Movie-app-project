import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState(''); // State to store the search query
    const [searchType, setSearchType] = useState('title'); // State to store the search type (title, genre, year)
    const [genres, setGenres] = useState([]); // State to store the list of genres

    // Fetch genres from the backend API when the component mounts
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/genres`);
                if (!response.ok) throw new Error('Failed to fetch genres');
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error.message);
            }
        };

        fetchGenres();
    }, []);

    // Handle form submission
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query, searchType);
    };

    return (
        <form onSubmit={handleSearch}>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">Title</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>

            {searchType === 'genre' ? (
                <select value={query} onChange={(e) => setQuery(e.target.value)}>
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name.toLowerCase()}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            )}

            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
