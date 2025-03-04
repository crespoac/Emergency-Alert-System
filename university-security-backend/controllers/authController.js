//Alex

const Admin = require("../models/Admin");
const User = require("../models/User");
const SecurityPersonnel = require("../models/SecurityPersonnel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");
const sendVerificationEmail = require("../utils/emailService");

//Register using post and publicly accesible
exports.register = async (req, res) => {
  const { name, email, password, role, badgeNumber } = req.body; //Extract the role

  try {
    let Model;
    if (role === "admin") {
      Model = Admin;
    } 
    else if (role === "user") {
      Model = User;
    } 
    else if (role === "security") {
      Model = SecurityPersonnel;
    } 
    else {
      return res.status(400).json({ message: "Invalid role try again" });
    }

    const existingUser = await Model.findOne({ email });
    if (existingUser) return res.status(400).json({ message: `${role} already exists for this email` });

    //Generate token for verification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //Add the badgeNumber only if the role is security and set verified to false
    const newUserData = role === "security" 
    ? { name, email, password, isVerified: false, verificationToken, badgeNumber} 
    : { name, email, password, isVerified: false,verificationToken };

    const newUser = await Model.create(newUserData);

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: `${role} registered successfully. Please verify your email.`, user: newUser });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body; // Extract role

  try {
    let Model;
    if (role === "admin") {
      Model = Admin;
    } else if (role === "user") {
      Model = User;
    } else if (role === "security") {
      Model = SecurityPersonnel;
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res.status(400).json({message:
      "Verify email before logging in."});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: 
      "Login successful" , token});
  } 
  catch (error) {
    res.status(500).json({ message: 
      "Server error", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    let user = await Admin.findOne({ verificationToken: token }) || await User.findOne({ verificationToken: token }) || 
    await SecurityPersonnel.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 
      "Invalid or expired token" 
    });
    //Mark user as verified and remove the token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: 
      "Email verified successfully. You can now log in."
     });
  }
   catch (error) {
    res.status(500).json({ message: 
      "Server error", error: error.message
     });
  }
};


