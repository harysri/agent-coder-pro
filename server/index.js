const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CodeCreationRoutes = require("./Routes/codegeneration.js");
const RuncodeRoutes = require("./Routes/run.js");
const authRoutes = require("./Routes/auth.js");
const ViewcodeRoutes = require("./Routes/viewcode.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Define routes
app.use("/api/generate", CodeCreationRoutes);
app.use("/api/code", RuncodeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/viewcode", ViewcodeRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
