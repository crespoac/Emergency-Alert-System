const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");

const router = express.Router();

//Define authentication routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;