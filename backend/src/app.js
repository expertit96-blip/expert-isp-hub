const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1", routes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    app: "Expert ISP Hub",
    version: "1.0.0",
    status: "Healthy",
    message: "Backend API is running successfully 🚀"
  });
});

module.exports = app;