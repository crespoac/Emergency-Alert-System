const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//Route for register
/**
 * @desc Register a new admin
 * @route POST /api/admin/register
 * @access Public
 */
 router.post("/register", registerAdmin);

 //Route for login
 /**
  * @desc Login an admin
  * @route POST /api/admin/login
  * @access Public
  */
 router.post("/login", loginAdmin);
 
 /**
  * @desc Protected Admin Dashboard
  * @route GET /api/admin/dashboard
  * @access Private (Requires JWT)
  */

// Protect the `/admin/dashboard` route with `authMiddleware`
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, Admin ${req.admin.id}!` });
});

module.exports = router;