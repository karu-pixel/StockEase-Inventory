// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('StockEase backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
