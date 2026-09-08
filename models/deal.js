const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },

    monthlyPrice: {
        type: Number,
        required: true
    },

    initialPayment: {
        type: Number,
        required: true
    },

    contractMonths: {
        type: Number,
        required: true
    },

    annualMileage: {
        type: Number,
        required: true
    },

    provider: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        min: 0,
        max: 100
    }
});

module.exports = mongoose.model("Deal", dealSchema);