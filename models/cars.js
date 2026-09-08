const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    variant: {
        type: String
    },

    fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
        required: true
    },

    transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: true
    },

    bodyType: {
        type: String,
        enum: ["SUV", "Sedan", "Hatchback", "Coupe", "Estate", "MPV"],
        required: true
    },

    seats: {
        type: Number,
        required: true
    },

    image: {
        type: String
    }
});

module.exports = mongoose.model("Car", carSchema);