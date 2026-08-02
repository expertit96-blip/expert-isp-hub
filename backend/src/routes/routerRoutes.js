const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { ROLES } = require("../constants/roles");

const {

    createRouter,
    getRouters,
    getRouterById,
    updateRouter,
    deleteRouter,
    testRouterConnection

} = require("../controllers/routerController");


// ==========================================
// Create Router
// ==========================================
router.post(
    "/",
    protect,
    authorize([ROLES.ADMIN]),
    createRouter
);


// ==========================================
// Get All Routers
// ==========================================
router.get(
    "/",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getRouters
);


// ==========================================
// Get Single Router
// ==========================================
router.get(
    "/:id",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getRouterById
);


// ==========================================
// Update Router
// ==========================================
router.put(
    "/:id",
    protect,
    authorize([ROLES.ADMIN]),
    updateRouter
);


// ==========================================
// Delete Router
// ==========================================
router.delete(
    "/:id",
    protect,
    authorize([ROLES.ADMIN]),
    deleteRouter
);


// ==========================================
// Test MikroTik Connection
// ==========================================
router.post(
    "/:id/test",
    protect,
    authorize([ROLES.ADMIN]),
    testRouterConnection
);

module.exports = router;