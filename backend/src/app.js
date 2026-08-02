const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const packageRoutes = require("./routes/packageRoutes");
const routerRoutes = require("./routes/routerRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({

        success: true,
        app: "Expert ISP Hub",
        version: "1.0.0",
        status: "Healthy",
        message: "API is running successfully 🚀"

    });

});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/packages", packageRoutes);
app.use("/api/v1/routers", routerRoutes);

app.use(errorMiddleware);

module.exports = app;