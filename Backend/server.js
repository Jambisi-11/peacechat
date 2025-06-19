const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
