require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");


const app = express();
const PORT = process.env.PORT || 5001;

//Connect to MongoDB
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use("/api/admin", adminRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api`);
});