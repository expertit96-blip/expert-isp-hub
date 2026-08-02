const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { ROLES } = require("../constants/roles");

const {

    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    suspendCustomer,
    activateCustomer,
    customerStats

} = require("../controllers/customerController");


// ================================
// Customer Statistics
// ================================
router.get(
    "/stats",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    customerStats
);


// ================================
// Create Customer
// ================================
router.post(
    "/",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    createCustomer
);


// ================================
// Get All Customers
// ================================
router.get(
    "/",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getCustomers
);


// ================================
// Get Single Customer
// ================================
router.get(
    "/:id",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    getCustomerById
);


// ================================
// Update Customer
// ================================
router.put(
    "/:id",
    protect,
    authorize([ROLES.ADMIN, ROLES.STAFF]),
    updateCustomer
);


// ================================
// Suspend Customer
// ================================
router.patch(
    "/:id/suspend",
    protect,
    authorize([ROLES.ADMIN]),
    suspendCustomer
);


// ================================
// Activate Customer
// ================================
router.patch(
    "/:id/activate",
    protect,
    authorize([ROLES.ADMIN]),
    activateCustomer
);


module.exports = router;