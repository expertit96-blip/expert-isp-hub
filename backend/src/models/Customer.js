const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
{
    customerId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    fatherName: {
        type: String,
        default: ""
    },

    motherName: {
        type: String,
        default: ""
    },

    nid: {
        type: String,
        default: "",
        index: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    alternateMobile: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: "",
        lowercase: true,
        trim: true
    },

    address: {

        division: String,

        district: String,

        upazila: String,

        union: String,

        village: String,

        road: String,

        house: String

    },

    connectionType: {

        type: String,

        enum: [
            "PPPoE",
            "Hotspot",
            "Static"
        ],

        default: "PPPoE"

    },

    package: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Package",

        default: null

    },

    router: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Router",

        default: null

    },

    billingDate: {

        type: Number,

        min: 1,

        max: 31,

        default: 1

    },

    monthlyBill: {

        type: Number,

        default: 0,

        min: 0

    },

    dueAmount: {

        type: Number,

        default: 0,

        min: 0

    },

    advanceBalance: {

        type: Number,

        default: 0,

        min: 0

    },

    installationDate: {

        type: Date,

        default: Date.now

    },

    status: {

        type: String,

        enum: [
            "Active",
            "Suspended",
            "Disabled",
            "Expired"
        ],

        default: "Active",

        index: true

    },

    note: {

        type: String,

        default: ""

    },

    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Customer", customerSchema);