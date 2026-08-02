const Customer = require("../models/Customer");
const generateCustomerId = require("../utils/generateCustomerId");

// ==========================================
// Create Customer
// ==========================================
exports.createCustomer = async (req, res, next) => {

    try {

        const customerId = await generateCustomerId();

        const customer = await Customer.create({

            customerId,

            fullName: req.body.fullName,

            fatherName: req.body.fatherName || "",

            motherName: req.body.motherName || "",

            nid: req.body.nid || "",

            mobile: req.body.mobile,

            alternateMobile: req.body.alternateMobile || "",

            email: req.body.email || "",

            address: req.body.address || {},

            connectionType: req.body.connectionType || "PPPoE",

            billingDate: req.body.billingDate || 1,

            monthlyBill: req.body.monthlyBill || 0,

            installationDate: req.body.installationDate || new Date(),

            note: req.body.note || "",

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,
            message: "Customer created successfully",
            customer

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get Customers
// ==========================================
exports.getCustomers = async (req, res, next) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const status = req.query.status || "";

        let filter = {};

        if (status) {
            filter.status = status;
        }

        if (search) {

            filter.$or = [

                {
                    customerId: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    fullName: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    mobile: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    nid: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }

        const total = await Customer.countDocuments(filter);

        const customers = await Customer.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.json({

            success: true,

            page,

            limit,

            total,

            totalPages: Math.ceil(total / limit),

            customers

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get Single Customer
// ==========================================
exports.getCustomerById = async (req, res, next) => {

    try {

        const customer = await Customer.findById(req.params.id);

        if (!customer) {

            return res.status(404).json({

                success: false,
                message: "Customer not found"

            });

        }

        return res.json({

            success: true,
            customer

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Update Customer
// ==========================================
exports.updateCustomer = async (req, res, next) => {

    try {

        const customer = await Customer.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!customer) {

            return res.status(404).json({

                success: false,
                message: "Customer not found"

            });

        }

        return res.json({

            success: true,
            message: "Customer updated successfully",
            customer

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Suspend Customer
// ==========================================
exports.suspendCustomer = async (req, res, next) => {

    try {

        const customer = await Customer.findByIdAndUpdate(

            req.params.id,

            {

                status: "Suspended"

            },

            {

                new: true

            }

        );

        if (!customer) {

            return res.status(404).json({

                success: false,

                message: "Customer not found"

            });

        }

        return res.json({

            success: true,

            message: "Customer suspended successfully",

            customer

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Activate Customer
// ==========================================
exports.activateCustomer = async (req, res, next) => {

    try {

        const customer = await Customer.findByIdAndUpdate(

            req.params.id,

            {

                status: "Active"

            },

            {

                new: true

            }

        );

        if (!customer) {

            return res.status(404).json({

                success: false,

                message: "Customer not found"

            });

        }

        return res.json({

            success: true,

            message: "Customer activated successfully",

            customer

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Customer Statistics
// ==========================================
exports.customerStats = async (req, res, next) => {

    try {

        const totalCustomers = await Customer.countDocuments();

        const activeCustomers = await Customer.countDocuments({

            status: "Active"

        });

        const suspendedCustomers = await Customer.countDocuments({

            status: "Suspended"

        });

        const expiredCustomers = await Customer.countDocuments({

            status: "Expired"

        });

        const disabledCustomers = await Customer.countDocuments({

            status: "Disabled"

        });

        return res.json({

            success: true,

            statistics: {

                totalCustomers,

                activeCustomers,

                suspendedCustomers,

                expiredCustomers,

                disabledCustomers

            }

        });

    } catch (error) {

        next(error);

    }

};