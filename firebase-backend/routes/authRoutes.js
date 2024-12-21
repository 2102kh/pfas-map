const express = require("express");
const { setSuperAdmin, approveAdmin } = require("../controllers/authController");
const { registerAdmin, adminLogin } = require("../controllers/authController");


const router = express.Router();

router.post("/set-superadmin", setSuperAdmin);
router.post("/register-admin", registerAdmin);

router.post("/approve-admin", approveAdmin);
router.post("/admin-login", adminLogin);

module.exports = router;
