const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const { ROLES } = require("../constants/roles");

const { dashboard } = require("../controllers/adminController");


router.get(
    "/dashboard",
    protect,
    authorize([ROLES.ADMIN]),
    dashboard
);

module.exports = router;
