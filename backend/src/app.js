const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.json({

        success: true,
        app: "Expert ISP Hub",
        version: "1.0.0",
        status: "Healthy",
        message: "API is running successfully ??"

    });

});


app.use("/api/v1/auth", authRoutes);

app.use("/api/v1", profileRoutes);


module.exports = app;
