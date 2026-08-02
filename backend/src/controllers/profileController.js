exports.profile = async (req, res) => {

    res.json({

        success: true,

        message: "Profile loaded successfully",

        user: req.user

    });

};
