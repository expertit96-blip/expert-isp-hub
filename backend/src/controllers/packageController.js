const Package = require("../models/Package");

// ==========================================
// Create Package
// ==========================================
exports.createPackage = async (req, res, next) => {

    try {

        const exists = await Package.findOne({
            name: req.body.name
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Package already exists"
            });

        }

        const pkg = await Package.create({

            name: req.body.name,

            speed: req.body.speed,

            speedUnit: req.body.speedUnit || "Mbps",

            monthlyPrice: req.body.monthlyPrice,

            connectionType: req.body.connectionType || "PPPoE",

            mikrotikProfile: req.body.mikrotikProfile || "",

            description: req.body.description || "",

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Package created successfully",

            package: pkg

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get All Packages
// ==========================================
exports.getPackages = async (req, res, next) => {

    try {

        const packages = await Package.find()
            .sort({
                monthlyPrice: 1
            });

        return res.json({

            success: true,

            total: packages.length,

            packages

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get Single Package
// ==========================================
exports.getPackageById = async (req, res, next) => {

    try {

        const pkg = await Package.findById(req.params.id);

        if (!pkg) {

            return res.status(404).json({

                success: false,

                message: "Package not found"

            });

        }

        return res.json({

            success: true,

            package: pkg

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Update Package
// ==========================================
exports.updatePackage = async (req, res, next) => {

    try {

        const pkg = await Package.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!pkg) {

            return res.status(404).json({

                success: false,

                message: "Package not found"

            });

        }

        return res.json({

            success: true,

            message: "Package updated successfully",

            package: pkg

        });

    } catch (error) {

        next(error);

    }

};