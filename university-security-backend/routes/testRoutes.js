const express = require("express");

const Admin = require("../models/Admin");
const User = require("../models/User");
const SecurityPersonnel = require("../models/SecurityPersonnel");

const router = express.Router();

router.delete("/delete-test-users", async (req, res) => {
    try {
        await Admin.deleteMany({ email: { $in: ["superman@example.com"] } });
        await User.deleteMany({ email: { $in: ["johndoe@example.com", "ghostrider@example.com"] } });
        await SecurityPersonnel.deleteMany({ email: "batman@example.com" });

        res.json({ message: "✅ Test users deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "❌ Failed to delete test users", error: error.message });
    }
});

module.exports = router;