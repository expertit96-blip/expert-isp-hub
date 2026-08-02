const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    speed:{
        type:Number,
        required:true
    },

    speedUnit:{
        type:String,
        enum:["Mbps","Gbps"],
        default:"Mbps"
    },

    monthlyPrice:{
        type:Number,
        required:true
    },

    connectionType:{
        type:String,
        enum:["PPPoE","Hotspot","Static"],
        default:"PPPoE"
    },

    mikrotikProfile:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Package",packageSchema);