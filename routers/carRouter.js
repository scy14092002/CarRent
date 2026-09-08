const express = require("express");
const Car = require("../models/cars");
const checkAdmin = require("../middleware/checkAdmin");
const checkLogin = require("../middleware/checkLogin");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { brand } = req.query;

        const filter = {};

        if (brand) {
            filter.brand = brand;
        }

        const cars = await Car.find(filter);

        res.status(200).json({
            cars
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
});

// Get one car by ID
router.get("/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                msg: "Car not found"
            });
        }

        res.status(200).json({
            car
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server side error",
            error: error.message
        });
    }
});


// Add a car - Admin only
router.post("/addCar", checkLogin, checkAdmin, async (req, res) => {
    try {
        const car = new Car(req.body);

        await car.save();

        res.status(201).json({
            msg: "Car is created successfully",
            car
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server side error",
            error: error.message
        });
    }
});


// Update a car - Admin only
router.put("/:id", checkLogin, checkAdmin, async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!car) {
            return res.status(404).json({
                msg: "Car not found"
            });
        }

        res.status(200).json({
            msg: "Car updated successfully",
            car
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});


// Delete a car - Admin only
router.delete("/:id", checkLogin, checkAdmin, async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);

        if (!car) {
            return res.status(404).json({
                msg: "Car not found"
            });
        }

        res.status(200).json({
            msg: "Car deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});


module.exports = router;