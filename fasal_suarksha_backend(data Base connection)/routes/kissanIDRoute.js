const express = require("express");
const { saveKissanID } = require("../controllers/kissanIDController");
const router = express.Router();

router.post("/", saveKissanID);

module.exports = router;
