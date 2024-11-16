require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow frontend requests
const allowedOrigins = [
    'http://localhost:3000', // Frontend development URL
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define routes for movie-related APIs
app.use('/api/movies', movieRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
