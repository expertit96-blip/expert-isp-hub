const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// Register User

exports.register = async (req,res)=>{

    try{

        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body;


        const exists = await User.findOne({
            email
        });


        if(exists)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }


        const user = await User.create({

            name,
            email,
            phone,
            password,
            role

        });


        res.status(201).json({

            success:true,
            message:"User created successfully",

            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// Login User

exports.login = async(req,res)=>{

    try{


        const {
            email,
            password
        } = req.body;



        const user =
        await User.findOne({
            email
        });



        if(!user)
        {
            return res.status(401).json({

                success:false,
                message:"Invalid email or password"

            });
        }



        const match =
        await user.comparePassword(
            password
        );



        if(!match)
        {
            return res.status(401).json({

                success:false,
                message:"Invalid email or password"

            });
        }



        const token =
        generateToken(user);



        res.json({

            success:true,

            token,

            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};
