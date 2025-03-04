//Alex and Oscar
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Define Admin Schema: name, email, password, and role
const AdminSchema = new mongoose.Schema({
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
        enum: ["admin"],
        default: "admin",
    },
    isVerified: {
        type: Boolean,
        default: false, // User is not verified by default
    },
    verificationToken: {
        type: String, // Stores the unique token sent to the user
        default: null,
    },
}, 
{timestamps: true});

//Hash password before saving to DB using bycrypt
AdminSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next(); //Only hash if password is new/changed
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//Compare entered password with hashed password in DB
AdminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);


