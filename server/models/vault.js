const mongoose = require("mongoose");
const crypto = require("crypto");

const vaultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  usernameOrEmail: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

// Utility to encrypt password
vaultSchema.statics.encryptPassword = function (password) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encryptedPassword: encrypted,
    iv: iv.toString("hex"),
  };
};

// Utility to decrypt password
vaultSchema.statics.decryptPassword = function (encryptedPassword, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = mongoose.model("Vault", vaultSchema);
