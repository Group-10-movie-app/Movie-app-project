import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api/movieApi";
import "./Header.css";

// basic search logic 
export default function Header() {
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        genre: "",
        year: "",
    });

    const navigate = useNavigate();

    // Fetch genres on mount
    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genresData = await fetchGenres();
                setGenres(genresData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenreData();
    }, []);

    // Handle input changes
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?title=${filters.title}&genre=${filters.genre}&year=${filters.year}`);
    };

    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <div className="container-fluid">
                {/* App Name */}
                <Link to="/" className="navbar-brand fw-bold fs-3">
                    Moviq
                </Link>

                {/* Collapsible Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="navbarDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-list"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/sign-in" className="dropdown-item">
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sign-up" className="dropdown-item">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/movies" className="dropdown-item">
                                        Movies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/groups" className="dropdown-item">
                                        Groups
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search" className="dropdown-item">
                                        Search Movies
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Centralized Search Bar */}
                <form
                    className="d-flex align-items-center mx-auto"
                    onSubmit={handleSearch}
                    style={{
                        width: "50%",
                        justifyContent: "center",
                    }}
                >
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        placeholder="Search by title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        style={{
                            width: "50%",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                            
                        }}
                    />
                    <select
                        className="form-select"
                        name="genre"
                        value={filters.genre}
                        onChange={handleFilterChange}
                        style={{
                            width: "25%",
                            marginLeft: "5px",
                            fontSize: "14px",
                        }}
                    >
                        <option value="">All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="form-select"
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        style={{
                            width: "20%",
                            marginLeft: "5px",
                            fontSize: "14px",
                        }}
                    >
                        <option value="">All Years</option>
                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-orange"
                        type="submit"
                        style={{
                            marginLeft: "5px",
                            fontSize: "14px",
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>
        </nav>
    );
}
