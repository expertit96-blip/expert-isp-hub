const Router = require("../models/Router");
const mikrotikService = require("../services/mikrotikService");

// ==========================================
// Create Router
// ==========================================
exports.createRouter = async (req, res, next) => {

    try {

        const router = await Router.create({

            name: req.body.name,

            location: req.body.location || "",

            ipAddress: req.body.ipAddress,

            apiPort: req.body.apiPort || 8728,

            apiSsl: req.body.apiSsl || false,

            username: req.body.username,

            password: req.body.password,

            routerOsVersion: req.body.routerOsVersion || "",

            model: req.body.model || "",

            identity: req.body.identity || "",

            status: req.body.status || "Offline",

            notes: req.body.notes || "",

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Router created successfully",

            router

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get All Routers
// ==========================================
exports.getRouters = async (req, res, next) => {

    try {

        const routers = await Router.find()
            .sort({ createdAt: -1 });

        return res.json({

            success: true,

            total: routers.length,

            routers

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Get Single Router
// ==========================================
exports.getRouterById = async (req, res, next) => {

    try {

        const router = await Router.findById(req.params.id);

        if (!router) {

            return res.status(404).json({

                success: false,

                message: "Router not found"

            });

        }

        return res.json({

            success: true,

            router

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Update Router
// ==========================================
exports.updateRouter = async (req, res, next) => {

    try {

        const router = await Router.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!router) {

            return res.status(404).json({

                success: false,

                message: "Router not found"

            });

        }

        return res.json({

            success: true,

            message: "Router updated successfully",

            router

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Delete Router
// ==========================================
exports.deleteRouter = async (req, res, next) => {

    try {

        const router = await Router.findById(req.params.id);

        if (!router) {

            return res.status(404).json({

                success: false,

                message: "Router not found"

            });

        }

        await router.deleteOne();

        return res.json({

            success: true,

            message: "Router deleted successfully"

        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// Test MikroTik Connection
// ==========================================
exports.testRouterConnection = async (req, res) => {

    try {

        const router = await Router.findById(req.params.id);

        if (!router) {

            return res.status(404).json({

                success: false,

                message: "Router not found"

            });

        }

        const resource = await mikrotikService.testConnection({

            ipAddress: router.ipAddress,
            username: router.username,
            password: router.password,
            apiPort: router.apiPort,
            apiSsl: router.apiSsl

        });

        let identity = router.identity;
        let version = router.routerOsVersion;
        let model = router.model;

        if (Array.isArray(resource) && resource.length > 0) {

            const data = resource[0];

            identity = data.identity || identity;
            version = data.version || version;
            model = data["board-name"] || model;

        }

        router.identity = identity;
        router.routerOsVersion = version;
        router.model = model;
        router.status = "Online";

        await router.save();

        return res.json({

            success: true,

            message: "Router connected successfully",

            router: {

                id: router._id,

                name: router.name,

                identity: router.identity,

                version: router.routerOsVersion,

                model: router.model,

                status: router.status

            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: "Router connection failed",

            error: error.message

        });

    }

};