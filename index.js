const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');

dotenv.config();

const app = express();

// Database
connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'https://property-hub-web-gamma.vercel.app',
    'https://propertyhub-web.onrender.com'
];

// CORS
app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('RealStateAdvisor API is Live with Database!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});