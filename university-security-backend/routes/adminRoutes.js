//Alex
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//Protect the `/admin/dashboard` route with `authMiddleware`
router.get("/dashboard", authMiddleware, (req, res) => {
  if (req.user.role !== "admin"){
    return res.status(403).json(
      {message: 
      "Admins only, access forbidden."});
  }
  res.json({ message: 
    `Welcome, Admin ${req.user.id}!` 
  });
});


//Admins can view all users
router.get("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({message: 
    "Admins only, access forbidden"});
  }
  try {
    const users = await User.find({}, "-password"); //This will find users info excluding password
    res.json(users);
  }
   catch (error) {
    res.status(500).json({message:
      "Server error", error: error.message
    });
  }
});

module.exports = router;