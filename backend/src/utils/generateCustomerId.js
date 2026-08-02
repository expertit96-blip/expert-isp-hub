const Counter = require("../models/Counter");

const generateCustomerId = async () => {

    const counter = await Counter.findOneAndUpdate(
        { name: "customer" },
        { $inc: { sequence: 1 } },
        {
            new: true,
            upsert: true
        }
    );

    return `CUS-${String(counter.sequence).padStart(6, "0")}`;
};

module.exports = generateCustomerId;