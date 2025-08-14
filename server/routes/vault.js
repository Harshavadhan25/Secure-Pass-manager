const express = require("express");
const router = express.Router();
const Vault = require("../models/vault");
const authenticate = require("../middleware/authenticate");

// ✅ GET all vault entries for logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const vaults = await Vault.find({ user: req.userId });
    res.json(vaults);
  } catch (err) {
    console.error("Error fetching vaults:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST a new vault entry
router.post("/", authenticate, async (req, res) => {
  const { website, username, password } = req.body;
  if (!website || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newVault = new Vault({
      user: req.userId,
      website,
      username,
      password, // gets encrypted in model
    });

    await newVault.save();
    res.status(201).json(newVault);
  } catch (err) {
    console.error("Error saving vault:", err);
    res.status(500).json({ message: "Failed to save vault" });
  }
});

module.exports = router;
