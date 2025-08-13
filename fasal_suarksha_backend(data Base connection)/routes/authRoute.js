const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController"); // Import both functions
const router = express.Router();

console.log("Auth routes loaded"); // Log to confirm the route is loaded

// Routes for user authentication
router.post("/signup", registerUser); // Signup route
router.post("/login", loginUser);     // Login route

module.exports = router;
