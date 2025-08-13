const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const saveLanguage = async (req, res) => {
  const { selectedLanguage } = req.body;

  if (!selectedLanguage) {
    return res.status(400).json({ message: "Language preference is required." });
  }

  try {
    // Generate a unique user ID
    const userId = uuidv4();

    // Create a new user with userId and selectedLanguage
    const newUser = new User({
      userId, // Use userId field
      selectedLanguage,
    });

    await newUser.save(); // Save to the database

    res.status(201).json({
      message: "Language saved successfully",
      userId, // Return the generated userId
    });
  } catch (error) {
    console.error("Error saving language:", error);

    // Send a user-friendly error message
    res.status(500).json({
      message: "Failed to save language",
      error: error.message,
    });
  }
};

module.exports = { saveLanguage };
