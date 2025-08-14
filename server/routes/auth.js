const express = require("express");
const router = express.Router();

// ✅ Import controllers
const { registerUser, loginUser } = require("../controllers/authController");

// ✅ Register route
router.post("/register", registerUser);

// ✅ Login route
router.post("/login", loginUser);

module.exports = router;
