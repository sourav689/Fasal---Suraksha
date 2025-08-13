const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const FIXED_OTP = "123456";
const SALT_ROUNDS = 10;

// Register user
const registerUser = async (req, res) => {
  let { userId, name, mobile, otp, username, password, confirmPassword, selectedLanguage } = req.body;

  const usernameRegex = /^(?=.*\d{3,}).{6,}$/;
  const mobileRegex = /^\d{10}$/;

  console.log("Payload received in backend:", req.body);

  // If userId is missing, generate one automatically.
  if (!userId) {
    userId = uuidv4();
  }

  // Validation checks
  if (!userId || !name || !mobile || !otp || !username || !password || !confirmPassword || !selectedLanguage) {
    console.error("Validation failed: Missing required fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if name contains only letters and spaces
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    console.error("Validation failed: Name contains invalid characters", name);
    return res.status(400).json({ message: "Name must not contain numbers or special characters" });
  }

  // Validate mobile number
  if (!mobileRegex.test(mobile)) {
    console.error("Validation failed: Invalid mobile number", mobile);
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  // Validate OTP
  if (otp !== FIXED_OTP) {
    console.error("Validation failed: Invalid OTP", otp);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Validate username format
  if (!usernameRegex.test(username)) {
    console.error("Validation failed: Invalid username format", username);
    return res.status(400).json({
      message: "Username must be at least 6 characters long and contain at least 3 digits",
    });
  }

  // Validate password length
  if (password.length < 6) {
    console.error("Validation failed: Password too short", password);
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    console.error("Validation failed: Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if the user already exists
  const userExists = await User.findOne({ $or: [{ username }, { mobile }] });
  if (userExists) {
    console.error("User already exists with username or mobile", { username, mobile });
    return res.status(400).json({ message: "Username or mobile number already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Save the user with hashed password
    const user = new User({
      userId,
      name,
      mobile,
      username,
      password: hashedPassword,
      selectedLanguage,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      userId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  let { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    console.error("Validation failed: Missing username or password");
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Trim the username to remove any leading/trailing spaces
  username = username.trim();

  try {
    console.log("Login Request Payload:", { username, password });

    // Fetch user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.error("Login failed: User not found for username", username);
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log("User Retrieved from DB:", user);

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.error("Login failed: Password mismatch for user", username);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Successful login - send mobile along with userId and language
    res.status(200).json({
      message: "Login successful",
      userId: user.userId,
      selectedLanguage: user.selectedLanguage,
      mobile: user.mobile,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
