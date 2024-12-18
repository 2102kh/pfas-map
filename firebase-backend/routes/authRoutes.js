const express = require("express");
const { setSuperAdmin, approveAdmin } = require("../controllers/authController");
const { registerAdmin } = require("../controllers/authController");


const router = express.Router();

router.post("/set-superadmin", setSuperAdmin);
router.post("/register-admin", registerAdmin);

router.post("/approve-admin", approveAdmin);

module.exports = router;
