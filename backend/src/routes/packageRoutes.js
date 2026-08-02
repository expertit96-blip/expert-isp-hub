const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { ROLES } = require("../constants/roles");

const {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage
} = require("../controllers/packageController");


// Create Package
router.post(
    "/",
    protect,
    authorize([ROLES.ADMIN]),
    createPackage
);


// Get All Packages
router.get(
    "/",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getPackages
);


// Get Single Package
router.get(
    "/:id",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getPackageById
);


// Update Package
router.put(
    "/:id",
    protect,
    authorize([ROLES.ADMIN]),
    updatePackage
);

module.exports = router;