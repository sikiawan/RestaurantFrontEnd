// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Use cors middleware to enable CORS
app.use(cors());

// Your API routes and other middleware go here

const PORT = 7160;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
