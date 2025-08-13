const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express App
const app = express();
const PORT = 5000;
const HOST = "0.0.0.0"; // Accept requests from any host

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
require("./config/db")(); // Ensure `db.js` exports a proper connection function

// API Routes
app.use("/api/languageSelection", require("./routes/languageRoute")); // Language selection route
app.use("/api/auth", require("./routes/authRoute")); // Signup and login routes
app.use("/api/kissanID", require("./routes/kissanIDRoute")); // Kissan ID management

// Default Route for Testing
app.get("/", (req, res) => {
  res.send("Welcome to the Fasal Suraksha Backend!");
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
