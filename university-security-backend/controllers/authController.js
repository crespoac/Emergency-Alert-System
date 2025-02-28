const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @desc Register a new admin
 * @route POST /api/admin/register
 * @access Public
 */

exports.registerAdmin = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        //Check to see if admin exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        //Hash password before saving to database
       // const hashedPassword = await bcrypt.hash(password, 10);

        //Create new admin in  database
        const newAdmin = await Admin.create({ name, email, password});

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } 
    catch (error) 
    {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Login admin
 * @route POST /api/admin/login
 * @access Public
 */
 exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if admin exists in the database
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: "Invalid email or password EM" });

      console.log("🔍 Entered Password:", password);
      console.log("🔍 Stored Hashed Password:", admin.password);
      bcrypt.hash("SecurePassword", 10).then(hash => {
        console.log("New Hashed Password:", hash);
      });
      bcrypt.hash("$2b$10$qqJs.5veSIm.cIiZpo9t5uTNDYcQSv7GAufLHGybp/ghzQ.8sFybS", 10).then(hash => {
        console.log("New Hashed Password:", hash);
      });
      

      bcrypt.compare(password, admin.password).then(result => console.log("Password match:", result));
  
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password PW" });
  
      // Generate JWT token for authentication
      const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
