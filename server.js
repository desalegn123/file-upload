require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const authRoutes=require("./routes/auth-routes")
const homeRoute=require("./routes/home-route")
const adminRoute=require("./routes/admin-route")
connectDB();

const app = express();
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/home", homeRoute)
app.use("/api/admin", adminRoute)
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is still running on the port:${PORT}`);
});
