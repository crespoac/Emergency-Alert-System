//Alex
const express = require("express");
const { register, login, verifyEmail } = require("../controllers/authController");

const router = express.Router();

//Define authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);


module.exports = router;