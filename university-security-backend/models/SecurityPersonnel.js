const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Create user schema
const securityPersonnelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["security"],
            default: "security",
        },
        badgeNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {timestamp: true}
);

//Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password);
};

//Make this useable in other 
module.exports = mongoose.model("SecurityPersonnel", securityPersonnelSchema);