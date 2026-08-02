exports.dashboard = async (req, res) => {

    res.json({

        success: true,

        message: "Welcome Admin",

        dashboard: {

            totalCustomers: 0,

            activeCustomers: 0,

            expiredCustomers: 0,

            onlineUsers: 0,

            totalRevenue: 0

        }

    });

};
