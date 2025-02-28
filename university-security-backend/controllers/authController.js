const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register admin uses post method and publicly accessible
exports.registerAdmin = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        //Check to see if admin exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        //Create new admin in  database
        const newAdmin = await Admin.create({ name, email, password});

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } 
    catch (error) 
    {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Admin login uses post method and publicy accessible
 exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      //Check if admin exists in the database
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: "Invalid email or password EM" });
  
      //Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password PW" });
  
      //Generate JWT token for authentication
      const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
