const express = require("express");
const { saveLanguage } = require("../controllers/languageController");
const router = express.Router();

router.post("/", saveLanguage); // Map root endpoint to saveLanguage
module.exports = router;
