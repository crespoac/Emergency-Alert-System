const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//Route for register
 router.post("/register", registerAdmin);

 //Route for login
 router.post("/login", loginAdmin);
 
// Protect the `/admin/dashboard` route with `authMiddleware`
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, Admin ${req.admin.id}!` });
});

module.exports = router;