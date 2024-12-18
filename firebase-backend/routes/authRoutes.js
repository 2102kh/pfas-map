const express = require("express");
const { setSuperAdmin, approveAdmin } = require("../controllers/authController");
const { registerAdmin } = require("../controllers/authController");




const router = express.Router();

// Sätt en superadmin-roll
router.post("/set-superadmin", setSuperAdmin);
router.post("/register-admin", registerAdmin);

// Godkänn en admin (sätt roll från "pending" till "admin")
router.post("/approve-admin", approveAdmin);

module.exports = router;
