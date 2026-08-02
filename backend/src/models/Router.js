const mongoose = require("mongoose");

const routerSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    location:{
        type:String,
        default:""
    },

    ipAddress:{
        type:String,
        required:true
    },

    apiPort:{
        type:Number,
        default:8728
    },

    apiSsl:{
        type:Boolean,
        default:false
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    routerOsVersion:{
        type:String,
        default:""
    },

    model:{
        type:String,
        default:""
    },

    identity:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "Online",
            "Offline",
            "Maintenance"
        ],
        default:"Offline"
    },

    notes:{
        type:String,
        default:""
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Router",routerSchema);