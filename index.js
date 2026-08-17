const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db'); // db file import karein
const authRoutes = require('./src/routes/authRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');

dotenv.config();

const app = express();

// Database Connect karein
connectDB();

// Middleware (JSON data read karne ke liye)
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
